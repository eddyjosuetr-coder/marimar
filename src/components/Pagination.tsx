import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (p: number) => void
}

const WINDOW_SIZE = 5

/**
 * Ventana deslizante de páginas, siempre con la primera y la última visibles.
 * La versión anterior podía generar números fuera de rango y dejar huecos.
 */
function buildPages(currentPage: number, totalPages: number): (number | 'gap')[] {
  if (totalPages <= WINDOW_SIZE + 2) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const half = Math.floor(WINDOW_SIZE / 2)
  const windowStart = Math.max(2, currentPage - half)
  const end = Math.min(totalPages - 1, windowStart + WINDOW_SIZE - 1)
  const start = Math.max(2, end - WINDOW_SIZE + 1)

  const pages: (number | 'gap')[] = [1]
  if (start > 2) pages.push('gap')
  for (let p = start; p <= end; p++) pages.push(p)
  if (end < totalPages - 1) pages.push('gap')
  pages.push(totalPages)

  return pages
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = buildPages(currentPage, totalPages)
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <nav className="mt-12 pt-8 border-t border-line flex items-center justify-between gap-4" aria-label="Paginación del catálogo">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={isFirst}
        className="inline-flex items-center gap-2 h-10 px-3.5 rounded-full border border-line text-[13.5px] font-semibold text-ink hover:border-ink/35 hover:bg-paper-sunken disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2.2} />
        <span className="hidden sm:inline">Anterior</span>
      </button>

      {/*
        En el teléfono la lista de números no cabe: con 13 páginas medía 360px
        y empujaba la página entera, que quedaba desplazable en horizontal.
        Ahí se cambia por "Página 3 de 13", que dice lo mismo en un renglón.
      */}
      <p className="sm:hidden text-[13.5px] font-semibold text-ink-soft tabular-nums" aria-hidden="true">
        Página <span className="text-ink">{currentPage}</span> de {totalPages}
      </p>

      <ul className="hidden sm:flex items-center gap-1">
        {pages.map((p, i) =>
          p === 'gap' ? (
            <li key={`gap-${i}`} className="w-6 text-center text-ink-muted select-none" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={p}>
              <button
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                aria-label={`Página ${p}`}
                className={cn(
                  'w-10 h-10 rounded-full font-display text-[14px] font-bold tabular-nums transition-all duration-200',
                  p === currentPage
                    ? 'bg-ink text-paper'
                    : 'text-ink-soft hover:bg-paper-sunken hover:text-ink'
                )}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={isLast}
        className="inline-flex items-center gap-2 h-10 px-3.5 rounded-full border border-line text-[13.5px] font-semibold text-ink hover:border-ink/35 hover:bg-paper-sunken disabled:opacity-40 disabled:pointer-events-none transition-all duration-200"
      >
        <span className="hidden sm:inline">Siguiente</span>
        <ArrowRight className="w-4 h-4" strokeWidth={2.2} />
      </button>
    </nav>
  )
}
