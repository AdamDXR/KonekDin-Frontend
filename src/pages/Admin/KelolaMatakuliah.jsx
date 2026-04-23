import { useState } from 'react'
import { 
  Plus, 
  Code2, 
  Database, 
  Cpu, 
  Eye, 
  Monitor,
  MoreVertical,
  CircleStop,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const categories = ['Semua', 'Teknik Informatika', 'Sistem Informasi', 'Ilmu Komputer']

const coursesData = [
  {
    id: 1,
    title: 'Algoritma & Pemrograman Dasar',
    description: 'Pengenalan konsep dasar algoritma, struktur data sederhana, dan implementasi menggunakan bahasa C++.',
    icon: Code2,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
    status: 'Aktif',
    mentors: 124,
    sessions: 45,
    isActive: true,
  },
  {
    id: 2,
    title: 'Sistem Basis Data',
    description: 'Pemodelan data relasional, desain ERD, normalisasi, dan praktik query SQL kompleks tingkat lanjut.',
    icon: Database,
    iconBg: 'bg-teal-50',
    iconColor: 'text-teal-600',
    status: 'Aktif',
    mentors: 89,
    sessions: 32,
    isActive: true,
  },
  {
    id: 3,
    title: 'Arsitektur Komputer',
    description: 'Studi mendalam mengenai komponen perangkat keras, instruksi set prosesor, dan hierarki memori.',
    icon: Cpu,
    iconBg: 'bg-slate-50',
    iconColor: 'text-slate-400',
    status: 'Nonaktif',
    mentors: 0,
    sessions: 0,
    isActive: false,
  },
]

export default function KelolaMatakuliah() {
  const [activeCategory, setActiveCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState('Terbaru')

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#0a0f44] via-[#1a1f6e] to-[#2d3396] rounded-3xl p-8 sm:p-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-1/2"></div>
        
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Kurikulum & Matakuliah
            </h1>
            <p className="text-base text-indigo-200 mt-3 max-w-lg leading-relaxed">
              Kelola repositori akademik. Tambahkan matakuliah baru, perbarui silabus, dan pantau status ketersediaan sesi mentoring antar mahasiswa.
            </p>
          </div>
          <Button className="bg-white text-[#0a0f44] hover:bg-slate-50 rounded-xl px-6 py-6 font-semibold shadow-none whitespace-nowrap">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Matakuliah
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#EEF2FF] text-[#1D4ED8] border border-[#C7D2FE]'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-300"
          >
            <option>Terbaru</option>
            <option>Terlama</option>
            <option>A-Z</option>
          </select>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((course) => (
          <div
            key={course.id}
            className={`bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden transition-all hover:shadow-md ${
              course.isActive ? 'border-slate-100' : 'border-slate-100 opacity-75'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className={`${course.iconBg} p-3 rounded-xl`}>
                <course.icon className={`h-6 w-6 ${course.iconColor}`} />
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  course.isActive
                    ? 'bg-teal-50 text-teal-700'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {course.status}
                </span>
                <button className="text-slate-400 hover:text-slate-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Card Body */}
            <div className="px-6 pb-4 flex-1">
              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{course.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{course.description}</p>
            </div>

            {/* Card Stats */}
            <div className="px-6 py-3 flex items-center gap-5 text-sm text-slate-500">
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                <span>{course.mentors} Mentor</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Monitor className="h-4 w-4" />
                <span>{course.sessions} Sesi</span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-slate-100 px-6 py-3 flex items-center justify-between">
              <button className="text-sm font-semibold text-slate-700 hover:text-[#1D4ED8] transition-colors">
                Edit Silabus
              </button>
              <button className={`p-2 rounded-full transition-colors ${
                course.isActive
                  ? 'text-red-400 hover:bg-red-50'
                  : 'text-teal-500 hover:bg-teal-50'
              }`}>
                {course.isActive ? (
                  <CircleStop className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
