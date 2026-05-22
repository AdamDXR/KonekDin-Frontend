import React from 'react'
import { History } from 'lucide-react'

export default function RiwayatMengajar() {
  return (
    <div className="max-w-3xl">
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
          Riwayat Sesi Mengajar
        </h1>
        <p className="text-sm text-slate-400 mt-1 italic">
          "Evaluasi sesi mengajar sebelumnya untuk meningkatkan kualitas bimbingan."
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col items-center justify-center py-20 gap-3 text-slate-300">
        <History className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
        <p className="text-sm text-slate-500 font-medium">Belum ada riwayat sesi mengajar.</p>
      </div>
    </div>
  )
}
