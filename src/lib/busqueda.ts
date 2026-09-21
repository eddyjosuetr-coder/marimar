import type { Product } from '@/types'

/**
 * Buscador de la tienda.
 *
 * Quien compra aquí no es un buscador experto: es gente que escribe "pan" y
 * espera ver todos los panes, que pone "charcuteria" pensando en jamones y
 * quesos, que escribe "mostasa" o "frits" en vez de "Fritz". Un `includes`
 * exacto les deja la pantalla vacía y se van.
 *
 * Reglas, en orden de importancia:
 *   1. ignora tildes, mayúsculas y signos — "jamon" encuentra "Jamón"
 *   2. entiende plurales — "panes" encuentra "Pan"
 *   3. conoce las palabras del mostrador — "charcutería" trae las categorías
 *      de jamones, quesos, mortadelas y salchichas
 *   4. perdona erratas — "mostasa" encuentra "Mostaza"
 *
 * Dos decisiones que evitan resultados absurdos:
 *   · Sólo se busca en nombre, marca y categoría, NO en la descripción. Con
 *     la descripción dentro, "perro" devolvía 106 productos, porque media
 *     tienda menciona el perro caliente en su texto.
 *   · La tolerancia a erratas se aplica sólo a lo que la persona escribió,
 *     nunca a los sinónimos. Si no, "limpieza" traía jamones: el sinónimo
 *     "jabón" está a una letra de "jamón".
 */

/** Quita tildes, signos y mayúsculas: deja sólo letras, números y espacios. */
export function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9ñ]+/g, ' ')
    .trim()
}

/** Palabras del mostrador → palabras que sí están en los nombres. */
const SINONIMOS: Record<string, string[]> = {
  gaseosa: ['refresco', 'cola', 'pepsi'],
  soda: ['refresco', 'cola'],
  cocacola: ['coca'],
  pepsicola: ['pepsi'],
  detergente: ['detergente', 'jabon'],
  papel: ['servilleta', 'papel'],
  fiambre: ['jamon', 'mortadela', 'salchichon'],
  perro: ['perro', 'salchicha'],
  hotdog: ['perro', 'salchicha'],
  cotufa: ['maiz'],
  refresco: ['refresco', 'cola', 'pepsi', 'frescolita', 'chinotto', 'golden', 'hit', 'fanta'],
}

/**
 * Palabras que nombran una familia entera. Se buscan contra la CATEGORÍA del
 * producto, no contra su nombre: así "charcutería" trae todos los jamones y
 * quesos aunque ningún producto lleve esa palabra escrita.
 */
const FAMILIAS: Record<string, string[]> = {
  charcuteria: ['queso', 'jamon', 'mortadela', 'chorizo', 'salchicha'],
  embutido: ['mortadela', 'chorizo', 'salchicha', 'jamon'],
  fiambre: ['jamon', 'mortadela', 'queso'],
  lacteo: ['lacteo', 'queso'],
  bebida: ['refresco', 'malta', 'agua', 'jugo', 'cafe', 'te'],
  refresco: ['refresco', 'malta'],
  jugo: ['agua', 'jugo'],
  limpieza: ['limpieza', 'higiene'],
  aseo: ['limpieza', 'higiene', 'desechable'],
  desechable: ['desechable', 'papeleria'],
  vivere: ['harina', 'despensa', 'enlatado', 'aceite'],
  despensa: ['harina', 'despensa', 'enlatado'],
  salsa: ['salsa', 'aderezo', 'mayonesa', 'mostaza'],
  aderezo: ['aderezo', 'salsa'],
  dulce: ['dulce', 'galleta'],
  postre: ['dulce', 'galleta'],
  pasapalo: ['dulce', 'galleta', 'congelado'],
  pan: ['panaderia'],
  panaderia: ['panaderia'],
  congelado: ['congelado'],
  combo: ['combo'],
  enlatado: ['enlatado', 'conserva'],
  conserva: ['enlatado', 'conserva'],
}

interface Indice {
  nombre: string[]
  marca: string[]
  categoria: string[]
}

const indices = new Map<number, Indice>()

function indiceDe(producto: Product): Indice {
  const guardado = indices.get(producto.id)
  if (guardado) return guardado

  const hecho: Indice = {
    nombre: normalizar(producto.name).split(' ').filter(Boolean),
    marca: normalizar(producto.brand).split(' ').filter(Boolean),
    categoria: normalizar(producto.category).split(' ').filter(Boolean),
  }
  indices.set(producto.id, hecho)
  return hecho
}

/** Distancia de edición, cortada en cuanto se pasa del máximo tolerado. */
function distancia(a: string, b: string, maximo: number): number {
  if (Math.abs(a.length - b.length) > maximo) return maximo + 1

  let anterior = Array.from({ length: b.length + 1 }, (_, i) => i)
  for (let i = 1; i <= a.length; i++) {
    const actual = [i]
    let mejor = i
    for (let j = 1; j <= b.length; j++) {
      const coste = a[i - 1] === b[j - 1] ? 0 : 1
      actual[j] = Math.min(anterior[j] + 1, actual[j - 1] + 1, anterior[j - 1] + coste)
      mejor = Math.min(mejor, actual[j])
    }
    if (mejor > maximo) return maximo + 1
    anterior = actual
  }
  return anterior[b.length]
}

