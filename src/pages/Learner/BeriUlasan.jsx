import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Star, CalendarDays, Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const sessionsData = {
  1: {
    tutorName: 'Arhan Pradana',
    tutorAvatar: 'https://i.pravatar.cc/150?img=11',
    subject: 'Pemrograman Web',
    date: '1 April 2026',
    materi: ['Pemrograman Dinamis', 'Analisis Big O', 'Teori Graf', 'Algoritma Sorting'],
  },
  2: {
    tutorName: 'Rafi Ardan',
    tutorAvatar: 'https://i.pravatar.cc/150?img=33',
    subject: 'Jaringan Komputer',
    date: '25 Maret 2026',
    materi: ['OSI Model', 'TCP/IP', 'Routing', 'Subnetting'],
  },
  3: {
    tutorName: 'Rahel Sahita',
    tutorAvatar: 'https://i.pravatar.cc/150?img=5',
    subject: 'Basis Data',
    date: '18 Maret 2026',
    materi: ['SQL Join', 'Normalisasi', 'Query Kompleks', 'ERD'],
  },
}

export default function BeriUlasan() {
  const navigate = useNavigate()
  const { id } = useParams()

  const session = sessionsData[id] || sessionsData[1]

  const [rating, setRating] = useState(4)
  const [hoverRating, setHoverRating] = useState(0)
  const [ulasan, setUlasan] = useState('')
  const [selectedMateri, setSelectedMateri] = useState([session.materi[0], session.materi[1]])
  const [submitted, setSubmitted] = useState(false)

  const toggleMateri = (m) => {
    setSelectedMateri((prev) =>
      prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
    )
  }

  const handleSubmit = () => {
    if (rating === 0) return
    setSubmitted(true)
    setTimeout(() => navigate(-1), 1800)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="h-20 w-20 rounded-full bg-teal-50 flex items-center justify-center mb-4">
          <Send className="h-9 w-9 text-teal-600" />
        </div>
        <h2 className="text-[24px] font-extrabold text-[#0a0f44] mb-2">Ulasan Terkirim!</h2>
        <p className="text-[14px] text-slate-500">Terima kasih atas penilaianmu. Kembali ke riwayat...</p>
      </div>
    )
  }

  return (
    <div className="pb-10 max-w-[780px]">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-slate-500 hover:text-[#0a0f44] mb-6 transition-colors text-lg font-bold"
      >
        <ArrowLeft className="h-5 w-5" />
      </button>

      {/* Hero */}
      <div className="relative mb-8">
        {/* Teal accent top-right */}
        <div className="absolute -top-6 right-0 h-28 w-64 rounded-2xl bg-gradient-to-br from-teal-50 to-teal-100 -z-0 opacity-70" />

        <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-[34px] sm:text-[42px] font-extrabold text-[#0a0f44] leading-tight tracking-tight">
              Bagaimana pengalaman belajarmu bersama{' '}
              <span className="text-teal-600">{session.tutorName}?</span>
            </h1>
            <p className="text-[14px] text-slate-500 mt-4 max-w-[420px] leading-relaxed">
              Masukanmu membantu kami menjaga kualitas pembelajaran dan meningkatkan pengalaman belajar bersama tutor.
            </p>
          </div>

          {/* Tutor Info Card */}
          <div className="flex-shrink-0 bg-white border border-slate-100 rounded-2xl p-4 flex gap-3 items-center shadow-sm min-w-[220px] border-l-[4px] border-l-teal-400">
            <Avatar className="h-14 w-14 rounded-xl flex-shrink-0">
              <AvatarImage src={session.tutorAvatar} alt={session.tutorName} className="object-cover" />
              <AvatarFallback className="bg-[#0a0f44] text-white rounded-xl">{session.tutorName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-[15px] font-bold text-[#0a0f44]">{session.tutorName}</p>
              <p className="text-[12px] text-teal-600 font-semibold">{session.subject}</p>
              <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                <CalendarDays className="h-3 w-3" />
                <span>Sesi : {session.date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-7 shadow-sm">

        {/* Penilaian Keseluruhan */}
        <div>
          <h2 className="text-[17px] font-bold text-teal-600 mb-1">Penilaian Keseluruhan</h2>
          <p className="text-[13px] text-slate-400 mb-4">
            Pilih jumlah bintang yang sesuai dengan pengalaman belajarmu.
          </p>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (hoverRating || rating) >= star
              return (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`h-9 w-9 transition-colors ${
                      active ? 'text-teal-500 fill-teal-500' : 'text-slate-200 fill-slate-200'
                    }`}
                  />
                </button>
              )
            })}
            <span className="ml-2 text-[13px] font-semibold text-slate-500">
              {rating === 1 ? 'Sangat Buruk' : rating === 2 ? 'Buruk' : rating === 3 ? 'Cukup' : rating === 4 ? 'Baik' : 'Sangat Baik'}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Ulasan Detail */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[17px] font-bold text-teal-600">Ulasan Detail</h2>
            <span className="text-[11px] text-slate-400 italic">Opsional, tetapi sangat membantu</span>
          </div>
          <textarea
            value={ulasan}
            onChange={(e) => setUlasan(e.target.value)}
            placeholder="Tulis pendapatmu tentang cara mengajar, kejelasan penjelasan, dan materi yang diberikan..."
            rows={5}
            className="w-full mt-3 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-100 transition resize-none leading-relaxed"
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Materi yang paling membantu */}
        <div>
          <h2 className="text-[11px] font-bold tracking-[0.14em] text-teal-600 uppercase mb-3">
            Materi Yang Paling Membantu?
          </h2>
          <div className="flex flex-wrap gap-2">
            {session.materi.map((m) => {
              const isSelected = selectedMateri.includes(m)
              return (
                <button
                  key={m}
                  onClick={() => toggleMateri(m)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold border-2 transition-all ${
                    isSelected
                      ? 'bg-teal-500 border-teal-500 text-white'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-teal-300 hover:text-teal-600'
                  }`}
                >
                  {m}
                </button>
              )
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-xl px-8 h-12 text-[15px] font-bold shadow-none gap-2 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
            Kirim Ulasan
          </Button>
        </div>
      </div>
    </div>
  )
}
