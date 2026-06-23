import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Calendar, Clock, CreditCard, ChevronLeft, Receipt, Copy, X, Landmark, Wallet, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'

export default function Pembayaran() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Checkout states
  const [selectedMethod, setSelectedMethod] = useState('Transfer')
  const [selectedBank, setSelectedBank] = useState('BCA')
  const [selectedEWallet, setSelectedEWallet] = useState('GOPAY')
  const [modalType, setModalType] = useState(null) // 'VA', 'EWALLET', null

  const orderId = location.state?.orderId
  const [orderDetail, setOrderDetail] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  useEffect(() => {
    if (!orderId) {
      navigate('/learner/detail-pesanan')
      return
    }

    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/learner/bookings/${orderId}`)
        if (response.data && response.data.data) {
          setOrderDetail(response.data.data)
        }
      } catch (err) {
        console.error("Gagal memuat detail pesanan", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetail()
  }, [orderId, navigate])

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

  const handleLanjutBayar = () => {
    if (selectedMethod === 'Transfer') setModalType('VA')
    else if (selectedMethod === 'EWallet') setModalType('EWALLET')
  }

  const handleSelesai = async () => {
    if (!orderId || isSubmitting) return;
    setIsSubmitting(true)
    
    try {
      const payment_method = selectedMethod === 'Transfer' ? `${selectedBank} VA` : selectedEWallet;

      // Simulasi konfirmasi pembayaran setelah user klik OK di popup VA/EWallet
      await axios.patch(`/learner/bookings/${orderId}/simulate-payment`, {
        payment_method: payment_method,
      });
      
      setModalType(null)
      if (location.state && location.state.returnTo) {
        navigate(location.state.returnTo)
      } else {
        navigate('/learner/detail-pesanan')
      }
      window.scrollTo(0, 0)
    } catch (err) {
      console.error("Gagal memproses pembayaran:", err)
      alert("Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper fungsi untuk render
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-full items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000666]"></div>
        <p className="mt-4 text-slate-500 font-medium">Memuat data pembayaran...</p>
      </div>
    )
  }

  if (!orderDetail) return null;

  const tutor = orderDetail.tutor || {};
  const course = orderDetail.course || {};
  const slots = orderDetail.slots || orderDetail.slot;
  const timeStr = Array.isArray(slots) && slots[0] 
    ? `${slots[0].start_time?.substring(0, 5)} - ${slots[0].end_time?.substring(0, 5)}`
    : (slots?.start_time ? `${slots.start_time?.substring(0, 5)} - ${slots.end_time?.substring(0, 5)}` : '-');
  const sessionCount = Array.isArray(slots) ? slots.length : (slots ? 1 : 0);
  
  // Asumsi harga per sesi di backend
  const basePrice = tutor.price || 45000;
  const totalPrice = basePrice * (sessionCount || 1);
  const serviceFee = 1000;
  const grandTotal = totalPrice + serviceFee;

  return (
    <div className="flex flex-col min-h-full">
      <div className="mb-8 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium mr-6"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Kembali
        </button>
        <h1 className="text-3xl font-bold text-[#0a0f44]">
          Pembayaran
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-10">
        <div className="bg-white rounded-[32px] shadow-sm flex flex-col lg:flex-row overflow-hidden animate-in fade-in duration-300 border border-slate-100">
          
          {/* Left Column (White) */}
          <div className="flex-[3] p-8 lg:p-10 space-y-10">
            
            {/* Ringkasan Pesanan */}
            <div>
              <h2 className="text-xl font-bold text-[#000666] mb-8 flex items-center">
                <Receipt className="w-6 h-6 mr-3 text-[#000666]" />
                Ringkasan Pesanan
              </h2>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Learner</div>
                  <div className="font-bold text-slate-900 text-lg">{orderDetail.learner?.name || 'Learner'}</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Tutor</div>
                  <div className="flex items-center gap-3">
                    <img src={tutor.avatar ? (tutor.avatar.startsWith('http') ? tutor.avatar : `http://127.0.0.1:8000/storage/${tutor.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || 'Tutor')}&background=random`} alt="Tutor" className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-100" />
                    <div className="font-bold text-slate-900 text-lg">{tutor.name}</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Mata Pelajaran</div>
                  <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold">
                    {course.course_name || course.name || 'Mata Kuliah'}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Jadwal Sesi</div>
                  <div className="flex items-start gap-2 text-slate-800 font-medium text-sm">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div>
                        {orderDetail.booking_date 
                          ? new Date(orderDetail.booking_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }) 
                          : '-'}
                      </div>
                      <div>{timeStr} WIB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Metode Pembayaran */}
            <div>
              <h2 className="text-xl font-bold text-[#000666] mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-[#000666]" />
                Metode Pembayaran
              </h2>
              
              <div className="space-y-4">

                {/* Transfer Bank */}
                <div 
                  onClick={() => setSelectedMethod('Transfer')}
                  className={`p-5 rounded-[20px] border-2 cursor-pointer transition-all ${selectedMethod === 'Transfer' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50/80 rounded-[14px] flex items-center justify-center text-emerald-600">
                        <Landmark className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-[#000666] text-lg">Transfer Bank</div>
                        <div className="text-sm text-slate-500 font-medium">BRI, BNI, Mandiri, BCA</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'Transfer' ? 'border-emerald-500' : 'border-slate-200'}`}>
                      {selectedMethod === 'Transfer' && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                    </div>
                  </div>

                  {/* Bank Selection */}
                  {selectedMethod === 'Transfer' && (
                    <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-3 pl-16">
                      {['BCA', 'Mandiri', 'BNI', 'BRI'].map((bank) => (
                        <div 
                          key={bank}
                          onClick={(e) => { e.stopPropagation(); setSelectedBank(bank) }}
                          className={`px-4 py-3 rounded-xl border flex items-center justify-between transition-colors ${selectedBank === bank ? 'border-emerald-500 bg-white shadow-sm' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'}`}
                        >
                          <span className="font-bold text-slate-700 text-sm">{bank}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedBank === bank ? 'border-emerald-500' : 'border-slate-300'}`}>
                            {selectedBank === bank && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* E-Wallet */}
                <div 
                  onClick={() => setSelectedMethod('EWallet')}
                  className={`p-5 rounded-[20px] border-2 cursor-pointer transition-all ${selectedMethod === 'EWallet' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50/80 rounded-[14px] flex items-center justify-center text-emerald-600">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-[#000666] text-lg">E-Wallet</div>
                        <div className="text-sm text-slate-500 font-medium">OVO, GoPay, Dana</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'EWallet' ? 'border-emerald-500' : 'border-slate-200'}`}>
                      {selectedMethod === 'EWallet' && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                    </div>
                  </div>
                  
                  {/* E-Wallet Pills */}
                  <div className="flex flex-wrap gap-2 pl-16">
                    {['OVO', 'GOPAY', 'DANA'].map((wallet) => (
                      <div 
                        key={wallet}
                        onClick={(e) => { 
                          if (selectedMethod === 'EWallet') {
                            e.stopPropagation(); 
                            setSelectedEWallet(wallet);
                          }
                        }}
                        className={`text-xs font-bold px-4 py-2 rounded-lg transition-colors ${selectedMethod === 'EWallet' ? (selectedEWallet === wallet ? 'bg-emerald-500 text-white shadow-sm' : 'bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer') : 'bg-slate-100 text-slate-400'}`}
                      >
                        {wallet}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column (Dark Blue + White bottom) */}
          <div className="flex-[2] bg-[#000666] m-3 rounded-[24px] flex flex-col overflow-hidden">
             {/* Dark Blue content */}
             <div className="p-8 lg:p-10 flex-1 text-white">
               <h2 className="text-xl font-bold mb-8 flex items-center">
                 <Receipt className="w-6 h-6 mr-3 text-emerald-400" />
                 Rincian Harga
               </h2>

               <div className="space-y-4 text-sm text-white/80 font-medium">
                 <div className="flex justify-between items-center">
                   <span>Biaya Sesi ({sessionCount || 1} Sesi)</span>
                   <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span>Biaya Layanan</span>
                   <span>Rp {serviceFee.toLocaleString('id-ID')}</span>
                 </div>
               </div>

               <div className="h-px bg-white/10 my-8"></div>

               <div className="mb-2 text-xs font-bold text-white/50 uppercase tracking-widest">Total Pembayaran</div>
               <div className="text-5xl font-bold mb-10 tracking-tight">Rp {grandTotal.toLocaleString('id-ID')}</div>

               <div className="bg-white/5 rounded-2xl p-5 flex items-start gap-4 border border-white/10">
                 <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
                 <p className="text-[13px] text-white/70 leading-relaxed font-medium">
                   Pembayaran Anda dijamin aman melalui sistem escrow kami. Dana hanya akan diteruskan ke tutor setelah sesi selesai.
                 </p>
               </div>
             </div>

             {/* White bottom inside the right column */}
             <div className="bg-white p-8 lg:p-10 mt-auto rounded-t-3xl">
               <Button onClick={handleLanjutBayar} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/20 mb-4 transition-all">
                 Konfirmasi
               </Button>
               <p className="text-[11px] text-center text-slate-500 px-2 leading-relaxed">
                 Dengan membayar, Anda menyetujui <span className="underline cursor-pointer font-medium text-slate-700">Ketentuan Layanan</span> & <span className="underline cursor-pointer font-medium text-slate-700">Kebijakan Privasi</span> KonekDin.
               </p>
             </div>
          </div>
        </div>
      </div>

      {/* DYNAMIC MODALS */}

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
                  <span className={`font-bold text-base text-blue-800`}>
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
                      Rp {grandTotal.toLocaleString('id-ID')}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(grandTotal.toString())}
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
                disabled={isSubmitting}
                className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 disabled:opacity-70"
              >
                {isSubmitting ? 'Memproses...' : 'Oke'}
              </Button>

              <p className="text-center text-[10px] text-slate-400 mt-2">
                Pembayaran akan dikonfirmasi secara otomatis oleh sistem
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. E-Wallet Modal */}
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
                disabled={isSubmitting}
                className="w-full h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 shrink-0 mt-2 disabled:opacity-70"
              >
                {isSubmitting ? 'Memproses...' : 'Oke'}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
