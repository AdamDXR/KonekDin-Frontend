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
  // Ambil bagian tanggal saja (hapus waktu jika ada)
  const datePart = String(dateStr).split("T")[0];
  const parts = datePart.split("-");
  if (parts.length === 3) {
    const d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
  }
  return dateStr;
}

function getInitials(name) {
  if (!name) return "LR";
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

// Hitung durasi dari string "HH:MM - HH:MM"
function hitungDurasiDariString(timeStr) {
  if (!timeStr || timeStr === "-") return "50 Menit";
  const firstRange = timeStr.split(",")[0].trim().replace(/\s*WIB\s*/gi, "");
  const [start, end] = firstRange.split(" - ");
  if (!start || !end) return "50 Menit";
  const [sh, sm] = start.trim().split(":").map(Number);
  const [eh, em] = end.trim().split(":").map(Number);
  if ([sh, sm, eh, em].some(isNaN)) return "50 Menit";
  const menit = (eh * 60 + em) - (sh * 60 + sm);
  return menit > 0 ? `${menit} Menit` : "50 Menit";
}

function buildAvatar(avatarField, name) {
  if (avatarField && typeof avatarField === "string") {
    return avatarField.startsWith("http")
      ? avatarField
      : `http://127.0.0.1:8000/storage/${avatarField}`;
  }
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "Learner")}&background=0a0f44&color=fff`;
}

// ─── RiwayatCard ─────────────────────────────────────────────────────────────
function RiwayatCard({ item, navigate }) {
  const handleLihatUlasan = () => {
    // Navigasi ke halaman Ulasan & filter/highlight berdasarkan nama learner
    navigate(`/tutor/ulasan?learner=${encodeURIComponent(item.learnerName)}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow duration-200">
      {/* Avatar */}
      <Avatar className="h-24 w-24 rounded-2xl flex-shrink-0 border border-slate-100">
        <AvatarImage src={item.avatar} alt={item.learnerName} className="object-cover" />
        <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-lg font-semibold">
          {item.avatarFallback}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold text-[#0a0f44] leading-tight">{item.learnerName}</h3>
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
        <p className="text-base font-extrabold text-[#0d7c6b]">{item.pendapatan}</p>
      </div>

      <Button
        onClick={handleLihatUlasan}
        className="bg-[#0a0f44] hover:bg-[#192257] text-white font-semibold rounded-full px-5 flex-shrink-0"
      >
        Lihat Ulasan
      </Button>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────
export default function RiwayatMengajar() {
  const navigate = useNavigate();
  const [riwayat, setRiwayat] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchRiwayat = async () => {
      setIsLoading(true);
      try {
        // Fetch reviews (sumber data utama — sudah lengkap: nama, course, tanggal, jam)
        // dan history (untuk dapat total_price / pendapatan)
        const [reviewsRes, historyRes] = await Promise.all([
          axios.get('/tutor/reviews', { params: { per_page: 1000 } }),
          axios.get('/tutor/history').catch(() => ({ data: { data: [] } })),
        ]);

        const reviewsData = reviewsRes.data?.data || [];
        const historyData = historyRes.data?.data || [];

        // Buat map dari history: key = "learner_id_YYYY-MM-DD" → booking item
        // untuk cross-reference total_price
        const historyMap = {};
        historyData.forEach((item) => {
          const date = item.booking_date
            ? String(item.booking_date).split("T")[0]
            : null;
          if (item.learner_id && date) {
            historyMap[`${item.learner_id}_${date}`] = item;
          }
        });

        // ─── Bagian 1: Sesi yang sudah ada ulasannya (dari /tutor/reviews) ───
        const reviewedLearnerDateKeys = new Set();

        const fromReviews = reviewsData.map((r) => {
          const learnerName = r.learner?.name || "Learner";
          const sessionDate = r.session_date
            ? String(r.session_date).split("T")[0]
            : null;
          const learnerId = r.learner?.id;
          const histKey = `${learnerId}_${sessionDate}`;
          reviewedLearnerDateKeys.add(histKey);

          const historyItem = historyMap[histKey] || null;

          const timeStr = r.session_time && r.session_time !== "-"
            ? r.session_time
            : null;

          return {
            id: `review_${r.id}`,
            learnerName,
            avatar: buildAvatar(r.learner?.avatar, learnerName),
            avatarFallback: getInitials(learnerName),
            subject: r.course?.name || "-",
            date: formatTanggal(sessionDate),
            time: timeStr ? `${timeStr} WIB` : "-",
            durasi: hitungDurasiDariString(timeStr || "-"),
            pendapatan: historyItem?.total_price
              ? `Rp ${Number(historyItem.total_price).toLocaleString("id-ID")}`
              : "Rp 0",
            hasReview: true,
          };
        });

        // ─── Bagian 2: Sesi selesai tapi belum ada ulasan ───
        const fromHistoryOnly = historyData
          .filter((item) => {
            const date = item.booking_date
              ? String(item.booking_date).split("T")[0]
              : null;
            return !reviewedLearnerDateKeys.has(`${item.learner_id}_${date}`);
          })
          .map((item) => {
            const learnerName = item.learner?.name || "Menunggu data...";
            const date = item.booking_date
              ? String(item.booking_date).split("T")[0]
              : null;
            return {
              id: `history_${item.id}`,
              learnerName,
              avatar: buildAvatar(item.learner?.avatar, learnerName),
              avatarFallback: getInitials(learnerName),
              subject: "-",
              date: formatTanggal(date),
              time: "Menunggu ulasan...",
              durasi: "-",
              pendapatan: item.total_price
                ? `Rp ${Number(item.total_price).toLocaleString("id-ID")}`
                : "Rp 0",
              hasReview: false,
            };
          });

        // Gabungkan: yang sudah diulas dulu, lalu yang belum
        setRiwayat([...fromReviews, ...fromHistoryOnly]);
      } catch (error) {
        console.error("Gagal mengambil riwayat mengajar:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRiwayat();
  }, []);

  const totalPages = Math.ceil(riwayat.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRiwayat = riwayat.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Riwayat Mengajar</h1>
        <p className="text-slate-500">
          Lihat kembali perjalanan mengajar Anda dan mulai sesi mengajar lagi.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400 animate-pulse">
          <CalendarDays className="h-12 w-12" strokeWidth={1.2} />
          <p className="text-sm font-medium">Memuat riwayat mengajar...</p>
        </div>
      )}

      {/* Empty */}
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
            <RiwayatCard key={item.id} item={item} navigate={navigate} />
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
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}
                    className={currentPage === i + 1 ? "bg-teal-50 text-teal-600 border-teal-200" : ""}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="mt-4 text-center text-slate-600 font-medium text-sm">
            Menampilkan <span className="font-bold text-[#1E1B4B]">{currentRiwayat.length}</span> dari{" "}
            <span className="font-bold text-[#1E1B4B]">{riwayat.length}</span> riwayat mengajar
          </div>
        </div>
      )}
    </div>
  );
}
