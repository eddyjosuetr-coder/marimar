/**
 * Los cambios que el dueño hace desde el panel: ofertas, precios corregidos
 * y productos ocultos.
 *
 * El catálogo (`src/data/products.ts`) se genera desde las fotos y la lista
 * de precios, y nunca se edita a mano. Por eso los cambios del dueño viven
 * aparte, como una capa de ajustes que se aplica encima al mostrar la
 * tienda. Así el catálogo se puede regenerar sin pisar su trabajo.
 *
 * DÓNDE SE GUARDAN — En la base de datos en línea, para que lo que el dueño
 * cambia lo vean todos sus clientes. El navegador guarda además una copia,
 * que es lo que se muestra mientras llega la respuesta del servidor y lo que
 * salva la tienda si el servidor no responde.
 *
 * QUIÉN PUEDE ESCRIBIR — Sólo el dueño con su sesión iniciada. La regla vive
 * en el servidor, no aquí: aunque alguien manipule esta página, el servidor
 * le rechaza los cambios.
 */
import type { Product } from '@/types'
import { guardarEnLaNube, leerDeLaNube } from './nube'

const LLAVE = 'marimar.ajustes.v1'

/** Lo que el dueño puede cambiar de un producto. */
export interface Ajuste {
  /** Precio corregido. Sustituye al de la lista. */
  precio?: number
  /** Precio de oferta. Manda sobre `precio` y saca la etiqueta OFERTA. */
  oferta?: number
  /** Fuera del catálogo, sin borrarlo: agotado o retirado por temporada. */
  oculto?: boolean
}

export type Ajustes = Record<string, Ajuste>

function esPrecio(valor: unknown): valor is number {
  return typeof valor === 'number' && Number.isFinite(valor) && valor > 0
}

/**
 * Valida a mano en vez de con un esquema: la forma son tres campos y así el
 * cliente que sólo viene a comprar no descarga una librería de validación
 * entera para leer su propio navegador.
 */
function validar(crudo: unknown): Ajustes | null {
  if (typeof crudo !== 'object' || crudo === null || Array.isArray(crudo)) return null

  const limpio: Ajustes = {}
  for (const [id, valor] of Object.entries(crudo as Record<string, unknown>)) {
    if (!/^\d+$/.test(id)) return null
    if (typeof valor !== 'object' || valor === null) return null

    const { precio, oferta, oculto } = valor as Record<string, unknown>
    if (precio !== undefined && !esPrecio(precio)) return null
    if (oferta !== undefined && !esPrecio(oferta)) return null
    if (oculto !== undefined && typeof oculto !== 'boolean') return null

    limpio[id] = {
      ...(precio !== undefined && { precio: precio as number }),
      ...(oferta !== undefined && { oferta: oferta as number }),
      ...(oculto === true && { oculto: true }),
    }
  }
  return limpio
}

const VACIO: Ajustes = {}

/**
 * Lee del navegador. Lo guardado es dato de fuera, no código de confianza:
 * si está corrupto, lo escribió otra versión o alguien lo tocó a mano, se
 * descarta entero y la tienda abre con el catálogo limpio.
 */
function leer(): Ajustes {
  try {
    const crudo = window.localStorage.getItem(LLAVE)
    if (!crudo) return VACIO
    return validar(JSON.parse(crudo)) ?? VACIO
  } catch {
    return VACIO
  }
}

function escribir(ajustes: Ajustes): void {
  try {
    window.localStorage.setItem(LLAVE, JSON.stringify(ajustes))
  } catch {
    // Modo incógnito o almacenamiento lleno: el panel avisa por su cuenta
    // comparando lo que pidió guardar con lo que quedó.
  }
}

let estado: Ajustes = leer()
const oyentes = new Set<() => void>()

/**
 * Trae del servidor lo que el dueño cambió. Lo llama la tienda al abrir.
 * Si el servidor no responde se queda con la copia local: mejor precios de
 * ayer que una tienda en blanco.
 */
export async function consultarAjustesPublicados(): Promise<void> {
  const remotos = validar(await leerDeLaNube('ajustes'))
  if (remotos === null) return
  estado = remotos
  escribir(estado)
  avisar()
}

