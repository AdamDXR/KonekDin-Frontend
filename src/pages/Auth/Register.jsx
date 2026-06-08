import { useState } from 'react'
import {
  Mail, Lock, User, RotateCcw, Eye, EyeOff
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Register() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Dummy submit, arahkan ke learner
    navigate('/learner')
  }

  const isPasswordMatch = form.confirmPassword ? form.password === form.confirmPassword : true

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f6] font-sans">
      {/* Container utama (tengah) */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="flex w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden flex-col md:flex-row">
        
          {/* KOLOM KIRI: Visual Branding */}
          <div className="relative w-full md:w-5/12 bg-[#0a0f44] text-white p-10 flex flex-col justify-between hidden md:flex overflow-hidden">
            
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students studying" 
                className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-[#0a0f44]/80 mix-blend-multiply"></div>
              {/* Extra gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f44] via-transparent to-[#0a0f44]/50"></div>
            </div>

            <div className="flex items-center z-10">
              <img src="/images/logo_konekdin.png" alt="Logo KonekDin" className="h-12 w-auto" />
            </div>

            {/* Headline Body */}
            <div className="z-10 mt-16 mb-20 space-y-6">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
                Membangun Jembatan <br /> Akademik Masa Depan.
              </h1>
              <p className="text-slate-300 text-[15px] leading-relaxed max-w-[280px]">
                Bergabunglah dengan ribuan mahasiswa dan mentor profesional dalam ekosistem pembelajaran kolaboratif terbaik.
              </p>
            </div>

            {/* Footer Branding / Avatars */}
            <div className="z-10 flex flex-col space-y-4">
              <div className="flex -space-x-3">
                <img className="w-11 h-11 rounded-full border-[3px] border-[#0a0f44] object-cover" src="https://i.pravatar.cc/100?img=1" alt="User" />
                <img className="w-11 h-11 rounded-full border-[3px] border-[#0a0f44] object-cover" src="https://i.pravatar.cc/100?img=2" alt="User" />
                <img className="w-11 h-11 rounded-full border-[3px] border-[#0a0f44] object-cover" src="https://i.pravatar.cc/100?img=3" alt="User" />
                <div className="w-11 h-11 rounded-full border-[3px] border-[#0a0f44] bg-[#007A5E] text-white flex items-center justify-center text-xs font-bold">
                  +10k
                </div>
              </div>
              <p className="text-[#8DF5E4] font-medium text-sm">Tingkatkan pemahamanmu bersama ahlinya.</p>
            </div>
          </div>

          {/* KOLOM KANAN: Formulir Register */}
          <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-white z-10 rounded-l-3xl -ml-4 md:-ml-6 shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
            <div className="max-w-[400px] w-full mx-auto">
              
              {/* Logo for mobile only */}
              <div className="flex items-center mb-8 md:hidden">
                <img src="/images/logo_konekdin(background_putih).png" alt="KonekDin" className="h-8 w-auto" />
              </div>

              <div className="text-left mb-8">
                {/* Teks diubah dari "Selamat Datang Kembali" menjadi "Buat Akun Baru" agar logis */}
                <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Buat Akun Baru</h2>
                <p className="text-slate-500 font-medium">Daftar ke akun KonekDin Anda untuk mulai belajar</p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                
                {/* Input Nama Lengkap */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullName" className="block text-sm font-bold text-slate-900">
                    Nama Lengkap
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      className="block w-full h-12 pl-11 pr-3 border-transparent rounded-xl text-slate-900 bg-slate-100 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-[#1a1a4b] focus-visible:bg-white focus-visible:border-slate-200 transition-all font-medium"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                </div>

                {/* Input Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="block text-sm font-bold text-slate-900">
                    Alamat Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="block w-full h-12 pl-11 pr-3 border-transparent rounded-xl text-slate-900 bg-slate-100 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-[#1a1a4b] focus-visible:bg-white focus-visible:border-slate-200 transition-all font-medium"
                      placeholder="email@mhs.dinus.ac.id"
                    />
                  </div>
                </div>

                {/* Input Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="block text-sm font-bold text-slate-900">
                    Kata Sandi
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className="block w-full h-12 pl-11 pr-10 border-transparent rounded-xl text-slate-900 bg-slate-100 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-[#1a1a4b] focus-visible:bg-white focus-visible:border-slate-200 transition-all font-medium"
                      placeholder="Masukkan kata sandi"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Input Konfirmasi Password */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmPassword" className="block text-sm font-bold text-slate-900">
                    Konfirmasi Kata Sandi
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <RotateCcw className="h-5 w-5 text-slate-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className={`block w-full h-12 pl-11 pr-10 border-transparent rounded-xl text-slate-900 bg-slate-100 placeholder-slate-400 focus-visible:ring-2 focus-visible:bg-white transition-all font-medium ${
                        !isPasswordMatch ? 'focus-visible:ring-red-500 border-red-300 bg-red-50' : 'focus-visible:ring-[#1a1a4b] focus-visible:border-slate-200'
                      }`}
                      placeholder="Ulangi kata sandi"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  {!isPasswordMatch && (
                    <p className="text-xs text-red-500 font-medium pt-1">Kata sandi tidak sama</p>
                  )}
                </div>

                {/* Tombol Teruskan */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    disabled={!isPasswordMatch || !form.password}
                    className="w-full flex justify-center h-12 py-3 px-4 rounded-xl shadow-md text-[15px] font-bold text-white bg-[#0a0f44] hover:bg-[#060a2b] focus-visible:ring-[#0a0f44] transition-all disabled:opacity-50"
                  >
                    Daftar Sekarang
                  </Button>
                </div>
              </form>

              {/* Opsi Daftar Lainnya */}
              <div className="mt-7">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs font-bold tracking-widest text-slate-400 uppercase">
                    <span className="px-4 bg-white">
                      atau
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full inline-flex justify-center items-center h-12 py-2.5 px-4 border border-slate-200 rounded-xl shadow-sm bg-white text-[15px] font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Daftar dengan Google
                  </Button>
                </div>
              </div>

              <p className="mt-8 text-center text-[15px] text-slate-600 font-medium">
                Sudah punya akun?{' '}
                <Link to="/login" className="font-bold text-[#007A5E] hover:text-[#005c47] underline underline-offset-2 transition-all">
                  Masuk Sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Footer */}
      <footer className="w-full py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-semibold border-t border-slate-200/60 mt-auto bg-transparent">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 w-full max-w-7xl mx-auto">
          <div className="hidden md:flex flex-col space-y-1">
            <span className="font-extrabold text-[#1a1a4b] text-sm tracking-tight">KonekDin</span>
            <span>© 2026 KonekDin. Part of the Academic Commons.</span>
          </div>

          <div className="flex-grow flex justify-center md:justify-end space-x-6 uppercase tracking-wider md:pr-8">
            <button className="flex items-center space-x-1.5 hover:text-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <span>IDN</span>
            </button>
            <a href="#" className="hover:text-slate-800 transition-colors">PUSAT BANTUAN</a>
            <a href="#" className="hover:text-slate-800 transition-colors">KEBIJAKAN PRIVASI</a>
          </div>

          <div className="flex space-x-6 text-slate-500">
            <a href="#" className="hover:text-slate-800 transition-colors hover:underline underline-offset-2">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 transition-colors hover:underline underline-offset-2">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 transition-colors hover:underline underline-offset-2">Help Center</a>
          </div>

          {/* Mobile copyright */}
          <div className="md:hidden flex flex-col items-center space-y-1 pt-4 text-center w-full">
            <span className="font-extrabold text-[#1a1a4b] text-sm tracking-tight">KonekDin</span>
            <span>© 2026 KonekDin. Part of the Academic Commons.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
