import { useState, useMemo } from "react";
import { CheckCircle2, Lightbulb, X, Plus } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// ─── Shared Logo ──────────────────────────────────────────────────────────────
function KonekDinLogo() {
  return (
    <div className="flex items-center">
      <img src="/images/logo_konekdin.png" alt="KonekDin" className="h-8 w-auto object-contain" />
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Unggah Dokumen", status: "done" },
  { label: "Pilih Mata Kuliah", status: "active" },
  { label: "Input Keahlian", status: "inactive" },
];

function Stepper() {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, idx) => (
        <div key={idx} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
              ${step.status === "done" ? "bg-[#0d7c6b] border-[#0d7c6b] text-white" : ""}
              ${step.status === "active" ? "bg-white border-[#0F1D8C] text-[#0F1D8C] shadow-md shadow-blue-100" : ""}
              ${step.status === "inactive" ? "bg-white border-slate-200 text-slate-400" : ""}
            `}>
              {step.status === "done" ? <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} /> : <span>{idx + 1}</span>}
            </div>
            <p className={`text-[10px] font-bold mt-2 uppercase tracking-wide whitespace-nowrap
              ${step.status === "active" ? "text-[#0F1D8C]" : "text-slate-400"}`}
            >
              STEP {idx + 1}
            </p>
            <span className={`text-xs font-semibold whitespace-nowrap
              ${step.status === "active" ? "text-[#0F1D8C]" : "text-slate-400"}`}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className={`w-28 h-0.5 mx-3 mb-7 rounded-full ${step.status === "done" ? "bg-[#0d7c6b]" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const MATKUL_PER_SEMESTER = {
  1: ["Bahasa Indonesia", "Dasar Dasar Komputasi", "Dasar Pemrograman", "Fisika", "Kalkulus", "Keterampilan Interpersonal", "Pendidikan Agama", "Pengantar Teknologi Informasi"],
  2: ["Algoritma dan Struktur Data", "Dasar Kewirausahaan", "Interaksi Manusia dan Komputer", "Matematika Diskrit", "Matriks dan Ruang Vektor", "Organisasi dan Arsitektur Komputer", "Pendidikan Pancasila"],
  3: ["Basis Data", "Logika Informatika", "Pemrograman Berbasis Web", "Pendidikan Kewarganegaraan", "Probabilitas dan Statistik", "Rekayasa Perangkat Lunak", "Sistem Operasi"],
  4: ["Jaringan Komputer", "Otomata dan Teori Bahasa", "Pembelajaran Mesin (Machine Learning)", "Pemrograman Berorientasi Objek", "Pemrograman Web Lanjut", "Rangkaian Logika Digital", "Sistem Basis Data"],
  5: ["Kecerdasan Buatan (Artificial Intelligence)", "Kriptografi", "Manajemen Proyek Teknologi Informasi", "Penambangan Data (Data Mining)", "Sistem Informasi", "Sistem Terdistribusi", "Technopreneurship"],
  6: ["Analisis dan Perancangan Berorientasi Objek", "Bahasa Inggris", "Keamanan Sistem dan Siber", "Komputasi Awan (Cloud Computing)", "Komputasi Numerik", "Komputer Grafik", "Literasi Informasi", "Pemrograman Perangkat Bergerak (Mobile)", "Pengembangan Startup Digital", "Pengolahan Citra Digital", "Rekayasa Kebutuhan Perangkat Lunak", "Sistem Temu Kembali Informasi", "Sistem Tertanam (Embedded System)"],
  7: ["Analisis Data", "Bengkel Koding", "Forensik Digital", "Internet of Things (IoT)", "Jaminan Kualitas Perangkat Lunak", "Komputasi Kuantum", "Lingkungan Cerdas dan Intelijen", "Manajemen Jaringan", "Pemrograman Sisi Klien", "Pemrograman Sisi Server", "Pemrograman/Pengembangan Game", "Pemrosesan Bahasa Alami Berbasis Teks/Ucapan (NLP)", "Penglihatan Komputer dan Analisis Citra"]
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterTutorMataKuliah() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");

  const maxSemester = location.state?.semester || 14;

  const ALL_MATKUL = useMemo(() => {
    let availableCourses = [];
    // Tutor hanya bisa mengajar mata kuliah maksimal 1 semester di bawah semester saat ini
    for (let i = 1; i <= Math.min(maxSemester - 1, 7); i++) {
      if (MATKUL_PER_SEMESTER[i]) {
        availableCourses = [...availableCourses, ...MATKUL_PER_SEMESTER[i]];
      }
    }
    return availableCourses.sort();
  }, [maxSemester]);

  const toggle = (mk) => {
    setSelected((prev) =>
      prev.includes(mk) ? prev.filter((x) => x !== mk) : [...prev, mk]
    );
  };

  const available = ALL_MATKUL.filter(
    (mk) =>
      !selected.includes(mk) &&
      mk.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f1f3f8] font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <KonekDinLogo />
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
          <Stepper />

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0F1D8C] tracking-tight mb-2">Mata Kuliah yang Ingin Diajarkan</h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Tentukan mata kuliah sesuai keahlian Anda untuk mulai membuka sesi belajar bersama mahasiswa.
            </p>
          </div>

          {/* Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#0F1D8C]">Pilih Mata Kuliah</p>

            {/* Search / Selected input box */}
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap gap-2 min-h-[52px] items-center">
              {selected.map((mk) => (
                <span key={mk} className="inline-flex items-center gap-1.5 bg-[#0F1D8C] text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {mk}
                  <button onClick={() => toggle(mk)} className="hover:text-slate-300 transition-colors">
                    <X className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={selected.length === 0 ? "Pilih mata kuliah dibawah ini ..." : ""}
                className="flex-1 min-w-[140px] text-sm text-slate-500 placeholder-slate-400 outline-none bg-transparent"
              />
            </div>

            {/* Available chips */}
            <div className="flex flex-wrap gap-2">
              {available.map((mk) => (
                <button
                  key={mk}
                  onClick={() => toggle(mk)}
                  className="inline-flex items-center gap-1.5 bg-[#e0faf3] text-[#0d7c6b] border border-[#b3e8d8] text-xs font-semibold px-3.5 py-2 rounded-full hover:bg-[#0d7c6b] hover:text-white hover:border-[#0d7c6b] transition-all duration-150"
                >
                  {mk}
                  <Plus className="w-3 h-3" strokeWidth={2.5} />
                </button>
              ))}
              {available.length === 0 && search && (
                <p className="text-xs text-slate-400">Tidak ada hasil untuk "{search}".</p>
              )}
            </div>

            {/* Tip box */}
            <div className="flex items-start gap-3 bg-[#fff8ec] border border-[#f5d98b] rounded-xl p-4">
              <div className="w-8 h-8 rounded-full bg-[#fff3cc] flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-[#e5a000]" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs font-bold text-[#b07800] mb-0.5">Tips Memilih Mata Kuliah</p>
                <p className="text-xs text-[#956600] leading-relaxed">
                  Tutor yang memilih lebih dari 3 mata kuliah yang relevan memiliki peluang 45% lebih tinggi untuk mendapatkan permintaan bimbingan dalam minggu pertama.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate("/register/tutor/dokumen")}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0d7c6b] hover:text-[#0a5a4e] transition-colors"
            >
              ← Kembali
            </button>
            {selected.length > 0 && (
              <button
                onClick={() => navigate("/register/tutor/keahlian")}
                className="bg-[#0F1D8C] hover:bg-[#0b166e] text-white font-bold px-8 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-150"
              >
                Langkah Selanjutnya
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
