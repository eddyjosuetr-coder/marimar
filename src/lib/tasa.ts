/**
 * La tasa del día: cuántos bolívares vale un dólar.
 *
 * El catálogo está en dólares porque es lo que no se mueve; el bolívar sí,
 * todos los días. Por eso la tasa no vive en el catálogo: se trae aparte y
 * se multiplica al mostrar.
 *
 * DE DÓNDE SALE, en orden:
 *   1. la que el dueño publicó desde el panel, MIENTRAS SIGA VIGENTE
 *   2. la oficial del BCV, que la tienda consulta sola al abrir
 *   3. la última que se pudo traer, guardada en el navegador
 *   4. la de respaldo que viaja en el programa, para no quedarse sin precios
 *
 * La tienda muestra sus precios en bolívares, así que siempre hay una tasa:
 * quedarse sin ella sería quedarse sin precios que enseñar.
 *
 * CUÁNDO VENCE LA TASA DEL DUEÑO — El sábado por la mañana él pone la tasa
 * con la que quiere vender el fin de semana, porque el BCV no publica hasta
 * el lunes. Esa tasa manda hasta que el BCV publique una más nueva que la
 * que había cuando la escribió: el lunes por la mañana la tienda vuelve sola
 * a la oficial.
 *
 * Que venza sola no es un detalle: sin eso, la tasa de un sábado seguiría
 * rigiendo el martes, el jueves y el mes siguiente si a alguien se le olvida
 * quitarla, y la tienda estaría vendiendo a un cambio viejo sin que nadie lo
 * note.
 */

import { guardarEnLaNube, leerDeLaNube } from './nube'

const LLAVE = 'marimar.tasa.v1'
const FUENTE_BCV = 'https://ve.dolarapi.com/v1/dolares/oficial'
const ESPERA_MAXIMA_MS = 5000

export type OrigenTasa = 'manual' | 'bcv' | 'guardada' | 'respaldo'

/**
 * Último recurso: la tasa que viaja dentro del programa.
 *
 * La tienda muestra sus precios en bolívares, así que quedarse sin tasa
 * sería quedarse sin precios. Sólo se usa cuando no hay nada más: ni tasa
 * del dueño, ni respuesta del BCV, ni una guardada de visitas anteriores.
 * Se actualiza cada vez que se publica la tienda.
 */
const TASA_RESPALDO = 849.564

export interface EstadoTasa {
  /** Bolívares por dólar. Siempre hay un valor; ver `origen` para su calidad. */
  valor: number
  origen: OrigenTasa
  /** Día al que corresponde la tasa, en formato AAAA-MM-DD. */
  fecha: string | null
}

interface Guardado {
  manual?: number
  /** Día en que el dueño la escribió, para poder contarlo. */
  manualFecha?: string
  /**
   * Fecha del BCV que se conocía al escribirla. La tasa del dueño vence en
   * cuanto el BCV publique una posterior a ésta.
   */
  manualSobreBcv?: string
  bcv?: number
  bcvFecha?: string
}

function hoy(): string {
  return new Date().toISOString().slice(0, 10)
}

function esTasa(valor: unknown): valor is number {
  return typeof valor === 'number' && Number.isFinite(valor) && valor > 0
}

function leerGuardado(): Guardado {
  try {
    const crudo = window.localStorage.getItem(LLAVE)
    if (!crudo) return {}
    const datos: unknown = JSON.parse(crudo)
    if (typeof datos !== 'object' || datos === null) return {}
    const { manual, manualFecha, manualSobreBcv, bcv, bcvFecha } = datos as Record<string, unknown>
    return {
      ...(esTasa(manual) && { manual }),
      ...(typeof manualFecha === 'string' && { manualFecha }),
      ...(typeof manualSobreBcv === 'string' && { manualSobreBcv }),
      ...(esTasa(bcv) && { bcv }),
      ...(typeof bcvFecha === 'string' && { bcvFecha }),
    }
  } catch {
    return {}
  }
}

function escribir(datos: Guardado): void {
  try {
    window.localStorage.setItem(LLAVE, JSON.stringify(datos))
  } catch {
    // Sin almacenamiento la tasa dura lo que dure la visita: se vuelve a pedir.
  }
}

let guardado: Guardado = typeof window === 'undefined' ? {} : leerGuardado()
let estado: EstadoTasa = calcular()
const oyentes = new Set<() => void>()

/**
 * ¿Sigue mandando la tasa que puso el dueño? Sí mientras el BCV no haya
 * publicado una más nueva que la que había cuando la escribió.
 */
export function tasaManualVigente(): boolean {
  if (!esTasa(guardado.manual)) return false
  if (!guardado.bcvFecha || !guardado.manualSobreBcv) return true
  return guardado.bcvFecha <= guardado.manualSobreBcv
}

function calcular(): EstadoTasa {
  if (esTasa(guardado.manual) && tasaManualVigente()) {
    return { valor: guardado.manual, origen: 'manual', fecha: guardado.manualFecha ?? null }
  }
  if (esTasa(guardado.bcv)) {
    const delDia = guardado.bcvFecha === hoy()
    return { valor: guardado.bcv, origen: delDia ? 'bcv' : 'guardada', fecha: guardado.bcvFecha ?? null }
  }
  return { valor: TASA_RESPALDO, origen: 'respaldo', fecha: null }
}

function avisar(): void {
  estado = calcular()
  oyentes.forEach(oyente => oyente())
}

export function obtenerTasa(): EstadoTasa {
  return estado
}

export function suscribirTasa(alCambiar: () => void): () => void {
  oyentes.add(alCambiar)
  return () => oyentes.delete(alCambiar)
}

