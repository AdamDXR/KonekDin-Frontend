import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
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
import TutorCard from '@/components/shared/TutorCard'
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

// Mock Data Tutor - di-export untuk sementara digunakan di Dashboard/ProfilTutor mock
export const mockTutors = [
  { id: 1, name: 'Irkham Wildan', university: "Informatika '21", courses: ['Basis Data', 'Algoritma dan Struktur Data'], rating: 4.9, isTopTutor: true, schedule: [{ day: 'Senin', times: ['07.00 - 07.50', '12.30 - 13.20'] }, { day: 'Rabu', times: ['15.30 - 16.20'] }, { day: 'Jumat', times: ['17.10 - 18.00'] }], price: 50000, image: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Mery Zahra', university: "Informatika '22", courses: ['Pemrograman Berbasis Web', 'Interaksi Manusia dan Komputer'], rating: 4.8, isTopTutor: false, schedule: [{ day: 'Selasa', times: ['09.30 - 10.20'] }, { day: 'Kamis', times: ['14.10 - 15.00'] }], price: 60000, image: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, name: 'Arhan Pradana', university: "Informatika '21", courses: ['Fisika', 'Dasar Pemrograman'], rating: 5.0, isTopTutor: true, schedule: [{ day: 'Senin', times: ['08.40 - 09.30'] }, { day: 'Selasa', times: ['10.20 - 11.10'] }, { day: 'Rabu', times: ['16.20 - 17.10'] }], price: 75000, image: 'https://i.pravatar.cc/150?img=12' },
  { id: 4, name: 'Siti Aminah', university: "Informatika '23", courses: ['Fisika', 'Kalkulus'], rating: 4.7, isTopTutor: false, schedule: [{ day: 'Kamis', times: ['13.20 - 14.10'] }, { day: 'Jumat', times: ['15.30 - 16.20'] }], price: 45000, image: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, name: 'Budi Santoso', university: "Informatika '22", courses: ['Pemrograman Berbasis Web', 'Jaringan Komputer'], rating: 4.6, isTopTutor: false, schedule: [{ day: 'Senin', times: ['10.20 - 11.10'] }, { day: 'Kamis', times: ['14.10 - 15.00'] }], price: 40000, image: 'https://i.pravatar.cc/150?img=15' },
  { id: 6, name: 'Rafi Ardan', university: "Informatika '21", courses: ['Pengembangan Startup Digital', 'Manajemen Proyek Teknologi Informasi'], rating: 4.9, isTopTutor: true, schedule: [{ day: 'Selasa', times: ['07.00 - 07.50'] }, { day: 'Jumat', times: ['11.10 - 12.00'] }, { day: 'Sabtu', times: ['15.30 - 16.20'] }], price: 55000, image: 'https://i.pravatar.cc/150?img=33' },
  { id: 7, name: 'Dewi Lestari', university: "Informatika '24", courses: ['Komputasi Numerik', 'Matriks dan Ruang Vektor'], rating: 4.8, isTopTutor: false, schedule: [{ day: 'Rabu', times: ['08.40 - 09.30'] }, { day: 'Sabtu', times: ['12.30 - 13.20'] }], price: 50000, image: 'https://i.pravatar.cc/150?img=42' },
  { id: 8, name: 'Andi Wijaya', university: "Informatika '22", courses: ['Algoritma dan Struktur Data', 'Kecerdasan Buatan (Artificial Intelligence)'], rating: 4.5, isTopTutor: false, schedule: [{ day: 'Senin', times: ['09.30 - 10.20'] }, { day: 'Selasa', times: ['16.20 - 17.10'] }], price: 45000, image: 'https://i.pravatar.cc/150?img=50' },
  { id: 9, name: 'Nina Wati', university: "Informatika '23", courses: ['Probabilitas dan Statistik'], rating: 4.9, isTopTutor: true, schedule: [{ day: 'Rabu', times: ['07.50 - 08.40'] }, { day: 'Kamis', times: ['13.20 - 14.10'] }, { day: 'Minggu', times: ['17.10 - 18.00'] }], price: 60000, image: 'https://i.pravatar.cc/150?img=21' },
  { id: 10, name: 'Dimas Aditya', university: "Informatika '21", courses: ['Organisasi dan Arsitektur Komputer', 'Rangkaian Logika Digital'], rating: 4.7, isTopTutor: false, schedule: [{ day: 'Senin', times: ['10.20 - 11.10'] }, { day: 'Jumat', times: ['14.10 - 15.00'] }], price: 55000, image: 'https://i.pravatar.cc/150?img=13' },
  { id: 11, name: 'Ayu Kartika', university: "Informatika '24", courses: ['Dasar Kewirausahaan', 'Technopreneurship'], rating: 4.8, isTopTutor: false, schedule: [{ day: 'Selasa', times: ['11.10 - 12.00'] }, { day: 'Rabu', times: ['13.20 - 14.10'] }], price: 50000, image: 'https://i.pravatar.cc/150?img=28' },
  { id: 12, name: 'Fajar Nugroho', university: "Informatika '22", courses: ['Keamanan Sistem dan Siber', 'Kriptografi'], rating: 4.9, isTopTutor: true, schedule: [{ day: 'Jumat', times: ['08.40 - 09.30'] }, { day: 'Sabtu', times: ['12.30 - 13.20'] }, { day: 'Minggu', times: ['16.20 - 17.10'] }], price: 65000, image: 'https://i.pravatar.cc/150?img=59' },
]

const ITEMS_PER_PAGE = 9

export default function CariTutor() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  
  // Real data state
  const [tutorsData, setTutorsData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Filter State
  const [filterCourse, setFilterCourse] = useState('semua')
  const [filterDay, setFilterDay] = useState('semua')
  const [filterTime, setFilterTime] = useState('semua')

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get('http://127.0.0.1:8000/api/tutors', { headers });
        
        if (response.data && response.data.data) {
          const formattedTutors = response.data.data.map(tutor => {
            const scheduleMap = {};
            if (tutor.available_slots) {
              tutor.available_slots.forEach(slot => {
                if (!scheduleMap[slot.day_of_week]) {
                  scheduleMap[slot.day_of_week] = [];
                }
                scheduleMap[slot.day_of_week].push(`${slot.start_time} - ${slot.end_time}`);
              });
            }
            const scheduleArray = Object.keys(scheduleMap).map(day => ({
              day: day,
              times: scheduleMap[day]
            }));

            return {
              id: tutor.tutor_id,
              name: tutor.name,
              university: "Universitas Dian Nuswantoro", 
              courses: tutor.taught_courses ? tutor.taught_courses.map(c => c.course_name) : [],
              rating: tutor.rating_avg || 0,
              isTopTutor: (tutor.rating_avg || 0) >= 4.8,
              schedule: scheduleArray,
              price: tutor.price,
              image: tutor.avatar 
                 ? `http://127.0.0.1:8000/storage/${tutor.avatar}` 
                 : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&background=random`
            };
          });
          setTutorsData(formattedTutors);
        }
      } catch (error) {
        console.error("Gagal mengambil data tutor:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, []);

  // Derived State
  const filteredTutors = useMemo(() => {
    const dataToFilter = tutorsData.length > 0 ? tutorsData : [] // use real data
    
    const filtered = dataToFilter.filter(tutor => {
      const matchSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tutor.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase()))
      
      const matchCourse = filterCourse === 'semua' || tutor.courses.includes(filterCourse)
      
      const matchDay = filterDay === 'semua' || tutor.schedule.some(s => s.day === filterDay)
      const matchTime = filterTime === 'semua' || tutor.schedule.some(s => s.times.includes(filterTime))

      return matchSearch && matchCourse && matchDay && matchTime
    })

    return filtered.sort((a, b) => {
      if (a.isTopTutor && !b.isTopTutor) return -1;
      if (!a.isTopTutor && b.isTopTutor) return 1;
      return b.rating - a.rating;
    });
  }, [tutorsData, searchTerm, filterCourse, filterDay, filterTime])

  const totalPages = Math.max(1, Math.ceil(filteredTutors.length / ITEMS_PER_PAGE))
  const paginatedTutors = filteredTutors.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const activeFilterCount = (filterCourse !== 'semua' ? 1 : 0) + 
                            (filterDay !== 'semua' ? 1 : 0) + 
                            (filterTime !== 'semua' ? 1 : 0)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

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
                    <SelectItem value="Algoritma dan Struktur Data">Algoritma dan Struktur Data</SelectItem>
                    <SelectItem value="Pemrograman Berbasis Web">Pemrograman Berbasis Web</SelectItem>
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
                    <SelectItem value="07:00 - 08:00">07:00 - 08:00</SelectItem>
                    <SelectItem value="08:00 - 09:00">08:00 - 09:00</SelectItem>
                    <SelectItem value="09:00 - 10:00">09:00 - 10:00</SelectItem>
                    <SelectItem value="10:00 - 11:00">10:00 - 11:00</SelectItem>
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
        {isLoading ? (
           <div className="flex justify-center items-center h-64 text-slate-500 animate-pulse">
             Memuat data tutor...
           </div>
        ) : paginatedTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTutors.map((tutor) => (
              <TutorCard 
                key={tutor.id} 
                tutor={tutor} 
                actionNode={
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
                )}

                {/* Top Section: Photo */}
                <div className="relative w-28 h-28 flex-shrink-0 rounded-[16px] overflow-hidden bg-slate-100 mb-4 shadow-sm border border-slate-100">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    {tutor.rating.toFixed(1)}
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
                  {tutor.courses.length === 0 && (
                     <Badge className="bg-slate-100 text-slate-500 shadow-none font-medium px-3 py-1 rounded-md text-xs">Belum ada mata kuliah</Badge>
                  )}
                </div>

                {/* Jadwal Tersedia */}
                <div className="mb-6">
                  <p className="text-[11px] font-semibold text-[#767683] mb-3 tracking-wider">
                    JADWAL TERSEDIA
                  </p>
                  <div className="space-y-2.5">
                    {tutor.schedule.length > 0 ? tutor.schedule.slice(0, 2).map((slot, index) => (
                      <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                        <span className="bg-[#EAF0E4] text-[#4A5D23] font-bold text-[10px] px-2.5 py-1 rounded-lg w-fit shrink-0 uppercase tracking-wide">
                          {slot.day}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {slot.times.map((time, tIdx) => (
                            <span key={tIdx} className="bg-white border border-slate-200 text-slate-600 font-semibold text-[10px] px-2 py-1 rounded-md shadow-sm">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    )) : (
                      <div className="text-xs text-slate-400 italic">Belum ada jadwal yang diatur</div>
                    )}
                    {tutor.schedule.length > 2 && (
                      <button 
                        onClick={() => navigate(`/learner/profil-tutor/${tutor.id}#jadwal-ketersediaan`)}
                        className="w-full mt-2 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 rounded-lg transition-colors border border-transparent hover:border-blue-100 text-center"
                      >
                        Lihat {tutor.schedule.length - 2} hari lainnya
                      </button>
                    )}
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