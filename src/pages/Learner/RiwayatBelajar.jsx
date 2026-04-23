import {
  CalendarDays,
  Clock,
  Star,
  Repeat2,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'

const historyData = [
  {
    id: 1,
    subject: 'Pemrograman Web',
    tutorName: 'Arhan Pradana',
    tutorAvatar: 'https://i.pravatar.cc/150?img=11',
    date: '1 April 2026',
    time: '09:30 - 12:00',
    rating: 5.0,
  },
  {
    id: 2,
    subject: 'Jaringan Komputer',
    tutorName: 'Rafi Ardan',
    tutorAvatar: 'https://i.pravatar.cc/150?img=33',
    date: '25 Maret 2026',
    time: '07:00 - 08.40',
    rating: 4.9,
  },
  {
    id: 3,
    subject: 'Basis Data',
    tutorName: 'Rahel Sahita',
    tutorAvatar: 'https://i.pravatar.cc/150?img=5',
    date: '18 Maret 2026',
    time: '15.30 - 17.10',
    rating: 5.0,
  },
]

export default function RiwayatBelajar() {
  return (
    <div className="pb-10 max-w-[880px]">
      {/* Header */}
      <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#0a0f44] tracking-tight leading-tight mb-2">Riwayat Sesi Belajar</h1>
      <p className="text-[14px] text-slate-500 mb-6 max-w-[540px]">
        Lihat kembali perjalanan belajar Anda dan atur sesi lanjutan dengan tutor favorit Anda.
      </p>

      {/* History Cards */}
      <div className="space-y-4">
        {historyData.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 hover:shadow-sm transition-shadow">
            <div className="flex gap-4">
              {/* Tutor Avatar + Rating */}
              <div className="relative flex-shrink-0">
                <Avatar className="h-[90px] w-[90px] rounded-lg">
                  <AvatarImage src={session.tutorAvatar} alt={session.tutorName} className="object-cover" />
                  <AvatarFallback className="bg-[#0a0f44] text-white text-xl rounded-lg">{session.tutorName[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                  <Star className="h-2.5 w-2.5 fill-white" />
                  {session.rating}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <h3 className="text-[18px] font-bold text-[#0a0f44]">{session.subject}</h3>
                    <p className="text-[13px] text-slate-500 mt-0.5">{session.tutorName}</p>
                  </div>
                  <Link
                    to={`/learner/beri-ulasan/${session.id}`}
                    className="text-[9px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full uppercase tracking-[0.08em] flex-shrink-0 hover:bg-amber-100 transition-colors"
                  >
                    BERI ULASAN
                  </Link>
                </div>

                {/* Date/Time */}
                <div className="flex items-center gap-3 mt-2 text-[12px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{session.time}</span>
                  </div>
                </div>

                {/* Action */}
                <div className="flex justify-end mt-3">
                  <Link to={`/learner/profil-tutor/${session.id}`}>
                    <Button className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-lg h-9 px-4 text-[12px] font-medium shadow-none gap-1.5">
                      <Repeat2 className="h-3.5 w-3.5" />
                      Belajar lagi dengan tutor ini
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center pt-6">
        <button className="flex items-center gap-1 text-[13px] font-semibold text-teal-600 hover:text-teal-700">
          Tampilkan Lebih Banyak <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
