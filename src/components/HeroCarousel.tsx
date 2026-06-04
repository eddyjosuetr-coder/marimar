import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ShoppingBag, Phone } from 'lucide-react'
import { scrollToCatalog } from '@/lib/utils'
import type { HeroSlide } from '@/types'

const BRANDS = '· FRITZ · HEINZ · LA VIÑA · KRYSTAL · McCORMICK · TORONDOY · LEYTON · PURÍSIMA · OBA · DOÑA NELLY '

/* ── CTA Buttons ──────────────────────────────────────── */
function CTAButtons() {
  return (
    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
      <button
        onClick={scrollToCatalog}
        className="group relative flex items-center gap-2.5 font-bold text-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          padding: '14px 30px',
          background: 'linear-gradient(135deg, #FF6B00 0%, #CC4500 100%)',
          boxShadow: '0 8px 36px rgba(255,107,0,0.52), inset 0 1px 0 rgba(255,255,255,0.2)',
        }}
      >
        <ShoppingBag className="w-4 h-4" />
        Ver Catálogo
      </button>
      <a
        href="tel:+584241234567"
        className="flex items-center gap-2.5 font-bold text-white rounded-full transition-all duration-300 hover:bg-white/12"
        style={{
          padding: '14px 30px',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Phone className="w-4 h-4" />
        Llamar ahora
      </a>
    </div>
  )
}

