import { useState, useEffect } from 'react'
import { Menu, Search, ShoppingCart, MapPin, Phone, ChevronDown, X, MessageCircle, ArrowRight } from 'lucide-react'
import { formatPrice, scrollToCatalog, cn } from '@/lib/utils'
import { CATEGORIES } from '@/data/products'
import { CART_ANCHOR_ATTR } from '@/lib/flyToCart'
import { BrandLockup } from './BrandLockup'
import { ThemeToggle } from './ThemeToggle'
import { NEGOCIO, waLink } from '@/lib/negocio'

interface HeaderProps {
  cartCount: number
  cartTotal: number
  onCartClick: () => void
  onCategorySelect: (category: string) => void
  selectedCategory: string
  /** Hay algo rebajado ahora mismo: si no, el enlace de ofertas no se muestra. */
  hayOfertas: boolean
  onOfertasClick: () => void
  searchQuery: string
  setSearchQuery: (v: string) => void
}

/*
  Las categorías salen del catálogo, no de una lista escrita a mano: si se
  agrega una categoría nueva en products.ts aparece sola en el riel y en el
  menú, sin que se puedan desincronizar.
*/
const RAIL_CATEGORIES = CATEGORIES
const MENU_CATEGORIES = CATEGORIES

const WA_LINK = waLink()

