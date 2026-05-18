import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Star, Clock, Zap, BookOpen, UserCircle, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react'
import PesanSesiModal from '@/components/Learner/PesanSesiModal'

const MOCK_TUTOR_DETAIL = {
  id: 1,
  name: 'Irkham Wildan',
  university: 'Informatika\'21',
  role: 'Software Engineer',
  isVerified: true,
  bio: 'Saya akan membantu Anda menguasai fundamental ngoding hingga pembuatan aplikasi nyata dengan pendekatan terstruktur.',
  about: 'Halo! Saya Irkham, seorang mahasiswa tingkat akhir yang sangat antusias dengan dunia Software Engineering. Saya memiliki pengalaman memenangkan berbagai kompetisi hackathon dan bekerja di industri sebagai Backend Developer intern. Saya menggunakan pendekatan *practical coding*, artinya kita akan lebih banyak memecahkan masalah nyata ketimbang hanya belajar teori.',
  rating: 4.9,
  sessionsCompleted: 128,
  price: 45000,
  image: 'https://i.pravatar.cc/150?u=irkham',
  courses: [
    { name: 'Pemrograman Web', grade: 'A+' },
    { name: 'Struktur Data', grade: 'A+' }
  ],
  skills: ['Clean Code', 'BackEnd Development', 'JavaScript Expert', 'Express.js', 'React', 'Node.js', 'REST API'],
  schedule: [
    { day: 'Senin', time: '12:30 - 15:00' },
    { day: 'Rabu', time: '09:30 - 12:00' },
    { day: 'Sabtu', time: '07:00 - 12:00' },
    { day: 'Minggu', time: '07:00 - 18:00' }
  ],
  reviews: [
    { name: 'Andi Pratama', role: 'Teknik Informatika\'22', text: 'Sangat jelas! Kak Irkham membantu saya memahami konsep Asynchronous di JS dengan sangat mudah.' },
    { name: 'Maya Lestari', role: 'Sistem Informasi\'25', text: 'Sabar banget ngajarnya, sangat recommended buat yang baru belajar.' }
  ]
}

export default function ProfilTutor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const tutor = MOCK_TUTOR_DETAIL
  
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Header / Hero Area */}
      <div className="bg-white border-b border-slate-200 pt-6 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-6 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </button>
          
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white shrink-0 relative bg-teal-100">
              <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1">
              {tutor.isVerified && (
                <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  Tutor Terverifikasi
                </div>
              )}
              <h1 className="text-3xl font-bold text-slate-900 flex items-baseline gap-3">
                {tutor.name}
                <span className="text-lg font-medium text-slate-500">{tutor.university}</span>
              </h1>
              <p className="text-slate-600 mt-3 max-w-2xl leading-relaxed text-lg">
                {tutor.bio}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            
            {/* Stats */}
            <div className="flex gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex-1 flex flex-col justify-center items-center text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1 flex items-center justify-center">
                  <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 mr-2" />
                  {tutor.rating}
                </div>
                <div className="text-sm text-slate-500 font-medium">Rating Tutor</div>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 flex-1 flex flex-col justify-center items-center text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-teal-600 mr-2" />
                  {tutor.sessionsCompleted}
                </div>
                <div className="text-sm text-slate-500 font-medium">Sesi Selesai</div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <UserCircle className="w-6 h-6 mr-2 text-teal-600" />
                Tentang Saya
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {tutor.about}
              </p>
            </div>

            {/* Academic Portfolio */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-indigo-600" />
                Portofolio Akademik
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {tutor.courses.map((course, idx) => (
                  <div key={idx} className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-center justify-between">
                    <span className="font-semibold text-indigo-900">{course.name}</span>
                    <span className="px-3 py-1 bg-white text-indigo-700 font-bold rounded-lg shadow-sm">{course.grade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2 text-orange-500" />
                  Ulasan Mahasiswa
                </h2>
                <button className="text-sm font-semibold text-teal-600 hover:text-teal-700">Lihat Semua</button>
              </div>
              <div className="space-y-4">
                {tutor.reviews.map((review, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="font-bold text-slate-900">{review.name}</div>
                        <div className="text-xs text-slate-500">{review.role}</div>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700 text-sm italic">"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[380px] space-y-6">
            
            {/* CTA Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-slate-500 font-medium mb-1">Tarif Sesi mulai dari</div>
              <div className="text-3xl font-bold text-slate-900 mb-6">Rp {tutor.price.toLocaleString('id-ID')}<span className="text-base font-normal text-slate-500">/jam</span></div>
              
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
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 mr-2 text-teal-600" />
                Jadwal Ketersediaan
              </h3>
              <div className="space-y-3">
                {tutor.schedule.map((slot, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                    <span className="font-medium text-slate-700">{slot.day}</span>
                    <span className="text-slate-600 bg-teal-50 px-3 py-1 rounded-md text-sm">{slot.time}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Learning Flow */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">Alur Belajar</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">1</div>
                    <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                  </div>
                  <div className="pb-4">
                    <div className="font-bold text-slate-800 text-sm">Konsultasi Kebutuhan</div>
                    <div className="text-xs text-slate-500 mt-1">Diskusi materi dan tujuan belajar di awal sesi.</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">2</div>
                    <div className="w-0.5 h-full bg-slate-200 my-1"></div>
                  </div>
                  <div className="pb-4">
                    <div className="font-bold text-slate-800 text-sm">Coding Session Intensif</div>
                    <div className="text-xs text-slate-500 mt-1">Praktik langsung dengan bimbingan terarah.</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs">3</div>
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 text-sm">Review & Feedback</div>
                    <div className="text-xs text-slate-500 mt-1">Evaluasi hasil dan pemberian saran perbaikan.</div>
                  </div>
                </div>
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
