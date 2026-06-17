import { useState, useRef } from "react";
import { CheckCircle2, FileText, Link2, Image as ImageIcon, GraduationCap, Zap, Pencil, CheckSquare, Square, Send } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '@/lib/axios';

function KonekDinLogo() {
  return (
    <div className="flex items-center">
      <img src="/images/logo_konekdin.png" alt="KonekDin" className="h-8 w-auto object-contain" />
    </div>
  );
}

const STEPS = [
  { label: "Unggah Dokumen", status: "done" },
  { label: "Pilih Mata Kuliah", status: "done" },
  { label: "Input Keahlian", status: "done" },
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

// ─── Data mock removed; using dynamic state ──────────────────────────────────

// ─── Document File Row ────────────────────────────────────────────────────────
function DocRow({ doc, onEdit, onChangeFile, accept }) {
  const inputRef = useRef(null);
  let Icon = FileText;
  if (doc.type === "link") Icon = Link2;
  if (doc.type === "image") Icon = ImageIcon;

  return (
    <div className={`flex items-center gap-4 border rounded-xl px-5 py-4 transition-all
      ${doc.uploaded ? "bg-[#f0fdf8] border-[#0d7c6b]" : "bg-slate-50 border-dashed border-slate-200"}`}
    >
      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0
        ${doc.uploaded ? "bg-[#0d7c6b]" : "bg-slate-200"}`}
      >
        {doc.uploaded
          ? <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
          : <Icon className="w-4 h-4 text-slate-400" strokeWidth={1.8} />}
      </div>
      <div className="flex-1 min-w-0">
        {doc.uploaded ? (
          <>
            <p className="text-sm font-bold text-[#0a0f44] truncate">{doc.type === "link" ? doc.value : doc.name}</p>
            <p className="text-[10px] font-extrabold text-[#0d7c6b] tracking-widest uppercase mt-0.5">
              {doc.type === "link" ? "Tautan Tersimpan" : "Berhasil Diunggah"}
            </p>
          </>
        ) : (
          <>
            <p className="text-sm font-semibold text-slate-400">{doc.label} (Opsional)</p>
            <p className="text-xs text-slate-300">Belum ada data terpilih</p>
          </>
        )}
      </div>
      {doc.uploaded && (doc.type === "file" || doc.type === "image") ? (
        <>
          <button onClick={() => inputRef.current?.click()} className="flex items-center gap-1.5 text-sm font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors flex-shrink-0">
            <Pencil className="w-3.5 h-3.5" /> Ubah
          </button>
          <input
            type="file"
            accept={accept}
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                onChangeFile(e.target.files[0]);
              }
            }}
          />
        </>
      ) : (doc.uploaded ? (
        <button onClick={onEdit} className="flex items-center gap-1.5 text-sm font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors flex-shrink-0">
          <Pencil className="w-3.5 h-3.5" /> Ubah
        </button>
      ) : null)}
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
  const location = useLocation();

  const [formData, setFormData] = useState({
    semester: location.state?.semester || 3,
    transkripFiles: location.state?.transkripFiles || [],
    portofolio: location.state?.portofolio || "",
    sertifikatFile: location.state?.sertifikatFile || null,
    selectedMataKuliah: location.state?.selectedMataKuliah || [],
    skills: location.state?.skills || []
  });

  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const docs = [
    ...formData.transkripFiles.map((file, idx) => ({
      type: "file",
      name: file.name || file.fileName || "Transkrip",
      label: `Transkrip Nilai Semester ${idx + 1}`,
      uploaded: true,
      originalIndex: idx
    })),
    {
      type: "link",
      value: formData.portofolio,
      label: "Portofolio",
      uploaded: !!formData.portofolio
    },
    {
      type: "image",
      name: formData.sertifikatFile ? (formData.sertifikatFile.name || formData.sertifikatFile.fileName || "Sertifikat") : "",
      label: "Sertifikat",
      uploaded: !!formData.sertifikatFile
    }
  ];

  const handleSubmit = async () => {
    if (!agreed) { setErr("Anda harus menyetujui pernyataan di atas untuk melanjutkan."); return; }
    setErr("");
    setLoading(true);

    try {
      let courseId = 1;
      
      try {
        const { data: courses } = await axios.get("/courses");
        const match = courses.find(c => c.name.toLowerCase() === formData.selectedMataKuliah[0]?.toLowerCase());
        if (match) courseId = match.id;
      } catch(e) { console.error("Gagal mengambil course_id", e); }

      const fd = new FormData();
      if (formData.transkripFiles[0]) {
        fd.append("transcript_file", formData.transkripFiles[0]);
      }
      fd.append("course_id", courseId);
      fd.append("grade", "A");

      await axios.post("/register/tutor/upload-document", fd, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setErr(error.response?.data?.message || "Terjadi kesalahan saat mengirim pendaftaran.");
    } finally {
      setLoading(false);
    }
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
                {docs.map((doc, idx) => (
                  <DocRow 
                    key={idx} 
                    doc={doc} 
                    accept={doc.type === "image" ? ".jpg,.jpeg,.png" : ".pdf"}
                    onEdit={() => navigate("/register/tutor/dokumen", { state: formData })}
                    onChangeFile={(newFile) => {
                      if (doc.type === "file") {
                        const updatedFiles = [...formData.transkripFiles];
                        updatedFiles[doc.originalIndex] = newFile;
                        setFormData(prev => ({ ...prev, transkripFiles: updatedFiles }));
                      } else if (doc.type === "image") {
                        setFormData(prev => ({ ...prev, sertifikatFile: newFile }));
                      }
                    }} 
                  />
                ))}
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
                  onClick={() => navigate("/register/tutor/mata-kuliah", { state: formData })}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Ubah
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.selectedMataKuliah.map((mk) => (
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
                  onClick={() => navigate("/register/tutor/keahlian", { state: formData })}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0F1D8C] hover:text-[#0d7c6b] transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Ubah
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((k) => (
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
              onClick={() => navigate("/register/tutor/keahlian", { state: formData })}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0d7c6b] hover:text-[#0a5a4e] transition-colors"
              disabled={loading}
            >
              ← Kembali
            </button>
            <button
              onClick={handleSubmit}
              disabled={!agreed || loading}
              className={`font-bold px-8 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-150
                ${agreed && !loading ? "bg-[#0F1D8C] hover:bg-[#0b166e] text-white" : "bg-slate-200 text-slate-400 cursor-not-allowed"}`}
            >
              {loading ? "Mengirim..." : "Ajukan Pendaftaran"}
            </button>
          </div>
        </div>
      </main>

      {submitted && <SuccessModal onClose={() => navigate("/")} />}
    </div>
  );
}
