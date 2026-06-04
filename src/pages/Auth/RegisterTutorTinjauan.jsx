import { useState } from "react";
import { CheckCircle2, FileText, GraduationCap, Zap, Pencil, CheckSquare, Square, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

function KonekDinLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect width="36" height="36" rx="8" fill="#0F1D8C" fillOpacity="0.08" />
        <path d="M8 18C8 12.477 12.477 8 18 8s10 4.477 10 10-4.477 10-10 10S8 23.523 8 18Z" fill="#0F1D8C" fillOpacity="0.15" />
        <path d="M13 13l5 5-5 5M18 13h5v5" stroke="#0F1D8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 18l5 5" stroke="#0d7c6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight">
        <span className="text-[#0F1D8C]">Konek</span><span className="text-[#0d7c6b]">Din</span>
      </span>
    </div>
  );
}

const STEPS = [
  { label: "Unggah Dokumen", status: "done" },
  { label: "Mata Kuliah", status: "done" },
  { label: "Keahlian", status: "done" },
];

function Stepper() {
  return (
    <div className="flex items-center justify-center mb-10">
      {STEPS.map((step, idx) => (
        <div key={idx} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0d7c6b] border-2 border-[#0d7c6b]">
              <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <p className="text-[10px] font-bold mt-2 uppercase tracking-wide whitespace-nowrap text-slate-400">
              STEP {idx + 1}
            </p>
            <span className="text-xs font-semibold whitespace-nowrap text-slate-400">{step.label}</span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className="w-28 h-0.5 mx-3 mb-7 rounded-full bg-[#0d7c6b]" />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Data mock ───────────────────────────────────────────────────────────────
const DOCS = [
  { name: "Transkrip_Nilai.pdf", label: "Transkrip Nilai", uploaded: true },
  { name: "Portofolio_Aiska.pdf", label: "Portofolio", uploaded: true },
  { name: "Sertifikat_Data_Science.pdf", label: "Sertifikat", uploaded: true },
];

const MATKUL = ["Algoritma & Pemrograman", "Basis Data", "Pemrograman Web", "Kecerdasan Buatan"];
const KEAHLIAN = ["Java", "Python", "SQL", "Machine Learning", "Web Development", "Data Analysis"];

// ─── Document File Row ────────────────────────────────────────────────────────
function DocRow({ doc }) {
  return (
    <div className={`flex items-center gap-4 border rounded-xl px-5 py-4 transition-all
      ${doc.uploaded ? "bg-[#f0fdf8] border-[#0d7c6b]" : "bg-slate-50 border-dashed border-slate-200"}`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
        ${doc.uploaded ? "bg-[#0d7c6b]" : "bg-slate-200"}`}
      >
        {doc.uploaded
          ? <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
          : <FileText className="w-4 h-4 text-slate-400" strokeWidth={1.8} />}
      </div>
      <div className="flex-1 min-w-0">
        {doc.uploaded ? (
          <>
            <p className="text-sm font-bold text-[#0a0f44] truncate">{doc.name}</p>
            <p className="text-[10px] font-extrabold text-[#0d7c6b] tracking-widest uppercase mt-0.5">Berhasil Diunggah</p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-slate-400">{doc.label} (Opsional)</p>
            <p className="text-xs text-slate-300">Belum ada file terpilih</p>
          </>
        )}
      </div>
      {doc.uploaded && (
        <button className="flex items-center gap-1.5 text-sm font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors flex-shrink-0">
          <Pencil className="w-3.5 h-3.5" /> Ubah
        </button>
      )}
    </div>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────
function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center">
        <div className="w-16 h-16 rounded-full bg-[#e0faf3] flex items-center justify-center mx-auto mb-5">
          <Send className="w-8 h-8 text-[#0d7c6b]" strokeWidth={1.8} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0F1D8C] mb-2">Pendaftaran Terkirim!</h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          Data Anda telah berhasil dikirim ke tim admin KonekDin untuk proses verifikasi. Kami akan menghubungi Anda dalam 1–3 hari kerja.
        </p>
        <div className="flex items-center justify-center gap-2 bg-[#f0fdf8] border border-[#b3e8d8] rounded-xl px-4 py-3 mb-6">
          <CheckCircle2 className="w-4 h-4 text-[#0d7c6b]" strokeWidth={2.5} />
          <p className="text-xs font-semibold text-[#0d7c6b]">Status: Menunggu Verifikasi Admin</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-[#0F1D8C] hover:bg-[#0b166e] text-white font-bold py-3 rounded-full text-sm transition-all shadow-md"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterTutorTinjauan() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const handleSubmit = () => {
    if (!agreed) { setErr("Anda harus menyetujui pernyataan di atas untuk melanjutkan."); return; }
    setErr("");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f1f3f8] font-sans">
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <KonekDinLogo />
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
          <Stepper />

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0F1D8C] tracking-tight mb-2">Tinjauan Akhir</h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Pastikan semua data di bawah ini sudah akurat sebelum Anda mengirim pendaftaran tutor.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            {/* Dokumen Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#0d7c6b]" strokeWidth={1.8} />
                <h3 className="text-base font-bold text-[#0F1D8C]">Dokumen Pendukung</h3>
              </div>
              <div className="flex flex-col gap-3">
                {DOCS.map((doc) => <DocRow key={doc.name} doc={doc} />)}
              </div>
            </div>

            {/* Mata Kuliah Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#0d7c6b]" strokeWidth={1.8} />
                  <h3 className="text-base font-bold text-[#0F1D8C]">Mata Kuliah</h3>
                </div>
                <button
                  onClick={() => navigate("/register/tutor/mata-kuliah")}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Ubah
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {MATKUL.map((mk) => (
                  <span key={mk} className="inline-flex items-center bg-[#0d7c6b] text-white text-xs font-semibold px-3.5 py-2 rounded-full">
                    {mk}
                  </span>
                ))}
              </div>
            </div>

            {/* Keahlian Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#0d7c6b]" strokeWidth={1.8} />
                  <h3 className="text-base font-bold text-[#0F1D8C]">Keahlian</h3>
                </div>
                <button
                  onClick={() => navigate("/register/tutor/keahlian")}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Ubah
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {KEAHLIAN.map((k) => (
                  <span key={k} className="inline-flex items-center bg-[#0d7c6b] text-white text-xs font-semibold px-3.5 py-2 rounded-full">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            {/* Agreement */}
            <button
              onClick={() => { setAgreed(!agreed); setErr(""); }}
              className="flex items-start gap-3 text-left w-full group"
            >
              <div className={`w-5 h-5 rounded flex-shrink-0 mt-0.5 flex items-center justify-center border-2 transition-all
                ${agreed ? "bg-[#0d7c6b] border-[#0d7c6b]" : "bg-white border-slate-300 group-hover:border-[#0d7c6b]"}`}
              >
                {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Saya menyatakan bahwa seluruh data yang diberikan adalah <strong>benar, lengkap, dan dapat dipertanggungjawabkan.</strong> Saya memahami bahwa data palsu dapat mengakibatkan pembatalan akun tutor.
              </p>
            </button>

            {err && <p className="text-xs text-red-500 font-medium">{err}</p>}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={() => navigate("/register/tutor/keahlian")}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0d7c6b] hover:text-[#0a5a4e] transition-colors"
            >
              ← Kembali
            </button>
            <button
              onClick={handleSubmit}
              className={`font-bold px-8 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-150
                ${agreed ? "bg-[#0F1D8C] hover:bg-[#0b166e] text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
            >
              Ajukan Pendaftaran
            </button>
          </div>
        </div>
      </main>

      {submitted && <SuccessModal onClose={() => navigate("/")} />}
    </div>
  );
}
