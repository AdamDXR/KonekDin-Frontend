import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Star,
  RefreshCw,
  MessageSquarePlus,
  ChevronDown,
  ArrowLeft,
  XCircle,
  Search
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import axios from 'axios'

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
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Foto + rating badge tutor */}
          <div className="relative flex-shrink-0">
            <Avatar className="h-[72px] w-[72px] rounded-xl border border-slate-100">
              <AvatarImage src={item.tutorFoto} alt={item.tutorNama} className="object-cover" />
              <AvatarFallback className="rounded-xl bg-[#0a0f44] text-white text-lg font-bold">
                {item.tutorNama ? item.tutorNama.charAt(0) : 'T'}
              </AvatarFallback>
            </Avatar>
            <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                  <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" /> {item.tutorRating}
                </div>
          </div>

          {/* Info sesi */}
          <div className="flex-1 min-w-0">
            <h3 className="text-[16px] font-bold text-[#0d7c6b] leading-tight">
              {item.mataKuliah}
            </h3>
            <p className="text-sm text-slate-600 font-medium mt-0.5">{item.tutorNama}</p>
            <div className="flex flex-wrap items-center gap-3 mt-2 mb-2">
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="h-3.5 w-3.5" />
                {item.tanggal}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
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
              className="border-[#0d7c6b] text-[#0d7c6b] hover:bg-[#e6f4f1] font-semibold px-4 py-2 h-auto rounded-xl text-sm gap-2 transition-colors"
            >
              <MessageSquarePlus className="h-4 w-4" />
              Beri Ulasan
            </Button>
          )}
          <Button
            onClick={() => onBelajarLagi(item)}
            className="bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-4 py-2 h-auto rounded-xl text-sm gap-2 shadow-sm transition-colors"
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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleKirim = async () => {
    if (rating === 0) return
    setIsSubmitting(true)
    setError(null)
    
    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }
      
      await axios.post(`http://127.0.0.1:8000/api/learner/bookings/${tutor.id}/reviews`, {
        rating,
        comment: ulasan
      }, { headers })
      
      setSubmitted(true)
      setTimeout(() => onSubmit(tutor.id, rating, ulasan), 1500)
    } catch (err) {
      console.error("Gagal mengirim ulasan:", err)
      setError(err.response?.data?.message || err.message || "Gagal mengirim ulasan")
      setIsSubmitting(false)
    }
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
            <AvatarImage src={tutor.tutorFoto} alt={tutor.tutorNama} className="object-cover" />
            <AvatarFallback className="rounded-xl bg-[#0a0f44] text-white font-bold">
              {tutor.tutorNama ? tutor.tutorNama.charAt(0) : 'T'}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-bold text-[#0a0f44]">{tutor.tutorNama}</p>
            <p className="text-xs font-semibold text-[#0d7c6b] mt-0.5">{tutor.mataKuliah}</p>
            <p className="flex items-center gap-1 text-xs text-slate-500 mt-1 font-medium">
              <Calendar className="h-3 w-3" />
              Sesi : {tutor.tanggal}
            </p>
          </div>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white shadow-sm rounded-2xl border border-slate-200 p-6 sm:p-8">
        
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center gap-2">
            <XCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      
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
            <span className="text-xs text-slate-400 italic font-medium">Opsional, tetapi sangat membantu</span>
          </div>
          <textarea
            value={ulasan}
            onChange={(e) => setUlasan(e.target.value)}
            disabled={isSubmitting || submitted}
            placeholder="Tulis pendapatmu tentang cara mengajar, kejelasan penjelasan, dan materi yang diberikan..."
            rows={5}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#0d7c6b]/30 focus:border-[#0d7c6b] transition disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>

        <Button
          onClick={handleKirim}
          disabled={rating === 0 || submitted || isSubmitting}
          className="bg-[#0a0f44] hover:bg-[#141a6e] disabled:opacity-60 text-white font-semibold px-8 py-3 h-auto rounded-xl text-sm min-w-[160px] shadow-sm transition-colors"
        >
          {submitted ? 'Ulasan Terkirim ✓' : isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
        </Button>
      </div>
    </div>
  )
}