/**
 * Consulta la tasa oficial. Devuelve la tasa traída, o `null` si la fuente
 * no respondió: la tienda sigue funcionando con la última conocida.
 */
export async function consultarBCV(): Promise<number | null> {
  const corte = new AbortController()
  const reloj = window.setTimeout(() => corte.abort(), ESPERA_MAXIMA_MS)
  try {
    const respuesta = await fetch(FUENTE_BCV, { signal: corte.signal })
    if (!respuesta.ok) return null

    const datos: unknown = await respuesta.json()
    if (typeof datos !== 'object' || datos === null) return null
    const { promedio, fechaActualizacion } = datos as Record<string, unknown>
    if (!esTasa(promedio)) return null

    const fecha = typeof fechaActualizacion === 'string' ? fechaActualizacion.slice(0, 10) : hoy()
    guardado = { ...guardado, bcv: promedio, bcvFecha: fecha }
    escribir(guardado)
    avisar()
    return promedio
  } catch {
    return null
  } finally {
    window.clearTimeout(reloj)
  }
}

/**
 * La tasa que el dueño escribe en el panel. Manda sobre la del BCV hasta que
 * éste publique una más nueva.
 */
export function fijarTasaManual(valor: number): void {
  if (!esTasa(valor)) return
  guardado = {
    ...guardado,
    manual: valor,
    manualFecha: hoy(),
    // Se apunta contra qué publicación del BCV se puso, que es lo que
    // después decide si ya venció.
    manualSobreBcv: guardado.bcvFecha ?? hoy(),
  }
  escribir(guardado)
  avisar()
}

/** Vuelve a la tasa oficial. */
export function quitarTasaManual(): void {
  const resto: Guardado = { ...guardado }
  delete resto.manual
  delete resto.manualFecha
  delete resto.manualSobreBcv
  guardado = resto
  escribir(guardado)
  avisar()
}

/**
 * Trae del servidor la tasa que publicó el dueño.
 *
 * Es lo que hace que su tasa del sábado la vean sus clientes y no sólo él:
 * hasta que existió esta línea, lo que escribía en el panel se quedaba en
 * su propio equipo.
 */
export async function consultarTasaPublicada(): Promise<void> {
  const remota = leerRemota(await leerDeLaNube('tasa'))
  // Sin tasa publicada, o retirada por el dueño, se limpia la que hubiera
  // quedado guardada aquí: manda el servidor.
  guardado = remota
    ? { ...guardado, ...remota }
    : { ...guardado, manual: undefined, manualFecha: undefined, manualSobreBcv: undefined }
  escribir(guardado)
  avisar()
}

/** Valida lo que llega del servidor: es dato de fuera, no se confía en él. */
function leerRemota(crudo: unknown): Partial<Guardado> | null {
  if (typeof crudo !== 'object' || crudo === null) return null
  const { valor, fecha, sobreBcv } = crudo as Record<string, unknown>
  if (!esTasa(valor)) return null
  return {
    manual: valor,
    manualFecha: typeof fecha === 'string' ? fecha : hoy(),
    manualSobreBcv: typeof sobreBcv === 'string' ? sobreBcv : hoy(),
  }
}

/**
 * Publica la tasa para todos los clientes. Necesita la sesión del dueño;
 * devuelve `false` si el servidor la rechaza, y entonces el panel avisa en
 * vez de dar por hecho que se guardó.
 */
export async function publicarTasa(valor: number): Promise<boolean> {
  if (!esTasa(valor)) return false
  fijarTasaManual(valor)
  return guardarEnLaNube('tasa', {
    valor,
    fecha: guardado.manualFecha,
    sobreBcv: guardado.manualSobreBcv,
  })
}

/** Retira la tasa propia, también para los clientes. */
export async function despublicarTasa(): Promise<boolean> {
  quitarTasaManual()
  return guardarEnLaNube('tasa', {})
}

/** La tasa propia del dueño, esté vigente o ya vencida. */
export function tasaManualGuardada(): { valor: number; fecha: string; vigente: boolean } | null {
  if (!esTasa(guardado.manual)) return null
  return {
    valor: guardado.manual,
    fecha: guardado.manualFecha ?? '',
    vigente: tasaManualVigente(),
  }
}

/** Lo último que se supo del BCV, aunque el dueño tenga una tasa propia. */
export function tasaBCVConocida(): { valor: number; fecha: string } | null {
  return esTasa(guardado.bcv)
    ? { valor: guardado.bcv, fecha: guardado.bcvFecha ?? '' }
    : null
}

/* ── Presentación ─────────────────────────────────────────────────────── */

const FORMATO_BS = new Intl.NumberFormat('es-VE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

/** 10611.05 → "10.611,05" */
export function formatBs(monto: number): string {
  return FORMATO_BS.format(monto)
}

/**
 * El precio tal como lo ve el público: sólo bolívares.
 *
 * El negocio lleva su lista en dólares porque es lo que no se mueve, pero
 * quien compra paga en bolívares y es lo único que necesita leer. Ver las
 * dos monedas obliga a hacer la cuenta mentalmente y siembra la duda de en
 * cuál se cobra.
 */
export function precioPublico(dolares: number, tasa: number): string {
  return `Bs ${FORMATO_BS.format(aBolivares(dolares, tasa))}`
}

/** Las tasas se dictan con dos decimales aunque lleguen con tres. */
export function formatTasa(valor: number): string {
  return FORMATO_BS.format(valor)
}

export function aBolivares(dolares: number, tasa: number): number {
  return Math.round(dolares * tasa * 100) / 100
}
