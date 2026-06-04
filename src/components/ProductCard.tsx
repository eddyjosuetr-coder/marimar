import { Eye, Plus } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  onAddToCart: (p: Product) => void
  onQuickView: (p: Product) => void
}

const BADGE_STYLES: Record<string, string> = {
  'Oferta':      'bg-red-500 text-white',
  'Nuevo':       'bg-[#FF6B00] text-white',
  'Más Vendido': 'bg-[#1A1A1A] text-white',
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-100/60 transition-all duration-300 hover:-translate-y-1.5 flex flex-col">

      {/* ── Área de imagen ── */}
      <div className="relative aspect-square bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50 flex items-center justify-center overflow-hidden">

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-2.5 left-2.5 text-[9px] md:text-[10px] font-bold px-2.5 py-[3px] rounded-full z-10 tracking-wide shadow-sm ${BADGE_STYLES[product.badge] ?? 'bg-[#FF6B00] text-white'}`}>
            {product.badge}
          </span>
        )}

        {/* Botón vista rápida */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute top-2.5 right-2.5 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 hover:bg-[#FF6B00] hover:text-white text-gray-500"
          aria-label="Vista rápida"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>

        {/* ── ANIMACIÓN HOVER: caja → unidad (se conserva exactamente) ── */}
        <ProductImage
          product={product}
          className={`scale-110 group-hover:scale-125 ${product.hoverImage ? 'group-hover:opacity-0' : ''} transition-all duration-300`}
        />
        {product.hoverImage && (
          <img
            src={product.hoverImage}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-2 opacity-0 scale-110 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300"
          />
        )}

        {/* Botón agregar (aparece al hover en desktop) */}
        <button
          onClick={() => onAddToCart(product)}
          className="absolute bottom-2 left-2 right-2 bg-[#FF6B00] text-white text-xs font-bold py-2.5 rounded-xl opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#E55F00] flex items-center justify-center gap-1.5 shadow-lg shadow-orange-200/50 z-10"
        >
          <Plus className="w-3.5 h-3.5" /> Agregar al pedido
        </button>
      </div>

      {/* ── Información del producto ── */}
      <div className="p-3 md:p-4 flex flex-col flex-1 border-t border-gray-50">
        <p className="text-[9px] md:text-[10px] text-[#FF6B00] font-bold uppercase tracking-widest truncate">
          {product.brand}
        </p>
        <h3 className="mt-1 text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.5rem] leading-snug">
          {product.name}
        </h3>

        <div className="mt-auto pt-3 flex items-end justify-between">
          <div>
            <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wide">Precio</p>
            <p className="text-base md:text-lg font-extrabold text-[#FF6B00] leading-tight">
              {formatPrice(product.price)}
            </p>
          </div>
          {/* Botón móvil (siempre visible) */}
          <button
            onClick={() => onAddToCart(product)}
            className="md:hidden w-9 h-9 bg-[#FF6B00] text-white rounded-full flex items-center justify-center shadow-md shadow-orange-200/50 active:scale-95 transition-transform"
            aria-label="Agregar"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
