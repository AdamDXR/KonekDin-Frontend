import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Book, Calendar, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PesanSesiModal({ isOpen, onClose, tutor }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleBuatPesanan = () => {
    // In a real app, this would make an API call to create the order
    // Then navigate to the order detail page
    navigate('/learner/detail-pesanan')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-[32px] w-full max-w-[448px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header - Dark Blue */}
        <div className="bg-[#000666] pt-10 pb-8 px-8 flex flex-col items-center text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-[#AFFFED]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Ringkasan Pesanan</h2>
          <p className="text-white/80 text-sm">Konfirmasi rincian sesi mentorship Anda</p>
        </div>

        {/* Body - White */}
        <div className="px-8 py-6 space-y-4">
          
          {/* Subject Info */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0 mr-4">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 mb-0.5">MATA PELAJARAN</div>
              <div className="font-semibold text-slate-800">Algoritma & Struktur Data</div>
            </div>
          </div>

          {/* Time Info */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center shrink-0 mr-4">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-400 mb-0.5">WAKTU SESI</div>
              <div className="font-semibold text-slate-800">Senin, 14 Okt (12:30 - 14:20)</div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="pt-4 pb-2 space-y-3">
            <div className="flex justify-between items-center text-slate-600">
              <span>Biaya Sesi (2 Sesi)</span>
              <span className="font-semibold text-slate-800">Rp 90.000</span>
            </div>
            <div className="flex justify-between items-center text-slate-600">
              <span>Biaya Layanan</span>
              <span className="font-semibold text-slate-800">Rp 15.000</span>
            </div>
          </div>

        </div>

        {/* Total Bar */}
        <div className="bg-emerald-50 px-8 py-4 mx-8 rounded-2xl flex justify-between items-center mb-6">
          <span className="font-bold text-emerald-800">Total Pembayaran</span>
          <span className="text-lg font-bold text-emerald-700">Rp 105.000</span>
        </div>

        {/* Footer Actions */}
        <div className="px-8 pb-8 flex gap-4">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 h-12 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold rounded-xl"
          >
            Batal
          </Button>
          <Button 
            onClick={handleBuatPesanan}
            className="flex-[2] h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20"
          >
            Buat Pesanan
          </Button>
        </div>

      </div>
    </div>
  )
}
