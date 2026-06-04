import { useState } from "react";
import {
  Pencil,
  CalendarDays,
  History,
  Save,
  ShieldCheck,
  CreditCard,
  ExternalLink,
  UploadCloud,
  CheckCircle2,
  X,
  FileText,
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    icon: "📊",
    title: "Advanced Quantitative Analysis Certification",
    issuer: "Universitas Dian Nuswantoro • 2023",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
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
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: 2,
    tag: "APP BUILD",
    tagColor: "bg-[#3b82f6]",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=220&fit=crop",
    title: "SecurePay Mobile SDK",
    desc: "SDK pembayaran terenkripsi yang digunakan oleh lebih dari 50 aplikasi e-commerce lokal.",
    pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

// ─── Modal Edit Prestasi Akademik ─────────────────────────────────────────────

function EditPrestasiModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f) => {
    if (!f) return;
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("Hanya file PDF yang diperbolehkan.");
      setFile(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5 MB.");
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Pilih file PDF terlebih dahulu.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-md">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          /* ── Success State ── */
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#e0f7f4] flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-[#0d7c6b]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0a0f44] mb-2">
              File Berhasil Dikirim!
            </h2>
            <p className="text-sm text-slate-400 mb-1">
              <span className="font-semibold text-[#0d7c6b]">{file.name}</span>
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Dokumen nilai PDF kamu sedang ditinjau oleh tim KonekDin.
            </p>
            <Button
              onClick={onClose}
              className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-8 py-3 h-auto rounded-2xl text-sm"
            >
              Selesai
            </Button>
          </div>
        ) : (
          /* ── Upload State ── */
          <>
            <h2 className="text-2xl font-extrabold text-[#0a0f44]">
              Upload Nilai Akademik
            </h2>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Unggah file PDF transkrip atau kartu hasil studi (KHS) kamu.
            </p>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 px-6 text-center transition-colors cursor-pointer ${
                isDragging
                  ? "border-[#0d7c6b] bg-[#f0fbf8]"
                  : file
                  ? "border-[#0d7c6b] bg-[#f0fbf8]"
                  : "border-slate-200 bg-[#f8fafc] hover:border-[#0d7c6b] hover:bg-[#f0fbf8]"
              }`}
              onClick={() => document.getElementById('pdf-upload-input').click()}
            >
              <input
                id="pdf-upload-input"
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {file ? (
                <>
                  <FileText className="h-10 w-10 text-[#0d7c6b] mb-3" />
                  <p className="text-sm font-bold text-[#0d7c6b] break-all">{file.name}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-3 text-xs text-red-400 hover:text-red-600 font-semibold underline"
                  >
                    Hapus file
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud className="h-10 w-10 text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-500">
                    Drag &amp; drop file PDF di sini
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    atau <span className="text-[#0d7c6b] font-bold">klik untuk memilih file</span>
                  </p>
                  <p className="text-[10px] text-slate-300 mt-3 font-medium">
                    Format: PDF • Maks. 5 MB
                  </p>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 font-semibold mt-3">{error}</p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-6 mt-6">
              <button
                onClick={onClose}
                className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Batal
              </button>
              <Button
                onClick={handleSubmit}
                disabled={!file}
                className="bg-[#0d7c6b] hover:bg-[#0a6558] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
              >
                Kirim File
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Modal Edit Sertifikasi ───────────────────────────────────────────────────

function EditSertifikasiModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f) => {
    if (!f) return;
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("Hanya file PDF yang diperbolehkan.");
      setFile(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5 MB.");
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Pilih file PDF terlebih dahulu.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-md">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          /* ── Success State ── */
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#e0f7f4] flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-[#0d7c6b]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0a0f44] mb-2">
              File Berhasil Dikirim!
            </h2>
            <p className="text-sm text-slate-400 mb-1">
              <span className="font-semibold text-[#0d7c6b]">{file.name}</span>
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Dokumen sertifikat PDF kamu sedang ditinjau oleh tim KonekDin.
            </p>
            <Button
              onClick={onClose}
              className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-8 py-3 h-auto rounded-2xl text-sm"
            >
              Selesai
            </Button>
          </div>
        ) : (
          /* ── Upload State ── */
          <>
            <h2 className="text-2xl font-extrabold text-[#0a0f44]">
              Upload Sertifikat
            </h2>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Unggah file PDF sertifikasi atau lisensi keahlian pendukung kamu.
            </p>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 px-6 text-center transition-colors cursor-pointer ${
                isDragging
                  ? "border-[#0d7c6b] bg-[#f0fbf8]"
                  : file
                  ? "border-[#0d7c6b] bg-[#f0fbf8]"
                  : "border-slate-200 bg-[#f8fafc] hover:border-[#0d7c6b] hover:bg-[#f0fbf8]"
              }`}
              onClick={() => document.getElementById('sertifikat-upload-input').click()}
            >
              <input
                id="sertifikat-upload-input"
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {file ? (
                <>
                  <FileText className="h-10 w-10 text-[#0d7c6b] mb-3" />
                  <p className="text-sm font-bold text-[#0d7c6b] break-all">{file.name}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-3 text-xs text-red-400 hover:text-red-600 font-semibold underline"
                  >
                    Hapus file
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud className="h-10 w-10 text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-500">
                    Drag &amp; drop file PDF di sini
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    atau <span className="text-[#0d7c6b] font-bold">klik untuk memilih file</span>
                  </p>
                  <p className="text-[10px] text-slate-300 mt-3 font-medium">
                    Format: PDF • Maks. 5 MB
                  </p>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 font-semibold mt-3">{error}</p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-6 mt-6">
              <button
                onClick={onClose}
                className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Batal
              </button>
              <Button
                onClick={handleSubmit}
                disabled={!file}
                className="bg-[#0d7c6b] hover:bg-[#0a6558] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
              >
                Kirim File
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Modal Edit Portofolio ────────────────────────────────────────────────────

function EditPortofolioModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f) => {
    if (!f) return;
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) {
      setError("Hanya file PDF yang diperbolehkan.");
      setFile(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5 MB.");
      setFile(null);
      return;
    }
    setError("");
    setFile(f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (!file) {
      setError("Pilih file PDF terlebih dahulu.");
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-md">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          /* ── Success State ── */
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#e0f7f4] flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-[#0d7c6b]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0a0f44] mb-2">
              File Berhasil Dikirim!
            </h2>
            <p className="text-sm text-slate-400 mb-1">
              <span className="font-semibold text-[#0d7c6b]">{file.name}</span>
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Dokumen portofolio PDF kamu sedang ditinjau oleh tim KonekDin.
            </p>
            <Button
              onClick={onClose}
              className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-8 py-3 h-auto rounded-2xl text-sm"
            >
              Selesai
            </Button>
          </div>
        ) : (
          /* ── Upload State ── */
          <>
            <h2 className="text-2xl font-extrabold text-[#0a0f44]">
              Upload Portofolio
            </h2>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Unggah file PDF dokumen portofolio hasil karya atau proyek yang pernah kamu kerjakan.
            </p>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-10 px-6 text-center transition-colors cursor-pointer ${
                isDragging
                  ? "border-[#0d7c6b] bg-[#f0fbf8]"
                  : file
                  ? "border-[#0d7c6b] bg-[#f0fbf8]"
                  : "border-slate-200 bg-[#f8fafc] hover:border-[#0d7c6b] hover:bg-[#f0fbf8]"
              }`}
              onClick={() => document.getElementById('portofolio-upload-input').click()}
            >
              <input
                id="portofolio-upload-input"
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {file ? (
                <>
                  <FileText className="h-10 w-10 text-[#0d7c6b] mb-3" />
                  <p className="text-sm font-bold text-[#0d7c6b] break-all">{file.name}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    className="mt-3 text-xs text-red-400 hover:text-red-600 font-semibold underline"
                  >
                    Hapus file
                  </button>
                </>
              ) : (
                <>
                  <UploadCloud className="h-10 w-10 text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-500">
                    Drag &amp; drop file PDF di sini
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    atau <span className="text-[#0d7c6b] font-bold">klik untuk memilih file</span>
                  </p>
                  <p className="text-[10px] text-slate-300 mt-3 font-medium">
                    Format: PDF • Maks. 5 MB
                  </p>
                </>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-500 font-semibold mt-3">{error}</p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-end gap-6 mt-6">
              <button
                onClick={onClose}
                className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Batal
              </button>
              <Button
                onClick={handleSubmit}
                disabled={!file}
                className="bg-[#0d7c6b] hover:bg-[#0a6558] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
              >
                Kirim File
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Modal Edit Tarif ─────────────────────────────────────────────────────────

function EditTarifModal({ tarif, onClose, onSave }) {
  // Strip "Rp " prefix so input only holds the numeric part
  const [nilai, setNilai] = useState(
    tarif.startsWith("Rp ") ? tarif.slice(3) : tarif
  );

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
          {/* Input with fixed "Rp" prefix */}
          <div className="flex items-center bg-[#f1f3f5] rounded-2xl overflow-hidden">
            <span className="pl-4 pr-2 text-base font-extrabold text-[#0d7c6b] select-none flex-shrink-0">
              Rp
            </span>
            <input
              type="text"
              value={nilai}
              onChange={(e) => setNilai(e.target.value)}
              placeholder="45.000"
              className="flex-1 bg-transparent text-[#0a0f44] text-base font-semibold py-3.5 pr-4 outline-none border-none"
            />
          </div>
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
              onSave(`Rp ${nilai}`);
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

// ─── Modal Edit Foto Profil ───────────────────────────────────────────────────

function EditFotoModal({ currentFoto, onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(currentFoto);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f) => {
    if (!f) return;
    const isImage = f.type.startsWith("image/");
    if (!isImage) {
      setError("Hanya file gambar (JPG, PNG) yang diperbolehkan.");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setError("Ukuran file maksimal 2 MB.");
      return;
    }
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-2xl font-extrabold text-[#0a0f44]">Ubah Foto Profil</h2>
        <p className="text-sm text-slate-400 mt-1 mb-6">
          Unggah foto terbaru untuk memperbarui profil Anda.
        </p>

        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="Preview"
            className="h-32 w-32 rounded-2xl object-cover border-2 border-slate-100 mb-6 shadow-sm"
          />

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`w-full relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-6 px-4 text-center transition-colors cursor-pointer ${
              isDragging
                ? "border-[#0d7c6b] bg-[#f0fbf8]"
                : "border-slate-200 bg-[#f8fafc] hover:border-[#0d7c6b] hover:bg-[#f0fbf8]"
            }`}
            onClick={() => document.getElementById('foto-upload-input').click()}
          >
            <input
              id="foto-upload-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            <UploadCloud className="h-8 w-8 text-slate-300 mb-2" />
            <p className="text-sm font-semibold text-slate-500">
              Drag & drop foto di sini
            </p>
            <p className="text-xs text-slate-400 mt-1">
              atau <span className="text-[#0d7c6b] font-bold">klik untuk memilih file</span>
            </p>
          </div>

          {error && (
            <div className="w-full mt-4 p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-xl text-left border border-red-100">
              {error}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-4 mt-8">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Batal
          </button>
          <Button
            onClick={() => onSave(preview)}
            className="bg-[#0d7c6b] hover:bg-[#095c4f] text-white font-bold px-6 py-2.5 h-auto rounded-xl text-sm transition-colors duration-150"
          >
            Simpan Foto
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────

export default function ProfilTutor() {
  const [tarif, setTarif] = useState("Rp 45.000");
  const [showModalFoto, setShowModalFoto] = useState(false);
  const [showModalTarif, setShowModalTarif] = useState(false);
  const [showModalPrestasi, setShowModalPrestasi] = useState(false);
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);
  const [showModalPortofolio, setShowModalPortofolio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [profil, setProfil] = useState({
    foto: "https://i.pravatar.cc/150?img=15",
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
            src={profil.foto}
            alt={profil.nama}
            className="h-28 w-28 rounded-2xl object-cover border border-slate-100 shadow-sm"
          />
          <button 
            onClick={() => setShowModalFoto(true)}
            className="absolute bottom-2 right-2 bg-[#0d7c6b] hover:bg-[#095c4f] transition-colors text-white p-1.5 rounded-lg shadow-sm"
          >
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

      {/* ── Status Ketersediaan ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold px-3 py-1 rounded-full tracking-wider ${
                  isAvailable
                    ? "bg-[#e0f7f4] text-[#0d7c6b]"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isAvailable ? "bg-[#0d7c6b]" : "bg-slate-300"
                  }`}
                />
                {isAvailable ? "AKTIF" : "NON-AKTIF"}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-[#0a0f44]">
              Status Ketersediaan
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-sm">
              {isAvailable
                ? "Kamu sedang aktif dan bisa ditemukan oleh mahasiswa. Matikan jika kamu tidak tersedia untuk sementara."
                : "Kamu sedang tidak aktif. Mahasiswa tidak dapat menemukan profilmu saat ini."}
            </p>
          </div>
          {/* Toggle switch */}
          <button
            onClick={() => setIsAvailable((v) => !v)}
            className={`relative inline-flex h-7 w-13 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
              isAvailable ? "bg-[#0d7c6b]" : "bg-slate-200"
            }`}
            style={{ width: "52px" }}
            role="switch"
            aria-checked={isAvailable}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                isAvailable ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
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
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-extrabold text-[#0d7c6b]">
            Prestasi Akademik
          </h2>
          <button
            onClick={() => setShowModalPrestasi(true)}
            className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit File
          </button>
        </div>
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

      {/* ── Portofolio ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-[#0d7c6b]">
            Portofolio
          </h2>
          <button 
            onClick={() => setShowModalPortofolio(true)}
            className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit File
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PORTOFOLIO.map((p) => (
            <a
              key={p.id}
              href={p.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 block cursor-pointer"
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
                <h3 className="text-sm font-extrabold text-[#0a0f44] hover:text-[#0d7c6b] transition-colors">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Sertifikasi ── */}
      <div className="bg-[#0a0f44] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#0d7c6b]" />
            <h2 className="text-lg font-extrabold text-white">Sertifikasi</h2>
          </div>
          <button 
            onClick={() => setShowModalSertifikasi(true)}
            className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit File
          </button>
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
              <a
                href={s.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#0d7c6b] text-xs font-bold flex-shrink-0 hover:underline"
              >
                Lihat <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Edit Foto Profil */}
      {showModalFoto && (
        <EditFotoModal 
          currentFoto={profil.foto}
          onClose={() => setShowModalFoto(false)} 
          onSave={(newFoto) => {
            setProfil({ ...profil, foto: newFoto });
            setShowModalFoto(false);
          }}
        />
      )}

      {/* Modal Edit Tarif */}
      {showModalTarif && (
        <EditTarifModal
          tarif={tarif}
          onClose={() => setShowModalTarif(false)}
          onSave={(val) => setTarif(val)}
        />
      )}

      {/* Modal Edit Prestasi */}
      {showModalPrestasi && (
        <EditPrestasiModal onClose={() => setShowModalPrestasi(false)} />
      )}

      {/* Modal Edit Sertifikasi */}
      {showModalSertifikasi && (
        <EditSertifikasiModal onClose={() => setShowModalSertifikasi(false)} />
      )}

      {/* Modal Edit Portofolio */}
      {showModalPortofolio && (
        <EditPortofolioModal onClose={() => setShowModalPortofolio(false)} />
      )}
    </div>
  );
}