import React, { useState, useEffect } from "react";
import axios from "@/lib/axios";
import { Wallet, Clock, Star, Banknote } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function TutorDashboard() {
  const navigate = useNavigate();

  // Inisialisasi state sesuai permintaan
  const [totalPendapatan, setTotalPendapatan] = useState(0);
  const [totalJam, setTotalJam] = useState(0);
  const [rating, setRating] = useState(0);
  
  // Persentase diset ke 0 (bisa disembunyikan jika 0)
  const [persentasePendapatan, setPersentasePendapatan] = useState(0);
  const [persentaseJam, setPersentaseJam] = useState(0);
  const [persentaseRating, setPersentaseRating] = useState(0);

  const [todaySessions, setTodaySessions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("...");
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true);

  useEffect(() => {
    // Ambil nama user dari localStorage agar sama persis dengan sidebar
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser?.name) {
          setUserName(parsedUser.name);
        }
      } catch (e) {
        // Abaikan error parse
      }
    } else {
      // Fallback API
      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('/api/me');
          const user = response.data?.data || response.data;
          if (user?.name) {
            setUserName(user.name);
          }
        } catch (error) {
          console.error("Gagal mengambil profil user:", error);
        }
      };
      fetchUserProfile();
    }

    // Ambil Data Dashboard
    const fetchDashboardData = async () => {
      setIsLoadingDashboard(true);
      try {
        // Karena data dipecah di beberapa endpoint menurut backend.md, kita fetch sekaligus
        const [dashRes, schedRes, revRes] = await Promise.all([
          axios.get('/api/tutor/dashboard').catch(() => ({ data: { data: {} } })),
          axios.get('/api/tutor/schedules').catch(() => ({ data: { data: [] } })),
          axios.get('/api/tutor/reviews').catch(() => ({ data: { data: [] } }))
        ]);

        const stats = dashRes.data?.data || {};
        const schedules = schedRes.data?.data || [];
        const reviewsData = revRes.data?.data || [];
        
        // 1. Set Statistik
        setTotalPendapatan(stats.total_earnings || 0);
        // Backend memberikan total_sessions, sementara UI menggunakan "Jam". Kita gunakan total_sessions sebagai jam atau sesi
        setTotalJam(stats.total_sessions || 0); 
        setRating(Number(stats.rating) || 0);
        
        // Persentase saat ini belum ada di backend.md, diset 0 dulu
        setPersentasePendapatan(0);
        setPersentaseJam(0);
        setPersentaseRating(0);
        
        // 2. Set Jadwal (Ambil maksimal 3 jadwal terdekat sebagai contoh "Hari Ini")
        const formattedSchedules = schedules.slice(0, 3).map((item) => ({
          id: item.id,
          learnerName: item.learner || "Learner",
          subject: "Sesi Bimbingan", // Bisa diganti jika backend menambahkan field course/matkul
          time: item.time || "Waktu tidak ditentukan",
          avatar: "https://i.pravatar.cc/150?img=11" // Default avatar
        }));
        setTodaySessions(formattedSchedules);

        // 3. Set Ulasan (Ambil 3 ulasan terbaru)
        const formattedReviews = reviewsData.slice(0, 3).map((item) => ({
          id: item.id,
          name: item.learner || "Anonim",
          rating: item.rating || 5,
          text: item.comment || "",
          avatar: "https://i.pravatar.cc/150?img=12" // Default avatar
        }));
        setReviews(formattedReviews);
        
      } catch (error) {
        console.error("Gagal mengambil data dashboard:", error);
      } finally {
        setIsLoadingDashboard(false);
      }
    };

    fetchDashboardData();
  }, []);
  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0b1047] via-[#09354a] to-[#0a5247] rounded-3xl p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 min-h-[180px]">
        {/* Decorative Circle Patterns */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-72 h-72 border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute right-[0px] top-1/2 -translate-y-1/2 w-56 h-56 border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute right-[40px] top-1/2 -translate-y-1/2 w-40 h-40 border border-white/15 rounded-full pointer-events-none" />
        <div className="absolute right-[80px] top-1/2 -translate-y-1/2 w-24 h-24 border border-white/20 rounded-full pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 max-w-xl">
          <h1 className="text-2xl md:text-[32px] font-extrabold text-white tracking-tight leading-tight">
            Selamat Datang Kembali,
            <br />
            <span className="text-[#05eb8a]"> {userName}</span>!
          </h1>
          <p className="text-white/80 text-sm mt-4 leading-relaxed font-medium">
            {totalJam === 0
              ? "Selamat datang di KonekDin! Ini adalah langkah awal perjalananmu sebagai tutor. Siapkan dirimu untuk berbagi ilmu dan mulai menginspirasi mahasiswa."
              : `Dedikasi Anda dalam mengajar telah menyelesaikan ${totalJam} sesi bimbingan dan membantu mahasiswa mencapai target akademik mereka. Teruslah menginspirasi!`}
          </p>
        </div>
      </div>

      {/* 2. Stats Cards (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Pendapatan */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Wallet className="h-5 w-5" />
            </div>
            {persentasePendapatan !== 0 && (
              <span className="text-[11px] font-bold text-[#0d7c6b] bg-[#e8f5f2] px-3 py-1 rounded-full">
                +{persentasePendapatan}%
              </span>
            )}
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              TOTAL PENDAPATAN
            </p>
            <h3 className="text-[28px] font-black text-[#0a0f44] leading-none">Rp {totalPendapatan.toLocaleString('id-ID')}</h3>
          </div>
        </div>

        {/* Card 2: Total Jam Mengajar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-[#e8f5f2] text-[#0d7c6b] rounded-xl">
              <Clock className="h-5 w-5" />
            </div>
            {persentaseJam !== 0 && (
              <span className="text-[11px] font-bold text-[#0d7c6b] bg-[#e8f5f2] px-3 py-1 rounded-full">
                +{persentaseJam}%
              </span>
            )}
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              TOTAL JAM MENGAJAR
            </p>
            <h3 className="text-[28px] font-black text-[#0a0f44] leading-none">{totalJam} jam</h3>
          </div>
        </div>

        {/* Card 3: Rating */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-[#fffbeb] text-[#f59f00] rounded-xl">
              <Star className="h-5 w-5 fill-[#f59f00]" />
            </div>
            {persentaseRating !== 0 && (
              <span className="text-[11px] font-bold text-[#0d7c6b] bg-[#e8f5f2] px-3 py-1 rounded-full">
                +{persentaseRating}%
              </span>
            )}
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              RATING
            </p>
            <h3 className="text-[28px] font-black text-[#0a0f44] leading-none">{rating.toFixed(1)} / <span className="text-[22px] font-bold text-slate-800">5.0</span></h3>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Grid (2 Columns: Left [w-2/3], Right [w-1/3]) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Jadwal Hari Ini */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-[#192257]">
                Jadwal Mengajar Hari Ini
              </h2>
              <Link
                to="/tutor/jadwal-mengajar"
                className="text-sm font-semibold text-[#0d7c6b] hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="flex flex-col gap-4">
              {isLoadingDashboard ? (
                <div className="bg-[#f8fafc] rounded-2xl p-6 flex items-center justify-center text-slate-400 font-medium text-sm border border-slate-100">
                  Memuat jadwal...
                </div>
              ) : todaySessions.length === 0 ? (
                <div className="bg-[#f8fafc] rounded-2xl p-6 flex items-center justify-center text-slate-400 italic text-sm border border-slate-100">
                  Belum ada jadwal hari ini
                </div>
              ) : (
                todaySessions.map((session) => (
                  <div
                    key={session.id}
                    className="bg-[#f8fafc] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-5">
                      <img
                        src={session.avatar}
                        alt={session.learnerName}
                        className="h-20 w-20 rounded-2xl object-cover"
                      />
                      <div className="flex flex-col gap-1.5">
                        <h3 className="text-base font-bold text-[#192257]">
                          {session.learnerName}
                        </h3>
                        <p className="text-xs font-medium text-slate-500">
                          {session.subject}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0d7c6b] bg-[#e8f5f2] px-2.5 py-1 rounded-full w-fit mt-1">
                          <Clock className="h-3.5 w-3.5" />
                          {session.time}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/tutor/jadwal-mengajar?learner=${encodeURIComponent(session.learnerName)}`)}
                      className="bg-[#192257] hover:bg-[#0a0f44] text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-colors duration-150 w-full sm:w-auto"
                    >
                      Rincian Sesi
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Ulasan Terbaru */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-bold text-[#192257]">Ulasan Terbaru</h2>
              <Link
                to="/tutor/ulasan"
                className="text-xs font-semibold text-[#0d7c6b] hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              {isLoadingDashboard ? (
                <div className="bg-[#f8fafc] rounded-2xl p-6 flex items-center justify-center text-slate-400 font-medium text-sm border border-slate-100">
                  Memuat ulasan...
                </div>
              ) : reviews.length === 0 ? (
                <div className="bg-[#f8fafc] rounded-2xl p-6 flex items-center justify-center text-slate-400 italic text-sm border border-slate-100">
                  Belum ada ulasan
                </div>
              ) : (
                reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="h-9 w-9 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 flex flex-col">
                      {/* Stars */}
                      <div className="flex gap-0.5 mb-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      {/* Review text */}
                      <p className="text-[12px] text-slate-600 leading-relaxed italic mb-1.5">
                        {review.text}
                      </p>
                      {/* Reviewer name */}
                      <p className="text-[10px] text-slate-400 font-medium">
                        — {review.name}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

