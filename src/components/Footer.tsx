import { MapPin, Phone, Mail } from 'lucide-react'

function FacebookSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.696 4.533-4.696 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function InstagramSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="ig-footer" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="70%" stopColor="#d6249f" />
          <stop offset="100%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-footer)" />
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
    </svg>
  )
}

function WhatsAppSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

const CATEGORIES = [
  'Mayonesas',
  'Mostazas',
  'Salsas de Tomate',
  'Salsas BBQ',
  'Aderezos Especiales',
  'Embutidos- Salchichas',
]

const WA_LINK = 'https://wa.me/584241234567?text=Hola%20Marimar%2C%20quiero%20hacer%20un%20pedido'

export function Footer() {
  return (
    <footer id="contacto" className="bg-[#111111] text-white pt-16 pb-8 border-t-[5px] border-[#FF6B00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Columna 1 – Marca */}
          <div className="space-y-5">
            <img
              src="/images/logo.png"
              alt="Marimar Milenium"
              className="h-16 w-auto bg-white/10 p-2 rounded-xl"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu aliado estratégico en distribución mayorista de víveres, embutidos y productos alimenticios en toda Venezuela. Calidad y servicio excepcional garantizados.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center hover:bg-[#1877F2]/25 transition-colors"
                aria-label="Facebook"
              >
                <FacebookSVG />
              </a>
              <a
                href="https://www.instagram.com/marimarmilenium/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <InstagramSVG />
              </a>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center hover:bg-[#25D366]/25 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppSVG />
              </a>
            </div>
          </div>

          {/* Columna 2 – Categorías */}
          <div>
            <h3 className="text-base font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6B00] rounded-full" />
              Categorías Populares
            </h3>
            <ul className="space-y-3">
              {CATEGORIES.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-gray-600 group-hover:bg-[#FF6B00] rounded-full transition-colors" />
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3 – Contacto */}
          <div>
            <h3 className="text-base font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6B00] rounded-full" />
              Contacto
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <span>Av. Principal, Caracas, Venezuela.<br />Zona Industrial.</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                <a href="tel:+584241234567" className="text-gray-400 hover:text-white transition-colors">
                  +58 424-1234567
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                <a href="mailto:ventas@marimar.com" className="text-gray-400 hover:text-white transition-colors">
                  ventas@marimar.com
                </a>
              </li>
              <li>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white text-sm font-bold px-4 py-2.5 rounded-full transition-colors"
                >
                  <WhatsAppSVG />
                  Escribir por WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Columna 4 – Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#FF6B00] rounded-full" />
              Ofertas Exclusivas
            </h3>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Suscríbete y recibe nuestras mejores ofertas mayoristas antes que nadie.
            </p>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="tu@correo.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B00] transition-colors placeholder-gray-500"
              />
              <button
                type="submit"
                className="w-full bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold py-2.5 rounded-xl transition-colors text-sm"
              >
                Suscribirme
              </button>
            </form>

            <div className="mt-6">
              <p className="text-[10px] text-gray-500 mb-3 font-bold uppercase tracking-widest">
                Métodos de Pago
              </p>
              <div className="flex flex-wrap gap-2">
                {['Zelle', 'Pago Móvil', 'Efectivo', 'Transferencia'].map(m => (
                  <span
                    key={m}
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-gray-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Marimar Milenium. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Envíos</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
