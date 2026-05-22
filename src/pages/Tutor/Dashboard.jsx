import React from "react";
import { Wallet, Clock, Star, MessageSquare, Lightbulb } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Mock Data Reviews
const REVIEWS = [
  {
    id: 1,
    name: "Fairuz Cepmek",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    text: '"Penjelasan Irkham sangat mudah dimengerti, sangat membantu UAS saya!"',
  },
  {
    id: 2,
    name: "Syifa Hadju",
    avatar: "https://i.pravatar.cc/150?img=34",
    rating: 5,
    text: '"Irkham ngajarnya enak dan terstruktur. Penjelasan step by step, cocok buat pemula maupun yang mau memperdalam materi."',
  },
  {
    id: 3,
    name: "El Rumi",
    avatar: "https://i.pravatar.cc/150?img=35",
    rating: 5,
    text: '"Tutor yang tepat waktu, ramah, dan penguasaan materinya bagus. Sangat membantu saat persiapan tugas maupun ujian."',
  },
  {
    id: 4,
    name: "Cimoy Aa",
    avatar: "https://i.pravatar.cc/150?img=36",
    rating: 5,
    text: '"Suka banget cara ngajarnya Irkham. Nggak cuma kasih teori, tapi juga dibantu latihan soal sampai paham."',
  },
  {
    id: 5,
    name: "Siti Aisyah",
    avatar: "https://i.pravatar.cc/150?img=37",
    rating: 5,
    text: '"Tutor yang sabar dan responsif. Kalau ada pertanyaan selalu dijawab sampai benar-benar paham. Recommended banget buat yang mau belajar tanpa tegang."',
  },
];

// Mock Data Jadwal Mengajar Hari Ini
const TODAY_SESSIONS = [
  {
    id: 1,
    learnerName: "Damia Miaw",
    avatar: "https://i.pravatar.cc/150?img=47",
    subject: "Basis Data",
    time: "09:30 - 10:20 WIB",
  },
  {
    id: 2,
    learnerName: "Rangga Azof",
    avatar: "https://i.pravatar.cc/150?img=53",
    subject: "Algoritma & Struktur Data",
    time: "12:30 - 14:10 WIB",
  },
];

// SVG Line Chart Component
const IncomeChart = () => {
  return (
    <div className="w-full overflow-x-auto mt-4">
      <svg
        className="w-full min-w-[500px]"
        height="230"
        viewBox="0 0 600 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0d7c6b" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0d7c6b" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid Lines */}
        <line
          x1="50"
          y1="20"
          x2="570"
          y2="20"
          stroke="#f1f5f9"
          strokeWidth="1"
        />
        <line
          x1="50"
          y1="65"
          x2="570"
          y2="65"
          stroke="#f1f5f9"
          strokeWidth="1"
        />
        <line
          x1="50"
          y1="110"
          x2="570"
          y2="110"
          stroke="#f1f5f9"
          strokeWidth="1"
        />
        <line
          x1="50"
          y1="155"
          x2="570"
          y2="155"
          stroke="#f1f5f9"
          strokeWidth="1"
        />
        <line
          x1="50"
          y1="200"
          x2="570"
          y2="200"
          stroke="#e2e8f0"
          strokeWidth="1.5"
        />

        {/* Y Axis Labels */}
        <text
          x="25"
          y="24"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="end"
        >
          400
        </text>
        <text
          x="25"
          y="69"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="end"
        >
          300
        </text>
        <text
          x="25"
          y="114"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="end"
        >
          200
        </text>
        <text
          x="25"
          y="159"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="end"
        >
          100
        </text>
        <text
          x="25"
          y="204"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="end"
        >
          0
        </text>

        {/* Active Month Dotted Line (Mar) */}
        <line
          x1="190"
          y1="20"
          x2="190"
          y2="200"
          stroke="#0d7c6b"
          strokeWidth="1"
          strokeDasharray="3,3"
        />

        {/* Area Gradient under curve */}
        <path
          d="M 70,150 C 95,130 110,110 130,110 C 150,110 170,65 190,65 C 210,65 230,145 250,145 C 270,145 290,85 310,85 C 330,85 350,95 370,95 C 390,95 410,115 430,115 C 450,115 470,155 490,155 C 510,155 530,160 550,160 L 550,200 L 70,200 Z"
          fill="url(#chart-gradient)"
        />

        {/* Line Curve */}
        <path
          d="M 70,150 C 95,130 110,110 130,110 C 150,110 170,65 190,65 C 210,65 230,145 250,145 C 270,145 290,85 310,85 C 330,85 350,95 370,95 C 390,95 410,115 430,115 C 450,115 470,155 490,155 C 510,155 530,160 550,160"
          stroke="#0d7c6b"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active Dot with Outer Circle Glow */}
        <circle
          cx="190"
          cy="65"
          r="7"
          fill="white"
          stroke="#0d7c6b"
          strokeWidth="3"
        />
        <circle cx="190" cy="65" r="3" fill="#0d7c6b" />

        {/* X Axis Labels */}
        <text
          x="70"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Jan
        </text>
        <text
          x="130"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Feb
        </text>
        <text
          x="190"
          y="220"
          fill="#0a0f44"
          className="text-[10px] font-extrabold"
          textAnchor="middle"
        >
          Mar
        </text>
        <text
          x="250"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Apr
        </text>
        <text
          x="310"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Mei
        </text>
        <text
          x="370"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Jun
        </text>
        <text
          x="430"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Jul
        </text>
        <text
          x="490"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Agu
        </text>
        <text
          x="550"
          y="220"
          fill="#94a3b8"
          className="text-[10px] font-bold"
          textAnchor="middle"
        >
          Sep
        </text>
      </svg>
    </div>
  );
};

