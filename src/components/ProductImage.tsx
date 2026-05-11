import { useState } from 'react'
import { Utensils, ImageOff } from 'lucide-react'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  product: Product
  className?: string
}

export function ProductImage({ product, className }: ProductImageProps) {
  const [errored, setErrored] = useState(false)
  const hasImage = product.image && product.image !== '' && !errored

  if (!hasImage) {
    const initials = product.brand.slice(0, 2).toUpperCase()
    return (
      <div className={cn("relative w-full h-full flex flex-col items-center justify-center bg-[#F4F4F5]", className)}>
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/70 flex items-center justify-center mb-2">
          <Utensils className="w-6 h-6 md:w-7 md:h-7 text-gray-400" strokeWidth={1.5} />
        </div>
        <span className="text-lg md:text-xl font-extrabold text-[#FF6B00] tracking-wider">{initials}</span>
        <span className="text-[9px] md:text-[10px] text-gray-400 mt-1 uppercase tracking-wider flex items-center gap-1">
          <ImageOff className="w-3 h-3" /> Foto próximamente
        </span>
      </div>
    )
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setErrored(true)}
      className={cn("w-full h-full object-contain transition-transform duration-500", className)}
    />
  )
}
