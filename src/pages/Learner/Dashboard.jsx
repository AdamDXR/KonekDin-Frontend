import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Calendar, 
  Video, 
  ChevronRight, 
  Star,
  TrendingUp,
  Award
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';

// Mock Data for the Chart
const chartData = [
  { name: 'Jan', jam: 10 },
  { name: 'Feb', jam: 15 },
  { name: 'Mar', jam: 13 },
  { name: 'Apr', jam: 22 },
  { name: 'Mei', jam: 18 },
  { name: 'Jun', jam: 25 },
];

export default function LearnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* 1. Top Welcome Banner */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <div className="bg-gradient-to-r from-[#000666] to-teal-700 rounded-[32px] p-10 flex flex-col md:flex-row items-start md:items-center justify-between text-white shadow-xl shadow-teal-900/10 relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -right-20 -top-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold w-max mb-4 tracking-wider uppercase border border-white/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Status: Aktif
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Selamat Datang Kembali, Budi Santoso! 👋
            </h1>
            <p className="text-teal-100 font-medium text-sm md:text-base">
              Siap untuk melanjutkan petualangan belajarmu hari ini?
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/learner/cari-tutor')}
            className="mt-6 md:mt-0 bg-white text-[#000666] hover:bg-slate-100 rounded-2xl px-8 h-14 font-bold text-base shadow-lg transition-transform hover:scale-105 relative z-10"
          >
            + Sesi Baru
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        
        {/* 2. Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Sesi */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Sesi Selesai</div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-slate-900">12</span>
                <span className="flex items-center text-emerald-600 text-xs font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Jam Belajar */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Jam Belajar</div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-slate-900">18<span className="text-xl text-slate-500 font-bold">h</span></span>
                <span className="flex items-center text-emerald-600 text-xs font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3 mr-1" /> +18.5%
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Mata Kuliah */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Matkul Dipelajari</div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-slate-900">3</span>
                <span className="flex items-center text-emerald-600 text-xs font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3 mr-1" /> +7.0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Layout (Left 60% / Right 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Jadwal Mendatang */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#000666]">Jadwal Mendatang</h2>
                <Button variant="link" className="text-teal-600 font-bold p-0" onClick={() => navigate('/learner/jadwal-belajar')}>
                  Lihat Semua
                </Button>
              </div>
              
              <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-teal-200 transition-colors">
                <div className="flex items-center gap-5">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Tutor" className="w-16 h-16 rounded-xl object-cover border border-slate-100" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Irkham Wildan</h3>
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-md text-xs font-bold">Algoritma & Struktur Data</span>
                    <div className="flex items-center gap-4 mt-3 text-sm font-medium text-slate-500">
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Besok, 14 Okt</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>12:30 WIB</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/learner/jadwal-belajar')}
                  className="w-full sm:w-auto bg-[#000666] hover:bg-blue-900 text-white rounded-xl h-12 px-6 font-bold"
                >
                  <Video className="w-4 h-4 mr-2" />
                  Rincian Sesi
                </Button>
              </div>
            </div>

            {/* Grafik Aktivitas Belajar */}
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold text-[#000666] mb-1">Aktivitas Belajar</h2>
                  <p className="text-sm font-medium text-slate-500">Statistik jam belajar 6 bulan terakhir</p>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                  <span className="text-sm font-bold text-slate-700">Tahun 2026</span>
                </div>
              </div>
              
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorJam" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }} 
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                      cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="jam" 
                      stroke="#0d9488" 
                      strokeWidth={4}
                      fillOpacity={1} 
                      fill="url(#colorJam)" 
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#000666' }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#000666]">Tutor Rekomendasi</h2>
              <div className="bg-yellow-100 text-yellow-700 p-1.5 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 space-y-5">
              
              {/* Tutor 1 */}
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => navigate('/learner/cari-tutor')}>
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?img=47" alt="Tutor" className="w-12 h-12 rounded-xl object-cover border border-slate-100 group-hover:ring-2 ring-teal-500 ring-offset-2 transition-all" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-teal-600 transition-colors">Mery Zahra</h3>
                    <div className="text-xs text-slate-500 font-medium">Bahasa Inggris</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-0.5">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-slate-800 text-sm">4.9</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">(120 Ulasan)</div>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full"></div>

              {/* Tutor 2 */}
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => navigate('/learner/cari-tutor')}>
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?img=15" alt="Tutor" className="w-12 h-12 rounded-xl object-cover border border-slate-100 group-hover:ring-2 ring-teal-500 ring-offset-2 transition-all" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-teal-600 transition-colors">Arhan Pradana</h3>
                    <div className="text-xs text-slate-500 font-medium">Fisika Dasar</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-0.5">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-slate-800 text-sm">4.8</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">(98 Ulasan)</div>
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full"></div>

              {/* Tutor 3 */}
              <div className="flex items-center justify-between group cursor-pointer" onClick={() => navigate('/learner/cari-tutor')}>
                <div className="flex items-center gap-4">
                  <img src="https://i.pravatar.cc/150?img=33" alt="Tutor" className="w-12 h-12 rounded-xl object-cover border border-slate-100 group-hover:ring-2 ring-teal-500 ring-offset-2 transition-all" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm mb-0.5 group-hover:text-teal-600 transition-colors">Rafi Ardan</h3>
                    <div className="text-xs text-slate-500 font-medium">Matematika Diskrit</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end mb-0.5">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-slate-800 text-sm">4.7</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">(85 Ulasan)</div>
                </div>
              </div>

            </div>

            <Button 
              onClick={() => navigate('/learner/cari-tutor')}
              variant="outline"
              className="w-full h-14 border-2 border-dashed border-teal-300 text-teal-700 bg-teal-50/50 hover:bg-teal-50 hover:border-teal-400 rounded-2xl font-bold transition-all"
            >
              Jelajahi Tutor Lainnya
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>

          </div>
        </div>

      </div>
    </div>
  );
}
