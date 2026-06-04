import React from 'react'
import {
  Users,
  Zap,
  CheckCircle,
  Star,
  AlertTriangle,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'

// Dummy Data
const growthData = [
  { name: 'Jan', pelajar: 5, tutor: 2 },
  { name: 'Mar', pelajar: 8, tutor: 3 },
  { name: 'Mei', pelajar: 7, tutor: 5 },
  { name: 'Jul', pelajar: 12, tutor: 4 },
  { name: 'Sep', pelajar: 10, tutor: 8 },
  { name: 'Nov', pelajar: 15, tutor: 10 },
]

const pieData = [
  { name: 'Pelajar', value: 9310, color: '#000666' },
  { name: 'Tutor', value: 3140, color: '#00897B' },
]

const topTutors = [
  { id: 1, name: 'Irkham Wildan', subject: 'Ilmu Komputer', rating: 4.9, sessions: 128, income: 'Rp 1.150.000', best: true, image: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Mery Zahra', subject: 'Ilmu Komputer', rating: 4.8, sessions: 94, income: 'Rp 900.000', best: false, image: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Rafi Ardan', subject: 'Ilmu Komputer', rating: 4.8, sessions: 85, income: 'Rp 800.000', best: false, image: 'https://i.pravatar.cc/150?img=33' },
]

export default function LaporanAnalisis() {
  const navigate = useNavigate()

  // Center text for Donut Chart
  const renderCustomizedLabel = ({ cx, cy }) => {
    return (
      <g>
        <text x={cx} y={cy - 5} textAnchor="middle" dominantBaseline="central" className="text-xl font-bold fill-[#000666]">
          67
        </text>
        <text x={cx} y={cy + 15} textAnchor="middle" dominantBaseline="central" className="text-[10px] font-bold tracking-widest fill-slate-400">
          PENGGUNA
        </text>
      </g>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#000666] mb-2 tracking-tight">
          Laporan & Analisis
        </h1>
        <p className="text-slate-500 text-[15px]">
          Pantau seluruh aktivitas pembayaran, pendapatan, dan pencairan dana tutor.
        </p>
      </div>

      {/* 4 Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] flex items-center justify-center text-[#1D4ED8]">
              <Users className="w-6 h-6" />
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">+12%</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-slate-500 mb-1.5">Total Pengguna</div>
            <div className="text-[32px] font-extrabold text-[#000666] leading-none tracking-tight">12,450</div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ECFDF5] flex items-center justify-center text-emerald-600">
              <Zap className="w-6 h-6" />
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">+5%</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-slate-500 mb-1.5 leading-snug">Pengguna Aktif<br/>Bulanan</div>
            <div className="text-[32px] font-extrabold text-[#000666] leading-none tracking-tight">8,500</div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F3FF] flex items-center justify-center text-purple-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">+15%</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-slate-500 mb-1.5">Tutor Terverifikasi</div>
            <div className="text-[32px] font-extrabold text-[#000666] leading-none tracking-tight">842</div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[160px]">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF7ED] flex items-center justify-center text-amber-500">
              <Star className="w-6 h-6" />
            </div>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">Stabil</span>
          </div>
          <div>
            <div className="text-[13px] font-semibold text-slate-500 mb-1.5">Rating Rata-rata</div>
            <div className="text-[32px] font-extrabold text-[#000666] leading-none tracking-tight">4.8<span className="text-xl text-[#000666] ml-0.5">/5</span></div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        
        {/* Left Area Chart */}
        <div className="lg:col-span-8 bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col min-w-0">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#000666]">Pertumbuhan Pengguna Bulanan</h2>
              <p className="text-[13px] text-slate-400 mt-1">Januari - Desember 2023</p>
            </div>
            <div className="flex items-center gap-4 text-[12px] font-bold text-slate-600">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#000666]"></div> Pelajar</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#00897B]"></div> Tutor</div>
            </div>
          </div>
          
          <div className="w-full mt-4" style={{ height: '250px' }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <AreaChart data={growthData} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="colorPelajar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000666" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000666" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTutor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00897B" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00897B" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="pelajar" stroke="#000666" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPelajar)" />
                <Area type="monotone" dataKey="tutor" stroke="#00897B" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTutor)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Donut Chart */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-w-0">
          <h2 className="text-lg font-bold text-[#000666] w-full text-left mb-6">Distribusi Peran</h2>
          
          <div className="w-full relative" style={{ height: '230px' }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={75}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  {/* Custom Label in Center */}
                  <Cell fill="transparent" /> 
                </Pie>
                {/* A clever way to put text in center without using customized label which can be buggy with Recharts sometimes */}
              </PieChart>
            </ResponsiveContainer>
            
            {/* Absolute positioned center text to guarantee perfect centering */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[28px] font-extrabold text-[#000666] leading-none">12.4k</span>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 mt-1">PENGGUNA</span>
            </div>
          </div>

          <div className="w-full mt-6 space-y-3">
            <div className="flex justify-between items-center text-[13px]">
              <div className="flex items-center gap-2 text-[#000666] font-medium">
                <div className="w-2 h-2 rounded-full bg-[#000666]"></div> Pelajar
              </div>
              <span className="font-bold text-[#000666]">9,310 (75%)</span>
            </div>
            <div className="flex justify-between items-center text-[13px]">
              <div className="flex items-center gap-2 text-[#000666] font-medium">
                <div className="w-2 h-2 rounded-full bg-[#00897B]"></div> Tutor
              </div>
              <span className="font-bold text-[#000666]">3,140 (25%)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Top Tutors Table (Span 8) */}
        <div className="lg:col-span-8 bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 flex flex-col">
          <div className="px-7 py-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#000666]">Performa Tutor</h2>
            <button className="text-[13px] font-bold text-[#00897B] hover:text-teal-700 transition-colors">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-7 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Nama Tutor</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">Sesi</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">Rating</th>
                  <th className="px-3 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap">Pendapatan</th>
                  <th className="px-7 py-3 border-b border-slate-100 whitespace-nowrap"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-white">
                {topTutors.map((tutor) => (
                  <tr key={tutor.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-7 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10 border border-slate-100">
                          <AvatarImage src={tutor.image} alt={tutor.name} />
                          <AvatarFallback>{tutor.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-[#000666] text-[14px]">{tutor.name}</div>
                          <div className="text-[12px] text-slate-400 mt-0.5">{tutor.subject}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 font-bold text-slate-700 text-[14px] whitespace-nowrap">
                      {tutor.sessions}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 font-bold text-slate-700 text-[14px]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {tutor.rating}
                      </div>
                    </td>
                    <td className="px-3 py-4 font-bold text-[#00897B] text-[14px] whitespace-nowrap">
                      {tutor.income}
                    </td>
                    <td className="px-7 py-4 text-right whitespace-nowrap">
                      {tutor.best && (
                        <span className="bg-[#E6FCF5] text-[#00897B] text-[11px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap inline-block">
                          Performa Terbaik
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Laporan Komplain (Span 4) */}
        <div className="lg:col-span-4 bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col">
          <h2 className="text-lg font-bold text-[#000666] mb-5">Laporan Komplain</h2>
          
          {/* Alert Box */}
          <div className="bg-[#FEF2F2] rounded-[16px] p-5 flex justify-between items-center mb-6">
            <div>
              <div className="text-[12px] font-bold text-red-600 mb-1">Total Komplain Mendesak</div>
              <div className="text-[32px] font-bold text-red-600 leading-none">1</div>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500 opacity-80" strokeWidth={2} />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-4 flex-1">
            {/* Card 1 */}
            <div className="border border-slate-100 rounded-[16px] p-4 shadow-sm shadow-slate-100/50">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-[#000666] text-[14px]">Siska Putri</span>
                <span className="bg-emerald-100 text-emerald-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Selesai</span>
              </div>
              <p className="text-[13px] text-slate-500 italic mb-3">
                "Tutor tidak hadir pada jadwal yang telah ditentukan"
              </p>
              <div className="text-[11px] text-slate-400 font-medium">Layanan • 11 Okt 2026</div>
            </div>

            {/* Card 2 */}
            <div className="border border-slate-100 rounded-[16px] p-4 shadow-sm shadow-slate-100/50">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-[#000666] text-[14px]">Rizky Febrian</span>
                <span className="bg-blue-100 text-blue-700 text-[9px] font-bold px-2 py-0.5 rounded uppercase">Diproses</span>
              </div>
              <p className="text-[13px] text-slate-500 italic mb-3">
                "Pengembalian dana belum masuk ke..."
              </p>
              <div className="text-[11px] text-slate-400 font-medium">Pembayaran • 10 Okt 2026</div>
            </div>
          </div>

          <button 
            onClick={() => navigate('/admin/komplain')}
            className="w-full mt-6 py-3 rounded-[12px] border-2 border-[#E2E8F0] text-[#000666] font-bold text-[14px] hover:bg-slate-50 transition-colors"
          >
            Kelola
          </button>
        </div>

      </div>
    </div>
  )
}
