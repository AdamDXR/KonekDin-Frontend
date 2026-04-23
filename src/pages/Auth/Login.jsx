import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, GraduationCap } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Fungsi navigasi dummy, nanti panggil auth beneran
  const handleLogin = (e) => {
    e.preventDefault()
    // Contoh dummy menuju halaman Learner
    navigate('/learner')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 p-4 font-sans">
      <div className="flex w-full max-w-5xl bg-white dark:bg-slate-900 shadow-2xl rounded-2xl overflow-hidden flex-col md:flex-row">
        
        {/* KOLOM KIRI: Visual Branding */}
        <div className="relative w-full md:w-5/12 bg-[#1a1a4b] text-white p-10 flex flex-col justify-between hidden md:flex">
          {/* Logo / Header Branding */}
          <div className="flex items-center space-x-2 z-10">
            <GraduationCap className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold tracking-tight">KonekDin</span>
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

          {/* Footer Branding */}
          <div className="z-10 text-sm text-slate-400">
            © 2026 KonekDin. All rights reserved.
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
            <div className="flex items-center space-x-2 mb-8 md:hidden">
              <div className="bg-[#1a1a4b] p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-800 dark:text-white">KonekDin</span>
            </div>

            <div className="text-left mb-8">
              <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Selamat Datang Kembali</h2>
              <p className="text-slate-500 dark:text-slate-400">Masuk ke akun KonekDin Anda untuk melanjutkan belajar</p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              {/* Input Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] dark:focus:ring-blue-500 transition-colors"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1a1a4b] dark:focus:ring-blue-500 transition-colors"
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
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#1a1a4b] focus:ring-[#1a1a4b] border-slate-300 rounded cursor-pointer accent-[#1a1a4b]"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                    Ingat Saya
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#2dd4bf] hover:text-[#25b5a2] transition-colors">
                    Lupa Kata Sandi?
                  </a>
                </div>
              </div>

              {/* Tombol Teruskan */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1a1a4b] hover:bg-[#121235] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a1a4b] transition-colors"
                >
                  Masuk
                </button>
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
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-300 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
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
                </button>
              </div>
            </div>

            <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
              Belum punya akun?{' '}
              <Link to="/register" className="font-semibold text-[#1a1a4b] dark:text-[#2dd4bf] hover:underline transition-all">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