/* ── SLIDE 1 — Logo flotando limpio ───────────────────── */
function LogoSlide({ slide }: { slide: HeroSlide }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{
      background: 'linear-gradient(135deg, #FF6B00 0%, #FF8C20 25%, #FF9A30 50%, #E85500 75%, #D04800 100%)',
    }}>

      {/* Animated mesh overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(255,180,60,0.4) 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, rgba(255,220,120,0.25) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(200,60,0,0.3) 0%, transparent 50%)',
        animation: 'heroMeshShift 8s ease-in-out infinite alternate',
      }} />

      {/* Flowing blob shapes */}
      <div className="absolute pointer-events-none" style={{
        width: '600px', height: '600px', borderRadius: '42% 58% 62% 38% / 45% 55% 45% 55%',
        top: '-20%', right: '-10%',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,200,100,0.08) 100%)',
        animation: 'heroBlobMorph 12s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none" style={{
        width: '500px', height: '500px', borderRadius: '55% 45% 40% 60% / 50% 40% 60% 50%',
        bottom: '-25%', left: '-8%',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.08) 0%, rgba(255,255,255,0.05) 100%)',
        animation: 'heroBlobMorph 15s ease-in-out 3s infinite reverse',
      }} />

      {/* Diagonal light streaks */}
      <div className="absolute pointer-events-none" style={{
        width: '200%', height: '100%', top: 0, left: '-50%',
        background: 'repeating-linear-gradient(115deg, transparent, transparent 100px, rgba(255,255,255,0.03) 100px, rgba(255,255,255,0.03) 102px)',
      }} />

      {/* Circle patterns */}
      <div className="absolute hidden lg:block pointer-events-none" style={{
        width: '350px', height: '350px', borderRadius: '50%',
        top: '-8%', right: '-3%',
        border: '2px solid rgba(255,255,255,0.10)',
      }} />
      <div className="absolute hidden lg:block pointer-events-none" style={{
        width: '250px', height: '250px', borderRadius: '50%',
        bottom: '-8%', left: '-3%',
        border: '2px solid rgba(255,255,255,0.08)',
      }} />

      {/* Small floating circles */}
      {[
        { s: 8, x: '8%', y: '15%', o: 0.15 },
        { s: 12, x: '15%', y: '75%', o: 0.1 },
        { s: 6, x: '85%', y: '65%', o: 0.12 },
        { s: 10, x: '75%', y: '18%', o: 0.08 },
        { s: 14, x: '92%', y: '45%', o: 0.1 },
        { s: 8, x: '45%', y: '90%', o: 0.12 },
      ].map((c, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{
          width: c.s, height: c.s,
          left: c.x, top: c.y,
          background: `rgba(255,255,255,${c.o})`,
          animation: `heroParticleFloat ${5 + i}s ease-in-out ${i * 0.5}s infinite`,
        }} />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-full flex items-center">
        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-8 w-full">

          {/* Logo — floating freely, no circle */}
          <div className="flex items-center justify-center order-2 lg:order-1">
            <div style={{ animation: 'heroLogoFloat 5s ease-in-out infinite' }}>
              <img
                src="/images/logo.png"
                alt="Marimar Milenium"
                style={{
                  height: '260px', width: 'auto',
                  filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.3)) drop-shadow(0 0 20px rgba(255,255,255,0.15))',
                }}
              />
            </div>
          </div>

          {/* Text */}
          <div className="text-white order-1 lg:order-2 text-center lg:text-left" style={{ animation: 'heroFadeUp 0.8s ease both' }}>
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-5">
              <span className="h-px w-8 bg-white/40" />
              <span className="text-[10px] font-black tracking-[0.24em] uppercase text-white/80">
                {slide.eyebrow}
              </span>
              <span className="h-px w-8 bg-white/40" />
            </div>

            <h1 className="font-black leading-[1.04] mb-5 text-white" style={{
              fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)',
              textShadow: '0 2px 20px rgba(0,0,0,0.15)',
            }}>
              <span className="block">{slide.title}</span>
              <span className="block" style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}>
                {slide.highlight}
              </span>
            </h1>

            <p className="leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 text-[15px] text-white/75">
              {slide.description}
            </p>

            <div className="mb-10">
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <button
                  onClick={scrollToCatalog}
                  className="flex items-center gap-2.5 font-bold rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    padding: '14px 30px',
                    background: '#fff',
                    color: '#E85500',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Ver Catálogo
                </button>
                <a
                  href="tel:+584241234567"
                  className="flex items-center gap-2.5 font-bold text-white rounded-full transition-all duration-300 hover:bg-white/20"
                  style={{
                    padding: '14px 30px',
                    background: 'rgba(255,255,255,0.15)',
                    border: '2px solid rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Phone className="w-4 h-4" />
                  Llamar ahora
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start">
              {[['500+', 'Productos'], ['50+', 'Marcas'], ['Nacional', 'Delivery']].map(([v, l], i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <span className="w-px h-7 bg-white/25" />}
                  <div>
                    <p className="text-white font-black text-xl leading-none">{v}</p>
                    <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/50 mt-1">{l}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom white accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1" style={{
        background: 'linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)',
      }} />
    </div>
  )
}

/* ── IMAGE SLIDE — cinematic photo on dark bg ─────────── */
function ImageSlide({ slide, isActive }: { slide: HeroSlide; isActive: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#050404' }}>
      <div className="absolute inset-0 transition-transform duration-[8000ms] ease-out" style={{ transform: isActive ? 'scale(1.08)' : 'scale(1)' }}>
        <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.4 }} />
      </div>

      <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(5,4,4,0.9) 0%, rgba(5,4,4,0.6) 50%, rgba(5,4,4,0.3) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,4,4,0.75) 0%, transparent 40%)' }} />

      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{
        background: 'linear-gradient(to bottom, transparent, #FF6B00 30%, #FF6B00 70%, transparent)',
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 h-full flex items-center">
        <div className="max-w-xl text-center lg:text-left" style={{ animation: 'heroFadeUp 0.8s ease both' }}>
          <div className="flex items-center gap-3 justify-center lg:justify-start mb-5">
            <span className="h-px w-8 bg-[#FF6B00]" />
            <span className="text-[10px] font-black tracking-[0.24em] uppercase text-[#FF6B00]">{slide.eyebrow}</span>
            <span className="h-px w-8 bg-[#FF6B00]" />
          </div>

          <h1 className="font-black leading-[1.04] mb-5 text-white" style={{ fontSize: 'clamp(2.8rem, 4.5vw, 4.5rem)' }}>
            <span className="block">{slide.title}</span>
            <span className="block" style={{
              background: 'linear-gradient(95deg, #FF6B00 0%, #FFAA44 50%, #FF6B00 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'heroGradientShift 4s ease infinite',
            }}>
              {slide.highlight}
            </span>
          </h1>

          <p className="leading-relaxed mb-8 max-w-md mx-auto lg:mx-0 text-[15px] text-gray-400">
            {slide.description}
          </p>

          <div className="mb-10">
            <CTAButtons />
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {[
              { icon: '📦', text: '500+ Productos' },
              { icon: '🚚', text: 'Delivery Nacional' },
              { icon: '⭐', text: 'Calidad Garantizada' },
            ].map((s) => (
              <span key={s.text} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold" style={{
                background: 'rgba(255,107,0,0.10)',
                border: '1px solid rgba(255,107,0,0.20)',
                color: '#FFAA60',
                backdropFilter: 'blur(8px)',
              }}>
                {s.icon} {s.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{
        height: '36px', background: 'rgba(255,107,0,0.06)', borderTop: '1px solid rgba(255,107,0,0.10)',
      }}>
        <div className="flex h-full items-center" style={{ animation: 'marqueeLeft 25s linear infinite', width: 'max-content' }}>
          {[0, 1, 2].map(i => (
            <span key={i} className="whitespace-nowrap text-[10px] font-extrabold tracking-[0.3em] uppercase text-[#FF6B00] opacity-50">
              {BRANDS}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Main Carousel ───────────────────────────────────── */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const prev = useCallback(() => setIndex(i => (i - 1 + slides.length) % slides.length), [slides.length])
  const next = useCallback(() => setIndex(i => (i + 1) % slides.length), [slides.length])

  useEffect(() => {
    if (slides.length === 0 || isPaused) return
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 7000)
    return () => clearInterval(t)
  }, [slides.length, isPaused])

  if (slides.length === 0) return null

  function renderSlide(slide: HeroSlide, i: number) {
    if (slide.isLogoSlide) return <LogoSlide slide={slide} />
    if (slide.imageSlide) return <ImageSlide slide={slide} isActive={i === index} />
    return null
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(540px, 60vw, 660px)', background: '#050404' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {slides.map((slide, i) => (
        <div key={i} className="absolute inset-0 transition-opacity duration-[1400ms]" style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}>
          {renderSlide(slide, i)}
        </div>
      ))}

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className="rounded-full transition-all duration-500" style={{
            height: '4px',
            width: i === index ? '36px' : '8px',
            background: i === index ? '#FF6B00' : 'rgba(255,255,255,0.22)',
            boxShadow: i === index ? '0 0 10px rgba(255,107,0,0.8)' : 'none',
          }} />
        ))}
      </div>

      <button onClick={prev} className="hidden md:flex absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center z-20 transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }} aria-label="Anterior">
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button onClick={next} className="hidden md:flex absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full items-center justify-center z-20 transition-all hover:scale-110" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)' }} aria-label="Siguiente">
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </section>
  )
}
