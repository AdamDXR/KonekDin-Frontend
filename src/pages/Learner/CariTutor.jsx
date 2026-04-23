import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search,
  Monitor,
  CalendarDays,
  Clock,
  Star,
  BookOpen,
  Users,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const mataKuliahOptions = ['Pilih Matkul ...', 'Algoritma', 'Basis Data', 'Pemrograman Web', 'Jaringan Komputer']
const hariOptions = ['Pilih Hari ...', 'Senin, 14 Okt', 'Selasa, 15 Okt', 'Rabu, 16 Okt']
const jamOptions = ['Pilih Jam ...', '09:00 - 10:30', '11:00 - 12:30', '12.30 - 14.10', '14:00 - 15:30']

const tutorsData = [
  {
    id: 1,
    name: 'Irkham Wildan',
    avatar: 'https://i.pravatar.cc/150?img=68',
    rating: 4.9,
    reviews: 128,
    price: 45000,
    badges: ['TERVERIFIKASI', 'TUTOR TERBAIK', 'RESPONSIF'],
    isTop: true,
  },
  {
    id: 2,
    name: 'Mery Zahra',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4.8,
    reviews: 94,
    price: 38000,
    badges: ['TERVERIFIKASI', 'RESPONSIF'],
    isTop: false,
  },
]

