/**
 * La tasa del día: cuántos bolívares vale un dólar.
 *
 * El catálogo está en dólares porque es lo que no se mueve; el bolívar sí,
 * todos los días. Por eso la tasa no vive en el catálogo: se trae aparte y
 * se multiplica al mostrar.
 *
 * DE DÓNDE SALE, en orden:
 *   1. la que el dueño escribió a mano en el panel, si la escribió
 *   2. la oficial del BCV, que la tienda consulta sola al abrir
 *   3. la última que se pudo traer, guardada en el navegador
 *
 * Si no hay ninguna —primera visita sin internet— la tienda muestra sólo
 * dólares. Es preferible a inventar un bolívar que nadie podría cobrar.
 */

const LLAVE = 'marimar.tasa.v1'
const FUENTE_BCV = 'https://ve.dolarapi.com/v1/dolares/oficial'
const ESPERA_MAXIMA_MS = 5000

export type OrigenTasa = 'manual' | 'bcv' | 'guardada'

export interface EstadoTasa {
  /** Bolívares por dólar. `null` mientras no se conozca ninguna. */
  valor: number | null
  origen: OrigenTasa | null
  /** Día al que corresponde la tasa, en formato AAAA-MM-DD. */
  fecha: string | null
}

interface Guardado {
  manual?: number
  manualFecha?: string
  bcv?: number
  bcvFecha?: string
}

const SIN_TASA: EstadoTasa = { valor: null, origen: null, fecha: null }

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
    const { manual, manualFecha, bcv, bcvFecha } = datos as Record<string, unknown>
    return {
      ...(esTasa(manual) && { manual }),
      ...(typeof manualFecha === 'string' && { manualFecha }),
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

function calcular(): EstadoTasa {
  if (esTasa(guardado.manual)) {
    return { valor: guardado.manual, origen: 'manual', fecha: guardado.manualFecha ?? null }
  }
  if (esTasa(guardado.bcv)) {
    const delDia = guardado.bcvFecha === hoy()
    return { valor: guardado.bcv, origen: delDia ? 'bcv' : 'guardada', fecha: guardado.bcvFecha ?? null }
  }
  return SIN_TASA
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

/** La tasa que el dueño escribe en el panel. Manda sobre la del BCV. */
export function fijarTasaManual(valor: number): void {
  if (!esTasa(valor)) return
  guardado = { ...guardado, manual: valor, manualFecha: hoy() }
  escribir(guardado)
  avisar()
}

/** Vuelve a la tasa oficial. */
export function quitarTasaManual(): void {
  const resto: Guardado = { ...guardado }
  delete resto.manual
  delete resto.manualFecha
  guardado = resto
  escribir(guardado)
  avisar()
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

/** Las tasas se dictan con dos decimales aunque lleguen con tres. */
export function formatTasa(valor: number): string {
  return FORMATO_BS.format(valor)
}

export function aBolivares(dolares: number, tasa: number): number {
  return Math.round(dolares * tasa * 100) / 100
}
