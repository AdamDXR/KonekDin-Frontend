import { useState, useRef } from "react";
import { CheckCircle2, ShieldCheck, FileText, Pencil, Upload } from "lucide-react";

// ─── Logo ─────────────────────────────────────────────────────────────────────
function KonekDinLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="36" height="36" rx="8" fill="#0F1D8C" fillOpacity="0.08" />
        <path d="M8 18C8 12.477 12.477 8 18 8s10 4.477 10 10-4.477 10-10 10S8 23.523 8 18Z" fill="#0F1D8C" fillOpacity="0.15" />
        <path d="M13 13l5 5-5 5M18 13h5v5" stroke="#0F1D8C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 18l5 5" stroke="#0d7c6b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-xl font-extrabold tracking-tight">
        <span className="text-[#0F1D8C]">Konek</span>
        <span className="text-[#0d7c6b]">Din</span>
      </span>
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Registrasi Akun", status: "done" },
  { label: "Unggah Dokumen", status: "active" },
  { label: "Verifikasi", status: "inactive" },
];

function Stepper() {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, idx) => (
        <div key={idx} className="flex items-center">
          {/* Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all
                ${step.status === "done" ? "bg-[#0d7c6b] border-[#0d7c6b] text-white" : ""}
                ${step.status === "active" ? "bg-white border-[#0F1D8C] text-[#0F1D8C] shadow-md shadow-blue-100" : ""}
                ${step.status === "inactive" ? "bg-white border-slate-200 text-slate-400" : ""}
              `}
            >
              {step.status === "done" ? (
                <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
              ) : (
                <span>{idx + 1}</span>
              )}
            </div>
            <span
              className={`text-xs font-semibold mt-2 whitespace-nowrap
                ${step.status === "active" ? "text-[#0F1D8C]" : "text-slate-400"}
              `}
            >
              {step.label}
            </span>
          </div>
          {/* Connector */}
          {idx < STEPS.length - 1 && (
            <div
              className={`w-28 h-0.5 mx-3 mb-5 rounded-full
                ${step.status === "done" ? "bg-[#0d7c6b]" : "bg-slate-200"}
              `}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────
function UploadZone({ onFile }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200
        ${dragging ? "border-[#0F1D8C] bg-blue-50" : "border-slate-200 bg-slate-50 hover:border-[#0F1D8C] hover:bg-blue-50/40"}
      `}
    >
      <div className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center">
        <Upload className="w-5 h-5 text-[#0F1D8C]" strokeWidth={1.8} />
      </div>
      <p className="text-sm font-semibold text-slate-600">Klik untuk unggah atau seret file ke sini</p>
      <p className="text-xs text-slate-400">Format PDF (Maks. 5MB)</p>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => { if (e.target.files[0]) onFile(e.target.files[0]); }}
      />
    </div>
  );
}

// ─── Uploaded File Card ───────────────────────────────────────────────────────
function UploadedCard({ fileName, onRemove }) {
  return (
    <div className="flex items-center gap-4 bg-[#f0fdf8] border border-[#0d7c6b] rounded-xl px-5 py-4">
      {/* Check icon */}
      <div className="w-9 h-9 rounded-full bg-[#0d7c6b] flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      {/* File info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#0a0f44] truncate">{fileName}</p>
        <p className="text-[10px] font-extrabold text-[#0d7c6b] tracking-widest uppercase mt-0.5">Berhasil Diunggah</p>
      </div>
      {/* Ubah button */}
      <button
        onClick={onRemove}
        className="flex items-center gap-1.5 text-sm font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors flex-shrink-0"
      >
        <Pencil className="w-3.5 h-3.5" />
        Ubah
      </button>
    </div>
  );
}

// ─── Document Section ─────────────────────────────────────────────────────────
function DocSection({ title, description, badge, accept, maxLabel, initialFile }) {
  const [file, setFile] = useState(initialFile || null);

  const badgeStyle =
    badge === "WAJIB"
      ? "bg-red-50 text-red-500 border border-red-200"
      : "bg-slate-100 text-slate-400 border border-slate-200";

  return (
    <div className="flex flex-col gap-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#0F1D8C]">{title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{description}</p>
        </div>
        <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase flex-shrink-0 mt-0.5 ${badgeStyle}`}>
          {badge}
        </span>
      </div>

      {/* Upload area or uploaded card */}
      {file ? (
        <UploadedCard fileName={file.name || file} onRemove={() => setFile(null)} />
      ) : (
        <UploadZone onFile={setFile} />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterTutorDokumen() {
  return (
    <div className="min-h-screen bg-[#f1f3f8] font-sans">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <KonekDinLogo />
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
          {/* Stepper */}
          <Stepper />

          {/* Title */}
          <div className="text-center mb-7">
            <h1 className="text-3xl font-extrabold text-[#0F1D8C] tracking-tight mb-2">Unggah Dokumen</h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
              Verifikasi kualifikasi Anda dengan mengunggah dokumen yang dibutuhkan untuk proses seleksi tutor.
            </p>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 bg-[#f0fdf8] border border-[#b3e8d8] rounded-xl p-4 mb-8">
            <ShieldCheck className="w-4 h-4 text-[#0d7c6b] flex-shrink-0 mt-0.5" strokeWidth={2} />
            <div>
              <p className="text-xs font-bold text-[#0d7c6b] mb-0.5">Privasi Terjamin</p>
              <p className="text-xs text-[#3d8c75] leading-relaxed">
                Dokumen Anda hanya akan digunakan untuk keperluan verifikasi oleh tim internal KonekDin dan tidak akan dipublikasikan ke publik. Pastikan dokumen dalam format <strong>PDF</strong> dan terlihat jelas serta valid.
              </p>
            </div>
          </div>

          {/* Upload Sections */}
          <div className="flex flex-col gap-7">
            <DocSection
              title="Transkrip Nilai"
              description="Kumpulkan dokumen akademik resmi."
              badge="WAJIB"
              initialFile={{ name: "TRANSKRIP_NILAI_MAHASISWA.pdf" }}
            />
            <div className="h-px bg-slate-100" />
            <DocSection
              title="Portofolio"
              description="Kumpulan karya atau proyek relevan. Dapat mengunggah lebih dari satu file."
              badge="WAJIB"
              initialFile={{ name: "PORTFOLIO_AISKA.pdf" }}
            />
            <div className="h-px bg-slate-100" />
            <DocSection
              title="Sertifikat"
              description="Kumpulkan sertifikasi profesional atau pelatihan. Dapat mengunggah lebih dari satu file."
              badge="OPSIONAL"
              initialFile={{ name: "Sertifikat_Data_Science.pdf" }}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-[#0d7c6b] hover:text-[#0a5a4e] transition-colors">
              <span>←</span>
              Kembali ke Informasi Awal
            </button>
            <button className="bg-[#0F1D8C] hover:bg-[#0b166e] text-white font-bold px-8 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-150">
              Lanjutkan Verifikasi
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
