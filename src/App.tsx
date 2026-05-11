import { useState, useMemo } from 'react'
import { SlidersHorizontal } from 'lucide-react'

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

// Data & Hooks
import { products, heroSlides, promos, PER_PAGE, CATEGORIES } from '@/data/products'
import { useCart } from '@/hooks/useCart'
import type { Product } from '@/types'

export default function App() {
  const { cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart()

  // App State
  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [page, setPage] = useState(1)
  const [sortOrder, setSortOrder] = useState('relevance')
  
  // Filters State
  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [])
  const allPackagings = useMemo(() => {
    return Array.from(new Set(products.map(p => p.name.split('-')[1]?.trim() || 'Unidad'))).sort()
  }, [])
  const maxProductPrice = useMemo(() => Math.max(...products.map(p => p.price)), [])

  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPackagings, setSelectedPackagings] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState(maxProductPrice.toString())
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)

  // Derived calculations
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
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
    }).sort((a, b) => {
      if (sortOrder === 'price_asc') return a.price - b.price
      if (sortOrder === 'price_desc') return b.price - a.price
      if (sortOrder === 'name_asc') return a.name.localeCompare(b.name)
      if (sortOrder === 'bestseller') return (b.badge === 'Más Vendido' ? 1 : 0) - (a.badge === 'Más Vendido' ? 1 : 0)
      return 0
    })
  }, [selectedCategory, selectedBrands, selectedPackagings, minPrice, maxPrice, searchQuery, sortOrder])

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE)
  const paginatedProducts = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  // Handlers
  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
    setPage(1)
  }

  const toggleFilter = (list: string[], item: string, setter: (val: string[]) => void) => {
    setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item])
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
        setSearchQuery={(q) => { setSearchQuery(q); setPage(1); }}
      />

      <main>
        <HeroCarousel slides={heroSlides} />
        <TrustBar />

        <div id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumbs category={selectedCategory} />
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold text-gray-800">Catálogo</h2>
              <button onClick={() => setShowFiltersMobile(!showFiltersMobile)} className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-semibold text-gray-700">
                <SlidersHorizontal className="w-4 h-4" /> Filtros
              </button>
            </div>

            {/* Sidebar */}
            <aside className={`lg:w-1/4 flex-shrink-0 ${showFiltersMobile ? 'block' : 'hidden lg:block'}`}>
              <FilterSidebar 
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategorySelect}
                brands={allBrands}
                selectedBrands={selectedBrands}
                onBrandChange={(b) => toggleFilter(selectedBrands, b, setSelectedBrands)}
                packagings={allPackagings}
                selectedPackagings={selectedPackagings}
                onPackagingChange={(p) => toggleFilter(selectedPackagings, p, setSelectedPackagings)}
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={(v) => { setMinPrice(v); setPage(1); }}
                onMaxPriceChange={(v) => { setMaxPrice(v); setPage(1); }}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <PromoRow promos={promos} />
              
              <div className="bg-[#FAFAFA] p-3 md:p-4 rounded-xl border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <p className="text-sm text-gray-600 font-medium">
                  Mostrando <span className="font-bold text-gray-900">{filteredProducts.length}</span> productos
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="text-sm font-bold text-gray-700 whitespace-nowrap">Ordenar por:</span>
                  <select value={sortOrder} onChange={e => { setSortOrder(e.target.value); setPage(1); }}
                    className="w-full sm:w-48 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#FF6B00] focus:border-[#FF6B00] p-2 outline-none cursor-pointer">
                    <option value="relevance">Relevancia</option>
                    <option value="bestseller">Más Vendidos</option>
                    <option value="price_asc">Precio: Menor a Mayor</option>
                    <option value="price_desc">Precio: Mayor a Menor</option>
                    <option value="name_asc">Nombre: A - Z</option>
                  </select>
                </div>
              </div>

              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
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
                <div className="py-20 text-center">
                  <p className="text-lg text-gray-500 font-medium">No se encontraron productos que coincidan con tu búsqueda.</p>
                  <button onClick={() => {
                    setSelectedCategory('Todos')
                    setSelectedBrands([])
                    setSelectedPackagings([])
                    setMinPrice('')
                    setMaxPrice(maxProductPrice.toString())
                    setSearchQuery('')
                  }} className="mt-4 text-[#FF6B00] font-semibold hover:underline">
                    Limpiar todos los filtros
                  </button>
                </div>
              )}

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </div>

        {selectedCategory !== 'Todos' && (
          <RelatedCarousel 
            products={products.filter(p => p.category === selectedCategory && p.badge === 'Oferta').slice(0, 8)} 
            onAddToCart={addToCart} 
            onQuickView={setQuickViewProduct} 
          />
        )}
      </main>

      <Footer />

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
    </div>
  )
}
