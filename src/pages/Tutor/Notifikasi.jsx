import { Calendar, CheckCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NOTIFIKASI = {
  hariIni: [
    {
      id: 1,
      title: "Pengingat Sesi Besok",
      message: (
        <>
          Persiapkan diri Anda untuk sesi{" "}
          <strong>Algoritma & Struktur Data</strong> bersama{" "}
          <strong>Budi Santoso</strong> pada pukul <strong>12.30</strong>.
          Siapkan materi yang ingin diajarkan besok.
        </>
      ),
      time: "BARU",
      isNew: true,
      accentColor: "#f97316",
      icon: <Calendar className="h-5 w-5 text-white" />,
      iconBg: "bg-[#fb923c]",
      action: null,
    },
    {
      id: 2,
      title: "Pembayaran Berhasil!",
      message: (
        <>
          Sesi Algoritma dengan <strong>Budi Santoso</strong> telah
          dikonfirmasi. Pastikan Anda sudah menyiapkan materi yang ingin
          didiskusikan.
        </>
      ),
      time: "5 menit yang lalu",
      isNew: false,
      accentColor: "#0d7c6b",
      icon: <CheckCircle className="h-5 w-5 text-white" />,
      iconBg: "bg-[#0d7c6b]",
      action: (
        <Link to="/tutor/jadwal-mengajar">
          <Button className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-5 py-2.5 h-auto rounded-xl text-sm gap-2 flex items-center transition-colors duration-150 mt-3">
            Lihat Jadwal Mengajar
            <span>→</span>
          </Button>
        </Link>
      ),
    },
  ],
  kemarin: [
    {
      id: 3,
      title: "Sesi Mulai dalam 30 Menit!",
      message:
        "Sesi belajarmu akan dimulai dalam 30 menit. Yuk siapkan dirimu dari sekarang, cek kembali materi yang ingin kamu ajarkan ke pelajar nanti.",
      time: "1 hari yang lalu",
      isNew: false,
      accentColor: "#0a0f44",
      icon: <Clock className="h-5 w-5 text-white" />,
      iconBg: "bg-[#0a0f44]",
      action: null,
    },
  ],
};

// ─── Komponen Kartu Notifikasi ─────────────────────────────────────────────────

function NotifCard({ item }) {
  return (
    <div className="flex items-start gap-5 py-6 border-b border-slate-100 last:border-0">
      {/* Konten */}
      <div
        className="flex-1 pl-4 border-l-4"
        style={{ borderColor: item.accentColor }}
      >
        <div className="flex items-center justify-between gap-4">
          <h3
            className="text-base font-extrabold"
            style={{ color: item.accentColor }}
          >
            {item.title}
          </h3>
          <span
            className={`text-[10px] font-extrabold flex-shrink-0 ${
              item.isNew ? "text-[#f97316]" : "text-slate-400"
            }`}
          >
            {item.time}
          </span>
        </div>

        <p className="text-sm text-slate-500 leading-relaxed mt-1">
          {item.message}
        </p>

        {item.action && item.action}
      </div>

      {/* Ikon */}
      <div className={`${item.iconBg} p-3 rounded-full flex-shrink-0`}>
        {item.icon}
      </div>
    </div>
  );
}

// ─── Halaman Utama ─────────────────────────────────────────────────────────────

export default function NotifikasiTutor() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
          Notifikasi
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Update terbaru untuk perjalanan akademik anda.
        </p>
      </div>

      {/* Hari Ini */}
      <div className="mb-2">
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
          Hari Ini
        </p>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6">
          {NOTIFIKASI.hariIni.map((item) => (
            <NotifCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Kemarin */}
      <div className="mt-6">
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
          Kemarin
        </p>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-6">
          {NOTIFIKASI.kemarin.map((item) => (
            <NotifCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
