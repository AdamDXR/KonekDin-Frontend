import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  BookOpen,
  Code,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  CalendarDays,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "@/lib/axios";

// ─── Helper ────────────────────────────────────────────────────────────────────
const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

function formatDate(dateStr) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${HARI[d.getDay()]}, ${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

function getInitials(name) {
  if (!name) return "LR";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

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
  } = session;

  const SubjectIcon = subjectType === "code" ? Code : BookOpen;

  const handleContact = () => {
    if (!whatsappNumber) {
      alert("Nomor WhatsApp learner tidak tersedia.");
      return;
    }
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  return (
    <div
      ref={cardRef}
      className={`rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-500 ${
        isHighlighted
          ? "ring-2 ring-[#0d7c6b] bg-[#f0fbf8] -translate-y-1"
          : "bg-white"
      }`}
    >
      <div className="flex h-full">
        {/* Accent bar hijau/toska di kiri */}
        <div className="w-1.5 bg-[#0d7c6b] flex-shrink-0" />

        <div className="flex-1 p-6 flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar Learner di Kiri */}
          <Avatar className="h-24 w-24 rounded-2xl flex-shrink-0 border border-slate-100">
            <AvatarImage
              src={avatarUrl}
              alt={learnerName}
              className="object-cover"
            />
            <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-lg font-semibold">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          {/* Konten di Kanan */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            {/* Top Row: Name and Button */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 w-full">
              <h3 className="text-xl font-bold text-[#0a0f44] leading-tight">
                {learnerName}
              </h3>
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
                <SubjectIcon
                  className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Mata Kuliah
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{subject}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar
                  className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Jadwal
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{schedule}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock
                  className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0"
                  strokeWidth={1.8}
                />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Waktu
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0"
                  strokeWidth={1.8}
                />
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
  );
}

// ─── Halaman utama ────────────────────────────────────────────────────────────
export default function JadwalMengajar() {
  const [searchParams] = useSearchParams();
  const learnerParam = searchParams.get("learner");

  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [highlightedId, setHighlightedId] = useState(null);
  const highlightRef = useRef(null);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get("/tutor/schedules");
        console.log("Response Jadwal Mengajar:", response.data);

        if (response.data && response.data.data) {
          const formatted = response.data.data.map((item) => {
            // Gabungkan waktu dari semua slot
            const slots = item.booking_slots || [];
            const timeStr =
              slots.length > 0
                ? slots
                    .map(
                      (s) =>
                        `${s.start_time?.substring(0, 5) || ""} - ${s.end_time?.substring(0, 5) || ""}`,
                    )
                    .join(", ")
                : "-";

            return {
              id: item.id,
              learnerName: item.learner?.name || "Learner",
              subject: item.course?.name || "Mata Kuliah",
              subjectType: "book",
              schedule: formatDate(item.booking_date),
              time: timeStr ? `${timeStr} WIB` : "-",
              location: "Menyesuaikan",
              avatarUrl: item.learner?.avatar
                ? `http://127.0.0.1:8000/storage/${item.learner.avatar}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.learner?.name || "Learner")}&background=random`,
              avatarFallback: getInitials(item.learner?.name),
              whatsappNumber: item.learner?.phone
                ? String(item.learner.phone).replace(/[^0-9]/g, "")
                : "",
            };
          });
          setSessions(formatted);
        }
      } catch (error) {
        console.error("Gagal memuat jadwal mengajar:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        setErrorMsg(
          error.response?.data?.message ||
            error.message ||
            "Gagal memuat jadwal mengajar",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  // Highlight session when ?learner=... param is present
  useEffect(() => {
    if (!learnerParam || sessions.length === 0) return;
    const idx = sessions.findIndex(
      (s) => s.learnerName.toLowerCase() === learnerParam.toLowerCase(),
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
      highlightRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [highlightedId, currentPage]);

  const totalPages = Math.ceil(sessions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSessions = sessions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">
          Jadwal Mengajar
        </h1>
        <p className="text-slate-500">
          Yuk siapkan materi dan pastikan semuanya sudah siap.
        </p>
      </div>

      {/* Error State */}
      {errorMsg && !isLoading && (
        <div className="flex flex-col justify-center items-center h-64 text-red-500 bg-red-50 rounded-2xl border border-red-100 p-6 text-center mb-4">
          <p className="font-bold text-lg mb-2">Gagal Memuat Data</p>
          <p className="text-sm">{errorMsg}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && !errorMsg && (
        <div className="flex justify-center items-center h-64 text-slate-500 animate-pulse">
          Memuat jadwal mengajar...
        </div>
      )}

      {/* Session List */}
      {!isLoading && !errorMsg && currentSessions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-300">
          <CalendarDays className="h-12 w-12" strokeWidth={1.2} />
          <p className="text-sm text-slate-400">
            Belum ada jadwal sesi mengajar.
          </p>
        </div>
      )}

      {!isLoading && !errorMsg && currentSessions.length > 0 && (
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
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
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
                    className={
                      currentPage === i + 1
                        ? "bg-teal-50 text-teal-600 border-teal-200"
                        : ""
                    }
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
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="mt-4 text-center text-slate-600 font-medium text-sm">
            Menampilkan{" "}
            <span className="font-bold text-[#1E1B4B]">
              {currentSessions.length}
            </span>{" "}
            dari{" "}
            <span className="font-bold text-[#1E1B4B]">{sessions.length}</span>{" "}
            sesi mengajar
          </div>
        </div>
      )}
    </div>
  );
}
