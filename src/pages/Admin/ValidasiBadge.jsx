import { useState } from 'react'
import { FileText, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const badgeRequests = [
  {
    id: 1,
    name: 'Budi Santoso',
    program: 'Teknik Informatika',
    semester: 'Semester 6',
    document: 'Pengajuan Transkrip Nilai (Kalkulus Lanjut)',
    status: 'Menunggu',
    avatar: 'https://i.pravatar.cc/150?img=33',
    docIcon: FileText,
  },
  {
    id: 2,
    name: 'Annisa Nurul',
    program: 'Sistem Informasi',
    semester: 'Semester 8',
    document: 'Verifikasi Kartu Tanda Mahasiswa',
    status: 'Menunggu',
    avatar: null,
    docIcon: GraduationCap,
  },
  {
    id: 3,
    name: 'Dimas Prakoso',
    program: 'Ilmu Komputer',
    semester: 'Alumni',
    document: 'Pengajuan Transkrip Nilai (Struktur Data)',
    status: 'Disetujui',
    avatar: 'https://i.pravatar.cc/150?img=60',
    docIcon: FileText,
  },
]

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function ValidasiBadge() {
  const [activeTab, setActiveTab] = useState('Pending')

  const filteredRequests = badgeRequests.filter(req => {
    if (activeTab === 'Pending') return req.status === 'Menunggu'
    return req.status === 'Disetujui'
  })

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Validasi Antrean</h1>
          <p className="text-base text-slate-600 mt-3 max-w-xl leading-relaxed">
            Tinjau dokumen kredensial dan transkrip nilai untuk memberikan status "Expert" kepada tutor di platform KonekDin.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 min-w-[150px]">
            <p className="text-sm text-slate-500 font-medium">Menunggu Validasi</p>
            <p className="text-3xl font-bold text-[#0a0f44] mt-1">24</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6 py-5 min-w-[150px]">
            <p className="text-sm text-slate-500 font-medium">Divalidasi Hari Ini</p>
            <p className="text-3xl font-bold text-teal-600 mt-1">12</p>
          </div>
        </div>
      </div>

      {/* Document List Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Dokumen Terbaru</h2>
          <div className="flex items-center bg-slate-100 rounded-full p-1">
            {['Pending', 'Selesai'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Request Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-md transition-shadow"
            >
              {/* User Info */}
              <div className="flex items-start gap-4 mb-5">
                <Avatar className="h-12 w-12">
                  {req.avatar ? (
                    <AvatarImage src={req.avatar} alt={req.name} />
                  ) : null}
                  <AvatarFallback className="bg-slate-200 text-slate-700 text-sm font-semibold">
                    {getInitials(req.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-[17px] font-semibold text-slate-900">{req.name}</h4>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${
                      req.status === 'Menunggu'
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-teal-50 text-teal-600'
                    }`}>
                      {req.status === 'Disetujui' && <CheckCircle2 className="h-3 w-3" />}
                      {req.status === 'Menunggu' && <span className="h-2 w-2 rounded-full bg-orange-400"></span>}
                      {req.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{req.program} • {req.semester}</p>
                </div>
              </div>

              {/* Document */}
              <div className="flex items-center gap-3 mb-5 text-sm text-slate-600">
                <req.docIcon className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <span>{req.document}</span>
              </div>

              {/* Action */}
              {req.status === 'Menunggu' ? (
                <Button className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-xl px-6 py-5 font-medium shadow-none">
                  Review Dokumen <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button variant="outline" className="rounded-xl px-6 py-5 font-medium border-slate-200 text-slate-700 hover:bg-slate-50 shadow-none">
                  Lihat Detail
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
