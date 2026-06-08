import React from "react";
import { Wallet, Clock, Star, Banknote } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SESSIONS } from "./JadwalMengajar";
import { ULASAN } from "./Ulasan";

// Dynamically get the latest 3 reviews from ULASAN
const REVIEWS = ULASAN.slice(0, 3).map((u) => ({
  id: u.id,
  name: u.learnerName,
  avatar: u.avatar,
  rating: u.rating,
  text: u.review,
}));

// Dynamically filter SESSIONS for today's date (Senin, 14 Okt 2026)
const TODAY_SESSIONS = SESSIONS.filter(
  (session) => session.schedule === "Senin, 14 Okt 2026"
).map((session) => ({
  id: session.id,
  learnerName: session.learnerName,
  avatar: session.avatarUrl,
  subject: session.subject,
  time: session.time.replace(" WIB", ""),
}));

export default function TutorDashboard() {
  const navigate = useNavigate();
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
            <span className="text-[#05eb8a]"> Irkham Wildan</span>!
          </h1>
          <p className="text-white/80 text-sm mt-4 leading-relaxed font-medium">
            Dedikasi Anda dalam mengajar telah membantu 12 mahasiswa mencapai
            target akademik mereka bulan ini. Teruslah menginspirasi!
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
            <span className="text-[11px] font-bold text-[#0d7c6b] bg-[#e8f5f2] px-3 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              TOTAL PENDAPATAN
            </p>
            <h3 className="text-[28px] font-black text-[#0a0f44] leading-none">Rp 1.230.000</h3>
          </div>
        </div>

        {/* Card 2: Total Jam Mengajar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-[#e8f5f2] text-[#0d7c6b] rounded-xl">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-bold text-[#0d7c6b] bg-[#e8f5f2] px-3 py-1 rounded-full">
              +18.5%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              TOTAL JAM MENGAJAR
            </p>
            <h3 className="text-[28px] font-black text-[#0a0f44] leading-none">56 jam</h3>
          </div>
        </div>

        {/* Card 3: Rating */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="p-3 bg-[#fffbeb] text-[#f59f00] rounded-xl">
              <Star className="h-5 w-5 fill-[#f59f00]" />
            </div>
            <span className="text-[11px] font-bold text-[#0d7c6b] bg-[#e8f5f2] px-3 py-1 rounded-full">
              +7%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              RATING
            </p>
            <h3 className="text-[28px] font-black text-[#0a0f44] leading-none">4.9 / <span className="text-[22px] font-bold text-slate-800">5.0</span></h3>
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
              {TODAY_SESSIONS.map((session) => (
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
              ))}
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
              {REVIEWS.map((review) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

