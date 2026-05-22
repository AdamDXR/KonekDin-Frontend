import { useState } from "react";
import {
  Pencil,
  CalendarDays,
  History,
  Save,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PRESTASI = [
  { grade: "A", matkul: "PEMROGRAMAN WEB" },
  { grade: "A", matkul: "BASIS DATA" },
  { grade: "AB", matkul: "LOGIKA INFORMATIKA" },
  { grade: "A", matkul: "DASAR KOMPUTASI" },
];

const SERTIFIKASI = [
  {
    id: 1,
    icon: "🎓",
    title: "Certified Mathematics Educator (CME)",
    issuer: "Global Education Board • 2021",
  },
  {
    id: 2,
    icon: "📊",
    title: "Advanced Quantitative Analysis Certification",
    issuer: "Universitas Dian Nuswantoro • 2023",
  },
];

const PORTOFOLIO = [
  {
    id: 1,
    tag: "OPEN SOURCE",
    tagColor: "bg-[#0d7c6b]",
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=220&fit=crop",
    title: "Omni-Micro Framework",
    desc: "Lightweight RPC framework untuk komunikasi antar layanan di lingkungan Kubernetes.",
  },
  {
    id: 2,
    tag: "APP BUILD",
    tagColor: "bg-[#3b82f6]",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=220&fit=crop",
    title: "SecurePay Mobile SDK",
    desc: "SDK pembayaran terenkripsi yang digunakan oleh lebih dari 50 aplikasi e-commerce lokal.",
  },
];

// ─── Modal Edit Tarif ─────────────────────────────────────────────────────────

function EditTarifModal({ tarif, onClose, onSave }) {
  const [nilai, setNilai] = useState(tarif);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="bg-white rounded-3xl shadow-2xl p-8 relative"
        style={{ width: "420px" }}
      >
        <h2 className="text-2xl font-extrabold text-[#0a0f44]">
          Edit Tarif Mengajar
        </h2>
        <p className="text-sm text-slate-400 mt-1 mb-6">
          Sesuaikan tarif per sesi Anda untuk semua sesi bimbingan baru.
        </p>

        <div>
          <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">
            Tarif Per Sesi
          </label>
          <input
            type="text"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
            className="w-full bg-[#f1f3f5] text-[#0a0f44] text-base font-semibold rounded-2xl px-4 py-3.5 outline-none border-none"
          />
        </div>

        <div className="flex items-center justify-end gap-6 mt-8">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Batal
          </button>
          <Button
            onClick={() => {
              onSave(nilai);
              onClose();
            }}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────

export default function ProfilTutor() {
  const [tarif, setTarif] = useState("Rp 45.000");
  const [showModalTarif, setShowModalTarif] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profil, setProfil] = useState({
    nama: "Irkham Wildan",
    nim: "A11.2024.12345",
    jurusan: "Teknik Informatika",
    fakultas: "Ilmu Komputer",
    email: "irkham@mhs.dinus.ac.id",
    telepon: "+62 812 3456 7890",
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {/* ── Header Profil ── */}
      <div className="flex items-start gap-6">
        <div className="relative flex-shrink-0">
          <img
            src="https://i.pravatar.cc/150?img=11"
            alt="Irkham Wildan"
            className="h-28 w-28 rounded-2xl object-cover border border-slate-100"
          />
          <button className="absolute bottom-2 right-2 bg-[#0d7c6b] text-white p-1.5 rounded-lg">
            <Pencil className="h-3 w-3" />
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-[11px] font-extrabold text-amber-500">
              Verified Tutor
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#0a0f44]">{profil.nama}</h1>
          <div className="flex items-center gap-2 mt-1 text-slate-400 text-sm">
            <span>🏛</span>
            <span>Universitas Dian Nuswantoro</span>
          </div>

          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <Link to="/tutor/jadwal-mengajar">
              <Button className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-5 py-2.5 h-auto rounded-xl text-sm flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Lihat Jadwal Mengajar
              </Button>
            </Link>
            <Link to="/tutor/riwayat-mengajar">
              <Button
                variant="outline"
                className="border border-slate-200 text-[#0a0f44] font-bold px-5 py-2.5 h-auto rounded-xl text-sm flex items-center gap-2 hover:bg-slate-50"
              >
                <History className="h-4 w-4" />
                Lihat Riwayat Mengajar
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Informasi Pribadi ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold text-[#0d7c6b]">
            Informasi Pribadi
          </h2>
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
            >
              <Save className="h-3.5 w-3.5" />
              Simpan Perubahan
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Profil
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {[
            { label: "NAMA", key: "nama" },
            { label: "NIM", key: "nim" },
            { label: "JURUSAN", key: "jurusan" },
            { label: "FAKULTAS", key: "fakultas" },
            { label: "EMAIL", key: "email" },
            { label: "NOMOR TELEPON", key: "telepon" },
          ].map(({ label, key }) => (
            <div key={key}>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                {label}
              </p>
              {isEditing ? (
                <input
                  type="text"
                  value={profil[key]}
                  onChange={(e) =>
                    setProfil({ ...profil, [key]: e.target.value })
                  }
                  className="w-full bg-white border border-[#0d7c6b] rounded-xl px-4 py-3 text-sm text-[#0a0f44] font-medium outline-none focus:ring-2 focus:ring-[#0d7c6b]/20"
                />
              ) : (
                <div className="bg-[#f1f3f5] rounded-xl px-4 py-3 text-sm text-[#0a0f44] font-medium">
                  {profil[key]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Tarif Mengajar ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5 text-[#0d7c6b]" />
          <h2 className="text-lg font-extrabold text-[#0d7c6b]">
            Tarif Mengajar
          </h2>
        </div>
        <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
          Per Sesi
        </p>
        <p className="text-3xl font-black text-[#0d7c6b] mb-4">{tarif}</p>
        <button
          onClick={() => setShowModalTarif(true)}
          className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-3 rounded-2xl text-sm transition-colors duration-150"
        >
          Perbarui Tarif
        </button>
      </div>

      {/* ── Prestasi Akademik ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h2 className="text-lg font-extrabold text-[#0d7c6b] mb-5">
          Prestasi Akademik
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PRESTASI.map(({ grade, matkul }) => (
            <div
              key={matkul}
              className="flex flex-col items-center justify-center border border-slate-100 rounded-2xl py-5 gap-1"
            >
              <span className="text-3xl font-black text-[#0d7c6b]">
                {grade}
              </span>
              <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider text-center">
                {matkul}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sertifikasi ── */}
      <div className="bg-[#0a0f44] rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <ShieldCheck className="h-5 w-5 text-[#0d7c6b]" />
          <h2 className="text-lg font-extrabold text-white">Sertifikasi</h2>
        </div>
        <div className="flex flex-col gap-3">
          {SERTIFIKASI.map((s) => (
            <div
              key={s.id}
              className="flex items-center gap-4 bg-white/10 rounded-2xl px-4 py-4"
            >
              <div className="bg-white/10 p-3 rounded-xl text-lg flex-shrink-0">
                {s.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-tight">
                  {s.title}
                </p>
                <p className="text-[11px] text-white/50 mt-0.5">{s.issuer}</p>
              </div>
              <button className="flex items-center gap-1 text-[#0d7c6b] text-xs font-bold flex-shrink-0 hover:underline">
                Lihat <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Portofolio & Kontribusi ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-[#0d7c6b]">
            Portofolio & Kontribusi
          </h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full border border-slate-200 hover:border-[#0d7c6b] text-slate-400 hover:text-[#0d7c6b] transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-2 rounded-full border border-slate-200 hover:border-[#0d7c6b] text-slate-400 hover:text-[#0d7c6b] transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PORTOFOLIO.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-44 object-cover"
                />
                <span
                  className={`absolute top-3 left-3 ${p.tagColor} text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full tracking-wider`}
                >
                  {p.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-extrabold text-[#0a0f44]">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Edit Tarif */}
      {showModalTarif && (
        <EditTarifModal
          tarif={tarif}
          onClose={() => setShowModalTarif(false)}
          onSave={(val) => setTarif(val)}
        />
      )}
    </div>
  );
}