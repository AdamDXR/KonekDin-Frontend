import React, { useState, useEffect } from 'react'
import {
  Star,
  ShieldAlert,
  AlertTriangle,
  Trash2,
  CheckCircle,
  History,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Ban,
  MessageSquareWarning,
  X,
  CheckCircle2,
  Clock
} from 'lucide-react'

// Generate Dummy Data for Low Rating Reviews
const generateDummyComplaints = () => {
  const dummy = []
  for (let i = 1; i <= 50; i++) {
    const rating = i % 2 === 0 ? 1 : 2 
    const isProcessed = i > 40 
    
    dummy.push({
      id: `#BK-${8000 + i}`,
      waktu: `1${i % 9} Okt 2026, 14:${i.toString().padStart(2, '0')}`,
      pelapor: `Learner ${i}`,
      terlapor: `Tutor ${i}`,
      rating: rating,
      deskripsi: rating === 1 
        ? `Sangat mengecewakan. Tutor tidak hadir tanpa kabar sama sekali, padahal saya sudah menunggu lama.`
        : `Penjelasan kurang bisa dipahami dan tutor terkesan buru-buru mengakhiri sesi.`,
      status: isProcessed ? 'SELESAI' : 'MENUNGGU TINJAUAN',
    })
  }
  
  // Specific interesting data at the top
  dummy[0] = {
    id: '#BK-8921',
    waktu: '16 Okt 2026, 10:30',
    pelapor: 'Budi Santoso',
    terlapor: 'Dukun Samin',
    rating: 1,
    deskripsi: 'Tutor sama sekali tidak membalas chat dan tidak datang ke room meeting.',
    status: 'MENUNGGU TINJAUAN',
  }
  dummy[1] = {
    id: '#BK-8915',
    waktu: '15 Okt 2026, 19:45',
    pelapor: 'Rina Melati',
    terlapor: 'Siti Aminah',
    rating: 2,
    deskripsi: 'Suara putus-putus dan sepertinya tutor tidak siap materi.',
    status: 'MENUNGGU TINJAUAN',
  }
  dummy[2] = {
    id: '#BK-8840',
    waktu: '10 Okt 2026, 09:15',
    pelapor: 'Joko Widodo',
    terlapor: 'Bambang Pamungkas',
    rating: 1,
    deskripsi: 'Hahaha tutornya lucu, tapi saya kasih bintang 1 ah biar seru.', // Contoh troll
    status: 'MENUNGGU TINJAUAN',
  }

  return dummy
}

const activitiesData = [
  {
    id: 1,
    icon: <ShieldAlert className="w-5 h-5 text-orange-600" />,
    bgIcon: 'bg-orange-100',
    description: (
      <>
        Admin telah menindaklanjuti Tutor <strong>Dukun Samin</strong> atas komplain ketidakhadiran.
      </>
    ),
    meta: '2 JAM YANG LALU • STATUS: DIPROSES',
  },
  {
    id: 2,
    icon: <Trash2 className="w-5 h-5 text-slate-600" />,
    bgIcon: 'bg-slate-100',
    description: (
      <>
        Admin telah menghapus ulasan dari Learner <strong>Joko Widodo</strong> karena terdeteksi sebagai troll/spam.
      </>
    ),
    meta: '5 JAM YANG LALU • STATUS: SELESAI',
  },
  {
    id: 3,
    icon: <ShieldAlert className="w-5 h-5 text-orange-600" />,
    bgIcon: 'bg-orange-100',
    description: (
      <>
        Admin telah menindaklanjuti Tutor <strong>Bambang Pamungkas</strong> atas laporan metode pengajaran yang tidak sesuai.
      </>
    ),
    meta: 'KEMARIN, 14:20 • STATUS: DIPROSES',
  },
]

