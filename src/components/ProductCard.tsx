import { Eye, Plus } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  onAddToCart: (p: Product) => void
  onQuickView: (p: Product) => void
}

export function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const badgeStyles: Record<string, string> = {
    'Oferta': 'bg-red-500 text-white',
    'Nuevo': 'bg-[#FF6B00] text-white',
    'Más Vendido': 'bg-[#1A1A1A] text-white',
  }

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-square bg-[#FAFAFA] p-1 flex items-center justify-center overflow-hidden">
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full z-10 tracking-wide ${badgeStyles[product.badge] || 'bg-[#FF6B00] text-white'}`}>
            {product.badge}
          </span>
        )}

        <button onClick={() => onQuickView(product)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-[#FF6B00] hover:text-white text-gray-700 shadow-sm"
          aria-label="Vista rápida">
          <Eye className="w-3.5 h-3.5" />
        </button>

        <ProductImage product={product} className={`scale-110 group-hover:scale-125 ${product.hoverImage ? 'group-hover:opacity-0' : ''} transition-all duration-300`} />
        {product.hoverImage && (
          <img src={product.hoverImage} alt="" loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-1 opacity-0 scale-110 group-hover:scale-125 group-hover:opacity-100 transition-all duration-300" />
        )}

        <button onClick={() => onAddToCart(product)}
          className="absolute bottom-2 left-2 right-2 bg-[#FF6B00] text-white text-xs font-bold py-2 rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#E55F00] flex items-center justify-center gap-1.5 shadow-lg">
          <Plus className="w-3.5 h-3.5" /> Agregar
        </button>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        <p className="text-[9px] md:text-[10px] text-gray-400 font-semibold uppercase tracking-wider truncate">{product.brand}</p>
        <h3 className="mt-1 text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.25rem] leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 truncate">{product.category}</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base md:text-lg font-extrabold text-[#FF6B00]">{formatPrice(product.price)}</p>
          <button onClick={() => onAddToCart(product)}
            className="md:hidden w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center"
            aria-label="Agregar">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
