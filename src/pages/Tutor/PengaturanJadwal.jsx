import { useCallback, useEffect, useRef, useState } from "react";
import { Clock, Plus, X, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatusBadge from "@/components/shared/StatusBadge";
import axios from "@/lib/axios";

// ─── Konstanta ────────────────────────────────────────────────────────────────

const HARI_OPTIONS = [
  "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu",
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

// Mapping hari English → Indonesia (sesuai field `day` di response GET /tutor/availability)
const DAY_MAP = {
  Monday: "Senin", Tuesday: "Selasa", Wednesday: "Rabu",
  Thursday: "Kamis", Friday: "Jumat", Saturday: "Sabtu", Sunday: "Minggu",
};

// Mapping hari Indonesia → English (untuk payload POST /tutor/availability)
const DAY_MAP_REVERSE = Object.fromEntries(
  Object.entries(DAY_MAP).map(([en, id]) => [id, en])
);

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Buat grid penuh 84 slot (7 hari × 12 jam), semuanya NON AVAILABLE secara default.
 * Ini merepresentasikan kondisi awal tutor baru — belum ada slot yang dibuka.
 */
function buildDefaultGrid() {
  return HARI_OPTIONS.flatMap((hari) =>
    JAM_OPTIONS.map((waktu) => ({ hari, waktu, status: "NON AVAILABLE" }))
  );
}

/**
 * Normalisasi satu item dari response GET /tutor/availability.
 * Backend mengembalikan: { id, day (Indonesia), time ("HH:MM - HH:MM"), status }
 * Kita ubah `time` dari "07:00 - 07:50" → "07.00 - 07.50" agar cocok JAM_OPTIONS.
 */
function normalizeApiSlot(item) {
  return {
    hari: item.day,                               // sudah Bahasa Indonesia
    waktu: item.time?.replace(/:/g, ".") ?? "-",  // "07:00 - 07:50" → "07.00 - 07.50"
    status: item.status?.toUpperCase() ?? "NON AVAILABLE",
  };
}

/**
 * Overlay slot dari API ke atas grid default.
 * Slot yang ada di DB menimpa baris default (berdasarkan hari + waktu).
 */
function mergeGrid(apiSlots) {
  const grid = buildDefaultGrid();
  const apiMap = new Map(
    apiSlots.map((s) => [`${s.hari}||${s.waktu}`, s])
  );
  return grid.map((slot) => apiMap.get(`${slot.hari}||${slot.waktu}`) ?? slot);
}

/**
 * Bangun lookup: "HH:MM - HH:MM" → master_slot_id
 * dari response GET /master-slots: [{id, start_time:"07:00:00", end_time:"07:50:00"}]
 * Kita singkat waktu jadi "HH:MM" (hapus ":SS") untuk key.
 */
function buildMasterSlotMap(masterSlots) {
  const map = new Map();
  for (const ms of masterSlots) {
    const start = ms.start_time.substring(0, 5); // "07:00:00" → "07:00"
    const end = ms.end_time.substring(0, 5);     // "07:50:00" → "07:50"
    map.set(`${start} - ${end}`, ms.id);         // "07:00 - 07:50" → id
  }
  return map;
}

/**
 * Konversi waktu format JAM_OPTIONS ("07.00 - 07.50") ke format colon ("07:00 - 07:50")
 * agar cocok dengan key di masterSlotMap.
 */
function dotToColonRange(waktuDot) {
  return waktuDot.replace(/\./g, ":");
}

// ─── Modal Edit Jadwal ────────────────────────────────────────────────────────

function EditJadwalModal({ onClose, onSave, isSaving, saveError }) {
  const [formHari, setFormHari] = useState("Senin");
  const [formJam, setFormJam] = useState("07.00 - 07.50");
  const [formStatus, setFormStatus] = useState("Available");

  const selectClass =
    "w-full bg-[#f1f3f5] text-[#0a0f44] text-sm font-medium rounded-2xl px-4 py-3 appearance-none border-none outline-none cursor-pointer";

  const handleSave = () => {
    onSave({ hari: formHari, jam: formJam, status: formStatus });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-5 pb-4 relative" style={{ width: "380px" }}>
        <button
          onClick={onClose}
          disabled={isSaving}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 disabled:opacity-40"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-xl font-extrabold text-[#0a0f44]">Edit Jadwal</h2>
        <p className="text-sm text-slate-400 mt-0.5 mb-4">
          Tentukan waktu ketersediaan mengajar Anda.
        </p>

        <div className="flex flex-col gap-3">
          {/* Hari */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
              Pilih Hari
            </label>
            <div className="relative">
              <select value={formHari} onChange={(e) => setFormHari(e.target.value)} className={selectClass}>
                {HARI_OPTIONS.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
            </div>
          </div>

          {/* Jam */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
              Pilih Jam
            </label>
            <div className="relative">
              <select value={formJam} onChange={(e) => setFormJam(e.target.value)} className={selectClass}>
                {JAM_OPTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5 block">
              Pilih Status
            </label>
            <div className="relative">
              <select value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className={selectClass}>
                <option value="Available">Available</option>
                <option value="Non Available">Non Available</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#fff3e8] rounded-2xl p-3">
            <Info className="h-4 w-4 text-[#f57c00] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#b45309] leading-relaxed">
              Slot yang sudah <strong>BOOKED</strong> tidak dapat diubah.
              Pastikan waktu yang Anda pilih sesuai ketersediaan Anda.
            </p>
          </div>

          {/* Error dari API ditampilkan di dalam modal agar user bisa baca */}
          {saveError && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium leading-relaxed">
              {saveError}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-6 mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="text-sm font-semibold text-slate-400 hover:text-slate-600 disabled:opacity-40"
          >
            Batal
          </button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-6 py-2.5 h-auto rounded-2xl text-sm flex items-center gap-2"
          >
            {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isSaving ? "Menyimpan..." : "Simpan Jadwal"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Halaman Utama ────────────────────────────────────────────────────────────

export default function PengaturanJadwal() {
  // Grid 84 slot — selalu penuh, default NON AVAILABLE
  const [jadwal, setJadwal] = useState(buildDefaultGrid);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [filterHari, setFilterHari] = useState("Semua Hari");
  const [filterStatus, setFilterStatus] = useState("Semua Status");
  const [showModal, setShowModal] = useState(false);

  // masterSlotMap: "07:00 - 07:50" → master_slot_id (integer)
  // Disimpan di ref karena tidak perlu re-render saat berubah
  const masterSlotMapRef = useRef(new Map());

  // ── 1. Fetch master slots → bangun map "HH:MM - HH:MM" → master_slot_id ──
  const fetchMasterSlots = useCallback(async () => {
    try {
      // GET /master-slots → { data: [{id, start_time:"07:00:00", end_time:"07:50:00"}] }
      const res = await axios.get("/master-slots");
      const data = res.data?.data ?? [];
      if (data.length === 0) {
        console.warn("Master slots kosong — pastikan seeder sudah dijalankan.");
        return;
      }
      masterSlotMapRef.current = buildMasterSlotMap(data);
      console.log("[PengaturanJadwal] Master slots loaded:", masterSlotMapRef.current.size, "entries");
    } catch (err) {
      console.error("[PengaturanJadwal] Gagal mengambil master slots:", err);
    }
  }, []);

  // ── 2. Fetch jadwal tutor dari DB, overlay ke atas grid ───────────────────
  const fetchJadwal = useCallback(async () => {
    setIsLoading(true);
    try {
      // GET /tutor/availability → { data: [{id, day, time, status}] }
      const res = await axios.get("/tutor/availability");
      const rawData = res.data?.data ?? [];
      const normalized = rawData.map(normalizeApiSlot);
      setJadwal(mergeGrid(normalized));
    } catch (err) {
      console.error("[PengaturanJadwal] Gagal mengambil jadwal:", err);
      setJadwal(buildDefaultGrid());
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch keduanya saat mount — master slots dulu, lalu jadwal
  useEffect(() => {
    const init = async () => {
      await fetchMasterSlots(); // pastikan map sudah siap sebelum jadwal tampil
      await fetchJadwal();
    };
    init();
  }, [fetchMasterSlots, fetchJadwal]);

  // ── 3. Simpan perubahan slot ───────────────────────────────────────────────
  const handleSaveJadwal = async ({ hari, jam, status }) => {
    setSaveError("");

    // Cegah edit slot BOOKED
    const target = jadwal.find((s) => s.hari === hari && s.waktu === jam);
    if (target?.status === "BOOKED") {
      setSaveError("Slot ini sudah BOOKED dan tidak dapat diubah.");
      return;
    }

    const newStatus = status === "Available" ? "AVAILABLE" : "NON AVAILABLE";

    // Hitung state jadwal setelah perubahan diterapkan (untuk optimistic update)
    const updatedJadwal = jadwal.map((slot) =>
      slot.hari === hari && slot.waktu === jam
        ? { ...slot, status: newStatus }
        : slot
    );

    // Optimistic update — perbarui UI sebelum tunggu response API
    setJadwal(updatedJadwal);
    setIsSaving(true);

    try {
      // Jika master slot map belum terisi (fetch pertama gagal), coba ulang sekarang
      if (masterSlotMapRef.current.size === 0) {
        console.warn("[PengaturanJadwal] Master slot map kosong, mencoba fetch ulang...");
        await fetchMasterSlots();
      }

      if (masterSlotMapRef.current.size === 0) {
        throw new Error("Data master slot tidak tersedia. Coba refresh halaman.");
      }

      const masterSlotMap = masterSlotMapRef.current;

      /**
       * Backend POST /tutor/availability pakai strategi REPLACE ALL:
       *   1. Hapus semua availability_slots milik tutor ini
       *   2. Insert ulang dari array `slots` yang dikirim
       *
       * Payload: { slots: [{ day_of_week, master_slot_id, is_active }] }
       *
       * Kita kirim SEMUA slot AVAILABLE dari state terbaru.
       * Slot NON AVAILABLE tidak dikirim — absen dari array = NON AVAILABLE di DB.
       */
      const slots = updatedJadwal
        .filter((slot) => slot.status === "AVAILABLE")
        .map((slot) => {
          // "07.00 - 07.50" → "07:00 - 07:50" untuk lookup ke masterSlotMap
          const timeKey = dotToColonRange(slot.waktu);
          const masterSlotId = masterSlotMap.get(timeKey);

          if (!masterSlotId) {
            throw new Error(
              `Master slot tidak ditemukan untuk waktu "${slot.waktu}". ` +
              `Key yang dicari: "${timeKey}". ` +
              `Keys tersedia: [${[...masterSlotMap.keys()].join(", ")}]`
            );
          }

          return {
            day_of_week: DAY_MAP_REVERSE[slot.hari], // "Senin" → "Monday"
            master_slot_id: masterSlotId,
            is_active: true,
          };
        });

      console.log("[PengaturanJadwal] POST /tutor/availability payload:", { slots });

      // POST /tutor/availability
      const res = await axios.post("/tutor/availability", { slots });
      console.log("[PengaturanJadwal] Save success:", res.data?.message);

      // Re-fetch agar tampilan sinkron dengan DB
      await fetchJadwal();
      setShowModal(false);

    } catch (err) {
      console.error("[PengaturanJadwal] Gagal menyimpan jadwal:", err);
      const msg =
        err.response?.data?.message ??
        err.response?.data?.errors?.slots?.[0] ??
        err.message ??
        "Gagal menyimpan jadwal. Coba lagi.";
      setSaveError(msg);
      // Rollback optimistic update ke data DB
      await fetchJadwal();
    } finally {
      setIsSaving(false);
    }
  };

  // ── 4. Filter & Sort ──────────────────────────────────────────────────────
  const displayed = jadwal
    .filter((item) => {
      const hariOk = filterHari === "Semua Hari" || item.hari === filterHari;
      const statusOk = filterStatus === "Semua Status" || item.status === filterStatus;
      return hariOk && statusOk;
    })
    .sort((a, b) => {
      const hariDiff = HARI_OPTIONS.indexOf(a.hari) - HARI_OPTIONS.indexOf(b.hari);
      if (hariDiff !== 0) return hariDiff;
      return JAM_OPTIONS.indexOf(a.waktu) - JAM_OPTIONS.indexOf(b.waktu);
    });

  const selectClass =
    "bg-white border border-slate-200 text-[#0a0f44] text-sm font-semibold rounded-xl px-4 py-2.5 appearance-none outline-none cursor-pointer pr-8";

  // ── 5. Render ─────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-full pb-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">Pengaturan Jadwal</h1>
        <p className="text-slate-500">Atur ketersediaan jadwalmu mengajar.</p>
      </div>

      {/* Tombol buka modal */}
      <Button
        onClick={() => { setSaveError(""); setShowModal(true); }}
        className="w-fit bg-[#0a0f44] hover:bg-[#151a5c] text-white font-bold px-6 py-3 h-auto rounded-2xl text-sm gap-2 flex items-center mb-7"
      >
        <Plus className="h-4 w-4" />
        Edit Jadwal
      </Button>

      {/* Error banner */}
      {saveError && (
        <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium">
          {saveError}
        </div>
      )}

      {/* Filter */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Pilih Hari</p>
          <div className="relative">
            <select value={filterHari} onChange={(e) => setFilterHari(e.target.value)} className={selectClass}>
              <option value="Semua Hari">Semua Hari</option>
              {HARI_OPTIONS.map((h) => <option key={h} value={h}>{h}</option>)}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">Status</p>
          <div className="relative">
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className={selectClass}>
              {["Semua Status", "AVAILABLE", "BOOKED", "NON AVAILABLE"].map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▾</span>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_1fr_1fr] px-6 py-3 border-b border-slate-100">
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">No</span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Hari</span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Waktu Operasional</span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest text-center">Status</span>
        </div>

        {isLoading ? (
          <div className="py-16 flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
            <Loader2 className="h-4 w-4 animate-spin" />
            Memuat data jadwal...
          </div>
        ) : displayed.length === 0 ? (
          <div className="py-16 text-center text-sm text-slate-400">
            Tidak ada jadwal untuk filter ini.
          </div>
        ) : (
          displayed.map((item, index) => (
            // Key unik berdasarkan hari + waktu (bukan ID DB)
            <div
              key={`${item.hari}-${item.waktu}`}
              className="grid grid-cols-[60px_1fr_1fr_1fr] px-6 py-4 border-b border-slate-50 hover:bg-slate-50 transition-colors items-center"
            >
              <span className="text-sm text-slate-400 font-semibold">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-extrabold text-[#0a0f44]">{item.hari}</span>
              <span className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                <Clock className="h-3.5 w-3.5 text-[#0d7c6b]" />
                {item.waktu}
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
          onClose={() => !isSaving && setShowModal(false)}
          onSave={handleSaveJadwal}
          isSaving={isSaving}
          saveError={saveError}
        />
      )}
    </div>
  );
}
