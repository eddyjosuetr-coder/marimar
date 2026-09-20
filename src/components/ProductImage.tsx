import { useState } from 'react'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  product: Product
  className?: string
}

/**
 * Foto de producto.
 *
 * El catálogo sólo publica productos con fotografía propia, así que aquí no
 * hay imágenes genéricas de stock: si la foto llegara a fallar se muestra una
 * marca de agua tipográfica, que es honesta, pesa cero y no finge un producto
 * que no es. (Antes había un respaldo a fotos de Unsplash por categoría: se
 * quitó porque disfrazaba fichas sin foto real y pedía imágenes a un tercero.)
 */
export function ProductImage({ product, className }: ProductImageProps) {
  const [errored, setErrored] = useState(false)

  if (product.image && !errored) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={320}
        height={320}
        onError={() => setErrored(true)}
        className={cn('w-full h-full object-contain transition-transform duration-500', className)}
      />
    )
  }

  const initials = product.brand.slice(0, 2).toUpperCase()

  return (
    // Vive en la vitrina, que es clara en ambos temas: el texto va en espresso
    // (oscuro en los dos) y no en `ink`, que en oscuro se vuelve claro.
    <div className={cn('w-full h-full flex flex-col items-center justify-center bg-vitrina !p-0', className)}>
      <span className="font-display text-3xl font-extrabold text-espresso/15 tracking-[0.1em]">{initials}</span>
      <span className="text-[9px] text-espresso/65 mt-1.5 uppercase tracking-[0.14em] text-center px-2">Foto próximamente</span>
    </div>
  )
}
