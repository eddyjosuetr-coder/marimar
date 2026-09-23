import { ArrowRight, ShoppingBag, MapPin, Phone } from 'lucide-react'
import { scrollToCatalog, cn } from '@/lib/utils'
import type { HeroSlide } from '@/types'
import { NEGOCIO, waLink } from '@/lib/negocio'
import { IconoWhatsApp } from './IconoWhatsApp'

const BRANDS = [
  'FRITZ', 'MAVESA', 'HEINZ', 'LA VIÑA', 'LA MARCA', 'McCORMICK',
  'KRYSTAL', 'TORONDOY', 'LEYTON', 'PURÍSIMA', 'DOÑA NELLY', 'MAYOTROPI', 'MONTI', 'COMA',
]

/* ══════════════════════════════════════════════════════════
   Portada de una sola pieza.

   Antes era un carrusel de tres slides; los dos de cifras se retiraron y
   quedó únicamente el emblema. Con una sola pieza no hay contador, ni puntos,
   ni flechas: controles que no llevan a ningún lado sólo estorban.
   ══════════════════════════════════════════════════════════ */

function HeroCopy({ slide }: { slide: HeroSlide }) {
  return (
    <div className="max-w-2xl" style={{ animation: 'heroFadeUp 0.7s var(--ease-out-expo) both' }}>

      {/* Antetítulo con regla */}
      <div className="flex items-center gap-3.5 mb-6">
        <span className="brand-sweep h-[2px] w-10 rounded-full" />
        <span className="text-eyebrow font-bold uppercase text-gold">
          {slide.eyebrow}
        </span>
      </div>

      {/* Titular editorial — el barrido del logo subraya la palabra clave */}
      <h1 className="font-display text-display-xl font-extrabold text-white mb-7">
        <span className="block">{slide.title}</span>
        <span className="mark-underline relative z-0 block w-fit text-white">
          {slide.highlight}
        </span>
      </h1>

      <p className="text-[17px] leading-relaxed text-white/60 max-w-lg mb-9">
        {slide.description}
      </p>

      {/* Acciones — una sola CTA primaria, la secundaria es subordinada */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          type="button"
          onClick={scrollToCatalog}
          className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-brand text-white font-semibold text-[15px] shadow-brand hover:bg-brand-deep transition-all duration-200 active:scale-[0.98]"
        >
          <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={2.2} />
          Ver catálogo
          <ArrowRight className="w-4 h-4 -ml-0.5 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.4} />
        </button>
        {/* La llamada pedía hablar; esto pide escribir, que es lo que la
            gente hace. Y lleva el logo de WhatsApp, no un icono de mensaje:
            así se sabe a dónde va antes de tocarlo. */}
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          data-tap-target
          className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full border border-white/20 text-white font-semibold text-[15px] hover:bg-white/10 hover:border-white/35 transition-all duration-200"
        >
          <IconoWhatsApp className="w-[18px] h-[18px] text-leaf" />
          ¿Dudas? Escríbenos
        </a>
      </div>

      {/*
        Hasta dónde llegamos y a qué número llamar.

        Vivían en una franja negra sobre la cabecera, que es donde nadie mira
        y que el teléfono ni siquiera mostraba. Aquí caen justo debajo de los
        botones: quien acaba de leer "ver catálogo" o "escríbenos" lee a
        continuación que sí le llega y por dónde preguntar.
      */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 text-[13.5px] text-white/60">
        <span className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
          Delivery en toda {NEGOCIO.zonaDeEntrega}
        </span>
        <a
          href={NEGOCIO.telefonoHref}
          data-tap-target
          className="flex items-center gap-2 hover:text-white transition-colors duration-200"
        >
          <Phone className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
          {NEGOCIO.telefonoVisible}
        </a>
      </div>

      {/* Cifras del catálogo — se generan desde products.ts, nunca a mano */}
      <dl className="flex items-stretch gap-7">
        {(slide.stats ?? []).map((stat, i) => (
          <div key={stat.label} className={cn('flex items-center gap-7', i > 0 && 'before:block before:w-px before:h-9 before:bg-white/15')}>
            <div>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-[26px] font-extrabold text-white leading-none tracking-tight">
                {stat.value}
              </dd>
              <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 mt-1.5">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </dl>
    </div>
  )
}

/**
 * Escenario del emblema.
 *
 * El logo es lo único verdaderamente propio de la marca, así que la portada se
 * lo da entero: foco cálido detrás, un aro con el barrido oro→naranja→brasa
 * girando despacio y dos aros finos que repiten los del propio troquel. Todas
 * las capas son absolutas y decorativas, así que el emblema manda el tamaño y
 * nada empuja el layout.
 */
function EmblemStage() {
  return (
    <div className="relative grid place-items-center w-[min(78vw,300px)] sm:w-[min(60vw,380px)] lg:w-[min(34vw,440px)] aspect-square">

      <div
        className="emblem-glow absolute w-[146%] aspect-square rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--brand) / 0.40), hsl(var(--ember) / 0.14) 55%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div
        className="emblem-ring absolute w-[124%] aspect-square rounded-full"
        style={{
          background:
            'conic-gradient(from 210deg, transparent 0 46%, hsl(var(--gold) / 0.9) 62%, hsl(var(--brand)) 76%, hsl(var(--ember) / 0.6) 88%, transparent 96%)',
        }}
        aria-hidden="true"
      />
      <div
        className="emblem-ring-slow absolute w-[138%] aspect-square rounded-full"
        style={{
          background:
            'conic-gradient(from 40deg, transparent 0 60%, hsl(var(--gold) / 0.55) 75%, transparent 88%)',
        }}
        aria-hidden="true"
      />

      <div className="absolute w-[113%] aspect-square rounded-full border border-gold/20" aria-hidden="true" />
      <div className="absolute w-[134%] aspect-square rounded-full border border-gold/10" aria-hidden="true" />

      <img
        src="/brand/marimar-emblema-512.png"
        alt="Distribuidora Marimar C.A."
        width={440}
        height={440}
        fetchPriority="high"
        className="relative z-10 w-full h-auto object-contain drop-shadow-[0_26px_50px_rgba(0,0,0,0.6)]"
        style={{ animation: 'heroLogoFloat 7s ease-in-out infinite' }}
      />

      {/* Sello de credibilidad, montado sobre el aro */}
      <div className="absolute z-20 -bottom-5 -left-4 sm:-left-6 lg:-left-14 bg-paper text-ink rounded-2xl pl-4 pr-5 py-3 shadow-lift">
        <span className="brand-sweep absolute left-0 inset-y-3 w-[3px] rounded-full" aria-hidden="true" />
        <p className="font-display text-[21px] font-extrabold leading-none tracking-tight">+15 años</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-muted mt-1">Surtiendo Venezuela</p>
      </div>
    </div>
  )
}

export function Hero({ slides }: { slides: HeroSlide[] }) {
  const slide = slides[0]
  if (!slide) return null

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(125deg, #1f0703 0%, #3d0d05 18%, #6a1705 36%, #ab2903 54%, #e25400 74%, #f78d15 90%, #ffa526 100%)',
      }}
      aria-label="Distribuidora Marimar C.A."
    >
      {/* ── Atmósfera viva y vibrante — Luz solar, destellos dorados y ondas fluidas ── */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">

        {/* Halo solar gigante y pulsante detrás del emblema */}
        <div
          className="absolute right-[-10%] sm:right-[5%] lg:right-[12%] top-1/2 -translate-y-1/2 w-[700px] lg:w-[850px] aspect-square rounded-full blur-3xl opacity-80"
          style={{
            background: 'radial-gradient(circle, #ffb703 0%, #fb8500 35%, #d00000 65%, transparent 78%)',
            animation: 'sunPulse 6s ease-in-out infinite alternate',
          }}
        />

        {/* Resplandor cálido secundario en esquina inferior izquierda para balancear el color */}
        <div
          className="absolute -bottom-24 -left-20 w-[500px] h-[500px] rounded-full blur-3xl opacity-45"
          style={{
            background: 'radial-gradient(circle, #f77f00 0%, #d62828 50%, transparent 70%)',
            animation: 'sunPulse 8s ease-in-out 1s infinite alternate',
          }}
        />

        {/* Aros concéntricos geométricos de lujo que orbitan el logo */}
        <div className="hidden sm:block absolute right-[-4%] lg:right-[14%] top-1/2 -translate-y-1/2 w-[520px] aspect-square rounded-full border border-amber-300/25 pointer-events-none" />
        <div className="hidden sm:block absolute right-[-10%] lg:right-[9%] top-1/2 -translate-y-1/2 w-[680px] aspect-square rounded-full border border-dashed border-amber-300/20 pointer-events-none" />
        <div className="hidden md:block absolute right-[-16%] lg:right-[4%] top-1/2 -translate-y-1/2 w-[840px] aspect-square rounded-full border border-amber-400/10 pointer-events-none" />

        {/* Ondas orgánicas de sabor y movimiento (estilo líquido / gourmet) */}
        <svg
          className="absolute inset-0 w-full h-full opacity-35"
          viewBox="0 0 1440 680"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M-80 520 C 300 600, 520 400, 850 500 C 1150 590, 1350 420, 1550 480 L 1550 700 L -80 700 Z"
            fill="url(#waveGrad1)"
          />
          <path
            d="M-50 220 C 320 120, 680 320, 1020 180 C 1280 80, 1420 210, 1520 160 L 1520 -50 L -50 -50 Z"
            fill="url(#waveGrad2)"
          />
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d62828" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#f77f00" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#fcbf49" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="60%" stopColor="#fcbf49" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f77f00" stopOpacity="0.18" />
            </linearGradient>
          </defs>
        </svg>

        {/* Destellos y partículas cálidas flotantes */}
        <div
          className="absolute top-[18%] left-[48%] w-3 h-3 rounded-full bg-amber-200 blur-[1px] shadow-[0_0_12px_#ffb703]"
          style={{ animation: 'emberFloat 4s ease-in-out infinite' }}
        />
        <div
          className="absolute top-[68%] left-[42%] w-2 h-2 rounded-full bg-amber-300 blur-[1px] shadow-[0_0_8px_#fb8500]"
          style={{ animation: 'emberFloat 5s ease-in-out 1s infinite' }}
        />
        <div
          className="absolute top-[28%] right-[18%] w-3.5 h-3.5 rounded-full bg-yellow-100 blur-[1px] shadow-[0_0_14px_#ffe49e]"
          style={{ animation: 'emberFloat 4.5s ease-in-out 0.5s infinite' }}
        />
        <div
          className="absolute top-[75%] right-[24%] w-2.5 h-2.5 rounded-full bg-amber-300 blur-[1px] shadow-[0_0_10px_#ff9e00]"
          style={{ animation: 'emberFloat 6s ease-in-out 2s infinite' }}
        />
        <div
          className="absolute top-[15%] right-[38%] w-2 h-2 rounded-full bg-yellow-200 blur-[1px] shadow-[0_0_8px_#ffd166]"
          style={{ animation: 'emberFloat 5.5s ease-in-out 1.5s infinite' }}
        />

        {/* Escudo de contraste suave sobre el texto izquierdo: mantiene la tipografía 100% nítida y legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(24, 6, 3, 0.88) 0%, rgba(30, 8, 4, 0.65) 36%, rgba(35, 9, 4, 0.25) 65%, transparent 90%)',
          }}
        />

        {/* Sutil textura de grano fino para toque editorial */}
        <div className="texture-grain absolute inset-0 opacity-15 mix-blend-overlay" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-10 pt-16 pb-24 lg:pt-24 lg:pb-28 min-h-[600px] lg:min-h-[680px]">
        <div className="h-full grid lg:grid-cols-12 items-center gap-12 lg:gap-8">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <HeroCopy slide={slide} />
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 flex items-center justify-center lg:justify-end lg:pr-10 xl:pr-14">
            <EmblemStage />
          </div>
        </div>
      </div>

      {/* Marquesina de marcas — el zócalo del hero */}
      <div className="absolute inset-x-0 bottom-0 h-[42px] border-t border-amber-500/20 bg-[#140603]/75 backdrop-blur-md overflow-hidden">
        <div className="mask-fade-x h-full">
          <div
            className="flex items-center h-full gap-9 w-max"
            style={{ animation: 'marqueeLeft 40s linear infinite', willChange: 'transform' }}
          >
            {[0, 1].map(track => (
              <div key={track} className="flex items-center gap-9" aria-hidden={track === 1}>
                {BRANDS.map(brand => (
                  <span
                    key={`${track}-${brand}`}
                    className="whitespace-nowrap text-[11px] font-bold tracking-[0.28em] uppercase text-white/30"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
