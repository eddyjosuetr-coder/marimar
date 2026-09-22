import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/types'
import { useReveal } from '@/hooks/useReveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { getPackaging, scrollToCatalog, cn, productLabel } from '@/lib/utils'
import { ProductImage } from './ProductImage'
import { useTasa } from '@/hooks/useTasa'
import { precioPublico, precioReferencia } from '@/lib/tasa'
import { EtiquetaProducto } from './EtiquetaProducto'

interface FeaturedRailProps {
  products: Product[]
  onQuickView: (p: Product) => void
}

/** Segundos que tarda una vuelta completa, por ficha. Más fichas, más lento. */
const SEGUNDOS_POR_FICHA = 5

function RailCard({ product, onQuickView, inerte }: {
  product: Product
  onQuickView: (p: Product) => void
  inerte: boolean
}) {
  const { valor: tasa } = useTasa()

  return (
    <li className="flex-shrink-0 w-[190px] sm:w-[212px] mr-3.5 md:mr-4" aria-hidden={inerte || undefined}>
      <button
        type="button"
        onClick={() => onQuickView(product)}
        tabIndex={inerte ? -1 : undefined}
        className="group w-full text-left bg-paper-raised rounded-xl border border-line overflow-hidden transition-all duration-300 ease-out-expo hover:border-gold/55 hover:shadow-card-hover hover:-translate-y-1"
        aria-label={`Ver ${product.name}`}
      >
        <div className="relative aspect-square vitrina-panel overflow-hidden">
          <ProductImage
            product={product}
            className="p-3 transition-transform duration-500 ease-out-expo group-hover:scale-[1.08]"
          />
          <span className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gold text-espresso flex items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.6} />
          </span>
          {/* Si el producto está de oferta, en la portada es donde más se ve */}
          <EtiquetaProducto product={product} className="absolute top-2 left-2" />
        </div>

        <div className="p-3 border-t border-line">
          <div className="flex items-center gap-2 mb-1.5">
            <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-ink-muted truncate">
              {product.brand}
            </p>
            <span className="ml-auto flex-shrink-0 text-[9.5px] font-semibold text-ink-soft bg-paper-sunken rounded px-1.5 py-0.5">
              {getPackaging(product.name)}
            </span>
          </div>
          <h3 className="text-[12.5px] font-medium text-ink leading-snug line-clamp-2 min-h-[2.6em]">
            {productLabel(product.name)}
          </h3>
          <p className="mt-2 font-display text-[15px] font-extrabold text-ink leading-none tracking-tight tabular-nums">
            {precioPublico(product.price, tasa)}
            <span className="block text-[10.5px] font-medium text-ink-muted mt-1">
              {precioReferencia(product.price)}
            </span>
            {product.listPrice !== undefined && (
              <span className="block text-[11px] font-semibold text-ink-muted mt-1">
                Antes <span className="line-through">{precioPublico(product.listPrice, tasa)}</span>
              </span>
            )}
          </p>
        </div>
      </button>
    </li>
  )
}

/**
 * Riel de productos en venta que se desplaza solo.
 *
 * Sustituye a la banda de piezas publicitarias: en la portada pesa más ver el
 * producto real con su precio que un flyer. Se toma un artículo con precio de
 * cada categoría, así que la muestra cubre todo el catálogo y se actualiza
 * sola cuando entran productos nuevos.
 *
 * Detalles de comportamiento:
 *  · la pista se duplica para que el bucle cierre sin salto (se anima a -50%)
 *  · se detiene al pasar el cursor o al enfocar con teclado — si no, sería
 *    imposible hacer clic en una ficha en movimiento
 *  · con movimiento reducido no hay desplazamiento automático: el riel queda
 *    quieto y se arrastra a mano
 *  · la copia duplicada va `aria-hidden` y fuera del orden de tabulación para
 *    que el lector de pantalla no lea el catálogo dos veces
 */
export function FeaturedRail({ products, onQuickView }: FeaturedRailProps) {
  const ref = useReveal<HTMLElement>()
  const movimientoReducido = useReducedMotion()
  const [pausado, setPausado] = useState(false)

  if (products.length === 0) return null

  const duracion = products.length * SEGUNDOS_POR_FICHA
  const pistas = movimientoReducido ? [0] : [0, 1]

  return (
    <section
      ref={ref}
      data-reveal
      className="bg-paper border-b border-line overflow-hidden"
      aria-labelledby="rail-heading"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-12 md:pt-16 pb-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-eyebrow font-bold uppercase text-brand-ink mb-2.5">
              Esta semana
            </p>
            <h2 id="rail-heading" className="font-display text-display-sm font-extrabold text-ink">
              Lo que se está vendiendo
            </h2>
          </div>
          <button
            type="button"
            onClick={scrollToCatalog}
            className="hidden sm:inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-ink hover:text-brand-ink transition-colors group"
          >
            Ver todo el catálogo
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* El riel sangra a todo el ancho: refuerza que hay más de lo que se ve */}
      <div
        className={cn('mask-fade-x pb-12 md:pb-16', movimientoReducido && 'overflow-x-auto custom-scrollbar')}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocusCapture={() => setPausado(true)}
        onBlurCapture={() => setPausado(false)}
      >
        <ul
          className="flex w-max"
          style={movimientoReducido ? undefined : {
            animation: `marqueeLeft ${duracion}s linear infinite`,
            animationPlayState: pausado ? 'paused' : 'running',
            willChange: 'transform',
          }}
        >
          {pistas.map(pista => (
            products.map(product => (
              <RailCard
                key={`${pista}-${product.id}`}
                product={product}
                onQuickView={onQuickView}
                inerte={pista === 1}
              />
            ))
          ))}
        </ul>
      </div>
    </section>
  )
}
