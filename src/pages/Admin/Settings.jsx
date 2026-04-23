import { User, Lock, Bell, Palette, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const settingSections = [
  { id: 'profil', label: 'Profil', icon: User },
  { id: 'keamanan', label: 'Keamanan', icon: Lock },
  { id: 'notifikasi', label: 'Notifikasi', icon: Bell },
  { id: 'tampilan', label: 'Tampilan', icon: Palette },
  { id: 'bahasa', label: 'Bahasa', icon: Globe },
]

export default function Settings() {
  return (
    <div className="flex flex-col gap-8 pb-10">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Pengaturan</h1>
        <p className="text-base text-slate-600 mt-2">Kelola preferensi akun dan konfigurasi Admin Portal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <nav className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 h-fit">
          {settingSections.map((section, i) => (
            <button
              key={section.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                i === 0
                  ? 'bg-[#EEF2FF] text-[#1D4ED8]'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <section.icon className="h-5 w-5" />
              {section.label}
            </button>
          ))}
        </nav>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Informasi Profil</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Nama Lengkap</label>
                <Input
                  type="text"
                  defaultValue="Admin KonekDin"
                  className="rounded-xl h-11 shadow-none border-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Email</label>
                <Input
                  type="email"
                  defaultValue="admin@konekdin.id"
                  className="rounded-xl h-11 shadow-none border-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Nomor Telepon</label>
                <Input
                  type="tel"
                  defaultValue="+62 812 3456 7890"
                  className="rounded-xl h-11 shadow-none border-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Jabatan</label>
                <Input
                  type="text"
                  defaultValue="Super Administrator"
                  className="rounded-xl h-11 shadow-none border-slate-200"
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button className="bg-[#0a0f44] hover:bg-[#060a2b] text-white rounded-xl px-8 py-5 font-medium shadow-none">
                Simpan Perubahan
              </Button>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Keamanan Akun</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Password Lama</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="rounded-xl h-11 shadow-none border-slate-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">Password Baru</label>
                <Input
                  type="password"
                  placeholder="Minimal 8 karakter"
                  className="rounded-xl h-11 shadow-none border-slate-200"
                />
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <Button variant="outline" className="rounded-xl px-8 py-5 font-medium border-slate-200 shadow-none">
                Perbarui Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
