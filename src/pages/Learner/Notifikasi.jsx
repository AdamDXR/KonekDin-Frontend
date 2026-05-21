import { useNavigate } from 'react-router-dom'
import { CalendarDays, CheckCircle2, Info, ArrowRight, Timer } from 'lucide-react'
import { Button } from '@/components/ui/button'

// ─── Data dummy ───────────────────────────────────────────────────────────────
// tipe: 'pengingat' | 'pembayaran' | 'info'
const notifikasiData = [
  {
    grup: 'HARI INI',
    items: [
      {
        id: '1',
        tipe: 'pengingat',
        judul: 'Pengingat Sesi Besok',
        waktu: 'BARU',
        isBaru: true,
        pesan: [
          'Persiapkan diri Anda untuk sesi ',
          { bold: 'Algoritma & Struktur Data' },
          ' bersama ',
          { bold: 'Irkham Wildan' },
          ' pada pukul ',
          { bold: '12.30' },
          '. Siapkan materi yang ingin didiskusikan besok.',
        ],
        cta: null,
      },
      {
        id: '2',
        tipe: 'pembayaran',
        judul: 'Pembayaran Berhasil!',
        waktu: '5 menit yang lalu',
        isBaru: false,
        pesan: [
          'Sesi Algoritma dengan ',
          { bold: 'Irkham Wildan' },
          ' telah dikonfirmasi. Pastikan Anda sudah menyiapkan materi yang ingin didiskusikan.',
        ],
        cta: { label: 'Lihat Jadwal Belajar', href: '/learner/jadwal-belajar' },
      },
    ],
  },
  {
    grup: 'KEMARIN',
    items: [
      {
        id: '3',
        tipe: 'pengingat_30m',
        judul: 'Sesi Mulai dalam 30 Menit!',
        waktu: '1 hari yang lalu',
        isBaru: false,
        pesan: [
          'Sesi belajarmu akan dimulai dalam 30 menit. Yuk siapkan dirimu dari sekarang, cek kembali materi, dan catat hal-hal yang masih belum kamu pahami untuk ditanyakan ke tutor nanti',
        ],
        cta: null,
      },
    ],
  },
]

// ─── Konfigurasi visual per tipe ─────────────────────────────────────────────
const tipeConfig = {
  pengingat: {
    accent: 'bg-orange-400',
    iconBg: 'bg-orange-100',
    icon: <CalendarDays className="h-5 w-5 text-orange-500" />,
    titleColor: 'text-orange-500',
  },
  pembayaran: {
    accent: 'bg-[#0d7c6b]',
    iconBg: 'bg-[#e6f4f1]',
    icon: <CheckCircle2 className="h-5 w-5 text-[#0d7c6b]" />,
    titleColor: 'text-[#0d7c6b]',
  },
  info: {
    accent: 'bg-slate-300',
    iconBg: 'bg-slate-200',
    icon: <Info className="h-5 w-5 text-slate-500" />,
    titleColor: 'text-slate-600',
  },
  pengingat_30m: {
    accent: 'bg-[#0a0f44]',
    iconBg: 'bg-[#93c5fd]',
    icon: <Timer className="h-5 w-5 text-[#0a0f44]" />,
    titleColor: 'text-[#0a0f44]',
  },
}

// ─── Helper: render pesan dengan segmen bold ──────────────────────────────────
function RenderPesan({ segmen }) {
  return (
    <p className="text-sm text-slate-600 leading-relaxed">
      {segmen.map((s, i) =>
        typeof s === 'string' ? (
          <span key={i}>{s}</span>
        ) : (
          <strong key={i} className="font-semibold text-slate-800">
            {s.bold}
          </strong>
        )
      )}
    </p>
  )
}

// ─── NotifikasiCard ───────────────────────────────────────────────────────────
function NotifikasiCard({ item, isLama, onCtaClick }) {
  const cfg = tipeConfig[item.tipe]

  return (
    <div
      className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm bg-white"
    >
      <div className="flex">
        {/* Accent bar kiri */}
        <div className={`w-1 flex-shrink-0 ${cfg.accent}`} />

        <div className="flex-1 px-5 py-4">
          {/* Baris atas: judul + waktu/badge */}
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className={`text-sm font-bold leading-tight ${cfg.titleColor || 'text-[#0d7c6b]'}`}>
              {item.judul}
            </h3>
            {item.isBaru ? (
              <span className="flex-shrink-0 text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                BARU
              </span>
            ) : (
              <span className="flex-shrink-0 text-[11px] text-slate-400 whitespace-nowrap">
                {item.waktu}
              </span>
            )}
          </div>

          {/* Isi pesan */}
          <RenderPesan segmen={item.pesan} />

          {/* CTA button (opsional) */}
          {item.cta && (
            <Button
              onClick={() => onCtaClick(item.cta.href)}
              className="mt-4 bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-5 py-2 h-auto rounded-xl text-sm gap-2"
            >
              {item.cta.label}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Icon di kanan dalam lingkaran */}
        <div className="flex items-start pt-4 pr-5">
          <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
            {cfg.icon}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Notifikasi() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold text-[#0a0f44] leading-tight">
          Notifikasi
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Update terbaru untuk perjalanan akademik anda.
        </p>
      </div>

      {/* Grup per hari */}
      <div className="flex flex-col gap-8">
        {notifikasiData.map((grup) => (
          <section key={grup.grup}>
            {/* Label grup */}
            <p className="text-[11px] font-semibold tracking-widest text-slate-400 mb-3 px-1">
              {grup.grup}
            </p>

            {/* List kartu */}
            <div className="flex flex-col gap-3">
              {grup.items.map((item) => (
                <NotifikasiCard
                  key={item.id}
                  item={item}
                  isLama={grup.grup !== 'HARI INI'}
                  onCtaClick={(href) => navigate(href)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
