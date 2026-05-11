import { useState } from 'react'
import { Menu, Search, ShoppingCart, User, MapPin, Phone, ChevronDown, X } from 'lucide-react'
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
  'Vinagres'
]

export function Header({
  cartCount,
  cartTotal,
  onCartClick,
  onCategorySelect,
  searchQuery,
  setSearchQuery
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)

  return (
    <>
      <div className="hidden md:block bg-[#1A1A1A] text-white py-2 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone className="w-3 h-3 text-[#FF6B00]" />+58 424-1234567</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#FF6B00]" />Delivery en toda Venezuela</span>
          </div>
          <span className="text-gray-300">Envío gratis en compras mayores a $100</span>
        </div>
      </div>

      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[72px] gap-4">
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-800" />
            </button>

            <a href="/" className="flex-shrink-0 flex items-center">
              <img src="/images/logo.png" alt="Marimar Milenium" className="h-12 md:h-14 w-auto object-contain" />
            </a>

            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              <a href="/" className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] transition-colors">Inicio</a>
              <div className="relative" onMouseEnter={() => setShowProductsDropdown(true)} onMouseLeave={() => setShowProductsDropdown(false)}>
                <button onClick={scrollToCatalog} className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] flex items-center gap-1 transition-colors">
                  Productos <ChevronDown className={`w-4 h-4 transition-transform ${showProductsDropdown ? 'rotate-180' : ''}`} />
                </button>
                {showProductsDropdown && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-56 z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-1.5 max-h-96 overflow-y-auto">
                      {MAIN_CATEGORIES.map(c => (
                        <button key={c} onClick={() => { onCategorySelect(c); setShowProductsDropdown(false); scrollToCatalog() }}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] rounded-lg transition-colors">
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={scrollToCatalog} className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] flex items-center gap-1.5">
                Ofertas
                <span className="bg-[#FF6B00] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">HOT</span>
              </button>
              <a href="#contacto" className="text-sm font-semibold text-gray-700 hover:text-[#FF6B00] transition-colors">Contacto</a>
            </nav>

            <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-2 w-64 focus-within:ring-2 ring-[#FF6B00]/30 transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="bg-transparent outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400" />
            </div>

            <div className="flex items-center gap-2">
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg"><Search className="w-5 h-5 text-gray-700" /></button>
              <button className="hidden sm:flex p-2.5 hover:bg-gray-50 rounded-lg"><User className="w-5 h-5 text-gray-700" /></button>
              <button onClick={onCartClick} className="flex items-center gap-2 p-2.5 hover:bg-orange-50 rounded-lg transition-colors">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-[#FF6B00]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#FF6B00] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline text-sm font-bold text-gray-800">{formatPrice(cartTotal)}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white overflow-y-auto">
            <div className="flex items-center justify-between p-4 bg-[#FF6B00]">
              <span className="text-lg font-semibold text-white">Menú</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <div className="px-3 py-2 mb-2 bg-gray-50 rounded-lg flex items-center">
                <Search className="w-4 h-4 text-gray-400" />
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="bg-transparent outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400" />
              </div>
              <button onClick={() => { setIsMenuOpen(false); scrollToCatalog(); }}
                className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                <span className="text-gray-700 font-medium">Inicio</span>
              </button>
              <div className="pt-2 pb-1 px-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categorías</p>
              </div>
              {MAIN_CATEGORIES.map(item => (
                <button key={item} onClick={() => { onCategorySelect(item); setIsMenuOpen(false); scrollToCatalog(); }}
                  className="w-full text-left flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                  <span className="text-gray-700 font-medium">{item}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
