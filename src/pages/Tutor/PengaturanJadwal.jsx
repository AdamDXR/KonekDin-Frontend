import { useState } from "react";
import { Clock, Plus, X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Badge Status ──────────────────────────────────────────────────────────────

function StatusBadge({ status }) {
  if (status === "AVAILABLE") {
    return (
      <span className="inline-flex items-center justify-center bg-[#fdeed9] text-[#e87714] text-[10px] font-extrabold px-4 py-1.5 rounded-full tracking-wider">
        AVAILABLE
      </span>
    );
  }
  if (status === "BOOKED") {
    return (
      <span className="inline-flex items-center justify-center bg-[#e5efeb] text-[#0a6d63] text-[10px] font-extrabold px-4 py-1.5 rounded-full tracking-wider">
        BOOKED
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center bg-[#e8eaef] text-[#696d76] text-[10px] font-extrabold px-4 py-1.5 rounded-full tracking-wider">
      NON AVAILABLE
    </span>
  );
}

// ─── Modal Edit Jadwal ─────────────────────────────────────────────────────────

function EditJadwalModal({ onClose, onSave }) {
  const [formHari, setFormHari] = useState("Senin");
  const [formJam, setFormJam] = useState("07.00 - 07.50");
  const [formMatkul, setFormMatkul] = useState("Basis Data");
  const [formStatus, setFormStatus] = useState("Available");
  const [error, setError] = useState("");

  const selectClass =
    "w-full bg-[#f1f3f5] text-[#0a0f44] text-sm font-medium rounded-2xl px-4 py-3 appearance-none border-none outline-none cursor-pointer";

  const handleSave = () => {
    if (!formHari || !formJam || !formMatkul || !formStatus) {
      setError("Semua field harus diisi.");
      return;
    }
    onSave({
      hari: formHari,
      jam: formJam,
      matkul: formMatkul,
      status: formStatus,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className="bg-white rounded-3xl shadow-2xl p-5 pb-4 relative"
        style={{ width: "380px" }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-extrabold text-[#0a0f44]">Edit Jadwal</h2>
        <p className="text-sm text-slate-400 mt-0.5 mb-4">
          Tentukan waktu ketersediaan mengajar Anda.
        </p>

        <div className="flex flex-col gap-3">
          {/* Pilih Hari */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
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
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
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
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
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
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
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

          {/* Error */}
          {error && (
            <p className="text-xs text-red-500 font-semibold">{error}</p>
          )}

          {/* Info Box */}
          <div className="flex items-start gap-3 bg-[#fff3e8] rounded-2xl p-3">
            <Info className="h-4 w-4 text-[#f57c00] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#b45309] leading-relaxed">
              Pastikan waktu yang Anda pilih tidak bertabrakan dengan jadwal
              yang sudah ada untuk menjaga kualitas sesi pembelajaran.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-6 mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600"
          >
            Batal
          </button>
          <Button
            onClick={handleSave}
            className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-6 py-2.5 h-auto rounded-2xl text-sm"
          >
            Simpan Jadwal
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ─────────────────────────────────────────────────────────────

export default function PengaturanJadwal() {
  const [jadwal, setJadwal] = useState(INITIAL_JADWAL);
  const [filterHari, setFilterHari] = useState("Senin");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [showModal, setShowModal] = useState(false);
  const [nextId, setNextId] = useState(100);

  const handleSaveJadwal = ({ hari, jam, matkul, status }) => {
    const statusUpper = status === "Available" ? "AVAILABLE" : "NON AVAILABLE";
    const matkulValue = status === "Non Available" ? null : matkul;

    // Cek apakah hari + jam sudah ada → update baris itu
    const exists = jadwal.find(
      (item) => item.hari === hari && item.waktu === jam,
    );

    if (exists) {
      setJadwal((prev) =>
        prev.map((item) =>
          item.hari === hari && item.waktu === jam
            ? { ...item, matkul: matkulValue, status: statusUpper }
            : item,
        ),
      );
    } else {
      // Belum ada → tambah baris baru
      setJadwal((prev) => [
        ...prev,
        {
          id: nextId,
          hari,
          waktu: jam,
          matkul: matkulValue,
          status: statusUpper,
        },
      ]);
      setNextId((n) => n + 1);
    }
  };



  const filtered = jadwal.filter((item) => {
    const hariMatch = item.hari === filterHari;
    const statusMatch =
      filterStatus === "Semua Status" || item.status === filterStatus;
    return hariMatch && statusMatch;
  });

  // Urutkan berdasarkan JAM_OPTIONS
  const sorted = [...filtered].sort((a, b) => {
    return JAM_OPTIONS.indexOf(a.waktu) - JAM_OPTIONS.indexOf(b.waktu);
  });

  const selectClass =
    "bg-white border border-slate-200 text-[#0a0f44] text-sm font-semibold rounded-xl px-4 py-2.5 appearance-none outline-none cursor-pointer pr-8";

  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">
          Pengaturan Jadwal
        </h1>
        <p className="text-slate-500">
          Atur ketersediaan jadwalmu mengajar.
        </p>
      </div>

      {/* Tombol Edit Jadwal */}
      <Button
        onClick={() => setShowModal(true)}
        className="w-fit bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-6 py-3 h-auto rounded-2xl text-sm gap-2 flex items-center mb-7"
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

      </div>

      {/* Tabel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
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
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">
            Status
          </span>
        </div>

        {sorted.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">
            Tidak ada jadwal untuk filter ini.
          </div>
        ) : (
          sorted.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-[60px_1fr_1fr_1fr_1fr] px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors items-center"
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
              <div className="flex justify-center">
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))
        )}
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