export default function TutorDashboard() {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0b1047] via-[#09354a] to-[#0a5247] rounded-3xl p-8 md:p-10 shadow-sm flex flex-col justify-center min-h-[180px]">
        {/* Decorative Circle Patterns */}
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-72 h-72 border border-white/5 rounded-full pointer-events-none" />
        <div className="absolute right-[0px] top-1/2 -translate-y-1/2 w-56 h-56 border border-white/10 rounded-full pointer-events-none" />
        <div className="absolute right-[40px] top-1/2 -translate-y-1/2 w-40 h-40 border border-white/15 rounded-full pointer-events-none" />
        <div className="absolute right-[80px] top-1/2 -translate-y-1/2 w-24 h-24 border border-white/20 rounded-full pointer-events-none" />

        {/* Content */}
        <div className="relative z-10">
          <div className="bg-[#192257] text-[#818cf8] text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 w-fit mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#818cf8]" />
            AKTIF
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Selamat Datang Kembali,
            <br />
            <span className="text-[#05eb8a]">Irkham Wildan</span>!
          </h1>
          <p className="text-white/80 text-xs md:text-sm mt-3 max-w-xl leading-relaxed font-medium">
            Dedikasi Anda dalam mengajar telah membantu 12 mahasiswa mencapai
            target akademik mereka bulan ini. Teruslah menginspirasi!
          </p>
        </div>
      </div>

      {/* 2. Stats Cards (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Total Pendapatan */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <Wallet className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-extrabold text-[#10b981] bg-[#e6fcf5] px-2 py-0.5 rounded-md">
              +12.5%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
              TOTAL PENDAPATAN
            </p>
            <h3 className="text-2xl font-black text-[#0a0f44]">Rp 1.230.000</h3>
          </div>
        </div>

        {/* Card 2: Total Jam Mengajar */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-[#e6fcf5] text-[#0ca678] rounded-xl">
              <Clock className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-extrabold text-[#10b981] bg-[#e6fcf5] px-2 py-0.5 rounded-md">
              +18.5%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
              TOTAL JAM MENGAJAR
            </p>
            <h3 className="text-2xl font-black text-[#0a0f44]">56 jam</h3>
          </div>
        </div>

        {/* Card 3: Rating */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col justify-between relative hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div className="p-2.5 bg-[#fff9db] text-[#f59f00] rounded-xl">
              <Star className="h-5 w-5 fill-[#f59f00]" />
            </div>
            <span className="text-[10px] font-extrabold text-[#10b981] bg-[#e6fcf5] px-2 py-0.5 rounded-md">
              +7%
            </span>
          </div>
          <div className="mt-5">
            <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest leading-none mb-1.5">
              RATING
            </p>
            <h3 className="text-2xl font-black text-[#0a0f44]">4.9 / 5.0</h3>
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Grid (2 Columns: Left [w-2/3], Right [w-1/3]) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Side: Jadwal Hari Ini & Grafik Pendapatan */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Jadwal Mengajar Hari Ini */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[#0a0f44]">
                Jadwal Mengajar Hari Ini
              </h2>
              <Link
                to="/tutor/jadwal-mengajar"
                className="text-xs font-semibold text-[#0d7c6b] hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="bg-[#f8fafc] p-4 rounded-2xl flex flex-col gap-4">
              {TODAY_SESSIONS.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14 rounded-xl flex-shrink-0 border border-slate-100">
                      <AvatarImage
                        src={session.avatar}
                        alt={session.learnerName}
                        className="object-cover"
                      />
                      <AvatarFallback className="rounded-xl bg-[#0a0f44] text-white text-base font-semibold">
                        {session.learnerName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-[10px] font-extrabold text-[#0d7c6b] bg-[#e8f5f2] px-2.5 py-1 rounded-lg w-fit leading-none">
                        {session.time}
                      </div>
                      <h3 className="text-sm font-extrabold text-[#0a0f44] mt-1.5">
                        {session.subject}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {session.learnerName}
                      </p>
                    </div>
                  </div>
                  <Link to="/tutor/jadwal-mengajar">
                    <Button className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-extrabold px-5 py-2.5 h-auto rounded-xl text-[11px] transition-colors duration-150">
                      Rincian Sesi
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Ikhtisar Total Pendapatan */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div>
              <h2 className="text-base font-bold text-[#0a0f44]">
                Ikhtisar Total Pendapatan
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Konsistensi performa pendapatan mengajar bulanan
              </p>
            </div>
            <IncomeChart />
          </div>
        </div>

        {/* Right Side: Review Terbaru & Tips Mengajar */}
        <div className="flex flex-col gap-6">
          {/* Review Terbaru */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-5">
            <h2 className="text-sm font-bold text-[#0a0f44]">Review Terbaru</h2>

            <div className="flex flex-col gap-5">
              {REVIEWS.map((review) => (
                <div key={review.id} className="flex gap-3">
                  <Avatar className="h-8 w-8 rounded-full border border-slate-100 flex-shrink-0">
                    <AvatarImage
                      src={review.avatar}
                      alt={review.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-[#0a0f44] text-white text-[10px] font-bold">
                      {review.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex flex-col">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    {/* Review text */}
                    <p className="text-[11px] text-slate-600 leading-relaxed italic mt-1">
                      {review.text}
                    </p>
                    {/* Reviewer name */}
                    <p className="text-[10px] text-slate-400 mt-1 font-semibold">
                      — {review.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Mengajar */}
          <div className="border-l-4 border-l-[#f97316] bg-[#fffbeb] p-5 rounded-r-2xl rounded-l-md flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-[#f97316] flex-shrink-0" />
              <h3 className="text-sm font-bold text-[#ea580c]">
                Tips Mengajar
              </h3>
            </div>
            <p className="text-[11px] text-[#c2410c] leading-relaxed">
              Mahasiswa lebih menyukai tutor yang memberikan materi ringkasan di
              akhir sesi. Coba gunakan fitur 'Papan Tulis Digital' untuk
              visualisasi yang lebih baik.
            </p>
            <a
              href="#"
              className="text-[10px] font-black text-[#ea580c] hover:underline mt-1 block tracking-wider uppercase"
            >
              PELAJARI LEBIH LANJUT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
