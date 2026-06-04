import { useState, useMemo } from 'react'
import { SlidersHorizontal, LayoutGrid, Package2 } from 'lucide-react'

// Components
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { HeroCarousel } from '@/components/HeroCarousel'
import { TrustBar } from '@/components/TrustBar'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductCard } from '@/components/ProductCard'
import { QuickView } from '@/components/QuickView'
import { FilterSidebar } from '@/components/FilterSidebar'
import { Pagination } from '@/components/Pagination'
import { RelatedCarousel } from '@/components/RelatedCarousel'
import { PromoRow } from '@/components/PromoRow'
import { CartDrawer } from '@/components/CartDrawer'
import { InstagramGallery } from '@/components/InstagramGallery'

// Data & Hooks
import { products, heroSlides, promos, PER_PAGE, CATEGORIES } from '@/data/products'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'

const WA_LINK = 'https://wa.me/584241234567?text=Hola%20Marimar%2C%20quiero%20hacer%20un%20pedido'

// Icono SVG de WhatsApp
function WhatsAppIcon() {
  return (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart()

  // Estado de la app
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [page, setPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('relevance')

  // Filtros
  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [])
  const allPackagings = useMemo(
    () => Array.from(new Set(products.map(p => p.name.split('-')[1]?.trim() || 'Unidad'))).sort(),
    []
  )
  const maxProductPrice = useMemo(() => Math.max(...products.map(p => p.price)), [])

  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPackagings, setSelectedPackagings] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState(maxProductPrice.toString())
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (selectedCategory !== 'Todos' && p.category !== selectedCategory) return false
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false
        const pkg = p.name.split('-')[1]?.trim() || 'Unidad'
        if (selectedPackagings.length > 0 && !selectedPackagings.includes(pkg)) return false
        if (minPrice && p.price < parseFloat(minPrice)) return false
        if (maxPrice && p.price > parseFloat(maxPrice)) return false
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
        }
        return true
      })
      .sort((a, b) => {
        if (sortOrder === 'price_asc') return a.price - b.price
        if (sortOrder === 'price_desc') return b.price - a.price
        if (sortOrder === 'name_asc') return a.name.localeCompare(b.name)
        if (sortOrder === 'bestseller')
          return (b.badge === 'Más Vendido' ? 1 : 0) - (a.badge === 'Más Vendido' ? 1 : 0)
        return 0
      })
  }, [selectedCategory, selectedBrands, selectedPackagings, minPrice, maxPrice, searchQuery, sortOrder])

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE)
  const paginatedProducts = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
    setPage(1)
  }

  const toggleFilter = (list: string[], item: string, setter: (val: string[]) => void) => {
    setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item])
    setPage(1)
  }

  const clearAllFilters = () => {
    setSelectedCategory('Todos')
    setSelectedBrands([])
    setSelectedPackagings([])
    setMinPrice('')
    setMaxPrice(maxProductPrice.toString())
    setSearchQuery('')
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#FF6B00] selection:text-white">
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
        onCategorySelect={handleCategorySelect}
        searchQuery={searchQuery}
        setSearchQuery={q => { setSearchQuery(q); setPage(1) }}
      />

      <main>
        <HeroCarousel slides={heroSlides} />
        <TrustBar />

        {/* ── Catálogo ── */}
        <div id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">

          {/* Encabezado de sección */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="text-xs font-bold text-[#FF6B00] uppercase tracking-widest mb-1">Distribuidora Mayorista</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
                Nuestro Catálogo
              </h2>
            </div>
            <Breadcrumbs category={selectedCategory} />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Toggle filtros en móvil */}
            <div className="lg:hidden flex items-center justify-between">
              <button
                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {(selectedBrands.length > 0 || selectedCategory !== 'Todos') && (
                  <span className="w-5 h-5 bg-[#FF6B00] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {selectedBrands.length + (selectedCategory !== 'Todos' ? 1 : 0)}
                  </span>
                )}
              </button>
              <p className="text-sm text-gray-500 font-medium">
                <span className="font-bold text-gray-900">{filteredProducts.length}</span> productos
              </p>
            </div>

            {/* Sidebar filtros */}
            <aside className={`lg:w-72 flex-shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
              <FilterSidebar
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategorySelect}
                brands={allBrands}
                selectedBrands={selectedBrands}
                onBrandChange={b => toggleFilter(selectedBrands, b, setSelectedBrands)}
                packagings={allPackagings}
                selectedPackagings={selectedPackagings}
                onPackagingChange={p => toggleFilter(selectedPackagings, p, setSelectedPackagings)}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={v => { setMinPrice(v); setPage(1) }}
                onMaxPriceChange={v => { setMaxPrice(v); setPage(1) }}
              />
            </aside>

            {/* Contenido principal */}
            <div className="flex-1 min-w-0">
              <PromoRow promos={promos} />

              {/* Barra de ordenamiento */}
              <div className="bg-gradient-to-r from-gray-50 to-orange-50/30 border border-gray-100 rounded-2xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <LayoutGrid className="w-4 h-4 text-[#FF6B00]" />
                  <span className="hidden sm:inline">Mostrando</span>
                  <span className="font-bold text-gray-900">{filteredProducts.length}</span>
                  <span>productos</span>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm font-bold text-gray-700 whitespace-nowrap hidden sm:inline">Ordenar:</span>
                  <select
                    value={sortOrder}
                    onChange={e => { setSortOrder(e.target.value); setPage(1) }}
                    className="w-full sm:w-52 bg-white border border-gray-200 text-gray-700 text-sm rounded-xl focus:ring-2 focus:ring-[#FF6B00]/30 focus:border-[#FF6B00]/50 p-2.5 outline-none cursor-pointer"
                  >
                    <option value="relevance">Relevancia</option>
                    <option value="bestseller">Más Vendidos</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                    <option value="name_asc">Nombre: A – Z</option>
                  </select>
                </div>
              </div>

              {/* Grid de productos */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
                  {paginatedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={addToCart}
                      onQuickView={setQuickViewProduct}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center">
                  <Package2 className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-500 mb-2">
                    No encontramos productos con esos criterios.
                  </p>
                  <p className="text-sm text-gray-400 mb-6">Intenta ajustar los filtros o la búsqueda.</p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-[#FF6B00] hover:bg-[#E55F00] text-white font-bold px-6 py-3 rounded-full transition-colors text-sm"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              )}

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </div>

        {/* Carrusel de productos relacionados */}
        {selectedCategory !== 'Todos' && (
          <RelatedCarousel
            products={products.filter(p => p.category === selectedCategory && p.badge === 'Oferta').slice(0, 8)}
            onAddToCart={addToCart}
            onQuickView={setQuickViewProduct}
          />
        )}
      </main>

      <InstagramGallery />
      <Footer />

      {/* ── Modales y drawers ── */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartTotal={cartTotal}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* ── Botón flotante de WhatsApp ── */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 transition-all hover:scale-110 active:scale-95 wa-pulse"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}
