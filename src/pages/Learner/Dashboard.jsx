import { Link } from 'react-router-dom'
import {
  Search,
  ClipboardList,
  CalendarDays,
  History,
  Bell,
  Star,
  Clock,
  CalendarCheck2,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Repeat2,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// ---------- Data ringkasan ----------
const upcomingSession = {
  tutorName: 'Irkham Wildan',
  tutorAvatar: 'https://i.pravatar.cc/150?img=11',
  subject: 'Algoritma & Struktur Data',
  date: 'Senin, 14 Oktober 2026',
  time: '12.30 - 14.10 WIB',
  status: 'Menunggu Sesi',
}

const recentHistory = [
  {
    id: 1,
    subject: 'Pemrograman Web',
    tutorName: 'Arhan Pradana',
    tutorAvatar: 'https://i.pravatar.cc/150?img=11',
    date: '1 April 2026',
    rating: 5.0,
  },
  {
    id: 2,
    subject: 'Jaringan Komputer',
    tutorName: 'Rafi Ardan',
    tutorAvatar: 'https://i.pravatar.cc/150?img=33',
    date: '25 Maret 2026',
    rating: 4.9,
  },
]

const notifications = [
  {
    id: 1,
    title: 'Pengingat Sesi Besok',
    desc: 'Persiapkan diri Anda untuk sesi Algoritma bersama Irkham Wildan.',
    icon: CalendarCheck2,
    iconBg: 'bg-orange-100 text-orange-500',
    tag: 'BARU',
    isBadge: true,
  },
  {
    id: 2,
    title: 'Pembayaran Berhasil!',
    desc: 'Sesi Algoritma dengan Irkham Wildan telah dikonfirmasi.',
    icon: CheckCircle2,
    iconBg: 'bg-teal-100 text-teal-600',
    tag: '5 menit lalu',
    isBadge: false,
  },
]

const stats = [
  { label: 'Sesi Selesai', value: '3', icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50' },
  { label: 'Sesi Mendatang', value: '1', icon: CalendarDays, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { label: 'Avg. Rating', value: '4.97', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { label: 'Total Jam Belajar', value: '7.5', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
]

const quickLinks = [
  { name: 'Cari Tutor', href: '/learner/cari-tutor', icon: Search, desc: 'Temukan tutor terbaik', color: 'bg-teal-600' },
  { name: 'Detail Pesanan', href: '/learner/detail-pesanan', icon: ClipboardList, desc: 'Lihat invoice & pembayaran', color: 'bg-[#0a0f44]' },
  { name: 'Jadwal Belajar', href: '/learner/jadwal-belajar', icon: CalendarDays, desc: 'Kelola sesi mendatang', color: 'bg-indigo-600' },
  { name: 'Riwayat Belajar', href: '/learner/riwayat-belajar', icon: History, desc: 'Perjalanan belajarmu', color: 'bg-purple-600' },
  { name: 'Notifikasi', href: '/learner/notifikasi', icon: Bell, desc: 'Update terbaru untukmu', color: 'bg-orange-500' },
]

export default function Dashboard() {
  return (
    <div className="pb-10 space-y-8">
      {/* ===== GREETING ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#0a0f44] tracking-tight leading-tight">
            Selamat Datang, Budi! 👋
          </h1>
          <p className="text-[14px] text-slate-500 mt-1">
            Ini ringkasan aktivitas belajar Anda hari ini.
          </p>
        </div>
        <Link to="/learner/cari-tutor">
          <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl px-5 h-10 text-sm font-semibold shadow-none gap-2">
            <Search className="h-4 w-4" />
            Cari Tutor
          </Button>
        </Link>
      </div>

      {/* ===== STAT CARDS ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-100 p-5 flex items-center gap-4">
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
              <s.icon className={`h-5 w-5 ${s.color}`} />
            </div>
            <div>
              <p className="text-[22px] font-extrabold text-[#0a0f44] leading-none">{s.value}</p>
              <p className="text-[12px] text-slate-400 mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== QUICK LINKS ===== */}
      <div>
        <h2 className="text-[16px] font-bold text-[#0a0f44] mb-3">Menu Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickLinks.map((link) => (
            <Link key={link.name} to={link.href} className="group bg-white rounded-2xl border border-slate-100 p-4 flex flex-col items-center text-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${link.color}`}>
                <link.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#0a0f44]">{link.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ===== MAIN CONTENT ROW ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* --- Jadwal Mendatang (dari JadwalBelajar) --- */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="border-l-[4px] border-[#0a0f44] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#0a0f44]" />
                <h2 className="text-[16px] font-bold text-[#0a0f44]">Jadwal Mendatang</h2>
              </div>
              <Link to="/learner/jadwal-belajar" className="text-[12px] text-teal-600 font-semibold hover:underline flex items-center gap-1">
                Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex gap-4">
              <Avatar className="h-[72px] w-[72px] rounded-lg flex-shrink-0">
                <AvatarImage src={upcomingSession.tutorAvatar} alt={upcomingSession.tutorName} className="object-cover" />
                <AvatarFallback className="bg-[#0a0f44] text-white text-xl rounded-lg">{upcomingSession.tutorName[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0a0f44]">{upcomingSession.tutorName}</h3>
                    <p className="text-[13px] text-teal-600 font-semibold">{upcomingSession.subject}</p>
                  </div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full flex-shrink-0">
                    {upcomingSession.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-[12px] text-slate-600">{upcomingSession.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-[12px] text-slate-600">{upcomingSession.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Notifikasi Terbaru --- */}
        <div className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#0a0f44]" />
              <h2 className="text-[16px] font-bold text-[#0a0f44]">Notifikasi</h2>
            </div>
            <Link to="/learner/notifikasi" className="text-[12px] text-teal-600 font-semibold hover:underline flex items-center gap-1">
              Lihat <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex gap-3">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>
                  <n.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-[#0a0f44] truncate">{n.title}</p>
                    {n.isBadge && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded flex-shrink-0">{n.tag}</span>
                    )}
                  </div>
                  <p className="text-[12px] text-slate-400 leading-snug mt-0.5 line-clamp-2">{n.desc}</p>
                  {!n.isBadge && <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider">{n.tag}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== RIWAYAT BELAJAR (Ringkasan) ===== */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-[#0a0f44]" />
            <h2 className="text-[16px] font-bold text-[#0a0f44]">Riwayat Belajar Terakhir</h2>
          </div>
          <Link to="/learner/riwayat-belajar" className="text-[12px] text-teal-600 font-semibold hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recentHistory.map((session) => (
            <div key={session.id} className="bg-white rounded-2xl border border-slate-100 p-5 flex gap-4 hover:shadow-sm transition-shadow">
              <div className="relative flex-shrink-0">
                <Avatar className="h-[70px] w-[70px] rounded-lg">
                  <AvatarImage src={session.tutorAvatar} alt={session.tutorName} className="object-cover" />
                  <AvatarFallback className="bg-[#0a0f44] text-white rounded-lg">{session.tutorName[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                  <Star className="h-2.5 w-2.5 fill-white" />
                  {session.rating}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-bold text-[#0a0f44]">{session.subject}</h3>
                <p className="text-[12px] text-slate-500 mt-0.5">{session.tutorName}</p>
                <div className="flex items-center gap-1 mt-2 text-[11px] text-slate-400">
                  <CalendarDays className="h-3 w-3" />
                  <span>{session.date}</span>
                </div>
                <div className="flex justify-end mt-2">
                  <button className="flex items-center gap-1 text-[11px] font-semibold text-teal-600 hover:underline">
                    <Repeat2 className="h-3.5 w-3.5" /> Ulangi sesi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DETAIL PESANAN — Ringkasan Pembayaran ===== */}
      <div className="bg-[#0a0f44] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-indigo-800 flex items-center justify-center flex-shrink-0">
            <ClipboardList className="h-5 w-5 text-teal-300" />
          </div>
          <div>
            <p className="text-[11px] font-bold tracking-[0.12em] text-teal-300 uppercase">PESANAN AKTIF</p>
            <h3 className="text-[18px] font-extrabold text-white mt-0.5">Algoritma & Struktur Data</h3>
            <p className="text-[13px] text-indigo-300 mt-0.5">Irkham Wildan · Senin, 14 Okt · Rp 60.000</p>
          </div>
        </div>
        <Link to="/learner/detail-pesanan">
          <Button className="bg-teal-500 hover:bg-teal-400 text-white rounded-xl px-5 h-10 text-sm font-semibold shadow-none gap-2 flex-shrink-0">
            Lihat Invoice <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
