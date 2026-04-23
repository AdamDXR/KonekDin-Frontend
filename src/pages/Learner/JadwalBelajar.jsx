import {
  CalendarDays,
  Clock,
  BellRing,
  MessageSquare,
  PlusCircle,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const scheduledSessions = [
  {
    id: 1,
    tutorName: 'Irkham Wildan',
    tutorAvatar: 'https://i.pravatar.cc/150?img=11',
    subject: 'Algoritma & Struktur Data',
    date: 'Senin, 14 Oktober 2026',
    time: '12.30 - 14.10 WIB',
    status: 'Menunggu Sesi',
    reminders: ['H-1 HARI', 'H-30 MENIT'],
  },
]

export default function JadwalBelajar() {
  return (
    <div className="pb-10 max-w-[880px]">
      {/* Header */}
      <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#0a0f44] tracking-tight leading-tight mb-2">Jadwal Sesi Belajar</h1>
      <p className="text-[14px] text-slate-500 mb-6 max-w-[500px]">
        Lihat jadwal sesi belajar yang akan datang dan siapkan dirimu lebih awal.
      </p>

      {/* Sessions */}
      <div className="space-y-4">
        {scheduledSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            <div className="border-l-[4px] border-[#0a0f44] p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Avatar */}
                <Avatar className="h-[80px] w-[80px] rounded-lg flex-shrink-0">
                  <AvatarImage src={session.tutorAvatar} alt={session.tutorName} className="object-cover" />
                  <AvatarFallback className="bg-[#0a0f44] text-white text-xl rounded-lg">{session.tutorName[0]}</AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Top row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div>
                      <h3 className="text-[18px] font-bold text-[#0a0f44]">{session.tutorName}</h3>
                      <p className="text-[13px] text-teal-600 font-semibold">Mata Kuliah : {session.subject}</p>
                    </div>
                    <div className="flex items-center gap-2.5 flex-shrink-0">
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                        {session.status}
                      </span>
                      <Button className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-lg h-9 px-4 text-[12px] font-medium shadow-none gap-1.5">
                        <MessageSquare className="h-3.5 w-3.5" />
                        Hubungi Tutor
                      </Button>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="flex flex-wrap items-center gap-3 mt-3">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[12px] text-slate-600">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-[12px] text-slate-600">{session.time}</span>
                    </div>
                    <button className="text-[12px] font-bold text-[#0a0f44] hover:underline ml-auto">
                      Rincian Sesi
                    </button>
                  </div>

                  {/* Reminders */}
                  <div className="flex items-center gap-2 mt-3">
                    <BellRing className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-[11px] text-slate-400 font-medium">Pengingat:</span>
                    {session.reminders.map((r) => (
                      <span key={r} className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 tracking-wide">
                        {r} <Check className="h-2.5 w-2.5" />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Empty State */}
      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center mt-6">
        <PlusCircle className="h-10 w-10 text-slate-300 mb-3" />
        <h3 className="text-[17px] font-bold text-[#0a0f44] mb-1">Ingin belajar topik lain?</h3>
        <p className="text-[13px] text-slate-400 mb-4 max-w-[300px]">
          Temukan tutor terbaik untuk membantumu memahami materi kuliah yang sulit.
        </p>
        <Button className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-lg h-9 px-5 text-[13px] font-medium shadow-none">
          Cari Tutor Sekarang
        </Button>
      </div>
    </div>
  )
}
