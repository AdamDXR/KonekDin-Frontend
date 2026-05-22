import { Calendar, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RIWAYAT = [
  {
    id: 1,
    learnerName: "Siti Aminah",
    avatar: "https://i.pravatar.cc/150?img=47",
    avatarFallback: "SA",
    subject: "Basis Data",
    date: "9 Okt 2026",
    time: "14:10 - 15:00",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 2,
    learnerName: "Ahmad Raja",
    avatar: "https://i.pravatar.cc/150?img=53",
    avatarFallback: "AR",
    subject: "Algoritma & Struktur Data",
    date: "5 Okt 2026",
    time: "10:20 - 11:10",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
  {
    id: 3,
    learnerName: "Dewi Lestari",
    avatar: "https://i.pravatar.cc/150?img=44",
    avatarFallback: "DL",
    subject: "Pemrograman Web",
    date: "2 Okt 2026",
    time: "15:30 - 17:10",
    durasi: "100 Menit",
    pendapatan: "Rp 90.000",
  },
  {
    id: 4,
    learnerName: "Andi Wijaya",
    avatar: "https://i.pravatar.cc/150?img=57",
    avatarFallback: "AW",
    subject: "Algoritma & Struktur Data",
    date: "1 Okt 2026",
    time: "12:30 - 14:10",
    durasi: "50 Menit",
    pendapatan: "Rp 45.000",
  },
];

function RiwayatCard({ item }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-5 hover:shadow-md transition-shadow duration-200">
      {/* Avatar */}
      <Avatar className="h-24 w-24 rounded-2xl flex-shrink-0 border border-slate-100">
        <AvatarImage
          src={item.avatar}
          alt={item.learnerName}
          className="object-cover"
        />
        <AvatarFallback className="rounded-2xl bg-[#0a0f44] text-white text-lg font-semibold">
          {item.avatarFallback}
        </AvatarFallback>
      </Avatar>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-extrabold text-[#0d7c6b] uppercase tracking-widest mb-1">
          {item.subject}
        </p>
        <h3 className="text-xl font-bold text-[#0a0f44] leading-tight">
          {item.learnerName}
        </h3>
        <div className="flex items-center gap-4 mt-2 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {item.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {item.time}
          </span>
        </div>
      </div>

      {/* Durasi */}
      <div className="text-center flex-shrink-0 hidden sm:block">
        <p className="text-xs text-slate-400 font-medium mb-1">Durasi</p>
        <p className="text-base font-extrabold text-[#0d7c6b]">{item.durasi}</p>
      </div>

      {/* Pendapatan */}
      <div className="text-center flex-shrink-0 hidden sm:block">
        <p className="text-xs text-slate-400 font-medium mb-1">Pendapatan</p>
        <p className="text-base font-extrabold text-[#0a0f44]">
          {item.pendapatan}
        </p>
      </div>

      {/* Tombol */}
      <Link to="/tutor/ulasan" className="flex-shrink-0">
        <Button className="bg-[#0d7c6b] hover:bg-[#0a6558] text-white font-bold px-5 py-2.5 h-auto rounded-xl text-sm transition-colors duration-150">
          Lihat Ulasan
        </Button>
      </Link>
    </div>
  );
}

export default function RiwayatMengajar() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
          Riwayat Sesi Belajar
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Lihat kembali perjalanan belajar Anda dan atur sesi lanjutan dengan
          tutor favorit Anda.
        </p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {RIWAYAT.map((item) => (
          <RiwayatCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