function avisar(): void {
  oyentes.forEach(oyente => oyente())
}

/*
  El navegador avisa de los cambios hechos en OTRA pestaña. Así el dueño puede
  tener el panel y la tienda abiertos a la vez y ver la oferta aparecer sin
  recargar, que es justo lo que quiere enseñarle al cliente. (En la propia
  pestaña este evento no se dispara: de eso se encarga `ajustarProducto`.)
*/
if (typeof window !== 'undefined') {
  window.addEventListener('storage', evento => {
    if (evento.key !== null && evento.key !== LLAVE) return
    estado = leer()
    avisar()
  })
}

/** Para `useSyncExternalStore`: la referencia sólo cambia si cambió algo. */
export function obtenerAjustes(): Ajustes {
  return estado
}

export function suscribirAjustes(alCambiar: () => void): () => void {
  oyentes.add(alCambiar)
  return () => oyentes.delete(alCambiar)
}

/**
 * Cambia un producto. `cambio` con campos en `undefined` los borra; pasar
 * `null` devuelve el producto a como está en el catálogo.
 */
export function ajustarProducto(id: number, cambio: Ajuste | null): void {
  const siguiente: Ajustes = { ...estado }
  const limpio: Ajuste = { ...estado[id], ...cambio }

  // Un ajuste sin nada dentro es ruido: se quita en vez de guardarse vacío.
  for (const campo of ['precio', 'oferta', 'oculto'] as const) {
    if (limpio[campo] === undefined || limpio[campo] === false) delete limpio[campo]
  }

  if (cambio === null || Object.keys(limpio).length === 0) {
    delete siguiente[id]
  } else {
    siguiente[id] = limpio
  }

  estado = siguiente
  escribir(estado)
  avisar()
  void publicar()
}

/** Deja el catálogo entero como venía de fábrica. */
export function limpiarAjustes(): void {
  estado = VACIO
  escribir(estado)
  avisar()
  void publicar()
}

/**
 * Sube los cambios para que los vean los clientes.
 *
 * Se lanza sin esperar: el dueño ve el cambio al instante y la subida ocurre
 * detrás. Si falla —sin internet, sesión vencida— el panel lo avisa mirando
 * `ultimaPublicacion`, en vez de dejarle creer que ya está publicado.
 */
let ultimaPublicacion: 'ok' | 'error' | 'pendiente' = 'ok'

async function publicar(): Promise<void> {
  ultimaPublicacion = 'pendiente'
  ultimaPublicacion = (await guardarEnLaNube('ajustes', estado)) ? 'ok' : 'error'
  avisar()
}

export function estadoDePublicacion(): 'ok' | 'error' | 'pendiente' {
  return ultimaPublicacion
}

/**
 * Aplica los ajustes al catálogo: es la única función que sabe qué significa
 * cada campo, y la usan por igual la tienda y el panel.
 *
 * Un producto oculto desaparece de la lista, no se devuelve marcado: así
 * ninguna pantalla puede mostrarlo por descuido.
 */
export function aplicarAjustes(catalogo: Product[], ajustes: Ajustes): Product[] {
  if (Object.keys(ajustes).length === 0) return catalogo

  const visibles: Product[] = []
  for (const producto of catalogo) {
    const ajuste = ajustes[producto.id]
    if (!ajuste) {
      visibles.push(producto)
      continue
    }
    if (ajuste.oculto) continue
    visibles.push(conAjuste(producto, ajuste))
  }
  return visibles
}

function conAjuste(producto: Product, ajuste: Ajuste): Product {
  const base = ajuste.precio ?? producto.price
  // Una "oferta" que no baja el precio no es oferta: se ignora en vez de
  // mostrar un tachado que engaña.
  const hayOferta = ajuste.oferta !== undefined && ajuste.oferta < base

  if (!hayOferta && ajuste.precio === undefined) return producto

  return {
    ...producto,
    price: hayOferta ? ajuste.oferta! : base,
    listPrice: hayOferta ? base : undefined,
    badge: hayOferta ? 'Oferta' : producto.badge,
    // Si el dueño le pone precio, deja de ser "a consultar"
    priceOnRequest: producto.priceOnRequest && ajuste.precio === undefined ? true : undefined,
  }
}
