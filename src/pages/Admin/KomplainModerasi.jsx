import React, { useState } from 'react'
import {
  BarChart2,
  Ban,
  CheckCircle2,
  ShieldAlert,
  History,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react'

// Generate Dummy Data (50 items)
const generateDummyComplaints = () => {
  const jenisOptions = ['Tutor', 'Learner', 'Sistem']
  const statusOptions = ['BARU', 'DIPROSES', 'SELESAI']
  const prioritasOptions = ['Tinggi', 'Sedang', 'Rendah']
  
  const dummy = []
  for (let i = 1; i <= 50; i++) {
    const jenis = jenisOptions[i % 3]
    const status = statusOptions[i % 3]
    const prioritas = prioritasOptions[(i * 7) % 3]
    
    dummy.push({
      id: `#KD-${9000 + i}`,
      pelapor: `Pengguna ${i}`,
      terlapor: jenis === 'Sistem' ? 'Sistem' : `Target ${i}`,
      jenis: jenis,
      deskripsi: `Deskripsi komplain ke-${i}. Pengguna melaporkan masalah terkait interaksi ${jenis.toLowerCase()} yang perlu ditinjau.`,
      status: status,
      prioritas: prioritas,
    })
  }
  
  // Replace first 3 with the specific examples from Figma
  dummy[0] = {
    id: '#KD-9281',
    pelapor: 'Sari Widya',
    terlapor: 'alex@gmail.com',
    jenis: 'Tutor',
    deskripsi: 'Tutor tidak hadir pada sesi yang dijadwalkan',
    status: 'BARU',
    prioritas: 'Tinggi',
  }
  dummy[1] = {
    id: '#KD-9275',
    pelapor: 'Budi Santoso',
    terlapor: 'nia@gmail.com',
    jenis: 'Learner',
    deskripsi: 'Penggunaan kata kasar dalam kolom komentar',
    status: 'DIPROSES',
    prioritas: 'Sedang',
  }
  dummy[2] = {
    id: '#KD-9240',
    pelapor: 'Lina Marlina',
    terlapor: 'Sistem',
    jenis: 'Sistem',
    deskripsi: 'Gagal melakukan penarikan saldo (Withdrawal)',
    status: 'SELESAI',
    prioritas: 'Sedang',
  }

  return dummy
}

const allComplaintsData = generateDummyComplaints()

const activitiesData = [
  {
    id: 1,
    icon: <Ban className="w-5 h-5 text-red-600" />,
    bgIcon: 'bg-red-100',
    description: (
      <>
        Admin menangguhkan akun tutor <strong>alex@gmail.com</strong> untuk 7 hari.
      </>
    ),
    meta: '2 JAM YANG LALU • TERKAIT #KD-9281',
  },
  {
    id: 2,
    icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
    bgIcon: 'bg-emerald-100',
    description: 'Laporan #KD-9240 diselesaikan oleh sistem otomatis.',
    meta: '5 JAM YANG LALU • STATUS: REFUND SUKSES',
  },
  {
    id: 3,
    icon: <ShieldAlert className="w-5 h-5 text-indigo-600" />,
    bgIcon: 'bg-indigo-100',
    description: (
      <>
        Moderator <strong>Indah P.</strong> menandai laporan <strong>#KD-9275</strong> sebagai duplikat.
      </>
    ),
    meta: 'KEMARIN, 14:20 • PENINJAUAN MANUAL',
  },
]

export default function KomplainModerasi() {
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const totalPages = Math.ceil(allComplaintsData.length / itemsPerPage)
  
  const currentData = allComplaintsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePageClick = (page) => setCurrentPage(page)

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'BARU':
        return <span className="bg-red-100 text-red-600 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">{status}</span>
      case 'DIPROSES':
        return <span className="bg-orange-100 text-orange-600 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">{status}</span>
      case 'SELESAI':
        return <span className="bg-[#E6FCF5] text-[#00897B] font-bold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest">{status}</span>
      default:
        return <span className="bg-slate-100 text-slate-600 font-bold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-widest">{status}</span>
    }
  }

  const renderPrioritas = (prioritas) => {
    switch (prioritas) {
      case 'Tinggi':
        return (
          <div className="flex items-center gap-2 text-red-600 font-bold text-[13px]">
            <div className="w-2 h-2 rounded-full bg-red-600"></div>
            {prioritas}
          </div>
        )
      case 'Sedang':
        return (
          <div className="flex items-center gap-2 text-orange-500 font-bold text-[13px]">
            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            {prioritas}
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-2 text-slate-500 font-bold text-[13px]">
            <div className="w-2 h-2 rounded-full bg-slate-500"></div>
            {prioritas}
          </div>
        )
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#000666] mb-2 tracking-tight">Komplain & Moderasi</h1>
        <p className="text-slate-500 text-[15px]">Kelola laporan pengguna dan jaga kualitas interaksi di platform secara editorial dan humanis.</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Card 1 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Total Komplain</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-[#000666] leading-none tracking-tight">1,284</div>
            <div className="w-10 h-10 rounded-[10px] bg-[#EEF2FF] flex items-center justify-center">
              <BarChart2 className="w-5 h-5 text-[#000666]" />
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Komplain Baru</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-red-600 leading-none tracking-tight">42</div>
            <div className="bg-red-100 text-red-600 text-[11px] font-bold px-3 py-1.5 rounded-full">
              Penting
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Sedang Diproses</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-orange-500 leading-none tracking-tight">18</div>
            <div className="bg-orange-100 text-orange-600 text-[11px] font-bold px-3 py-1.5 rounded-full">
              Antrean
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Selesai</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-emerald-600 leading-none tracking-tight">1,224</div>
            <div className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
              Aman
            </div>
          </div>
        </div>

      </div>

      {/* Complaints Table Section */}
      <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#F1F5F9]">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[8%]">ID</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[15%]">Pelapor</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[15%]">Terlapor</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[10%]">Jenis</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[30%]">Deskripsi</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[12%]">Status</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[10%]">Prioritas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6">
                    <span className="font-bold text-slate-600 text-[13px]">{item.id}</span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="font-bold text-[#000666] text-[14px] whitespace-nowrap">{item.pelapor}</span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="text-slate-600 text-[14px]">{item.terlapor}</span>
                  </td>
                  <td className="py-5 px-6">
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-full">{item.jenis}</span>
                  </td>
                  <td className="py-5 px-6">
                    <p className="text-slate-600 text-[13px] leading-relaxed pr-4">
                      {item.deskripsi}
                    </p>
                  </td>
                  <td className="py-5 px-6 whitespace-nowrap">
                    {renderStatusBadge(item.status)}
                  </td>
                  <td className="py-5 px-6 whitespace-nowrap">
                    {renderPrioritas(item.prioritas)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-[#F1F5F9] px-6 py-4 flex flex-col sm:flex-row items-center justify-between rounded-b-[24px]">
          <span className="text-[13px] text-slate-500 font-medium mb-4 sm:mb-0">
            Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, allComplaintsData.length)} hingga {Math.min(currentPage * itemsPerPage, allComplaintsData.length)} dari {allComplaintsData.length} laporan
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-[#000666] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                return (
                  <button 
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-[13px] shadow-sm transition-colors cursor-pointer ${
                      currentPage === page 
                        ? 'bg-[#000666] text-white' 
                        : 'text-slate-500 hover:text-[#000666] hover:bg-white'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <div key={page} className="w-8 h-8 flex items-center justify-center text-slate-400">
                    <MoreHorizontal className="w-4 h-4" />
                  </div>
                );
              }
              return null;
            })}

            <button 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:text-[#000666] hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Aktivitas Moderasi Terbaru */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <History className="w-5 h-5 text-[#000666]" />
          <h2 className="text-xl font-bold text-[#000666]">Aktivitas Moderasi Terbaru</h2>
        </div>
        
        <div className="space-y-4">
          {activitiesData.map((activity) => (
            <div key={activity.id} className="bg-white rounded-[20px] p-6 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm border border-slate-100 gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${activity.bgIcon}`}>
                  {activity.icon}
                </div>
                <div>
                  <p className="text-slate-700 text-[14px] leading-relaxed mb-1">
                    {activity.description}
                  </p>
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {activity.meta}
                  </p>
                </div>
              </div>
              <button className="text-[13px] font-bold text-[#000666] hover:text-blue-800 transition-colors sm:ml-4 flex-shrink-0 self-start sm:self-center">
                Detail
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
