import { useState, useRef, useEffect, useMemo } from 'react'
import { Menu, X, Search, ShoppingCart, ChevronLeft, ChevronRight, Plus, Minus, Trash2, MapPin, User, Phone, ChevronDown, Eye, SlidersHorizontal, Hop as Home, Truck, Headphones, CreditCard, Mail, Facebook, Instagram, MessageCircle, Utensils, ImageOff } from 'lucide-react'
import './App.css'

// Types
interface Product {
  id: number
  image: string
  hoverImage?: string
  brand: string
  name: string
  price: number
  badge?: string
  unit?: string
  category?: string
  packaging?: string
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

interface HeroSlide {
  image: string
  eyebrow: string
  title: string
  highlight: string
  description: string
}

// Infer packaging from product name
const inferPackaging = (name: string): string => {
  const n = name.toLowerCase()
  if (n.includes('sachet')) return 'Sachet'
  if (n.includes('galón') || n.includes('galon')) return 'Galón'
  if (n.includes('bulto')) return 'Bulto'
  if (n.includes('caja')) return 'Caja'
  if (n.includes('pote')) return 'Pote'
  if (n.includes('bolsa')) return 'Bolsa'
  if (n.includes('lata')) return 'Lata'
  if (n.includes('unidad')) return 'Unidad'
  return 'Otro'
}

// Base products
const baseProducts: Product[] = [
  { id: 1, image: '/images/producto10.png', brand: 'Novo', name: 'Mayonesa Novo Bolsa (4x3.350G) - Bulto', price: 15.34, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 2, image: '/images/producto11.png', brand: 'Fritz', name: 'Mayonesa Doypack Fritz (6x930g) - Caja', price: 22.42, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 3, image: '/images/producto12.png', brand: 'Paraíso', name: 'Mayonesa Paraíso Bolsa (4x3.30G) - Bulto', price: 23.86, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 4, image: '/images/producto13.png', brand: 'OBA', name: 'Mayonesa OBA Galón (4x3.5KG) - Bulto', price: 30.00, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 5, image: '/images/producto14.png', brand: 'La Viña', name: 'Mayonesa La Viña (6x1KG) - Bulto', price: 17.90, badge: 'Nuevo', category: 'Mayonesas' },
  { id: 6, image: '/images/producto15.png', brand: 'Mayotropi', name: 'Mayonesa Mayotropi (4x3.350G) - Bulto', price: 78.33, badge: 'Más Vendido', category: 'Mayonesas' },
  { id: 7, image: '/images/producto16.png', brand: 'La Marca', name: 'Preparado La Marca (4x4) - Bulto', price: 62.50, category: 'Mayonesas' },
  { id: 8, image: '/images/producto17.png', brand: 'La Marca', name: 'Mayonesa La Marca (4und x 4KG) - Bulto', price: 74.80, category: 'Mayonesas' },
  { id: 9, image: '/images/producto18.png', brand: 'La Viña', name: 'Mayonesa La Viña Pote (4x3.65KG) - Bulto', price: 32.96, category: 'Mayonesas' },
  { id: 10, image: '/images/producto19.png', brand: 'Fritz', name: 'Preparado Fritz (4unsd x 4KG) - Bulto', price: 39.80, category: 'Mayonesas' },
  { id: 11, image: '/images/producto20.png', brand: 'Doña Nelly', name: 'Mayonesa Doña Nelly (4x4) - Bulto', price: 19.60, category: 'Mayonesas' },
  { id: 12, image: '/images/producto21.png', brand: 'Deli', name: 'Preparado de Mayonesa Deli (4x3.1KG) - Bulto', price: 26.91, category: 'Mayonesas' },
  { id: 13, image: '/images/producto22.png', brand: 'La Colmena', name: 'Mayonesa La Colmena (4x3.35KG) - Bulto', price: 26.35, category: 'Mayonesas' },
  { id: 14, image: '/images/producto23.png', brand: 'Coma', name: 'Mostaza Coma (24 x 270gr) - Caja', price: 30.92, badge: 'Oferta', category: 'Mostazas' },
  { id: 15, image: '/images/producto24.png', brand: 'Fritz', name: 'Mostaza Doypack Fritz (6x930g) - Caja', price: 16.34, badge: 'Oferta', category: 'Mostazas' },
  { id: 16, image: '/images/producto25.png', brand: 'Fritz', name: 'Mostaza Fritz (6x1K) - Bulto', price: 22.11, category: 'Mostazas' },
  { id: 17, image: '/images/producto28.png', brand: 'La Viña', name: 'Mostaza Viña 1KG (6 und) - Caja', price: 15.94, category: 'Mostazas' },
  { id: 18, image: '/images/producto29.png', brand: 'La Viña', name: 'Mostaza La Viña Bolsa (4x4) - Bulto', price: 26.08, category: 'Mostazas' },
  { id: 19, image: '/images/producto30.png', brand: 'Coma', name: 'Mostaza Coma Galón (4x4) - Bulto', price: 40.57, category: 'Mostazas' },
  { id: 20, image: '/images/producto31.png', brand: 'Coma', name: 'Mostaza Coma (12 x 1 KG) - Caja', price: 33.51, category: 'Mostazas' },
  { id: 21, image: '/images/producto32.png', brand: 'La Viña', name: 'Mostacita La Viña Bolsa (4x3.8KG) - Bulto', price: 21.93, category: 'Mostazas' },
  { id: 22, image: '/images/producto33.png', brand: 'Fritz', name: 'Mostaza Fritz Bolsa (4x4) - Bulto', price: 39.53, category: 'Mostazas' },
  { id: 23, image: '/images/producto34.png', brand: 'French\'s', name: 'Mostaza French\'s (4x2.98K) - Bulto', price: 96.80, badge: 'Más Vendido', category: 'Mostazas' },
  { id: 24, image: '/images/producto35.png', brand: 'La Marca', name: 'Mostaza La Marca (4x3.65) - Bulto', price: 56.68, category: 'Mostazas' },
  { id: 25, image: '/images/producto36.png', brand: 'Da Gusto', name: 'Mostaza Oscareñota (4x4) - Bulto', price: 15.07, category: 'Mostazas' },
  { id: 26, image: '/images/producto37.png', brand: 'La Viña', name: 'Mostaza La Viña Galón Pote (4x4) - Bulto', price: 28.98, category: 'Mostazas' },
  { id: 27, image: '/images/salsadetomate4.png', hoverImage: '/images/productosalsa1.png', brand: 'Fritz', name: 'Salsa de Tomate Fritz (12x397g) - Caja', price: 15.92, badge: 'Nuevo', category: 'Salsas' },
  { id: 28, image: '/images/salsadetomate5.png', hoverImage: '/images/productosalsa2b.png', brand: 'Coma', name: 'Salsa Coma Ketchup (12x1KG) - Caja', price: 43.26, category: 'Salsas' },
  { id: 29, image: '/images/salsadetomate6.png', hoverImage: '/images/productosalsa3.png', brand: 'Coma', name: 'Salsa Base Coma (4x4) - Bulto', price: 36.36, category: 'Salsas' },
  { id: 30, image: '/images/salsadetomate3.png', hoverImage: '/images/salsadetomate2.png', brand: 'Heinz', name: 'Ketchup Heinz Sachet 10G (396 unds) - Caja', price: 33.61, badge: 'Más Vendido', category: 'Salsas' },
  { id: 31, image: '/images/salsadetomate7.png', hoverImage: '/images/productosalsa4b.png', brand: 'Heinz', name: 'Ketchup Volpack Heinz 12.7KG - Unidad', price: 54.06, category: 'Salsas' },
  { id: 32, image: '/images/salsadetomate8.png', hoverImage: '/images/productosalsa5.png', brand: 'Coma', name: 'Pasta de Tomate (4und x 4KG) - Bulto', price: 63.96, category: 'Salsas' },
  { id: 33, image: '', brand: 'Genérico', name: 'Pasta de Tomate (12und x 1KG) - Bulto', price: 35.14, category: 'Salsas' },
  { id: 34, image: '', brand: 'Genérico', name: 'Pasta de Tomate (12und x 500gr) - Bulto', price: 35.04, category: 'Salsas' },
  { id: 35, image: '/images/salsadetomate9.png', hoverImage: '/images/productosalsa9.png', brand: 'Genérico', name: 'Pasta de Tomate (24und x 200gr) - Bulto', price: 34.07, category: 'Salsas' },
  { id: 36, image: '/images/salsadetomate10.png', hoverImage: '/images/productosalsa10.png', brand: 'Fritz', name: 'Base Fritz Bolsa (6x1KG) - Bulto', price: 19.70, category: 'Salsas' },
  { id: 37, image: '/images/salsadetomate11.png', hoverImage: '/images/productosalsa11.png', brand: 'Heinz', name: 'Salsa Ketchup Heinz 397gr (16und plástico) - Caja', price: 38.98, category: 'Salsas' },
  { id: 38, image: '/images/salsadetomate12.png', hoverImage: '/images/productosalsa12.png', brand: 'Heinz', name: 'Salsa Ketchup Heinz 397gr (24und vidrio) - Caja', price: 51.41, category: 'Salsas' },
  { id: 39, image: '/images/salsadetomate13.png', hoverImage: '/images/productosalsa13.png', brand: 'Fritz', name: 'Salsa Doypack Fritz (24x165g) - Caja', price: 16.58, category: 'Salsas' },
  { id: 40, image: '/images/salsadetomate14.png', hoverImage: '/images/productosalsa14.png', brand: 'Doña Nelly', name: 'Ketchup Doña Nelly (5und x 4KG) - Bulto', price: 17.06, category: 'Salsas' },
  { id: 41, image: '/images/salsadetomate15.png', hoverImage: '/images/productosalsa15.png', brand: 'Fritz', name: 'Base Fritz (4x4) - Bulto', price: 36.90, category: 'Salsas' },
  { id: 42, image: '/images/salsadetomate16.png', hoverImage: '/images/productosalsa16.png', brand: 'La Viña', name: 'Salsa Ketchup La Viña (1KG x 6 Bolsa) - Bulto', price: 16.32, category: 'Salsas' },
  { id: 43, image: '/images/salsadetomate17.png', hoverImage: '/images/productosalsa17.png', brand: 'La Viña', name: 'Salsa Base Tomatico Viña (4x4) - Bulto', price: 17.24, category: 'Salsas' },
  { id: 44, image: '/images/salsadetomate18.png', hoverImage: '/images/productosalsa18.png', brand: 'Paraíso', name: 'Salsa de Tomate Paraíso (4x4) - Bulto', price: 17.05, category: 'Salsas' },
  { id: 45, image: '/images/salsadetomate19.png', hoverImage: '/images/productosalsa19.png', brand: 'La Ideal', name: 'Salsa La Ideal Ketchup (1KG x 6unds) - Bulto', price: 22.99, category: 'Salsas' },
  { id: 46, image: '/images/salsadetomate20.png', hoverImage: '/images/productosalsa20.png', brand: 'Venato', name: 'Pasta de Tomate Venato (12x375g) - Caja', price: 31.11, category: 'Salsas' },
  { id: 47, image: '/images/salsadetomate21.png', hoverImage: '/images/productosalsa21.png', brand: 'Fritz', name: 'Salsa Tomate Doypack Fritz (6x930g) - Caja', price: 20.02, category: 'Salsas' },
  { id: 48, image: '/images/salsadetomate22.png', hoverImage: '/images/productosalsa22.png', brand: 'Coma', name: 'Salsa Coma Ketchup Plástico (4x4) - Bulto', price: 47.18, category: 'Salsas' },
  { id: 49, image: '/images/salsadetomate23.png', hoverImage: '/images/productosalsa23.png', brand: 'Mayotropi', name: 'Salsa Mayotropi (4x4 und) - Bulto', price: 35.80, category: 'Salsas' },
  { id: 50, image: '/images/salsadetomate24.png', hoverImage: '/images/productosalsa24.png', brand: 'Tomatico', name: 'Salsa Tomatico (12 x 397gr) - Caja', price: 14.01, category: 'Salsas' },
  { id: 51, image: '/images/salsadetomate25.png', hoverImage: '/images/productosalsa25.png', brand: 'Coma', name: 'Salsa Base Coma (12 x 1KG) - Caja', price: 35.82, category: 'Salsas' },
  { id: 52, image: '/images/salsadetomate26.png', hoverImage: '/images/productosalsa26.png', brand: 'Fragua', name: 'Salsa para Pizza Fragua 4KG - Lata', price: 21.93, category: 'Salsas' },
]

// Generate placeholder products to simulate large catalog (300+)
const placeholderBrands = ['Novo', 'Fritz', 'La Viña', 'Heinz', 'Diana', 'Coma', 'La Marca', 'Deli', 'Paraíso', 'OBA']
const placeholderCategories = ['Mayonesas', 'Mostazas', 'Aderezos', 'Especias']
const placeholderPackagings = ['Bulto', 'Caja', 'Galón', 'Sachet', 'Bolsa']

const generatedProducts: Product[] = Array.from({ length: 280 }, (_, i) => {
  const id = 100 + i
  const category = placeholderCategories[i % placeholderCategories.length]
  const brand = placeholderBrands[i % placeholderBrands.length]
  const pack = placeholderPackagings[i % placeholderPackagings.length]
  const sizes = ['4x4KG', '6x1KG', '12x397G', '4x3.5KG', '24x270G']
  const size = sizes[i % sizes.length]
  return {
    id,
    image: '',
    brand,
    name: `${category.slice(0, -1)} ${brand} (${size}) - ${pack}`,
    price: Math.round((10 + Math.random() * 95) * 100) / 100,
    category,
    packaging: pack,
    badge: i % 17 === 0 ? 'Nuevo' : i % 23 === 0 ? 'Oferta' : i % 29 === 0 ? 'Más Vendido' : undefined,
  }
})

const products: Product[] = [
  ...baseProducts.map(p => ({ ...p, packaging: inferPackaging(p.name) })),
  ...generatedProducts,
]

const promos: Promo[] = [
  { id: 1, image: '/images/publicidad1.JPG', title: 'Espalda Cocida', subtitle: 'Ibérico - Calidad Premium' },
  { id: 2, image: '/images/publicidad2.JPG', title: 'French Fries', subtitle: 'Mondelle - 10 unidades' },
  { id: 3, image: '/images/publicidad5.JPG', title: 'Infusiones McCormick', subtitle: 'Frutos del Bosque' },
  { id: 4, image: '/images/publicidad7.JPG', title: 'Leche en Polvo', subtitle: 'Purísima - Completa' },
  { id: 5, image: '/images/publicidad10.JPG', title: 'Papitas Cabello de Ángel', subtitle: 'La Viña - Premium' },
  { id: 6, image: '/images/publicidad12.JPG', title: 'Pepperoni', subtitle: 'Leyton - El mejor sabor' },
]

const heroSlides: HeroSlide[] = [
  {
    image: '/images/publicidad3.JPG',
    eyebrow: 'Mayorista de Víveres',
    title: 'Tu cocina, mejor abastecida',
    highlight: 'al por mayor',
    description: 'Más de 300 productos alimenticios en un solo lugar. Calidad, precio y entrega a tiempo.',
  },
  {
    image: '/images/publicidad6.JPG',
    eyebrow: 'Nuevas Ofertas',
    title: 'Precios especiales',
    highlight: 'este mes',
    description: 'Descuentos en marcas líderes de mayonesas, mostazas, salsas y aderezos.',
  },
  {
    image: '/images/publicidad11.JPG',
    eyebrow: 'Delivery Nacional',
    title: 'Envío gratis',
    highlight: 'sobre $100',
    description: 'Recibe tu pedido en cualquier ciudad de Venezuela con nuestro servicio logístico.',
  },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(price)

const scrollToCatalog = () => {
  const el = document.getElementById('catalogo')
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Placeholder image for missing product photos
function ProductImage({ product, className = '' }: { product: Product; className?: string }) {
  const [errored, setErrored] = useState(false)
  const hasImage = product.image && !errored

  if (!hasImage) {
    const initials = product.brand.slice(0, 2).toUpperCase()
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center bg-[#F4F4F5] ${className}`}>
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/70 flex items-center justify-center mb-2">
          <Utensils className="w-6 h-6 md:w-7 md:h-7 text-gray-400" strokeWidth={1.5} />
        </div>
        <span className="text-lg md:text-xl font-extrabold text-[#FF6B00] tracking-wider">{initials}</span>
        <span className="text-[9px] md:text-[10px] text-gray-400 mt-1 uppercase tracking-wider flex items-center gap-1">
          <ImageOff className="w-3 h-3" /> Foto próximamente
        </span>
      </div>
    )
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      loading="lazy"
      onError={() => setErrored(true)}
      className={`w-full h-full object-contain transition-transform duration-500 ${className}`}
    />
  )
}

// Header
function Header({ cartCount, cartTotal, onCartClick, onCategorySelect, searchQuery, setSearchQuery }: {
  cartCount: number
  cartTotal: number
  onCartClick: () => void
  onCategorySelect: (category: string) => void
  searchQuery: string
  setSearchQuery: (v: string) => void
}) {
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
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 z-50">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-1.5">
                      {['Todos', 'Mayonesas', 'Mostazas', 'Salsas', 'Aderezos', 'Especias'].map(c => (
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
              {['Inicio', 'Mayonesas', 'Mostazas', 'Salsas', 'Aderezos', 'Especias', 'Ofertas', 'Contacto'].map(item => (
                <button key={item} onClick={() => { if (['Mayonesas','Mostazas','Salsas','Aderezos','Especias'].includes(item)) onCategorySelect(item); setIsMenuOpen(false); scrollToCatalog() }}
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

// Hero Carousel (compact, ~450px max)
function HeroCarousel() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % heroSlides.length), 6000)
    return () => clearInterval(t)
  }, [])

  const current = heroSlides[index]
  return (
    <section className="relative w-full h-[380px] md:h-[450px] overflow-hidden bg-[#1A1A1A]">
      {heroSlides.map((slide, i) => (
        <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <img src={slide.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
        </div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-xl text-white animate-fade-in-up" key={index}>
          <span className="inline-flex items-center gap-2 bg-[#FF6B00]/90 text-white text-[11px] font-bold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            {current.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] mb-4">
            {current.title} <span className="text-[#FFA500]">{current.highlight}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-200 mb-6 max-w-md">{current.description}</p>
          <div className="flex gap-3">
            <button onClick={scrollToCatalog} className="bg-[#FF6B00] text-white font-bold px-6 py-3 rounded-full hover:bg-[#E55F00] transition-colors shadow-lg shadow-[#FF6B00]/30">
              Ver Catálogo
            </button>
            <a href="tel:+584241234567" className="bg-white/10 backdrop-blur border border-white/40 text-white font-bold px-6 py-3 rounded-full hover:bg-white/20 transition-colors">
              Llamar
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroSlides.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-[#FF6B00]' : 'w-2 bg-white/50 hover:bg-white/80'}`} />
        ))}
      </div>

      <button onClick={() => setIndex(i => (i - 1 + heroSlides.length) % heroSlides.length)}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur items-center justify-center z-10">
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button onClick={() => setIndex(i => (i + 1) % heroSlides.length)}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur items-center justify-center z-10">
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
    </section>
  )
}

// Compact Trust Bar
function TrustBar() {
  const items = [
    { icon: Truck, title: 'Delivery Nacional', desc: 'Toda Venezuela' },
    { icon: CreditCard, title: 'Pago Seguro', desc: 'Múltiples métodos' },
    { icon: Headphones, title: 'Soporte 24/7', desc: 'Atención directa' },
    { icon: ShoppingCart, title: 'Mayorista', desc: 'Precios al por mayor' },
  ]
  return (
    <section className="bg-[#FAFAFA] border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-[#FF6B00]" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm font-bold text-gray-800 truncate">{item.title}</p>
                <p className="text-[11px] md:text-xs text-gray-500 truncate">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Breadcrumbs
function Breadcrumbs({ category }: { category: string }) {
  return (
    <nav className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <a href="/" className="flex items-center gap-1 hover:text-[#FF6B00] transition-colors">
        <Home className="w-3.5 h-3.5" /> Inicio
      </a>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="hover:text-[#FF6B00] cursor-pointer">Productos</span>
      {category !== 'Todos' && (
        <>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-800 font-semibold">{category}</span>
        </>
      )}
    </nav>
  )
}

// Compact Product Card
function ProductCard({ product, onAddToCart, onQuickView }: {
  product: Product
  onAddToCart: (p: Product) => void
  onQuickView: (p: Product) => void
}) {
  const badgeStyles: Record<string, string> = {
    'Oferta': 'bg-red-500 text-white',
    'Nuevo': 'bg-[#FF6B00] text-white',
    'Más Vendido': 'bg-[#1A1A1A] text-white',
  }
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-square bg-[#FAFAFA] p-3 md:p-4 flex items-center justify-center overflow-hidden">
        {product.badge && (
          <span className={`absolute top-2 left-2 text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full z-10 tracking-wide ${badgeStyles[product.badge] || 'bg-[#FF6B00] text-white'}`}>
            {product.badge}
          </span>
        )}

        <button onClick={() => onQuickView(product)}
          className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 hover:bg-[#FF6B00] hover:text-white text-gray-700 shadow-sm"
          aria-label="Vista rápida">
          <Eye className="w-3.5 h-3.5" />
        </button>

        <ProductImage product={product} className={`group-hover:scale-105 ${product.hoverImage ? 'group-hover:opacity-0' : ''} transition-opacity duration-300`} />
        {product.hoverImage && (
          <img src={product.hoverImage} alt="" loading="lazy"
            className="absolute inset-0 w-full h-full object-contain p-3 md:p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        <button onClick={() => onAddToCart(product)}
          className="absolute bottom-2 left-2 right-2 bg-[#FF6B00] text-white text-xs font-bold py-2 rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#E55F00] flex items-center justify-center gap-1.5 shadow-lg">
          <Plus className="w-3.5 h-3.5" /> Agregar
        </button>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        <p className="text-[9px] md:text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{product.brand}</p>
        <h3 className="mt-1 text-xs md:text-sm font-semibold text-gray-800 line-clamp-2 min-h-[2.25rem] leading-snug">
          {product.name}
        </h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-base md:text-lg font-extrabold text-[#FF6B00]">{formatPrice(product.price)}</p>
          <button onClick={() => onAddToCart(product)}
            className="md:hidden w-8 h-8 bg-[#FF6B00] text-white rounded-full flex items-center justify-center"
            aria-label="Agregar">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// Quick View Modal
function QuickView({ product, onClose, onAddToCart }: {
  product: Product | null
  onClose: () => void
  onAddToCart: (p: Product) => void
}) {
  if (!product) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white shadow hover:bg-gray-100 flex items-center justify-center z-10">
          <X className="w-5 h-5 text-gray-700" />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-square bg-[#FAFAFA] p-8 flex items-center justify-center">
            <ProductImage product={product} />
          </div>
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest">{product.brand}</p>
            <h2 className="mt-2 text-xl md:text-2xl font-bold text-gray-900">{product.name}</h2>
            {product.badge && (
              <span className="mt-3 inline-flex w-fit bg-[#FF6B00] text-white text-xs font-bold px-3 py-1 rounded-full">{product.badge}</span>
            )}
            <p className="mt-4 text-3xl font-extrabold text-[#FF6B00]">{formatPrice(product.price)}</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p><span className="font-semibold text-gray-800">Categoría:</span> {product.category}</p>
              {product.packaging && <p><span className="font-semibold text-gray-800">Presentación:</span> {product.packaging}</p>}
              <p><span className="font-semibold text-gray-800">SKU:</span> MM-{String(product.id).padStart(5, '0')}</p>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Producto al por mayor para distribuidores, restaurantes y comercios. Calidad garantizada y disponibilidad inmediata.
            </p>
            <button onClick={() => { onAddToCart(product); onClose() }}
              className="mt-auto bg-[#FF6B00] text-white font-bold py-3 rounded-xl hover:bg-[#E55F00] transition-colors flex items-center justify-center gap-2">
              <ShoppingCart className="w-5 h-5" /> Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Filter Sidebar
function FilterSidebar({
  categories, brands, packagings,
  filters, setFilters,
  priceRange, maxPrice,
  className = '',
}: {
  categories: string[]
  brands: string[]
  packagings: string[]
  filters: { category: string; brands: string[]; packagings: string[]; maxPrice: number }
  setFilters: (f: any) => void
  priceRange: [number, number]
  maxPrice: number
  className?: string
}) {
  const toggleArr = (arr: string[], v: string) => arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v]
  const clear = () => setFilters({ category: 'Todos', brands: [], packagings: [], maxPrice })

  return (
    <aside className={`${className}`}>
      <div className="bg-white rounded-xl border border-gray-100 p-5 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" />Filtros</h3>
          <button onClick={clear} className="text-xs font-semibold text-[#FF6B00] hover:underline">Limpiar</button>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Categorías</h4>
          <div className="space-y-1">
            {categories.map(c => (
              <button key={c} onClick={() => setFilters({ ...filters, category: c })}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${filters.category === c ? 'bg-[#FF6B00] text-white font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Marcas</h4>
          <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
            {brands.map(b => (
              <label key={b} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                <input type="checkbox" checked={filters.brands.includes(b)}
                  onChange={() => setFilters({ ...filters, brands: toggleArr(filters.brands, b) })}
                  className="w-4 h-4 accent-[#FF6B00] rounded" />
                <span className="text-gray-700">{b}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Presentación</h4>
          <div className="space-y-1">
            {packagings.map(p => (
              <label key={p} className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-50 cursor-pointer text-sm">
                <input type="checkbox" checked={filters.packagings.includes(p)}
                  onChange={() => setFilters({ ...filters, packagings: toggleArr(filters.packagings, p) })}
                  className="w-4 h-4 accent-[#FF6B00] rounded" />
                <span className="text-gray-700">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Precio máximo</h4>
          <input type="range" min={priceRange[0]} max={priceRange[1]} value={filters.maxPrice}
            onChange={e => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
            className="w-full accent-[#FF6B00]" />
          <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
            <span>{formatPrice(priceRange[0])}</span>
            <span className="font-bold text-[#FF6B00]">Hasta {formatPrice(filters.maxPrice)}</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

// Pagination
function Pagination({ page, totalPages, onChange }: { page: number; totalPages: number; onChange: (p: number) => void }) {
  if (totalPages <= 1) return null
  const pages: (number | string)[] = []
  const add = (x: number | string) => pages.push(x)
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) add(i)
  } else {
    add(1)
    if (page > 3) add('...')
    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)
    for (let i = start; i <= end; i++) add(i)
    if (page < totalPages - 2) add('...')
    add(totalPages)
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <button onClick={() => onChange(Math.max(1, page - 1))} disabled={page === 1}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
        <ChevronLeft className="w-4 h-4" />
      </button>
      {pages.map((p, i) => typeof p === 'string' ? (
        <span key={i} className="w-9 h-9 flex items-center justify-center text-gray-400">{p}</span>
      ) : (
        <button key={i} onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${p === page ? 'bg-[#FF6B00] text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}>
          {p}
        </button>
      ))}
      <button onClick={() => onChange(Math.min(totalPages, page + 1))} disabled={page === totalPages}
        className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}

// Horizontal product carousel (for "Also like")
function RelatedCarousel({ title, subtitle, products, onAddToCart, onQuickView }: {
  title: string
  subtitle?: string
  products: Product[]
  onAddToCart: (p: Product) => void
  onQuickView: (p: Product) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -280 : 280, behavior: 'smooth' })
  }
  return (
    <section className="py-10 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          <div className="flex gap-2">
            <button onClick={() => scroll('left')} className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-colors flex items-center justify-center">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => scroll('right')} className="w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-700 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] transition-colors flex items-center justify-center">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2" style={{ scrollSnapType: 'x mandatory' }}>
          {products.map(p => (
            <div key={p.id} className="flex-shrink-0 w-[180px] md:w-[200px]" style={{ scrollSnapAlign: 'start' }}>
              <ProductCard product={p} onAddToCart={onAddToCart} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Promo banner row
function PromoRow() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {promos.map(p => (
            <a key={p.id} href="#" className="group relative rounded-xl overflow-hidden aspect-[3/4] block">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold text-xs md:text-sm leading-tight">{p.title}</h3>
                <p className="text-white/80 text-[10px] md:text-xs line-clamp-1">{p.subtitle}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Cart Drawer
function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }: {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemoveItem: (id: number) => void
}) {
  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)
  return (
    <>
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 bg-[#FF6B00]">
          <div className="flex items-center gap-2"><ShoppingCart className="w-5 h-5 text-white" /><h2 className="text-lg font-semibold text-white">Tu Carrito</h2></div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X className="w-5 h-5 text-white" /></button>
        </div>
        <div className="flex flex-col h-[calc(100%-180px)] overflow-hidden">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4"><ShoppingCart className="w-10 h-10 text-gray-400" /></div>
              <p className="text-gray-500 text-lg mb-2">Tu carrito está vacío</p>
              <button onClick={onClose} className="bg-[#FF6B00] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#E55F00]">Continuar Comprando</button>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 border border-gray-100 overflow-hidden">
                    <ProductImage product={item} className="p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.brand}</p>
                    <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                    <p className="mt-1 text-base font-bold text-[#FF6B00]">{formatPrice(item.price)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center bg-white rounded-full border border-gray-200">
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"><Minus className="w-3 h-3" /></button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full"><Plus className="w-3 h-3" /></button>
                      </div>
                      <button onClick={() => onRemoveItem(item.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-xl font-bold text-[#FF6B00]">{formatPrice(subtotal)}</span>
            </div>
            <button className="w-full py-3 bg-[#FF6B00] text-white font-semibold rounded-full hover:bg-[#E55F00]">Proceder al Pago</button>
          </div>
        )}
      </div>
    </>
  )
}

// Expanded Footer
function Footer() {
  return (
    <footer id="contacto" className="bg-[#1A1A1A] text-white">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-xl md:text-2xl font-bold">Suscríbete a nuestro boletín</h3>
            <p className="text-sm text-gray-400 mt-1">Recibe ofertas exclusivas y nuevos productos en tu correo.</p>
          </div>
          <form className="flex gap-2">
            <div className="flex-1 flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-3">
              <Mail className="w-4 h-4 text-gray-400" />
              <input type="email" placeholder="tu@email.com" className="bg-transparent outline-none text-sm ml-2 w-full text-white placeholder-gray-400" />
            </div>
            <button type="button" className="bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold px-6 py-3 rounded-full transition-colors">Suscribir</button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <img src="/images/logo.png" alt="Marimar Milenium" className="h-14 w-auto object-contain mb-4 brightness-0 invert" />
          <p className="text-gray-400 text-sm leading-relaxed">Distribuidora mayorista de víveres y productos alimenticios de alta calidad para toda Venezuela.</p>
          <div className="mt-4 flex gap-2">
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF6B00] transition-colors"><MessageCircle className="w-4 h-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[#FF6B00] font-bold mb-4 text-sm uppercase tracking-wider">Productos</h4>
          <ul className="space-y-2">
            {['Mayonesas', 'Mostazas', 'Salsas', 'Aderezos', 'Especias'].map(c => (
              <li key={c}><a href="#catalogo" className="text-gray-400 hover:text-[#FF6B00] text-sm transition-colors">{c}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[#FF6B00] font-bold mb-4 text-sm uppercase tracking-wider">Ayuda</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Preguntas Frecuentes</a></li>
            <li><a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Envíos y Entregas</a></li>
            <li><a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Devoluciones</a></li>
            <li><a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Términos y Condiciones</a></li>
            <li><a href="#" className="text-gray-400 hover:text-[#FF6B00] transition-colors">Política de Privacidad</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#FF6B00] font-bold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li className="flex items-start gap-2"><Phone className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" /><span>+58 424-1234567</span></li>
            <li className="flex items-start gap-2"><Mail className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" /><span>ventas@marimar.com</span></li>
            <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0 mt-0.5" /><span>Caracas, Venezuela<br />Delivery Nacional</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Marimar Milenium. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Métodos de pago:</span>
            <span className="bg-white/10 px-2 py-1 rounded">Zelle</span>
            <span className="bg-white/10 px-2 py-1 rounded">Pago Móvil</span>
            <span className="bg-white/10 px-2 py-1 rounded">Transferencia</span>
            <span className="bg-white/10 px-2 py-1 rounded">Efectivo</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
const PER_PAGE = 24

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sort, setSort] = useState<'relevance' | 'price-asc' | 'price-desc' | 'name-asc' | 'bestseller'>('relevance')
  const [page, setPage] = useState(1)

  const priceMin = 0
  const priceMax = Math.ceil(Math.max(...products.map(p => p.price)))

  const [filters, setFilters] = useState({
    category: 'Todos',
    brands: [] as string[],
    packagings: [] as string[],
    maxPrice: priceMax,
  })

  const categories = useMemo(() => ['Todos', ...Array.from(new Set(products.map(p => p.category).filter(Boolean) as string[]))], [])
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [])
  const packagings = useMemo(() => Array.from(new Set(products.map(p => p.packaging).filter(Boolean) as string[])).sort(), [])

  const filtered = useMemo(() => {
    let list = products.slice()
    if (filters.category !== 'Todos') list = list.filter(p => p.category === filters.category)
    if (filters.brands.length) list = list.filter(p => filters.brands.includes(p.brand))
    if (filters.packagings.length) list = list.filter(p => p.packaging && filters.packagings.includes(p.packaging))
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    }
    list = list.filter(p => p.price <= filters.maxPrice)

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'name-asc': list.sort((a, b) => a.name.localeCompare(b.name)); break
      case 'bestseller': list.sort((a, b) => (b.badge === 'Más Vendido' ? 1 : 0) - (a.badge === 'Más Vendido' ? 1 : 0)); break
    }
    return list
  }, [filters, searchQuery, sort])

  useEffect(() => { setPage(1) }, [filters, searchQuery, sort])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const pageStart = (page - 1) * PER_PAGE
  const pageItems = filtered.slice(pageStart, pageStart + PER_PAGE)
  const showingStart = filtered.length ? pageStart + 1 : 0
  const showingEnd = Math.min(pageStart + PER_PAGE, filtered.length)

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0)

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...product, quantity: 1 }]
    })
  }
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) return setCartItems(prev => prev.filter(i => i.id !== id))
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }
  const removeFromCart = (id: number) => setCartItems(prev => prev.filter(i => i.id !== id))

  const bestSellers = useMemo(() => products.filter(p => p.badge === 'Más Vendido' || p.badge === 'Nuevo').slice(0, 12), [])

  const handlePageChange = (p: number) => {
    setPage(p)
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
        onCategorySelect={(c) => setFilters(f => ({ ...f, category: c }))}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main>
        <HeroCarousel />
        <TrustBar />

        <section id="catalogo" className="py-8 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs category={filters.category} />

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                  {filters.category === 'Todos' ? 'Nuestro Catálogo' : filters.category}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Mostrando {showingStart}-{showingEnd} de {filtered.length} productos
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={() => setMobileFiltersOpen(true)} className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700">
                  <SlidersHorizontal className="w-4 h-4" /> Filtros
                </button>
                <div className="relative">
                  <select value={sort} onChange={e => setSort(e.target.value as any)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-9 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30 cursor-pointer">
                    <option value="relevance">Relevancia</option>
                    <option value="price-asc">Precio: menor a mayor</option>
                    <option value="price-desc">Precio: mayor a menor</option>
                    <option value="name-asc">Nombre A-Z</option>
                    <option value="bestseller">Más vendidos</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
              <FilterSidebar className="hidden md:block"
                categories={categories} brands={brands} packagings={packagings}
                filters={filters} setFilters={setFilters}
                priceRange={[priceMin, priceMax]} maxPrice={priceMax} />

              <div>
                {filtered.length === 0 ? (
                  <div className="text-center py-20 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 font-semibold">No se encontraron productos con estos filtros.</p>
                    <button onClick={() => setFilters({ category: 'Todos', brands: [], packagings: [], maxPrice: priceMax })}
                      className="mt-4 text-[#FF6B00] font-bold hover:underline">Limpiar filtros</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                    {pageItems.map(p => (
                      <ProductCard key={p.id} product={p} onAddToCart={addToCart} onQuickView={setQuickViewProduct} />
                    ))}
                  </div>
                )}
                <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
              </div>
            </div>
          </div>
        </section>

        <RelatedCarousel
          title="También te puede interesar"
          subtitle="Productos destacados del catálogo"
          products={bestSellers}
          onAddToCart={addToCart}
          onQuickView={setQuickViewProduct}
        />
        <PromoRow />
      </main>

      <Footer />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Filtros</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <FilterSidebar
              categories={categories} brands={brands} packagings={packagings}
              filters={filters} setFilters={setFilters}
              priceRange={[priceMin, priceMax]} maxPrice={priceMax} />
          </div>
        </div>
      )}

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={addToCart} />
    </div>
  )
}

export default App
