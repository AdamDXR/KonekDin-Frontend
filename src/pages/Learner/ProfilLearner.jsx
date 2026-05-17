import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  University,
  CalendarDays,
  History,
  CheckCircle2,
  Clock3,
  BookOpen,
  Pencil,
  Save,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// ─── Data dummy ───────────────────────────────────────────────────────────────
const profilData = {
  nama: 'Budi Santoso',
  foto: 'https://i.pravatar.cc/300?img=68',
  universitas: 'Universitas Dian Nuswantoro',
  email: 'budi@mhs.dinus.ac.id',
  phone: '+62 812 3456 7890',
  nim: 'A11.2024.12345',
  jurusan: 'Teknik Informatika',
  fakultas: 'Ilmu Komputer',
}

const statData = [
  {
    id: 'sesi',
    icon: <CheckCircle2 className="h-5 w-5 text-[#0d7c6b]" />,
    label: 'TOTAL SESI SELESAI',
    nilai: '12',
    growth: '+12.5%',
  },
  {
    id: 'jam',
    icon: <Clock3 className="h-5 w-5 text-[#0d7c6b]" />,
    label: 'JAM BELAJAR',
    nilai: '18 jam',
    growth: '+18.5%',
  },
  {
    id: 'matkul',
    icon: <BookOpen className="h-5 w-5 text-orange-400" />,
    label: 'MATA KULIAH DIPELAJARI',
    nilai: '3',
    growth: '+7%',
  },
]

const progressData = [
  { sesi: 'SESI 1', status: 'SELESAI', matkul: 'Basis Data', selesai: true },
  { sesi: 'SESI 2', status: 'SELESAI', matkul: 'Logika Informatika', selesai: true },
  { sesi: 'SESI 3', status: 'MENDATANG', matkul: 'Algoritma & Struktur Data', selesai: false },
]

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 flex-1 min-w-0">
      <div className="flex items-start justify-between mb-3">
        <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
          {item.icon}
        </div>
        <span className="text-xs font-semibold text-emerald-500">{item.growth}</span>
      </div>
      <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1">
        {item.label}
      </p>
      <p className="text-2xl font-extrabold text-[#0a0f44]">{item.nilai}</p>
    </div>
  )
}

// ─── ProgressItem ─────────────────────────────────────────────────────────────
function ProgressItem({ item, isLast }) {
  return (
    <div className="flex gap-3">
      {/* Dot + line */}
      <div className="flex flex-col items-center">
        <div
          className={`h-3 w-3 rounded-full flex-shrink-0 mt-0.5 ${
            item.selesai ? 'bg-[#0d7c6b]' : 'bg-slate-300'
          }`}
        />
        {!isLast && <div className="w-0.5 flex-1 mt-1 bg-slate-200" />}
      </div>
      {/* Teks */}
      <div className="pb-5">
        <p
          className={`text-[10px] font-bold tracking-wider ${
            item.selesai ? 'text-[#0d7c6b]' : 'text-slate-400'
          }`}
        >
          {item.sesi} – {item.status}
        </p>
        <p
          className={`text-sm font-semibold mt-0.5 ${
            item.selesai ? 'text-[#0a0f44]' : 'text-slate-400'
          }`}
        >
          {item.matkul}
        </p>
      </div>
    </div>
  )
}

