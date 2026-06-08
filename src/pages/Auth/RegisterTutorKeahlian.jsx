import { useState } from "react";
import { CheckCircle2, X, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  { label: "Input Keahlian", status: "active" },
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
            `}>
              {step.status === "done" ? <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} /> : <span>{idx + 1}</span>}
            </div>
            <p className={`text-[10px] font-bold mt-2 uppercase tracking-wide whitespace-nowrap ${step.status === "active" ? "text-[#0F1D8C]" : "text-slate-400"}`}>
              STEP {idx + 1}
            </p>
            <span className={`text-xs font-semibold whitespace-nowrap ${step.status === "active" ? "text-[#0F1D8C]" : "text-slate-400"}`}>
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

const SUGGESTED = ["Java", "Python", "SQL", "Machine Learning", "Data Analysis", "Public Speaking", "Web Development", "Artificial Intelligence", "UI/UX Design"];

export default function RegisterTutorKeahlian() {
  const navigate = useNavigate();
  const [skills, setSkills] = useState(["Java", "Python", "SQL", "Machine Learning", "Data Analysis", "Public Speaking", "Web Development", "Artificial Intelligence", "UI/UX Design"]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const addSkill = () => {
    const val = input.trim();
    if (!val) return;
    if (skills.includes(val)) { setError("Keahlian sudah ditambahkan."); return; }
    setSkills((prev) => [...prev, val]);
    setInput("");
    setError("");
  };

  const removeSkill = (s) => setSkills((prev) => prev.filter((x) => x !== s));

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); addSkill(); }
  };

  const handleNext = () => {
    if (skills.length === 0) { setError("Harap tambahkan minimal satu keahlian."); return; }
    navigate("/register/tutor/tinjauan");
  };

  return (
    <div className="min-h-screen bg-[#f1f3f8] font-sans">
      <header className="bg-white border-b border-slate-100 px-8 py-4">
        <KonekDinLogo />
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 md:p-10">
          <Stepper />

          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#0F1D8C] tracking-tight mb-2">Keahlian yang Dimiliki</h1>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Tambahkan keterampilan teknis maupun interpersonal yang Anda kuasai untuk mencocokkan Anda dengan murid yang tepat.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col gap-5">
            <p className="text-sm font-bold text-[#0F1D8C]">Keahlian</p>

            {/* Input row */}
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

            {/* Skill chips */}
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1.5 bg-[#0d7c6b] text-white text-xs font-semibold px-3.5 py-2 rounded-full">
                    {s}
                    <button onClick={() => removeSkill(s)} className="hover:text-[#b3e8d8] transition-colors">
                      <X className="w-3 h-3" strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Suggested */}
            {skills.length === 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-2">Saran keahlian:</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED.map((s) => (
                    <button key={s} onClick={() => setSkills((prev) => [...prev, s])}
                      className="inline-flex items-center gap-1 bg-[#e0faf3] text-[#0d7c6b] border border-[#b3e8d8] text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-[#0d7c6b] hover:text-white transition-all">
                      {s} <Plus className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
            <button onClick={() => navigate("/register/tutor/mata-kuliah")}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0d7c6b] hover:text-[#0a5a4e] transition-colors">
              ← Kembali
            </button>
            {skills.length > 0 && (
              <button onClick={handleNext}
                className="bg-[#0F1D8C] hover:bg-[#0b166e] text-white font-bold px-8 py-3 rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-150">
                Langkah Selanjutnya
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
