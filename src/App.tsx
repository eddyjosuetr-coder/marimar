import { useState, useMemo, useEffect } from 'react'
import { SlidersHorizontal, PackageOpen, X, ChevronDown } from 'lucide-react'

// Components
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { TrustBar } from '@/components/TrustBar'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ProductCard } from '@/components/ProductCard'
import { QuickView } from '@/components/QuickView'
import { FilterSidebar } from '@/components/FilterSidebar'
import { Pagination } from '@/components/Pagination'
import { RelatedCarousel } from '@/components/RelatedCarousel'
import { FeaturedRail } from '@/components/FeaturedRail'
import { CartDrawer } from '@/components/CartDrawer'
import { InstagramGallery } from '@/components/InstagramGallery'

// Data & Hooks
import { heroSlides, PER_PAGE, CATEGORIES } from '@/data/products'
import { useCatalogo } from '@/hooks/useCatalogo'
import { useCart } from '@/hooks/useCart'
import { getPackaging, cn } from '@/lib/utils'
import type { Product } from '@/types'

const WA_LINK = 'https://wa.me/584241234567?text=Hola%20Marimar%2C%20quiero%20hacer%20un%20pedido'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'bestseller', label: 'Más vendidos' },
  { value: 'price_asc', label: 'Precio: menor a mayor' },
  { value: 'price_desc', label: 'Precio: mayor a menor' },
  { value: 'name_asc', label: 'Nombre: A – Z' },
] as const

function WhatsAppIcon() {
  return (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

/** Ficha compacta de un filtro activo, con su propia acción de quitar. */
function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 h-8 pl-3 pr-2 rounded-full bg-paper-raised border border-line text-[12.5px] font-medium text-ink">
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="tap-inline p-0.5 rounded-full text-ink-muted hover:text-ink hover:bg-paper-sunken transition-colors"
        aria-label={`Quitar filtro ${label}`}
      >
        <X className="w-3.5 h-3.5" strokeWidth={2.4} />
      </button>
    </span>
  )
}

