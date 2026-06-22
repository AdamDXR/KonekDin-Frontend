import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Book, Calendar, X, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format, addDays } from 'date-fns'
import idLocale from 'date-fns/locale/id'
import axios from '@/lib/axios'

// Helper to map indonesian day names to JS getDay() indices
const dayNameToIndex = {
  'minggu': 0, 'senin': 1, 'selasa': 2, 'rabu': 3,
  'kamis': 4, 'jumat': 5, 'sabtu': 6,
  'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
  'thursday': 4, 'friday': 5, 'saturday': 6
}



export default function PesanSesiModal({ isOpen, onClose, tutor }) {
  const navigate = useNavigate()
  
  const [selectedCourseId, setSelectedCourseId] = useState("")
  const [selectedSlotStr, setSelectedSlotStr] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  const [selectedDate, setSelectedDate] = useState(null)
  
  // Hitung index hari apa saja tutor ini memiliki jadwal
  const availableDayIndices = useMemo(() => {
    if (!tutor || !tutor.rawSlots) return []
    const indices = new Set()
    tutor.rawSlots.forEach(slot => {
      const idx = dayNameToIndex[slot.day_of_week?.toLowerCase()]
      if (idx !== undefined) indices.add(idx)
    })
    return Array.from(indices)
  }, [tutor])

  const scheduleOptions = useMemo(() => {
    if (!tutor || !tutor.rawSlots || !selectedDate) return []
    
    const selectedDayIdx = selectedDate.getDay()
    
    return tutor.rawSlots
      .filter(slot => dayNameToIndex[slot.day_of_week?.toLowerCase()] === selectedDayIdx)
      .map(slot => ({
        id: slot.slot_id || slot.availability_id || slot.id,
        day_of_week: slot.day_of_week,
        label: `${slot.start_time?.substring(0,5) || ''} - ${slot.end_time?.substring(0,5) || ''} WIB`,
        value: JSON.stringify({ id: slot.slot_id || slot.availability_id || slot.id, day: slot.day_of_week })
      }))
  }, [tutor, selectedDate])

  // Reset slot jika tanggal berubah
  useEffect(() => {
    setSelectedSlotStr("")
  }, [selectedDate])

  const courseOptions = useMemo(() => {
    if (!tutor || !tutor.rawCourses) return []
    return tutor.rawCourses.map(course => ({
      id: course.course_id || course.tutor_course_id || course.id,
      name: course.course_name || course.name
    }))
  }, [tutor])

  useEffect(() => {
    const scrollArea = document.getElementById('learner-scroll-area')
    
    if (isOpen) {
      setErrorMsg(null)
      setSelectedCourseId("")
      setSelectedDate(null)
      setSelectedSlotStr("")
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

  const handleBuatPesanan = async () => {
    setIsLoading(true)
    setErrorMsg(null)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        navigate('/login')
        return
      }

      const slotData = JSON.parse(selectedSlotStr)
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const bookingDate = `${year}-${month}-${day}`

      const payload = {
        tutor_id: tutor.id,
        course_id: parseInt(selectedCourseId),
        booking_date: bookingDate,
        slot_ids: [slotData.id]
      }

      const headers = { Authorization: `Bearer ${token}` }
      await axios.post('/learner/bookings', payload)

      onClose()
      navigate('/learner/detail-pesanan')
      window.scrollTo(0, 0)
    } catch (err) {
      console.error("Gagal membuat pesanan:", err)
      console.log("Detail Error dari Backend:", err.response?.data)
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
        return
      }
      setErrorMsg(err.response?.data?.message || err.message || "Gagal membuat pesanan")
    } finally {
      setIsLoading(false)
    }
  }

  const serviceFee = 1000;
  const totalPrice = (tutor?.price || 0) + serviceFee;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      {/* Modal Container */}
      <div className="bg-white rounded-[24px] w-full max-w-[400px] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        
        {/* Header - Dark Blue */}
        <div className="bg-[#000666] pt-6 pb-5 px-6 flex flex-col items-center text-center relative shrink-0">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="absolute top-4 right-4 p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-50"
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
          
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl border border-red-100 flex gap-2 items-start text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Subject Info */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center">
            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 mr-3">
              <Book className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">MATA PELAJARAN</div>
              <Select value={selectedCourseId} onValueChange={setSelectedCourseId} disabled={isLoading}>
                <SelectTrigger className="w-full h-auto bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:ring-0 focus:ring-offset-0 shadow-none text-left">
                  <SelectValue placeholder="Pilih Mata Pelajaran" />
                </SelectTrigger>
                <SelectContent>
                  {courseOptions.map((course) => (
                    <SelectItem key={course.id || Math.random()} value={course.id ? String(course.id) : String(Math.random())}>{course.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Date Info */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center">
            <div className="w-8 h-8 bg-pink-100 text-pink-600 rounded-lg flex items-center justify-center shrink-0 mr-3">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">TANGGAL SESI</div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full h-auto bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:ring-0 focus:ring-offset-0 shadow-none text-left justify-start hover:bg-transparent ${!selectedDate ? "text-slate-500" : ""}`}
                  >
                    {selectedDate ? format(selectedDate, "EEEE, d MMMM yyyy", { locale: idLocale }) : "Pilih Tanggal Sesi"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => {
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      const maxDate = addDays(today, 30)
                      return date < today || date > maxDate || !availableDayIndices.includes(date.getDay())
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Time Info */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center">
            <div className="w-8 h-8 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center shrink-0 mr-3">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-bold text-slate-400 mb-0.5">WAKTU SESI</div>
              <Select value={selectedSlotStr} onValueChange={setSelectedSlotStr} disabled={isLoading || !selectedDate || scheduleOptions.length === 0}>
                <SelectTrigger className="w-full h-auto bg-transparent border-none p-0 text-sm font-semibold text-slate-800 focus:ring-0 focus:ring-offset-0 shadow-none text-left">
                  <SelectValue placeholder={!selectedDate ? "Pilih tanggal terlebih dahulu" : scheduleOptions.length === 0 ? "Tidak ada jadwal" : "Pilih Waktu Sesi"} />
                </SelectTrigger>
                <SelectContent>
                  {scheduleOptions.map((opt, idx) => (
                    <SelectItem key={idx} value={opt.value}>{opt.label}</SelectItem>
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
        <div className="bg-emerald-50 px-6 py-3 mx-6 rounded-xl flex justify-between items-center mb-5 mt-1 border border-emerald-100">
          <span className="text-sm font-bold text-emerald-800">Total Pembayaran</span>
          <span className="text-base font-bold text-emerald-700">Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>

        {/* Footer Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <Button 
            variant="ghost" 
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 h-10 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold rounded-xl text-sm transition-colors"
          >
            Batal
          </Button>
          <Button 
            onClick={handleBuatPesanan}
            disabled={!selectedCourseId || !selectedSlotStr || isLoading}
            className="flex-[2] h-10 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 text-sm disabled:opacity-60 transition-all"
          >
            {isLoading ? "Memproses..." : "Buat Pesanan"}
          </Button>
        </div>

      </div>
    </div>
  )
}
