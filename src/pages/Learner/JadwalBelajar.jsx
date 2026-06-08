import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  Calendar,
  Clock,
  CheckCircle2,
  Plus,
  MessageSquare,
  Star,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// Data dummy jadwal — ganti dengan API call nanti
const jadwalList = [
  {
    id: 1,
    tutorNama: 'Irkham Wildan',
    tutorFoto: 'https://i.pravatar.cc/150?img=11',
    tutorRating: 4.9,
    mataKuliah: 'Algoritma & Struktur Data',
    tanggal: 'Senin, 14 Oktober 2026',
    jamMulai: '12.30',
    jamSelesai: '14.10',
    timezone: 'WIB',
  },
]

function JadwalCard({ jadwal, onHubungi, isHighlighted, cardRef }) {
  return (
    <div ref={cardRef} className={`rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-md ${isHighlighted ? "ring-2 ring-[#0d7c6b] bg-[#f0fbf8] -translate-y-1" : "bg-white"}`}>
      <div className="flex">
        {/* Accent bar kiri */}
        <div className="w-1.5 bg-[#0d7c6b] rounded-l-2xl flex-shrink-0" />

        <div className="flex-1 p-5 sm:p-6">
          {/* Baris atas: info tutor + tombol hubungi */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Foto tutor + badge rating */}
              <div className="relative flex-shrink-0">
                <Avatar className="h-[72px] w-[72px] rounded-xl border border-slate-100">
                  <AvatarImage src={jadwal.tutorFoto} alt={jadwal.tutorNama} />
                  <AvatarFallback className="rounded-xl bg-[#0a0f44] text-white text-lg font-bold">
                    {jadwal.tutorNama.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                  <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" /> {jadwal.tutorRating}
                </div>
              </div>

              <div>
                <h3 className="text-[17px] font-bold text-[#0a0f44] leading-tight">
                  {jadwal.tutorNama}
                </h3>
                <p className="text-sm font-semibold text-[#0d7c6b] mt-0.5">
                  Mata Kuliah : {jadwal.mataKuliah}
                </p>
              </div>
            </div>

            {/* Tombol hubungi */}
            <Button
              onClick={() => onHubungi(jadwal)}
              className="flex-shrink-0 bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-5 py-2.5 h-auto rounded-xl text-sm gap-2 shadow-sm"
            >
              <MessageSquare className="h-4 w-4" />
              Hubungi Tutor
            </Button>
          </div>

          <div className="h-px bg-slate-100 my-4" />

          {/* Baris bawah: tanggal, jam, pengingat */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <Calendar className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">{jadwal.tanggal}</span>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <Clock className="h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-700">
                {jadwal.jamMulai} - {jadwal.jamSelesai} {jadwal.timezone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyCard({ onCariTutor }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-10 flex flex-col items-center text-center gap-4">
      <div className="h-12 w-12 rounded-full border-2 border-slate-300 flex items-center justify-center">
        <Plus className="h-6 w-6 text-slate-400" />
      </div>
      <div>
        <h4 className="text-base font-bold text-[#0a0f44]">Ingin belajar topik lain?</h4>
        <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
          Temukan tutor terbaik untuk membantumu memahami materi kuliah yang sulit.
        </p>
      </div>
      <Button
        onClick={onCariTutor}
        className="bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-6 py-2.5 h-auto rounded-xl text-sm mt-1"
      >
        Cari Tutor Sekarang
      </Button>
    </div>
  )
}

export default function JadwalBelajar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tutorParam = searchParams.get('tutor')

  const [jadwal] = useState(jadwalList)
  const [highlightedId, setHighlightedId] = useState(null)
  const highlightRef = useRef(null)

  useEffect(() => {
    if (!tutorParam) return;
    const idx = jadwal.findIndex(
      (j) => j.tutorNama.toLowerCase() === tutorParam.toLowerCase()
    );
    if (idx === -1) return;

    setHighlightedId(jadwal[idx].id);

    const timer = setTimeout(() => setHighlightedId(null), 3000);
    return () => clearTimeout(timer);
  }, [tutorParam, jadwal]);

  useEffect(() => {
    if (highlightedId && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [highlightedId]);

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">
          Jadwal Sesi Belajar
        </h1>
        <p className="text-slate-500">
          Pantau sesi belajarmu yang akan datang.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {jadwal.map((item) => (
          <JadwalCard
            key={item.id}
            jadwal={item}
            isHighlighted={item.id === highlightedId}
            cardRef={item.id === highlightedId ? highlightRef : null}
            onHubungi={(item) => window.open(`https://wa.me/6281234567890?text=Halo%20Kak%20${encodeURIComponent(item.tutorNama)}`, '_blank')}
          />
        ))}
        <EmptyCard onCariTutor={() => navigate('/learner/cari-tutor')} />
      </div>
    </div>
  )
}