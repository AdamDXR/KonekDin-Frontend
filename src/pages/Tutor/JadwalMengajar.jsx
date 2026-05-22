import { useState } from 'react'
import {
  BookOpen,
  Code,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  CalendarDays,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

// ─── Data mock sesi mengajar ─────────────────────────────────────────────────
// Ganti dengan fetch ke API saat backend sudah siap
const SESSIONS = [
  {
    id: 1,
    learnerName: 'Rina Sari',
    major: 'Sistem Informasi',
    year: '2024',
    subject: 'Pemrograman Web',
    subjectType: 'book',
    schedule: 'Kamis, 17 Okt 2026',
    time: '07:00 - 09:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=47',
    avatarFallback: 'RS',
    whatsappNumber: '6281234567890',
  },
  {
    id: 2,
    learnerName: 'Mas Adam',
    major: 'Teknik Informatika',
    year: '2022',
    subject: 'Algoritma & Struktur Data',
    subjectType: 'code',
    schedule: 'Senin, 14 Okt 2026',
    time: '12:30 - 14:10 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=53',
    avatarFallback: 'MA',
    whatsappNumber: '6289876543210',
  },
  {
    id: 3,
    learnerName: 'Dimas Pratama',
    major: 'Teknik Informatika',
    year: '2025',
    subject: 'Pemrograman Web',
    subjectType: 'code',
    schedule: 'Senin, 14 Okt 2026',
    time: '07:00 - 09:30 WIB',
    location: 'via WhatsApp',
    avatarUrl: 'https://i.pravatar.cc/150?img=57',
    avatarFallback: 'DP',
    whatsappNumber: '6285551234567',
  },
]

// ─── SessionCard (inline, tidak perlu file terpisah) ─────────────────────────
function SessionCard({ session }) {
  const {
    learnerName,
    major,
    year,
    subject,
    subjectType,
    schedule,
    time,
    location,
    avatarUrl,
    avatarFallback,
    whatsappNumber,
  } = session

  const SubjectIcon = subjectType === 'code' ? Code : BookOpen

  const handleContact = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank')
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="flex h-full">
        {/* Accent bar hijau/toska di kiri */}
        <div className="w-1.5 bg-[#0d7c6b] flex-shrink-0" />

        <div className="flex-1 p-6 flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar Learner di Kiri */}
          <Avatar className="h-24 w-24 rounded-2xl flex-shrink-0 border border-slate-100">
            <AvatarImage src={avatarUrl} alt={learnerName} className="object-cover" />
            <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-lg font-semibold">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          {/* Konten di Kanan */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div>
              <h3 className="text-xl font-bold text-[#0a0f44] leading-tight">{learnerName}</h3>
              <p className="text-sm text-slate-400 mt-1">
                {major} &bull; {year}
              </p>
            </div>

            {/* Detail grid 2 kolom dengan background toska muda */}
            <div className="bg-[#f0fbf8] p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex items-start gap-3">
                <SubjectIcon className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Mata Kuliah
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{subject}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Jadwal
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{schedule}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Waktu
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{time}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#0d7c6b] mt-0.5 flex-shrink-0" strokeWidth={1.8} />
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">
                    Lokasi
                  </p>
                  <p className="text-sm font-bold text-[#0d7c6b]">{location}</p>
                </div>
              </div>
            </div>

            {/* Button Hubungi Learner */}
            <Button
              onClick={handleContact}
              className="bg-[#1db954] hover:bg-[#17a348] text-white font-semibold rounded-xl px-5 h-11 text-sm gap-2 transition-colors duration-150 w-fit flex items-center justify-center"
            >
              <MessageSquare className="h-4 w-4" strokeWidth={2} />
              Hubungi Learner
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Halaman utama ────────────────────────────────────────────────────────────
export default function JadwalMengajar() {
  const [sessions] = useState(SESSIONS)

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
          Jadwal Sesi Mengajar
        </h1>
        <p className="text-sm text-slate-400 mt-1 italic">
          "Yuk siapkan materi dan pastikan semuanya sudah siap."
        </p>
      </div>

      {/* Session List */}
      {sessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-300">
          <CalendarDays className="h-12 w-12" strokeWidth={1.2} />
          <p className="text-sm text-slate-400">Belum ada jadwal sesi mengajar.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {sessions.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      )}
    </div>
  )
}
