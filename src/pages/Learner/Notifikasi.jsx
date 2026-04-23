import {
  CalendarCheck2,
  CheckCircle2,
  Info,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const notificationsData = [
  {
    section: 'HARI INI',
    items: [
      {
        id: 1,
        title: 'Pengingat Sesi Besok',
        description: 'Persiapkan diri Anda untuk sesi Algoritma & Struktur Data bersama Irkham Wildan pada pukul 12.30. Siapkan materi yang ingin didiskusikan besok.',
        icon: CalendarCheck2,
        iconBg: 'bg-orange-100 text-orange-500',
        borderColor: 'border-l-orange-400',
        tag: 'BARU',
        tagType: 'badge',
        action: null,
      },
      {
        id: 2,
        title: 'Pembayaran Berhasil!',
        description: 'Sesi Algoritma dengan Irkham Wildan telah dikonfirmasi. Pastikan Anda sudah menyiapkan materi yang ingin didiskusikan.',
        icon: CheckCircle2,
        iconBg: 'bg-teal-100 text-teal-600',
        borderColor: 'border-l-teal-400',
        tag: '5 menit yang lalu',
        tagType: 'time',
        action: { label: 'Lihat Jadwal Belajar' },
      },
    ],
  },
  {
    section: 'KEMARIN',
    items: [
      {
        id: 3,
        title: 'Sesi Mulai dalam 30 Menit!',
        description: 'Sesi belajarmu akan dimulai dalam 30 menit. Yuk siapkan dirimu dari sekarang, cek kembali materi, dan catat hal-hal yang masih belum kamu pahami untuk ditanyakan ke tutor nanti',
        icon: Info,
        iconBg: 'bg-slate-100 text-slate-500',
        borderColor: 'border-l-slate-300',
        tag: '1 hari yang lalu',
        tagType: 'time',
        action: null,
      },
    ],
  },
]

export default function Notifikasi() {
  return (
    <div className="pb-10 max-w-[880px]">
      {/* Header */}
      <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#0a0f44] tracking-tight leading-tight mb-2">Notifikasi</h1>
      <p className="text-[14px] text-slate-500 mb-6">
        Update terbaru untuk perjalanan akademik anda.
      </p>

      {/* Sections */}
      <div className="space-y-6">
        {notificationsData.map((section) => (
          <div key={section.section}>
            <p className="text-[10px] font-bold tracking-[0.12em] text-teal-600 uppercase mb-3">{section.section}</p>
            <div className="space-y-3">
              {section.items.map((notif) => (
                <div
                  key={notif.id}
                  className={`bg-white rounded-2xl border border-slate-100 p-5 border-l-[4px] ${notif.borderColor} hover:shadow-sm transition-shadow`}
                >
                  <div className="flex gap-3.5">
                    <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.iconBg}`}>
                      <notif.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-[15px] font-bold text-[#0a0f44]">{notif.title}</h3>
                        {notif.tagType === 'badge' ? (
                          <span className="text-[9px] font-bold tracking-wider uppercase text-teal-600 bg-teal-50 px-2 py-0.5 rounded flex-shrink-0">
                            {notif.tag}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium flex-shrink-0">
                            {notif.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] text-slate-500 leading-relaxed mt-1.5">{notif.description}</p>

                      {notif.action && (
                        <Button className="mt-3 bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-lg h-9 px-4 font-medium shadow-none gap-1.5 text-[12px]">
                          {notif.action.label}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
