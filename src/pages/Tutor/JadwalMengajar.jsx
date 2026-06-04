import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  BookOpen,
  Code,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  CalendarDays,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// ─── Data mock sesi mengajar ─────────────────────────────────────────────────
export const SESSIONS = [
  // Page 1
  {
    id: 1,
    learnerName: 'Dimas Pratama',
    subject: 'Pemrograman Web',
    subjectType: 'code',
    schedule: 'Senin, 14 Okt 2026',
    time: '07:00 - 09:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=60',
    avatarFallback: 'DP',
    whatsappNumber: '6281234567890',
  },
  {
    id: 2,
    learnerName: 'Mas Adam',
    subject: 'Algoritma & Struktur Data',
    subjectType: 'code',
    schedule: 'Senin, 14 Okt 2026',
    time: '12:30 - 14:10 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    avatarFallback: 'MA',
    whatsappNumber: '6289876543210',
  },
  {
    id: 3,
    learnerName: 'Aisyah Ratuliu',
    subject: 'Pemrograman Web',
    subjectType: 'book',
    schedule: 'Kamis, 17 Okt 2026',
    time: '07:00 - 09:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    avatarFallback: 'AR',
    whatsappNumber: '6285551234567',
  },
  {
    id: 4,
    learnerName: 'Maia Amellia',
    subject: 'Pemrograman Web',
    subjectType: 'book',
    schedule: 'Kamis, 19 Okt 2026',
    time: '07:00 - 09:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=26',
    avatarFallback: 'MA',
    whatsappNumber: '628111222333',
  },
  {
    id: 5,
    learnerName: 'Joko Karso',
    subject: 'Basis Data',
    subjectType: 'book',
    schedule: 'Kamis, 22 Okt 2026',
    time: '09:30 - 10:20 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=68',
    avatarFallback: 'JK',
    whatsappNumber: '628999888777',
  },

  // Page 2
  {
    id: 6,
    learnerName: 'Rina Sari',
    subject: 'Pemrograman Web',
    subjectType: 'book',
    schedule: 'Jumat, 23 Okt 2026',
    time: '08:00 - 10:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=45',
    avatarFallback: 'RS',
    whatsappNumber: '6281234567891',
  },
  {
    id: 7,
    learnerName: 'Budi Santoso',
    subject: 'Algoritma & Struktur Data',
    subjectType: 'code',
    schedule: 'Senin, 26 Okt 2026',
    time: '13:00 - 15:00 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=52',
    avatarFallback: 'BS',
    whatsappNumber: '6289876543212',
  },
  {
    id: 8,
    learnerName: 'Citra Lestari',
    subject: 'Basis Data',
    subjectType: 'book',
    schedule: 'Selasa, 27 Okt 2026',
    time: '09:30 - 11:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=49',
    avatarFallback: 'CL',
    whatsappNumber: '6285551234563',
  },
  {
    id: 9,
    learnerName: 'Dedi Kurniawan',
    subject: 'Pemrograman Web',
    subjectType: 'code',
    schedule: 'Kamis, 29 Okt 2026',
    time: '07:00 - 09:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=51',
    avatarFallback: 'DK',
    whatsappNumber: '628111222334',
  },
  {
    id: 10,
    learnerName: 'Eka Putri',
    subject: 'Algoritma & Struktur Data',
    subjectType: 'code',
    schedule: 'Jumat, 30 Okt 2026',
    time: '13:30 - 15:10 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    avatarFallback: 'EP',
    whatsappNumber: '628999888775',
  },

  // Page 3
  {
    id: 11,
    learnerName: 'Farhan Maulana',
    subject: 'Basis Data',
    subjectType: 'book',
    schedule: 'Senin, 02 Nov 2026',
    time: '09:30 - 11:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    avatarFallback: 'FM',
    whatsappNumber: '6281234567893',
  },
  {
    id: 12,
    learnerName: 'Gita Rahayu',
    subject: 'Pemrograman Web',
    subjectType: 'code',
    schedule: 'Rabu, 04 Nov 2026',
    time: '07:00 - 09:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=28',
    avatarFallback: 'GR',
    whatsappNumber: '6289876543214',
  },
]

