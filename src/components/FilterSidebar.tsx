import { Filter } from 'lucide-react'

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
  onMaxPriceChange
}: FilterSidebarProps) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-[#FF6B00]" />
        <h2 className="text-lg font-bold text-gray-800">Filtros</h2>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Categorías</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map(c => (
              <label key={c} className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="category" checked={selectedCategory === c} onChange={() => onCategoryChange(c)}
                  className="w-4 h-4 text-[#FF6B00] border-gray-300 focus:ring-[#FF6B00]" />
                <span className={`text-sm transition-colors ${selectedCategory === c ? 'text-[#FF6B00] font-semibold' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {c}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Marcas</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={selectedBrands.includes(brand)}
                  onChange={() => onBrandChange(brand)}
                  className="w-4 h-4 text-[#FF6B00] border-gray-300 rounded focus:ring-[#FF6B00]" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Presentación</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {packagings.map(p => (
              <label key={p} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={selectedPackagings.includes(p)}
                  onChange={() => onPackagingChange(p)}
                  className="w-4 h-4 text-[#FF6B00] border-gray-300 rounded focus:ring-[#FF6B00]" />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">{p}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Precio</h3>
          <div className="flex items-center gap-2">
            <input type="number" placeholder="Min" value={minPrice} onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30" />
            <span className="text-gray-400">-</span>
            <input type="number" placeholder="Max" value={maxPrice} onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]/30" />
          </div>
        </div>
      </div>
    </div>
  )
}
