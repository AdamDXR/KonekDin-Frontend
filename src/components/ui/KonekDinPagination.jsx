import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

/**
 * Komponen paginasi standar KonekDin — dipakai di semua halaman tutor & learner.
 *
 * Props:
 *   currentPage  : number — halaman aktif (mulai 1)
 *   totalPages   : number — total halaman
 *   onPageChange : (page: number) => void
 *   totalItems   : number  (opsional) — untuk teks "Menampilkan X dari Y"
 *   shownItems   : number  (opsional) — item yang tampil di halaman ini
 *   itemLabel    : string  (opsional) — label item, default "data"
 *   className    : string  (opsional)
 */
export default function KonekDinPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  shownItems,
  itemLabel = 'data',
  className = '',
}) {
  if (totalPages <= 1 && !totalItems) return null

  return (
    <div className={`py-4 border-t border-slate-100 ${className}`}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1) }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink
                href="#"
                isActive={currentPage === i + 1}
                onClick={(e) => { e.preventDefault(); onPageChange(i + 1) }}
                className={currentPage === i + 1 ? 'bg-teal-50 text-teal-600 border-teal-200' : ''}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1) }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {totalItems != null && shownItems != null && (
        <div className="mt-4 text-center text-slate-600 font-medium text-sm">
          Menampilkan{' '}
          <span className="font-bold text-[#1E1B4B]">{shownItems}</span>{' '}
          dari{' '}
          <span className="font-bold text-[#1E1B4B]">{totalItems}</span>{' '}
          {itemLabel} tersedia
        </div>
      )}
    </div>
  )
}
