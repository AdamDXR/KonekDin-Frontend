import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Clock, Star, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// ─── Data ─────────────────────────────────────────────────────────────────────

export const ULASAN = [
  // Page 1
  {
    id: 1,
    subject: "Basis Data",
    learnerName: "Siti Aminah",
    avatar: "https://i.pravatar.cc/150?img=34",
    avatarFallback: "SA",
    date: "26 Maret 2026",
    time: "09:30 - 11:10",
    rating: 5,
    review:
      '"Penjelasan Kak Irkham di mata kuliah Basis Data sangat membantu. Cara menjelaskan query SQL dan relasi antar tabel jadi lebih mudah dipahami, apalagi saat praktik langsung. Jadi lebih ngerti cara mengolah data dengan benar."',
  },
  {
    id: 2,
    subject: "Algoritma & Struktur Data",
    learnerName: "Ahmad Raja",
    avatar: "https://i.pravatar.cc/150?img=68",
    avatarFallback: "AR",
    date: "25 Maret 2026",
    time: "07:00 - 08:40",
    rating: 5,
    review:
      '"Irkham menjelaskan konsep algoritma dengan sangat jelas, terutama saat membahas flow logika dan cara menyelesaikan masalah. Jadi lebih paham langkah-langkahnya, bukan cuma hasil akhirnya."',
  },
  {
    id: 3,
    subject: "Pemrograman Web",
    learnerName: "Andi Wijaya",
    avatar: "https://i.pravatar.cc/150?img=53",
    avatarFallback: "AW",
    date: "18 Maret 2026",
    time: "15:30 - 17:10",
    rating: 4,
    review:
      '"Cara mengajarnya enak diikuti, khususnya saat membahas struktur data seperti stack dan queue. Dijelaskan dari dasar sampai contoh kasus, jadi lebih mudah memahami penerapannya."',
  },
  // Page 2
  {
    id: 4,
    subject: "Algoritma & Struktur Data",
    learnerName: "Rani Ranti",
    avatar: "https://i.pravatar.cc/150?img=5",
    avatarFallback: "RR",
    date: "15 Maret 2026",
    time: "07:00 - 08:40",
    rating: 5,
    review:
      '"Materi dijelaskan secara sistematis dari awal hingga akhir. Sangat membantu untuk memahami dasar-dasar algoritma dengan benar."',
  },
  {
    id: 5,
    subject: "Pemrograman Web",
    learnerName: "Alfiana Anan",
    avatar: "https://i.pravatar.cc/150?img=26",
    avatarFallback: "AA",
    date: "12 Maret 2026",
    time: "09:30 - 10:20",
    rating: 5,
    review:
      '"Penjelasannya sangat detail dan mudah dimengerti. Sesi latihan langsung pada proyek membuat konsep lebih cepat dipahami."',
  },
  {
    id: 6,
    subject: "Algoritma & Struktur Data",
    learnerName: "Budi Santoso",
    avatar: "https://i.pravatar.cc/150?img=15",
    avatarFallback: "BS",
    date: "10 Maret 2026",
    time: "14:10 - 15:00",
    rating: 4,
    review:
      '"Sesi algoritma bersama Kak Irkham sangat produktif. Cara penyampaiannya sabar dan tidak terburu-buru, cocok buat yang baru belajar."',
  },
  // Page 3
  {
    id: 7,
    subject: "Basis Data",
    learnerName: "Citra Lestari",
    avatar: "https://i.pravatar.cc/150?img=49",
    avatarFallback: "CL",
    date: "8 Maret 2026",
    time: "07:00 - 08:40",
    rating: 5,
    review:
      '"Kak Irkham sangat membantu dalam memahami konsep relasi tabel. Contoh-contoh yang diberikan relevan dan langsung bisa diterapkan."',
  },
  {
    id: 8,
    subject: "Algoritma & Struktur Data",
    learnerName: "Eka Putri",
    avatar: "https://i.pravatar.cc/150?img=33",
    avatarFallback: "EP",
    date: "5 Maret 2026",
    time: "12:30 - 13:20",
    rating: 3,
    review:
      '"Penjelasan cukup baik, tapi agak terburu-buru di beberapa bagian. Secara keseluruhan masih sangat membantu untuk persiapan UAS."',
  },
  {
    id: 9,
    subject: "Basis Data",
    learnerName: "Farhan Maulana",
    avatar: "https://i.pravatar.cc/150?img=15",
    avatarFallback: "FM",
    date: "2 Maret 2026",
    time: "09:30 - 10:20",
    rating: 5,
    review:
      '"Sangat puas dengan sesi belajar ini. Materi disampaikan dengan urut dan logis, membuat saya benar-benar paham alur kerja query database."',
  },
];

const ITEMS_PER_PAGE = 3;

const RATING_DIST = [
  { bintang: 5, count: 108 },
  { bintang: 4, count: 15 },
  { bintang: 3, count: 3 },
  { bintang: 2, count: 2 },
  { bintang: 1, count: 0 },
];

const TOTAL_ULASAN = 128;
const MAX_COUNT = 108;

// ─── Komponen Bintang ─────────────────────────────────────────────────────────

function StarRow({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
        />
      ))}
    </div>
  );
}

// ─── Kartu Ulasan ─────────────────────────────────────────────────────────────

