import type { Product } from '@/types'
import { cn } from '@/lib/utils'

/**
 * La etiqueta que se cruza sobre la foto del producto.
 *
 * "Oferta" no es una etiqueta más. Las otras describen; ésta es la única que
 * existe para que alguien compre hoy lo que quizá compraría la semana que
 * viene. Por eso pesa más que las demás y lleva el descuento al lado:
 * "Oferta" dice qué es, el −18% dice cuánto, y es el número el que convence.
 *
 * El color comunica el significado y el texto lo confirma: nunca se depende
 * sólo del color.
 */
const ESTILOS: Record<string, string> = {
  'Oferta': 'bg-brand text-white shadow-card',
  'Nuevo': 'bg-ink text-paper',
  'Más Vendido': 'bg-brand-tint text-brand-ink ring-1 ring-brand/30',
}

/**
 * Cuánto bajó, en porcentaje entero.
 *
 * Null cuando no hay rebaja que contar: sin precio anterior, o cuando la
 * diferencia no llega ni al 1% y anunciarla sería vender humo.
 */
function descuento(product: Product): number | null {
  if (product.listPrice === undefined || product.listPrice <= product.price) return null
  const porcentaje = Math.round((1 - product.price / product.listPrice) * 100)
  return porcentaje >= 1 ? porcentaje : null
}

interface EtiquetaProductoProps {
  product: Product
  /** Dónde se coloca sobre la foto; lo decide quien la usa. */
  className?: string
  /** En la vista ampliada hay sitio para que respire un punto más. */
  grande?: boolean
}

export function EtiquetaProducto({ product, className, grande = false }: EtiquetaProductoProps) {
  if (!product.badge) return null

  const esOferta = product.badge === 'Oferta'
  const rebaja = esOferta ? descuento(product) : null

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-lg font-extrabold uppercase z-10 pointer-events-none',
        esOferta
          ? cn('tracking-[0.05em] px-2.5 py-1.5', grande ? 'text-[14px]' : 'text-[11.5px] md:text-[12.5px]')
          : cn('tracking-wide px-2 py-1', grande ? 'text-[11px]' : 'text-[10px]'),
        ESTILOS[product.badge] ?? 'bg-ink text-paper',
        className
      )}
    >
      {product.badge}
      {rebaja !== null && (
        <span className="ml-1.5 pl-1.5 border-l border-white/45 tabular-nums">
          −{rebaja}%
        </span>
      )}
    </span>
  )
}
