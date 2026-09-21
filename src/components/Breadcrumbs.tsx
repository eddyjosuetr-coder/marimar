import { ChevronRight } from 'lucide-react'
import { scrollToCatalog } from '@/lib/utils'

export function Breadcrumbs({ category }: { category: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-[12.5px] text-ink-muted" aria-label="Ruta de navegación">
      {/* py-1 sube el área de toque a 28px: la norma pide 24 como mínimo y
          el texto solo daba 20. No cambia nada a la vista. */}
      <a href="/" className="tap-inline py-1 hover:text-ink transition-colors">
        Inicio
      </a>
      <ChevronRight className="w-3.5 h-3.5 text-line-strong" strokeWidth={2.2} aria-hidden="true" />
      <button
        type="button"
        onClick={scrollToCatalog}
        className="tap-inline py-1 hover:text-ink transition-colors"
      >
        Productos
      </button>
      {category !== 'Todos' && (
        <>
          <ChevronRight className="w-3.5 h-3.5 text-line-strong" strokeWidth={2.2} aria-hidden="true" />
          <span className="font-medium text-ink" aria-current="page">{category}</span>
        </>
      )}
    </nav>
  )
}
