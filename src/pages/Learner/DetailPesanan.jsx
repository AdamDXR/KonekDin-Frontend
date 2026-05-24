import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DetailPesanan() {
  const navigate = useNavigate()
  
  // Status state for the active order (Irkham Wildan)
  const [irkhamStatus, setIrkhamStatus] = useState('unpaid')
  
  const handleBayarSekarang = () => {
    navigate('/learner/pembayaran', { state: { returnTo: '/learner/detail-pesanan' } })
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex flex-col min-h-full">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Detail Pesanan</h1>
        <p className="text-slate-500">Lihat detail pesanan dan selesaikan pembayaran.</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-10">
        
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
                       Bayar Sekarang
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
      </div>
    </div>
  )
}
