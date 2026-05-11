import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (p: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-12 flex justify-center items-center gap-2">
      <button onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#FF6B00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div className="flex gap-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum = currentPage
          if (currentPage < 3) pageNum = i + 1
          else if (currentPage > totalPages - 2) pageNum = totalPages - 4 + i
          else pageNum = currentPage - 2 + i

          if (pageNum < 1 || pageNum > totalPages) return null

          return (
            <button key={pageNum} onClick={() => onPageChange(pageNum)}
              className={`w-10 h-10 rounded-lg text-sm font-semibold transition-colors ${
                currentPage === pageNum 
                  ? 'bg-[#FF6B00] text-white border-transparent' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#FF6B00] hover:text-[#FF6B00]'
              }`}>
              {pageNum}
            </button>
          )
        })}
      </div>

      <button onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-[#FF6B00] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
