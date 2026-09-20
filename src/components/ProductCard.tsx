import { useRef, useState } from 'react'
import { Eye, Plus, Check, MessageCircle, ListChecks } from 'lucide-react'
import type { Product } from '@/types'
import { formatAmount, getPackaging, waLink, cn, productLabel } from '@/lib/utils'
import { ProductImage } from './ProductImage'
import { flyToCart } from '@/lib/flyToCart'

interface ProductCardProps {
  product: Product
  onAddToCart: (p: Product) => void
  onQuickView: (p: Product) => void
}

/**
 * El color de la etiqueta comunica el significado; el texto lo confirma.
 * Nunca se depende sólo del color.
 */
const BADGE_STYLES: Record<string, string> = {
  'Oferta': 'bg-brand text-white',
  'Nuevo': 'bg-ink text-paper',
  'Más Vendido': 'bg-brand-tint text-brand-ink ring-1 ring-brand/30',
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const packaging = getPackaging(product.name)
  const fotoRef = useRef<HTMLButtonElement>(null)
  const [agregado, setAgregado] = useState(false)

  /* El vuelo sale de la foto; el botón confirma con un visto durante 1s. */
  const agregar = () => {
    flyToCart(fotoRef.current, product.image)
    onAddToCart(product)
    setAgregado(true)
    window.setTimeout(() => setAgregado(false), 1000)
  }

  return (
    <article className="group relative flex flex-col bg-paper-raised rounded-xl border border-line overflow-hidden transition-all duration-300 ease-out-expo hover:border-brand/45 hover:shadow-card-hover hover:-translate-y-1">

      {/* ── Panel de imagen (toda el área abre la vista rápida) ── */}
      <button
        ref={fotoRef}
        type="button"
        onClick={() => onQuickView(product)}
        className="relative aspect-square bg-vitrina overflow-hidden cursor-pointer text-left"
        aria-label={`Vista rápida de ${product.name}`}
      >
        <ProductImage
          product={product}
          className={cn(
            'p-3 transition-transform duration-500 ease-out-expo group-hover:scale-[1.07]',
            product.hoverImage && 'group-hover:opacity-0'
          )}
        />

        {/* Segunda toma: la caja se abre y muestra la unidad */}
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            loading="lazy"
            width={320}
            height={320}
            className="absolute inset-0 w-full h-full object-contain p-3 opacity-0 scale-100 group-hover:scale-[1.07] group-hover:opacity-100 transition-all duration-500 ease-out-expo"
          />
        )}

        {/* Vidrio de aumento — sólo en escritorio, al pasar el cursor */}
        <span className="hidden md:flex absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-paper-raised/90 backdrop-blur-sm text-ink-soft items-center justify-center opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-card">
          <Eye className="w-4 h-4" strokeWidth={2.2} />
        </span>
      </button>

      {/* Etiqueta */}
      {product.badge && (
        <span
          className={cn(
            'absolute top-2.5 left-2.5 text-[10px] font-bold px-2 py-1 rounded-md tracking-wide z-10 pointer-events-none',
            BADGE_STYLES[product.badge] ?? 'bg-ink text-paper'
          )}
        >
          {product.badge}
        </span>
      )}

      {/* ── Ficha ── */}
      <div className="flex flex-col flex-1 p-3.5 md:p-4 border-t border-line">

        <div className="flex items-center gap-2 mb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted truncate">
            {product.brand}
          </p>
          <span className="ml-auto flex-shrink-0 text-[10px] font-semibold text-ink-soft bg-paper-sunken rounded px-1.5 py-0.5">
            {packaging}
          </span>
        </div>

        <h3 className="text-[13px] md:text-[14px] font-medium text-ink leading-snug line-clamp-2 min-h-[2.6em]">
          {productLabel(product.name)}
        </h3>

        {/*
          Sin precio de lista no se muestra una cifra ni se deja agregar al
          carrito: la ficha manda a consultar por WhatsApp con el producto ya
          escrito en el mensaje.
        */}
        <div className="mt-auto pt-4 flex items-end justify-between gap-2">
          {product.priceOnRequest ? (
            <p className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink-muted mb-0.5">
                Precio
              </span>
              <span className="font-display text-[15px] md:text-[16px] font-bold text-ink-soft leading-none tracking-tight">
                A consultar
              </span>
            </p>
          ) : (
            <p className="min-w-0">
              <span className="block text-[9px] font-bold uppercase tracking-[0.16em] text-ink-muted mb-0.5">
                {product.soldByWeight ? 'USD por KG' : 'USD'}
              </span>
              <span className="font-display text-[19px] md:text-[22px] font-extrabold text-ink leading-none tracking-tight tabular-nums">
                {formatAmount(product.price)}
              </span>
              {/* En oferta: primero cuánto cuesta hoy, luego de cuánto bajó */}
              {product.listPrice !== undefined && (
                <span className="ml-1.5 text-[13px] font-semibold text-ink-muted line-through tabular-nums">
                  {formatAmount(product.listPrice)}
                </span>
              )}
              {product.soldByWeight && (
                <span className="block text-[10px] text-ink-muted mt-1">Desde 100 gr</span>
              )}
            </p>
          )}

          {product.priceOnRequest ? (
            <a
              href={waLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              data-tap-target
              className="flex-shrink-0 inline-flex items-center gap-1.5 h-10 px-3 md:px-3.5 rounded-full bg-leaf text-white font-semibold text-[12.5px] hover:brightness-95 active:scale-95 transition-all duration-200"
              aria-label={`Consultar el precio de ${product.name} por WhatsApp`}
            >
              <MessageCircle className="w-4 h-4" strokeWidth={2.4} />
              <span className="hidden xl:inline">Consultar</span>
            </a>
          ) : product.comboSalsas ? (
            <button
              type="button"
              onClick={() => onQuickView(product)}
              className="flex-shrink-0 inline-flex items-center gap-1.5 h-10 px-3 md:px-3.5 rounded-full bg-brand text-white font-semibold text-[12.5px] hover:bg-brand-deep active:scale-95 transition-all duration-200"
              aria-label={`Elegir las salsas de ${product.name}`}
            >
              <ListChecks className="w-4 h-4" strokeWidth={2.4} />
              <span className="hidden xl:inline">Elegir salsas</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={agregar}
              className={cn(
                'flex-shrink-0 inline-flex items-center gap-1.5 h-10 px-3 md:px-3.5 rounded-full text-white font-semibold text-[12.5px] active:scale-95 transition-all duration-200',
                agregado ? 'bg-leaf' : 'bg-brand hover:bg-brand-deep'
              )}
              aria-label={`Agregar ${product.name} al pedido`}
            >
              {agregado
                ? <Check className="w-4 h-4" strokeWidth={3} />
                : <Plus className="w-4 h-4" strokeWidth={2.6} />}
              <span className="hidden xl:inline">{agregado ? 'Listo' : 'Agregar'}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