/** Letras que se le perdonan al término escrito. Las cortas, ninguna. */
function tolerancia(termino: string): number {
  if (termino.length >= 8) return 2
  if (termino.length >= 5) return 1
  return 0
}

/** Singular del término, para que "panes" encuentre "Pan". */
function sinPlural(termino: string): string[] {
  const formas = [termino]
  if (termino.length > 4 && termino.endsWith('es')) formas.push(termino.slice(0, -2))
  if (termino.length > 3 && termino.endsWith('s')) formas.push(termino.slice(0, -1))
  return formas
}

const empiezaPor = (palabras: string[], forma: string) => palabras.some(p => p.startsWith(forma))

/** Cuántas letras comparten dos palabras desde el principio. */
function prefijoComun(a: string, b: string): number {
  let i = 0
  while (i < a.length && i < b.length && a[i] === b[i]) i++
  return i
}

/**
 * Puntúa un término contra un producto. 0 significa que no aparece.
 *
 * La escala decide el orden de los resultados, y está pensada para que gane
 * lo que la persona tenía en mente: "aceite" debe abrir con el Aceite
 * Mazeite y no con el atún en aceite de oliva; "malta" con el Maltín y no
 * con toda la sección de refrescos y maltas.
 */
function puntuar(indice: Indice, termino: string): number {
  const formas = sinPlural(termino)
  const conSinonimos = new Set(formas)
  for (const forma of formas) {
    for (const sinonimo of SINONIMOS[forma] ?? []) conSinonimos.add(sinonimo)
  }

  let mejor = 0
  for (const forma of conSinonimos) {
    if (indice.nombre[0] === forma) mejor = Math.max(mejor, 7)             // "Aceite Mazeite"
    else if (indice.nombre.includes(forma)) mejor = Math.max(mejor, 6)     // "Atún en Aceite"
    else if (indice.nombre[0]?.startsWith(forma)) mejor = Math.max(mejor, 5)
    else if (empiezaPor(indice.nombre, forma)) mejor = Math.max(mejor, 4)

    if (indice.marca.includes(forma)) mejor = Math.max(mejor, 5)
    else if (empiezaPor(indice.marca, forma)) mejor = Math.max(mejor, 4)
  }

  /*
    Erratas: sólo con lo que la persona escribió, nunca con los sinónimos.
    Cuanto más comparten el principio, más probable es que sea la palabra
    buscada y no una parecida por casualidad: "malta" y "maltín" comparten
    cuatro letras y apuntan al mismo producto; "malta" y "maíta" sólo dos.
  */
  const margen = tolerancia(termino)
  if (margen > 0) {
    const parecidas = [...indice.nombre, ...indice.marca]
      .filter(p => distancia(p, termino, margen) <= margen)
    for (const palabra of parecidas) {
      mejor = Math.max(mejor, prefijoComun(palabra, termino) >= 3 ? 3 : 2)
    }
  }

  /*
    Misma raíz. En español la palabra buscada y la del producto suelen
    compartir el arranque aunque terminen distinto: "malta" y "Maltín",
    "mayonesa" y "mayonesas". Con cuatro letras iguales al principio ya es
    el mismo producto, y esto alcanza donde no llega la corrección de
    erratas, que sólo perdona una letra.
  */
  if (termino.length >= 4) {
    if (indice.nombre.some(p => prefijoComun(p, termino) >= 4)) mejor = Math.max(mejor, 4)
    else if (indice.marca.some(p => prefijoComun(p, termino) >= 4)) mejor = Math.max(mejor, 4)
  }

  // Familias: sólo contra la categoría, y también la categoría literal
  const familias = new Set<string>(formas)
  for (const forma of formas) {
    for (const familia of FAMILIAS[forma] ?? []) familias.add(familia)
  }
  for (const familia of familias) {
    if (empiezaPor(indice.categoria, familia)) { mejor = Math.max(mejor, 2); break }
  }

  return mejor
}

/**
 * Filtra y ordena el catálogo por lo que se escribió.
 *
 * Todos los términos tienen que aparecer: "salsa fritz" trae las salsas de
 * Fritz, no todas las salsas y además todo lo de Fritz.
 */
export function buscar(productos: Product[], consulta: string): Product[] {
  const terminos = normalizar(consulta).split(' ').filter(t => t.length >= 2)
  if (terminos.length === 0) return productos

  const encontrados: { producto: Product; puntos: number }[] = []

  for (const producto of productos) {
    const indice = indiceDe(producto)
    let puntos = 0
    let completo = true

    for (const termino of terminos) {
      const punto = puntuar(indice, termino)
      if (punto === 0) { completo = false; break }
      puntos += punto
    }

    if (completo) encontrados.push({ producto, puntos })
  }

  return encontrados
    .sort((a, b) => b.puntos - a.puntos)
    .map(e => e.producto)
}
