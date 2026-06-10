import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Star, Search, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

export default function DetailPesanan() {
  const navigate = useNavigate()
  
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
           console.warn("Token tidak ditemukan, mengarahkan ke halaman login")
           window.location.href = '/login'
           return
        }

        const headers = { Authorization: `Bearer ${token}` }
        const response = await axios.get('http://127.0.0.1:8000/api/learner/bookings', { headers })
        
        if (response.data && response.data.data) {
           setOrders(response.data.data)
        }
      } catch (err) {
        console.error("Gagal mengambil pesanan:", err)
        
        if (err.response?.status === 401) {
           localStorage.removeItem('token')
           window.location.href = '/login'
           return
        }

        setErrorMsg(err.response?.data?.message || err.message || "Gagal mengambil data pesanan")
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleBayarSekarang = (orderId) => {
    navigate('/learner/pembayaran', { state: { returnTo: '/learner/detail-pesanan', orderId } })
    window.scrollTo(0, 0)
  }

  // Fungsi utilitas format tanggal & waktu
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' }
    return new Date(dateString).toLocaleDateString('id-ID', options)
  }

  const formatTimeRange = (slots) => {
    if (!slots || slots.length === 0) return '-'
    // Mengambil rentang terkecil start_time ke terbesar end_time jika slotnya multiple
    // Tapi karena relasinya belongsTo master_slot, biasanya 1 booking = 1 slot.
    // Jika 1 booking bisa banyak slot, format sesuai. Asumsinya 1 slot:
    const slot = slots[0] || slots
    if (slot && slot.start_time && slot.end_time) {
       // Potong detik (misal 07:00:00 -> 07:00)
       return `${slot.start_time.substring(0, 5)} - ${slot.end_time.substring(0, 5)} WIB`
    }
    return '-'
  }

  return (
    <div className="flex flex-col min-h-full">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Detail Pesanan</h1>
        <p className="text-slate-500">Lihat detail pesanan dan selesaikan pembayaran.</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-10">
        
        {errorMsg ? (
          <div className="flex flex-col justify-center items-center h-64 text-red-500 bg-red-50 rounded-2xl border border-red-100">
            <XCircle className="w-12 h-12 mb-3 text-red-400" />
            <p className="font-bold text-lg mb-2">Gagal Memuat Pesanan</p>
            <p className="text-sm">{errorMsg}</p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-64 text-slate-500 animate-pulse">
             Memuat data pesanan...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-80 text-slate-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
             <Search className="w-16 h-16 mb-4 text-slate-300" />
             <p className="font-bold text-xl text-slate-700 mb-2">Belum Ada Pesanan</p>
             <p className="text-sm text-slate-500 mb-6 text-center max-w-sm">Anda belum melakukan pemesanan sesi belajar. Yuk cari tutor yang sesuai dengan kebutuhanmu!</p>
             <Button 
               onClick={() => navigate('/learner/cari-tutor')}
               className="bg-[#1a1a4b] hover:bg-[#121235] text-white rounded-xl px-8 h-12 font-bold shadow-sm"
             >
               Cari Tutor Sekarang
             </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {orders.map((order) => {
              const tutor = order.tutor || {};
              const course = order.course || {};
              const status = order.payment_status || 'unpaid';

              return (
                <div key={order.booking_id} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img 
                        src={tutor.avatar ? `http://127.0.0.1:8000/storage/${tutor.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name || 'Tutor')}&background=random`} 
                        alt="Tutor" 
                        className="w-24 h-24 rounded-2xl object-cover border border-slate-100" 
                      />
                      <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {Number(tutor.rating_avg) || 0}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-slate-900">{tutor.name || 'Tutor'}</h3>
                        <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {course.course_name || 'Mata Kuliah'}
                        </span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-slate-500 text-sm font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(order.booking_date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{formatTimeRange(order.slot || order.slots)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 w-full md:w-auto">
                    {status === 'unpaid' ? (
                      <>
                        <div className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold self-end md:self-center">
                          Belum Bayar
                        </div>
                        <Button 
                          onClick={() => handleBayarSekarang(order.booking_id)} 
                          className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6 h-11 font-bold shadow-sm shadow-emerald-500/20"
                        >
                          Bayar Sekarang
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="bg-teal-700 text-white px-4 py-1.5 rounded-full text-sm font-bold self-end md:self-center uppercase">
                          {status}
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
              );
            })}

          </div>
        )}
      </div>
    </div>
  )
}
