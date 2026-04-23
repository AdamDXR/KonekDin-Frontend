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
  Menu
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SidebarContent = ({ navigation, setIsMobileMenuOpen, navigate }) => (
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
    <NavLink
      to="/learner/profil-learner"
      onClick={() => setIsMobileMenuOpen(false)}
      className={({ isActive }) =>
        `flex items-center gap-3 px-5 pb-4 rounded-xl transition-all ${
          isActive ? 'opacity-100' : 'opacity-90 hover:opacity-100'
        }`
      }
    >
      <Avatar className="h-11 w-11 border-2 border-slate-100">
        <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="Budi Santoso" />
        <AvatarFallback className="bg-[#0a0f44] text-white text-sm font-semibold">BS</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-bold text-[#0a0f44] leading-tight">Budi Santoso</p>
        <p className="text-xs text-slate-400">Informatika '22</p>
      </div>
    </NavLink>

    {/* Navigation */}
    <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-150 ${
              isActive
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

    {/* Bottom Actions */}
    <div className="px-3 pb-5 space-y-0.5">
      <div className="h-px bg-slate-100 mx-2 mb-3"></div>
      <button className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 w-full transition-colors">
        <HelpCircle className="h-[18px] w-[18px]" strokeWidth={1.8} />
        Bantuan
      </button>
      <button
        onClick={() => navigate('/login')}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 w-full transition-colors"
      >
        <LogOut className="h-[18px] w-[18px]" strokeWidth={1.8} />
        Keluar
      </button>
    </div>
  </div>
)

export default function LearnerLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const navigation = [
    { name: 'Dashboard', href: '/learner/dashboard', icon: LayoutDashboard },
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
        <SidebarContent navigation={navigation} setIsMobileMenuOpen={setIsMobileMenuOpen} navigate={navigate} />
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
              <SidebarContent navigation={navigation} setIsMobileMenuOpen={setIsMobileMenuOpen} navigate={navigate} />
            </SheetContent>
          </Sheet>
          <img src="/images/logo_konekdin(background_putih).png" alt="KonekDin" className="h-8 w-auto" />
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=68" alt="User" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
        </header>

        {/* Page Content — scrollable */}
        <main className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
          <Outlet />
        </main>

        {/* Footer — selalu di bawah, tidak ikut scroll */}
        <footer className="flex-shrink-0 border-t border-slate-100 bg-white px-6 lg:px-10 py-3 flex flex-col sm:flex-row items-center justify-between gap-1">
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
  )
}
