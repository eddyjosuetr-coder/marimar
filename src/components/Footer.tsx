import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react'
import { scrollToCatalog } from '@/lib/utils'
import { BrandLockup } from './BrandLockup'
import { CATEGORIES } from '@/data/products'
import { NEGOCIO, waLink } from '@/lib/negocio'

function FacebookGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function InstagramGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  )
}

function WhatsAppGlyph() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/* Las seis primeras categorías del catálogo, sin 'Todos'. */
const FOOTER_CATEGORIES = CATEGORIES.slice(1, 7)

const PAYMENT_METHODS = ['Zelle', 'Pago Móvil', 'Efectivo', 'Transferencia']

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
          <div className="lg:col-span-4 lg:pr-8">
            <BrandLockup size="lg" tone="dark" className="mb-6" />
            <p className="text-[14.5px] leading-relaxed text-white/50 max-w-sm mb-7">
              Tu tienda de confianza para víveres, charcutería, salsas y mucho más,
              con entrega en toda Venezuela. Buenos precios y calidad en cada compra.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="#"
                data-tap-target
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/35 hover:bg-white/5 transition-all duration-200"
                aria-label="Facebook de Distribuidora Marimar"
              >
                <FacebookGlyph />
              </a>
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
                <WhatsAppGlyph />
              </a>
            </div>
          </div>

          {/* Categorías */}
          <nav className="lg:col-span-2" aria-label="Categorías populares">
            <ColumnHeading>Categorías</ColumnHeading>
            <ul className="space-y-3">
              {FOOTER_CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={scrollToCatalog}
                    className="tap-inline text-left text-[14px] text-white/55 hover:text-gold transition-colors duration-200"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-3">
            <ColumnHeading>Contacto</ColumnHeading>
            <ul className="space-y-4">
              {/* Sin dirección publicada mientras el cliente no la confirme:
                  una dirección inventada manda gente a tocar a otra puerta. */}
              <li className="flex items-start gap-3 text-[14px] text-white/55">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-1" strokeWidth={2.2} aria-hidden="true" />
                <span>Delivery en toda Venezuela</span>
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
              <WhatsAppGlyph />
              Escribir por WhatsApp
            </a>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <ColumnHeading>Ofertas exclusivas</ColumnHeading>
            <p className="text-[14px] leading-relaxed text-white/50 mb-5">
              Suscríbete y recibe nuestras mejores ofertas antes que nadie.
            </p>

            <form className="space-y-2.5" onSubmit={e => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                required
                className="w-full h-11 px-4 rounded-full bg-white/5 border border-white/15 text-[14px] text-white placeholder:text-white/30 outline-none focus:border-brand focus:ring-2 focus:ring-brand/25 transition-all duration-200"
              />
              <button
                type="submit"
                className="group w-full h-11 rounded-full bg-brand text-white font-semibold text-[14px] hover:bg-brand-deep transition-colors duration-200 inline-flex items-center justify-center gap-2"
              >
                Suscribirme
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.2} />
              </button>
            </form>

            <div className="mt-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/30 mb-3">
                Métodos de pago
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {PAYMENT_METHODS.map(method => (
                  <li
                    key={method}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11.5px] font-medium text-white/60"
                  >
                    {method}
                  </li>
                ))}
              </ul>
            </div>
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
