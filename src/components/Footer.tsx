import { MapPin, Phone, Mail } from 'lucide-react'
import { scrollToCatalog } from '@/lib/utils'
import { BrandLockup } from './BrandLockup'
import { CATEGORIES } from '@/data/products'
import { NEGOCIO, FORMAS_DE_PAGO, waLink } from '@/lib/negocio'
import { IconoWhatsApp } from './IconoWhatsApp'

function InstagramGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  )
}

/* Las seis primeras categorías del catálogo, sin 'Todos'. */
const FOOTER_CATEGORIES = CATEGORIES.slice(1, 7)

const WA_LINK = waLink()

function ColumnHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-eyebrow font-bold uppercase text-white/40 mb-5">
      {children}
    </h3>
  )
}

export function Footer() {
  return (
    <footer id="contacto" className="relative bg-espresso text-white overflow-hidden">
      <div className="brand-edge" />
      <div className="texture-grain absolute inset-0 pointer-events-none opacity-30" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14">

          {/* Marca */}
          <div className="lg:col-span-5 lg:pr-8">
            <BrandLockup size="lg" tone="dark" className="mb-6" />
            <p className="text-[14.5px] leading-relaxed text-white/50 max-w-sm mb-7">
              Tu tienda de confianza para víveres, charcutería, salsas y mucho más,
              con entrega en toda Maracay. Buenos precios y calidad en cada compra.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.instagram.com/distribuidoramarimar/"
                target="_blank"
                rel="noopener noreferrer"
                data-tap-target
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all duration-200"
                aria-label="Instagram de Distribuidora Marimar"
              >
                <InstagramGlyph />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-tap-target
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-leaf hover:border-leaf/50 hover:bg-leaf/10 transition-all duration-200"
                aria-label="WhatsApp de Distribuidora Marimar"
              >
                <IconoWhatsApp />
              </a>
            </div>

            {/* Cómo se paga: tres formas, las que el negocio acepta de verdad.
                Va bajo la marca porque es parte de quién es el negocio, no un
                apéndice del formulario que antes ocupaba esta esquina. */}
            <div className="mt-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 mb-3">
                Métodos de pago
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {FORMAS_DE_PAGO.map(forma => (
                  <li
                    key={forma}
                    className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-[12.5px] font-medium text-white/65"
                  >
                    {forma}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categorías */}
          <nav className="lg:col-span-3" aria-label="Categorías populares">
            <ColumnHeading>Categorías</ColumnHeading>
            {/* py-1 en cada enlace: en el teléfono el dedo necesita más que la
                altura de la línea. El espaciado baja para compensar. */}
            <ul className="space-y-2">
              {FOOTER_CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={scrollToCatalog}
                    className="tap-inline py-1 text-left text-[14px] text-white/55 hover:text-gold transition-colors duration-200"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-4">
            <ColumnHeading>Contacto</ColumnHeading>
            <ul className="space-y-4">
              {/* Sin dirección publicada mientras el cliente no la confirme:
                  una dirección inventada manda gente a tocar a otra puerta. */}
              <li className="flex items-start gap-3 text-[14px] text-white/55">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" strokeWidth={2.2} aria-hidden="true" />
                <span>Delivery en toda Maracay</span>
              </li>
              <li className="flex items-center gap-3 text-[14px]">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <a href={NEGOCIO.telefonoHref} className="tap-inline text-white/55 hover:text-white transition-colors">
                  {NEGOCIO.telefonoVisible}
                </a>
              </li>
              <li className="flex items-center gap-3 text-[14px]">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
                <a href={`mailto:${NEGOCIO.correo}`} className="tap-inline text-white/55 hover:text-white transition-colors">
                  {NEGOCIO.correo}
                </a>
              </li>
            </ul>

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              data-tap-target
              className="mt-6 inline-flex items-center gap-2 h-11 px-5 rounded-full bg-leaf text-white text-[14px] font-semibold hover:brightness-110 transition-all duration-200"
            >
              <IconoWhatsApp />
              Escribir por WhatsApp
            </a>
          </div>

        </div>

        {/* Pie */}
        <div className="pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-white/35">
            © {new Date().getFullYear()} Distribuidora Marimar C.A. Todos los derechos reservados.
          </p>
          <ul className="flex items-center gap-6 text-[13px]">
            {['Términos', 'Privacidad', 'Envíos'].map(item => (
              <li key={item}>
                <a href="#" className="tap-inline text-white/35 hover:text-white transition-colors duration-200">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
