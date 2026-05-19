import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Star,
  RefreshCw,
  MessageSquarePlus,
  ChevronDown,
  ArrowLeft,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// ─── Data dummy ───────────────────────────────────────────────────────────────
const riwayatList = [
  {
    id: '1',
    tutorNama: 'Arhan Pradana',
    tutorFoto: 'https://i.pravatar.cc/150?img=11',
    tutorRating: 4.9,
    mataKuliah: 'Pemrograman Web',
    tanggal: '1 April 2026',
    jam: '09:30 - 12:00',
    ratingUser: 4,
    sudahDiulas: true,
    textUlasan: 'Sangat mudah dipahami dan sabar dalam menjelaskan materi yang sulit.',
  },
  {
    id: '2',
    tutorNama: 'Rafi Ardan',
    tutorFoto: 'https://i.pravatar.cc/150?img=15',
    tutorRating: 4.9,
    mataKuliah: 'Jaringan Komputer',
    tanggal: '25 Maret 2026',
    jam: '07:00 - 08.40',
    ratingUser: 4,
    sudahDiulas: true,
    textUlasan: 'Materinya sangat daging, tapi mungkin bisa sedikit diperlambat tempo mengajarnya.',
  },
  {
    id: '3',
    tutorNama: 'Rahel Sahita',
    tutorFoto: 'https://i.pravatar.cc/150?img=47',
    tutorRating: 4.7,
    mataKuliah: 'Basis Data',
    tanggal: '18 Maret 2026',
    jam: '15.30 - 17.10',
    ratingUser: null,
    sudahDiulas: false,
  },
]

const PAGE_SIZE = 3

