import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PesanSesiModal from '@/components/Learner/PesanSesiModal'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// Mock Data Tutor
const mockTutors = [
  { id: 1, name: 'Irkham Wildan', university: "Informatika '21", courses: ['Basis Data', 'Struktur Data'], rating: 4.9, isTopTutor: true, availableTimes: ['07.00 - 07.50', '12.30 - 13.20', '15.30 - 16.20', '17.10 - 18.00'], availableDays: ['Senin', 'Rabu', 'Jumat'], price: 50000, image: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Mery Zahra', university: "Informatika '22", courses: ['UI/UX Design', 'Desain Produk'], rating: 4.8, isTopTutor: false, availableTimes: ['09.30 - 10.20', '14.10 - 15.00'], availableDays: ['Selasa', 'Kamis'], price: 60000, image: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Arhan Pradana', university: "Informatika '21", courses: ['Algoritma', 'Pemrograman C++'], rating: 5.0, isTopTutor: true, availableTimes: ['08.40 - 09.30', '10.20 - 11.10', '16.20 - 17.10'], availableDays: ['Senin', 'Selasa', 'Rabu'], price: 75000, image: 'https://i.pravatar.cc/150?img=12' },
  { id: 4, name: 'Siti Aminah', university: "Informatika '23", courses: ['Fisika Dasar', 'Kalkulus'], rating: 4.7, isTopTutor: false, availableTimes: ['13.20 - 14.10', '15.30 - 16.20'], availableDays: ['Kamis', 'Jumat'], price: 45000, image: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, name: 'Budi Santoso', university: "Informatika '22", courses: ['Pemrograman Web', 'Jaringan Komputer'], rating: 4.6, isTopTutor: false, availableTimes: ['10.20 - 11.10', '14.10 - 15.00'], availableDays: ['Senin', 'Kamis'], price: 40000, image: 'https://i.pravatar.cc/150?img=15' },
  { id: 6, name: 'Rafi Ardan', university: "Informatika '21", courses: ['Analisis Bisnis', 'Manajemen Proyek'], rating: 4.9, isTopTutor: true, availableTimes: ['07.00 - 07.50', '11.10 - 12.00', '15.30 - 16.20'], availableDays: ['Selasa', 'Jumat', 'Sabtu'], price: 55000, image: 'https://i.pravatar.cc/150?img=33' },
  { id: 7, name: 'Dewi Lestari', university: "Informatika '24", courses: ['Kalkulus Lanjut', 'Aljabar Linear'], rating: 4.8, isTopTutor: false, availableTimes: ['08.40 - 09.30', '12.30 - 13.20'], availableDays: ['Rabu', 'Sabtu'], price: 50000, image: 'https://i.pravatar.cc/150?img=42' },
  { id: 8, name: 'Andi Wijaya', university: "Informatika '22", courses: ['Struktur Data', 'Kecerdasan Buatan'], rating: 4.5, isTopTutor: false, availableTimes: ['09.30 - 10.20', '16.20 - 17.10'], availableDays: ['Senin', 'Selasa'], price: 45000, image: 'https://i.pravatar.cc/150?img=50' },
  { id: 9, name: 'Nina Wati', university: "Informatika '23", courses: ['Statistika Dasar', 'Probabilitas'], rating: 4.9, isTopTutor: true, availableTimes: ['07.50 - 08.40', '13.20 - 14.10', '17.10 - 18.00'], availableDays: ['Rabu', 'Kamis', 'Minggu'], price: 60000, image: 'https://i.pravatar.cc/150?img=21' },
  { id: 10, name: 'Dimas Aditya', university: "Informatika '21", courses: ['Menggambar Teknik', 'CAD'], rating: 4.7, isTopTutor: false, availableTimes: ['10.20 - 11.10', '14.10 - 15.00'], availableDays: ['Senin', 'Jumat'], price: 55000, image: 'https://i.pravatar.cc/150?img=13' },
  { id: 11, name: 'Ayu Kartika', university: "Informatika '24", courses: ['Pengantar Akuntansi', 'Ekonomi'], rating: 4.8, isTopTutor: false, availableTimes: ['11.10 - 12.00', '13.20 - 14.10'], availableDays: ['Selasa', 'Rabu'], price: 50000, image: 'https://i.pravatar.cc/150?img=28' },
  { id: 12, name: 'Fajar Nugroho', university: "Informatika '22", courses: ['Public Speaking', 'Komunikasi Massa'], rating: 4.9, isTopTutor: true, availableTimes: ['08.40 - 09.30', '12.30 - 13.20', '16.20 - 17.10'], availableDays: ['Jumat', 'Sabtu', 'Minggu'], price: 65000, image: 'https://i.pravatar.cc/150?img=59' },
]

const ITEMS_PER_PAGE = 9

export default function CariTutor() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)

  // Filter State
  const [filterCourse, setFilterCourse] = useState('semua')
  const [filterDay, setFilterDay] = useState('semua')
  const [filterTime, setFilterTime] = useState('semua')

  // Derived State
  const filteredTutors = useMemo(() => {
    const filtered = mockTutors.filter(tutor => {
      const matchSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tutor.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchCourse = filterCourse === 'semua' || tutor.courses.includes(filterCourse)
      
      const matchDay = filterDay === 'semua' || tutor.availableDays.includes(filterDay)

      const matchTime = filterTime === 'semua' || tutor.availableTimes.includes(filterTime)

      return matchSearch && matchCourse && matchDay && matchTime
    })

    // Sort seluruh data sebelum di-paginasi (seperti sistem Makanan Best Seller)
    return filtered.sort((a, b) => {
      // 1. Kelompokkan Top Tutor (Best Seller) agar tampil paling depan dari seluruh data
      if (a.isTopTutor && !b.isTopTutor) return -1;
      if (!a.isTopTutor && b.isTopTutor) return 1;
      
      // 2. Jika sama-sama Top Tutor ATAU sama-sama bukan, urutkan dari rating tertinggi ke terendah
      return b.rating - a.rating;
    });
  }, [searchTerm, filterCourse, filterDay, filterTime])

  const totalPages = Math.max(1, Math.ceil(filteredTutors.length / ITEMS_PER_PAGE))
  const paginatedTutors = filteredTutors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const activeFilterCount = (filterCourse !== 'semua' ? 1 : 0) + 
                            (filterDay !== 'semua' ? 1 : 0) + 
                            (filterTime !== 'semua' ? 1 : 0)

  // Handle page change safely
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  // Reset page when filters change
  useMemo(() => {
    setCurrentPage(1)
  }, [searchTerm, filterCourse, filterDay, filterTime])

  return (
    <div className="flex flex-col min-h-full">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Cari Tutor</h1>
        <p className="text-slate-500">Temukan tutor terbaik untuk membantu kamu belajar lebih efektif</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input 
              placeholder="Cari mata kuliah atau nama tutor..." 
              className="pl-11 h-12 rounded-xl border-slate-200 focus-visible:ring-teal-500 bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant={showFilters ? "secondary" : "outline"} 
            className={`relative h-12 px-5 rounded-xl border-slate-200 transition-colors ${showFilters ? 'bg-slate-100' : 'bg-white'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filter
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Expandable Filter Area */}
        {showFilters && (
          <div className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Mata Kuliah</label>
                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger className="w-full h-10 rounded-lg">
                    <SelectValue placeholder="Pilih Mata Kuliah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Mata Kuliah</SelectItem>
                    <SelectItem value="Basis Data">Basis Data</SelectItem>
                    <SelectItem value="Algoritma">Algoritma</SelectItem>
                    <SelectItem value="Pemrograman Web">Pemrograman Web</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Pilih Hari</label>
                <Select value={filterDay} onValueChange={setFilterDay}>
                  <SelectTrigger className="w-full h-10 rounded-lg">
                    <SelectValue placeholder="Pilih Hari" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Hari</SelectItem>
                    <SelectItem value="Senin">Senin</SelectItem>
                    <SelectItem value="Selasa">Selasa</SelectItem>
                    <SelectItem value="Rabu">Rabu</SelectItem>
                    <SelectItem value="Kamis">Kamis</SelectItem>
                    <SelectItem value="Jumat">Jumat</SelectItem>
                    <SelectItem value="Sabtu">Sabtu</SelectItem>
                    <SelectItem value="Minggu">Minggu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Pilih Jam</label>
                <Select value={filterTime} onValueChange={setFilterTime}>
                  <SelectTrigger className="w-full h-10 rounded-lg">
                    <SelectValue placeholder="Pilih Jam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua Jam</SelectItem>
                    <SelectItem value="07.00 - 07.50">07.00 - 07.50</SelectItem>
                    <SelectItem value="07.50 - 08.40">07.50 - 08.40</SelectItem>
                    <SelectItem value="08.40 - 09.30">08.40 - 09.30</SelectItem>
                    <SelectItem value="09.30 - 10.20">09.30 - 10.20</SelectItem>
                    <SelectItem value="10.20 - 11.10">10.20 - 11.10</SelectItem>
                    <SelectItem value="11.10 - 12.00">11.10 - 12.00</SelectItem>
                    <SelectItem value="12.30 - 13.20">12.30 - 13.20</SelectItem>
                    <SelectItem value="13.20 - 14.10">13.20 - 14.10</SelectItem>
                    <SelectItem value="14.10 - 15.00">14.10 - 15.00</SelectItem>
                    <SelectItem value="15.30 - 16.20">15.30 - 16.20</SelectItem>
                    <SelectItem value="16.20 - 17.10">16.20 - 17.10</SelectItem>
                    <SelectItem value="17.10 - 18.00">17.10 - 18.00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  className="w-full h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                  onClick={() => {
                    setFilterCourse('semua')
                    setFilterDay('semua')
                    setFilterTime('semua')
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tutors Grid */}
      <div className="flex-1 pb-10">

        {paginatedTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTutors.map((tutor) => (
              <Card key={tutor.id} className="relative p-6 pt-5 border-[#C6C5D4]/30 shadow-sm hover:shadow-md transition-all duration-300 rounded-[20px] group flex flex-col bg-white overflow-hidden">
                {/* Ribbon - Top Tutor */}
                {tutor.isTopTutor && (
                  <div className="absolute top-0 right-4 w-[46px] h-[52px] bg-gradient-to-b from-[#FBBF24] to-[#CA8A04] rounded-b-lg flex flex-col items-center justify-start pt-1.5 shadow-sm z-10">
                    <Star className="w-3.5 h-3.5 fill-white text-white mb-0.5" />
                    <span className="text-[8px] font-bold text-white text-center leading-[1.1]">TOP<br/>TUTOR</span>
                  </div>
                )}

                {/* Top Section: Photo */}
                <div className="relative w-28 h-28 flex-shrink-0 rounded-[16px] overflow-hidden bg-slate-100 mb-4 shadow-sm border border-slate-100">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-1.5 right-1.5 bg-[#FFCD29] text-white px-2 py-0.5 rounded-[8.5px] text-[10px] font-bold shadow-sm flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                    {tutor.rating}
                  </div>
                </div>

                {/* Name & University */}
                <div className="mb-4">
                  <h3 className="font-bold text-[18px] text-[#1E1B4B] leading-tight line-clamp-1 mb-1">{tutor.name}</h3>
                  <div className="text-[13px] text-[#454652] line-clamp-1">
                    {tutor.university}
                  </div>
                </div>

                {/* Courses Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {tutor.courses.map((course, index) => (
                    <Badge key={index} className="bg-[#F1F5F9] text-[#312E81] hover:bg-[#e2e8f0] border-none shadow-none font-medium px-3 py-1 rounded-md text-xs">
                      {course}
                    </Badge>
                  ))}
                </div>

                {/* Hari & Jam Tersedia */}
                <div className="mb-6">
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold text-[#767683] mb-2 tracking-wider">HARI TERSEDIA</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.availableDays.map((day, index) => (
                        <div key={index} className="bg-emerald-50 text-emerald-700 font-semibold text-[11px] px-3 py-1 rounded-md">
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#767683] mb-2 tracking-wider">JAM TERSEDIA</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.availableTimes.slice(0, 3).map((time, index) => (
                        <div key={index} className="bg-[#E6E8EA] text-[#454652] font-semibold text-[11px] px-3 py-1 rounded-md">
                          {time}
                        </div>
                      ))}
                      {tutor.availableTimes.length > 3 && (
                        <button 
                          onClick={() => navigate(`/learner/profil-tutor/${tutor.id}`)}
                          className="bg-blue-50 text-blue-600 font-semibold text-[11px] px-3 py-1 rounded-md hover:bg-blue-100 transition-colors cursor-pointer"
                        >
                          +{tutor.availableTimes.length - 3} Lainnya
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-auto">
                  <Button 
                    onClick={() => { setSelectedTutor(tutor); setIsModalOpen(true); }}
                    className="flex-[1.2] rounded-[12px] h-10 bg-[#25D366] hover:bg-[#20b858] text-white font-bold shadow-none text-sm px-0"
                  >
                    Pesan Sesi
                  </Button>
                  <Button 
                    onClick={() => navigate(`/learner/profil-tutor/${tutor.id}`)}
                    className="flex-[1.4] rounded-[12px] h-10 bg-[#E6F1EF] text-[#006B5F] hover:bg-[#d6e8e5] font-bold shadow-none text-sm px-0"
                  >
                    Lihat Profil
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="h-64 flex flex-col items-center justify-center text-slate-500 bg-white rounded-2xl border border-slate-100 border-dashed">
            <Search className="w-12 h-12 text-slate-200 mb-3" />
            <p className="font-medium text-slate-600">Tutor tidak ditemukan</p>
            <p className="text-sm">Coba sesuaikan filter atau kata kunci pencarian Anda.</p>
          </div>
        )}
      </div>

      {/* Pagination - Fixed at bottom by flex-1 of the grid wrapper */}
      <div className="py-4 border-t border-slate-100">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink 
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(i + 1);
                  }}
                  className={currentPage === i + 1 ? 'bg-teal-50 text-teal-600 border-teal-200' : ''}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        
        {filteredTutors.length > 0 && (
          <div className="mt-4 text-center text-slate-600 font-medium text-sm">
            Menampilkan <span className="font-bold text-[#1E1B4B]">{paginatedTutors.length}</span> dari <span className="font-bold text-[#1E1B4B]">{filteredTutors.length}</span> tutor tersedia
          </div>
        )}
      </div>

      {isModalOpen && selectedTutor && (
        <PesanSesiModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          tutor={selectedTutor} 
        />
      )}
    </div>
  )
}
