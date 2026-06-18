import { useState, useRef, useCallback, useEffect } from "react";
import axios from "@/lib/axios";
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/utils/cropImage';
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
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// ─── Data (Moved to state) ───────────────────────────────────────────────────

// ─── Modal Tambah Transkrip ───────────────────────────────────────────────────

function TambahTranskripModal({ onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [semester, setSemester] = useState("");
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
    if (!semester.trim()) {
      setError("Masukkan keterangan semester.");
      return;
    }
    setSubmitted(true);
  };

  const handleSelesai = () => {
    onSave({ 
      semester: semester, 
      fileName: file.name, 
      pdfUrl: URL.createObjectURL(file) 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-md max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#e0f7f4] flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-[#0d7c6b]" />
            </div>
            <h2 className="text-xl font-extrabold text-[#0a0f44] mb-2">
              Transkrip Berhasil Ditambahkan!
            </h2>
            <p className="text-sm text-slate-400 mb-1">
              <span className="font-semibold text-[#0d7c6b]">{semester}</span>
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Transkrip nilai kamu telah berhasil ditambahkan.
            </p>
            <Button
              onClick={handleSelesai}
              className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-8 py-3 h-auto rounded-2xl text-sm"
            >
              Selesai
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-extrabold text-[#0a0f44]">
              Tambah Transkrip
            </h2>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Unggah file PDF transkrip nilai atau KHS dan masukkan keterangan semesternya.
            </p>

            <div className="space-y-4 mb-4">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                  Keterangan Semester
                </label>
                <input
                  type="text"
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                    setError("");
                  }}
                  placeholder="Contoh: Semester 3"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0d7c6b] focus:ring-2 focus:ring-[#0d7c6b]/20"
                />
              </div>
            </div>

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

            {error && (
              <p className="text-xs text-red-500 font-semibold mt-3">{error}</p>
            )}

            <div className="flex items-center justify-end gap-6 mt-6">
              <button
                onClick={onClose}
                className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Batal
              </button>
              <Button
                onClick={handleSubmit}
                disabled={!file || !semester.trim()}
                className="bg-[#0d7c6b] hover:bg-[#0a6558] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
              >
                Simpan
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Modal Tambah Sertifikat ───────────────────────────────────────────────────

function TambahSertifikatModal({ onClose, onSave }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (f) => {
    if (!f) return;
    const isImage = f.type.startsWith("image/");
    if (!isImage) {
      setError("Hanya file gambar (JPG, PNG) yang diperbolehkan.");
      setFile(null);
      setPreview(null);
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      setError("Ukuran file maksimal 2 MB.");
      setFile(null);
      setPreview(null);
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

  const handleSubmit = () => {
    if (!file) {
      setError("Pilih gambar sertifikat terlebih dahulu.");
      return;
    }
    if (!judul.trim() || !deskripsi.trim()) {
      setError("Judul dan deskripsi sertifikat harus diisi.");
      return;
    }
    setSubmitted(true);
  };

  const handleSelesai = () => {
    onSave({ title: judul, desc: deskripsi, image: preview, imageUrl: preview });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-md overflow-y-auto max-h-[90vh]">
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
              Sertifikat Berhasil Ditambah!
            </h2>
            <p className="text-sm text-slate-400 mb-1">
              <span className="font-semibold text-[#0d7c6b]">{judul}</span>
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Gambar sertifikat kamu telah ditambahkan ke profil dan sedang ditinjau oleh tim KonekDin.
            </p>
            <Button
              onClick={handleSelesai}
              className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-8 py-3 h-auto rounded-2xl text-sm"
            >
              Selesai
            </Button>
          </div>
        ) : (
          /* ── Upload State ── */
          <>
            <h2 className="text-2xl font-extrabold text-[#0a0f44]">
              Tambah Sertifikat
            </h2>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Unggah gambar sertifikasi, masukkan judul, dan deskripsi/penerbit.
            </p>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-6 px-6 text-center transition-colors cursor-pointer overflow-hidden ${
                isDragging
                  ? "border-[#0d7c6b] bg-[#f0fbf8]"
                  : preview
                  ? "border-slate-200"
                  : "border-slate-200 bg-[#f8fafc] hover:border-[#0d7c6b] hover:bg-[#f0fbf8]"
              }`}
              onClick={() => document.getElementById('sertifikat-img-upload-input').click()}
            >
              <input
                id="sertifikat-img-upload-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {preview ? (
                <>
                  <img src={preview} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                  <div className="relative z-10 flex flex-col items-center">
                    <CheckCircle2 className="h-10 w-10 text-[#0d7c6b] mb-3" />
                    <p className="text-sm font-bold text-[#0d7c6b] break-all">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(null); }}
                      className="mt-3 text-xs text-red-500 hover:text-red-700 font-semibold underline"
                    >
                      Ganti Gambar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <UploadCloud className="h-10 w-10 text-slate-300 mb-3" />
                  <p className="text-sm font-semibold text-slate-500">
                    Drag &amp; drop gambar di sini
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    atau <span className="text-[#0d7c6b] font-bold">klik untuk memilih gambar</span>
                  </p>
                  <p className="text-[10px] text-slate-300 mt-3 font-medium">
                    Format: JPG, PNG • Maks. 2 MB
                  </p>
                </>
              )}
            </div>

            {/* Input Form */}
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                  Judul Sertifikat
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="Contoh: AWS Certified Solutions Architect"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0d7c6b] focus:ring-2 focus:ring-[#0d7c6b]/20"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                  Deskripsi / Penerbit
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Contoh: Diterbitkan oleh Amazon Web Services (2024)"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0d7c6b] focus:ring-2 focus:ring-[#0d7c6b]/20 resize-none"
                />
              </div>
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
                disabled={!file || !judul.trim() || !deskripsi.trim()}
                className="bg-[#0d7c6b] hover:bg-[#0a6558] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
              >
                Simpan
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Modal Tambah Portofolio ───────────────────────────────────────────────────

function TambahPortofolioModal({ onClose, onSave }) {
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!judul.trim() || !deskripsi.trim()) {
      setError("Judul dan deskripsi proyek harus diisi.");
      return;
    }
    if (!link.trim()) {
      setError("Masukkan link portofolio terlebih dahulu.");
      return;
    }
    
    // Otomatis tambahkan https:// jika belum ada protokol
    let finalLink = link.trim();
    if (!/^https?:\/\//i.test(finalLink)) {
      finalLink = "https://" + finalLink;
    }

    // Validasi URL
    try {
      new URL(finalLink);
      setLink(finalLink); // Update nilai input menjadi yang sudah ditambahkan https://
    } catch (_) {
      setError("Masukkan link yang valid (contoh: github.com/username atau www.proyek.com)");
      return;
    }
    
    setError("");
    setSubmitted(true);
  };

  const handleSelesai = () => {
    onSave({ title: judul, issuer: deskripsi, linkUrl: link });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 relative w-full max-w-md overflow-y-auto max-h-[90vh]">
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
              Portofolio Berhasil Ditambah!
            </h2>
            <p className="text-sm text-slate-400 mb-1">
              <span className="font-semibold text-[#0d7c6b]">{judul}</span>
            </p>
            <p className="text-xs text-slate-400 mb-6">
              Portofolio proyek kamu telah ditambahkan ke profil dan kini bisa diakses oleh learner.
            </p>
            <Button
              onClick={handleSelesai}
              className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-8 py-3 h-auto rounded-2xl text-sm"
            >
              Selesai
            </Button>
          </div>
        ) : (
          /* ── Input State ── */
          <>
            <h2 className="text-2xl font-extrabold text-[#0a0f44]">
              Tambah Portofolio
            </h2>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              Masukkan judul, deskripsi, dan link proyek yang pernah kamu kerjakan (contoh: GitHub, Behance, Dribbble).
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                  Judul Proyek
                </label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => {
                    setJudul(e.target.value);
                    setError("");
                  }}
                  placeholder="Contoh: Sistem POS Kasir Terpadu"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0d7c6b] focus:ring-2 focus:ring-[#0d7c6b]/20"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                  Deskripsi Singkat / Tahun
                </label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => {
                    setDeskripsi(e.target.value);
                    setError("");
                  }}
                  placeholder="Contoh: Proyek Klien • 2024"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-[#0d7c6b] focus:ring-2 focus:ring-[#0d7c6b]/20 resize-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
                  Link URL
                </label>
                <div className="flex items-center rounded-xl border border-slate-200 overflow-hidden px-4 focus-within:border-[#0d7c6b] focus-within:ring-2 focus-within:ring-[#0d7c6b]/20 transition">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
                      setError("");
                    }}
                    placeholder="Contoh: github.com/konekdin atau www.webkamu.com"
                    className="flex-1 bg-transparent text-slate-700 text-sm py-2.5 outline-none border-none"
                  />
                </div>
              </div>
            </div>
            
            {error && <p className="text-xs text-red-500 font-semibold mt-3">{error}</p>}

            {/* Footer */}
            <div className="flex items-center justify-end gap-6 mt-8">
              <button
                onClick={onClose}
                className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Batal
              </button>
              <Button
                onClick={handleSubmit}
                disabled={!judul.trim() || !deskripsi.trim() || !link.trim()}
                className="bg-[#0d7c6b] hover:bg-[#0a6558] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
              >
                Simpan
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
  // Extract numeric part and remove existing dots
  const initialRaw = tarif.startsWith("Rp ") ? tarif.slice(3).replace(/\./g, "") : tarif.replace(/\./g, "");
  
  const [nilai, setNilai] = useState(
    initialRaw ? new Intl.NumberFormat("id-ID").format(parseInt(initialRaw, 10)) : ""
  );
  const [error, setError] = useState("");

  const handleSave = () => {
    const rawVal = parseInt(nilai.replace(/\./g, ""), 10);
    if (isNaN(rawVal) || rawVal < 100) {
      setError("Tarif minimal adalah Rp 100");
      return;
    }
    onSave(`Rp ${nilai}`);
    onClose();
  };

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
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, ""); // Hanya izinkan angka
                if (val === "") {
                  setNilai("");
                  setError("");
                } else {
                  const num = parseInt(val, 10);
                  setNilai(new Intl.NumberFormat("id-ID").format(num));
                  setError("");
                }
              }}
              placeholder="45.000"
              className="flex-1 bg-transparent text-[#0a0f44] text-base font-semibold py-3.5 pr-4 outline-none border-none"
            />
          </div>
          {error && <p className="text-xs text-red-500 font-semibold mt-2">{error}</p>}
        </div>

        <div className="flex items-center justify-end gap-6 mt-8">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Batal
          </button>
          <Button
            onClick={handleSave}
            className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
          >
            Simpan Perubahan
          </Button>
        </div>
      </div>
    </div>
  );
}



// ─── Modal Edit Mata Kuliah ──────────────────────────────────────────────────
const ALL_MATKUL = [
  "Algoritma dan Struktur Data", "Analisis Data", "Analisis dan Perancangan Berorientasi Objek",
  "Bahasa Indonesia", "Bahasa Inggris", "Basis Data", "Bengkel Koding",
  "Dasar Dasar Komputasi", "Dasar Kewirausahaan", "Dasar Pemrograman",
  "Fisika", "Forensik Digital", "Interaksi Manusia dan Komputer",
  "Internet of Things (IoT)", "Jaminan Kualitas Perangkat Lunak", "Jaringan Komputer",
  "Kalkulus", "Keamanan Sistem dan Siber", "Kecerdasan Buatan (Artificial Intelligence)",
  "Keterampilan Interpersonal", "Komputasi Awan (Cloud Computing)", "Komputasi Numerik",
  "Komputasi Kuantum", "Komputer Grafik", "Kriptografi", "Lingkungan Cerdas dan Intelijen",
  "Literasi Informasi", "Logika Informatika", "Manajemen Jaringan",
  "Manajemen Proyek Teknologi Informasi", "Matematika Diskrit", "Matriks dan Ruang Vektor",
  "Organisasi dan Arsitektur Komputer", "Otomata dan Teori Bahasa",
  "Pembelajaran Mesin (Machine Learning)", "Pemrograman Berbasis Web",
  "Pemrograman Berorientasi Objek", "Pemrograman Perangkat Bergerak (Mobile)",
  "Pemrograman Sisi Klien", "Pemrograman Sisi Server", "Pemrograman Web Lanjut",
  "Pemrograman/Pengembangan Game", "Pemrosesan Bahasa Alami Berbasis Teks/Ucapan (NLP)",
  "Penambangan Data (Data Mining)", "Pendidikan Agama", "Pendidikan Kewarganegaraan",
  "Pendidikan Pancasila", "Pengantar Teknologi Informasi", "Pengembangan Startup Digital",
  "Penglihatan Komputer dan Analisis Citra", "Pengolahan Citra Digital",
  "Probabilitas dan Statistik", "Rangkaian Logika Digital",
  "Rekayasa Kebutuhan Perangkat Lunak", "Rekayasa Perangkat Lunak",
  "Sistem Basis Data", "Sistem Informasi", "Sistem Operasi",
  "Sistem Temu Kembali Informasi", "Sistem Terdistribusi", "Sistem Tertanam (Embedded System)",
  "Technopreneurship",
];

function EditMataKuliahModal({ initialSelected, onClose, onSave }) {
  const [selected, setSelected] = useState(initialSelected || []);
  const [search, setSearch] = useState("");

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="h-5 w-5" />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-extrabold text-[#0a0f44] mb-2">Edit Mata Kuliah</h2>
          <p className="text-sm text-slate-400 mb-6">Pilih mata kuliah yang diajarkan.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#0F1D8C]">Pilih Mata Kuliah</p>
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
                placeholder={selected.length === 0 ? "Ketik untuk mencari..." : ""}
                className="flex-1 min-w-[140px] text-sm text-slate-500 placeholder-slate-400 outline-none bg-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2 max-h-[150px] overflow-y-auto">
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
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <Button onClick={onClose} variant="outline" className="font-semibold rounded-xl text-slate-600 border-slate-300 hover:bg-slate-50 px-6">Batal</Button>
            <Button onClick={() => { onSave(selected); onClose(); }} className="font-semibold rounded-xl bg-[#0d7c6b] hover:bg-[#0a5c4e] text-white px-6">Simpan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal Edit Keahlian ──────────────────────────────────────────────────────
const ALL_KEAHLIAN = [
  "React", "Vue", "Angular", "Node.js", "Python",
  "Django", "Flask", "Java", "Spring Boot",
  "Kotlin", "Swift", "Flutter", "React Native",
  "UI/UX Design", "Figma", "Data Analysis", "SQL",
];

function EditKeahlianModal({ initialSelected, onClose, onSave }) {
  const [selected, setSelected] = useState(initialSelected || []);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const addSkill = () => {
    const val = input.trim();
    if (!val) return;
    if (selected.includes(val)) { setError("Keahlian sudah ditambahkan."); return; }
    setSelected((prev) => [...prev, val]);
    setInput("");
    setError("");
  };

  const removeSkill = (s) => setSelected((prev) => prev.filter((x) => x !== s));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addSkill(); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="h-5 w-5" />
        </button>
        <div className="p-8">
          <h2 className="text-2xl font-extrabold text-[#0a0f44] mb-2">Edit Keahlian</h2>
          <p className="text-sm text-slate-400 mb-6">Pilih keahlian atau ketik sendiri keahlian yang Anda kuasai.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#0F1D8C]">Keahlian</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(""); }}
                onKeyDown={handleKeyDown}
                placeholder="Ketik keahlian, lalu tekan Enter..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-[#0F1D8C]/20 focus:border-[#0F1D8C] transition"
              />
              <button
                onClick={addSkill}
                className="w-11 h-11 flex items-center justify-center bg-[#0F1D8C] hover:bg-[#0b166e] text-white rounded-xl transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
            {error && <p className="text-xs text-red-500 font-medium -mt-2">{error}</p>}

            <div className="flex flex-wrap gap-2 min-h-[52px]">
              {selected.map((k) => (
                <span key={k} className="inline-flex items-center gap-1.5 bg-[#0d7c6b] text-white text-xs font-semibold px-3.5 py-2 rounded-full">
                  {k}
                  <button onClick={() => removeSkill(k)} className="hover:text-[#b3e8d8] transition-colors">
                    <X className="w-3 h-3" strokeWidth={2.5} />
                  </button>
                </span>
              ))}
            </div>

            {selected.length === 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-2">Saran keahlian:</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_KEAHLIAN.slice(0, 8).map((s) => (
                    <button key={s} onClick={() => setSelected((prev) => [...prev, s])}
                      className="inline-flex items-center gap-1 bg-[#e0faf3] text-[#0d7c6b] border border-[#b3e8d8] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#0d7c6b] hover:text-white transition-all">
                      {s} <Plus className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <Button onClick={onClose} variant="outline" className="font-semibold rounded-xl text-slate-600 border-slate-300 hover:bg-slate-50 px-6">Batal</Button>
            <Button onClick={() => { onSave(selected); onClose(); }} className="font-semibold rounded-xl bg-[#0d7c6b] hover:bg-[#0a5c4e] text-white px-6">Simpan</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────

export default function ProfilTutor() {
  const fileInputRef = useRef(null);

  const [sertifikasiList, setSertifikasiList] = useState([]);
  const [sertifikatToDelete, setSertifikatToDelete] = useState(null);

  const [portofolioList, setPortofolioList] = useState([]);
  const [portofolioToDelete, setPortofolioToDelete] = useState(null);

  const [transkripList, setTranskripList] = useState([]);
  const [transkripToDelete, setTranskripToDelete] = useState(null);

  const [tarif, setTarif] = useState("Rp 0");
  const [showModalTarif, setShowModalTarif] = useState(false);
  const [showModalTranskrip, setShowModalTranskrip] = useState(false);
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);
  const [showModalPortofolio, setShowModalPortofolio] = useState(false);
  const [showModalMatkul, setShowModalMatkul] = useState(false);
  const [showModalKeahlian, setShowModalKeahlian] = useState(false);

  const [matkulList, setMatkulList] = useState([]);
  const [keahlianList, setKeahlianList] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [profil, setProfil] = useState({
    foto: "https://ui-avatars.com/api/?name=Loading&background=random",
    nama: "Loading...",
    nim: "Loading...",
    jurusan: "Loading...",
    fakultas: "Loading...",
    email: "Loading...",
    telepon: "Loading...",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, tutorRes] = await Promise.all([
          axios.get('/user'),
          axios.get('/tutor/profile').catch(() => ({ data: { data: {} } })) // Fallback if not tutor
        ]);
        
        if (userRes.data && userRes.data.user) {
          const user = userRes.data.user;
          const mappedProfile = {
            nama: user.name || '',
            email: user.email || '',
            telepon: user.phone || '',
            foto: user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `http://127.0.0.1:8000/storage/${user.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`,
            universitas: user.university || 'Universitas Dian Nuswantoro',
            nim: user.nim || '',
            jurusan: user.major || 'Teknik Informatika',
            fakultas: user.faculty || 'Ilmu Komputer',
          };
          setProfil(mappedProfile);
        }
        
        if (tutorRes.data && tutorRes.data.data) {
          const tutor = tutorRes.data.data;
          if (tutor.price !== undefined) {
            setTarif(`Rp ${new Intl.NumberFormat("id-ID").format(tutor.price)}`);
          }
          if (tutor.skills && Array.isArray(tutor.skills)) {
            setKeahlianList(tutor.skills);
          } else {
            setKeahlianList([]);
          }
          if (tutor.taught_courses && Array.isArray(tutor.taught_courses)) {
            setMatkulList(tutor.taught_courses.map(tc => tc.course_name));
          } else {
            setMatkulList([]);
          }
          
          if (tutor.portfolio_urls && tutor.portfolio_urls.length > 0) {
            setPortofolioList(tutor.portfolio_urls.map((url, idx) => ({
              id: idx + 1,
              icon: "📎",
              title: url,
              issuer: "Portofolio",
              linkUrl: url
            })));
          } else if (tutor.portfolio_url) {
            // Fallback just in case backend returns old format
            setPortofolioList([{
              id: 1,
              icon: "📎",
              title: tutor.portfolio_url,
              issuer: "Portofolio",
              linkUrl: tutor.portfolio_url.startsWith('http') ? tutor.portfolio_url : `https://${tutor.portfolio_url}`
            }]);
          } else {
            setPortofolioList([]);
          }

          if (tutor.transcript_file) {
            setTranskripList([{
              id: 1,
              semester: `Semester ${tutor.current_semester || '?'}`,
              fileName: tutor.transcript_file.split('/').pop(),
              pdfUrl: tutor.transcript_file.startsWith('http') ? tutor.transcript_file : `http://127.0.0.1:8000/storage/${tutor.transcript_file}`
            }]);
          } else {
            setTranskripList([]);
          }
          
          if (tutor.certificate_files && tutor.certificate_files.length > 0) {
            setSertifikasiList(tutor.certificate_files.map((url, idx) => ({
              id: idx + 1,
              title: "Sertifikat",
              desc: "Sertifikat Tersimpan",
              imageUrl: url,
              image: url
            })));
          } else {
            setSertifikasiList([]);
          }
        }
      } catch (err) {
        console.error("Gagal mengambil profil tutor:", err);
      }
    };
    fetchData();
  }, []);

  const handleSimpan = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
         name: profil.nama || '',
         phone: profil.telepon || '',
         nim: profil.nim || ''
      };
      if (profil.email) payload.email = profil.email;
      
      const response = await axios.patch('/me', payload);
      
      if (response.data && response.data.data) {
          const user = response.data.data;
          const oldUser = JSON.parse(localStorage.getItem('user')) || {};
          const newUser = { ...oldUser, name: user.name, phone: user.phone || '' };
          localStorage.setItem('user', JSON.stringify(newUser));
          window.dispatchEvent(new Event('profileUpdated'));
      }
      setIsEditing(false);
    } catch (err) {
       console.error("Gagal menyimpan profil", err);
       alert(err.response?.data?.message || "Gagal menyimpan perubahan");
    } finally {
       setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        const response = await axios.get('/api/me');
        const user = response.data?.data || response.data;
        
        setProfil(prev => ({
          ...prev,
          nama: user?.name || prev.nama,
          email: user?.email || prev.email,
          foto: user?.avatar ? `http://127.0.0.1:8000/storage/${user.avatar}` : prev.foto
        }));

        const courses = user?.tutor_profile?.taught_courses?.map(c => c.course_name) 
                     || user?.taught_courses?.map(c => c.course_name) 
                     || user?.courses
                     || [];
        if (courses.length > 0) {
          setMatkulList(courses);
        }
      } catch (error) {
        console.error("Gagal mengambil profil tutor:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchTutorProfile();
  }, []);

  // ── State for Cropper ──
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveCrop = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      
      let formData = new FormData();
      formData.append('_method', 'PATCH');
      const res = await fetch(croppedImage);
      const blob = await res.blob();
      formData.append('avatar', blob, 'avatar.png');
      
      const response = await axios.post('/me', formData, {
         headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.data && response.data.data) {
          const user = response.data.data;
          const newAvatarUrl = user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `http://127.0.0.1:8000/storage/${user.avatar}`) : croppedImage;
          setProfil((prev) => ({ ...prev, foto: newAvatarUrl }));
          
          const oldUser = JSON.parse(localStorage.getItem('user')) || {};
          const newUser = { ...oldUser, avatar: user.avatar };
          localStorage.setItem('user', JSON.stringify(newUser));
          window.dispatchEvent(new Event('profileUpdated'));
      } else {
          setProfil((prev) => ({ ...prev, foto: croppedImage }));
      }
      
      setImageSrc(null);
    } catch (e) {
      console.error(e);
      alert(e.response?.data?.message || "Gagal menyimpan foto profil");
    }
  };

  const handleAddSertifikat = async (newItem) => {
    const newSertifikat = { id: Date.now(), ...newItem };
    const updatedList = [...sertifikasiList, newSertifikat];
    setSertifikasiList(updatedList);
    
    if (newItem.file) {
      try {
        const fd = new FormData();
        fd.append('certificate_files[]', newItem.file);
        
        await axios.post('/tutor/profile?_method=PATCH', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } catch (err) {
        console.error("Gagal menyimpan sertifikat:", err);
      }
    }
  };

  const handleDeleteSertifikat = async () => {
    if (sertifikatToDelete !== null) {
      const updatedList = sertifikasiList.filter((s) => s.id !== sertifikatToDelete);
      setSertifikasiList(updatedList);
      setSertifikatToDelete(null);
      // Backend does not support deleting a single certificate without re-uploading the others easily via UI, 
      // so we just update the local state. The user would need to re-upload to truly replace in DB.
    }
  };

  const handleAddPortofolio = async (newItem) => {
    const updatedList = [...portofolioList, { id: Date.now(), icon: "📎", ...newItem }];
    setPortofolioList(updatedList);
    try {
      const urls = updatedList.map(p => p.linkUrl);
      await axios.patch('/tutor/profile', { portfolio_urls: urls });
    } catch (err) {
      console.error("Gagal menyimpan portofolio:", err);
    }
  };

  const handleDeletePortofolio = async () => {
    if (portofolioToDelete !== null) {
      const updatedList = portofolioList.filter((p) => p.id !== portofolioToDelete);
      setPortofolioList(updatedList);
      setPortofolioToDelete(null);
      try {
        const urls = updatedList.map(p => p.linkUrl);
        await axios.patch('/tutor/profile', { portfolio_urls: urls });
      } catch (err) {
        console.error("Gagal menghapus portofolio:", err);
      }
    }
  };

  const handleAddTranskrip = (newItem) => {
    setTranskripList([...transkripList, { id: Date.now(), ...newItem }]);
  };

  const handleDeleteTranskrip = () => {
    if (transkripToDelete !== null) {
      setTranskripList(transkripList.filter((t) => t.id !== transkripToDelete));
      setTranskripToDelete(null);
    }
  };

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
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFotoChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
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

      {/* ── Ketersediaan & Tarif Mengajar (Grid 2 Kolom) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ── Status Ketersediaan ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-start justify-between mb-auto">
            <div className="flex-1 pr-4">
              <div className="flex items-center gap-2 mb-2">
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
              <h2 className="text-lg font-extrabold text-[#0a0f44] mb-1">
                Status Ketersediaan
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAvailable
                  ? "Kamu sedang aktif dan bisa ditemukan oleh mahasiswa. Matikan jika tidak tersedia."
                  : "Kamu sedang tidak aktif. Mahasiswa tidak dapat menemukan profilmu saat ini."}
              </p>
            </div>
            {/* Toggle switch */}
            <button
              onClick={() => setIsAvailable((v) => !v)}
              className={`relative inline-flex h-7 w-13 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none mt-1 ${
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

        {/* ── Tarif Mengajar ── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5 text-[#0d7c6b]" />
            <h2 className="text-lg font-extrabold text-[#0d7c6b]">
              Tarif Mengajar
            </h2>
          </div>
          <div className="flex items-end justify-between mt-auto">
            <div>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1">
                Per Sesi
              </p>
              <p className="text-3xl font-black text-[#0d7c6b] leading-none">{tarif}</p>
            </div>
            <button
              onClick={() => setShowModalTarif(true)}
              className="bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors duration-150 mb-0.5"
            >
              Perbarui Tarif
            </button>
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
              onClick={handleSimpan}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                <div className="bg-[#f1f3f5] rounded-xl px-4 py-3 text-sm text-[#0a0f44] font-medium h-11 flex items-center">
                  {profil[key]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Mata Kuliah & Keahlian ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Mata Kuliah ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-[#0d7c6b]">
              Mata Kuliah Diajarkan
            </h2>
            <button 
              onClick={() => setShowModalMatkul(true)}
              className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Mata Kuliah
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 min-h-[120px]">
            {matkulList.length === 0 ? (
              <p className="text-sm text-slate-400">Belum ada mata kuliah yang dipilih.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {matkulList.map((mk) => (
                  <span key={mk} className="inline-flex items-center bg-[#E6F1EF] text-[#006B5F] text-xs font-semibold px-3.5 py-2 rounded-full">
                    {mk}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Keahlian ── */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-extrabold text-[#0d7c6b]">
              Keahlian / Skill
            </h2>
            <button 
              onClick={() => setShowModalKeahlian(true)}
              className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit Keahlian
            </button>
          </div>
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 min-h-[120px]">
            {keahlianList.length === 0 ? (
              <p className="text-sm text-slate-400">Belum ada keahlian yang dipilih.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {keahlianList.map((k) => (
                  <span key={k} className="inline-flex items-center bg-[#E6F1EF] text-[#006B5F] text-xs font-semibold px-3.5 py-2 rounded-full">
                    {k}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Transkrip Nilai (Transkrip PDF) ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#0d7c6b]" />
            <h2 className="text-lg font-extrabold text-[#0d7c6b]">
              Transkrip Nilai
            </h2>
          </div>
          <button
            onClick={() => setShowModalTranskrip(true)}
            className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Transkrip
          </button>
        </div>
        
        <div className="flex flex-col gap-3">
          {transkripList.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl p-4 group relative transition-colors hover:bg-slate-100"
            >
              <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-bold text-[#0a0f44] leading-tight truncate">
                  {t.semester}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <FileText className="h-3 w-3 text-[#0d7c6b]" />
                  <p className="text-[11px] text-slate-500 truncate">{t.fileName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href={t.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#0d7c6b] text-xs font-bold hover:underline bg-white px-3 py-1.5 rounded-lg border border-slate-200 transition-colors shadow-sm hover:bg-slate-50"
                >
                  Lihat <ExternalLink className="h-3 w-3" />
                </a>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setTranskripToDelete(t.id);
                  }}
                  className="bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 p-1.5 rounded-lg border border-slate-200 transition-all duration-200 shadow-sm opacity-0 group-hover:opacity-100"
                  title="Hapus Transkrip"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Portofolio ── */}
      <div className="bg-[#0a0f44] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#0d7c6b]" />
            <h2 className="text-lg font-extrabold text-white">Portofolio</h2>
          </div>
          <button 
            onClick={() => setShowModalPortofolio(true)}
            className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Portofolio
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {portofolioList.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 group relative"
            >
              {/* ── Box Icon ── */}
              <div className="bg-white/10 w-14 h-14 rounded-2xl text-2xl flex-shrink-0 flex items-center justify-center">
                {p.icon}
              </div>

              {/* ── Box Detail (Judul, Deskripsi, Link) ── */}
              <div className="flex-1 flex items-center justify-between bg-white/10 rounded-2xl p-2 min-w-0">
                <div className="pr-4 truncate">
                  <p className="text-sm font-bold text-white leading-tight truncate">
                    {p.title}
                  </p>
                  <p className="text-[11px] text-white/50 mt-1 truncate">{p.issuer}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <a
                    href={p.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#0d7c6b] text-xs font-bold hover:underline bg-white/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/20"
                  >
                    Lihat <ExternalLink className="h-3 w-3" />
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPortofolioToDelete(p.id);
                    }}
                    className="bg-white/10 hover:bg-red-500 text-slate-400 hover:text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
                    title="Hapus Portofolio"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Sertifikasi ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-extrabold text-[#0d7c6b]">
            Sertifikasi
          </h2>
          <button 
            onClick={() => setShowModalSertifikasi(true)}
            className="flex items-center gap-1.5 text-[#0d7c6b] text-xs font-bold hover:underline"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Sertifikat
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {sertifikasiList.map((s) => (
            <a
              key={s.id}
              href={s.imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 block cursor-pointer relative"
            >
              <div className="relative">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-44 object-cover"
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSertifikatToDelete(s.id);
                  }}
                  className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-red-500 text-slate-600 hover:text-white p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm"
                  title="Hapus Sertifikat"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-extrabold text-[#0a0f44] hover:text-[#0d7c6b] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* ── Modal Crop Foto ── */}
      {imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Sesuaikan Foto Profil</h3>
              <p className="text-sm text-slate-500">Geser dan perbesar foto Anda</p>
            </div>
            
            <div className="relative h-72 w-full bg-slate-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                showGrid={true}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-500">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0d7c6b]"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => setImageSrc(null)}
                  variant="outline"
                  className="flex-1 font-semibold rounded-xl text-slate-600 border-slate-300"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleSaveCrop}
                  className="flex-1 font-semibold rounded-xl bg-[#0d7c6b] hover:bg-[#0a5c4e] text-white"
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit Tarif */}
      {showModalTarif && (
        <EditTarifModal
          tarif={tarif}
          onClose={() => setShowModalTarif(false)}
          onSave={async (val) => {
            const rawVal = parseInt(val.replace(/\D/g, ""), 10);
            setTarif(val);
            try {
              await axios.patch('/tutor/profile', { price: rawVal });
            } catch (err) {
              console.error("Gagal menyimpan tarif:", err);
            }
          }}
        />
      )}

      {/* Modal Edit Transkrip */}
      {showModalTranskrip && (
        <TambahTranskripModal 
          onClose={() => setShowModalTranskrip(false)} 
          onSave={handleAddTranskrip}
        />
      )}

      {/* Modal Edit Sertifikasi */}
      {showModalSertifikasi && (
        <TambahSertifikatModal 
          onClose={() => setShowModalSertifikasi(false)} 
          onSave={handleAddSertifikat} 
        />
      )}

      {/* Modal Edit Portofolio */}
      {showModalPortofolio && (
        <TambahPortofolioModal 
          onClose={() => setShowModalPortofolio(false)} 
          onSave={handleAddPortofolio}
        />
      )}

      {/* Modal Edit Mata Kuliah */}
      {showModalMatkul && (
        <EditMataKuliahModal 
          initialSelected={matkulList}
          onClose={() => setShowModalMatkul(false)}
          onSave={async (selected) => {
            setMatkulList(selected);
            try {
              // Note: The backend may not support taught_courses in PATCH /tutor/profile yet,
              // but we send it so it works if the backend is updated.
              await axios.patch('/tutor/profile', { taught_courses: selected });
            } catch (err) {
              console.error("Gagal menyimpan mata kuliah:", err);
            }
          }}
        />
      )}

      {/* Modal Edit Keahlian */}
      {showModalKeahlian && (
        <EditKeahlianModal 
          initialSelected={keahlianList}
          onClose={() => setShowModalKeahlian(false)}
          onSave={async (selected) => {
            setKeahlianList(selected);
            try {
              await axios.patch('/tutor/profile', { skills: selected });
            } catch (err) {
              console.error("Gagal menyimpan keahlian:", err);
            }
          }}
        />
      )}



      {/* ── Modal Konfirmasi Hapus Sertifikat ── */}
      {sertifikatToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 relative">
            <button
              onClick={() => setSertifikatToDelete(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[#0a0f44] mb-2">Hapus Sertifikat?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Apakah kamu yakin ingin menghapus sertifikat ini? Data yang dihapus tidak dapat dikembalikan.
              </p>
              <div className="flex gap-3 w-full">
                <Button
                  onClick={() => setSertifikatToDelete(null)}
                  variant="outline"
                  className="flex-1 font-semibold rounded-xl text-slate-600 border-slate-300 hover:bg-slate-50"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleDeleteSertifikat}
                  className="flex-1 font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white"
                >
                  Ya, Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Konfirmasi Hapus Portofolio ── */}
      {portofolioToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 relative">
            <button
              onClick={() => setPortofolioToDelete(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[#0a0f44] mb-2">Hapus Proyek?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Apakah kamu yakin ingin menghapus proyek ini dari portofolio? Data yang dihapus tidak dapat dikembalikan.
              </p>
              <div className="flex gap-3 w-full">
                <Button
                  onClick={() => setPortofolioToDelete(null)}
                  variant="outline"
                  className="flex-1 font-semibold rounded-xl text-slate-600 border-slate-300 hover:bg-slate-50"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleDeletePortofolio}
                  className="flex-1 font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white"
                >
                  Ya, Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ── Modal Konfirmasi Hapus Transkrip ── */}
      {transkripToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl p-6 relative">
            <button
              onClick={() => setTranskripToDelete(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-[#0a0f44] mb-2">Hapus Transkrip?</h3>
              <p className="text-sm text-slate-500 mb-6">
                Apakah kamu yakin ingin menghapus transkrip nilai ini? Data yang dihapus tidak dapat dikembalikan.
              </p>
              <div className="flex gap-3 w-full">
                <Button
                  onClick={() => setTranskripToDelete(null)}
                  variant="outline"
                  className="flex-1 font-semibold rounded-xl text-slate-600 border-slate-300 hover:bg-slate-50"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleDeleteTranskrip}
                  className="flex-1 font-semibold rounded-xl bg-red-500 hover:bg-red-600 text-white"
                >
                  Ya, Hapus
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}