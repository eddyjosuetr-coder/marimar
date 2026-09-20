import { ArrowUpRight } from 'lucide-react'

const IMAGES = Array.from({ length: 12 }, (_, i) => `ig_post_${i + 1}.jpg`)

/* Pistas duplicadas: el bucle de la marquesina cierra en -50% sin salto */
const TRACK_TOP = [...IMAGES, ...IMAGES]
const TRACK_BOTTOM = [...[...IMAGES].reverse(), ...[...IMAGES].reverse()]

const IG_LINK = 'https://www.instagram.com/distribuidoramarimar/'

function InstagramGlyph({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  )
}

function Track({ images, direction }: { images: string[]; direction: 'left' | 'right' }) {
  const animation = direction === 'left'
    ? 'marqueeLeft 60s linear infinite'
    : 'marqueeRight 75s linear infinite'

  return (
    <div className="mask-fade-x overflow-hidden">
      <div
        className="flex gap-3 w-max"
        style={{ animation, willChange: 'transform' }}
      >
        {images.map((file, i) => (
          <a
            key={`${direction}-${i}`}
            href={IG_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden={i >= IMAGES.length}
            tabIndex={i >= IMAGES.length ? -1 : undefined}
            className="group relative flex-shrink-0 w-[168px] h-[168px] sm:w-[196px] sm:h-[196px] rounded-xl overflow-hidden bg-espresso-raised"
          >
            <img
              src={`/instagram/${file}`}
              alt="Publicación de Distribuidora Marimar en Instagram"
              loading="lazy"
              width={196}
              height={196}
              className="w-full h-full object-cover transition-transform duration-500 ease-out-expo group-hover:scale-110"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-espresso/55 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <InstagramGlyph size={26} />
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export function InstagramGallery() {
  return (
    <section className="relative bg-espresso py-16 md:py-20 overflow-hidden" aria-labelledby="instagram-heading">
      <div className="texture-grain absolute inset-0 pointer-events-none opacity-40" />

      {/* Encabezado */}
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 mb-12 text-center">
        <p className="text-eyebrow font-bold uppercase text-white/40 mb-4">
          Síguenos en Instagram
        </p>

        <a
          href={IG_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3.5"
        >
          <span
            className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white"
            style={{ background: 'linear-gradient(135deg, #FDF497 0%, #FD5949 40%, #D6249F 65%, #285AEB 100%)' }}
          >
            <InstagramGlyph size={22} />
          </span>
          <span className="font-display text-[26px] sm:text-[32px] font-extrabold text-white tracking-tight group-hover:text-brand transition-colors duration-200">
            @distribuidoramarimar
          </span>
          <ArrowUpRight
            className="w-5 h-5 text-white/40 group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
            strokeWidth={2.2}
          />
        </a>

        <h2 id="instagram-heading" className="sr-only">Instagram de Distribuidora Marimar</h2>
        <p className="text-[14.5px] text-white/45 max-w-md mx-auto mt-4">
          Novedades, productos y promociones exclusivas para tu negocio.
        </p>
      </div>

      {/* Marquesinas */}
      <div className="relative space-y-3">
        <Track images={TRACK_TOP} direction="left" />
        <Track images={TRACK_BOTTOM} direction="right" />
      </div>

      {/* Llamado */}
      <div className="relative text-center mt-12">
        <a
          href={IG_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-tap-target
          className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full border border-white/20 text-white font-semibold text-[14.5px] hover:bg-white/10 hover:border-white/35 transition-all duration-200"
        >
          <InstagramGlyph size={17} />
          Ver perfil completo
        </a>
      </div>
    </section>
  )
}
