import { useState, useRef } from "react";
import { CheckCircle2, ShieldCheck, FileText, Pencil, Upload, Info } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '@/lib/axios';

// ─── Logo ─────────────────────────────────────────────────────────────────────
function KonekDinLogo() {
  return (
    <div className="flex items-center">
      <img src="/images/logo_konekdin.png" alt="KonekDin" className="h-8 w-auto object-contain" />
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
const STEPS = [
  { label: "Unggah Dokumen", status: "active" },
  { label: "Pilih Mata Kuliah", status: "inactive" },
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

// ─── Upload Zone ──────────────────────────────────────────────────────────────
function UploadZone({ onFile, accept = ".pdf", formatText = "Format PDF (Maks. 5MB)", onError }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const validateFile = (f) => {
    if (!f) return;
    
    if (onError) onError("");

    if (accept.includes(".pdf") && f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      if (onError) onError("File harus berformat PDF.");
      return;
    }
    
    if (accept.includes(".jpg") && !f.type.startsWith("image/")) {
      if (onError) onError("File harus berformat gambar (JPG/PNG).");
      return;
    }
    
    if (f.size > 5 * 1024 * 1024) {
      if (onError) onError("Ukuran file melebihi 5MB.");
      return;
    }
    
    onFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    validateFile(e.dataTransfer.files[0]);
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
      <p className="text-xs text-slate-400">{formatText}</p>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => validateFile(e.target.files[0])}
      />
    </div>
  );
}

// ─── Uploaded File Card ───────────────────────────────────────────────────────
function UploadedCard({ fileName, onFile, accept, formatText, onError }) {
  const inputRef = useRef(null);

  const validateFile = (f) => {
    if (!f) return;
    
    if (onError) onError("");

    if (accept.includes(".pdf") && f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) {
      if (onError) onError("File harus berformat PDF.");
      return;
    }
    
    if (accept.includes(".jpg") && !f.type.startsWith("image/")) {
      if (onError) onError("File harus berformat gambar (JPG/PNG).");
      return;
    }
    
    if (f.size > 5 * 1024 * 1024) {
      if (onError) onError("Ukuran file melebihi 5MB.");
      return;
    }
    
    onFile(f);
  };

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
        onClick={() => inputRef.current.click()}
        className="flex items-center gap-1.5 text-sm font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors flex-shrink-0"
      >
        <Pencil className="w-3.5 h-3.5" />
        Ubah
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => validateFile(e.target.files[0])}
      />
    </div>
  );
}

