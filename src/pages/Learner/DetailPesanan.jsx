import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BookingCard from '@/components/shared/BookingCard'
import StatusBadge from '@/components/shared/StatusBadge'

export default function DetailPesanan() {
  const navigate = useNavigate()

  // Status state for the active order (Irkham Wildan)
  const [irkhamStatus, setIrkhamStatus] = useState('unpaid')

  const handleBayarSekarang = () => {
    navigate('/learner/pembayaran', { state: { returnTo: '/learner/detail-pesanan' } })
    window.scrollTo(0, 0)
  }

  return (
    <div className="flex flex-col min-h-full">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Detail Pesanan</h1>
        <p className="text-slate-500">Lihat detail pesanan dan selesaikan pembayaran.</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 pb-10">

        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Card 1: Irkham Wildan (Dynamic Status) */}
          <BookingCard
            image="https://i.pravatar.cc/150?img=11"
            rating={4.9}
            title="Irkham Wildan"
            subtitle="Algoritma"
            date="Kamis, 14 Okt 2026"
            time="12:30 - 14:10 WIB"
            statusNode={
              irkhamStatus === 'unpaid' ? (
                <StatusBadge status="unpaid" />
              ) : (
                <StatusBadge status="lunas" />
              )
            }
            actionNode={
              irkhamStatus === 'unpaid' ? (
                <Button
                  onClick={handleBayarSekarang}
                  className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-4 h-8 font-bold shadow-sm shadow-emerald-500/20"
                >
                  Bayar Sekarang
                </Button>
              ) : (
                <Button
                  onClick={() => navigate('/learner/jadwal-belajar')}
                  className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-[#000666] rounded-xl px-4 h-8 font-bold"
                >
                  Lihat Jadwal
                </Button>
              )
            }
          />

          {/* Card 2: Tiara Puspita (Paid) */}
          <BookingCard
            image="https://i.pravatar.cc/150?img=5"
            rating={4.8}
            title="Tiara Puspita"
            subtitle="Akuntansi"
            date="Sabtu, 8 Okt 2026"
            time="09:30 - 10:20 WIB"
            statusNode={<StatusBadge status="lunas" />}
            actionNode={
              <Button
                onClick={() => navigate('/learner/jadwal-belajar')}
                className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-[#000666] rounded-xl px-3 h-8 font-bold"
              >
                Lihat Jadwal
              </Button>
            }
          />

          {/* Card 3: Kevin Sanjaya (Paid) */}
          <BookingCard
            image="https://i.pravatar.cc/150?img=12"
            rating={4.8}
            title="Kevin Sanjaya"
            subtitle="Kalkulus"
            date="Senin, 1 Okt 2026"
            time="15:30 - 16:20 WIB"
            statusNode={<StatusBadge status="lunas" />}
            actionNode={
              <Button
                onClick={() => navigate('/learner/jadwal-belajar')}
                className="w-full md:w-auto bg-slate-100 hover:bg-slate-200 text-[#000666] rounded-xl px-4 h-8 font-bold"
              >
                Lihat Jadwal
              </Button>
            }
          />

        </div>
      </div>
    </div>
  )
}
