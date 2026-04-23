import { useState } from 'react'
import { Search, Calendar, Clock, Monitor, SlidersHorizontal } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const statusFilters = ['Semua Status', 'Selesai', 'Terjadwal']

const transactionsData = [
  {
    id: 'TRX-99281-A',
    course: 'Kalkulus Lanjut II',
    learner: 'Siti Aisyah',
    tutor: 'Dr. Budi Santoso',
    date: '12 Okt 2023, 14:00 WIB',
    duration: '90 Menit',
    status: 'SELESAI',
    avatars: ['https://i.pravatar.cc/150?img=47', 'https://i.pravatar.cc/150?img=12'],
  },
  {
    id: 'TRX-99282-B',
    course: 'Algoritma & Struktur Data',
    learner: 'Rizky Pratama',
    tutor: 'Maya Indah, M.Kom',
    date: 'Besok, 10:00 WIB',
    duration: 'Sesi Virtual',
    status: 'TERJADWAL',
    avatars: ['https://i.pravatar.cc/150?img=3', 'https://i.pravatar.cc/150?img=25'],
  },
  {
    id: 'TRX-99279-C',
    course: 'Fisika Dasar: Termodinamika',
    learner: 'Andi Nugroho',
    tutor: 'Ir. Hendra Kusuma',
    date: '10 Okt 2023, 16:30 WIB',
    duration: '120 Menit',
    status: 'SELESAI',
    avatars: [null, 'https://i.pravatar.cc/150?img=68'],
  },
]

export default function LogTransaksi() {
  const [activeFilter, setActiveFilter] = useState('Semua Status')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTransactions = transactionsData.filter(trx => {
    const matchFilter =
      activeFilter === 'Semua Status' ||
      trx.status === activeFilter.toUpperCase()
    const matchSearch =
      trx.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.learner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.tutor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Riwayat Interaksi</h1>
          <p className="text-base text-slate-600 mt-3 max-w-xl leading-relaxed">
            Pantau seluruh aktivitas sesi pembelajaran antara pelajar dan tutor. Tinjau status, matakuliah, dan log waktu untuk memastikan kualitas ekosistem akademik.
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 min-w-[180px]">
          <p className="text-sm text-slate-500 font-medium">Total Sesi (Bulan Ini)</p>
          <p className="text-3xl font-bold text-[#0a0f44] mt-1">1,284</p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Cari ID Transaksi, Nama Tutor, atau Pelajar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 border-transparent bg-transparent h-11 text-sm shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {statusFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter
                  ? 'bg-[#EEF2FF] text-[#1D4ED8] border border-[#C7D2FE]'
                  : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium text-slate-600 border border-slate-200 hover:bg-slate-100 transition-colors">
            <SlidersHorizontal className="h-4 w-4" />
            Filter Lanjut
          </button>
        </div>
      </div>

      {/* Transaction List */}
      <div className="flex flex-col gap-4">
        {filteredTransactions.map((trx) => (
          <div
            key={trx.id}
            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar Stack */}
              <div className="flex -space-x-3 flex-shrink-0">
                {trx.avatars.map((avatar, i) => (
                  <Avatar key={i} className="h-11 w-11 ring-2 ring-white">
                    {avatar ? (
                      <AvatarImage src={avatar} alt="User" />
                    ) : null}
                    <AvatarFallback className="bg-[#0a0f44] text-white text-xs font-semibold">
                      {i === 0 ? trx.learner.split(' ').map(n => n[0]).join('').slice(0,2) : 'TU'}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>

              {/* Course Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-slate-900">{trx.course}</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Pelajar: <span className="font-semibold text-slate-700">{trx.learner}</span>
                </p>
                <p className="text-sm text-slate-500">
                  Tutor: <span className="font-semibold text-slate-700">{trx.tutor}</span>
                </p>
              </div>

              {/* Date & Duration */}
              <div className="flex flex-col gap-1.5 text-sm text-slate-600 min-w-[180px]">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-slate-400" />
                  <span className={trx.status === 'TERJADWAL' ? 'font-bold text-slate-900' : ''}>
                    {trx.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {trx.duration === 'Sesi Virtual' ? (
                    <Monitor className="h-4 w-4 text-slate-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-slate-400" />
                  )}
                  <span>Durasi: {trx.duration}</span>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex flex-col items-end gap-2 min-w-[120px]">
                <span className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${
                  trx.status === 'SELESAI'
                    ? 'bg-teal-50 text-teal-700'
                    : 'bg-[#0a0f44] text-white'
                }`}>
                  {trx.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">{trx.id}</span>
              </div>

              {/* Detail Button */}
              <button className="text-sm font-semibold text-teal-600 hover:text-teal-700 whitespace-nowrap">
                Detail Sesi
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 pt-4">
        <button className="h-10 w-10 rounded-lg flex items-center justify-center text-sm text-slate-400 hover:bg-slate-100">‹</button>
        <button className="h-10 w-10 rounded-lg flex items-center justify-center text-sm font-bold bg-[#0a0f44] text-white">1</button>
        <button className="h-10 w-10 rounded-lg flex items-center justify-center text-sm text-slate-600 hover:bg-slate-100">2</button>
        <button className="h-10 w-10 rounded-lg flex items-center justify-center text-sm text-slate-600 hover:bg-slate-100">3</button>
        <button className="h-10 w-10 rounded-lg flex items-center justify-center text-sm text-slate-400 hover:bg-slate-100">›</button>
      </div>
    </div>
  )
}
