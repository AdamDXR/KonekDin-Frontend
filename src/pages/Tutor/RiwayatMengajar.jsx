import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ULASAN } from "./Ulasan";

// ─── Data mock riwayat mengajar ──────────────────────────────────────────────
const RIWAYAT = [
  // Page 1
  {
    id: 1,
    learnerName: "Siti Aminah",
    avatar: "https://i.pravatar.cc/150?img=34",
    avatarFallback: "SA",
    subject: "Basis Data",
    date: "9 Okt 2026",
    time: "14:10 - 15:00",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 2,
    learnerName: "Ahmad Raja",
    avatar: "https://i.pravatar.cc/150?img=68",
    avatarFallback: "AR",
    subject: "Algoritma & Struktur Data",
    date: "5 Okt 2026",
    time: "14:10 - 15:00",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 3,
    learnerName: "Rani Ranti",
    avatar: "https://i.pravatar.cc/150?img=5",
    avatarFallback: "RR",
    subject: "Algoritma & Struktur Data",
    date: "2 Okt 2026",
    time: "09:30 - 10:20",
    durasi: "100 Menit",
    pendapatan: "Rp 90.000",
  },
  {
    id: 4,
    learnerName: "Andi Wijaya",
    avatar: "https://i.pravatar.cc/150?img=53",
    avatarFallback: "AW",
    subject: "Pemrograman Web",
    date: "1 Okt 2026",
    time: "14:10 - 15:00",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 5,
    learnerName: "Alfiana Anan",
    avatar: "https://i.pravatar.cc/150?img=26",
    avatarFallback: "AA",
    subject: "Pemrograman Web",
    date: "1 Okt 2026",
    time: "09:30 - 10:20",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },

  // Page 2
  {
    id: 6,
    learnerName: "Budi Santoso",
    avatar: "https://i.pravatar.cc/150?img=15",
    avatarFallback: "BS",
    subject: "Algoritma & Struktur Data",
    date: "30 Sep 2026",
    time: "14:10 - 15:00",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 7,
    learnerName: "Citra Lestari",
    avatar: "https://i.pravatar.cc/150?img=49",
    avatarFallback: "CL",
    subject: "Basis Data",
    date: "29 Sep 2026",
    time: "09:30 - 10:20",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 8,
    learnerName: "Dedi Kurniawan",
    avatar: "https://i.pravatar.cc/150?img=51",
    avatarFallback: "DK",
    subject: "Pemrograman Web",
    date: "28 Sep 2026",
    time: "14:10 - 15:50",
    durasi: "100 Menit",
    pendapatan: "Rp 90.000",
  },
  {
    id: 9,
    learnerName: "Eka Putri",
    avatar: "https://i.pravatar.cc/150?img=33",
    avatarFallback: "EP",
    subject: "Algoritma & Struktur Data",
    date: "27 Sep 2026",
    time: "09:30 - 10:20",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 10,
    learnerName: "Farhan Maulana",
    avatar: "https://i.pravatar.cc/150?img=15",
    avatarFallback: "FM",
    subject: "Basis Data",
    date: "26 Sep 2026",
    time: "14:10 - 15:00",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },

  // Page 3
  {
    id: 11,
    learnerName: "Gita Rahayu",
    avatar: "https://i.pravatar.cc/150?img=28",
    avatarFallback: "GR",
    subject: "Pemrograman Web",
    date: "25 Sep 2026",
    time: "09:30 - 10:20",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 12,
    learnerName: "Rina Sari",
    avatar: "https://i.pravatar.cc/150?img=45",
    avatarFallback: "RS",
    subject: "Pemrograman Web",
    date: "24 Sep 2026",
    time: "14:10 - 15:00",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
];

// ─── RiwayatCard ─────────────────────────────────────────────────────────────
function RiwayatCard({ item, navigate, onShowNoReview }) {
  const handleLihatUlasan = () => {
    const hasReview = ULASAN.some(
      (u) => u.learnerName.toLowerCase() === item.learnerName.toLowerCase()
    );
    if (hasReview) {
      navigate(`/tutor/ulasan?learner=${encodeURIComponent(item.learnerName)}`);
    } else {
      onShowNoReview(item.learnerName);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow duration-200">
      {/* Avatar */}
      <Avatar className="h-24 w-24 rounded-2xl flex-shrink-0 border border-slate-100">
        <AvatarImage
          src={item.avatar}
          alt={item.learnerName}
          className="object-cover"
        />
        <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-lg font-semibold">
          {item.avatarFallback}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-[#0a0f44] leading-tight">
          {item.learnerName}
        </h3>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">
          {item.subject}
        </p>
        <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-[#0d7c6b]" />
            {item.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-[#0d7c6b]" />
            {item.time}
          </span>
        </div>
      </div>

      {/* Durasi */}
      <div className="text-center flex-shrink-0 hidden sm:block">
        <p className="text-xs text-slate-400 font-medium mb-1">Durasi</p>
        <p className="text-base font-extrabold text-[#312e81]">{item.durasi}</p>
      </div>

      {/* Pendapatan */}
      <div className="text-center flex-shrink-0 hidden sm:block">
        <p className="text-xs text-slate-400 font-medium mb-1">Pendapatan</p>
        <p className="text-base font-extrabold text-[#0d7c6b]">
          {item.pendapatan}
        </p>
      </div>

      {/* Tombol */}
      <div className="flex-shrink-0">
        <Button
          onClick={handleLihatUlasan}
          className="border border-[#0d7c6b] text-[#0d7c6b] bg-white hover:bg-[#0d7c6b]/5 font-bold px-5 py-2.5 h-auto rounded-xl text-sm transition-colors duration-150"
        >
          Lihat Ulasan
        </Button>
      </div>
    </div>
  );
}

// ─── Modal Belum Ada Ulasan ──────────────────────────────────────────────────
function NoReviewModal({ learnerName, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative max-w-sm w-full text-center">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="mx-auto w-12 h-12 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
        </div>
        <h2 className="text-xl font-extrabold text-[#0a0f44] mb-2">
          Belum Ada Ulasan
        </h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Pengguna <span className="font-bold text-[#0a0f44]">{learnerName}</span> belum memberikan ulasan untuk sesi bimbingan ini.
        </p>
        <Button
          onClick={onClose}
          className="w-full bg-[#0a0f44] hover:bg-[#192257] text-white font-bold py-3 h-auto rounded-xl transition-colors"
        >
          Tutup
        </Button>
      </div>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────
export default function RiwayatMengajar() {
  const navigate = useNavigate()
  const [riwayat] = useState(RIWAYAT)
  const [currentPage, setCurrentPage] = useState(1)
  const [noReviewLearner, setNoReviewLearner] = useState(null)
  const itemsPerPage = 5

  const totalPages = Math.ceil(riwayat.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRiwayat = riwayat.slice(startIndex, startIndex + itemsPerPage)

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
          Riwayat Mengajar
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Lihat kembali perjalanan mengajar Anda dan mulai sesi mengajar lagi.
        </p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {currentRiwayat.map((item) => (
          <RiwayatCard 
            key={item.id} 
            item={item} 
            navigate={navigate} 
            onShowNoReview={setNoReviewLearner} 
          />
        ))}
      </div>

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
            Menampilkan <span className="font-bold text-[#1E1B4B]">{currentRiwayat.length}</span> dari <span className="font-bold text-[#1E1B4B]">{riwayat.length}</span> riwayat mengajar
          </div>
        </div>
      )}

      {/* Modal Belum Ada Ulasan */}
      {noReviewLearner && (
        <NoReviewModal 
          learnerName={noReviewLearner} 
          onClose={() => setNoReviewLearner(null)} 
        />
      )}
    </div>
  );
}
