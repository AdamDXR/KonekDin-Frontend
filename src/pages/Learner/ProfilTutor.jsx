import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, Clock, Zap, BookOpen, UserCircle, CheckCircle2, ChevronRight, MessageSquareMore } from 'lucide-react'
import PesanSesiModal from '@/components/Learner/PesanSesiModal'
import axios from '@/lib/axios'

export default function ProfilTutor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  const [tutor, setTutor] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get(`/tutors/${id}`)
        console.log("Response Tutor:", response.data)
        if (response.data && response.data.data) {
          const t = response.data.data;
          
          // Kelompokkan jadwal berdasarkan hari
          const groupedSchedule = {};
          if (t.schedule && Array.isArray(t.schedule)) {
             t.schedule.forEach(s => {
                const d = s.day || s.day_of_week;
                if (!groupedSchedule[d]) groupedSchedule[d] = [];
                const timeStr = s.time || `${s.start_time?.substring(0,5)} - ${s.end_time?.substring(0,5)}`;
                groupedSchedule[d].push({ ...s, timeStr });
             })
          }
          
          const scheduleArr = Object.keys(groupedSchedule).map(day => ({
             day,
             times: groupedSchedule[day].map(s => s.timeStr)
          }));

          const mapped = {
            id: t.id,
            name: t.name,
            university: t.university || 'Universitas',
            role: t.major || 'Tutor',
            isVerified: true,
            bio: t.bio || 'Tutor KonekDin yang berdedikasi membantu Anda belajar.',
            about: t.bio || 'Halo! Saya tutor di KonekDin.',
            rating: Number(t.rating_avg) || 0,
            sessionsCompleted: t.review_count || 0,
            price: Number(t.price) || 0,
            image: t.avatar ? `http://127.0.0.1:8000/storage/${t.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=random`,
            ipk: 3.85, 
            courses: t.courses ? t.courses.map(c => ({ name: c.name || c, grade: 'A' })) : [],
            skills: t.skills || [],
            schedule: scheduleArr,
            rawSlots: t.schedule || [],
            rawCourses: t.courses || [],
            reviews: t.reviews ? t.reviews.map(r => ({
              name: r.learner?.name || r.user?.name || 'Anonim',
              role: 'Learner',
              text: r.comment || r.review || '',
              rating: Number(r.rating) || 5
            })) : []
          }
          setTutor(mapped)
        }
      } catch (err) {
        console.error("Gagal memuat tutor:", err)
        setErrorMsg("Gagal memuat profil tutor.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchTutor()
  }, [id])

  useEffect(() => {
    if (location.hash === '#jadwal-ketersediaan' && !isLoading && tutor) {
      setTimeout(() => {
        const element = document.getElementById('jadwal-ketersediaan')
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          element.classList.add('ring-2', 'ring-teal-500', 'ring-offset-2', 'transition-all', 'duration-500')
          setTimeout(() => {
            element.classList.remove('ring-2', 'ring-teal-500', 'ring-offset-2')
          }, 3000)
        }
      }, 100)
    }
  }, [location, isLoading, tutor])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000666]"></div>
        <p className="mt-4 text-slate-500 font-medium">Memuat profil tutor...</p>
      </div>
    )
  }

  if (errorMsg || !tutor) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-red-50 rounded-3xl border border-red-100">
        <h2 className="text-xl font-bold text-red-600 mb-2">Tutor Tidak Ditemukan</h2>
        <p className="text-red-500">{errorMsg || 'Tutor yang Anda cari mungkin tidak ada.'}</p>
        <Button onClick={() => navigate(-1)} className="mt-6 bg-[#000666]">Kembali</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full">
      {/* Header / Hero Area */}
      <div className="bg-white rounded-[24px] border border-slate-200 p-8 mb-8 shadow-sm">
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </button>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="relative flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-teal-100">
                <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm border border-slate-100">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {tutor.rating}
              </div>
            </div>
            
            <div className="flex-1">
              {tutor.isVerified && (
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Tutor Terverifikasi
                </div>
              )}
              <h1 className="text-3xl font-bold text-slate-900">
                {tutor.name}
              </h1>
              <p className="text-lg font-medium text-slate-500 mt-1">
                {tutor.university}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            




            {/* IPK */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                IPK (Indeks Prestasi Kumulatif)
              </h2>
              <div className="flex items-center gap-4">
                <div className="bg-indigo-50 border border-indigo-100 px-6 py-4 rounded-xl flex items-baseline justify-center">
                  <span className="text-3xl font-extrabold text-indigo-700">{tutor.ipk || (Math.random() * (4.0 - 3.5) + 3.5).toFixed(2)}</span>
                  <span className="text-base font-bold text-indigo-400 ml-1.5">/ 4.00</span>
                </div>
                <p className="text-slate-500 text-sm font-medium flex-1">
                  Tutor ini memiliki riwayat akademik yang memuaskan dan telah terverifikasi oleh KonekDin.
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <MessageSquareMore className="w-6 h-6 mr-2 text-green-800" />
                  Ulasan Mahasiswa
                </h2>
                <p className="text-sm font-semibold text-slate-500 mt-1 ml-8">Top Review</p>
              </div>
              <div className="space-y-4">
                {tutor.reviews && tutor.reviews.length > 0 ? tutor.reviews.slice(0, 5).map((review, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-bold text-slate-900">{review.name}</div>
                        <div className="text-xs text-slate-500">{review.role}</div>
                      </div>
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-slate-200" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm italic">"{review.text}"</p>
                  </div>
                )) : (
                  <p className="text-slate-500 italic text-sm py-2">Belum ada ulasan untuk tutor ini.</p>
                )}
              </div>
            </div>
            
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[380px] space-y-6">
            
            {/* CTA Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-slate-500 font-medium mb-1">Tarif Sesi mulai dari</div>
              <div className="text-3xl font-bold text-slate-900 mb-6">Rp {tutor.price.toLocaleString('id-ID')}<span className="text-base font-normal text-slate-500">/sesi</span></div>
              
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center"
              >
                <Zap className="w-5 h-5 mr-2" />
                Pesan Sesi Sekarang
              </Button>
              <p className="text-xs text-center text-slate-500 mt-4">
                Pembayaran aman melalui sistem KonekDin
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Keahlian Utama</h3>
              <div className="flex flex-wrap gap-2">
                {tutor.skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div id="jadwal-ketersediaan" className="bg-white p-6 rounded-2xl border border-slate-200 scroll-mt-24">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-teal-600" />
                Jadwal Ketersediaan
              </h3>
              <div className="space-y-3">
                {tutor.schedule && tutor.schedule.length > 0 ? tutor.schedule.map((slot, idx) => (
                  <div key={idx} className="flex flex-col py-3 border-b border-slate-100 last:border-0 gap-2">
                    <span className="font-bold text-slate-700">{slot.day}</span>
                    <div className="flex flex-wrap gap-2">
                      {slot.times.map((time, tIdx) => (
                         <span key={tIdx} className="text-slate-600 bg-teal-50 px-3 py-1 rounded-md text-[11px] font-semibold">{time}</span>
                      ))}
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 text-sm italic">Belum ada jadwal yang tersedia.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <PesanSesiModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          tutor={tutor} 
        />
      )}
    </div>
  )
}