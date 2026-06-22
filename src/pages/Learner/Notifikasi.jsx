import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, CheckCircle2, Info, ArrowRight, Timer, Banknote, X, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'

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
  menunggu_pembayaran: {
    accent: 'bg-yellow-400',
    iconBg: 'bg-yellow-100',
    icon: <Banknote className="h-5 w-5 text-yellow-600" />,
    titleColor: 'text-yellow-600',
  },
}

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

function NotifikasiCard({ item, onCtaClick, onActionClick }) {
  const cfg = tipeConfig[item.tipe]

  return (
    <div className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm bg-white">
      <div className="flex">
        <div className={`w-1 flex-shrink-0 ${cfg.accent}`} />
        <div className="flex-1 px-5 py-4">
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
          <RenderPesan segmen={item.pesan} />
          {(item.cta || item.cta2) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {item.cta && (
                <Button
                  onClick={() => {
                    if (item.cta.action) {
                      onActionClick(item.cta.action)
                    } else {
                      onCtaClick(item.cta.href)
                    }
                  }}
                  className="bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-5 py-2 h-auto rounded-xl text-sm gap-2"
                >
                  {item.cta.label}
                  {!item.cta.action && <ArrowRight className="h-4 w-4" />}
                </Button>
              )}
              {item.cta2 && (
                <Button
                  onClick={() => {
                    if (item.cta2.action) {
                      onActionClick(item.cta2.action)
                    } else {
                      onCtaClick(item.cta2.href)
                    }
                  }}
                  variant="outline"
                  className="bg-white border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2 h-auto rounded-xl text-sm"
                >
                  {item.cta2.label}
                </Button>
              )}
            </div>
          )}
        </div>
        <div className="flex items-start pt-4 pr-5">
          <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
            {cfg.icon}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Notifikasi() {
  const navigate = useNavigate()
  const [modalType, setModalType] = useState(null)
  
  // Default values for VA and EWALLET popups in notification
  const [selectedBank, setSelectedBank] = useState('BCA')
  const [selectedEWallet, setSelectedEWallet] = useState('GOPAY')

  const [rawNotif, setRawNotif] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    let ignore = false

    const fetchNotif = async () => {
      try {
        const response = await axios.get('/learner/notification')
        if (ignore) return

        if (response.data && response.data.data) {
          const notifications = response.data.data
          setRawNotif(notifications)

          // Cek apakah ada notifikasi persetujuan tutor
          const hasApproval = notifications.some(n => {
            const title = (n.data?.title || n.title || '').toLowerCase()
            const msg = (n.data?.message || n.message || '').toLowerCase()
            return title.includes('disetujui') || msg.includes('disetujui') ||
                   title.includes('diterima') || msg.includes('diterima')
          })

          if (hasApproval) {
            axios.get('/me').then(res => {
              if (res.data && res.data.data) {
                localStorage.setItem('user', JSON.stringify(res.data.data))
                window.dispatchEvent(new Event('profileUpdated'))
              }
            }).catch(e => console.error("Gagal sinkronisasi role:", e))
          }

          // Sinkronisasi indikator red-dot di sidebar
          window.dispatchEvent(new Event('notificationsUpdated'))
        }
      } catch (err) {
        if (!ignore) {
          console.error("Gagal memuat notifikasi:", err)
          setErrorMsg(err.response?.data?.message || "Gagal memuat notifikasi dari server")
        }
      } finally {
        if (!ignore) setIsLoading(false)
      }
    }

    fetchNotif()
    return () => { ignore = true }
  }, [])

  useEffect(() => {
    const scrollArea = document.getElementById('learner-scroll-area')
    
    if (modalType !== null) {
      if (scrollArea) {
        const scrollbarWidth = scrollArea.offsetWidth - scrollArea.clientWidth
        if (scrollbarWidth > 0) {
          scrollArea.style.paddingRight = `${scrollbarWidth}px`
        }
        scrollArea.style.overflow = 'hidden'
      }
      
      const bodyScrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      if (bodyScrollbarWidth > 0) {
        document.body.style.paddingRight = `${bodyScrollbarWidth}px`
      }
      document.body.style.overflow = 'hidden'
    } else {
      if (scrollArea) {
        scrollArea.style.paddingRight = ''
        scrollArea.style.overflow = ''
      }
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
    
    return () => {
      if (scrollArea) {
        scrollArea.style.paddingRight = ''
        scrollArea.style.overflow = ''
      }
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  }, [modalType])

  const notifikasiData = React.useMemo(() => {
    if (rawNotif.length === 0) return []

    const items = rawNotif.map(n => {
      // Ambil judul & pesan dari nested data ATAU root-level (fallback)
      const titleRaw = n.data?.title || n.title || ''
      const msgRaw   = n.data?.message || n.message || 'Ada pemberitahuan baru untuk Anda.'

      let tipe = 'info'
      let judul = 'Pemberitahuan'

      const typeStr = String(n.type || '').toLowerCase()
      if (typeStr.includes('payment') || typeStr.includes('bayar') ||
          typeStr.includes('paid') || typeStr.includes('transfer')) {
        tipe = 'pembayaran'
        judul = 'Status Pembayaran'
      } else if (typeStr.includes('reminder') || typeStr.includes('pengingat') ||
                 typeStr.includes('session')) {
        // Bedakan pengingat 30 menit vs hari-H
        tipe = (typeStr.includes('30') || msgRaw.toLowerCase().includes('30 menit'))
          ? 'pengingat_30m'
          : 'pengingat'
        judul = 'Pengingat Sesi'
      } else if (typeStr.includes('booking') || typeStr.includes('pesanan') ||
                 typeStr.includes('order')) {
        tipe = 'info'
        judul = 'Status Pesanan'
      }

      // Tentukan CTA berdasarkan action field
      let cta = null
      let cta2 = null
      const action = n.data?.action || n.action
      if (action === 'BAYAR') {
        tipe = 'menunggu_pembayaran'
        judul = 'Menunggu Pembayaran'
        cta  = { label: 'Bayar', action: 'BAYAR' }
        cta2 = { label: 'Ubah Metode Pembayaran', action: 'UBAH_METODE' }
      }

      return {
        id: n.id,
        tipe,
        judul: titleRaw || judul,
        waktu: n.created_at
          ? new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(n.created_at))
          : 'Baru saja',
        dateObj: n.created_at ? new Date(n.created_at) : null,
        isBaru: !n.read_at,
        pesan: [msgRaw],
        cta,
        cta2,
      }
    })

    // Urutkan terbaru dulu
    items.sort((a, b) => (b.dateObj?.getTime() || 0) - (a.dateObj?.getTime() || 0))

    // Kelompokkan per hari
    const now = new Date()
    const groupMap = new Map()
    items.forEach(item => {
      let label = 'TERBARU'
      if (item.dateObj) {
        const diffDays = Math.floor(
          (Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) -
           Date.UTC(item.dateObj.getFullYear(), item.dateObj.getMonth(), item.dateObj.getDate())) / 86400000
        )
        if (diffDays === 0) label = 'HARI INI'
        else if (diffDays === 1) label = 'KEMARIN'
        else label = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(item.dateObj)
      }
      if (!groupMap.has(label)) groupMap.set(label, [])
      groupMap.get(label).push(item)
    })

    return Array.from(groupMap.entries()).map(([grup, grpItems]) => ({ grup, items: grpItems }))
  }, [rawNotif])

  const handleActionClick = (action) => {
    if (action === 'BAYAR') {
      setModalType('VA')
    } else if (action === 'UBAH_METODE') {
      navigate('/learner/pembayaran', { state: { returnTo: '/learner/notifikasi' } })
    }
  }

  const handleSelesai = () => {
    setModalType(null)
  }

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">
          Notifikasi
        </h1>
        <p className="text-slate-500">
          Update terbaru untuk perjalanan akademik anda.
        </p>
      </div>

      {/* Grup per hari */}
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-40 text-slate-500 animate-pulse">
            Memuat notifikasi...
          </div>
        ) : errorMsg ? (
          <div className="flex justify-center items-center h-40 text-red-500 bg-red-50 rounded-2xl border border-red-100 p-4">
            {errorMsg}
          </div>
        ) : notifikasiData.length > 0 ? (
          notifikasiData.map((grup) => (
            <section key={grup.grup}>
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 mb-3 px-1">
                {grup.grup}
              </p>
              <div className="flex flex-col gap-3">
                {grup.items.map((item) => (
                  <NotifikasiCard
                    key={item.id}
                    item={item}
                    onCtaClick={(href) => navigate(href)}
                    onActionClick={handleActionClick}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 bg-white rounded-2xl border border-slate-100 border-dashed">
            <Info className="h-10 w-10 text-slate-200 mb-3" />
            <p className="font-medium">Belum ada notifikasi</p>
          </div>
        )}
      </div>

      {/* MODALS */}

      {/* 1. VA Pop Up Modal */}
      {modalType === 'VA' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-[24px] w-full max-w-[400px] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Dark Blue Theme */}
            <div className="bg-[#000666] p-5 text-white relative shrink-0">
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-4 mb-2 mt-2">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                  <span className="font-bold text-base text-blue-800">
                    {selectedBank}
                  </span>
                </div>
                <div>
                  <div className="text-white/80 text-xs font-medium">Pembayaran via Virtual Account</div>
                  <div className="font-bold text-base">Bank {selectedBank}</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 md:p-6 space-y-4">
              <div className="text-center">
                <h3 className="text-slate-800 font-bold text-base mb-1">Selesaikan Pembayaran Anda</h3>
                <p className="text-slate-500 text-xs">
                  Selesaikan pembayaran Anda sebelum <span className="font-bold text-slate-700">15 Okt 2026, 12:30 WIB</span>
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                {/* VA Number */}
                <div>
                  <div className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-wider">Nomor Virtual Account</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-slate-800 tracking-wider">
                      8239012389102
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText('8239012389102')}
                      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-8 px-2"
                    >
                      <Copy className="w-4 h-4 mr-1.5" />
                      Salin
                    </Button>
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full"></div>

                {/* Amount */}
                <div>
                  <div className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-wider">Total Pembayaran</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-indigo-700">
                      Rp 105.000
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText('105000')}
                      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-8 px-2"
                    >
                      <Copy className="w-4 h-4 mr-1.5" />
                      Salin
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSelesai}
                className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20"
              >
                Oke
              </Button>

              <p className="text-center text-[10px] text-slate-400 mt-2">
                Pembayaran akan dikonfirmasi secara otomatis oleh sistem
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. E-Wallet Modal */}
      {modalType === 'EWALLET' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-[24px] w-full max-w-[400px] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#000666] p-5 text-white relative shrink-0">
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-4 mb-2 mt-2">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0">
                  <span className={`font-bold text-xs text-blue-800`}>
                    {selectedEWallet}
                  </span>
                </div>
                <div>
                  <div className="text-white/80 text-xs font-medium">Pembayaran E-Wallet</div>
                  <div className="font-bold text-base">{selectedEWallet} QRIS / Transfer</div>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-center">
                <h3 className="text-slate-800 font-bold text-base mb-1">Scan QRIS atau Transfer</h3>
                <p className="text-slate-500 text-xs">
                  Gunakan aplikasi <span className="font-bold">{selectedEWallet}</span> Anda untuk menyelesaikan pembayaran.
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl border border-slate-100 p-4 space-y-3">
                
                {/* QR Code Placeholder */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-28 h-28 bg-white border-2 border-slate-200 rounded-xl p-2 mb-2 flex items-center justify-center shadow-sm">
                    <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-contain bg-center opacity-70"></div>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400">QRIS A/N KONEKDIN INDONESIA</p>
                </div>

                <div className="flex items-center gap-3 py-1">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase">ATAU TRANSFER KE</div>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                {/* E-Wallet Number */}
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-[10px] font-bold mb-1 uppercase tracking-wider">Nomor Tujuan {selectedEWallet}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg font-bold text-slate-800 tracking-wider">
                      0812-3456-7890
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText('081234567890')}
                      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50 h-8 px-2"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

              </div>

              <Button 
                onClick={handleSelesai}
                className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 shrink-0 mt-2"
              >
                Oke
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}