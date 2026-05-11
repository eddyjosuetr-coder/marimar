import { X, CheckCircle, Package } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { ProductImage } from './ProductImage'

interface QuickViewProps {
  product: Product | null
  onClose: () => void
  onAddToCart: (p: Product) => void
}

export function QuickView({ product, onClose, onAddToCart }: QuickViewProps) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-fade-in-up flex flex-col md:flex-row shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-gray-100 rounded-full backdrop-blur transition-colors shadow-sm">
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="w-full md:w-1/2 bg-[#FAFAFA] p-8 md:p-12 flex items-center justify-center relative min-h-[300px]">
          {product.badge && (
            <span className="absolute top-6 left-6 text-xs font-bold px-3 py-1 rounded-full bg-[#FF6B00] text-white tracking-wide shadow-sm z-10">
              {product.badge}
            </span>
          )}
          <ProductImage product={product} className="w-full max-w-md h-auto hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <p className="text-[#FF6B00] font-bold text-sm tracking-widest uppercase mb-2">{product.brand}</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 leading-tight mb-4">{product.name}</h2>
          
          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-black text-[#1A1A1A]">{formatPrice(product.price)}</span>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span>Disponibilidad inmediata en almacén principal</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <Package className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
              <span>Venta exclusiva al mayor (Presentación: {product.name.split('-')[1]?.trim() || 'Unidad'})</span>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100 flex gap-4">
            <button onClick={() => { onAddToCart(product); onClose(); }} 
              className="flex-1 bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#FF6B00]/30 flex items-center justify-center gap-2">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