// ─── InputField ───────────────────────────────────────────────────────────────
function InputField({ label, value, onChange, readOnly }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1.5">
        {label}
      </p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-700 outline-none transition
          ${
            readOnly
              ? 'bg-slate-50 border-slate-200 cursor-default'
              : 'bg-white border-[#0d7c6b] ring-2 ring-[#0d7c6b]/20 cursor-text'
          }`}
      />
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProfilLearner() {
  const navigate = useNavigate()

  const [profil, setProfil] = useState(profilData)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profilData)

  const handleEdit = () => {
    setDraft(profil)
    setEditing(true)
  }

  const handleSimpan = () => {
    setProfil(draft)
    setEditing(false)
    // TODO: kirim ke API
  }

  const setField = (key) => (e) =>
    setDraft((prev) => ({ ...prev, [key]: e.target.value }))

  const current = editing ? draft : profil

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* ── Hero ── */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Foto + tombol edit */}
        <div className="relative flex-shrink-0">
          <img
            src={profil.foto}
            alt={profil.nama}
            className="h-[140px] w-[120px] object-cover rounded-2xl border border-slate-100 shadow-sm"
          />
          <button className="absolute bottom-2 right-2 h-7 w-7 bg-[#0d7c6b] hover:bg-[#0a5c4e] rounded-full flex items-center justify-center shadow transition">
            <Pencil className="h-3.5 w-3.5 text-white" />
          </button>
        </div>

        {/* Nama + universitas + tombol navigasi */}
        <div className="flex-1">
          <h1 className="text-[32px] font-extrabold text-[#0a0f44] leading-tight">
            {profil.nama}
          </h1>
          <p className="flex items-center gap-2 text-sm text-slate-500 mt-1">
            <University className="h-4 w-4 text-slate-400" />
            {profil.universitas}
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <Button
              onClick={() => navigate('/learner/jadwal-belajar')}
              className="bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-5 py-2.5 h-auto rounded-xl text-sm gap-2"
            >
              <CalendarDays className="h-4 w-4" />
              Lihat Jadwal Belajar
            </Button>
            <Button
              onClick={() => navigate('/learner/riwayat-belajar')}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-5 py-2.5 h-auto rounded-xl text-sm gap-2"
            >
              <History className="h-4 w-4" />
              Lihat Riwayat Belajar
            </Button>
          </div>
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="flex flex-col sm:flex-row gap-4">
        {statData.map((item) => (
          <StatCard key={item.id} item={item} />
        ))}
      </div>

      {/* ── Informasi Pribadi + Progress Belajar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Informasi Pribadi — 2/3 lebar */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#0a0f44]">Informasi Pribadi</h2>
            {editing ? (
              <button
                onClick={handleSimpan}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0d7c6b] hover:text-[#0a5c4e] transition"
              >
                <Save className="h-3.5 w-3.5" />
                Simpan Perubahan
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0d7c6b] hover:text-[#0a5c4e] transition"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit Profil
              </button>
            )}
          </div>

          <div className="space-y-4">
            {/* Email + Phone — 2 kolom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Email"
                value={current.email}
                onChange={setField('email')}
                readOnly={!editing}
              />
              <InputField
                label="Phone Number"
                value={current.phone}
                onChange={setField('phone')}
                readOnly={!editing}
              />
            </div>

            <InputField
              label="Nama"
              value={current.nama}
              onChange={setField('nama')}
              readOnly={!editing}
            />
            <InputField
              label="NIM"
              value={current.nim}
              onChange={setField('nim')}
              readOnly={!editing}
            />
            <InputField
              label="Jurusan"
              value={current.jurusan}
              onChange={setField('jurusan')}
              readOnly={!editing}
            />
            <InputField
              label="Fakultas"
              value={current.fakultas}
              onChange={setField('fakultas')}
              readOnly={!editing}
            />
          </div>
        </div>

        {/* Progress Belajar — 1/3 lebar */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-base font-bold text-[#0a0f44] mb-5">Progress Belajar</h2>
          <div>
            {progressData.map((item, i) => (
              <ProgressItem
                key={item.sesi}
                item={item}
                isLast={i === progressData.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Banner CTA ── */}
      <div className="bg-[#0a0f44] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <h3 className="text-xl font-extrabold text-white">Yuk daftar jadi tutor!</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-sm leading-relaxed">
            "Bagikan keahlianmu dan bantu mahasiswa lain berkembang bersama."
          </p>
        </div>
        <Button
          className="flex-shrink-0 bg-white text-[#0a0f44] hover:bg-slate-100 font-bold px-6 py-2.5 h-auto rounded-xl text-sm transition-colors shadow-sm"
        >
          Daftar Tutor
        </Button>
      </div>

    </div>
  )
}
