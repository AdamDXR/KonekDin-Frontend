import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "@/lib/axios";
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

const FILTER_TABS = [
  { label: "Semua", rating: null },
  { label: "5 Bintang", rating: 5 },
  { label: "4 Bintang", rating: 4 },
  { label: "3 Bintang", rating: 3 },
  { label: "2 Bintang", rating: 2 },
  { label: "1 Bintang", rating: 1 },
];

const ITEMS_PER_PAGE = 3;

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

function formatName(value) {
  if (!value) return "Anonim";
  if (typeof value === "string") return value;
  return value.name || value.full_name || value.learner_name || "Anonim";
}

function formatAvatar(value) {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value.avatar || value.photo || value.image || "";
}

function initialsFromName(name) {
  return (name || "Anonim")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function normalizeDateTime(item) {
  const dateValue =
    item.created_at ||
    item.reviewed_at ||
    item.date ||
    item.schedule_date ||
    item.session_date ||
    item.booked_at ||
    "";
  const timeValue = item.time || item.session_time || item.start_time || item.end_time || "";

  if (!dateValue) {
    return {
      date: "Tanggal tidak tersedia",
      time: timeValue || "Waktu tidak tersedia",
    };
  }

  const parsed = new Date(dateValue);
  const date = Number.isNaN(parsed.getTime())
    ? String(dateValue)
    : new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(parsed);

  return {
    date,
    time: timeValue || "Waktu tidak tersedia",
  };
}

function ReviewCard({ item, isHighlighted, cardRef }) {
  return (
    <div
      ref={cardRef}
      className={`py-7 border-b border-slate-100 last:border-0 rounded-xl transition-all duration-500 ${
        isHighlighted ? "ring-2 ring-[#0d7c6b] bg-[#f0fbf8] px-4 -mx-4" : ""
      }`}
    >
      <div className="flex items-start gap-5">
        <Avatar className="h-20 w-20 rounded-2xl flex-shrink-0 border border-slate-100">
          <AvatarImage src={item.avatar} alt={item.learnerName} className="object-cover" />
          <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-base font-semibold">
            {item.avatarFallback}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-[#0a0f44]">{item.learnerName}</h3>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                {item.subject}
              </p>
              <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400 font-medium flex-wrap">
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

export default function Ulasan() {
  const [searchParams] = useSearchParams();
  const learnerParam = searchParams.get("learner");

  const [activeTab, setActiveTab] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
    satisfactionPercent: 0,
    ratingDistribution: [
      { bintang: 5, count: 0 },
      { bintang: 4, count: 0 },
      { bintang: 3, count: 0 },
      { bintang: 2, count: 0 },
      { bintang: 1, count: 0 },
    ],
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const highlightRef = useRef(null);

  const activeRating = useMemo(() => {
    const tab = FILTER_TABS.find((item) => item.label === activeTab);
    return tab?.rating ?? null;
  }, [activeTab]);

  const totalPages = Math.max(
    1,
    pagination.lastPage || Math.ceil(summary.totalReviews / ITEMS_PER_PAGE) || 1
  );

  const highlightedId = useMemo(() => {
    if (!learnerParam || reviews.length === 0) return null;

    const match = reviews.find(
      (review) => review.learnerName.toLowerCase() === learnerParam.toLowerCase()
    );

    return match?.id ?? null;
  }, [learnerParam, reviews]);

  useEffect(() => {
    if (highlightedId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightedId, currentPage]);

  useEffect(() => {
    let ignore = false;

    const fetchReviews = async () => {
      setIsLoading(true);
      setError("");

      try {
        const safePage = Math.min(currentPage, totalPages);
        const params = {
          page: safePage,
          per_page: ITEMS_PER_PAGE,
        };

        if (activeRating) {
          params.rating = activeRating;
        }

        const [listResponse, summaryResponse] = await Promise.all([
          axios.get("/tutor/reviews", { params }),
          axios.get("/tutor/reviews", { params: { per_page: 1000 } }).catch(() => null),
        ]);

        if (ignore) return;

        const listData = listResponse.data?.data ?? [];
        const listMeta = listResponse.data?.meta ?? listResponse.data?.pagination ?? {};
        const summaryData = summaryResponse?.data ?? listResponse.data ?? {};

        const formattedReviews = listData.map((item) => {
          const learner = item.learner || item.user || item.student || {};
          const learnerName = formatName(learner);
          const avatar = formatAvatar(learner) || `https://i.pravatar.cc/150?u=${encodeURIComponent(learnerName)}`;
          const dateTime = normalizeDateTime(item);

          return {
            id: item.id,
            learnerName,
            avatar,
            avatarFallback: initialsFromName(learnerName),
            subject:
              item.course_name ||
              item.course?.name ||
              item.course?.title ||
              item.subject ||
              item.matkul ||
              "Mata Kuliah",
            date: dateTime.date,
            time: dateTime.time,
            rating: Number(item.rating) || 0,
            review: item.comment || item.review || item.text || "Tidak ada komentar.",
          };
        });

        const totalReviews =
          Number(
            summaryData?.meta?.total ??
              summaryData?.pagination?.total ??
              summaryData?.total ??
              summaryData?.data?.total ??
              listMeta.total
          ) || formattedReviews.length;

        const averageRating =
          Number(
            summaryData?.summary?.average_rating ??
              summaryData?.summary?.rating_average ??
              summaryData?.average_rating ??
              summaryData?.rating ??
              summaryData?.data?.average_rating
          ) || 0;

        const satisfactionPercent =
          Number(
            summaryData?.summary?.satisfaction_percent ??
              summaryData?.summary?.satisfaction ??
              summaryData?.satisfaction_percent ??
              summaryData?.data?.satisfaction_percent
          ) || 0;

        const fallbackDistribution = [
          { bintang: 5, count: 0 },
          { bintang: 4, count: 0 },
          { bintang: 3, count: 0 },
          { bintang: 2, count: 0 },
          { bintang: 1, count: 0 },
        ];

        const distributionSource =
          summaryData?.summary?.rating_distribution ||
          summaryData?.rating_distribution ||
          summaryData?.distribution ||
          summaryData?.data?.rating_distribution ||
          null;

        const ratingDistribution = fallbackDistribution.map((entry) => {
          const found = Array.isArray(distributionSource)
            ? distributionSource.find((item) => Number(item.bintang ?? item.rating ?? item.star) === entry.bintang)
            : null;
          return {
            bintang: entry.bintang,
            count: Number(found?.count ?? found?.total ?? found?.value) || 0,
          };
        });

        setReviews(formattedReviews);
        setSummary({
          averageRating,
          totalReviews,
          satisfactionPercent,
          ratingDistribution,
        });
        setPagination({
          currentPage: Number(listMeta.current_page ?? listMeta.page ?? safePage) || safePage,
          lastPage: Number(listMeta.last_page ?? listMeta.total_pages ?? 1) || 1,
          total: totalReviews,
        });
      } catch (err) {
        if (!ignore) {
          setError(err.response?.data?.message || "Gagal mengambil data ulasan.");
          setReviews([]);
          setSummary((prev) => ({ ...prev, totalReviews: 0 }));
          setPagination({ currentPage: 1, lastPage: 1, total: 0 });
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchReviews();

    return () => {
      ignore = true;
    };
  }, [activeRating, currentPage, totalPages]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayedCount = reviews.length;

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Ulasan & Rating</h1>
        <p className="text-slate-500">
          Lihat ulasan dan rating dari mahasiswa yang pernah Anda ajar.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              Rata-rata Rating
            </p>
            <div className="flex items-end gap-2">
              <span className="text-6xl font-black text-[#0a0f44] leading-none">
                {summary.averageRating.toFixed(1)}
              </span>
              <span className="text-xl font-bold text-slate-400 mb-1">/ 5.0</span>
            </div>
            <div className="mt-2">
              <StarRow rating={Math.round(summary.averageRating)} />
            </div>
            <div className="flex items-center gap-8 mt-4">
              <div>
                <p className="text-xl font-extrabold text-[#0a0f44]">
                  {summary.totalReviews}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Total Ulasan</p>
              </div>
              <div>
                <p className="text-xl font-extrabold text-[#0d7c6b]">
                  {summary.satisfactionPercent}%
                </p>
                <p className="text-xs text-slate-400 mt-0.5">Kepuasan Mahasiswa</p>
              </div>
              <div className="p-2 bg-[#e6fcf5] rounded-xl">
                <TrendingUp className="h-5 w-5 text-[#0d7c6b]" />
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2.5 w-full">
            {summary.ratingDistribution.map(({ bintang, count }) => {
              const maxCount = Math.max(...summary.ratingDistribution.map((item) => item.count), 1);
              return (
                <div key={bintang} className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5 w-24 flex-shrink-0">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < bintang ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full bg-[#0d7c6b] rounded-full transition-all duration-300"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-500 w-6 text-right flex-shrink-0">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap mb-3">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.label}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-150 ${
              activeTab === tab.label
                ? "bg-[#0d7c6b] text-white"
                : "bg-white border border-slate-200 text-slate-500 hover:border-[#0d7c6b] hover:text-[#0d7c6b]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-400 mb-1">
        Menampilkan <span className="font-bold text-[#1E1B4B]">{displayedCount}</span> dari{" "}
        <span className="font-bold text-[#1E1B4B]">{pagination.total || summary.totalReviews}</span> ulasan
      </p>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400">Memuat ulasan...</div>
        ) : error ? (
          <div className="py-12 text-center text-rose-500">{error}</div>
        ) : reviews.length > 0 ? (
          reviews.map((item) => (
            <ReviewCard
              key={item.id}
              item={item}
              isHighlighted={item.id === highlightedId}
              cardRef={item.id === highlightedId ? highlightRef : null}
            />
          ))
        ) : (
          <p className="text-sm text-slate-400 text-center py-12">
            Belum ada ulasan dari mahasiswa
          </p>
        )}
      </div>

      {!isLoading && !error && totalPages > 1 && (
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
            Menampilkan <span className="font-bold text-[#1E1B4B]">{displayedCount}</span> dari{" "}
            <span className="font-bold text-[#1E1B4B]">{pagination.total || summary.totalReviews}</span> ulasan
          </div>
        </div>
      )}
    </div>
  );
}