export default function App() {
  /*
    El catálogo ya viene con lo que el dueño cambió en el panel: precios
    corregidos, ofertas puestas y sin los productos que ocultó. La tienda
    nunca lee el catálogo crudo, así no hay forma de mostrar algo retirado.
  */
  const products = useCatalogo()

  const { cart, addToCart, removeFromCart, updateQuantity, cartCount, cartTotal } = useCart(products)

  const [searchQuery, setSearchQuery] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [page, setPage] = useState(1)
  const [sortOrder, setSortOrder] = useState<string>('relevance')

  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brand))).sort(), [products])
  const allPackagings = useMemo(
    () => Array.from(new Set(products.map(p => getPackaging(p.name)))).sort(),
    [products]
  )
  const maxProductPrice = useMemo(() => Math.max(...products.map(p => p.price)), [products])

  /*
    Muestra del riel de portada: el primer producto con precio de cada
    categoría. Da un recorrido por todo el catálogo sin repetir familia y se
    mantiene solo cuando entran productos nuevos.
  */
  const featuredProducts = useMemo(() => {
    const categoriasVistas = new Set<string>()
    return products.filter(p => {
      if (p.priceOnRequest || !p.image || categoriasVistas.has(p.category)) return false
      categoriasVistas.add(p.category)
      return true
    })
  }, [products])
  const defaultMaxPrice = maxProductPrice.toString()

  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedPackagings, setSelectedPackagings] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState(defaultMaxPrice)
  const [showFiltersMobile, setShowFiltersMobile] = useState(false)
  const [soloOfertas, setSoloOfertas] = useState(false)

  const hayOfertas = useMemo(() => products.some(p => p.listPrice !== undefined), [products])

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (soloOfertas && p.listPrice === undefined) return false
        if (selectedCategory !== 'Todos' && p.category !== selectedCategory) return false
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false
        if (selectedPackagings.length > 0 && !selectedPackagings.includes(getPackaging(p.name))) return false
        // Los productos "a consultar" no tienen cifra que comparar: si el
        // usuario acota por precio, quedan fuera en lugar de colarse con 0.
        const hayFiltroDePrecio = Boolean(minPrice) || maxPrice !== defaultMaxPrice
        if (p.priceOnRequest) {
          if (hayFiltroDePrecio) return false
        } else {
          if (minPrice && p.price < parseFloat(minPrice)) return false
          if (maxPrice && p.price > parseFloat(maxPrice)) return false
        }
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          return p.name.toLowerCase().includes(q)
            || p.brand.toLowerCase().includes(q)
            || (p.description?.toLowerCase().includes(q) ?? false)
        }
        return true
      })
      .sort((a, b) => {
        // Al ordenar por precio, lo que no tiene precio va siempre al final.
        if (sortOrder === 'price_asc' || sortOrder === 'price_desc') {
          if (a.priceOnRequest !== b.priceOnRequest) return a.priceOnRequest ? 1 : -1
          if (a.priceOnRequest) return 0
          return sortOrder === 'price_asc' ? a.price - b.price : b.price - a.price
        }
        if (sortOrder === 'name_asc') return a.name.localeCompare(b.name)
        if (sortOrder === 'bestseller')
          return (b.badge === 'Más Vendido' ? 1 : 0) - (a.badge === 'Más Vendido' ? 1 : 0)
        // Por relevancia, lo rebajado va primero: es lo que el dueño quiere
        // empujar y lo que el cliente agradece ver de entrada.
        return (b.listPrice !== undefined ? 1 : 0) - (a.listPrice !== undefined ? 1 : 0)
      })
  }, [products, soloOfertas, selectedCategory, selectedBrands, selectedPackagings, minPrice, maxPrice, defaultMaxPrice, searchQuery, sortOrder])

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE)
  const paginatedProducts = filteredProducts.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const activeFilterCount =
    (soloOfertas ? 1 : 0) +
    (selectedCategory !== 'Todos' ? 1 : 0) +
    selectedBrands.length +
    selectedPackagings.length +
    (minPrice ? 1 : 0) +
    (maxPrice !== defaultMaxPrice ? 1 : 0)

  // El sheet de filtros bloquea el scroll de fondo mientras está abierto.
  useEffect(() => {
    document.body.style.overflow = showFiltersMobile ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [showFiltersMobile])

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat)
    setPage(1)
  }

  const toggleFilter = (list: string[], item: string, setter: (val: string[]) => void) => {
    setter(list.includes(item) ? list.filter(x => x !== item) : [...list, item])
    setPage(1)
  }

  const clearAllFilters = () => {
    setSoloOfertas(false)
    setSelectedCategory('Todos')
    setSelectedBrands([])
    setSelectedPackagings([])
    setMinPrice('')
    setMaxPrice(defaultMaxPrice)
    setSearchQuery('')
    setPage(1)
  }

  /** Al cambiar de página se vuelve al inicio de la rejilla, no del documento. */
  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filterSidebar = (
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
      activeFilterCount={activeFilterCount}
      onClearAll={clearAllFilters}
    />
  )

  return (
    <div className="min-h-dvh bg-paper text-ink">
      <a
        href="#catalogo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-ink focus:text-paper focus:text-sm focus:font-semibold"
      >
        Saltar al catálogo
      </a>

      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        hayOfertas={hayOfertas}
        onOfertasClick={() => { setSoloOfertas(true); setPage(1) }}
        searchQuery={searchQuery}
        setSearchQuery={q => { setSearchQuery(q); setPage(1) }}
      />

      <main>
        <Hero slides={heroSlides} />
        <TrustBar />
        <FeaturedRail products={featuredProducts} onQuickView={setQuickViewProduct} />

        {/* ══════════ Catálogo ══════════ */}
        <div id="catalogo" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-16 scroll-mt-40">

          {/* Encabezado editorial de sección */}
          <header className="mb-8 md:mb-10">
            <Breadcrumbs category={selectedCategory} />
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4 pb-6 border-b border-line">
              <div>
                <p className="text-eyebrow font-bold uppercase text-brand-ink mb-2.5">
                  Tienda en línea
                </p>
                <h2 className="font-display text-display-md font-extrabold text-ink">
                  {soloOfertas
                    ? 'Ofertas de la semana'
                    : selectedCategory === 'Todos' ? 'Nuestro catálogo' : selectedCategory}
                </h2>
              </div>
              <p className="text-[14px] text-ink-muted md:text-right md:pb-1.5">
                <span className="font-display text-[22px] font-extrabold text-ink tabular-nums align-middle mr-1.5">
                  {filteredProducts.length}
                </span>
                productos disponibles
              </p>
            </div>
          </header>

          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">

            {/* ── Barra lateral de filtros ── */}
            <aside className="hidden lg:block lg:w-[280px] xl:w-[300px] flex-shrink-0">
              {filterSidebar}
            </aside>

            {/* ── Contenido ── */}
            <div className="flex-1 min-w-0">

              {/* Controles: filtros (móvil), fichas activas y ordenamiento */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setShowFiltersMobile(true)}
                  className="lg:hidden inline-flex items-center gap-2 h-10 px-4 rounded-full bg-ink text-paper text-[13.5px] font-semibold transition-colors hover:bg-ink-soft"
                >
                  <SlidersHorizontal className="w-4 h-4" strokeWidth={2.2} />
                  Filtros
                  {activeFilterCount > 0 && (
                    <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-brand text-[10px] font-bold flex items-center justify-center tabular-nums">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <div className="relative ml-auto">
                  <label htmlFor="sort-order" className="sr-only">Ordenar productos</label>
                  <select
                    id="sort-order"
                    value={sortOrder}
                    onChange={e => { setSortOrder(e.target.value); setPage(1) }}
                    className="appearance-none h-10 pl-4 pr-10 rounded-full bg-paper-raised border border-line text-[13.5px] font-medium text-ink cursor-pointer outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all"
                  >
                    {SORT_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        Ordenar: {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-muted"
                    strokeWidth={2.2}
                  />
                </div>
              </div>

              {/* Fichas de filtros activos: siempre visible qué está acotando la lista */}
              {activeFilterCount > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6 pb-6 border-b border-line">
                  {soloOfertas && (
                    <FilterChip label="Solo ofertas" onRemove={() => { setSoloOfertas(false); setPage(1) }} />
                  )}
                  {selectedCategory !== 'Todos' && (
                    <FilterChip label={selectedCategory} onRemove={() => handleCategorySelect('Todos')} />
                  )}
                  {selectedBrands.map(b => (
                    <FilterChip key={b} label={b} onRemove={() => toggleFilter(selectedBrands, b, setSelectedBrands)} />
                  ))}
                  {selectedPackagings.map(p => (
                    <FilterChip key={p} label={p} onRemove={() => toggleFilter(selectedPackagings, p, setSelectedPackagings)} />
                  ))}
                  {minPrice && (
                    <FilterChip label={`Desde $${minPrice}`} onRemove={() => { setMinPrice(''); setPage(1) }} />
                  )}
                  {maxPrice !== defaultMaxPrice && (
                    <FilterChip label={`Hasta $${maxPrice}`} onRemove={() => { setMaxPrice(defaultMaxPrice); setPage(1) }} />
                  )}
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="tap-inline ml-1 text-[12.5px] font-semibold text-brand-ink hover:underline underline-offset-2"
                  >
                    Limpiar todo
                  </button>
                </div>
              )}

              {/* Rejilla */}
              {paginatedProducts.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3.5 md:gap-5">
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
                <div className="py-24 px-6 text-center border border-dashed border-line-strong rounded-2xl bg-paper-raised">
                  <PackageOpen className="w-12 h-12 text-ink-muted/50 mx-auto mb-5" strokeWidth={1.5} />
                  <h3 className="font-display text-display-sm font-bold text-ink mb-2">
                    Sin resultados
                  </h3>
                  <p className="text-[14.5px] text-ink-muted max-w-sm mx-auto mb-7">
                    No encontramos productos con esos criterios. Prueba ampliando el rango de precio o quitando alguna marca.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center h-11 px-6 rounded-full bg-brand text-white font-semibold text-[14px] hover:bg-brand-deep transition-colors"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              )}

              <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>

        {selectedCategory !== 'Todos' && (
          <RelatedCarousel
            products={[...products]
              .filter(p => p.category === selectedCategory && !p.priceOnRequest)
              .sort((a, b) => a.price - b.price)
              .slice(0, 8)}
            onAddToCart={addToCart}
            onQuickView={setQuickViewProduct}
          />
        )}
      </main>

      <InstagramGallery />
      <Footer />

      {/* ══ Sheet de filtros en móvil ══ */}
      {showFiltersMobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-espresso/60 backdrop-blur-sm"
            onClick={() => setShowFiltersMobile(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 top-16 bg-paper rounded-t-2xl flex flex-col animate-fade-in-up shadow-lift">
            <div className="flex items-center justify-between px-5 h-16 border-b border-line flex-shrink-0">
              <h2 className="font-display text-[17px] font-bold text-ink tracking-tight">Filtros</h2>
              <button
                type="button"
                onClick={() => setShowFiltersMobile(false)}
                className="p-2 -mr-2 rounded-lg text-ink-soft hover:bg-paper-sunken transition-colors"
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5" strokeWidth={2.2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
              {filterSidebar}
            </div>

            <div className="p-4 border-t border-line flex-shrink-0 flex gap-3">
              <button
                type="button"
                onClick={clearAllFilters}
                className="h-12 px-5 rounded-full border border-line text-ink font-semibold text-[14px] hover:bg-paper-sunken transition-colors"
              >
                Limpiar
              </button>
              <button
                type="button"
                onClick={() => setShowFiltersMobile(false)}
                className="flex-1 h-12 rounded-full bg-brand text-white font-semibold text-[15px] hover:bg-brand-deep transition-colors tabular-nums"
              >
                Ver {filteredProducts.length} productos
              </button>
            </div>
          </div>
        </div>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
      <QuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />

      {/* Botón flotante de WhatsApp */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        data-tap-target
        className={cn(
          'fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full flex items-center justify-center',
          'bg-leaf text-white shadow-lift wa-pulse',
          'transition-transform duration-200 hover:scale-105 active:scale-95'
        )}
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}
