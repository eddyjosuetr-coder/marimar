import { useState, useRef, useEffect } from 'react'
import { Menu, X, Search, ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, Trash2, MapPin, User, Phone, ChevronDown } from 'lucide-react'
import './App.css'

// Types
interface Product {
  id: number
  image: string
  brand: string
  name: string
  price: number
  badge?: string
  unit?: string
  category?: string
}

interface CartItem extends Product {
  quantity: number
}

interface Promo {
  id: number
  image: string
  title: string
  subtitle: string
}

// Data - Productos originales
const products: Product[] = [
  // MAYONESAS
  { id: 1, image: '/images/producto10.png', brand: 'Novo', name: 'Mayonesa Novo Bolsa (4x3.350G) - Bulto', price: 15.34, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 2, image: '/images/producto11.png', brand: 'Fritz', name: 'Mayonesa Doypack Fritz (6x930g) - Caja', price: 22.42, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 3, image: '/images/producto12.png', brand: 'Paraíso', name: 'Mayonesa Paraíso Bolsa (4x3.30G) - Bulto', price: 23.86, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 4, image: '/images/producto13.png', brand: 'OBA', name: 'Mayonesa OBA Galón (4x3.5KG) - Bulto', price: 30.00, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 5, image: '/images/producto14.png', brand: 'La Viña', name: 'Mayonesa La Viña (6x1KG) - Bulto', price: 17.90, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 6, image: '/images/producto15.png', brand: 'Mayotropi', name: 'Mayonesa Mayotropi (4x3.350G) - Bulto', price: 78.33, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 7, image: '/images/producto16.png', brand: 'La Marca', name: 'Preparado La Marca (4x4) - Bulto', price: 62.50, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 8, image: '/images/producto17.png', brand: 'La Marca', name: 'Mayonesa La Marca (4und x 4KG) - Bulto', price: 74.80, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 9, image: '/images/producto18.png', brand: 'La Viña', name: 'Mayonesa La Viña Pote (4x3.65KG) - Bulto', price: 32.96, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 10, image: '/images/producto19.png', brand: 'Fritz', name: 'Preparado Fritz (4unsd x 4KG) - Bulto', price: 39.80, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 11, image: '/images/producto20.png', brand: 'Doña Nelly', name: 'Mayonesa Doña Nelly (4x4) - Bulto', price: 19.60, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 12, image: '/images/producto21.png', brand: 'Deli', name: 'Preparado de Mayonesa Deli (4x3.1KG) - Bulto', price: 26.91, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 13, image: '/images/producto22.png', brand: 'La Colmena', name: 'Mayonesa La Colmena (4x3.35KG) - Bulto', price: 26.35, badge: 'Nuevo', category: 'Mayonesas' },

  // MOSTAZAS
  { id: 14, image: '/images/producto23.png', brand: 'Coma', name: 'Mostaza Coma (24 x 270gr) - Caja', price: 30.92, badge: 'Oferta', category: 'Mostazas' },
  { id: 15, image: '/images/producto24.png', brand: 'Fritz', name: 'Mostaza Doypack Fritz (6x930g) - Caja', price: 16.34, badge: 'Oferta', category: 'Mostazas' },
  { id: 16, image: '/images/producto25.png', brand: 'Fritz', name: 'Mostaza Fritz (6x1K) - Bulto', price: 22.11, badge: 'Oferta', category: 'Mostazas' },
  { id: 17, image: '/images/producto28.png', brand: 'La Viña', name: 'Mostaza Viña 1KG (6 und) - Caja', price: 15.94, badge: 'Oferta', category: 'Mostazas' },
  { id: 18, image: '/images/producto29.png', brand: 'La Viña', name: 'Mostaza La Viña Bolsa (4x4) - Bulto', price: 26.08, badge: 'Oferta', category: 'Mostazas' },
  { id: 19, image: '/images/producto30.png', brand: 'Coma', name: 'Mostaza Coma Galón (4x4) - Bulto', price: 40.57, badge: 'Oferta', category: 'Mostazas' },
  { id: 20, image: '/images/producto31.png', brand: 'Coma', name: 'Mostaza Coma (12 x 1 KG) - Caja', price: 33.51, badge: 'Oferta', category: 'Mostazas' },
  { id: 21, image: '/images/producto32.png', brand: 'La Viña', name: 'Mostacita La Viña Bolsa (4x3.8KG) - Bulto', price: 21.93, badge: 'Oferta', category: 'Mostazas' },
  { id: 22, image: '/images/producto33.png', brand: 'Fritz', name: 'Mostaza Fritz Bolsa (4x4) - Bulto', price: 39.53, badge: 'Oferta', category: 'Mostazas' },
  { id: 23, image: '/images/producto34.png', brand: 'French\'s', name: 'Mostaza French\'s (4x2.98K) - Bulto', price: 96.80, badge: 'Oferta', category: 'Mostazas' },
  { id: 24, image: '/images/producto35.png', brand: 'La Marca', name: 'Mostaza La Marca (4x3.65) - Bulto', price: 56.68, badge: 'Oferta', category: 'Mostazas' },
  { id: 25, image: '/images/producto36.png', brand: 'Da Gusto / Oscareñota', name: 'Mostaza Oscareñota (4x4) - Bulto', price: 15.07, badge: 'Oferta', category: 'Mostazas' },
  { id: 26, image: '/images/producto37.png', brand: 'La Viña', name: 'Mostaza La Viña Galón Pote (4x4) - Bulto', price: 28.98, badge: 'Oferta', category: 'Mostazas' },

  // SALSAS
  { id: 27, image: '/images/salsadetomate1.png', brand: 'Fritz', name: 'Salsa de Tomate Fritz (12x397g) - Caja', price: 15.92, badge: 'Nuevo', category: 'Salsas' },
]

