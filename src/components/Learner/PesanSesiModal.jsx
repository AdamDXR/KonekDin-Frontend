import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Book, Calendar, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function PesanSesiModal({ isOpen, onClose, tutor }) {
  const navigate = useNavigate()
  
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedTime, setSelectedTime] = useState("")

  const scheduleOptions = useMemo(() => {
    if (!tutor) return []
    
    if (tutor.schedule) {
      return tutor.schedule.flatMap(slot => 
        slot.times.map(time => `${slot.day} (${time})`)
      )
    }

    if (tutor.availableDays && tutor.availableTimes) {
      return tutor.availableDays.flatMap((day) => 
        tutor.availableTimes.map((time) => `${day} (${time})`)
      )
    }

    return []
  }, [tutor])

  const courseOptions = useMemo(() => {
    if (!tutor || !tutor.courses) return []
    return tutor.courses.map(course => typeof course === 'string' ? course : course.name)
  }, [tutor])

  useEffect(() => {
    const scrollArea = document.getElementById('learner-scroll-area')
    
    if (isOpen) {
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
    }
    
    return () => {
      if (scrollArea) {
        scrollArea.style.paddingRight = ''
        scrollArea.style.overflow = ''
      }
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBuatPesanan = () => {
    // In a real app, this would make an API call to create the order
    // Then navigate to the order detail page
    navigate('/learner/detail-pesanan')
    onClose()
  }

  const serviceFee = 15000;
  const totalPrice = (tutor?.price || 0) + serviceFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-[24px] w-full max-w-[400px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header - Dark Blue */}
        <div className="bg-[#000666] pt-6 pb-5 px-6 flex flex-col items-center text-center relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-3">
            <FileText className="w-5 h-5 text-[#AFFFED]" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1">Ringkasan Pesanan</h2>
          <p className="text-white/80 text-xs">Konfirmasi rincian sesi mentorship Anda</p>
        </div>

        {/* Content Area */}
        <div className="px-6 py-5 space-y-3">
          
          {/* Subject Info */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 mr-3">
              <Book className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">MATA PELAJARAN</div>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="w-full h-auto bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:ring-0 focus:ring-offset-0 shadow-none text-left">
                  <SelectValue placeholder="Pilih Mata Pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {courseOptions.map((course, idx) => (
                    <SelectItem key={idx} value={course}>{course}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Time Info */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center">
            <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center shrink-0 mr-3">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">WAKTU SESI</div>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="w-full h-auto bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:ring-0 focus:ring-offset-0 shadow-none text-left">
                  <SelectValue placeholder="Pilih Waktu Sesi" />
                </SelectTrigger>
                <SelectContent>
                  {scheduleOptions.map((opt, idx) => (
                    <SelectItem key={idx} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="pt-2 pb-1 space-y-2">
            <div className="flex justify-between items-center text-slate-600 text-sm">
              <span>Biaya Sesi (1 Sesi)</span>
              <span className="font-semibold text-slate-800">Rp {tutor.price.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center text-slate-600 text-sm">
              <span>Biaya Layanan</span>
              <span className="font-semibold text-slate-800">Rp {serviceFee.toLocaleString('id-ID')}</span>
            </div>
          </div>

        </div>

        {/* Total Bar */}
        <div className="bg-emerald-50 px-6 py-3 mx-6 rounded-xl flex justify-between items-center mb-5 mt-1">
          <span className="text-sm font-bold text-emerald-800">Total Pembayaran</span>
          <span className="text-base font-bold text-emerald-700">Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex-1 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-sm"
          >
            Batal
          </Button>
          <Button 
            onClick={handleBuatPesanan}
            disabled={!selectedCourse || !selectedTime}
            className="flex-[2] h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Buat Pesanan
          </Button>
        </div>

      </div>
    </div>
  )
}
