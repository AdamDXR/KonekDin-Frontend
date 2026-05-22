import { useState } from "react";
import { Clock, RotateCcw, Plus, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Data ────────────────────────────────────────────────────────────────────

const HARI_OPTIONS = [
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
  "Minggu",
];

const JAM_OPTIONS = [
  "07.00 - 07.50",
  "07.50 - 08.40",
  "08.40 - 09.30",
  "09.30 - 10.20",
  "10.20 - 11.10",
  "11.10 - 12.00",
  "12.30 - 13.20",
  "13.20 - 14.10",
  "14.10 - 15.00",
  "15.30 - 16.20",
  "16.20 - 17.10",
  "17.10 - 18.00",
];

const MATKUL_OPTIONS = [
  "Basis Data",
  "Pemrograman Web",
  "Algoritma & Struktur Data",
  "Logika Informatika",
  "Jaringan Komputer",
  "Sistem Operasi",
  "Kalkulus",
  "Fisika Dasar",
];

const STATUS_OPTIONS = ["Available", "Non Available"];

const INITIAL_JADWAL = [
  {
    id: 1,
    hari: "Senin",
    waktu: "07.00 - 07.50",
    matkul: "Basis Data",
    status: "AVAILABLE",
  },
  {
    id: 2,
    hari: "Senin",
    waktu: "07.50 - 08.40",
    matkul: "Pemrograman Web",
    status: "BOOKED",
  },
  {
    id: 3,
    hari: "Senin",
    waktu: "08.40 - 09.30",
    matkul: null,
    status: "NON AVAILABLE",
  },
  {
    id: 4,
    hari: "Senin",
    waktu: "09.30 - 10.20",
    matkul: "Logika Informatika",
    status: "AVAILABLE",
  },
  {
    id: 5,
    hari: "Senin",
    waktu: "10.20 - 11.10",
    matkul: null,
    status: "NON AVAILABLE",
  },
  {
    id: 6,
    hari: "Senin",
    waktu: "11.10 - 12.00",
    matkul: null,
    status: "NON AVAILABLE",
  },
  {
    id: 7,
    hari: "Senin",
    waktu: "12.30 - 13.20",
    matkul: "Algoritma & Struktur Data",
    status: "BOOKED",
  },
  {
    id: 8,
    hari: "Senin",
    waktu: "13.20 - 14.10",
    matkul: null,
    status: "NON AVAILABLE",
  },
  {
    id: 9,
    hari: "Senin",
    waktu: "14.10 - 15.00",
    matkul: null,
    status: "NON AVAILABLE",
  },
  {
    id: 10,
    hari: "Senin",
    waktu: "15.30 - 16.20",
    matkul: null,
    status: "NON AVAILABLE",
  },
  {
    id: 11,
    hari: "Senin",
    waktu: "16.20 - 17.10",
    matkul: null,
    status: "NON AVAILABLE",
  },
  {
    id: 12,
    hari: "Senin",
    waktu: "17.10 - 18.00",
    matkul: null,
    status: "NON AVAILABLE",
  },
];

// ─── Badge Status ─────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  if (status === "AVAILABLE") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-[#fff3e0] text-[#f57c00] text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#f57c00]" />
        AVAILABLE
      </span>
    );
  }
  if (status === "BOOKED") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-[#e0f7f4] text-[#0d7c6b] text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0d7c6b]" />
        BOOKED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-400 text-[10px] font-extrabold px-3 py-1.5 rounded-full tracking-wider">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
      NON AVAILABLE
    </span>
  );
}

// ─── Modal Edit Jadwal ────────────────────────────────────────────────────────

