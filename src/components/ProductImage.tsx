import { useState } from 'react'
import type { Product } from '@/types'
import { cn } from '@/lib/utils'

// Fotos representativas por CATEGORÍA (Unsplash – licencia libre)
const CATEGORY_FALLBACK: Record<string, string> = {
  'Aceites de Cocina':         'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=75&fit=crop',
  'Aderezos Especiales':       'https://images.unsplash.com/photo-1589133088049-9bed41b6e4de?w=400&q=75&fit=crop',
  'Bases en Polvo':            'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=75&fit=crop',
  'Bebidas e Infusiones':      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=75&fit=crop',
  'Bolsas de Papel':           'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&q=75&fit=crop',
  'Bolsas Plásticas':          'https://images.unsplash.com/photo-1611271517913-a9b6df50c5d0?w=400&q=75&fit=crop',
  'Cajas y Platos de Cartón':  'https://images.unsplash.com/photo-1609743522471-83c84ce23e32?w=400&q=75&fit=crop',
  'Carnes Frescas':            'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=400&q=75&fit=crop',
  'Cerdo y Tocinetas':         'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=75&fit=crop',
  'Cereales y Galletas':       'https://images.unsplash.com/photo-1517093928436-a3b00b5c9c04?w=400&q=75&fit=crop',
  'Conservas y Untables':      'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=400&q=75&fit=crop',
  'Curados':                   'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400&q=75&fit=crop',
  'Dulces y Chocolates':       'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&q=75&fit=crop',
  'Embutidos - Chorizos':      'https://images.unsplash.com/photo-1539136788836-5699e78bfc75?w=400&q=75&fit=crop',
  'Embutidos- Salchichas':     'https://images.unsplash.com/photo-1551028150-64b9f26a966f?w=400&q=75&fit=crop',
  'Embutidos - Salchichas':    'https://images.unsplash.com/photo-1551028150-64b9f26a966f?w=400&q=75&fit=crop',
  'Enlatados':                 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&q=75&fit=crop',
  'Envases Plásticos / Anime': 'https://images.unsplash.com/photo-1611271517913-a9b6df50c5d0?w=400&q=75&fit=crop',
  'Harinas y Almidones':       'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&q=75&fit=crop',
  'Jamones y Fiambres':        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=75&fit=crop',
  'Leches en Polvo':           'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=75&fit=crop',
  'Limpieza e Higiene':        'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&q=75&fit=crop',
  'Lácteos':                   'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=75&fit=crop',
  'Lácteos y Bebidas':         'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=75&fit=crop',
  'Mantequillas':              'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=75&fit=crop',
  'Mayonesas':                 'https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=400&q=75&fit=crop',
  'Mortadelas':                'https://images.unsplash.com/photo-1612178537253-bccd437b730e?w=400&q=75&fit=crop',
  'Mostazas':                  'https://images.unsplash.com/photo-1632230456937-4c38e68ce2f5?w=400&q=75&fit=crop',
  'Papelería e Higiene':       'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&q=75&fit=crop',
  'Papeles de Envoltura':      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=400&q=75&fit=crop',
  'Pechugas y Pavos':          'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&q=75&fit=crop',
  'Productos Varios':          'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=75&fit=crop',
  'Quesos':                    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=75&fit=crop',
  'Salsas BBQ':                'https://images.unsplash.com/photo-1632239776255-0a7f24814df2?w=400&q=75&fit=crop',
  'Salsas Oscuras y Ajo':      'https://images.unsplash.com/photo-1589133088049-9bed41b6e4de?w=400&q=75&fit=crop',
  'Salsas de Tomate':          'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&q=75&fit=crop',
  'Salsas':                    'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&q=75&fit=crop',
  'Semillas y Especias':       'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&q=75&fit=crop',
  'Sopas y Cubitos':           'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=75&fit=crop',
  'Tomates Pelados y Passata': 'https://images.unsplash.com/photo-1622973536968-3ead9e780960?w=400&q=75&fit=crop',
  'Utensilios':                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=75&fit=crop',
  'Vasos y Cubiertos':         'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&q=75&fit=crop',
  'Vinagres':                  'https://images.unsplash.com/photo-1618452457617-f53e0b54acb7?w=400&q=75&fit=crop',
}

interface ProductImageProps {
  product: Product
  className?: string
}

export function ProductImage({ product, className }: ProductImageProps) {
  const [primaryErrored, setPrimaryErrored] = useState(false)
  const [fallbackErrored, setFallbackErrored] = useState(false)

  const hasProductImage = product.image && product.image !== '' && !primaryErrored

  // 1. Imagen real del producto
  if (hasProductImage) {
    return (
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        onError={() => setPrimaryErrored(true)}
        className={cn('w-full h-full object-contain transition-transform duration-500', className)}
      />
    )
  }

  // 2. Imagen de respaldo por categoría
  const fallbackUrl = !fallbackErrored ? CATEGORY_FALLBACK[product.category] : undefined

  if (fallbackUrl) {
    return (
      <div className={cn('relative w-full h-full overflow-hidden', className)}>
        <img
          src={fallbackUrl}
          alt={product.category}
          loading="lazy"
          onError={() => setFallbackErrored(true)}
          className="w-full h-full object-cover opacity-55 scale-110"
        />
        {/* Overlay con nombre de la marca */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent flex flex-col items-center justify-end p-2">
          <span className="text-[9px] font-extrabold text-gray-700 uppercase tracking-widest text-center leading-tight line-clamp-1">
            {product.brand !== product.category ? product.brand : ''}
          </span>
        </div>
      </div>
    )
  }

  // 3. Placeholder compacto si todo falla
  const initials = product.brand.slice(0, 2).toUpperCase()
  return (
    <div className={cn('w-full h-full flex flex-col items-center justify-center bg-orange-50', className)}>
      <span className="text-2xl font-extrabold text-[#FF6B00]/40 tracking-widest">{initials}</span>
      <span className="text-[8px] text-gray-400 mt-1 uppercase tracking-wider">Sin imagen</span>
    </div>
  )
}
