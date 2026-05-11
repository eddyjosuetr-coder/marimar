import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'

interface RelatedCarouselProps {
  products: Product[]
  onAddToCart: (p: Product) => void
  onQuickView: (p: Product) => void
}

export function RelatedCarousel({ products, onAddToCart, onQuickView }: RelatedCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    if (containerRef.current) {
      const amount = containerRef.current.clientWidth * 0.8
      containerRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
    }
  }

  if (products.length === 0) return null

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-black text-gray-800">También te puede interesar</h2>
        <div className="flex gap-2">
          <button onClick={() => scroll('left')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll('right')} className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <div ref={containerRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        {products.map(p => (
          <div key={p.id} className="w-[200px] md:w-[240px] flex-shrink-0 snap-start">
            <ProductCard product={p} onAddToCart={onAddToCart} onQuickView={onQuickView} />
          </div>
        ))}
      </div>
    </section>
  )
}
