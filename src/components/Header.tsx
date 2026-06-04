import { useState } from 'react'
import { Menu, Search, ShoppingCart, User, MapPin, Phone, ChevronDown, X, MessageCircle } from 'lucide-react'
import { formatPrice, scrollToCatalog } from '@/lib/utils'

interface HeaderProps {
  cartCount: number
  cartTotal: number
  onCartClick: () => void
  onCategorySelect: (category: string) => void
  searchQuery: string
  setSearchQuery: (v: string) => void
}

const MAIN_CATEGORIES = [
  'Todos',
  'Aceites de Cocina',
  'Aderezos Especiales',
  'Bebidas e Infusiones',
  'Cereales y Galletas',
  'Embutidos- Salchichas',
  'Jamones y Fiambres',
  'Mayonesas',
  'Mostazas',
  'Quesos',
  'Salsas BBQ',
  'Salsas de Tomate',
  'Vinagres',
]

const WA_LINK = 'https://wa.me/584241234567?text=Hola%20Marimar%2C%20quiero%20hacer%20un%20pedido'

export function Header({
  cartCount,
  cartTotal,
  onCartClick,
  onCategorySelect,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)

  return (
    <>
      {/* ── Barra superior ── */}
      <div className="hidden md:block bg-[#1A1A1A] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:+584241234567`} className="flex items-center gap-1.5 hover:text-[#FF6B00] transition-colors">
              <Phone className="w-3 h-3 text-[#FF6B00]" />
              +58 424-1234567
            </a>
            <span className="flex items-center gap-1.5 text-gray-400">
              <MapPin className="w-3 h-3 text-[#FF6B00]" />
              Delivery en toda Venezuela
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Envío gratis en compras mayores a $100</span>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold px-3 py-1 rounded-full transition-colors text-[11px]"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── Header principal ── */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">

            {/* Botón menú móvil */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            {/* Logo */}
            <a href="/" className="flex-shrink-0 flex items-center">
              <img
                src="/images/logo.png"
                alt="Marimar Milenium"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </a>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              <a
                href="/"
                className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] transition-colors"
              >
                Inicio
              </a>

              {/* Dropdown Productos */}
              <div
                className="relative"
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => setShowProductsDropdown(false)}
              >
                <button
                  onClick={scrollToCatalog}
                  className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] flex items-center gap-1 transition-colors"
                >
                  Productos
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProductsDropdown ? 'rotate-180 text-[#FF6B00]' : ''}`} />
                </button>

                {showProductsDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-60 z-50">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-2 max-h-96 overflow-y-auto">
                      {MAIN_CATEGORIES.map(c => (
                        <button
                          key={c}
                          onClick={() => { onCategorySelect(c); setShowProductsDropdown(false); scrollToCatalog() }}
                          className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] rounded-xl transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={scrollToCatalog}
                className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] flex items-center gap-1.5 transition-colors"
              >
                Ofertas
                <span className="bg-[#FF6B00] text-white text-[10px] px-2 py-0.5 rounded-full font-bold animate-pulse">
                  HOT
                </span>
              </button>

              <a
                href="#contacto"
                className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] transition-colors"
              >
                Contacto
              </a>
            </nav>

            {/* Barra de búsqueda desktop */}
            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 w-64 focus-within:ring-2 focus-within:ring-[#FF6B00]/30 focus-within:border-[#FF6B00]/50 transition-all">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar productos o marcas…"
                className="bg-transparent outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="ml-1 text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-1.5">
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                <Search className="w-5 h-5 text-gray-700" />
              </button>
              <button className="hidden sm:flex p-2.5 hover:bg-gray-50 rounded-lg transition-colors">
                <User className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={onCartClick}
                className="flex items-center gap-2 px-3 py-2.5 hover:bg-orange-50 rounded-xl transition-colors"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-[#FF6B00]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF6B00] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-sm font-bold text-gray-800">
                  {formatPrice(cartTotal)}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Menú móvil ── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto animate-slide-in shadow-2xl">
            {/* Cabecera del drawer */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FF6B00] to-[#E55F00]">
              <img src="/images/logo.png" alt="Marimar" className="h-10 w-auto object-contain bg-white/10 rounded-lg p-1" />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <nav className="p-4 space-y-1">
              {/* Búsqueda móvil */}
              <div className="px-3 py-2.5 mb-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos…"
                  className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
                />
              </div>

              <button
                onClick={() => { setIsMenuOpen(false); scrollToCatalog() }}
                className="w-full text-left p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
              >
                Inicio
              </button>

              <div className="pt-2 pb-1 px-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categorías</p>
              </div>

              {MAIN_CATEGORIES.map(item => (
                <button
                  key={item}
                  onClick={() => { onCategorySelect(item); setIsMenuOpen(false); scrollToCatalog() }}
                  className="w-full text-left p-3 rounded-xl hover:bg-orange-50 hover:text-[#FF6B00] text-gray-700 font-medium transition-colors"
                >
                  {item}
                </button>
              ))}

              {/* WhatsApp en el menú móvil */}
              <div className="pt-4 border-t border-gray-100 mt-2">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-[#25D366]/10 rounded-xl text-[#128C7E] font-semibold"
                >
                  <MessageCircle className="w-5 h-5" />
                  Pide por WhatsApp
                </a>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
