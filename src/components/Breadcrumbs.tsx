import { Home, ChevronRight } from 'lucide-react'

export function Breadcrumbs({ category }: { category: string }) {
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