// ─── Document Section ─────────────────────────────────────────────────────────
function DocSection({ title, description, badge, accept, formatText, file, setFile, error, onError }) {
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
        <UploadedCard 
          fileName={file.name || file.fileName || file} 
          onFile={setFile}
          accept={accept}
          formatText={formatText}
          onError={onError}
        />
      ) : (
        <UploadZone onFile={setFile} accept={accept} formatText={formatText} onError={onError} />
      )}
      {error && (
        <p className="text-xs text-red-500 font-semibold mt-1">{error}</p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RegisterTutorDokumen() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [semester, setSemester] = useState(location.state?.semester?.toString() || "");
  const [semesterError, setSemesterError] = useState("");

  const [transkripFiles, setTranskripFiles] = useState(location.state?.transkripFiles || []);
  const [transkripErrors, setTranskripErrors] = useState([]);

  const [portofolio, setPortofolio] = useState(location.state?.portofolio || "");

  const [sertifikatFile, setSertifikatFile] = useState(location.state?.sertifikatFile || null);
  const [sertifikatError, setSertifikatError] = useState("");

  const parsedSemester = parseInt(semester, 10);
  const isValidSemesterValue = !isNaN(parsedSemester) && parsedSemester >= 3 && parsedSemester <= 14;
  const numTranscripts = isValidSemesterValue ? parsedSemester - 1 : 1;

  const isTranskripValid = Array.from({ length: numTranscripts }).every(
    (_, i) => transkripFiles[i] !== null && transkripFiles[i] !== undefined && !transkripErrors[i]
  );
  const isPortofolioValid = portofolio.trim() !== "";
  const isSemesterValid = semester.trim() !== "" && semesterError === "";
  const isSertifikatValid = sertifikatError === "";

  const isFormValid = isTranskripValid && isPortofolioValid && isSemesterValid && isSertifikatValid;

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
                Dokumen Anda hanya akan digunakan untuk keperluan verifikasi oleh tim internal KonekDin dan tidak akan dipublikasikan ke publik. Pastikan file dan tautan yang diunggah terlihat jelas serta valid.
              </p>
            </div>
          </div>

          {/* Form & Upload Sections */}
          <div className="flex flex-col gap-7">
            {/* Semester Input */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#0F1D8C]">Semester Saat Ini</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Pilih semester Anda saat ini.</p>
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase flex-shrink-0 mt-0.5 bg-red-50 text-red-500 border border-red-200">
                  WAJIB
                </span>
              </div>
              
              {/* Syarat Semester Info */}
              <div className="flex items-start gap-2.5 bg-[#eef2ff] border border-[#c7d2fe] p-3 rounded-xl mb-1">
                <Info className="w-4 h-4 text-[#4f46e5] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#4338ca] leading-relaxed">
                  Syarat minimal mendaftar menjadi tutor adalah <strong>Semester 3</strong>.
                </p>
              </div>

              <input 
                type="text"
                value={semester}
                onChange={(e) => {
                  const val = e.target.value;
                  setSemester(val);
                  
                  if (val === "") {
                    setSemesterError("");
                  } else if (/[^0-9]/.test(val)) {
                    setSemesterError("Harus berupa angka.");
                  } else {
                    const num = parseInt(val, 10);
                    if (num > 14) {
                      setSemesterError("Maksimal semester 14.");
                    } else if (num < 3) {
                      setSemesterError("Minimal semester 3.");
                    } else {
                      setSemesterError("");
                    }
                  }
                }}
                placeholder="Masukkan semester saat ini (3 - 14)"
                className={`w-full h-12 px-4 rounded-xl border bg-slate-50 text-sm text-slate-700 outline-none focus:bg-white focus:ring-2 transition-all ${
                  semesterError 
                    ? "border-red-400 focus:border-red-500 focus:ring-red-100" 
                    : "border-slate-200 focus:border-[#0F1D8C] focus:ring-blue-100"
                }`}
              />
              {semesterError && (
                <p className="text-xs text-red-500 font-semibold mt-1">{semesterError}</p>
              )}
            </div>

            <div className="h-px bg-slate-100" />

            <div className="flex flex-col gap-8">
              {Array.from({ length: numTranscripts }).map((_, i) => (
                <DocSection
                  key={i}
                  title={isValidSemesterValue ? `Transkrip Nilai Semester ${i + 1}` : "Transkrip Nilai"}
                  description="Kumpulkan dokumen akademik resmi."
                  badge="WAJIB"
                  accept=".pdf"
                  formatText="Format PDF (Maks. 5MB)"
                  file={transkripFiles[i]}
                  setFile={(file) => {
                    const newFiles = [...transkripFiles];
                    newFiles[i] = file;
                    setTranskripFiles(newFiles);
                  }}
                  error={transkripErrors[i]}
                  onError={(err) => {
                    const newErrs = [...transkripErrors];
                    newErrs[i] = err;
                    setTranskripErrors(newErrs);
                  }}
                />
              ))}
            </div>
            <div className="h-px bg-slate-100" />
            
            {/* Portofolio Input Link */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#0F1D8C]">Portofolio</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Kumpulan karya atau proyek relevan (tautan website/github/dsb).</p>
                </div>
                <span className="text-[10px] font-extrabold px-3 py-1 rounded-full tracking-widest uppercase flex-shrink-0 mt-0.5 bg-red-50 text-red-500 border border-red-200">
                  WAJIB
                </span>
              </div>
              <input 
                type="url"
                placeholder="https://contoh-portofolio.com"
                value={portofolio}
                onChange={(e) => setPortofolio(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 outline-none focus:bg-white focus:border-[#0F1D8C] focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
            
            <div className="h-px bg-slate-100" />
            <DocSection
              title="Sertifikat"
              description="Kumpulkan sertifikasi profesional atau pelatihan. Dapat mengunggah file gambar."
              badge="OPSIONAL"
              accept=".jpg,.jpeg,.png"
              formatText="Format JPG/PNG (Maks. 5MB)"
              file={sertifikatFile}
              setFile={setSertifikatFile}
              error={sertifikatError}
              onError={setSertifikatError}
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100">
            <button 
              onClick={() => navigate('/learner/profil')}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0d7c6b] hover:text-[#0a5a4e] transition-colors"
            >
              <span>←</span>
              Kembali ke Informasi Awal
            </button>
            <button 
              onClick={() => navigate('/register/tutor/mata-kuliah', { 
                state: { 
                  semester: parseInt(semester, 10),
                  transkripFiles: transkripFiles.slice(0, numTranscripts),
                  portofolio,
                  sertifikatFile
                } 
              })}
              disabled={!isFormValid}
              className={`text-white font-bold px-8 py-3 rounded-full text-sm shadow-md transition-all duration-150 ${
                isFormValid 
                  ? "bg-[#0F1D8C] hover:bg-[#0b166e] hover:shadow-lg" 
                  : "bg-slate-300 cursor-not-allowed"
              }`}
            >
              Langkah Selanjutnya
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
