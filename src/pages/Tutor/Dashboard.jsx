import React from 'react'
import { Calendar, Users, Star, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function TutorDashboard() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
          Dashboard Tutor
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Selamat datang kembali, Irkham Wildan! Mari bantu para learner mencapai tujuan belajarnya.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[#e8f5f2] rounded-xl text-[#0d7c6b]">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sesi Mengajar</p>
            <h3 className="text-2xl font-bold text-[#0a0f44] mt-1">3 Sesi</h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Learner</p>
            <h3 className="text-2xl font-bold text-[#0a0f44] mt-1">3 Orang</h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500">
            <Star className="h-6 w-6 fill-amber-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Rating Tutor</p>
            <h3 className="text-2xl font-bold text-[#0a0f44] mt-1">4.9 / 5.0</h3>
          </div>
        </div>
      </div>

      {/* Welcome Banner / Next Action */}
      <div className="bg-gradient-to-r from-[#0d7c6b] to-[#129480] text-white p-8 rounded-3xl shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold mb-2">Anda Memiliki Sesi Mengajar Terdekat!</h2>
          <p className="text-sm opacity-90 max-w-md">
            Sesi mengajar berikutnya bersama Rina Sari untuk Pemrograman Web dijadwalkan pada Kamis, 17 Okt 2026 pukul 07:00 WIB.
          </p>
        </div>
        <Link
          to="/tutor/jadwal-mengajar"
          className="bg-white text-[#0d7c6b] hover:bg-slate-50 transition-colors font-semibold px-6 py-3 rounded-xl text-sm flex items-center gap-2 flex-shrink-0"
        >
          Lihat Jadwal Mengajar
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
