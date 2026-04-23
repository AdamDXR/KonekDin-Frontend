import { useState } from 'react'
import { Plus, Search, GraduationCap, BookOpen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const usersData = [
  {
    id: 1,
    name: 'Dr. Anisa Rahmawati',
    email: 'anisa.rahmawati@univ.edu',
    role: 'Tutor',
    status: 'Aktif',
    joinDate: '12 Okt 2023',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 2,
    name: 'Budi Wicaksono',
    email: 'budi.wicak@student.edu',
    role: 'Tutor',
    status: 'Menunggu Validasi',
    joinDate: '24 Okt 2023',
    avatar: null,
  },
  {
    id: 3,
    name: 'Kevin Sanjaya',
    email: 'kevin.s@student.edu',
    role: 'Learner',
    status: 'Aktif',
    joinDate: '05 Nov 2023',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 4,
    name: 'Citra Susanti',
    email: 'citrasus@student.edu',
    role: 'Learner',
    status: 'Aktif',
    joinDate: '08 Nov 2023',
    avatar: null,
  },
]

const tabs = ['Semua Pengguna', 'Learner', 'Tutor']

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function KelolaUser() {
  const [activeTab, setActiveTab] = useState('Semua Pengguna')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = usersData.filter(user => {
    const matchTab =
      activeTab === 'Semua Pengguna' ||
      user.role === activeTab
    const matchSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchTab && matchSearch
  })

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Direktori Pengguna</h1>
          <p className="text-base text-slate-600 mt-2 max-w-xl leading-relaxed">
            Kelola data seluruh civitas akademika. Tinjau status Learner, validasi pendaftaran Tutor baru, dan kelola akses platform secara menyeluruh.
          </p>
        </div>
        <Button className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-xl px-6 py-6 font-medium shadow-none whitespace-nowrap">
          <Plus className="h-4 w-4 mr-2" />
          Tambah Pengguna
        </Button>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[#EEF2FF] text-[#1D4ED8] border border-[#C7D2FE]'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
              {tab === 'Tutor' && (
                <span className="inline-block ml-2 h-2 w-2 rounded-full bg-orange-400"></span>
              )}
            </button>
          ))}
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-11 bg-white border-slate-200 rounded-xl h-11 text-sm shadow-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-sm font-semibold text-slate-500 px-6 py-4">Pengguna</th>
                <th className="text-left text-sm font-semibold text-slate-500 px-6 py-4">Peran</th>
                <th className="text-left text-sm font-semibold text-slate-500 px-6 py-4">Status</th>
                <th className="text-left text-sm font-semibold text-slate-500 px-6 py-4">Bergabung</th>
                <th className="text-right text-sm font-semibold text-slate-500 px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-50 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-11 w-11">
                        {user.avatar ? (
                          <AvatarImage src={user.avatar} alt={user.name} />
                        ) : null}
                        <AvatarFallback className="bg-[#0a0f44] text-white text-sm font-semibold">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-[15px] font-semibold text-slate-900">{user.name}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      {user.role === 'Tutor' ? (
                        <BookOpen className="h-4 w-4 text-slate-400" />
                      ) : (
                        <GraduationCap className="h-4 w-4 text-slate-400" />
                      )}
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {user.status === 'Aktif' ? (
                      <span className="inline-flex items-center bg-teal-50 text-teal-700 text-xs font-bold px-3 py-1 rounded-full">
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center bg-orange-50 text-orange-700 text-xs font-bold px-3 py-1 rounded-full">
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-sm text-slate-600">{user.joinDate}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="text-sm font-medium text-slate-500 hover:text-slate-900">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-slate-100 gap-3">
          <p className="text-sm text-slate-500">Menampilkan 1 hingga {filteredUsers.length} dari 124 pengguna</p>
          <div className="flex items-center gap-1">
            <button className="h-9 w-9 rounded-lg flex items-center justify-center text-sm text-slate-400 hover:bg-slate-100">‹</button>
            <button className="h-9 w-9 rounded-lg flex items-center justify-center text-sm font-bold bg-[#0a0f44] text-white">1</button>
            <button className="h-9 w-9 rounded-lg flex items-center justify-center text-sm text-slate-600 hover:bg-slate-100">2</button>
            <button className="h-9 w-9 rounded-lg flex items-center justify-center text-sm text-slate-600 hover:bg-slate-100">3</button>
            <span className="text-sm text-slate-400 px-1">...</span>
            <button className="h-9 w-9 rounded-lg flex items-center justify-center text-sm text-slate-400 hover:bg-slate-100">›</button>
          </div>
        </div>
      </div>
    </div>
  )
}