export default function KomplainModerasi() {
  const [complaints, setComplaints] = useState(generateDummyComplaints)
  const [currentPage, setCurrentPage] = useState(1)
  
  // Modal State
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, item: null })
  
  // Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const itemsPerPage = 6
  const totalPages = Math.ceil(complaints.length / itemsPerPage)
  const currentData = complaints.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
  const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  const handlePageClick = (page) => setCurrentPage(page)

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' })
    }, 4000)
  }

  const openModal = (type, item) => {
    setModalConfig({ isOpen: true, type, item })
  }

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: null, item: null })
  }

  const handleConfirmAction = () => {
    const { type, item } = modalConfig
    if (!item) return

    if (type === 'hapus_ulasan') {
      setComplaints(prev => prev.filter(c => c.id !== item.id))
      showToast('Ulasan berhasil dihapus dari sistem.')
    } 
    else if (type === 'tindak_lanjut') {
      setComplaints(prev => prev.map(c => 
        c.id === item.id ? { ...c, status: 'DIPROSES' } : c
      ))
      showToast(`Tutor ${item.terlapor} akan segera ditindaklanjuti. Status: Diproses.`)
    }
    else if (type === 'selesai') {
      setComplaints(prev => prev.map(c => 
        c.id === item.id ? { ...c, status: 'SELESAI' } : c
      ))
      showToast(`Laporan terhadap ${item.terlapor} berhasil diselesaikan.`)
    }

    closeModal()
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
        <span className="font-bold text-slate-700 text-sm">{rating}.0</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full pb-10 relative">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className="bg-[#000666] text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <p className="font-medium text-sm">{toast.message}</p>
            <button onClick={() => setToast({ ...toast, show: false })} className="ml-4 text-white/70 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {modalConfig.isOpen && modalConfig.item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button onClick={closeModal} className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
              modalConfig.type === 'hapus_ulasan' ? 'bg-red-100 text-red-600' : 
              modalConfig.type === 'tindak_lanjut' ? 'bg-orange-100 text-orange-600' : 'bg-emerald-100 text-emerald-600'
            }`}>
              {modalConfig.type === 'hapus_ulasan' && <Trash2 className="w-8 h-8" />}
              {modalConfig.type === 'tindak_lanjut' && <ShieldAlert className="w-8 h-8" />}
              {modalConfig.type === 'selesai' && <CheckCircle className="w-8 h-8" />}
            </div>

            <h3 className="text-xl font-bold text-[#0a0f44] mb-2">
              {modalConfig.type === 'hapus_ulasan' ? 'Hapus Ulasan Ini?' : 
               modalConfig.type === 'tindak_lanjut' ? 'Tindak Lanjut Tutor?' : 'Tandai Selesai?'}
            </h3>
            
            <p className="text-slate-500 text-[15px] mb-8 leading-relaxed">
              {modalConfig.type === 'hapus_ulasan' && `Apakah Anda yakin ingin menghapus ulasan dari Learner "${modalConfig.item.pelapor}"? Tindakan ini tidak dapat dibatalkan.`}
              {modalConfig.type === 'tindak_lanjut' && `Apakah Anda yakin ulasan ini valid dan ingin menindaklanjuti Tutor "${modalConfig.item.terlapor}"? Status laporan akan berubah menjadi "Diproses".`}
              {modalConfig.type === 'selesai' && `Apakah masalah dengan Tutor "${modalConfig.item.terlapor}" telah terselesaikan? Status laporan akan ditandai selesai.`}
            </p>

            <div className="flex items-center gap-3">
              <button 
                onClick={closeModal}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={handleConfirmAction}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-white transition-colors shadow-sm ${
                  modalConfig.type === 'hapus_ulasan' ? 'bg-red-600 hover:bg-red-700' : 
                  modalConfig.type === 'tindak_lanjut' ? 'bg-orange-600 hover:bg-orange-700' : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold text-[#0a0f44] mb-2 tracking-tight">Komplain & Moderasi</h1>
        <p className="text-slate-500 text-[15px]">Tinjau ulasan ber-rating rendah (⭐ 1 & 2) untuk menjaga kualitas layanan KonekDin.</p>
      </div>

      {/* Insight Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Total Ulasan Negatif</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-[#000666] leading-none tracking-tight">{complaints.length}</div>
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
              <MessageSquareWarning className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Menunggu Tinjauan</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-orange-600 leading-none tracking-tight">
              {complaints.filter(c => c.status === 'MENUNGGU TINJAUAN').length}
            </div>
            <div className="bg-orange-100 text-orange-600 text-[11px] font-bold px-3 py-1.5 rounded-full">
              Action Req.
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Sedang Diproses</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-indigo-600 leading-none tracking-tight">
              {complaints.filter(c => c.status === 'DIPROSES').length}
            </div>
            <div className="bg-indigo-100 text-indigo-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
              Follow-up
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col justify-between min-h-[140px]">
          <div className="text-[13px] font-semibold text-slate-500 mb-4">Selesai</div>
          <div className="flex justify-between items-end">
            <div className="text-[36px] font-extrabold text-[#0d7c6b] leading-none tracking-tight">
              {complaints.filter(c => c.status === 'SELESAI').length}
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-[11px] font-bold px-3 py-1.5 rounded-full">
              Aman
            </div>
          </div>
        </div>
      </div>

      {/* Complaints Table Section */}
      <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-slate-100 mb-8">
        <div className="border-b border-slate-100 p-5 px-6">
          <h2 className="text-lg font-bold text-[#0a0f44]">Daftar Ulasan Rating Rendah (1-2 Bintang)</h2>
        </div>
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[15%] border-b border-slate-100">ID Sesi</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[15%] border-b border-slate-100">Learner / Tutor</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[10%] border-b border-slate-100">Rating</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[35%] border-b border-slate-100">Ulasan / Alasan Learner</th>
                <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest w-[30%] border-b border-slate-100 text-center">Aksi Moderasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 px-6 text-center text-slate-500">Tidak ada komplain yang ditemukan.</td>
                </tr>
              ) : currentData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-5 px-6 whitespace-nowrap">
                    <div className="font-bold text-[#000666] text-[14px] leading-tight">{item.id}</div>
                    <div className="text-[12px] text-slate-500 mt-1">{item.waktu}</div>
                  </td>
                  <td className="py-5 px-6">
                    <div className="font-bold text-slate-700 text-[13px]">{item.pelapor}</div>
                    <div className="text-[12px] text-slate-500 mt-0.5 flex items-center gap-1">
                      → <span className="font-semibold text-slate-600">{item.terlapor}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    {renderStars(item.rating)}
                  </td>
                  <td className="py-5 px-6">
                    <div className="bg-red-50/50 text-slate-700 text-[13px] p-3 rounded-xl border border-red-100/50 italic leading-relaxed">
                      "{item.deskripsi}"
                    </div>
                  </td>
                  <td className="py-5 px-6">
                    {item.status === 'MENUNGGU TINJAUAN' && (
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => openModal('tindak_lanjut', item)}
                          className="bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 py-2 rounded-lg text-[11px] font-bold transition-colors border border-orange-200 flex items-center gap-1.5 shadow-sm"
                        >
                          <ShieldAlert className="w-3.5 h-3.5" />
                          Tindak Lanjut
                        </button>
                        <button 
                          onClick={() => openModal('hapus_ulasan', item)}
                          className="bg-slate-50 hover:bg-red-50 hover:text-red-600 text-slate-600 px-3 py-2 rounded-lg text-[11px] font-bold transition-colors border border-slate-200 hover:border-red-200 flex items-center gap-1.5 shadow-sm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Hapus
                        </button>
                      </div>
                    )}

                    {item.status === 'DIPROSES' && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[11px] font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Diproses
                        </span>
                        <button 
                          onClick={() => openModal('selesai', item)}
                          className="bg-[#000666] hover:bg-[#000666]/90 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition-colors shadow-sm flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" /> Tandai Selesai
                        </button>
                      </div>
                    )}

                    {item.status === 'SELESAI' && (
                      <div className="flex justify-center">
                        <span className="bg-[#E6FCF5] text-[#00897B] font-bold text-[11px] px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5" /> Selesai Ditinjau
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-[#F1F5F9] px-6 py-4 flex flex-col sm:flex-row items-center justify-between">
          <span className="text-[13px] text-slate-500 font-medium mb-4 sm:mb-0">
            Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, complaints.length)} hingga {Math.min(currentPage * itemsPerPage, complaints.length)} dari {complaints.length} ulasan
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
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
