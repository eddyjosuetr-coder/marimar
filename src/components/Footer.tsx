import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle } from 'lucide-react'

const MAIN_CATEGORIES = [
  'Quesos',
  'Aderezos Especiales',
  'Jamones y Fiambres',
  'Bebidas e Infusiones',
  'Embutidos- Salchichas',
  'Salsas de Tomate',
]

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t-[6px] border-[#FF6B00]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <img src="/images/logo.png" alt="Marimar Milenium" className="h-16 w-auto bg-white/10 p-2 rounded-xl" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu aliado estratégico en distribución mayorista de víveres, embutidos y productos alimenticios en toda Venezuela. Calidad y servicio excepcional garantizados.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B00] transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B00] transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF6B00] transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><span className="w-2 h-2 bg-[#FF6B00] rounded-full"></span> Categorías Populares</h3>
            <ul className="space-y-3">
              {MAIN_CATEGORIES.map(cat => (
                <li key={cat}>
                  <button onClick={() => {
                    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })
                    // In a full implementation, we would route or set state here. 
                    // Since it's pure presentational in the footer, we just scroll for now.
                  }} className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors flex items-center gap-2">
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><span className="w-2 h-2 bg-[#FF6B00] rounded-full"></span> Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <span>Av. Principal, Caracas, Venezuela. <br/>Zona Industrial.</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
                <span>+58 424-1234567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
                <span>ventas@marimar.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><span className="w-2 h-2 bg-[#FF6B00] rounded-full"></span> Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">Suscríbete para recibir nuestras mejores ofertas mayoristas antes que nadie.</p>
            <form className="space-y-2" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Tu correo electrónico" required 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#FF6B00] transition-colors" />
              <button type="submit" className="w-full bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold py-2.5 rounded-lg transition-colors text-sm">
                Suscribirme
              </button>
            </form>
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Métodos de Pago</p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-gray-300">Zelle</span>
                <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-gray-300">Pago Móvil</span>
                <span className="px-2 py-1 bg-white/5 rounded text-xs font-medium text-gray-300">Efectivo</span>
              </div>
            </div>
          </div>
        </div>

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
