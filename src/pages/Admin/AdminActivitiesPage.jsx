import React, { useState, useEffect } from 'react'
import { Search, Users, UserCheck, Wallet, History, Calendar, Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'

export default function AdminActivitiesPage() {
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('/admin/moderation/logs')
        if (response.data && response.data.data) {
          setLogs(response.data.data)
        }
      } catch (error) {
        console.error("Gagal mengambil log aktivitas:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchLogs()
  }, [])

  const filteredLogs = logs.filter(log => {
    const term = search.toLowerCase()
    let detailsString = '';
    if (log.details) {
      if (typeof log.details === 'object') {
        detailsString = `${log.details.rating || ''} ${log.details.comment || ''} ${JSON.stringify(log.details)}`;
      } else {
        detailsString = String(log.details);
      }
    }
    return (log.admin_name?.toLowerCase().includes(term) ||
            log.action?.toLowerCase().includes(term) ||
            log.reason?.toLowerCase().includes(term) ||
            detailsString.toLowerCase().includes(term))
  })

  return (
    <div className="flex flex-col min-h-full pb-10">
      <div className="mb-6">
        <h1 className="text-[32px] font-bold text-[#000666] mb-2 tracking-tight">Manajemen Platform</h1>
        <p className="text-slate-500 text-[15px]">Kelola pengguna, verifikasi tutor baru, dan pantau pembayaran dalam satu tempat.</p>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap bg-slate-50 p-1 rounded-xl w-fit border border-slate-100 mb-6 gap-1">
        <button
          onClick={() => navigate('/admin/manajemen')}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
        >
          <Users className="w-4 h-4" /> Manajemen Pengguna
        </button>
        <button
          onClick={() => navigate('/admin/manajemen')}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
        >
          <UserCheck className="w-4 h-4" /> Verifikasi Tutor
        </button>
        <button
          onClick={() => navigate('/admin/manajemen')}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all text-slate-500 hover:text-slate-700 hover:bg-slate-100/50"
        >
          <Wallet className="w-4 h-4" /> Manajemen Keuangan
        </button>
        <button
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-lg transition-all bg-white text-[#0d7c6b] shadow-sm"
        >
          <History className="w-4 h-4" /> Riwayat Aktivitas
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[600px]">
        {/* Header Content */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[#000666]">Riwayat Aktivitas Admin</h2>
            <p className="text-sm text-slate-500">Log lengkap dari semua tindakan moderasi.</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Cari admin, aksi, atau alasan..." 
              className="pl-9 h-10 bg-slate-50 border-slate-200 focus-visible:ring-[#000666] rounded-xl text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-auto bg-slate-50/30">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#0d7c6b]" />
              <p className="text-sm font-medium">Memuat riwayat aktivitas...</p>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <History className="w-12 h-12 text-slate-200 mb-3" />
              <p className="font-medium">Riwayat aktivitas tidak ditemukan.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-white sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap bg-white">Waktu</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap bg-white">Admin</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 whitespace-nowrap bg-white">Aksi</th>
                  <th className="py-4 px-6 text-[11px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 bg-white">Alasan / Detail</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLogs.map(log => {
                  const dateObj = new Date(log.created_at || log.time)
                  const timeString = log.tanggal || (isNaN(dateObj) ? '-' : `${dateObj.getDate()} ${dateObj.toLocaleString('id-ID', { month: 'short' })} ${dateObj.getFullYear()}, ${dateObj.getHours().toString().padStart(2, '0')}:${dateObj.getMinutes().toString().padStart(2, '0')}`)
                  
                  return (
                    <tr key={log.id} className="hover:bg-white transition-colors">
                      <td className="py-4 px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-slate-500 text-[13px]">
                          <Calendar className="w-3.5 h-3.5" />
                          {timeString}
                        </div>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="font-bold text-[#000666] text-[13px]">{log.admin_name || 'System'}</span>
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#e8f5f2] text-[#0d7c6b]">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-slate-600 text-[13px] mb-0.5">Alasan: {log.reason || '-'}</p>
                        {log.details && (
                          <div className="text-xs text-slate-500 font-medium leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200 mt-1.5 font-mono">
                            {typeof log.details === 'object' ? (
                              <>
                                {log.details.rating && <div className="mb-1">⭐ {log.details.rating}</div>}
                                {log.details.comment && <div>Ulasan: "{log.details.comment}"</div>}
                                {!log.details.rating && !log.details.comment && JSON.stringify(log.details)}
                              </>
                            ) : (
                              log.details
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
