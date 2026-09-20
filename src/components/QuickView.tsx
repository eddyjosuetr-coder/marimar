import { useEffect, useRef, useState } from 'react'
import { X, CheckCircle2, Package, Plus, MessageCircle } from 'lucide-react'
import type { Product } from '@/types'
import { formatAmount, getPackaging, waLink, cn, productLabel } from '@/lib/utils'
import { ProductImage } from './ProductImage'
import { flyToCart } from '@/lib/flyToCart'
import { nombresElegidos, totalElegidas } from '@/lib/salsas'
import { SalsaPicker } from './SalsaPicker'

interface QuickViewProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (p: Product, salsas?: string[]) => void
}

const BADGE_STYLES: Record<string, string> = {
  'Oferta': 'bg-brand text-white',
  'Nuevo': 'bg-ink text-paper',
  'Más Vendido': 'bg-brand-tint text-brand-ink ring-1 ring-brand/30',
}

export function QuickView({ product, onClose, onAddToCart }: QuickViewProps) {
  const fotoRef = useRef<HTMLDivElement>(null)

  /* Mismo gesto que en la ficha: el producto vuela al carrito y el diálogo cierra. */
  const agregar = (salsas?: string[]) => {
    if (!product) return
    flyToCart(fotoRef.current, product.image)
    onAddToCart(product, salsas)
    onClose()
  }

  // Escape cierra el diálogo y el fondo no debe desplazarse detrás de él.
  useEffect(() => {
    if (!product) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [product, onClose])

  if (!product) return null

  const packaging = getPackaging(product.name)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={product.name}>
      <div className="absolute inset-0 bg-espresso/65 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-4xl max-h-[90dvh] overflow-y-auto custom-scrollbar bg-paper-raised rounded-2xl shadow-lift animate-scale-in flex flex-col md:flex-row">

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-paper-raised/90 backdrop-blur-sm border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:bg-paper-sunken transition-colors"
          aria-label="Cerrar vista rápida"
        >
          <X className="w-5 h-5" strokeWidth={2.2} />
        </button>

        {/* Imagen */}
        <div ref={fotoRef} className="relative w-full md:w-1/2 bg-vitrina flex items-center justify-center p-8 md:p-12 min-h-[280px]">
          {product.badge && (
            <span className={cn(
              'absolute top-5 left-5 text-[11px] font-bold px-2.5 py-1.5 rounded-md tracking-wide z-10',
              BADGE_STYLES[product.badge] ?? 'bg-ink text-paper'
            )}>
              {product.badge}
            </span>
          )}
          <ProductImage product={product} className="max-w-sm" />
        </div>

        {/* Ficha */}
        <div className="w-full md:w-1/2 p-7 md:p-10 flex flex-col">
          <p className="text-eyebrow font-bold uppercase text-ink-muted mb-3">
            {product.brand}
          </p>

          <h2 className="font-display text-display-sm font-extrabold text-ink mb-6">
            {productLabel(product.name)}
          </h2>

          <div className="flex items-baseline gap-2 pb-6 mb-6 border-b border-line">
            {product.priceOnRequest ? (
              <span className="font-display text-[28px] font-extrabold text-ink-soft leading-none tracking-tight">
                Precio a consultar
              </span>
            ) : (
              <>
                <span className="text-[13px] font-bold uppercase tracking-[0.16em] text-ink-muted">USD</span>
                <span className="font-display text-[44px] font-extrabold text-ink leading-none tracking-tight tabular-nums">
                  {formatAmount(product.price)}
                </span>
                {product.soldByWeight && (
                  <span className="text-[15px] font-semibold text-ink-muted">/ KG</span>
                )}
                {product.listPrice !== undefined && (
                  <span className="flex items-baseline gap-2">
                    <span className="text-[19px] font-semibold text-ink-muted line-through tabular-nums">
                      {formatAmount(product.listPrice)}
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-wide text-brand-ink">
                      Ahorras {formatAmount(product.listPrice - product.price)}
                    </span>
                  </span>
                )}
              </>
            )}
          </div>

          {product.description && (
            <p className="text-[15px] leading-relaxed text-ink-soft mb-6">
              {product.description}
            </p>
          )}

          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3 text-[14px] text-ink-soft">
              <CheckCircle2 className="w-[18px] h-[18px] text-leaf flex-shrink-0 mt-0.5" strokeWidth={2.2} />
              Disponibilidad inmediata en almacén principal
            </li>
            <li className="flex items-start gap-3 text-[14px] text-ink-soft">
              <Package className="w-[18px] h-[18px] text-brand flex-shrink-0 mt-0.5" strokeWidth={2.2} />
              {/* Un solo nodo de texto: si no, cada trozo es un hijo flex y se reparten a lo ancho */}
              <span>
                {product.soldByWeight
                  ? <>Se vende al peso: <span className="font-semibold text-ink">desde 100 gr</span>, y de ahí los KG que necesites</>
                  : <>Presentación: <span className="font-semibold text-ink">{packaging}</span></>}
              </span>
            </li>
          </ul>

          <Compra key={product.id} product={product} onAgregar={agregar} />
        </div>
      </div>
    </div>
  )
}

/**
 * Botón de compra de la vista rápida.
 *
 * Vive en su propio componente con `key` por producto: al abrir otro producto
 * las salsas elegidas se reinician solas, sin efectos que limpien a mano.
 */
function Compra({ product, onAgregar }: {
  product: Product
  onAgregar: (salsas?: string[]) => void
}) {
  const [salsas, setSalsas] = useState<Record<number, number>>({})
  const requeridas = product.comboSalsas ?? 0
  const faltan = requeridas - totalElegidas(salsas)

  if (product.priceOnRequest) {
    return (
      <a
        href={waLink(product.name)}
        target="_blank"
        rel="noopener noreferrer"
        data-tap-target
        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-leaf text-white font-semibold text-[15px] hover:brightness-95 active:scale-[0.99] transition-all duration-200"
      >
        <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2.4} />
        Consultar precio por WhatsApp
      </a>
    )
  }

  return (
    <>
      {requeridas > 0 && (
        <SalsaPicker total={requeridas} value={salsas} onChange={setSalsas} />
      )}
      <button
        type="button"
        onClick={() => onAgregar(requeridas > 0 ? nombresElegidos(salsas) : undefined)}
        disabled={faltan > 0}
        className="mt-auto inline-flex items-center justify-center gap-2 w-full py-4 rounded-full bg-brand text-white font-semibold text-[15px] shadow-brand hover:bg-brand-deep active:scale-[0.99] disabled:bg-line-strong disabled:text-ink-soft disabled:shadow-none disabled:pointer-events-none transition-all duration-200"
      >
        <Plus className="w-[18px] h-[18px]" strokeWidth={2.6} />
        {faltan > 0
          ? `Elige ${faltan} ${faltan === 1 ? 'salsa más' : 'salsas más'}`
          : product.soldByWeight ? 'Agregar 100 gr'
          : requeridas > 0 ? 'Agregar combo al pedido'
          : 'Agregar al pedido'}
      </button>
    </>
  )
}
