import React, { useState, useMemo, useEffect } from 'react'
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
  MoreHorizontal
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

// Mock Data
const initialUsers = [
  { id: 1, name: 'Irkham Wildan', email: 'irkham@mhs.dinus.ac.id', role: 'Tutor', status: 'Aktif', joinDate: '14 Januari 2026', image: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, name: 'Budi Santoso', email: 'budi@gmail.com', role: 'Pelajar', status: 'Pending', joinDate: '12 Januari 2026', image: 'https://i.pravatar.cc/150?img=12' },
  { id: 3, name: 'Mery Zahra', email: 'mery@gmail.com', role: 'Tutor', status: 'Suspend', joinDate: '11 Januari 2026', image: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'Rina Sari', email: 'rina@gmail.com', role: 'Pelajar', status: 'Aktif', joinDate: '10 Januari 2026', image: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, name: 'Ahmad Raja', email: 'ahmad@gmail.com', role: 'Pelajar', status: 'Aktif', joinDate: '8 Januari 2026', image: 'https://i.pravatar.cc/150?img=15' },
  { id: 6, name: 'Rahel Sahita', email: 'rahel@mhs.dinus.ac.id', role: 'Tutor', status: 'Aktif', joinDate: '7 Januari 2026', image: 'https://i.pravatar.cc/150?img=20' },
  { id: 7, name: 'Siti Aminah', email: 'siti@mhs.dinus.ac.id', role: 'Pelajar', status: 'Aktif', joinDate: '6 Januari 2026', image: 'https://i.pravatar.cc/150?img=25' },
  { id: 8, name: 'Joko Anwar', email: 'joko@gmail.com', role: 'Tutor', status: 'Pending', joinDate: '5 Januari 2026', image: 'https://i.pravatar.cc/150?img=32' },
  { id: 9, name: 'Lina Marlina', email: 'lina.m@yahoo.com', role: 'Pelajar', status: 'Suspend', joinDate: '4 Januari 2026', image: 'https://i.pravatar.cc/150?img=40' },
  { id: 10, name: 'Deni Sumargo', email: 'deni@gmail.com', role: 'Tutor', status: 'Aktif', joinDate: '3 Januari 2026', image: 'https://i.pravatar.cc/150?img=50' },
  { id: 11, name: 'Siska Lestari', email: 'siska@gmail.com', role: 'Pelajar', status: 'Pending', joinDate: '2 Januari 2026', image: 'https://i.pravatar.cc/150?img=55' },
  { id: 12, name: 'Rafi Ardan', email: 'rafi@mhs.dinus.ac.id', role: 'Tutor', status: 'Aktif', joinDate: '1 Januari 2026', image: 'https://i.pravatar.cc/150?img=33' },
  { id: 13, name: 'Bambang Pamungkas', email: 'bambang@gmail.com', role: 'Pelajar', status: 'Aktif', joinDate: '30 Desember 2025', image: 'https://i.pravatar.cc/150?img=60' },
  { id: 14, name: 'Chelsea Islan', email: 'chelsea@gmail.com', role: 'Tutor', status: 'Aktif', joinDate: '28 Desember 2025', image: 'https://i.pravatar.cc/150?img=65' },
]

export default function ManajemenPengguna() {
  const [users, setUsers] = useState(initialUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('Semua')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 5

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
  const handleView = (name) => {
    alert(`Fitur profil pengguna untuk ${name} sedang dalam pengembangan.`)
  }

  const handleApprove = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'Aktif' } : u))
  }

  const handleSuspend = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'Suspend' } : u))
  }

  const handleUnsuspend = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: 'Aktif' } : u))
  }

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      setUsers(users.filter(u => u.id !== id))
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
    <div className="flex flex-col min-h-full">
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
                        <button onClick={() => handleView(user.name)} className="hover:text-slate-600 transition-colors p-1" title="Lihat Profil">
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

    </div>
  )
}
