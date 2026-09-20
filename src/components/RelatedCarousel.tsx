import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { useReveal } from '@/hooks/useReveal'

interface RelatedCarouselProps {
  products: Product[]
  onAddToCart: (p: Product) => void
  onQuickView: (p: Product) => void
}

export function RelatedCarousel({ products, onAddToCart, onQuickView }: RelatedCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const sectionRef = useReveal<HTMLElement>()

  const scroll = (direction: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const amount = track.clientWidth * 0.8
    track.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  if (products.length === 0) return null

  return (
    <section ref={sectionRef} data-reveal className="border-t border-line bg-paper" aria-labelledby="related-heading">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16">

        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-eyebrow font-bold uppercase text-brand-ink mb-2.5">
              Lo más económico de la categoría
            </p>
            <h2 id="related-heading" className="font-display text-display-sm font-extrabold text-ink">
              Buenos precios para empezar
            </h2>
          </div>

          <div className="hidden sm:flex gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/35 hover:bg-paper-sunken transition-all duration-200"
              aria-label="Desplazar a la izquierda"
            >
              <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink-soft hover:text-ink hover:border-ink/35 hover:bg-paper-sunken transition-all duration-200"
              aria-label="Desplazar a la derecha"
            >
              <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <ul
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {products.map(p => (
            <li key={p.id} className="w-[220px] md:w-[248px] flex-shrink-0 snap-start">
              <ProductCard product={p} onAddToCart={onAddToCart} onQuickView={onQuickView} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
