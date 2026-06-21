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
import BookingCard from '@/components/shared/BookingCard'
import axios from '@/lib/axios'

// Hapus dummy jadwalList karena kita akan fetch dari API

function JadwalCard({ jadwal, onHubungi, isHighlighted, cardRef }) {
  return (
    <div ref={cardRef} className={isHighlighted ? "ring-2 ring-[#0d7c6b] rounded-3xl" : ""}>
      <BookingCard
        image={jadwal.tutorFoto}
        rating={jadwal.tutorRating}
        title={jadwal.tutorNama}
        subtitle={jadwal.mataKuliah}
        date={jadwal.tanggal}
        time={`${jadwal.jamMulai} - ${jadwal.jamSelesai} ${jadwal.timezone}`}
        accentColor="bg-[#0d7c6b]"
        actionNode={
          <Button
            onClick={() => onHubungi(jadwal)}
            className="w-full md:w-auto bg-[#22c55e] hover:bg-[#16a34a] text-white font-semibold px-5 py-2.5 rounded-xl text-sm gap-2 shadow-sm"
          >
            <MessageSquare className="h-4 w-4" />
            Hubungi Tutor
          </Button>
        }
      />
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

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }
  return new Date(dateString).toLocaleDateString('id-ID', options)
}

export default function JadwalBelajar() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const tutorParam = searchParams.get('tutor')

  const [jadwal, setJadwal] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  
  const [highlightedId, setHighlightedId] = useState(null)
  const highlightRef = useRef(null)

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get('/schedules')
        console.log("Response Jadwal:", response.data)
        
        if (response.data && response.data.data) {
           const formatted = response.data.data.map(item => ({
              id: item.id,
              tutorNama: item.tutor?.name || item.tutor || 'Tutor',
              tutorFoto: item.tutor?.avatar ? (item.tutor.avatar.startsWith('http') ? item.tutor.avatar : `http://127.0.0.1:8000/storage/${item.tutor.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(item.tutor?.name || item.tutor || 'Tutor')}&background=random`,
              tutorRating: Number(item.tutor?.rating_avg) || 0,
              mataKuliah: item.course?.name || item.course || 'Materi Belajar',
              tanggal: formatDate(item.booking_date),
              jamMulai: item.slots && item.slots.length > 0 ? item.slots[0].start_time : '00:00',
              jamSelesai: item.slots && item.slots.length > 0 ? item.slots[0].end_time : '00:00',
              timezone: 'WIB'
           }))
           setJadwal(formatted)
        }
      } catch (error) {
        console.error("Gagal memuat jadwal:", error)
        if (error.response?.status === 401) {
           localStorage.removeItem('token')
           window.location.href = '/login'
           return
        }
        setErrorMsg(error.response?.data?.message || error.message || "Gagal memuat jadwal")
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchSchedules()
  }, [])

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
        {errorMsg ? (
          <div className="flex flex-col justify-center items-center h-64 text-red-500 bg-red-50 rounded-2xl border border-red-100 p-6 text-center">
            <p className="font-bold text-lg mb-2">Gagal Memuat Data</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-64 text-slate-500 animate-pulse">
            Memuat jadwal belajar...
          </div>
        ) : jadwal.length > 0 ? (
          jadwal.map((item) => (
            <JadwalCard
              key={item.id}
              jadwal={item}
              isHighlighted={item.id === highlightedId}
              cardRef={item.id === highlightedId ? highlightRef : null}
              onHubungi={(item) => window.open(`https://wa.me/6281234567890?text=Halo%20Kak%20${encodeURIComponent(item.tutorNama)}`, '_blank')}
            />
          ))
        ) : (
          <EmptyCard onCariTutor={() => navigate('/learner/cari-tutor')} />
        )}
      </div>
    </div>
  )
}