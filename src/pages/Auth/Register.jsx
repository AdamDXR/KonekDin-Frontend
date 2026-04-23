import { useState } from 'react'
import {
  Mail, Lock, Eye, EyeOff, User, GraduationCap,
  BookOpen, ChevronRight, ChevronLeft, Check
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const ROLES = [
  {
    id: 'learner',
    label: 'Mahasiswa / Learner',
    desc: 'Cari tutor & tingkatkan prestasimu',
    icon: BookOpen,
  },
  {
    id: 'tutor',
    label: 'Tutor / Mentor',
    desc: 'Bagikan ilmu & dapatkan penghasilan',
    icon: GraduationCap,
  },
]

const steps = ['Pilih Peran', 'Data Diri', 'Akun & Kata Sandi']

export default function Register() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState(null)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    university: '',
    prodi: '',
    nim: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Dummy: langsung ke halaman learner atau tutor
    navigate(role === 'tutor' ? '/tutor' : '/learner')
  }

  const canNext1 = role !== null
  const canNext2 = form.fullName.trim() && form.email.trim() && form.university.trim()
  const canSubmit = form.password.length >= 6 && form.password === form.confirmPassword && agreed

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4 font-sans">
      <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-2xl overflow-hidden flex-col md:flex-row">

        {/* ===== LEFT: Branding ===== */}
        <div className="relative w-full md:w-5/12 bg-[#1a1a4b] text-white p-10 flex flex-col justify-between hidden md:flex">
          <div className="flex items-center space-x-2 z-10">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold tracking-tight">KonekDin</span>
          </div>

          <div className="z-10 mt-16 mb-20 space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
              Bergabunglah &<br />Mulai Perjalananmu.
            </h1>
            <p className="text-slate-300 text-base leading-relaxed max-w-sm">
              Daftar sekarang dan temukan tutor terbaik atau mulai berbagi ilmumu bersama ribuan mahasiswa.
            </p>

            {/* Step indicator */}
            <div className="space-y-3 pt-4">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 transition-all ${
                    step > i + 1
                      ? 'bg-teal-400 border-teal-400 text-white'
                      : step === i + 1
                      ? 'bg-white border-white text-[#1a1a4b]'
                      : 'bg-transparent border-slate-500 text-slate-500'
                  }`}>
                    {step > i + 1 ? <Check className="h-3.5 w-3.5" /> : i + 1}
                  </div>
                  <span className={`text-sm font-medium ${
                    step === i + 1 ? 'text-white' : step > i + 1 ? 'text-teal-300' : 'text-slate-500'
                  }`}>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="z-10 text-sm text-slate-400">© 2026 KonekDin. All rights reserved.</div>

          {/* Decorative blobs */}
          <div className="absolute inset-0 z-0">
            <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#2b2b73] rounded-full blur-3xl opacity-50" />
            <div className="absolute top-10 -right-20 w-64 h-64 bg-[#393992] rounded-full blur-3xl opacity-30" />
          </div>
        </div>

        {/* ===== RIGHT: Form ===== */}
        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto">

            {/* Mobile logo */}
            <div className="flex items-center space-x-2 mb-8 md:hidden">
              <div className="bg-[#1a1a4b] p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800">KonekDin</span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.14em] text-teal-500 uppercase mb-1">
                Langkah {step} dari {steps.length}
              </p>
              <h2 className="text-3xl font-bold text-slate-800 mb-1">{steps[step - 1]}</h2>
              <p className="text-slate-500 text-sm">
                {step === 1 && 'Pilih peran yang sesuai dengan kamu.'}
                {step === 2 && 'Lengkapi informasi diri kamu.'}
                {step === 3 && 'Buat kata sandi untuk akunmu.'}
              </p>
            </div>

            {/* ===== STEP 1: Pilih Peran ===== */}
            {step === 1 && (
              <div className="space-y-4">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                      role === r.id
                        ? 'border-[#1a1a4b] bg-[#f0f0ff]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      role === r.id ? 'bg-[#1a1a4b] text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <r.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{r.label}</p>
                      <p className="text-sm text-slate-400 mt-0.5">{r.desc}</p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      role === r.id ? 'border-[#1a1a4b]' : 'border-slate-300'
                    }`}>
                      {role === r.id && <div className="h-2.5 w-2.5 rounded-full bg-[#1a1a4b]" />}
                    </div>
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={!canNext1}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold text-white bg-[#1a1a4b] hover:bg-[#121235] disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-4"
                >
                  Lanjut <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* ===== STEP 2: Data Diri ===== */}
            {step === 2 && (
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleNext() }}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text" name="fullName" value={form.fullName} onChange={handleChange}
                      required placeholder="Nama sesuai KTP"
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="email" name="email" value={form.email} onChange={handleChange}
                      required placeholder="nama@email.com"
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* University */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Universitas</label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text" name="university" value={form.university} onChange={handleChange}
                      required placeholder="Nama universitas kamu"
                      className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* NIM & Prodi — only for learner */}
                {role === 'learner' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">NIM</label>
                      <input
                        type="text" name="nim" value={form.nim} onChange={handleChange}
                        placeholder="A11.2024.xxxxx"
                        className="block w-full px-3 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] transition-colors text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Program Studi</label>
                      <input
                        type="text" name="prodi" value={form.prodi} onChange={handleChange}
                        placeholder="Teknik Informatika"
                        className="block w-full px-3 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] transition-colors text-sm"
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-1">
                  <button
                    type="button" onClick={handleBack}
                    className="flex items-center gap-1 px-4 py-3 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Kembali
                  </button>
                  <button
                    type="submit" disabled={!canNext2}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold text-white bg-[#1a1a4b] hover:bg-[#121235] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Lanjut <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ===== STEP 3: Kata Sandi ===== */}
            {step === 3 && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type={showPass ? 'text' : 'password'} name="password" value={form.password} onChange={handleChange}
                      required placeholder="Minimal 6 karakter"
                      className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] transition-colors text-sm"
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPass ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {/* Password strength */}
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${
                        form.password.length === 0 ? 'bg-slate-200'
                        : form.password.length < 6 && i === 1 ? 'bg-red-400'
                        : form.password.length >= 6 && form.password.length < 10 && i <= 2 ? 'bg-yellow-400'
                        : form.password.length >= 10 ? 'bg-teal-400'
                        : 'bg-slate-200'
                      }`} />
                    ))}
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Konfirmasi Kata Sandi</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={form.confirmPassword} onChange={handleChange}
                      required placeholder="Ulangi kata sandi"
                      className={`block w-full pl-10 pr-10 py-3 border rounded-lg text-slate-900 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors text-sm ${
                        form.confirmPassword && form.password !== form.confirmPassword
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-slate-200 focus:ring-[#1a1a4b]'
                      }`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {form.confirmPassword && form.password !== form.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">Kata sandi tidak cocok</p>
                  )}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                    className="h-4 w-4 mt-0.5 accent-[#1a1a4b] cursor-pointer flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer leading-relaxed">
                    Saya menyetujui{' '}
                    <a href="#" className="font-semibold text-[#1a1a4b] hover:underline">Syarat & Ketentuan</a>
                    {' '}dan{' '}
                    <a href="#" className="font-semibold text-[#1a1a4b] hover:underline">Kebijakan Privasi</a>
                    {' '}KonekDin.
                  </label>
                </div>

                <div className="flex gap-3 pt-1">
                  <button
                    type="button" onClick={handleBack}
                    className="flex items-center gap-1 px-4 py-3 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" /> Kembali
                  </button>
                  <button
                    type="submit" disabled={!canSubmit}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold text-white bg-[#1a1a4b] hover:bg-[#121235] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Check className="h-4 w-4" /> Daftar Sekarang
                  </button>
                </div>
              </form>
            )}

            {/* Link to Login */}
            <p className="mt-8 text-center text-sm text-slate-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="font-semibold text-[#1a1a4b] hover:underline transition-all">
                Masuk Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
