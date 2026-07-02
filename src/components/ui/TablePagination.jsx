import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Komponen paginasi reusable — cocok untuk tabel dan daftar.
 *
 * Props:
 *   currentPage   : number  — halaman aktif (mulai dari 1)
 *   totalPages    : number  — total halaman
 *   onPageChange  : (page: number) => void
 *   totalItems    : number  (opsional) — total item untuk teks "Menampilkan X–Y dari Z"
 *   itemsPerPage  : number  (opsional) — item per halaman
 *   className     : string  (opsional) — tambahan kelas untuk wrapper
 */
export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  className = '',
}) {
  if (totalPages <= 1 && !totalItems) return null

  const startItem = totalItems && itemsPerPage ? (currentPage - 1) * itemsPerPage + 1 : null
  const endItem   = totalItems && itemsPerPage ? Math.min(currentPage * itemsPerPage, totalItems) : null

  // Buat array nomor halaman dengan ellipsis jika > 7 halaman
  const getPageNumbers = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = []
    if (currentPage <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages)
    } else if (currentPage >= totalPages - 3) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
    }
    return pages
  }

  return (
    <div className={`px-6 py-4 flex items-center justify-between border-t border-slate-100 bg-white ${className}`}>
      {/* Kiri: info item */}
      <div className="text-[13px] text-slate-500 font-medium">
        {startItem != null ? (
          <>
            Menampilkan{' '}
            <span className="font-bold text-slate-700">{startItem}–{endItem}</span>{' '}
            dari <span className="font-bold text-slate-700">{totalItems}</span>
          </>
        ) : (
          <>
            Halaman <span className="font-bold text-slate-700">{currentPage}</span> dari{' '}
            <span className="font-bold text-slate-700">{totalPages}</span>
          </>
        )}
      </div>

      {/* Kanan: navigasi halaman */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400"
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="w-8 text-center text-slate-400 text-sm select-none">
              …
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 text-sm font-bold rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-[#0a0f44] text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {page}
            </button>
          )
        )}

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-slate-400"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
