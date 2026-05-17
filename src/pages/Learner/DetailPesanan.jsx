import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, CreditCard, ChevronLeft, Receipt, Copy, X, Star, Banknote, Landmark, Wallet, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DetailPesanan() {
  const navigate = useNavigate()
  
  // View state: 'list' or 'checkout'
  const [view, setView] = useState('list')
  
  // Status state for the active order (Irkham Wildan)
  const [irkhamStatus, setIrkhamStatus] = useState('unpaid')
  
  // Checkout states
  const [selectedMethod, setSelectedMethod] = useState('Transfer')
  const [selectedBank, setSelectedBank] = useState('BCA')
  const [selectedEWallet, setSelectedEWallet] = useState('GOPAY')
  const [modalType, setModalType] = useState(null) // 'VA', 'EWALLET', 'TUNAI', null

  const handleBayarSekarang = () => {
    setView('checkout')
    window.scrollTo(0, 0)
  }

  const handleLanjutBayar = () => {
    if (selectedMethod === 'Transfer') setModalType('VA')
    else if (selectedMethod === 'EWallet') setModalType('EWALLET')
    else if (selectedMethod === 'Tunai') setModalType('TUNAI')
  }

  const handleSelesai = () => {
    setModalType(null)
    setIrkhamStatus('paid')
    setView('list')
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      
      {/* Header logic differs based on view */}
      {view === 'checkout' ? (
        <div className="bg-white border-b border-slate-200 pt-6 pb-6 px-6 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center">
            <button 
              onClick={() => {
                setView('list')
                setSelectedMethod(null)
              }}
              className="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-medium mr-6"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Kembali
            </button>
            <h1 className="text-2xl font-bold text-slate-900">
              Pembayaran
            </h1>
          </div>
        </div>
      ) : (
        <div className="pt-10 pb-6 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold text-[#000666] mb-2">Detail Pesanan</h1>
            <p className="text-slate-500 font-medium">Lihat detail pesanan dan selesaikan pembayaran.</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={view === 'checkout' ? "max-w-6xl mx-auto px-6 py-8" : "max-w-4xl mx-auto px-6 py-2"}>
        
        {view === 'list' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Card 1: Irkham Wildan (Dynamic Status) */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Tutor" className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    4.9
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Irkham Wildan</h3>
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">Algoritma</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Kamis, 14 Okt 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>12:30 - 14:10 WIB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                 {irkhamStatus === 'unpaid' ? (
                   <>
                     <div className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold self-end md:self-center">
                       Belum Bayar
                     </div>
                     <Button 
                       onClick={handleBayarSekarang} 
                       className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 h-11 font-bold shadow-sm shadow-emerald-500/20"
                     >
                       Bayar Sekarang <Banknote className="w-4 h-4 ml-2" />
                     </Button>
                   </>
                 ) : (
                   <>
                     <div className="bg-teal-700 text-white px-4 py-1.5 rounded-full text-sm font-bold self-end md:self-center">
                       Lunas
                     </div>
                     <Button 
                       onClick={() => navigate('/learner/jadwal-belajar')}
                       className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-[#000666] rounded-xl px-6 h-11 font-bold"
                     >
                       Lihat Jadwal
                     </Button>
                   </>
                 )}
              </div>
            </div>

            {/* Card 2: Tiara Puspita (Paid) */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?img=5" alt="Tutor" className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    4.8
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Tiara Puspita</h3>
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">Akuntansi</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Sabtu, 8 Okt 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>09:30 - 10:20 WIB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                 <div className="bg-teal-700 text-white px-4 py-1.5 rounded-full text-sm font-bold self-end md:self-center">
                   Lunas
                 </div>
                 <Button 
                   onClick={() => navigate('/learner/jadwal-belajar')}
                   className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-[#000666] rounded-xl px-6 h-11 font-bold"
                 >
                   Lihat Jadwal
                 </Button>
              </div>
            </div>

            {/* Card 3: Kevin Sanjaya (Paid) */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img src="https://i.pravatar.cc/150?img=12" alt="Tutor" className="w-24 h-24 rounded-2xl object-cover" />
                  <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    4.8
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">Kevin Sanjaya</h3>
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">Kalkulus</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm font-medium">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      <span>Senin, 1 Okt 2026</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      <span>15:30 - 16:20 WIB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                 <div className="bg-teal-700 text-white px-4 py-1.5 rounded-full text-sm font-bold self-end md:self-center">
                   Lunas
                 </div>
                 <Button 
                   onClick={() => navigate('/learner/jadwal-belajar')}
                   className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-[#000666] rounded-xl px-6 h-11 font-bold"
                 >
                   Lihat Jadwal
                 </Button>
              </div>
            </div>

          </div>
        )}

        {view === 'checkout' && (
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
                    <div className="font-bold text-slate-900 text-lg">Budi Santoso</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Tutor</div>
                    <div className="flex items-center gap-3">
                      <img src="https://i.pravatar.cc/150?img=11" alt="Tutor" className="w-8 h-8 rounded-full object-cover shadow-sm border border-slate-100" />
                      <div className="font-bold text-slate-900 text-lg">Irkham Wildan</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Mata Pelajaran</div>
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full text-xs font-bold">Algoritma & Struktur Data</span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Jadwal Sesi</div>
                    <div className="flex items-start gap-2 text-slate-800 font-medium text-sm">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div>
                        <div>Senin, 14 Okt 2026</div>
                        <div>12:30 - 14:10</div>
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
                  {/* Bayar Tunai */}
                  <div 
                    onClick={() => setSelectedMethod('Tunai')}
                    className={`p-5 rounded-[20px] border-2 cursor-pointer flex items-center justify-between transition-all ${selectedMethod === 'Tunai' ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 hover:border-slate-200 bg-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50/80 rounded-[14px] flex items-center justify-center text-emerald-600">
                        <Banknote className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-bold text-[#000666] text-lg">Bayar Tunai</div>
                        <div className="text-sm text-slate-500 font-medium">Di Lokasi</div>
                      </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'Tunai' ? 'border-emerald-500' : 'border-slate-200'}`}>
                      {selectedMethod === 'Tunai' && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                    </div>
                  </div>

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
                     <span>Biaya Sesi (2 Sesi)</span>
                     <span>Rp 90.000</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span>Biaya Layanan</span>
                     <span>Rp 15.000</span>
                   </div>
                 </div>

                 <div className="h-px bg-white/10 my-8"></div>

                 <div className="mb-2 text-xs font-bold text-white/50 uppercase tracking-widest">Total Pembayaran</div>
                 <div className="text-5xl font-bold mb-10 tracking-tight">Rp 105.000</div>

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
        )}
      </div>

      {/* DYNAMIC MODALS */}

      {/* 1. VA Pop Up Modal */}
      {modalType === 'VA' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-[24px] w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Dark Blue Theme */}
            <div className="bg-[#000666] p-6 text-white relative shrink-0">
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className={`font-bold text-lg text-blue-800`}>
                    {selectedBank}
                  </span>
                </div>
                <div>
                  <div className="text-white/80 text-sm font-medium">Pembayaran via Virtual Account</div>
                  <div className="font-bold text-lg">Bank {selectedBank}</div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              <div className="text-center">
                <h3 className="text-slate-800 font-bold text-lg mb-2">Selesaikan Pembayaran Anda</h3>
                <p className="text-slate-500 text-sm">
                  Selesaikan pembayaran Anda sebelum <span className="font-bold text-slate-700">15 Okt 2026, 12:30 WIB</span>
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5 space-y-4">
                
                {/* VA Number */}
                <div>
                  <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Nomor Virtual Account</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-slate-800 tracking-wider">
                      8239012389102
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText('8239012389102')}
                      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Salin
                    </Button>
                  </div>
                </div>

                <div className="h-px bg-slate-200 w-full"></div>

                {/* Amount */}
                <div>
                  <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Total Pembayaran</div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-indigo-700">
                      Rp 105.000
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText('105000')}
                      className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Salin
                    </Button>
                  </div>
                </div>

              </div>

              <Button 
                onClick={handleSelesai}
                className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/30"
              >
                Selesai Pembayaran
              </Button>

              <p className="text-center text-xs text-slate-400 mt-4">
                Pembayaran akan dikonfirmasi secara otomatis oleh sistem KonekDin
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. E-Wallet Modal */}
      {modalType === 'EWALLET' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-[24px] w-full max-w-md flex flex-col max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#000666] p-6 text-white relative shrink-0">
              <button 
                onClick={() => setModalType(null)}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                  <span className={`font-bold text-sm text-blue-800`}>
                    {selectedEWallet}
                  </span>
                </div>
                <div>
                  <div className="text-white/80 text-sm font-medium">Pembayaran E-Wallet</div>
                  <div className="font-bold text-lg">{selectedEWallet} QRIS / Transfer</div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              <div className="text-center">
                <h3 className="text-slate-800 font-bold text-lg mb-1">Scan QRIS atau Transfer</h3>
                <p className="text-slate-500 text-sm">
                  Gunakan aplikasi <span className="font-bold">{selectedEWallet}</span> Anda untuk menyelesaikan pembayaran.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4 space-y-4">
                
                {/* QR Code Placeholder */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-32 h-32 bg-white border-2 border-slate-200 rounded-xl p-2 mb-2 flex items-center justify-center shadow-sm">
                    {/* Placeholder pattern for QR code */}
                    <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-contain bg-center opacity-70"></div>
                  </div>
                  <p className="text-xs font-bold text-slate-400">QRIS A/N KONEKDIN INDONESIA</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-px bg-slate-200 flex-1"></div>
                  <div className="text-xs font-bold text-slate-400 uppercase">ATAU TRANSFER KE</div>
                  <div className="h-px bg-slate-200 flex-1"></div>
                </div>

                {/* E-Wallet Number */}
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <div className="text-slate-500 text-xs font-bold mb-1 uppercase tracking-wider">Nomor Tujuan {selectedEWallet}</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-bold text-slate-800 tracking-wider">
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
                className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/30 shrink-0 mt-2"
              >
                Selesai Pembayaran
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Tunai Modal */}
      {modalType === 'TUNAI' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-[24px] w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Banknote className="w-10 h-10 text-emerald-600" />
              </div>
              
              <div>
                <h3 className="text-slate-900 font-bold text-2xl mb-2">Pembayaran Tunai</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  Sesi Anda akan segera dikonfirmasi. Pastikan Anda menyiapkan uang pas sebesar <strong className="text-emerald-600">Rp 105.000</strong> untuk diserahkan kepada Tutor secara langsung di lokasi pertemuan.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <Button 
                  onClick={handleSelesai}
                  className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-500/30"
                >
                  Ya, Mengerti
                </Button>
                <Button 
                  onClick={() => setModalType(null)}
                  variant="ghost"
                  className="w-full h-12 text-slate-500 hover:bg-slate-100 font-bold rounded-xl"
                >
                  Batal
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
