import { useMemo, useState } from 'react'
import { SlidersHorizontal, Search, Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterSidebarProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (c: string) => void
  brands: string[]
  selectedBrands: string[]
  onBrandChange: (b: string) => void
  packagings: string[]
  selectedPackagings: string[]
  onPackagingChange: (p: string) => void
  minPrice: string
  maxPrice: string
  onMinPriceChange: (v: string) => void
  onMaxPriceChange: (v: string) => void
  activeFilterCount: number
  onClearAll: () => void
}

/** Encabezado de bloque: versalitas + hairline, ritmo de catálogo impreso. */
function FilterSection({ title, action, children }: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="pt-5 mt-5 border-t border-line first:pt-0 first:mt-0 first:border-t-0">
      <div className="flex items-center justify-between gap-2 mb-3.5">
        <h3 className="text-eyebrow font-bold uppercase text-ink-muted">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  )
}

/** Casilla propia: el control nativo no combina con el sistema. */
function CheckRow({ label, checked, onChange }: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="group flex items-center gap-2.5 py-1.5 cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <span
        className={cn(
          'flex-shrink-0 w-[18px] h-[18px] rounded-[5px] border flex items-center justify-center transition-all duration-150',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-brand peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper-raised',
          checked
            ? 'bg-brand border-brand'
            : 'bg-paper-raised border-line-strong group-hover:border-ink/40'
        )}
      >
        {checked && <Check className="w-3 h-3 text-white" strokeWidth={3.2} />}
      </span>
      <span className={cn(
        'text-[13.5px] leading-snug transition-colors',
        checked ? 'text-ink font-medium' : 'text-ink-soft group-hover:text-ink'
      )}>
        {label}
      </span>
    </label>
  )
}

export function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  brands,
  selectedBrands,
  onBrandChange,
  packagings,
  selectedPackagings,
  onPackagingChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  activeFilterCount,
  onClearAll,
}: FilterSidebarProps) {
  const [brandQuery, setBrandQuery] = useState('')

  // La lista de marcas es larga: sin búsqueda, no es navegable.
  const visibleBrands = useMemo(() => {
    const q = brandQuery.trim().toLowerCase()
    if (!q) return brands
    return brands.filter(b => b.toLowerCase().includes(q))
  }, [brands, brandQuery])

  return (
    <div className="bg-paper-raised rounded-xl border border-line lg:sticky lg:top-[152px] overflow-hidden">

      {/* Cabecera */}
      <div className="flex items-center justify-between gap-2 px-5 py-4 border-b border-line bg-paper-sunken/50">
        <h2 className="flex items-center gap-2 font-display text-[15px] font-bold text-ink tracking-tight">
          <SlidersHorizontal className="w-4 h-4 text-brand" strokeWidth={2.2} />
          Filtros
          {activeFilterCount > 0 && (
            <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-brand text-white text-[11px] font-bold flex items-center justify-center tabular-nums">
              {activeFilterCount}
            </span>
          )}
        </h2>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="tap-inline inline-flex items-center gap-1 text-[12.5px] font-semibold text-brand-ink hover:underline underline-offset-2"
          >
            <X className="w-3.5 h-3.5" strokeWidth={2.4} />
            Limpiar
          </button>
        )}
      </div>

      <div className="p-5">

        {/* ── Categorías ── */}
        <FilterSection title="Categorías">
          <div className="max-h-[17rem] overflow-y-auto custom-scrollbar -mr-2 pr-2 space-y-0.5">
            {categories.map(c => {
              const isActive = selectedCategory === c
              return (
                <button
                  type="button"
                  key={c}
                  onClick={() => onCategoryChange(c)}
                  aria-pressed={isActive}
                  className={cn(
                    'w-full text-left px-2.5 py-2 rounded-lg text-[13.5px] leading-snug transition-colors duration-150',
                    isActive
                      ? 'bg-brand-tint text-brand-ink font-semibold'
                      : 'text-ink-soft hover:bg-paper-sunken hover:text-ink'
                  )}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* ── Marcas ── */}
        <FilterSection
          title="Marcas"
          action={
            selectedBrands.length > 0
              ? <span className="text-[11px] font-bold text-brand-ink tabular-nums">{selectedBrands.length}</span>
              : undefined
          }
        >
          <div className="flex items-center gap-2 h-9 px-3 mb-2.5 rounded-lg border border-line bg-paper focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15 transition-all">
            <Search className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" strokeWidth={2.2} />
            <label htmlFor="brand-filter-search" className="sr-only">Buscar marca</label>
            <input
              id="brand-filter-search"
              type="search"
              value={brandQuery}
              onChange={e => setBrandQuery(e.target.value)}
              placeholder="Buscar marca…"
              className="w-full bg-transparent outline-none text-[13px] text-ink placeholder:text-ink-muted"
            />
          </div>

          <div className="max-h-[14rem] overflow-y-auto custom-scrollbar -mr-2 pr-2">
            {visibleBrands.length > 0 ? (
              visibleBrands.map(brand => (
                <CheckRow
                  key={brand}
                  label={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandChange(brand)}
                />
              ))
            ) : (
              <p className="py-3 text-[13px] text-ink-muted">
                Ninguna marca coincide con «{brandQuery}».
              </p>
            )}
          </div>
        </FilterSection>

        {/* ── Presentación (chips: más escaneables que una lista larga) ── */}
        <FilterSection title="Presentación">
          <div className="flex flex-wrap gap-1.5 max-h-[11rem] overflow-y-auto custom-scrollbar -mr-2 pr-2">
            {packagings.map(p => {
              const isActive = selectedPackagings.includes(p)
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => onPackagingChange(p)}
                  aria-pressed={isActive}
                  className={cn(
                    'px-2.5 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-150',
                    isActive
                      ? 'bg-ink text-paper border-ink'
                      : 'bg-paper-raised text-ink-soft border-line hover:border-ink/35 hover:text-ink'
                  )}
                >
                  {p}
                </button>
              )
            })}
          </div>
        </FilterSection>

        {/* ── Precio ── */}
        <FilterSection title="Precio en bolívares">
          <div className="flex items-end gap-2.5">
            <div className="flex-1">
              <label htmlFor="price-min" className="block text-[11px] font-medium text-ink-muted mb-1.5">
                Desde
              </label>
              <input
                id="price-min"
                type="number"
                inputMode="decimal"
                min={0}
                placeholder="0"
                value={minPrice}
                onChange={e => onMinPriceChange(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-line bg-paper text-[13.5px] text-ink tabular-nums outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all"
              />
            </div>
            <span className="pb-3 text-ink-muted" aria-hidden="true">–</span>
            <div className="flex-1">
              <label htmlFor="price-max" className="block text-[11px] font-medium text-ink-muted mb-1.5">
                Hasta
              </label>
              <input
                id="price-max"
                type="number"
                inputMode="decimal"
                min={0}
                placeholder="Max"
                value={maxPrice}
                onChange={e => onMaxPriceChange(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-line bg-paper text-[13.5px] text-ink tabular-nums outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-all"
              />
            </div>
          </div>
        </FilterSection>
      </div>
    </div>
  )
}
