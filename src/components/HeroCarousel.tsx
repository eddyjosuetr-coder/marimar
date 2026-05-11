import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { scrollToCatalog } from '@/lib/utils'
import type { HeroSlide } from '@/types'

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length === 0) return
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 6000)
    return () => clearInterval(t)
  }, [slides.length])

  if (slides.length === 0) return null
  const current = slides[index]

  return (
    <section className="relative w-full h-[380px] md:h-[450px] overflow-hidden bg-[#1A1A1A]">
      {slides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-xl text-white animate-fade-in-up" key={index}>
          <span className="inline-flex items-center gap-2 bg-[#FF6B00]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            {current.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-4">
            {current.title} <span className="text-[#FFA500]">{current.highlight}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-200 mb-6 max-w-md">{current.description}</p>
          <div className="flex gap-3">
            <button onClick={scrollToCatalog} className="bg-[#FF6B00] text-white font-bold px-6 py-3 rounded-full hover:bg-[#E55F00] transition-colors shadow-lg shadow-[#FF6B00]/30">
              Ver Catálogo
            </button>
            <a href="tel:+584241234567" className="bg-white/10 backdrop-blur border border-white/40 text-white font-bold px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
              Llamar
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-[#FF6B00]' : 'w-2 bg-white/50 hover:bg-white/80'}`} />
        ))}
      </div>

      <button onClick={() => setIndex(i => (i - 1 + slides.length) % slides.length)}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur items-center justify-center z-10">
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button onClick={() => setIndex(i => (i + 1) % slides.length)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur items-center justify-center z-10">
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </section>
  )
}
