import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg('')
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      })

      if (response.data && response.data.access_token) {
        localStorage.setItem('token', response.data.access_token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        const role = response.data.user.role
        if (role === 'admin') {
          navigate('/admin')
        } else if (role === 'tutor') {
          navigate('/tutor')
        } else {
          navigate('/learner')
        }
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'Terjadi kesalahan saat login.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 font-sans">
      {/* Container utama (tengah) */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="flex w-full max-w-5xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl overflow-hidden flex-col md:flex-row">
        
        {/* KOLOM KIRI: Visual Branding */}
        <div className="relative w-full md:w-5/12 bg-[#1a1a4b] text-white p-10 flex flex-col justify-between hidden md:flex">
          {/* Logo / Header Branding */}
          <div className="flex items-center z-10">
            <img src="/images/logo_konekdin.png" alt="Logo KonekDin" className="h-10 w-auto" />
          </div>

          {/* Headline Body */}
          <div className="z-10 mt-16 mb-20 space-y-6">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white">
              Membangun Jembatan <br /> Akademik Masa Depan.
            </h1>
            <p className="text-slate-300 text-base leading-relaxed max-w-sm">
              Bergabunglah dengan ribuan mahasiswa dan mentor profesional dalam ekosistem pembelajaran kolaboratif terbaik.
            </p>
          </div>

          {/* Footer Branding / Avatars */}
          <div className="z-10 flex flex-col space-y-3">
            <div className="flex -space-x-3">
              <img className="w-10 h-10 rounded-full border-2 border-[#1a1a4b] object-cover" src="https://i.pravatar.cc/100?img=3" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#1a1a4b] object-cover" src="https://i.pravatar.cc/100?img=4" alt="User" />
              <img className="w-10 h-10 rounded-full border-2 border-[#1a1a4b] object-cover" src="https://i.pravatar.cc/100?img=5" alt="User" />
              <div className="w-10 h-10 rounded-full border-2 border-[#1a1a4b] bg-[#007A5E] text-white flex items-center justify-center text-xs font-bold">
                +10k
              </div>
            </div>
            <p className="text-slate-300 text-sm">Tingkatkan pemahamanmu bersama ahlinya.</p>
          </div>

          {/* Abstract Background Design */}
          <div className="absolute inset-0 z-0">
            {/* Simple gradient glow representation */}
            <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#2b2b73] rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-10 -right-20 w-64 h-64 bg-[#393992] rounded-full blur-3xl opacity-30"></div>
          </div>
        </div>

        {/* KOLOM KANAN: Formulir Login */}
        <div className="w-full md:w-7/12 p-8 md:p-14 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-900">
          <div className="max-w-md w-full mx-auto">
            {/* Logo for mobile only */}
            <div className="flex items-center mb-8 md:hidden">
              <img src="/images/logo_konekdin.png" alt="KonekDin" className="h-8 w-auto" />
            </div>

            <div className="text-left mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Selamat Datang Kembali</h2>
              <p className="text-slate-500 dark:text-slate-400">Masuk ke akun KonekDin Anda untuk melanjutkan belajar</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {errorMsg && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-100">
                  {errorMsg}
                </div>
              )}
              {/* Input Email */}
              <div className="space-y-1">
                <Label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full h-12 pl-10 pr-3 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-[#1a1a4b] dark:focus-visible:ring-blue-500 transition-colors"
                    placeholder="email@mhs.dinus.ac.id"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1">
                <Label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full h-12 pl-10 pr-10 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-[#1a1a4b] dark:focus-visible:ring-blue-500 transition-colors"
                    placeholder="••••••••"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Checkbox and Lupa Sandi */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    className="h-4 w-4 border-slate-300 data-[state=checked]:bg-[#1a1a4b] data-[state=checked]:border-[#1a1a4b]"
                  />
                  <Label htmlFor="remember-me" className="text-sm font-normal text-slate-700 dark:text-slate-300 cursor-pointer">
                    Ingat Saya
                  </Label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#007A5E] hover:text-[#005c47] transition-colors">
                    Lupa Kata Sandi?
                  </a>
                </div>
              </div>

              {/* Tombol Teruskan */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center h-12 py-3 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1a1a4b] hover:bg-[#121235] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1a1a4b] transition-colors disabled:opacity-70"
                >
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </div>
            </form>

            {/* Opsi Login Lainnya */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-slate-900 text-slate-500">
                    atau masuk dengan
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full inline-flex justify-center items-center h-12 py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
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
                  Masuk dengan Google
                </Button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              Belum punya akun?{' '}
              <Link to="/register" className="font-semibold text-[#007A5E] hover:text-[#005c47] hover:underline transition-all">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
      </div>

      {/* Global Footer */}
      <footer className="w-full py-6 px-4 md:px-12 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-medium">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 w-full">
          <div className="hidden md:flex flex-col space-y-1">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">KonekDin</span>
            <span>© 2026 KonekDin. Part of the Academic Commons.</span>
          </div>

          <div className="flex-grow flex justify-center space-x-6 uppercase tracking-wider">
            <button className="flex items-center space-x-1 hover:text-slate-800 dark:hover:text-slate-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
              <span>IDN</span>
            </button>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">PUSAT BANTUAN</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors">KEBIJAKAN PRIVASI</a>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors hover:underline">Terms of Service</a>
            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors hover:underline">Help Center</a>
          </div>

          {/* Mobile copyright */}
          <div className="md:hidden flex flex-col items-center space-y-1 pt-4 text-center">
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">KonekDin</span>
            <span>© 2026 KonekDin. Part of the Academic Commons.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