// ─── StarDisplay: bintang statis ──────────────────────────────────────────────
function StarDisplay({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

// ─── StarPicker: bintang interaktif ──────────────────────────────────────────
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  const display = hovered || value

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
        >
          <Star
            className={`h-8 w-8 transition-colors ${
              star <= display ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

// ─── RiwayatCard ──────────────────────────────────────────────────────────────
function RiwayatCard({ item, onBeriUlasan, onBelajarLagi }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Foto + rating badge tutor */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-[72px] w-[72px] rounded-xl border border-slate-100">
              <AvatarImage src={item.tutorFoto} alt={item.tutorNama} />
              <AvatarFallback className="rounded-xl bg-[#0a0f44] text-white text-lg font-bold">
                {item.tutorNama.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 bg-amber-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow">
              ⭐ {item.tutorRating}
            </div>
          </div>

          {/* Info sesi */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-bold text-[#0d7c6b] leading-tight">
              {item.mataKuliah}
            </h3>
            <p className="text-sm text-slate-600 font-medium mt-0.5">{item.tutorNama}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Calendar className="h-3.5 w-3.5" />
                {item.tanggal}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="h-3.5 w-3.5" />
                {item.jam}
              </span>
            </div>
            
            {/* Teks Ulasan */}
            {item.sudahDiulas && item.textUlasan && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mt-2">
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  "{item.textUlasan}"
                </p>
              </div>
            )}
          </div>

          {/* Rating user jika sudah diulas */}
          {item.sudahDiulas && (
            <div className="flex-shrink-0 ml-auto">
              <StarDisplay rating={item.ratingUser} />
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100 my-4" />

        {/* Tombol aksi */}
        <div className="flex justify-end gap-3">
          {!item.sudahDiulas && (
            <Button
              onClick={() => onBeriUlasan(item)}
              variant="outline"
              className="border-[#0d7c6b] text-[#0d7c6b] hover:bg-[#e6f4f1] font-semibold px-4 py-2 h-auto rounded-xl text-sm gap-2"
            >
              <MessageSquarePlus className="h-4 w-4" />
              Beri Ulasan
            </Button>
          )}
          <Button
            onClick={() => onBelajarLagi(item)}
            className="bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-4 py-2 h-auto rounded-xl text-sm gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Belajar Lagi
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── FormUlasan ───────────────────────────────────────────────────────────────
function FormUlasan({ tutor, onBack, onSubmit }) {
  const [rating, setRating] = useState(4)
  const [ulasan, setUlasan] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleKirim = () => {
    if (rating === 0) return
    // TODO: ganti dengan API call
    console.log('Submit ulasan:', { tutorId: tutor.id, rating, ulasan })
    setSubmitted(true)
    setTimeout(() => onSubmit(tutor.id, rating, ulasan), 1500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Kembali */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#0a0f44] mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      {/* Hero: heading + info card tutor */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
        <div className="max-w-lg">
          <h1 className="text-[32px] sm:text-[38px] font-extrabold text-[#0a0f44] leading-tight">
            Bagaimana pengalaman belajarmu bersama{' '}
            <span className="text-[#0d7c6b]">{tutor.tutorNama}?</span>
          </h1>
          <p className="text-sm text-slate-500 mt-4 leading-relaxed max-w-sm">
            Masukanmu membantu kami menjaga kualitas pembelajaran dan meningkatkan
            pengalaman belajar bersama tutor.
          </p>
        </div>

        {/* Info card tutor */}
        <div className="flex-shrink-0 bg-[#f0faf8] border border-[#c8ede8] rounded-2xl p-4 flex items-center gap-4 min-w-[240px]">
          <div className="w-1 self-stretch bg-[#0d7c6b] rounded-full flex-shrink-0" />
          <Avatar className="h-12 w-12 rounded-xl border border-slate-100 flex-shrink-0">
            <AvatarImage src={tutor.tutorFoto} alt={tutor.tutorNama} />
            <AvatarFallback className="rounded-xl bg-[#0a0f44] text-white font-bold">
              {tutor.tutorNama.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold text-[#0a0f44]">{tutor.tutorNama}</p>
            <p className="text-xs font-semibold text-[#0d7c6b] mt-0.5">{tutor.mataKuliah}</p>
            <p className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <Calendar className="h-3 w-3" />
              Sesi : {tutor.tanggal}
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
        {/* Penilaian Sesi */}
        <div className="mb-6">
          <h2 className="text-base font-bold text-[#0d7c6b] mb-1">Penilaian Sesi</h2>
          <p className="text-sm text-slate-500 mb-4">
            Pilih jumlah bintang yang sesuai dengan pengalaman belajarmu.
          </p>
          <StarPicker value={rating} onChange={setRating} />
        </div>

        <div className="h-px bg-slate-200 mb-6" />

        {/* Ulasan Detail */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-[#0d7c6b]">Ulasan Detail</h2>
            <span className="text-xs text-slate-400 italic">Opsional, tetapi sangat membantu</span>
          </div>
          <textarea
            value={ulasan}
            onChange={(e) => setUlasan(e.target.value)}
            placeholder="Tulis pendapatmu tentang cara mengajar, kejelasan penjelasan, dan materi yang diberikan..."
            rows={5}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#0d7c6b]/30 focus:border-[#0d7c6b] transition"
          />
        </div>

        <Button
          onClick={handleKirim}
          disabled={rating === 0 || submitted}
          className="bg-[#0a0f44] hover:bg-[#141a6e] disabled:opacity-60 text-white font-semibold px-8 py-3 h-auto rounded-xl text-sm min-w-[160px]"
        >
          {submitted ? 'Ulasan Terkirim ✓' : 'Kirim Ulasan'}
        </Button>
      </div>
    </div>
  )
}

// ─── Main Page (state machine) ────────────────────────────────────────────────
// view: 'list' | 'form'
export default function RiwayatBelajar() {
  const navigate = useNavigate()
  const [data, setData] = useState(riwayatList)
  const [tampil, setTampil] = useState(PAGE_SIZE)
  const [view, setView] = useState('list')         // 'list' atau 'form'
  const [selectedItem, setSelectedItem] = useState(null)

  const handleBeriUlasan = (item) => {
    setSelectedItem(item)
    setView('form')
  }

  const handleBack = () => {
    setView('list')
    setSelectedItem(null)
  }

  // Setelah submit: tandai item sebagai sudah diulas + simpan rating dan teks ulasan
  const handleSubmitUlasan = (tutorId, rating, textUlasan) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === tutorId
          ? { ...item, sudahDiulas: true, ratingUser: rating, textUlasan }
          : item
      )
    )
    setView('list')
    setSelectedItem(null)
  }

  // ── Render form ulasan ──
  if (view === 'form' && selectedItem) {
    return (
      <FormUlasan
        tutor={selectedItem}
        onBack={handleBack}
        onSubmit={handleSubmitUlasan}
      />
    )
  }

  // ── Render list riwayat ──
  const tampilList = data.slice(0, tampil)
  const adaLagi = tampil < data.length

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-[26px] font-extrabold text-[#0a0f44] leading-tight">
          Riwayat Sesi Belajar
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Lihat kembali perjalanan belajar Anda dan atur sesi lanjutan dengan tutor favorit Anda.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {tampilList.map((item) => (
          <RiwayatCard
            key={item.id}
            item={item}
            onBeriUlasan={handleBeriUlasan}
            onBelajarLagi={() => navigate('/learner/cari-tutor')}
          />
        ))}
      </div>

      {adaLagi && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setTampil((prev) => prev + PAGE_SIZE)}
            className="flex items-center gap-2 text-sm font-semibold text-[#0d7c6b] hover:text-[#0a5c4e] transition-colors"
          >
            Tampilkan Lebih Banyak
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  )
}