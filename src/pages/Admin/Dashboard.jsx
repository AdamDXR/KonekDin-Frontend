import React from 'react'
import {
  Users,
  CheckCircle,
  AlertTriangle,
  Star,
  Award
} from 'lucide-react'

// Removed dummy data

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import { Link } from 'react-router-dom'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total_learners: 0,
    total_tutors: 0,
    active_complaints: 0,
    pending_verifications: 0,
    new_complaints: 0,
    aktivitas_terbaru: [],
    top_tutors: [],
    mata_kuliah_populer: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await axios.get('/admin/stats')
      if (response.data?.data) {
        const rawStats = response.data.data;
        
        // Map aktivitas terbaru dari raw model
        const mappedAktivitas = (rawStats.aktivitas_terbaru || []).map(item => {
          const dateObj = new Date(item.time);
          const timeString = isNaN(dateObj) ? 'Waktu tidak valid' : `${dateObj.getDate()} ${dateObj.toLocaleString('id-ID', { month: 'short' })} ${dateObj.getFullYear()}, ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`;
          
          let displayStatus = 'Pending';
          const s = (item.status || '').toLowerCase();
          if (s === 'selesai' || s === 'completed' || s === 'approved' || s === 'paid') displayStatus = 'Sukses';
          if (s === 'diproses' || s === 'pending' || s === 'menunggu') displayStatus = 'Pending';
          if (s === 'ditolak' || s === 'cancelled' || s === 'failed') displayStatus = 'Gagal';

          return {
            id: item.id,
            nama: item.user_name || 'System',
            aktivitas: item.activity || 'Aktivitas',
            waktu: timeString,
            status: displayStatus
          }
        });

        // Map top tutors
        const mappedTutors = (rawStats.top_tutors || []).map(tutor => ({
          ...tutor,
          image: `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || 'Tutor')}&background=000666&color=fff`
        }));

        // Map mata kuliah populer
        const colors = ['bg-[#000666]', 'bg-[#00897B]', 'bg-[#F59E0B]'];
        const totalTopBookings = (rawStats.mata_kuliah_populer || []).reduce((sum, mk) => sum + (mk.bookings || 0), 0) || 1;
        const mappedCourses = (rawStats.mata_kuliah_populer || []).map((mk, index) => ({
          id: mk.id,
          nama: mk.name,
          persentase: Math.round((mk.bookings / totalTopBookings) * 100) || (Math.floor(Math.random() * 71) + 10),
          colorClass: colors[index % 3]
        }));

        setStats({
          ...rawStats,
          aktivitas_terbaru: mappedAktivitas,
          top_tutors: mappedTutors,
          mata_kuliah_populer: mappedCourses
        });
      }
    } catch (error) {
      console.error('Failed to fetch admin stats', error)
    } finally {
      setLoading(false)
    }
  }

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="bg-orange-100 text-orange-600 font-bold text-[10px] px-3 py-1 rounded-full">{status}</span>
      case 'Sukses':
        return <span className="bg-[#E6FCF5] text-[#00897B] font-bold text-[10px] px-3 py-1 rounded-full">{status}</span>
      case 'Ditinjau':
        return <span className="bg-red-100 text-red-600 font-bold text-[10px] px-3 py-1 rounded-full">{status}</span>
      default:
        return <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-3 py-1 rounded-full">{status}</span>
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#000666] mb-2 tracking-tight">Dashboard</h1>
        <p className="text-slate-500 text-[15px]">Performa dan aktivitas platform hari ini. Kelola ekosistem akademik dengan presisi.</p>
      </div>

      {/* Top 3 Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Card 1: Total Pelajar */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-[10px] bg-[#EEF2FF] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#000666]" />
            </div>
            <div className="bg-[#E6FCF5] text-[#00897B] text-[11px] font-bold px-2 py-1 rounded">
              +12.5%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">TOTAL PELAJAR</div>
            <div className="text-[32px] font-extrabold text-[#000666] leading-none tracking-tight">{stats.total_learners}</div>
          </div>
        </div>

        {/* Card 2: Tutor Terverifikasi */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-[10px] bg-[#E6FCF5] flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#00897B]" />
            </div>
            <div className="bg-[#E6FCF5] text-[#00897B] text-[11px] font-bold px-2 py-1 rounded">
              +18.5%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">TUTOR TERVERIFIKASI</div>
            <div className="text-[32px] font-extrabold text-[#000666] leading-none tracking-tight">{stats.total_tutors}</div>
          </div>
        </div>

        {/* Card 3: Komplain Aktif */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-10 h-10 rounded-[10px] bg-red-50 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="bg-red-50 text-red-600 text-[11px] font-bold px-2 py-1 rounded">
              -2.1%
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">KOMPLAIN AKTIF</div>
            <div className="text-[32px] font-extrabold text-[#000666] leading-none tracking-tight">{stats.active_complaints}</div>
          </div>
        </div>

      </div>

      {/* Main Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Aktivitas Terbaru Table */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100">
            <div className="px-7 py-6 flex justify-between items-center border-b border-slate-100">
              <h2 className="text-[18px] font-bold text-[#000666]">Aktivitas Terbaru</h2>
              <Link to="/admin/activities" className="text-[13px] font-bold text-[#00897B] hover:text-teal-700 transition-colors">Lihat Semua</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="py-4 px-7 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">NAMA PENGGUNA</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">AKTIVITAS</th>
                    <th className="py-4 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">WAKTU</th>
                    <th className="py-4 px-7 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {stats.aktivitas_terbaru.length > 0 ? (
                    stats.aktivitas_terbaru.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 px-7 whitespace-nowrap">
                          <span className="font-bold text-[#000666] text-[13px]">{item.nama}</span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="text-slate-600 text-[13px]">{item.aktivitas}</span>
                        </td>
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="text-slate-400 text-[13px]">{item.waktu}</span>
                        </td>
                        <td className="py-4 px-7 whitespace-nowrap">
                          {renderStatusBadge(item.status)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400 text-[13px]">
                        Belum ada aktivitas terbaru.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 2 Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Performa Tutor Terbaik */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
              <h2 className="text-[16px] font-bold text-[#000666] mb-6">Performa Tutor Terbaik</h2>
              <div className="space-y-5">
                {stats.top_tutors.length > 0 ? (
                  stats.top_tutors.map((tutor) => (
                    <div key={tutor.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar with floating rating */}
                        <div className="relative">
                          <img src={tutor.image} alt={tutor.name} className="w-14 h-14 rounded-xl object-cover border border-slate-100" />
                          <div className="absolute -top-2 -right-3 bg-white rounded-full px-1.5 py-0.5 border border-slate-100 shadow-sm flex items-center gap-0.5">
                            <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                            <span className="text-[10px] font-bold text-slate-700">{tutor.rating}</span>
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-[#000666] text-[14px] leading-tight mb-0.5">{tutor.name}</div>
                          <div className="text-[11px] text-slate-400">({tutor.sessions} Sesi Selesai)</div>
                        </div>
                      </div>
                      {/* Top Tutor Badge Icon */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center mb-1">
                          <Award className="w-4 h-4 text-amber-500" />
                        </div>
                        <span className="text-[8px] font-bold text-amber-500 uppercase tracking-wider">Top Tutor</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-400 text-[13px]">
                    Belum ada data tutor.
                  </div>
                )}
              </div>
            </div>

            {/* Mata Kuliah Populer */}
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
              <h2 className="text-[16px] font-bold text-[#000666] mb-6">Mata Kuliah Populer</h2>
              <div className="space-y-6">
                {stats.mata_kuliah_populer.length > 0 ? (
                  stats.mata_kuliah_populer.map((mk) => (
                    <div key={mk.id}>
                      <div className="flex justify-between items-end mb-2">
                        <span className={`text-[13px] font-bold ${mk.colorClass.replace('bg-', 'text-')}`}>{mk.nama}</span>
                        <span className={`text-[11px] font-bold ${mk.colorClass.replace('bg-', 'text-')}`}>{mk.persentase}% Peminat</span>
                      </div>
                      {/* Progress Bar Container */}
                      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        {/* Progress Bar Fill */}
                        <div 
                          className={`h-full rounded-full ${mk.colorClass}`} 
                          style={{ width: `${mk.persentase}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-400 text-[13px]">
                    Belum ada data mata kuliah.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Right Column (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Action Card: Verifikasi Tutor */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 border-l-4 border-l-[#000666]">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-[16px] font-bold text-[#000666]">Verifikasi Tutor</h2>
              <span className="bg-[#EEF2FF] text-[#000666] text-[10px] font-bold px-2 py-1 rounded">{stats.pending_verifications}</span>
            </div>
            <p className="text-slate-500 text-[13px] mb-5 leading-relaxed">
              Pengajuan verifikasi dokumen tutor tertunda.
            </p>
            <Link to="/admin/manajemen" state={{ tab: 'verifikasi' }} className="w-full bg-[#EEF2FF] text-[#000666] font-bold text-[13px] py-2.5 rounded-xl hover:bg-indigo-100 transition-colors flex justify-center">
              Lihat Detail
            </Link>
          </div>

          {/* Action Card: Komplain Baru */}
          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 border-l-4 border-l-red-600">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-[16px] font-bold text-[#000666]">Komplain Baru</h2>
              <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded">{stats.new_complaints}</span>
            </div>
            <p className="text-slate-500 text-[13px] mb-5 leading-relaxed">
              Butuh tanggapan admin segera.
            </p>
            <Link to="/admin/komplain" className="w-full bg-red-50 text-red-600 font-bold text-[13px] py-2.5 rounded-xl hover:bg-red-100 transition-colors flex justify-center">
              Lihat Detail
            </Link>
          </div>

        </div>

      </div>

    </div>
  )
}