// ─── SessionCard ─────────────────────────────────────────────────────────────
function SessionCard({ session, isHighlighted, cardRef }) {
  const {
    learnerName,
    subject,
    subjectType,
    schedule,
    time,
    location,
    avatarUrl,
    avatarFallback,
    whatsappNumber,
  } = session

  const SubjectIcon = subjectType === 'code' ? Code : BookOpen

  const handleContact = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank')
  }

  return (
    <div ref={cardRef} className={`rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-500 ${isHighlighted ? "ring-2 ring-[#0d7c6b] bg-[#f0fbf8] -translate-y-1" : "bg-white"}`}>
      <div className="flex h-full">
        {/* Accent bar hijau/toska di kiri */}
        <div className="w-1.5 bg-[#0d7c6b] flex-shrink-0" />

        <div className="flex-1 p-6 flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar Learner di Kiri */}
          <Avatar className="h-24 w-24 rounded-2xl flex-shrink-0 border border-slate-100">
            <AvatarImage src={avatarUrl} alt={learnerName} className="object-cover" />
            <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-lg font-semibold">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          {/* Konten di Kanan */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            {/* Top Row: Name and Button */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full">
              <h3 className="text-xl font-bold text-[#0a0f44] leading-tight">{learnerName}</h3>
              <Button
                onClick={handleContact}
                className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold rounded-xl px-5 h-11 text-sm gap-2 transition-colors duration-150 w-full sm:w-auto flex items-center justify-center flex-shrink-0"
              >
                <MessageSquare className="h-4 w-4" strokeWidth={2} />
                Hubungi Learner
              </Button>
            </div>

            {/* Detail grid 2 kolom dengan background toska muda */}
            <div className="bg-[#f0fbf8] p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-start gap-3">
                <SubjectIcon className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Mata Kuliah
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{subject}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Jadwal
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{schedule}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Waktu
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Lokasi
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Halaman utama ────────────────────────────────────────────────────────────
export default function JadwalMengajar() {
  const [searchParams] = useSearchParams()
  const learnerParam = searchParams.get('learner')

  const [sessions] = useState(SESSIONS)
  const [currentPage, setCurrentPage] = useState(1)
  const [highlightedId, setHighlightedId] = useState(null)
  const highlightRef = useRef(null)
  const itemsPerPage = 5

  useEffect(() => {
    if (!learnerParam) return;
    const idx = sessions.findIndex(
      (s) => s.learnerName.toLowerCase() === learnerParam.toLowerCase()
    );
    if (idx === -1) return;

    const targetPage = Math.ceil((idx + 1) / itemsPerPage);
    setCurrentPage(targetPage);
    setHighlightedId(sessions[idx].id);

    const timer = setTimeout(() => setHighlightedId(null), 3000);
    return () => clearTimeout(timer);
  }, [learnerParam, sessions]);

  useEffect(() => {
    if (highlightedId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedId, currentPage]);

  const totalPages = Math.ceil(sessions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentSessions = sessions.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
          Jadwal Mengajar
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Yuk siapkan materi dan pastikan semuanya sudah siap.
        </p>
      </div>

      {/* Session List */}
      {currentSessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-300">
          <CalendarDays className="h-12 w-12" strokeWidth={1.2} />
          <p className="text-sm text-slate-400">Belum ada jadwal sesi mengajar.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {currentSessions.map((session) => (
            <SessionCard 
              key={session.id} 
              session={session} 
              isHighlighted={session.id === highlightedId}
              cardRef={session.id === highlightedId ? highlightRef : null}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="py-4 border-t border-slate-100 mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
              
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink 
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(i + 1);
                    }}
                    className={currentPage === i + 1 ? 'bg-teal-50 text-teal-600 border-teal-200' : ''}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          
          <div className="mt-4 text-center text-slate-600 font-medium text-sm">
            Menampilkan <span className="font-bold text-[#1E1B4B]">{currentSessions.length}</span> dari <span className="font-bold text-[#1E1B4B]">{sessions.length}</span> sesi mengajar
          </div>
        </div>
      )}
    </div>
  )
}