// ─── Main Page (state machine) ────────────────────────────────────────────────
// view: 'list' | 'form'
export default function RiwayatBelajar() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [tampil, setTampil] = useState(PAGE_SIZE)
  const [view, setView] = useState('list')         // 'list' atau 'form'
  const [selectedItem, setSelectedItem] = useState(null)

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  const formatTimeRange = (slots) => {
    if (!slots || slots.length === 0) return '-'
    const slot = slots[0] || slots
    if (slot && slot.start_time && slot.end_time) {
       return `${slot.start_time.substring(0, 5)} - ${slot.end_time.substring(0, 5)} WIB`
    }
    return '-'
  }

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
           console.warn("Token tidak ditemukan, mengarahkan ke halaman login")
           window.location.href = '/login'
           return
        }

        const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get('http://127.0.0.1:8000/api/learner/history', { headers })
        
        if (response.data && response.data.data) {
           // Mapping API data to RiwayatCard format
           const formattedData = response.data.data.map(order => {
             const tutor = order.tutor || {}
             const course = order.course || {}
             const review = order.review || null
             
             return {
               id: order.id,
               tutorId: tutor.tutor_id,
               tutorNama: tutor.name || 'Tutor',
               tutorFoto: tutor.avatar ? `http://127.0.0.1:8000/storage/${tutor.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || 'Tutor')}&background=random`,
               tutorRating: Number(tutor.rating_avg) || 0,
               mataKuliah: course.name || 'Mata Kuliah',
               tanggal: formatDate(order.booking_date),
               jam: formatTimeRange(order.slots),
               ratingUser: review ? review.rating : null,
               sudahDiulas: review !== null,
               textUlasan: review ? review.comment : ''
             }
           })
           setData(formattedData)
        }
      } catch (err) {
        console.error("Gagal mengambil riwayat belajar:", err)
        
        if (err.response?.status === 401) {
           localStorage.removeItem('token')
           window.location.href = '/login'
           return
        }

        setErrorMsg(err.response?.data?.message || err.message || "Gagal mengambil data riwayat")
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const handleBeriUlasan = (item) => {
    setSelectedItem(item)
    setView('form')
    window.scrollTo(0, 0)
  }

  const handleBack = () => {
    setView('list')
    setSelectedItem(null)
    window.scrollTo(0, 0)
  }

  const handleSubmitUlasan = (bookingId, rating, textUlasan) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === bookingId
          ? { ...item, sudahDiulas: true, ratingUser: rating, textUlasan }
          : item
      )
    )
    setView('list')
    setSelectedItem(null)
    window.scrollTo(0, 0)
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
    <div className="flex flex-col min-h-full pb-10">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">
            Riwayat Sesi Belajar
          </h1>
          <p className="text-slate-500">
            Lihat kembali riwayat perjalanan belajarmu.
          </p>
        </div>
      </div>

      {errorMsg ? (
        <div className="flex flex-col justify-center items-center h-64 text-red-500 bg-red-50 rounded-2xl border border-red-100">
          <XCircle className="w-12 h-12 mb-3 text-red-400" />
          <p className="font-bold text-lg mb-2">Gagal Memuat Riwayat</p>
          <p className="text-sm">{errorMsg}</p>
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center h-64 text-slate-500 animate-pulse">
           Memuat riwayat belajar...
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-80 text-slate-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
           <Search className="w-16 h-16 mb-4 text-slate-300" />
           <p className="font-bold text-xl text-slate-700 mb-2">Belum Ada Riwayat Belajar</p>
           <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">Kamu belum menyelesaikan sesi belajar apapun. Yuk selesaikan kelas pertamamu!</p>
           <Button 
             onClick={() => navigate('/learner/cari-tutor')}
             className="bg-[#1a1a4b] hover:bg-[#121235] text-white rounded-xl px-8 h-12 font-bold shadow-sm"
           >
             Cari Tutor Sekarang
           </Button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
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
                className="flex items-center gap-2 text-sm font-bold text-[#0d7c6b] hover:text-[#0a5c4e] hover:bg-[#e6f4f1] py-2 px-6 rounded-full transition-colors border border-transparent hover:border-[#0d7c6b]/20"
              >
                Tampilkan Lebih Banyak
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}