// Promociones camufladas (usando las nuevas imágenes)
const promos: Promo[] = [
  { id: 1, image: '/images/publicidad1.JPG', title: 'Espalda Cocida', subtitle: 'Ibérico - Calidad Premium' },
  { id: 2, image: '/images/publicidad2.JPG', title: 'French Fries', subtitle: 'Mondelle - 10 unidades' },
  { id: 3, image: '/images/publicidad5.JPG', title: 'Infusiones McCormick', subtitle: 'Frutos del Bosque' },
  { id: 4, image: '/images/publicidad7.JPG', title: 'Leche en Polvo', subtitle: 'Purísima - Completa' },
  { id: 5, image: '/images/publicidad10.JPG', title: 'Papitas Cabello de Ángel', subtitle: 'La Viña - Premium' },
  { id: 6, image: '/images/publicidad12.JPG', title: 'Pepperoni', subtitle: 'Leyton - El mejor sabor' },
]

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

// Header Component
function Header({ cartCount, cartTotal, onCartClick, onCategorySelect }: { cartCount: number; cartTotal: number; onCartClick: () => void; onCategorySelect: (category: 'Todos' | 'Mayonesas' | 'Mostazas' | 'Salsas') => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Bar - Info de contacto */}
      <div className="hidden md:block bg-gradient-to-r from-[#E55F00] to-[#FF6B00] text-white py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              +58 424-1234567
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Delivery en toda Venezuela
            </span>
          </div>
          <span>Envíos gratis en compras mayores a $100</span>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100/50' : 'bg-white/50 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left - Hamburger Menu (Mobile) */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-all"
              aria-label="Menú"
            >
              <Menu className="w-6 h-6 text-gray-800" strokeWidth={2} />
            </button>

            {/* Left - Logo */}
            <a href="/" className="flex-shrink-0 flex items-center group mr-auto lg:mr-8 xl:mr-12">
              <img 
                src="/images/logo.png" 
                alt="Marimar Milenium" 
                className="h-16 md:h-20 w-auto object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </a>

            {/* Center - Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8 bg-gray-50/80 backdrop-blur-xl px-8 py-3.5 rounded-full border border-gray-200/60 shadow-sm mx-auto">
              <a href="#" className="text-sm font-bold text-[#FF6B00] relative after:absolute after:-bottom-1.5 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-[#FF6B00] after:rounded-full">
                Inicio
              </a>
              
              {/* Dropdown Productos */}
              <div 
                className="relative group"
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => setShowProductsDropdown(false)}
              >
                <a href="#catalogo" className="text-sm font-semibold text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-1 py-2">
                  Productos
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showProductsDropdown ? 'rotate-180 text-[#FF6B00]' : ''}`} />
                </a>
                
                {/* Menú Desplegable */}
                {showProductsDropdown && (
                  <div className="absolute top-[90%] left-1/2 -translate-x-1/2 pt-2 w-44 z-50 animate-fade-in-up">
                    <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_10px_40px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col p-1.5 gap-1">
                      <a 
                        href="#catalogo"
                        onClick={() => { onCategorySelect('Todos'); setShowProductsDropdown(false); }}
                        className="text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] rounded-xl transition-all"
                      >
                        Ver Todos
                      </a>
                      <a 
                        href="#catalogo"
                        onClick={() => { onCategorySelect('Mayonesas'); setShowProductsDropdown(false); }}
                        className="text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] rounded-xl transition-all"
                      >
                        Mayonesas
                      </a>
                      <a 
                        href="#catalogo"
                        onClick={() => { onCategorySelect('Mostazas'); setShowProductsDropdown(false); }}
                        className="text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] rounded-xl transition-all"
                      >
                        Mostazas
                      </a>
                      <a 
                        href="#catalogo"
                        onClick={() => { onCategorySelect('Salsas'); setShowProductsDropdown(false); }}
                        className="text-left px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-[#FF6B00] rounded-xl transition-all"
                      >
                        Salsas
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <a href="#" className="text-sm font-semibold text-gray-600 hover:text-[#FF6B00] transition-colors flex items-center gap-1.5">
                Ofertas
                <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-md shadow-red-500/20 animate-pulse-slow">HOT</span>
              </a>
            </nav>

            {/* Right - Actions */}
            <div className="flex items-center gap-3 md:gap-5 ml-auto lg:ml-0">
              {/* Search - Desktop */}
              <div className="hidden md:flex items-center bg-gray-50/60 backdrop-blur-md border border-gray-200/50 rounded-full px-4 py-2 w-64 focus-within:ring-2 ring-[#FF6B00]/20 focus-within:bg-white transition-all shadow-sm">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar productos..."
                  className="bg-transparent border-none outline-none text-sm font-medium ml-2 w-full text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Search - Mobile */}
              <button className="md:hidden p-2 hover:bg-gray-100/80 rounded-xl transition-all">
                <Search className="w-5 h-5 text-gray-700" />
              </button>

              {/* Account */}
              <button className="hidden sm:flex items-center gap-2 p-2.5 hover:bg-gray-50 border border-transparent hover:border-gray-200/50 rounded-xl transition-all group">
                <User className="w-5 h-5 text-gray-600 group-hover:text-[#FF6B00] transition-colors" />
                <span className="text-sm font-semibold text-gray-700 hidden xl:inline group-hover:text-[#FF6B00] transition-colors">Mi Cuenta</span>
              </button>

              {/* Cart */}
              <button 
                onClick={onCartClick}
                className="flex items-center gap-3 p-2.5 bg-gradient-to-r hover:from-orange-50 hover:to-orange-100/50 border border-transparent hover:border-orange-200/50 rounded-xl transition-all group"
              >
                <div className="relative">
                  <ShoppingCart className="w-6 h-6 text-[#FF6B00] group-hover:scale-110 transition-transform" strokeWidth={2} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-br from-red-500 to-[#FF6B00] text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md shadow-orange-500/30">
                      {cartCount}
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

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-4">
          <div className="flex items-center bg-gray-50 border border-gray-200/50 rounded-full px-4 py-3 shadow-sm focus-within:bg-white focus-within:ring-2 ring-orange-500/20 transition-all">
            <Search className="w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar víveres..."
              className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white animate-slide-in overflow-y-auto">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#FF6B00]">
              <span className="text-lg font-semibold text-white">Menú</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 hover:bg-white/20 rounded-lg">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* User Info */}
            <div className="p-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Hola, Invitado</p>
                  <a href="#" className="text-sm text-[#FF6B00] hover:underline">Iniciar sesión</a>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700 font-medium">Inicio</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700 font-medium">Productos</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700 font-medium">Ofertas</span>
                <span className="ml-auto bg-[#FF6B00] text-white text-xs px-2 py-0.5 rounded-full">Nuevo</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700 font-medium">Nosotros</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <span className="text-gray-700 font-medium">Contacto</span>
              </a>
            </nav>

            {/* Contact Info */}
            <div className="p-4 border-t border-gray-100 mt-auto">
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#FF6B00]" />
                  +58 424-1234567
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#FF6B00]" />
                  Delivery Nacional
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Hero Banner Component
function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-br from-[#FF5100] via-[#FF6B00] to-[#FFA114] overflow-hidden pb-10">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-center md:text-left animate-fade-in-up">
            <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 border border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              ENVÍO GRATIS DISPONIBLE
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Víveres de Calidad<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-white">para tu Hogar</span>
            </h1>
            <p className="text-white/90 text-base md:text-lg lg:text-xl font-medium mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
              Encuentra los mejores productos alimenticios al por mayor. Mayonesa, salsas, aderezos y mucho más para ti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="bg-white text-[#FF6B00] font-bold px-8 py-4 rounded-full hover:bg-gray-50 hover:scale-105 hover:shadow-xl hover:shadow-white/20 transition-all duration-300">
                Ver Productos
              </button>
              <button className="bg-white/10 backdrop-blur-md border-2 border-white/50 text-white font-bold px-8 py-4 rounded-full hover:bg-white/20 hover:border-white transition-all duration-300">
                Llamar Ahora
              </button>
            </div>
          </div>
          <div className="hidden md:flex justify-center relative">
            {/* Glowing orb behind image */}
            <div className="absolute inset-0 bg-white/30 blur-[80px] rounded-full transform scale-90 animate-pulse-slow"></div>
            <img 
              src="/images/logo.png" 
              alt="Marimar Milenium Logo"
              className="w-80 h-80 lg:w-[500px] lg:h-[500px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.25)] animate-float relative z-10 p-4"
            />
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  )
}

// Promo Banner Carousel - Publicidad camuflada
function PromoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">También te puede interesar</h2>
            <p className="text-sm text-gray-500 mt-1">Productos recomendados para ti</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                canScrollLeft 
                  ? 'border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                canScrollRight 
                  ? 'border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white' 
                  : 'border-gray-200 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Promos Scroll */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {promos.map((promo) => (
            <a 
              key={promo.id}
              href="#"
              className="flex-shrink-0 w-[280px] sm:w-[300px] group"
              style={{ scrollSnapAlign: 'start' }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="aspect-[3/4]">
                  <img 
                    src={promo.image} 
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                {/* Overlay con info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{promo.title}</h3>
                  <p className="text-white/80 text-sm">{promo.subtitle}</p>
                  <span className="inline-block mt-2 text-[#FF6B00] text-xs font-semibold bg-white px-3 py-1 rounded-full">
                    Ver más
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Product Card Component
function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: (product: Product) => void }) {
  return (
    <div className="group bg-white rounded-[1.25rem] overflow-hidden border border-gray-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] hover:border-orange-100 transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-square bg-gradient-to-b from-gray-50/80 to-white p-6 md:p-10 flex items-center justify-center">
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full z-10 tracking-wide shadow-sm ${
            product.badge === 'Oferta' 
              ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white' 
              : 'bg-gradient-to-r from-[#FF6B00] to-orange-400 text-white'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Product Image */}
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm group-hover:drop-shadow-xl"
        />
      </div>

      {/* Product Info */}
      <div className="p-5 md:p-6 bg-white relative">
        <p className="text-[10px] md:text-xs text-gray-400 font-semibold uppercase tracking-widest">{product.brand}</p>
        <h3 className="mt-2 text-sm md:text-base font-bold text-gray-900 line-clamp-2 min-h-[2.75rem] group-hover:text-[#FF6B00] transition-colors leading-snug">
          {product.name}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg md:text-xl font-extrabold text-[#FF6B00]">
            {formatPrice(product.price)}
          </p>
          <button 
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 md:w-11 md:h-11 bg-gray-50 text-gray-700 rounded-full flex items-center justify-center hover:bg-[#FF6B00] hover:text-white transition-all duration-300 shadow-sm hover:shadow-[#FF6B00]/40 group/btn"
            aria-label="Agregar al carrito"
          >
            <Plus className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Product Section Component
function ProductSection({ 
  title, 
  subtitle,
  products, 
  onAddToCart 
}: { 
  title: string
  subtitle?: string
  products: Product[]
  onAddToCart: (product: Product) => void 
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 300)
    }
  }

  return (
    <section className="py-6 md:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              canScrollLeft 
                ? 'border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white' 
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              canScrollRight 
                ? 'border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white' 
                : 'border-gray-200 text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Products Grid/Scroll */}
      <div 
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:overflow-visible"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-auto"
            style={{ scrollSnapAlign: 'start' }}
          >
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-6 text-center md:text-right">
        <a href="#" className="inline-flex items-center gap-2 text-[#FF6B00] font-medium hover:underline">
          Ver todos
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

// Features Section
function FeaturesSection() {
  const features = [
    { icon: ShoppingCart, title: 'Compra Fácil', desc: 'Proceso de compra simple y rápido' },
    { icon: MapPin, title: 'Delivery Nacional', desc: 'Envíos a toda Venezuela' },
    { icon: Phone, title: 'Soporte 24/7', desc: 'Atención al cliente permanente' },
  ]

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-4 bg-white border border-gray-100/60 p-4 md:p-6 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B00]/10 to-[#FF6B00]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Cart Drawer Component
function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-[#FF6B00]">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Tu Carrito</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-[calc(100%-180px)] overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm text-center mb-6">Agrega productos para comenzar tu compra</p>
              <button 
                onClick={onClose}
                className="bg-[#FF6B00] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#E55F00] transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 bg-gray-50 rounded-xl">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 flex items-center justify-center border border-gray-100">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.brand}</p>
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="mt-1 text-base font-bold text-[#FF6B00]">{formatPrice(item.price)}</p>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center bg-white rounded-full border border-gray-200">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-xl font-bold text-[#FF6B00]">{formatPrice(subtotal)}</span>
            </div>
            <button className="w-full py-3 bg-[#FF6B00] text-white font-semibold rounded-full hover:bg-[#E55F00] transition-colors">
              Proceder al Pago
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img 
              src="/images/logo.png" 
              alt="Marimar Milenium" 
              className="h-12 w-auto object-contain mb-4 brightness-0 invert"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Distribuidora mayorista de víveres y productos alimenticios de alta calidad para toda Venezuela.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors">
                <Phone className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors">
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#FF6B00] font-semibold mb-4">Empresa</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Nosotros</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Productos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Ofertas</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#FF6B00] font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Preguntas Frecuentes</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Envíos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Devoluciones</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Términos y Condiciones</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#FF6B00] font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#FF6B00]" />
                +58 424-1234567
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF6B00]" />
                Delivery Nacional
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Marimar Milenium. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<'Todos' | 'Mayonesas' | 'Mostazas' | 'Salsas'>('Todos')

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0)

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id)
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-white scroll-smooth relative">
      <Header 
        cartCount={cartCount} 
        cartTotal={cartTotal} 
        onCartClick={() => setIsCartOpen(true)} 
        onCategorySelect={setActiveCategory} 
      />
      
      <main>
        {/* Hero Banner */}
        <HeroBanner />

        {/* Features */}
        <FeaturesSection />

        {/* Nuevos Productos */}
        <ProductSection 
          title="Nuevos Productos" 
          subtitle="Los últimos productos agregados a nuestro catálogo"
          products={products.filter(p => p.badge === 'Nuevo')} 
          onAddToCart={addToCart}
        />

        {/* Promociones Camufladas */}
        <PromoCarousel />
        
        {/* Catálogo Completo Filtrable */}
        <section id="catalogo" className="py-8 md:py-12 bg-white scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Nuestro Catálogo</h2>
                <p className="text-sm text-gray-500 mt-1">Explora por categorías</p>
              </div>
              
              {/* Filtros de Categoría */}
              <div className="flex bg-gray-100/50 p-1 rounded-xl w-fit border border-gray-200/50">
                {['Todos', 'Mayonesas', 'Mostazas', 'Salsas'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as any)}
                    className={`px-5 py-2 text-sm font-semibold rounded-lg transition-all duration-300 ${
                      activeCategory === cat
                        ? 'bg-white text-[#FF6B00] shadow-[0_2px_8px_rgb(0,0,0,0.04)]'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {(activeCategory === 'Todos' ? products : products.filter(p => p.category === activeCategory)).map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  )
}

export default App
