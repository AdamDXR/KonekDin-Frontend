import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Edit3, CalendarDays, History, BookOpen, X } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const progressSesi = [
  { id: 11, label: 'SESI 11 - SELESAI', title: 'Review Dasar-Dasar SQL', done: true },
  { id: 12, label: 'SESI 12 - SELESAI', title: 'Optimasi Query Kompleks', done: true },
  { id: 13, label: 'SESI 13 - MENDATANG', title: 'Algoritma & Struktur Data', done: false },
]

export default function ProfilLearner() {
  const [form, setForm] = useState({
    email: 'budi@mhs.dinus.ac.id',
    phone: '+62 812 3456 7890',
    nama: 'Budi Susanto',
    nim: 'A11.2024.12345',
    jurusan: 'Teknik Informatika',
    fakultas: 'Ilmu Komputer',
  })
  const [focuses, setFocuses] = useState(['Algoritma', 'Basis Data'])
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }
  const removeFocus = (item) => setFocuses(focuses.filter((f) => f !== item))

  return (
    <div className="pb-10 max-w-[960px]">

      {/* Hero */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-5">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="relative flex-shrink-0">
            <Avatar className="h-[130px] w-[130px] rounded-2xl">
              <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Budi Santoso" className="object-cover" />
              <AvatarFallback className="bg-[#0a0f44] text-white text-4xl rounded-2xl">BS</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-2 right-2 h-8 w-8 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md hover:bg-teal-700 transition-colors">
              <Edit3 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#0a0f44] bg-slate-100 px-3 py-1 rounded-full">
                MAHASISWA
              </span>
              <span className="flex items-center gap-1 text-[11px] font-bold text-yellow-600 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" /> Verified Learner
              </span>
            </div>
            <h1 className="text-[38px] font-extrabold text-[#0a0f44] leading-tight tracking-tight">Budi Santoso</h1>
            <p className="text-[14px] text-slate-500 mt-1 flex items-center gap-1.5">
              🏛 Universitas Dian Nuswantoro
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link to="/learner/jadwal-belajar">
                <Button className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-xl h-10 px-5 text-sm font-semibold shadow-none gap-2">
                  <CalendarDays className="h-4 w-4" /> Lihat Jadwal Mendatang
                </Button>
              </Link>
              <Link to="/learner/riwayat-belajar">
                <Button variant="outline" className="rounded-xl h-10 px-5 text-sm font-semibold border-slate-200 shadow-none text-[#0a0f44] gap-2">
                  <History className="h-4 w-4" /> Lihat Semua Riwayat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        {[
          { label: 'TOTAL SESI SELESAI', value: '12', sub: '↑ +2 bln ini', accent: 'border-l-[#0a0f44]' },
          { label: 'MATA KULIAH DIPELAJARI', value: '4', sub: 'Subjek Aktif', accent: 'border-l-teal-500' },
          { label: 'KEHADIRAN SESI', value: '12', sub: '↑ +2 bln ini', accent: 'border-l-orange-400' },
        ].map((s) => (
          <div key={s.label} className={`bg-white rounded-2xl border border-slate-100 p-5 border-l-[4px] ${s.accent}`}>
            <p className="text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-2">{s.label}</p>
            <p className="text-[34px] font-extrabold text-[#0a0f44] leading-none">{s.value}</p>
            <p className="text-[12px] text-teal-600 font-semibold mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Informasi Pribadi */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[18px] font-bold text-[#0a0f44]">Informasi Pribadi</h2>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-teal-600 hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" />
              {saved ? '✓ Tersimpan!' : 'Simpan Perubahan'}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'EMAIL', name: 'email', span: false },
              { label: 'PHONE NUMBER', name: 'phone', span: false },
              { label: 'NAMA', name: 'nama', span: true },
              { label: 'NIM', name: 'nim', span: true },
              { label: 'JURUSAN', name: 'jurusan', span: true },
              { label: 'FAKULTAS', name: 'fakultas', span: true },
            ].map((field) => (
              <div key={field.name} className={field.span ? 'sm:col-span-2' : ''}>
                <label className="block text-[10px] font-bold tracking-[0.12em] text-slate-400 uppercase mb-1.5">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-100 transition"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Current Focus */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="text-[16px] font-bold text-[#0a0f44] mb-1">Current Focus</h3>
            <p className="text-[12px] text-slate-400 mb-3 leading-relaxed">
              Subjek yang sedang diperdalam atau membutuhkan bimbingan tambahan:
            </p>
            <div className="flex flex-wrap gap-2">
              {focuses.map((f) => (
                <span key={f} className="flex items-center gap-1.5 text-[12px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-full">
                  {f}
                  <button onClick={() => removeFocus(f)} className="text-teal-400 hover:text-teal-700">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Progress Belajar */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h3 className="text-[16px] font-bold text-[#0a0f44] mb-4">Progress Belajar</h3>
            <div className="relative pl-5 space-y-4">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-100" />
              {progressSesi.map((s) => (
                <div key={s.id} className="relative">
                  <div className={`absolute -left-5 top-1 h-3.5 w-3.5 rounded-full border-2 border-white z-10 ${s.done ? 'bg-teal-500' : 'bg-slate-300'}`} />
                  <p className={`text-[10px] font-bold tracking-[0.1em] uppercase ${s.done ? 'text-teal-600' : 'text-slate-400'}`}>
                    {s.label}
                  </p>
                  <p className="text-[13px] font-semibold text-[#0a0f44] mt-0.5">{s.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Jadi Tutor */}
      <div className="bg-[#0a0f44] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-[22px] font-extrabold text-white">Yuk daftar jadi tutor!</h3>
          <p className="text-[13px] text-indigo-300 mt-1">
            "Bagikan keahlianmu dan bantu mahasiswa lain berkembang bersama."
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl px-6 h-11 text-[14px] font-bold shadow-none flex-shrink-0">
          Daftar Sekarang
        </Button>
      </div>
    </div>
  )
}