function EditJadwalModal({ onClose, onSave }) {
  const [formHari, setFormHari] = useState("Senin");
  const [formJam, setFormJam] = useState("16.20 - 17.10");
  const [formMatkul, setFormMatkul] = useState("Jaringan Komputer");
  const [formStatus, setFormStatus] = useState("Available");

  const selectClass =
    "w-full bg-[#f1f3f5] text-[#0a0f44] text-sm font-medium rounded-2xl px-4 py-3.5 appearance-none border-none outline-none cursor-pointer";

  const handleSave = () => {
    onSave({
      hari: formHari,
      jam: formJam,
      matkul: formMatkul,
      status: formStatus,
    });
    onClose();
  };

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="bg-white rounded-3xl shadow-2xl p-5 relative"
        style={{ width: "380px" }}
      >
        {/* Tombol tutup */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Judul */}
        <h2 className="text-2xl font-extrabold text-[#0a0f44]">Edit Jadwal</h2>
        <p className="text-sm text-slate-400 mt-1 mb-7">
          Tentukan waktu ketersediaan mengajar Anda.
        </p>

        {/* Form */}
        <div className="flex flex-col gap-1">
          {/* Pilih Hari */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">
              Pilih Hari
            </label>
            <div className="relative">
              <select
                value={formHari}
                onChange={(e) => setFormHari(e.target.value)}
                className={selectClass}
              >
                {HARI_OPTIONS.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </span>
            </div>
          </div>

          {/* Pilih Jam */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">
              Pilih Jam
            </label>
            <div className="relative">
              <select
                value={formJam}
                onChange={(e) => setFormJam(e.target.value)}
                className={selectClass}
              >
                {JAM_OPTIONS.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </span>
            </div>
          </div>

          {/* Pilih Mata Kuliah */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">
              Pilih Mata Kuliah
            </label>
            <div className="relative">
              <select
                value={formMatkul}
                onChange={(e) => setFormMatkul(e.target.value)}
                className={selectClass}
              >
                {MATKUL_OPTIONS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </span>
            </div>
          </div>

          {/* Pilih Status */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2 block">
              Pilih Status
            </label>
            <div className="relative">
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                className={selectClass}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </span>
            </div>
          </div>

          {/* Info Box */}
          <div className="flex items-start gap-3 bg-[#fff3e8] rounded-2xl p-4">
            <Info className="h-4 w-4 text-[#f57c00] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#b45309] leading-relaxed">
              Pastikan waktu yang Anda pilih tidak bertabrakan dengan jadwal
              yang sudah ada untuk menjaga kualitas sesi pembelajaran.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-6 mt-1 pt-1 border-t border-slate-100">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Batal
          </button>
          <Button
            onClick={handleSave}
            className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-7 py-3 h-auto rounded-2xl text-sm transition-colors duration-150"
          >
            Simpan Jadwal
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────

export default function PengaturanJadwal() {
  const [jadwal, setJadwal] = useState(INITIAL_JADWAL);
  const [filterHari, setFilterHari] = useState("Senin");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [showModal, setShowModal] = useState(false);

  const handleSaveJadwal = ({ hari, jam, matkul, status }) => {
    setJadwal((prev) =>
      prev.map((item) => {
        if (item.hari === hari && item.waktu === jam) {
          return {
            ...item,
            matkul: status === "Non Available" ? null : matkul,
            status: status === "Available" ? "AVAILABLE" : "NON AVAILABLE",
          };
        }
        return item;
      }),
    );
  };

  const handleResetFilter = () => {
    setFilterHari("Senin");
    setFilterStatus("Semua Status");
  };

  const filtered = jadwal.filter((item) => {
    const hariMatch = item.hari === filterHari;
    const statusMatch =
      filterStatus === "Semua Status" ||
      item.status === filterStatus.toUpperCase().replace(" ", " ");
    return hariMatch && statusMatch;
  });

  const selectClass =
    "bg-white border border-slate-200 text-[#0a0f44] text-sm font-semibold rounded-xl px-4 py-2.5 appearance-none outline-none cursor-pointer pr-8";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-7 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
            Pengaturan Jadwal
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Atur ketersediaan jadwalmu mengajar.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#f0fdf9] border border-[#b2ece0] text-[#0d7c6b] text-xs font-semibold px-4 py-2.5 rounded-xl">
          <RotateCcw className="h-3.5 w-3.5" />
          Jadwal otomatis reset setelah 24 jam
        </div>
      </div>

      {/* Tombol Edit Jadwal */}
      <Button
        onClick={() => setShowModal(true)}
        className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-6 py-3 h-auto rounded-2xl text-sm gap-2 flex items-center transition-colors duration-150 mb-7"
      >
        <Plus className="h-4 w-4" />
        Edit Jadwal
      </Button>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
            Pilih Hari
          </p>
          <div className="relative">
            <select
              value={filterHari}
              onChange={(e) => setFilterHari(e.target.value)}
              className={selectClass}
            >
              {HARI_OPTIONS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▾
            </span>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
            Status
          </p>
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={selectClass}
            >
              {["Semua Status", "AVAILABLE", "BOOKED", "NON AVAILABLE"].map(
                (s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ),
              )}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
              ▾
            </span>
          </div>
        </div>

        <div className="ml-auto mt-5">
          <button
            onClick={handleResetFilter}
            className="flex items-center gap-1.5 text-[#0d7c6b] text-sm font-semibold hover:underline"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Filter
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Header tabel */}
        <div className="grid grid-cols-[60px_1fr_1fr_1fr_1fr] px-6 py-3 border-b border-slate-100">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            No
          </span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Hari
          </span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Waktu Operasional
          </span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Mata Kuliah
          </span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Status
          </span>
        </div>

        {/* Baris */}
        {filtered.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-[60px_1fr_1fr_1fr_1fr] px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors duration-100 items-center"
          >
            <span className="text-sm text-slate-400 font-semibold">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-extrabold text-[#0a0f44]">
              {item.hari}
            </span>
            <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <Clock className="h-3.5 w-3.5 text-[#0d7c6b]" />
              {item.waktu}
            </span>
            <span className="text-sm font-bold text-[#0a0f44]">
              {item.matkul ?? (
                <span className="text-slate-300 font-normal">-</span>
              )}
            </span>
            <StatusBadge status={item.status} />
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <EditJadwalModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveJadwal}
        />
      )}
    </div>
  );
}