export function Header({
  cartCount,
  cartTotal,
  onCartClick,
  onCategorySelect,
  selectedCategory,
  hayOfertas,
  onOfertasClick,
  searchQuery,
  setSearchQuery,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)

  // El header cambia de peso al hacer scroll: hairline + blur en vez de sombra plana.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquea el scroll de fondo mientras el drawer móvil está abierto.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const pickCategory = (category: string) => {
    onCategorySelect(category)
    setShowProductsDropdown(false)
    setIsMenuOpen(false)
    scrollToCatalog()
  }

  return (
    <>
      {/* ══ Barra de servicio ══ */}
      <div className="hidden md:block bg-espresso text-white/70 text-[12px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-9 flex items-center justify-between">
          <div className="flex items-center gap-7">
            <a href={NEGOCIO.telefonoHref} className="flex items-center gap-2 hover:text-white transition-colors duration-200">
              <Phone className="w-3.5 h-3.5 text-gold" strokeWidth={2.2} />
              {NEGOCIO.telefonoVisible}
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-gold" strokeWidth={2.2} />
              Delivery en toda Venezuela
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden lg:flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold" />
              Envío gratis en compras mayores a $100
            </span>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/90 hover:text-white font-semibold transition-colors duration-200"
            >
              <MessageCircle className="w-3.5 h-3.5 text-leaf" strokeWidth={2.2} />
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ══ Header principal ══ */}
      <header
        className={cn(
          'sticky top-0 z-40 bg-paper/85 backdrop-blur-xl transition-shadow duration-300',
          isScrolled ? 'shadow-[0_1px_0_hsl(var(--line)),0_8px_24px_-16px_hsl(24_40%_12%_/_0.25)]' : 'shadow-[0_1px_0_hsl(var(--line))]'
        )}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-3 md:gap-6 h-[68px] md:h-[84px]">

            {/* Menú móvil */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden -ml-2 p-2 rounded-lg text-ink hover:bg-paper-sunken transition-colors duration-200"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" strokeWidth={2} />
            </button>

            {/* Marca */}
            <a
              href="/"
              className="flex-shrink-0 group"
              aria-label="Distribuidora Marimar C.A. — inicio"
            >
              <BrandLockup
                size="md"
                compacto
                className="transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5"
              />
            </a>

            {/* Navegación desktop */}
            <nav className="hidden lg:flex items-center gap-1 ml-2" aria-label="Navegación principal">
              <a
                href="/"
                className="px-3 py-2 text-[15px] font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-paper-sunken transition-colors duration-200"
              >
                Inicio
              </a>

              <div
                className="relative"
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => setShowProductsDropdown(false)}
              >
                <button
                  type="button"
                  onClick={scrollToCatalog}
                  className="px-3 py-2 text-[15px] font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-paper-sunken flex items-center gap-1.5 transition-colors duration-200"
                  aria-expanded={showProductsDropdown}
                >
                  Productos
                  <ChevronDown
                    className={cn('w-4 h-4 transition-transform duration-200', showProductsDropdown && 'rotate-180 text-brand-ink')}
                    strokeWidth={2.2}
                  />
                </button>

                {showProductsDropdown && (
                  <div className="absolute top-full left-0 pt-2 w-72 z-50">
                    <div className="bg-paper-raised rounded-xl shadow-card-hover border border-line p-2 animate-scale-in origin-top-left">
                      <p className="px-3 pt-2 pb-2 text-eyebrow font-bold uppercase text-ink-muted">
                        Categorías
                      </p>
                      <div className="max-h-[22rem] overflow-y-auto custom-scrollbar">
                        {MENU_CATEGORIES.map(c => (
                          <button
                            type="button"
                            key={c}
                            onClick={() => pickCategory(c)}
                            className={cn(
                              'group w-full text-left px-3 py-2.5 text-[14px] rounded-lg flex items-center justify-between transition-colors duration-150',
                              selectedCategory === c
                                ? 'bg-brand-tint text-brand-ink font-semibold'
                                : 'text-ink-soft hover:bg-paper-sunken hover:text-ink'
                            )}
                          >
                            {c}
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-200" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sin nada rebajado, el enlace prometería una sección vacía */}
              {hayOfertas && (
                <button
                  type="button"
                  onClick={() => { onOfertasClick(); scrollToCatalog() }}
                  className="px-3 py-2 text-[15px] font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-paper-sunken flex items-center gap-2 transition-colors duration-200"
                >
                  Ofertas
                  <span className="bg-brand text-white text-[10px] leading-none px-1.5 py-1 rounded font-bold tracking-wide">
                    HOT
                  </span>
                </button>
              )}

              <a
                href="#contacto"
                className="px-3 py-2 text-[15px] font-medium text-ink-soft hover:text-ink rounded-lg hover:bg-paper-sunken transition-colors duration-200"
              >
                Contacto
              </a>
            </nav>

            {/* Buscador desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-sm ml-auto">
              <div className="group flex items-center w-full bg-paper-raised border border-line rounded-full h-11 px-4 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/15 transition-all duration-200">
                <Search className="w-4 h-4 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
                <label htmlFor="site-search" className="sr-only">Buscar productos</label>
                <input
                  id="site-search"
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos o marcas…"
                  className="sin-limpiar-nativo bg-transparent outline-none text-[14px] ml-2.5 w-full text-ink placeholder:text-ink-muted"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="tap-inline ml-1 p-1 rounded-full text-ink-muted hover:text-ink hover:bg-paper-sunken transition-colors"
                    aria-label="Limpiar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={2.4} />
                  </button>
                )}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              <button
                type="button"
                onClick={() => setShowMobileSearch(v => !v)}
                className="md:hidden p-2.5 rounded-lg text-ink hover:bg-paper-sunken transition-colors duration-200"
                aria-label="Buscar"
                aria-expanded={showMobileSearch}
              >
                <Search className="w-5 h-5" strokeWidth={2.2} />
              </button>

              <ThemeToggle />

              <button
                type="button"
                onClick={onCartClick}
                {...{ [CART_ANCHOR_ATTR]: true }}
                className="group relative flex items-center gap-2.5 h-11 pl-3 pr-3 sm:pr-4 rounded-full bg-ink text-paper hover:bg-ink-soft transition-colors duration-200"
                aria-label={`Abrir pedido, ${cartCount} artículos`}
              >
                <span className="relative flex items-center">
                  <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={2.2} />
                  {cartCount > 0 && (
                    <span
                      key={cartCount}
                      className="cart-badge-pop absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 bg-brand text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-ink"
                    >
                      {cartCount > 99 ? '99+' : cartCount}
                    </span>
                  )}
                </span>
                <span className="hidden sm:inline font-display text-[14px] font-bold tabular-nums tracking-tight">
                  {formatPrice(cartTotal)}
                </span>
              </button>
            </div>
          </div>

          {/* Buscador móvil desplegable */}
          {showMobileSearch && (
            <div className="md:hidden pb-3 animate-fade-in-up">
              <div className="flex items-center w-full bg-paper-raised border border-line rounded-full h-11 px-4 focus-within:border-brand transition-colors">
                <Search className="w-4 h-4 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
                <label htmlFor="site-search-mobile" className="sr-only">Buscar productos</label>
                <input
                  id="site-search-mobile"
                  type="search"
                  autoFocus
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos o marcas…"
                  className="bg-transparent outline-none text-[16px] ml-2.5 w-full text-ink placeholder:text-ink-muted"
                />
              </div>
            </div>
          )}
        </div>

        {/* ══ Riel de categorías ══ */}
        <div className="border-t border-line bg-paper/70">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-2.5 -mx-1 px-1">
              {RAIL_CATEGORIES.map(c => {
                const isActive = selectedCategory === c
                return (
                  <button
                    type="button"
                    key={c}
                    onClick={() => pickCategory(c)}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap border transition-all duration-200',
                      isActive
                        ? 'bg-ink text-paper border-ink'
                        : 'bg-transparent text-ink-soft border-line hover:border-ink/35 hover:text-ink'
                    )}
                  >
                    {c === 'Todos' ? 'Todo el catálogo' : c}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ══ Drawer móvil ══ */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-paper flex flex-col animate-slide-in shadow-lift">

            <div className="flex items-center justify-between px-5 h-[72px] border-b border-line flex-shrink-0">
              <BrandLockup size="sm" />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 -mr-2 rounded-lg text-ink-soft hover:bg-paper-sunken transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5" strokeWidth={2.2} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto custom-scrollbar px-4 py-5">
              <div className="flex items-center w-full bg-paper-raised border border-line rounded-full h-11 px-4 mb-6">
                <Search className="w-4 h-4 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
                <label htmlFor="drawer-search" className="sr-only">Buscar productos</label>
                <input
                  id="drawer-search"
                  type="search"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos…"
                  className="bg-transparent outline-none text-[16px] ml-2.5 w-full text-ink placeholder:text-ink-muted"
                />
              </div>

              <button
                type="button"
                onClick={() => { setIsMenuOpen(false); scrollToCatalog() }}
                className="w-full text-left px-3 py-3 rounded-lg text-[15px] font-medium text-ink hover:bg-paper-sunken transition-colors"
              >
                Inicio
              </button>

              <p className="px-3 pt-6 pb-2 text-eyebrow font-bold uppercase text-ink-muted">
                Categorías
              </p>

              <div className="space-y-0.5">
                {MENU_CATEGORIES.map(item => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => pickCategory(item)}
                    className={cn(
                      'w-full text-left px-3 py-3 rounded-lg text-[15px] transition-colors',
                      selectedCategory === item
                        ? 'bg-brand-tint text-brand-ink font-semibold'
                        : 'text-ink-soft hover:bg-paper-sunken hover:text-ink'
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </nav>

            <div className="p-4 border-t border-line flex-shrink-0">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                data-tap-target
                className="flex items-center justify-center gap-2.5 w-full h-12 bg-leaf hover:brightness-95 text-white rounded-full font-semibold text-[15px] transition-all"
              >
                <MessageCircle className="w-[18px] h-[18px]" strokeWidth={2.2} />
                Pedir por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
