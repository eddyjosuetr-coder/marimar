import { products } from '@/data/products'
import { productLabel } from './utils'

/** Categoría de donde salen las salsas que se pueden elegir en un combo. */
export const CATEGORIA_SALSAS = 'Salsas Detalladas'

export interface OpcionSalsa {
  id: number
  /** "Cheddar", "Mayonesa", "BBQ"… el sabor, sin "Salsa de" ni "Detallada 370 gr". */
  nombre: string
  image: string
}

/**
 * Salsas que se pueden elegir para un combo.
 *
 * Se leen del catálogo, no de una lista escrita a mano: si la tienda deja de
 * vender una salsa detallada, desaparece sola del selector, y si agrega una,
 * aparece. Así el combo nunca ofrece una salsa que no existe.
 */
export const SALSAS_COMBO: OpcionSalsa[] = products
  .filter(p => p.category === CATEGORIA_SALSAS && !p.priceOnRequest)
  .map(p => ({
    id: p.id,
    nombre: productLabel(p.name)
      .replace(/\s+Detallada\b.*$/, '')
      .replace(/^Salsa\s+(de\s+)?/, ''),
    image: p.image,
  }))

/** Cuántas salsas lleva elegidas el cliente. */
export function totalElegidas(value: Record<number, number>): number {
  return Object.values(value).reduce((a, b) => a + b, 0)
}

/** Nombres de las salsas elegidas, repetidas según su cantidad. */
export function nombresElegidos(value: Record<number, number>): string[] {
  return SALSAS_COMBO.flatMap(s => Array<string>(value[s.id] ?? 0).fill(s.nombre))
}
