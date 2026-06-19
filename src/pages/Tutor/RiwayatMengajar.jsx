import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, CalendarDays } from "lucide-react";
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
import axios from "@/lib/axios";

// ─── Helper ──────────────────────────────────────────────────────────────────
const BULAN = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

function formatTanggal(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

function getInitials(name) {
  if (!name) return "LR";
  return name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase();
}

function hitungDurasi(slots) {
  if (!slots || slots.length === 0) return "50 Menit";
  let totalMenit = 0;
  slots.forEach((s) => {
    const start = s.start_time?.substring(0, 5)?.split(":") || [];
    const end = s.end_time?.substring(0, 5)?.split(":") || [];
    if (start.length === 2 && end.length === 2) {
      const startMin = parseInt(start[0]) * 60 + parseInt(start[1]);
      const endMin = parseInt(end[0]) * 60 + parseInt(end[1]);
      totalMenit += endMin - startMin;
    }
  });
  return totalMenit > 0 ? `${totalMenit} Menit` : "50 Menit";
}

function formatWaktu(slots) {
  if (!slots || slots.length === 0) return "-";
  return slots
    .map((s) => `${s.start_time?.substring(0, 5) || ""} - ${s.end_time?.substring(0, 5) || ""}`)
    .join(", ");
}

// ─── RiwayatCard ─────────────────────────────────────────────────────────────
function RiwayatCard({ item, navigate }) {
  const handleLihatUlasan = () => {
    navigate(`/tutor/ulasan?learner=${encodeURIComponent(item.learnerName)}`);
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

      <Button
        onClick={handleLihatUlasan}
        className="bg-[#0a0f44] hover:bg-[#192257] text-white font-semibold rounded-full px-5"
      >
        Lihat Ulasan
      </Button>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────
export default function RiwayatMengajar() {
  const navigate = useNavigate()
  const [riwayat, setRiwayat] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchRiwayat = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/tutor/history');
        const data = response.data?.data || [];

        const formatted = data.map((item) => {
          const slots = item.booking_slots || [];
          return {
            id: item.id,
            learnerName: item.learner?.name || item.learner || "Learner",
            avatar: item.learner?.avatar
              ? `http://127.0.0.1:8000/storage/${item.learner.avatar}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.learner?.name || item.learner || "Learner")}&background=0a0f44&color=fff`,
            avatarFallback: getInitials(item.learner?.name || item.learner),
            subject: item.course?.name || item.subject || "Mata Kuliah",
            date: formatTanggal(item.booking_date || item.date),
            time: formatWaktu(slots) || item.time || "-",
            durasi: hitungDurasi(slots),
            pendapatan: item.total_price
              ? `Rp ${Number(item.total_price).toLocaleString('id-ID')}`
              : "Rp 0",
          };
        });

        setRiwayat(formatted);
      } catch (error) {
        console.error("Gagal mengambil riwayat mengajar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  const totalPages = Math.ceil(riwayat.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentRiwayat = riwayat.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">
          Riwayat Mengajar
        </h1>
        <p className="text-slate-500">
          Lihat kembali perjalanan mengajar Anda dan mulai sesi mengajar lagi.
        </p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400 animate-pulse">
          <CalendarDays className="h-12 w-12" strokeWidth={1.2} />
          <p className="text-sm font-medium">Memuat riwayat mengajar...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && riwayat.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-300">
          <CalendarDays className="h-12 w-12" strokeWidth={1.2} />
          <p className="text-sm text-slate-400">Belum ada riwayat mengajar.</p>
        </div>
      )}

      {/* List */}
      {!isLoading && currentRiwayat.length > 0 && (
        <div className="space-y-4">
          {currentRiwayat.map((item) => (
            <RiwayatCard 
              key={item.id} 
              item={item} 
              navigate={navigate} 
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
            Menampilkan <span className="font-bold text-[#1E1B4B]">{currentRiwayat.length}</span> dari <span className="font-bold text-[#1E1B4B]">{riwayat.length}</span> riwayat mengajar
          </div>
        </div>
      )}

    </div>
  );
}