function UlasanCard({ item, isHighlighted, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`py-7 border-b border-slate-100 last:border-0 rounded-xl transition-all duration-500 ${
        isHighlighted ? "ring-2 ring-[#0d7c6b] bg-[#f0fbf8] px-4 -mx-4" : ""
      }`}
    >
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <Avatar className="h-20 w-20 rounded-2xl flex-shrink-0 border border-slate-100">
          <AvatarImage
            src={item.avatar}
            alt={item.learnerName}
            className="object-cover"
          />
          <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-base font-semibold">
            {item.avatarFallback}
          </AvatarFallback>
        </Avatar>

        {/* Konten */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-[#0a0f44]">
                {item.learnerName}
              </h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                {item.subject}
              </p>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {item.time}
                </span>
              </div>
            </div>
            <StarRow rating={item.rating} />
          </div>
          <p className="text-sm text-slate-500 mt-3 italic leading-relaxed">
            {item.review}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────

const FILTER_TABS = [
  "Semua",
  "5 Bintang",
  "4 Bintang",
  "3 Bintang",
  "2 Bintang",
  "1 Bintang",
];

export default function Ulasan() {
  const [searchParams] = useSearchParams();
  const learnerParam = searchParams.get("learner");

  const [activeTab, setActiveTab] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [highlightedId, setHighlightedId] = useState(null);
  const highlightRef = useRef(null);

  // When arriving with ?learner=X, jump to the correct page and highlight
  useEffect(() => {
    if (!learnerParam) return;
    const idx = ULASAN.findIndex(
      (u) => u.learnerName.toLowerCase() === learnerParam.toLowerCase()
    );
    if (idx === -1) return;

    const targetPage = Math.ceil((idx + 1) / ITEMS_PER_PAGE);
    setActiveTab("Semua");
    setCurrentPage(targetPage);
    setHighlightedId(ULASAN[idx].id);

    // Clear highlight after 3 seconds
    const timer = setTimeout(() => setHighlightedId(null), 3000);
    return () => clearTimeout(timer);
  }, [learnerParam]);

  // Scroll to highlighted card once rendered
  useEffect(() => {
    if (highlightedId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedId, currentPage]);

  const filtered =
    activeTab === "Semua"
      ? ULASAN
      : ULASAN.filter((u) => u.rating === parseInt(activeTab));

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginatedUlasan = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full">
      {/* Judul */}
      <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight mb-6">
        Ulasan & Rating
      </h1>

      {/* ── Rating Summary Card ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Kiri: Angka rating */}
          <div className="flex-shrink-0">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Rata-rata Rating
            </p>
            <div className="flex items-end gap-2">
              <span className="text-6xl font-black text-[#0a0f44] leading-none">
                4.9
              </span>
              <span className="text-xl font-bold text-slate-400 mb-1">
                / 5.0
              </span>
            </div>
            <div className="mt-2">
              <StarRow rating={4} />
            </div>
            <div className="flex items-center gap-8 mt-4">
              <div>
                <p className="text-xl font-extrabold text-[#0a0f44]">
                  {TOTAL_ULASAN}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Total Ulasan</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-[#0d7c6b]">98%</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kepuasan Mahasiswa
                </p>
              </div>
              <div className="p-2 bg-[#e6fcf5] rounded-xl">
                <TrendingUp className="h-5 w-5 text-[#0d7c6b]" />
              </div>
            </div>
          </div>

          {/* Kanan: Bar distribusi */}
          <div className="flex-1 flex flex-col gap-2.5 w-full">
            {RATING_DIST.map(({ bintang, count }) => (
              <div key={bintang} className="flex items-center gap-3">
                {/* Bintang kecil */}
                <div className="flex items-center gap-0.5 w-24 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${i < bintang ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                    />
                  ))}
                </div>
                {/* Bar */}
                <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full bg-[#0d7c6b] rounded-full"
                    style={{ width: `${(count / MAX_COUNT) * 100}%` }}
                  />
                </div>
                {/* Angka */}
                <span className="text-sm font-bold text-slate-500 w-6 text-right flex-shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filter Tab ── */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-150 ${
              activeTab === tab
                ? "bg-[#0d7c6b] text-white"
                : "bg-white border border-slate-200 text-slate-500 hover:border-[#0d7c6b] hover:text-[#0d7c6b]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 mb-1">
        Menampilkan {filtered.length} ulasan
      </p>

      {/* ── List Ulasan ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6">
        {paginatedUlasan.length > 0 ? (
          paginatedUlasan.map((item) => (
            <UlasanCard
              key={item.id}
              item={item}
              isHighlighted={item.id === highlightedId}
              cardRef={item.id === highlightedId ? highlightRef : null}
            />
          ))
        ) : (
          <p className="text-sm text-slate-400 text-center py-12">
            Belum ada ulasan untuk filter ini.
          </p>
        )}
      </div>

      {/* ── Pagination ── */}
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
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
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
                    className={currentPage === i + 1 ? "bg-teal-50 text-teal-600 border-teal-200" : ""}
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
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

          <div className="mt-4 text-center text-slate-600 font-medium text-sm">
            Menampilkan <span className="font-bold text-[#1E1B4B]">{paginatedUlasan.length}</span> dari <span className="font-bold text-[#1E1B4B]">{filtered.length}</span> ulasan
          </div>
        </div>
      )}
    </div>
  );
}