export default function CariTutor() {
  const [selectedMatkul, setSelectedMatkul] = useState('Algoritma')
  const [selectedHari, setSelectedHari] = useState('Senin, 14 Okt')
  const [selectedJam, setSelectedJam] = useState('12.30 - 14.10')
  const [showTutors, setShowTutors] = useState(true)

  const hasSelectedMatkul = selectedMatkul !== 'Pilih Matkul ...'
  const hasSelectedHari = selectedHari !== 'Pilih Hari ...'
  const hasSelectedJam = selectedJam !== 'Pilih Jam ...'

  const handleSearch = () => {
    if (hasSelectedMatkul) setShowTutors(true)
  }

  return (
    <div className="pb-10">
      {/* ===== Dark Hero Banner — full bleed ===== */}
      <div className="-mx-6 lg:-mx-10 -mt-6 lg:-mt-8 mb-8 bg-[#0a0f44] px-6 lg:px-10 py-8 lg:py-10">
        <div className="flex items-center gap-1.5 text-sm mb-3">
          <span className="text-slate-400">Kategori Mata Kuliah</span>
          {hasSelectedMatkul && (
            <>
              <span className="text-slate-500 mx-1">/</span>
              <span className="text-teal-300 font-medium">{selectedMatkul}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-3">
          {hasSelectedMatkul
            ? <>{selectedMatkul} &amp; Struktur Data</>
            : 'Mau Kuasai Materi Apa Hari Ini?'}
        </h1>
        <p className="text-[15px] text-slate-300 leading-relaxed max-w-2xl">
          Kuasai pengurutan, teori graf, dan pemrograman dinamis dengan mentor tingkat atas. Pilih slot waktu yang Anda inginkan untuk melihat ahli yang tersedia.
        </p>
      </div>

      {/* === Main 2-Column Layout === */}
      <div className="flex gap-10">
        {/* ---- LEFT COLUMN ---- */}
        <div className="flex-1 min-w-0">
          {/* Filter Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
            <div className="p-6 pb-4">
              {/* Step Labels */}
              <div className="flex items-center gap-8 mb-5">
                {[
                  { n: 1, l: 'Pilih Mata Kuliah' },
                  { n: 2, l: 'Pilih Hari' },
                  { n: 3, l: 'Pilih Jam' },
                ].map((step) => (
                  <div key={step.n} className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-teal-50 text-teal-700 border border-teal-100 flex items-center justify-center text-xs font-bold">
                      {step.n}
                    </span>
                    <span className="text-sm font-semibold text-[#0a0f44]">{step.l}</span>
                  </div>
                ))}
              </div>

              {/* 3 Select Dropdowns */}
              <div className="grid grid-cols-3 gap-4">
                {/* Mata Kuliah */}
                <div className="relative">
                  <Monitor className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    value={selectedMatkul}
                    onChange={(e) => { setSelectedMatkul(e.target.value); setShowTutors(false) }}
                    className="w-full h-11 pl-10 pr-9 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-100 cursor-pointer"
                  >
                    {mataKuliahOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Hari */}
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    value={selectedHari}
                    onChange={(e) => { setSelectedHari(e.target.value); setShowTutors(false) }}
                    className="w-full h-11 pl-10 pr-9 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-100 cursor-pointer"
                  >
                    {hariOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Jam */}
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    value={selectedJam}
                    onChange={(e) => { setSelectedJam(e.target.value); setShowTutors(false) }}
                    className="w-full h-11 pl-10 pr-9 border border-slate-200 rounded-xl text-sm text-slate-700 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-teal-100 cursor-pointer"
                  >
                    {jamOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Separator + Search Button */}
            <div className="border-t border-slate-100 px-6 py-4 flex justify-center">
              <button
                onClick={handleSearch}
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 transition-colors"
              >
                <Search className="h-4 w-4" />
                Tampilkan Daftar Tutor
              </button>
            </div>
          </div>

          {/* Tutor Untukmu Section */}
          {showTutors && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-[#0a0f44]">Tutor Untukmu</h2>
                <button className="flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                  Filter <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {tutorsData.map((tutor) => (
                  <div key={tutor.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
                    <div className="flex gap-5">
                      {/* Tutor Avatar */}
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-24 w-24 rounded-xl">
                          <AvatarImage src={tutor.avatar} alt={tutor.name} className="object-cover" />
                          <AvatarFallback className="bg-[#0a0f44] text-white text-xl rounded-xl">{tutor.name[0]}</AvatarFallback>
                        </Avatar>
                        {tutor.isTop && (
                          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-[10px] font-bold px-3 py-0.5 rounded-full tracking-wide">
                            TOP
                          </span>
                        )}
                      </div>

                      {/* Tutor Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-[#0a0f44]">{tutor.name}</h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-sm font-semibold text-slate-700">{tutor.rating}</span>
                              <span className="text-sm text-slate-400">({tutor.reviews} ulasan)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-teal-600">Rp {tutor.price.toLocaleString('id-ID')}</p>
                            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">PER JAM</p>
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mt-2.5">
                          {tutor.badges.map((badge) => (
                            <span key={badge} className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded tracking-wide">
                              {badge}
                            </span>
                          ))}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-4">
                          <Button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-10 text-sm font-semibold shadow-none">
                            Pesan Tutor
                          </Button>
                          <Link to={`/learner/profil-tutor/${tutor.id}`}>
                            <Button variant="outline" className="rounded-xl h-10 px-6 text-sm font-semibold border-slate-200 shadow-none text-[#0a0f44]">
                              Profil
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ---- RIGHT COLUMN: Ringkasan ---- */}
        <div className="hidden xl:block w-[230px] flex-shrink-0 pt-1">
          <div className="sticky top-8">
            <h2 className="text-2xl font-bold text-[#0a0f44] mb-1">Ringkasan</h2>
            <p className="text-sm text-slate-400 mb-8">Lengkapi detail sesi Anda</p>

            {/* Timeline */}
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-slate-200"></div>

              <div className="space-y-8">
                {/* Step 1: Mata Pelajaran */}
                <div className="relative flex items-start gap-4">
                  <div className={`absolute -left-6 h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                    hasSelectedMatkul ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="ml-4">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-teal-600 uppercase">MATA PELAJARAN TERPILIH</p>
                    {hasSelectedMatkul ? (
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{selectedMatkul}</p>
                    ) : (
                      <p className="text-sm text-slate-300 mt-0.5">—</p>
                    )}
                  </div>
                </div>

                {/* Step 2: Waktu */}
                <div className="relative flex items-start gap-4">
                  <div className={`absolute -left-6 h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                    hasSelectedHari && hasSelectedJam ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Clock className="h-4 w-4" />
                  </div>
                  <div className="ml-4">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-teal-600 uppercase">WAKTU TERPILIH</p>
                    {hasSelectedHari && hasSelectedJam ? (
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">14 Okt, 11:00</p>
                    ) : (
                      <p className="text-sm text-slate-300 mt-0.5">—</p>
                    )}
                  </div>
                </div>

                {/* Step 3: Tutor */}
                <div className="relative flex items-start gap-4">
                  <div className={`absolute -left-6 h-8 w-8 rounded-full flex items-center justify-center z-10 ${
                    showTutors ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}>
                    <Users className="h-4 w-4" />
                  </div>
                  <div className="ml-4">
                    <p className="text-[10px] font-bold tracking-[0.15em] text-teal-600 uppercase">TUTOR TERSEDIA</p>
                    {showTutors ? (
                      <p className="text-sm font-semibold text-slate-800 mt-0.5">{tutorsData.length}</p>
                    ) : (
                      <p className="text-sm text-slate-300 mt-0.5">—</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom separator */}
              <div className="h-px bg-slate-200 mt-8"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
