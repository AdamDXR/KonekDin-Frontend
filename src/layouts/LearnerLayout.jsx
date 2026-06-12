import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Search,
  ClipboardList,
  CalendarDays,
  History,
  Bell,
  HelpCircle,
  LogOut,
  Home,
  Menu,
  Repeat
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from '@/lib/axios'

const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

const SidebarContent = ({ navigation, setIsMobileMenuOpen, navigate, user, handleLogout }) => {
  // Simulasi jika user sudah di-ACC sebagai tutor (IsTutor = true)
  const isTutor = true;

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Logo KonekDin */}
      <div className="px-5 pt-5 pb-4">
        <img
          src="/images/logo_konekdin(background_putih).png"
          alt="KonekDin"
          className="h-12 w-auto"
        />
      </div>

      {/* Separator */}
      <div className="mx-5 h-px bg-slate-100 mb-3"></div>

      {/* User Profile — clickable → Profil Learner */}


      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 ${isActive
                ? 'bg-[#e8f5f2] text-[#0d7c6b] font-semibold'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-medium'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={isActive ? 2.2 : 1.8} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-5 pb-5 space-y-4">
        {/* Tombol Ganti Role (Akan muncul jika user punya role tutor) */}
        {isTutor && (
          <button
            onClick={() => navigate('/tutor/dashboard')}
            className="w-full flex items-center justify-center gap-2 bg-[#F2F4F6] hover:bg-[#EEF2FF] text-[#000666] font-semibold px-6 py-2.5 h-auto rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Repeat className="w-4 h-4" strokeWidth={2.5} />
            Beralih ke Tutor
          </button>
        )}

        {/* User Profile */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <NavLink
            to="/learner/profil-learner"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity min-w-0"
          >
            <Avatar className="h-11 w-11 border-2 border-slate-100 flex-shrink-0">
              <AvatarImage key={user?.avatar || 'fallback'} src={user?.avatar ? (user.avatar.startsWith('http') ? user.avatar : `http://127.0.0.1:8000/storage/${user.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a0f44&color=fff`} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-[#0a0f44] text-white text-sm font-semibold">{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <p className="text-sm font-bold text-[#0a0f44] leading-tight truncate w-full">{user?.name || 'User'}</p>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate w-full">{user?.email || 'Learner'}</p>
            </div>
          </NavLink>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ml-2 flex-shrink-0"
            title="Keluar"
          >
            <LogOut className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </div>

    </div>
  )
}

export default function LearnerLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login', { replace: true })
      return
    }

    // Ambil user dari API agar datanya selalu terbaru
    const fetchUser = async () => {
      try {
        const response = await axios.get('/me')
        if (response.data && response.data.data) {
          setUser(response.data.data)
          localStorage.setItem('user', JSON.stringify(response.data.data))
        }
      } catch (err) {
        console.error("Gagal mengambil data user:", err)
        // Fallback jika API gagal namun token masih ada
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      }
    }
    fetchUser()
    
    // Dengarkan custom event jika profil di-update dari ProfilLearner.jsx
    const handleProfileUpdate = () => {
      const savedUser = localStorage.getItem('user')
      if (savedUser) setUser(JSON.parse(savedUser))
    }
    window.addEventListener('profileUpdated', handleProfileUpdate)
    return () => window.removeEventListener('profileUpdated', handleProfileUpdate)
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.post('/logout')
    } catch (error) {
      console.error('Logout failed on server, cleaning up locally anyway', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/login', { replace: true })
    }
  }

  const navigation = [
    { name: 'Dashboard', href: '/learner/dashboard', icon: Home },
    { name: 'Cari Tutor', href: '/learner/cari-tutor', icon: Search },
    { name: 'Detail Pesanan', href: '/learner/detail-pesanan', icon: ClipboardList },
    { name: 'Jadwal Belajar', href: '/learner/jadwal-belajar', icon: CalendarDays },
    { name: 'Riwayat Belajar', href: '/learner/riwayat-belajar', icon: History },
    { name: 'Notifikasi', href: '/learner/notifikasi', icon: Bell },
  ]

  return (
    <div className="flex h-screen bg-[#f7f9fb] overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="w-[250px] border-r border-slate-100 hidden lg:flex flex-col flex-shrink-0 bg-white">
        <SidebarContent navigation={navigation} setIsMobileMenuOpen={setIsMobileMenuOpen} navigate={navigate} user={user} handleLogout={handleLogout} />
      </aside>

      {/* Main Area: header + content + footer */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-14 px-4 flex items-center justify-between border-b border-slate-100 lg:hidden bg-white flex-shrink-0">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5 text-slate-600" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[250px] border-r-0">
              <SidebarContent navigation={navigation} setIsMobileMenuOpen={setIsMobileMenuOpen} navigate={navigate} user={user} handleLogout={handleLogout} />
            </SheetContent>
          </Sheet>
          <img src="/images/logo_konekdin(background_putih).png" alt="KonekDin" className="h-8 w-auto" />
          <Avatar className="h-8 w-8">
            <AvatarImage key={user?.avatar || 'fallback'} src={user?.avatar ? (user.avatar.startsWith('http') ? user.avatar : `http://127.0.0.1:8000/storage/${user.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0a0f44&color=fff`} alt={user?.name || 'User'} />
            <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
          </Avatar>
        </header>

        {/* Scrollable Area */}
        <div id="learner-scroll-area" className="flex-1 overflow-y-auto flex flex-col">
          {/* Page Content */}
          <main className="flex-1 px-6 py-6 lg:px-10 lg:py-8">
            <Outlet />
          </main>

          {/* Footer — scroll bersama konten */}
          <footer className="border-t border-slate-100 bg-white px-6 lg:px-10 py-3 flex flex-col sm:flex-row items-center justify-between gap-1">
            <p className="text-[12px] text-slate-400">
              © 2026 <span className="font-semibold text-[#0a0f44]">KonekDin</span>. Semua hak dilindungi.
            </p>
            <div className="flex items-center gap-4 text-[12px] text-slate-400">
              <a href="#" className="hover:text-teal-600 transition-colors">Ketentuan Layanan</a>
              <span className="text-slate-200">|</span>
              <a href="#" className="hover:text-teal-600 transition-colors">Kebijakan Privasi</a>
              <span className="text-slate-200">|</span>
              <a href="#" className="hover:text-teal-600 transition-colors">Bantuan</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
