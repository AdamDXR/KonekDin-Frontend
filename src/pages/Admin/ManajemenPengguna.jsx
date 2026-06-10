import React, { useState, useMemo, useEffect } from 'react'
import axios from 'axios'
import {
  Search,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
  Unlock,
  GraduationCap,
  Users,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  X
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function ManajemenPengguna() {
  const [users, setUsers] = useState([])
  const [applications, setApplications] = useState([])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('Semua')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5
  
  // Modal & OCR state
  const [selectedApp, setSelectedApp] = useState(null)
  const [ocrResult, setOcrResult] = useState('')
  const [ocrLoading, setOcrLoading] = useState(false)

  // Fetch Data
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token') || ''
      const headers = { Authorization: `Bearer ${token}` }
      
      const [usersRes, appsRes] = await Promise.all([
         axios.get('http://127.0.0.1:8000/api/admin/users', { headers }),
         axios.get('http://127.0.0.1:8000/api/admin/applications', { headers })
      ])
      
      // Combine data into our table format
      const appsMap = {}
      if(appsRes.data && appsRes.data.data) {
        appsRes.data.data.forEach(app => {
          appsMap[app.user_id] = app
        })
        setApplications(appsRes.data.data)
      }
      
      if(usersRes.data && usersRes.data.data) {
        const mappedUsers = usersRes.data.data.map(u => {
          let st = u.status === 'active' ? 'Aktif' : 'Suspend'
          let rl = u.role === 'tutor' ? 'Tutor' : 'Pelajar'
          
          if (appsMap[u.id] && appsMap[u.id].status === 'pending') {
            st = 'Pending'
            rl = 'Tutor' // Calon Tutor
          }

          return {
            id: u.id,
            name: u.name,
            email: u.email,
            role: rl,
            status: st,
            joinDate: 'Baru-baru ini',
            image: `https://i.pravatar.cc/150?u=${u.id}`,
            appId: appsMap[u.id] ? appsMap[u.id].id : null,
            cv_url: appsMap[u.id] ? appsMap[u.id].cv_url : null
          }
        })
        setUsers(mappedUsers)
      }
    } catch (e) {
      console.error("Fetch error", e)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif': return 'text-emerald-600'
      case 'Pending': return 'text-amber-600'
      case 'Suspend': return 'text-red-600'
      default: return 'text-slate-600'
    }
  }

  const getStatusDotColor = (status) => {
    switch (status) {
      case 'Aktif': return 'bg-emerald-500'
      case 'Pending': return 'bg-amber-500'
      case 'Suspend': return 'bg-red-500'
      default: return 'bg-slate-500'
    }
  }

  // Handlers for Actions
  const handleView = (user) => {
    if (user.status === 'Pending' && user.cv_url) {
      setSelectedApp(user)
      setOcrResult('')
      setOcrLoading(false)
    } else {
      alert(`Fitur profil pengguna untuk ${user.name} sedang dalam pengembangan.`)
    }
  }

  const handleRunOcr = async () => {
    if(!selectedApp || !selectedApp.cv_url) return
    setOcrLoading(true)
    setOcrResult('')
    try {
      const result = await Tesseract.recognize(
        selectedApp.cv_url,
        'eng',
        { logger: m => console.log(m) }
      )
      setOcrResult(result.data.text)
    } catch (e) {
      setOcrResult("Gagal mengekstrak teks. Pastikan file gambar valid (PDF tidak bisa langsung di-OCR). " + e.message)
    }
    setOcrLoading(false)
  }

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token') || ''
      const userObj = users.find(u => u.id === id)
      if(userObj && userObj.appId) {
        await axios.patch(`http://127.0.0.1:8000/api/admin/applications/${userObj.appId}/approve`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchData()
    } catch (e) {
      console.error(e)
    }
  }

  const handleSuspend = async (id) => {
    alert("Suspend functionality API pending...")
  }

  const handleUnsuspend = async (id) => {
    alert("Unsuspend functionality API pending...")
  }

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        const token = localStorage.getItem('token') || ''
        await axios.delete(`http://127.0.0.1:8000/api/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        fetchData()
      } catch (e) {
        console.error(e)
      }
    }
  }

  // Filter Logic
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase())
      const matchRole = roleFilter === 'Semua' || user.role === roleFilter
      const matchStatus = statusFilter === 'Semua' || user.status === statusFilter
      return matchSearch && matchRole && matchStatus
    })
  }, [users, search, roleFilter, statusFilter])

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  // Dynamic Insight Data
  const totalVerifiedTutors = users.filter(u => u.role === 'Tutor' && u.status === 'Aktif').length
  const totalActiveLearners = users.filter(u => u.role === 'Pelajar' && u.status === 'Aktif').length
  const totalPending = users.filter(u => u.status === 'Pending').length

  return (
    <div className="flex flex-col min-h-full relative">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#000666] mb-2 tracking-tight">
          Manajemen Pengguna
        </h1>
        <p className="text-slate-500 text-[15px]">
          Kelola data pengguna, termasuk tutor dan pelajar untuk memastikan ekosistem belajar yang berkualitas.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Cari nama atau email pengguna..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="pl-11 h-12 rounded-xl bg-white border-transparent shadow-sm focus-visible:ring-1 text-[15px]"
          />
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={roleFilter} onValueChange={(val) => {
            setRoleFilter(val)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl bg-white border-transparent shadow-sm text-[15px] text-slate-700">
              <SelectValue placeholder="Role: Semua" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Role: Semua</SelectItem>
              <SelectItem value="Tutor">Role: Tutor</SelectItem>
              <SelectItem value="Pelajar">Role: Pelajar</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={(val) => {
            setStatusFilter(val)
            setCurrentPage(1)
          }}>
            <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl bg-white border-transparent shadow-sm text-[15px] text-slate-700">
              <SelectValue placeholder="Status: Semua" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Status: Semua</SelectItem>
              <SelectItem value="Aktif">Status: Aktif</SelectItem>
              <SelectItem value="Pending">Status: Pending</SelectItem>
              <SelectItem value="Suspend">Status: Suspend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#FCFCFD] rounded-[20px] overflow-hidden">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">
                  Pengguna
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">
                  Tanggal Bergabung
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right bg-[#F4F4F5]/50 border-b border-slate-100">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Tidak ada pengguna yang sesuai dengan filter.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-bold text-slate-900 text-[15px]">{user.name}</div>
                          <div className="text-[13px] text-slate-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {user.role === 'Tutor' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#A7F3D0] text-[#047857]">
                          Tutor
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E4E4E7] text-[#52525B]">
                          Pelajar
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getStatusDotColor(user.status)}`} />
                        <span className={`text-[13px] font-bold ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-slate-600 font-medium">
                      {user.joinDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 text-slate-400">
                        <button onClick={() => handleView(user)} className="hover:text-slate-600 transition-colors p-1" title="Lihat Profil / Dokumen">
                          <Eye className="w-5 h-5" />
                        </button>
                        
                        {user.status === 'Aktif' && (
                          <button onClick={() => handleSuspend(user.id)} className="hover:text-amber-600 transition-colors p-1" title="Suspend">
                            <Ban className="w-5 h-5" />
                          </button>
                        )}
                        
                        {user.status === 'Pending' && (
                          <button onClick={() => handleApprove(user.id)} className="hover:text-emerald-600 transition-colors p-1" title="Setujui">
                            <CheckCircle className="w-5 h-5" />
                          </button>
                        )}

                        {user.status === 'Suspend' && (
                          <button onClick={() => handleUnsuspend(user.id)} className="hover:text-emerald-600 transition-colors p-1" title="Buka Suspend">
                            <Unlock className="w-5 h-5" />
                          </button>
                        )}

                        <button onClick={() => handleDelete(user.id)} className="hover:text-red-600 transition-colors p-1" title="Hapus">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Info */}
        <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 bg-white rounded-b-[20px]">
          <div className="text-[13px] text-slate-500 mb-4 sm:mb-0 font-medium">
            {filteredUsers.length > 0 ? (
              <>Menampilkan <span className="font-bold text-slate-700">{startIndex} - {endIndex}</span> dari <span className="font-bold text-slate-700">{filteredUsers.length}</span> pengguna</>
            ) : (
              'Menampilkan 0 pengguna'
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-400 hover:text-slate-600" 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            {getPageNumbers().map(num => (
              <Button 
                key={num}
                variant="ghost" 
                className={`h-8 w-8 rounded-lg p-0 font-bold ${
                  currentPage === num 
                    ? 'bg-[#000666] hover:bg-[#000666]/90 text-white' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </Button>
            ))}
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-400 hover:text-slate-600" 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        
        {/* Card 1 */}
        <div className="bg-[#000666] rounded-[24px] p-8 relative overflow-hidden text-white shadow-xl shadow-[#000666]/10">
          <div className="relative z-10">
            <div className="text-sm font-medium text-white/80 mb-2">Total Tutor Terverifikasi</div>
            <div className="text-[40px] font-bold leading-none">{totalVerifiedTutors}</div>
          </div>
          <GraduationCap className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10" />
        </div>

        {/* Card 2 */}
        <div className="bg-gradient-to-br from-[#73F3D2] to-[#51D8C1] rounded-[24px] p-8 relative overflow-hidden text-[#00382E] shadow-xl shadow-teal-500/10">
          <div className="relative z-10">
            <div className="text-sm font-bold opacity-80 mb-2">Learner Aktif</div>
            <div className="text-[40px] font-bold leading-none">{totalActiveLearners}</div>
          </div>
          <Users className="absolute -bottom-6 -right-6 w-32 h-32 text-[#00382E]/10" />
        </div>

        {/* Card 3 */}
        <div className="bg-[#FFDDC7] rounded-[24px] p-8 relative overflow-hidden text-[#7A3600] shadow-xl shadow-orange-500/10">
          <div className="relative z-10">
            <div className="text-sm font-bold opacity-80 mb-2">Menunggu Verifikasi</div>
            <div className="text-[40px] font-bold leading-none">{totalPending}</div>
          </div>
          <AlertCircle className="absolute -bottom-6 -right-6 w-32 h-32 text-[#7A3600]/10" />
        </div>

      </div>

      {/* MODAL OCR */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative">
            <button 
              onClick={() => setSelectedApp(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#000666]">Verifikasi Dokumen: {selectedApp.name}</h2>
            
            <div className="mb-4 bg-slate-50 p-4 rounded-xl flex flex-col items-center justify-center border">
               <img src={selectedApp.cv_url} alt="Dokumen" className="max-h-64 object-contain mb-2" onError={(e) => e.target.style.display='none'} />
               <a href={selectedApp.cv_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline">Lihat / Download File Asli</a>
            </div>

            <div className="flex gap-4 mb-4">
               <Button onClick={handleRunOcr} disabled={ocrLoading} className="bg-[#000666] text-white hover:bg-[#000666]/90">
                 {ocrLoading ? 'Memproses OCR...' : 'Coba Fitur OCR'}
               </Button>
               <Button onClick={() => { handleApprove(selectedApp.id); setSelectedApp(null); }} className="bg-emerald-600 text-white hover:bg-emerald-700">
                 Setujui Aplikasi
               </Button>
            </div>

            {ocrLoading && (
              <div className="text-sm text-slate-500 animate-pulse mt-2">
                Sedang mengekstrak teks dari dokumen menggunakan Tesseract.js...
              </div>
            )}

            {ocrResult && (
              <div className="mt-4">
                <h3 className="font-bold text-sm mb-2 text-slate-700">Hasil OCR:</h3>
                <div className="bg-slate-100 p-4 rounded-xl text-sm whitespace-pre-wrap min-h-[100px] border border-slate-200">
                  {ocrResult}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
