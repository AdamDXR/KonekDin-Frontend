import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Star,
  CheckCircle2,
  CalendarDays,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const tutorData = {
  name: 'Irkham Wildan',
  prodi: "Informatika '21",
  avatar: 'https://i.pravatar.cc/150?img=68',
  badge: 'Tutor Terverifikasi',
  bio: 'Software Engineer dengan fokus pada pengembangan aplikasi modern dan scalable. Membantu mahasiswa memahami konsep pemrograman dari dasar hingga implementasi project nyata.',
  rating: 4.9,
  totalSesi: 121,
  skills: [
    'Clean Code', 'BackEnd Development', 'JavaScript Expert',
    'Express.js', 'React', 'Node.js', 'REST API',
  ],
  about: [
    '"Sebagai mahasiswa yang memiliki ketertarikan dan keahlian di bidang pengembangan software, saya aktif membantu teman-teman memahami konsep pemrograman dari dasar hingga implementasi project nyata. Dengan pengalaman belajar dan praktik langsung, saya berfokus pada pengembangan aplikasi web dan backend yang efisien serta mudah dipahami."',
    'Metodologi pengajaran saya berfokus pada practical coding dan problem solving. Mahasiswa tidak hanya belajar teori, tetapi langsung praktik membangun aplikasi menggunakan teknologi yang relevan di industri seperti JavaScript, Node.js, dan database modern.',
  ],
  portfolio: [
    { matkul: 'Pemrograman Web', grade: 'A+' },
    { matkul: 'Struktur Data', grade: 'A+' },
  ],
  reviews: [
    {
      id: 1,
      name: 'Andi Pratama',
      prodi: "Mahasiswa Teknik Informatika '22",
      text: '"Penjelasannya Irkham mudah dipahami, terutama saat belajar backend dan API. Jadi lebih ngerti alur kerja aplikasi dari awal sampai deploy."',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    {
      id: 2,
      name: 'Maya Lestari',
      prodi: "Mahasiswi Sistem Informasi '21",
      text: '"Sesi belajarnya seru dan langsung praktik coding. Tutor juga bantu debug, jadi aku stuck di debugging, jadi lebih paham cara nyari solusi sendiri."',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
  ],
  schedule: [
    { day: 'Senin', time: '13:00 - 21:00', off: false },
    { day: 'Rabu', time: '19:00 - 21:00', off: false },
    { day: 'Sabtu', time: '10:00 - 15:00', off: false },
    { day: 'Minggu', time: 'Libur', off: true },
  ],
  price: 45000,
  alurBelajar: [
    {
      title: 'Konsultasi Kebutuhan',
      desc: 'Diskusi materi, level kemampuan, dan tujuan belajar (Starter / Advanced / Expert).',
    },
    {
      title: 'Coding Session Intensif',
      desc: 'Hands-on coding, debugging, dan pemahaman konsep penting.',
    },
    {
      title: 'Review / Mini Project',
      desc: 'Review bersama agar bisa langsung bangun mini proyek.',
    },
  ],
}

export default function ProfilTutor() {
  const navigate = useNavigate()

  return (
    <div className="pb-10 max-w-[960px]">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-[#0a0f44] mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ====== LEFT COLUMN ====== */}
        <div className="lg:col-span-2 space-y-5">

          {/* Hero Card: photo + name + bio */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex gap-5 items-start">
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-4">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {tutorData.badge}
                </span>
                <h1 className="text-[36px] sm:text-[42px] font-extrabold text-[#0a0f44] leading-tight tracking-tight">
                  {tutorData.name}
                </h1>
                <p className="text-[14px] text-teal-600 font-semibold mt-1">{tutorData.prodi}</p>
                <p className="text-[13px] text-slate-500 leading-relaxed mt-3 max-w-[380px]">
                  {tutorData.bio}
                </p>
              </div>
              <div className="flex-shrink-0">
                <Avatar className="h-[130px] w-[130px] rounded-2xl">
                  <AvatarImage src={tutorData.avatar} alt={tutorData.name} className="object-cover" />
                  <AvatarFallback className="bg-[#0a0f44] text-white text-4xl rounded-2xl">
                    {tutorData.name[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Rating + Keahlian Utama */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Rating */}
              <div className="text-center flex-shrink-0 min-w-[110px]">
                <div className="flex items-center justify-center gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-[38px] font-extrabold text-[#0a0f44] leading-none">{tutorData.rating}</p>
                <p className="text-[12px] text-slate-400 mt-1">{tutorData.totalSesi} Sesi Selesai</p>
              </div>
              {/* Divider */}
              <div className="hidden sm:block w-px bg-slate-100 self-stretch" />
              <div className="h-px sm:hidden w-full bg-slate-100" />
              {/* Skills */}
              <div className="flex-1">
                <p className="text-[10px] font-bold tracking-[0.14em] text-teal-600 uppercase mb-3">
                  Keahlian Utama
                </p>
                <div className="flex flex-wrap gap-2">
                  {tutorData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[12px] font-medium text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tentang Saya */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h2 className="text-[18px] font-bold text-teal-600 mb-4">Tentang Saya</h2>
            <div className="space-y-3">
              {tutorData.about.map((para, i) => (
                <p
                  key={i}
                  className={`text-[13px] leading-relaxed ${
                    i === 0 ? 'text-slate-700 italic' : 'text-slate-500'
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Portofolio Akademik */}
          <div className="bg-[#0a0f44] rounded-2xl p-6">
            <h2 className="text-[18px] font-bold text-white mb-4">Portofolio Akademik</h2>
            <div className="grid grid-cols-2 gap-4">
              {tutorData.portfolio.map((p) => (
                <div key={p.matkul} className="bg-indigo-900/50 rounded-xl p-4">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-teal-300 uppercase">
                    MATA KULIAH
                  </p>
                  <p className="text-[15px] font-bold text-white mt-1">{p.matkul}</p>
                  <p className="text-[36px] font-extrabold text-teal-300 leading-none mt-2">{p.grade}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ulasan Mahasiswa */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[18px] font-bold text-[#0a0f44]">Ulasan Mahasiswa</h2>
              <button className="text-[12px] font-semibold text-teal-600 hover:underline flex items-center gap-1">
                Lihat Semua <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="space-y-5">
              {tutorData.reviews.map((review) => (
                <div key={review.id} className="flex gap-3.5">
                  <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src={review.avatar} alt={review.name} className="object-cover" />
                    <AvatarFallback className="bg-slate-200 text-slate-600 text-sm">
                      {review.name[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-[13px] font-bold text-[#0a0f44]">{review.name}</p>
                    <p className="text-[11px] text-slate-400 mb-2">{review.prodi}</p>
                    <p className="text-[13px] text-slate-500 italic leading-relaxed">{review.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ====== RIGHT SIDEBAR ====== */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">

            {/* Jadwal Ketersediaan + Harga + CTA */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-4 w-4 text-teal-600" />
                <h3 className="text-[14px] font-bold text-[#0a0f44]">Jadwal Ketersediaan</h3>
              </div>
              <div className="space-y-2.5">
                {tutorData.schedule.map((s) => (
                  <div key={s.day} className="flex items-center justify-between">
                    <span className="text-[13px] text-slate-600 font-medium">{s.day}</span>
                    <span
                      className={`text-[12px] font-semibold ${
                        s.off ? 'text-red-400' : 'text-slate-700'
                      }`}
                    >
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <p className="text-[10px] font-bold tracking-[0.1em] text-slate-400 uppercase">
                  Mulai dari
                </p>
                <p className="text-[24px] font-extrabold text-[#0a0f44] mt-0.5">
                  Rp {tutorData.price.toLocaleString('id-ID')}
                  <span className="text-[13px] font-medium text-slate-400"> /jam</span>
                </p>
              </div>

              <Link to="/learner/detail-pesanan" className="block w-full">
                <Button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-11 text-[14px] font-bold shadow-none gap-2">
                  <Zap className="h-4 w-4" />
                  Pesan Sesi Sekarang
                </Button>
              </Link>
            </div>

            {/* Alur Belajar */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h3 className="text-[14px] font-bold text-[#0a0f44] mb-4">Alur Belajar</h3>
              <div className="relative pl-5">
                {/* Vertical connecting line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-teal-100" />
                <div className="space-y-5">
                  {tutorData.alurBelajar.map((step, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-5 top-0.5 h-3.5 w-3.5 rounded-full bg-teal-500 z-10 border-2 border-white shadow-sm" />
                      <p className="text-[13px] font-bold text-[#0a0f44]">{step.title}</p>
                      <p className="text-[12px] text-slate-400 leading-relaxed mt-0.5">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
