import { NavLink, Outlet } from 'react-router-dom'
import {
  BarChart,
  Users,
  BookOpen,
  ShieldCheck,
  ClipboardList,
  Settings,
  Search,
  Bell,
  HelpCircle,
  Menu
} from 'lucide-react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useState } from 'react'

export default function AdminLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Statistik', href: '/admin', icon: BarChart },
    { name: 'Kelola Pengguna', href: '/admin/kelola-user', icon: Users },
    { name: 'Kelola Matakuliah', href: '/admin/kelola-matakuliah', icon: BookOpen },
    { name: 'Validasi Badge', href: '/admin/validasi-badge', icon: ShieldCheck },
    { name: 'Log Transaksi', href: '/admin/log-transaksi', icon: ClipboardList },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#FAFAFA]">
      <div className="flex flex-col items-start px-8 pt-10 pb-8">
        <h1 className="text-2xl font-bold text-[#1e1b4b] tracking-tight">KonekDin</h1>
        <span className="text-[11px] font-bold text-slate-400 tracking-widest mt-1 uppercase">Admin Portal</span>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 mt-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/admin'}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#EEF2FF] text-[#1D4ED8]'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-6 mt-auto">
        <Button className="w-full bg-[#0a0f44] hover:bg-[#060a2b] text-white shadow-none rounded-xl py-6 font-medium">
          Invite Admin
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar Desktop */}
      <aside className="w-72 border-r border-slate-200 hidden lg:block flex-shrink-0">
        <SidebarContent />
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 px-6 sm:px-10 flex items-center justify-between border-b border-slate-200 sticky top-0 bg-white z-10 gap-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6 text-slate-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72 border-r-0">
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input 
                type="text" 
                placeholder="Search records..." 
                className="pl-11 bg-slate-100/60 border-transparent focus-visible:ring-1 rounded-full h-11 text-sm shadow-none"
              />
            </div>
          </div>

          <div className="flex-1 hidden md:flex items-center justify-center">
            <nav className="flex space-x-10">
              <a href="#" className="text-sm font-semibold text-teal-600 border-b-2 border-teal-600 pb-[27px] pt-[29px]">Dashboard</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 py-[28px]">Reports</a>
              <a href="#" className="text-sm font-medium text-slate-500 hover:text-slate-900 py-[28px]">Logs</a>
            </nav>
          </div>

          <div className="flex items-center justify-end gap-6 flex-1">
            <button className="relative text-slate-500 hover:text-slate-700 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-slate-600 ring-2 ring-white"></span>
            </button>
            <button className="text-slate-400 hover:text-slate-700 hidden sm:block transition-colors">
              <HelpCircle className="h-5.5 w-5.5 fill-slate-400 text-white" />
            </button>
            <Avatar className="h-10 w-10 ring-2 ring-slate-100 cursor-pointer">
              <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Admin Avatar" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 bg-[#FAFAFA] p-6 lg:p-10 overflow-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
