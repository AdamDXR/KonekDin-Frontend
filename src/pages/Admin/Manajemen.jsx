import React, { useState, useMemo, useEffect } from 'react'
import {
  Search,
  Eye,
  Ban,
  Trash2,
  CheckCircle,
  Unlock,
  ChevronLeft,
  ChevronRight,
  X,
  Users,
  Wallet,
  CheckCircle2,
  FileText,
  UserCheck,
  ShieldAlert,
  AlertTriangle,
  Link2,
  Image as ImageIcon,
  GraduationCap,
  Zap,
  Mail,
  Calendar
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
import axios from '@/lib/axios'

// ─── Toast Component ──────────────────────────────────────────────────────────
function ToastNotification({ toast, onClose }) {
  if (!toast.show) return null
  return (
    <div className="fixed top-6 right-6 z-[100] animate-in slide-in-from-top-4 fade-in duration-300">
      <div className={`text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-600' : 'bg-[#000666]'}`}>
        <CheckCircle2 className={`w-5 h-5 ${toast.type === 'error' ? 'text-red-200' : 'text-emerald-400'}`} />
        <p className="font-medium text-sm">{toast.message}</p>
        <button onClick={onClose} className="ml-4 text-white/70 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// ─── Dummy Data Pengguna Aktif & Suspend ──────────────────────────────────────
const generateDummyUsers = () => {
  const dummy = []
  for (let i = 1; i <= 20; i++) {
    const isTutor = i % 3 === 0
    const status = i % 7 === 0 ? 'Suspend' : 'Aktif'
    dummy.push({
      id: i,
      name: `Pengguna Mock ${i}`,
      email: `user${i}@example.com`,
      role: isTutor ? 'Tutor' : 'Pelajar',
      status: status,
      joinDate: `1${i % 9} Okt 2026`,
      image: `https://i.pravatar.cc/150?u=${i + 100}`,
      suspendReason: status === 'Suspend' ? 'Pelanggaran ketentuan komunitas.' : null,
      suspendUntil: status === 'Suspend' ? '25 Okt 2026' : null
    })
  }
  return dummy
}
const initialUsersData = generateDummyUsers()

// ─── Dummy Data Verifikasi Tutor (Dihapus karena sudah API) ─────────────────

// ─── Dummy Data Keuangan (Dihapus karena sudah API) ───────────────────────────

// ─── Komponen Tab Pengguna ────────────────────────────────────────────────────
function TabPengguna() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('Semua')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 8

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000)
  }

  // Modals
  const [viewModal, setViewModal] = useState({ isOpen: false, item: null })
  const [suspendModal, setSuspendModal] = useState({ isOpen: false, item: null, duration: '1 Minggu' })
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, item: null })

  const fetchUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get('/admin/users')
      const formattedUsers = response.data.data.map(user => {
        const isSuspended = user.suspended_until && new Date(user.suspended_until) > new Date()
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role === 'learner' ? 'Pelajar' : 'Tutor',
          status: isSuspended ? 'Suspend' : 'Aktif',
          joinDate: user.created_at,
          image: user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
          suspendUntil: isSuspended ? new Date(user.suspended_until).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : null,
          suspendReason: isSuspended ? 'Pelanggaran ketentuan (Diatur via durasi)' : null
        }
      })
      setUsers(formattedUsers)
    } catch (err) {
      setError('Gagal memuat data pengguna.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSuspend = async () => {
    try {
      await axios.patch(`/admin/users/${suspendModal.item.id}/suspend`, { duration: suspendModal.duration })
      showToast(`Akun ${suspendModal.item.name} berhasil di-suspend selama ${suspendModal.duration}.`)
      setSuspendModal({ isOpen: false, item: null, duration: '1 Minggu' })
      fetchUsers()
    } catch (error) {
      showToast('Gagal melakukan suspend pengguna.', 'error')
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/users/${deleteModal.item.id}`)
      showToast(`Akun ${deleteModal.item.name} berhasil dihapus permanen dari sistem.`)
      setDeleteModal({ isOpen: false, item: null })
      fetchUsers()
    } catch (error) {
      showToast('Gagal menghapus pengguna.', 'error')
    }
  }

  const handleUnsuspend = async (id, name) => {
    try {
      await axios.patch(`/admin/users/${id}/unsuspend`)
      showToast(`Status Suspend pada akun ${name} berhasil dicabut.`)
      fetchUsers()
    } catch (error) {
      showToast('Gagal mencabut suspend pengguna.', 'error')
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase())
      const matchRole = roleFilter === 'Semua' || user.role === roleFilter
      const matchStatus = statusFilter === 'Semua' || user.status === statusFilter
      return matchSearch && matchRole && matchStatus
    })
  }, [users, search, roleFilter, statusFilter])

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE + 1
  const endIndex = Math.min(currentPage * ITEMS_PER_PAGE, filteredUsers.length)

  return (
    <div className="animate-in fade-in duration-300 relative">
      <ToastNotification toast={toast} onClose={() => setToast({ show: false, message: '', type: 'success' })} />

      {/* Modal Lihat Profil */}
      {viewModal.isOpen && viewModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setViewModal({ isOpen: false, item: null })} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-slate-50">
                <AvatarImage src={viewModal.item.image} alt={viewModal.item.name} />
                <AvatarFallback>{viewModal.item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold text-[#0a0f44]">{viewModal.item.name}</h3>
              <p className="text-slate-500 text-sm mb-2">{viewModal.item.email}</p>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${viewModal.item.role === 'Tutor' ? 'bg-[#A7F3D0] text-[#047857]' : 'bg-[#E4E4E7] text-[#52525B]'}`}>
                Role: {viewModal.item.role}
              </span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4"/> Bergabung</span>
                <span className="font-bold text-slate-700">{viewModal.item.joinDate}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Status</span>
                <span className={`font-bold ${viewModal.item.status === 'Aktif' ? 'text-emerald-600' : 'text-red-600'}`}>{viewModal.item.status}</span>
              </div>
              {viewModal.item.status === 'Suspend' && (
                <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-red-600">
                  <p><strong>Alasan:</strong> {viewModal.item.suspendReason}</p>
                  <p><strong>Sampai:</strong> {viewModal.item.suspendUntil}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Suspend */}
      {suspendModal.isOpen && suspendModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setSuspendModal({ isOpen: false, item: null, duration: '1 Minggu' })} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-orange-100 text-orange-600">
              <Ban className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0a0f44] mb-2">Suspend Pengguna</h3>
            <p className="text-slate-500 text-[15px] mb-6">Pilih durasi penangguhan (suspend) untuk akun <strong>{suspendModal.item.name}</strong>.</p>
            
            <div className="space-y-3 mb-8">
              {['1 Hari', '1 Minggu', '1 Bulan'].map(dur => (
                <button 
                  key={dur}
                  onClick={() => setSuspendModal(prev => ({ ...prev, duration: dur }))}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${suspendModal.duration === dur ? 'border-orange-500 bg-orange-50' : 'border-slate-100 bg-white hover:border-orange-200'}`}
                >
                  <span className={`font-bold ${suspendModal.duration === dur ? 'text-orange-700' : 'text-slate-600'}`}>{dur}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${suspendModal.duration === dur ? 'border-orange-500' : 'border-slate-300'}`}>
                    {suspendModal.duration === dur && <div className="w-2.5 h-2.5 bg-orange-500 rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setSuspendModal({ isOpen: false, item: null, duration: '1 Minggu' })} className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Batal</button>
              <button onClick={handleSuspend} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors shadow-sm">Terapkan Suspend</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {deleteModal.isOpen && deleteModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setDeleteModal({ isOpen: false, item: null })} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-red-100 text-red-600">
              <Trash2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0a0f44] mb-2">Hapus Akun Permanen?</h3>
            <p className="text-slate-500 text-[15px] mb-8 leading-relaxed">
              Tindakan ini akan menghapus akun <strong>{deleteModal.item.name}</strong> secara permanen dari sistem KonekDin. Seluruh data yang bersangkutan tidak dapat dikembalikan.
            </p>
            <div className="flex items-center gap-3">
              <button onClick={() => setDeleteModal({ isOpen: false, item: null })} className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Batal</button>
              <button onClick={handleDelete} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm">Ya, Hapus Permanen</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Cari nama atau email pengguna..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="pl-11 h-12 rounded-xl bg-white border-transparent shadow-sm focus-visible:ring-1 text-[15px]"
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Select value={roleFilter} onValueChange={(val) => { setRoleFilter(val); setCurrentPage(1) }}>
            <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl bg-white border-transparent shadow-sm text-[15px] text-slate-700">
              <SelectValue placeholder="Role: Semua" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Role: Semua</SelectItem>
              <SelectItem value="Tutor">Role: Tutor</SelectItem>
              <SelectItem value="Pelajar">Role: Pelajar</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={(val) => { setStatusFilter(val); setCurrentPage(1) }}>
            <SelectTrigger className="w-full md:w-[200px] h-12 rounded-xl bg-white border-transparent shadow-sm text-[15px] text-slate-700">
              <SelectValue placeholder="Status: Semua" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Semua">Status: Semua</SelectItem>
              <SelectItem value="Aktif">Status: Aktif</SelectItem>
              <SelectItem value="Suspend">Status: Suspend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-[#FCFCFD] rounded-[20px] overflow-hidden border border-slate-100 shadow-sm">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">Pengguna</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap bg-[#F4F4F5]/50 border-b border-slate-100">Bergabung</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap text-right bg-[#F4F4F5]/50 border-b border-slate-100">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Memuat data pengguna...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-red-500">{error}</td>
                </tr>
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">Tidak ada pengguna yang sesuai dengan filter.</td>
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
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#A7F3D0] text-[#047857]">Tutor</span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E4E4E7] text-[#52525B]">Pelajar</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${user.status === 'Aktif' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        <span className={`text-[13px] font-bold ${user.status === 'Aktif' ? 'text-emerald-600' : 'text-red-600'}`}>{user.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[14px] text-slate-600 font-medium">{user.joinDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-3 text-slate-400">
                        <button onClick={() => setViewModal({ isOpen: true, item: user })} className="hover:text-slate-600 transition-colors p-1" title="Lihat Profil"><Eye className="w-5 h-5" /></button>
                        {user.status === 'Aktif' && <button onClick={() => setSuspendModal({ isOpen: true, item: user, duration: '1 Minggu' })} className="hover:text-amber-600 transition-colors p-1" title="Suspend"><Ban className="w-5 h-5" /></button>}
                        {user.status === 'Suspend' && <button onClick={() => handleUnsuspend(user.id, user.name)} className="hover:text-emerald-600 transition-colors p-1" title="Buka Suspend"><Unlock className="w-5 h-5" /></button>}
                        <button onClick={() => setDeleteModal({ isOpen: true, item: user })} className="hover:text-red-600 transition-colors p-1" title="Hapus Permanen"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-5 flex items-center justify-between border-t border-slate-100 bg-white">
          <div className="text-[13px] text-slate-500 font-medium">
            Menampilkan <span className="font-bold text-slate-700">{startIndex} - {endIndex}</span> dari <span className="font-bold text-slate-700">{filteredUsers.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-sm font-bold text-slate-700 mx-2">{currentPage} / {totalPages}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Komponen Tab Verifikasi Tutor ────────────────────────────────────────────
function TabVerifikasiTutor() {
  const [pendingUsers, setPendingUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const [viewModal, setViewModal] = useState({ isOpen: false, item: null })
  const [rejectModal, setRejectModal] = useState({ isOpen: false, item: null, reason: 'Dokumen tidak valid' })

  const fetchApplications = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get('/admin/applications')
      const formattedApps = response.data.data.map(app => ({
        id: app.id,
        name: app.name,
        email: app.email,
        joinDate: app.created_at,
        image: app.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random`,
        status: app.status,
        documents: app.documents || [],
        matkul: app.matkul || [],
        keahlian: app.keahlian || []
      }))
      setPendingUsers(formattedApps)
    } catch (err) {
      setError('Gagal memuat data pengajuan tutor.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000)
  }

  const handleAcc = async (user) => {
    try {
      await axios.patch(`/admin/applications/${user.id}/approve`)
      showToast(`Pendaftaran Tutor untuk ${user.name} disetujui. Notifikasi otomatis dikirimkan ke Learner.`)
      setViewModal({ isOpen: false, item: null })
      fetchApplications()
    } catch (err) {
      showToast('Gagal menyetujui pendaftaran tutor.', 'error')
    }
  }

  const handleReject = async () => {
    try {
      await axios.patch(`/admin/applications/${rejectModal.item.id}/reject`, {
        admin_note: rejectModal.reason
      })
      showToast(`Pendaftaran Tutor untuk ${rejectModal.item.name} telah ditolak.`)
      setRejectModal({ isOpen: false, item: null, reason: 'Dokumen tidak valid' })
      fetchApplications()
    } catch (err) {
      showToast('Gagal menolak pendaftaran tutor.', 'error')
    }
  }

  return (
    <div className="animate-in fade-in duration-300 relative">
      <ToastNotification toast={toast} onClose={() => setToast({ show: false, message: '' })} />

      {/* Modal Lihat Dokumen */}
      {viewModal.isOpen && viewModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setViewModal({ isOpen: false, item: null })} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <h2 className="text-2xl font-bold text-[#0a0f44] mb-6 border-b pb-4">Verifikasi Pendaftaran Tutor</h2>
            
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarImage src={viewModal.item.image} alt={viewModal.item.name} />
                <AvatarFallback>{viewModal.item.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{viewModal.item.name}</h3>
                <p className="text-sm text-slate-500">{viewModal.item.email}</p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-700">Menunggu Verifikasi</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Dokumen */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-[#000666]" />
                  <h4 className="font-bold text-slate-800">Dokumen Pendukung</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {viewModal.item.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-[#000666]/10 flex items-center justify-center text-[#000666]">
                        {doc.type === 'file' && <FileText className="w-5 h-5" />}
                        {doc.type === 'link' && <Link2 className="w-5 h-5" />}
                        {doc.type === 'image' && <ImageIcon className="w-5 h-5" />}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{doc.label}</p>
                        <p className="text-sm font-semibold text-[#000666] truncate hover:underline cursor-pointer">
                          {doc.type === 'link' ? doc.value : doc.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mata Kuliah */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap className="w-5 h-5 text-[#000666]" />
                  <h4 className="font-bold text-slate-800">Mata Kuliah Diajukan</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {viewModal.item.matkul.map(mk => (
                    <span key={mk} className="px-3 py-1.5 bg-[#0d7c6b]/10 text-[#0d7c6b] rounded-full text-sm font-bold border border-[#0d7c6b]/20">{mk}</span>
                  ))}
                </div>
              </div>

              {/* Keahlian */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-[#000666]" />
                  <h4 className="font-bold text-slate-800">Keahlian</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {viewModal.item.keahlian.map(k => (
                    <span key={k} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold">{k}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t flex items-center gap-3">
              <button onClick={() => setViewModal({ isOpen: false, item: null })} className="flex-1 py-3.5 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Tutup</button>
              <button onClick={() => handleAcc(viewModal.item)} className="flex-1 py-3.5 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> ACC Pendaftaran
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Penolakan */}
      {rejectModal.isOpen && rejectModal.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setRejectModal({ isOpen: false, item: null, reason: 'Dokumen tidak valid' })} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-red-100 text-red-600">
              <Ban className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-[#0a0f44] mb-2">Tolak Pendaftaran</h3>
            <p className="text-slate-500 text-[15px] mb-6">Pilih alasan penolakan untuk calon tutor <strong>{rejectModal.item.name}</strong>. Alasan ini akan dikirimkan kepada yang bersangkutan.</p>
            
            <div className="space-y-3 mb-8">
              {['Dokumen tidak valid', 'Nilai kurang memenuhi syarat', 'Informasi tidak lengkap'].map(rsn => (
                <button 
                  key={rsn}
                  onClick={() => setRejectModal(prev => ({ ...prev, reason: rsn }))}
                  className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${rejectModal.reason === rsn ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-white hover:border-red-200'}`}
                >
                  <span className={`font-bold text-left ${rejectModal.reason === rsn ? 'text-red-700' : 'text-slate-600'}`}>{rsn}</span>
                  <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${rejectModal.reason === rsn ? 'border-red-500' : 'border-slate-300'}`}>
                    {rejectModal.reason === rsn && <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => setRejectModal({ isOpen: false, item: null, reason: 'Dokumen tidak valid' })} className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Batal</button>
              <button onClick={handleReject} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm">Konfirmasi Tolak</button>
            </div>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-slate-100 p-4 sm:px-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#000666]">Daftar Pengajuan Tutor</h2>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="py-4 px-6">Learner</th>
                <th className="py-4 px-6">Tanggal Pengajuan</th>
                <th className="py-4 px-6">Mata Kuliah Diajukan</th>
                <th className="py-4 px-6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr><td colSpan={4} className="py-12 px-6 text-center text-slate-500">Memuat data pengajuan tutor...</td></tr>
              ) : error ? (
                <tr><td colSpan={4} className="py-12 px-6 text-center text-red-500">{error}</td></tr>
              ) : pendingUsers.length === 0 ? (
                <tr><td colSpan={4} className="py-12 px-6 text-center text-slate-500">Tidak ada pengajuan pendaftaran tutor baru.</td></tr>
              ) : pendingUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9"><AvatarImage src={user.image} /><AvatarFallback>UX</AvatarFallback></Avatar>
                      <div>
                        <div className="font-bold text-[#000666]">{user.name}</div>
                        <div className="text-[12px] text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-600">{user.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {user.matkul.map((m, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold whitespace-nowrap">{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setViewModal({ isOpen: true, item: user })} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" /> Lihat Berkas
                      </button>
                      <button onClick={() => setRejectModal({ isOpen: true, item: user, reason: 'Dokumen tidak valid' })} className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-red-200 shadow-sm flex items-center gap-1.5">
                        <X className="w-3.5 h-3.5" /> Tolak
                      </button>
                      <button onClick={() => handleAcc(user)} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-emerald-200 shadow-sm flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> ACC
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Komponen Tab Keuangan ────────────────────────────────────────────────────
function TabKeuangan() {
  const [transaksi, setTransaksi] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [modalConfig, setModalConfig] = useState({ isOpen: false, item: null })
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const fetchPayments = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get('/admin/payments')
      setTransaksi(response.data.data)
    } catch (err) {
      setError('Gagal memuat data keuangan.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPayments()
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000)
  }

  const handleConfirmAcc = async () => {
    if (!modalConfig.item) return
    try {
      await axios.patch(`/admin/payments/${modalConfig.item.id}/approve`)
      showToast(`Pembayaran dari ${modalConfig.item.learner} berhasil di-ACC. Jadwal telah diaktifkan.`)
      setModalConfig({ isOpen: false, item: null })
      fetchPayments()
    } catch (err) {
      showToast('Gagal menyetujui pembayaran.', 'error')
    }
  }

  return (
    <div className="animate-in fade-in duration-300 relative">
      <ToastNotification toast={toast} onClose={() => setToast({ show: false, message: '', type: 'success' })} />

      {modalConfig.isOpen && modalConfig.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setModalConfig({ isOpen: false, item: null })} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 bg-emerald-100 text-emerald-600"><CheckCircle className="w-8 h-8" /></div>
            <h3 className="text-xl font-bold text-[#0a0f44] mb-2">Setujui Pembayaran?</h3>
            <p className="text-slate-500 text-[15px] mb-8 leading-relaxed">Apakah Anda yakin ingin melakukan ACC untuk pembayaran sebesar <strong>Rp {modalConfig.item.nominal?.toLocaleString('id-ID')}</strong> dari Learner <strong>"{modalConfig.item.learner}"</strong>?</p>
            <div className="flex items-center gap-3">
              <button onClick={() => setModalConfig({ isOpen: false, item: null })} className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Batal</button>
              <button onClick={handleConfirmAcc} className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-sm">Ya, Setujui</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-slate-100 p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-[#000666]">Daftar Konfirmasi Pembayaran Learner</h2>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                <th className="py-4 px-6">ID Transaksi</th>
                <th className="py-4 px-6">Waktu</th>
                <th className="py-4 px-6">Learner</th>
                <th className="py-4 px-6">Tujuan (Tutor)</th>
                <th className="py-4 px-6">Metode</th>
                <th className="py-4 px-6">Nominal</th>
                <th className="py-4 px-6 text-center">Status / Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {isLoading ? (
                <tr><td colSpan={7} className="py-12 px-6 text-center text-slate-500">Memuat data pembayaran...</td></tr>
              ) : error ? (
                <tr><td colSpan={7} className="py-12 px-6 text-center text-red-500">{error}</td></tr>
              ) : transaksi.length === 0 ? (
                <tr><td colSpan={7} className="py-12 px-6 text-center text-slate-500">Tidak ada data pembayaran.</td></tr>
              ) : transaksi.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#000666]">TRX-{trx.id}</td>
                  <td className="py-4 px-6 text-slate-500">{trx.tanggal}</td>
                  <td className="py-4 px-6 text-slate-700 font-semibold">{trx.learner}</td>
                  <td className="py-4 px-6 text-slate-700">{trx.tutor}</td>
                  <td className="py-4 px-6">
                    <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold uppercase">{trx.metode}</span>
                  </td>
                  <td className="py-4 px-6 font-bold text-emerald-600">Rp {trx.nominal?.toLocaleString('id-ID')}</td>
                  <td className="py-4 px-6">
                    {trx.status === 'pending' || trx.status === 'Menunggu' ? (
                      <button onClick={() => setModalConfig({ isOpen: true, item: trx })} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-emerald-200 shadow-sm flex items-center gap-1.5 w-full justify-center">
                        <CheckCircle className="w-3.5 h-3.5" /> ACC
                      </button>
                    ) : (
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${trx.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                          {trx.status === 'accepted' ? 'Selesai' : trx.status}
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function Manajemen() {
  const [activeTab, setActiveTab] = useState('pengguna')

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#000666] mb-2 tracking-tight">Manajemen Platform</h1>
        <p className="text-slate-500 text-[15px]">Kelola pengguna, verifikasi tutor baru, dan pantau pembayaran dalam satu tempat.</p>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap bg-slate-50 p-1 rounded-xl w-fit border border-slate-100 mb-6 gap-1">
        <button
          onClick={() => setActiveTab('pengguna')}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'pengguna' ? 'bg-white text-[#0d7c6b] shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
        >
          <Users className="w-4 h-4" /> Manajemen Pengguna
        </button>
        <button
          onClick={() => setActiveTab('verifikasi')}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'verifikasi' ? 'bg-white text-[#0d7c6b] shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
        >
          <UserCheck className="w-4 h-4" /> Verifikasi Tutor
        </button>
        <button
          onClick={() => setActiveTab('keuangan')}
          className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'keuangan' ? 'bg-white text-[#0d7c6b] shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100/50'}`}
        >
          <Wallet className="w-4 h-4" /> Manajemen Keuangan
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-2">
        {activeTab === 'pengguna' && <TabPengguna />}
        {activeTab === 'verifikasi' && <TabVerifikasiTutor />}
        {activeTab === 'keuangan' && <TabKeuangan />}
      </div>
    </div>
  )
}
