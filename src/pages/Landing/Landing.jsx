import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Network, 
  Database, 
  Code, 
  ArrowRight, 
  MousePointerClick, 
  Calendar, 
  Users, 
  UserPlus, 
  BookOpen, 
  Clock, 
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardLanding() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
              <img src="/images/logo_konekdin(background_putih).png" alt="KonekDin" className="h-10 w-auto group-hover:opacity-90 transition-opacity" />
            </div>
            <Button onClick={() => navigate('/login')} className="bg-[#1a1a4b] hover:bg-[#121235] text-white rounded-xl px-6 py-2 h-11 font-semibold transition-all shadow-md hover:shadow-lg">
              Daftar / Masuk <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Main Hero Section */}
        <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
              {/* Left Column: Copy */}
              <div className="max-w-2xl text-center lg:text-left">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-[#1a1a4b] leading-[1.15] tracking-tight mb-6">
                  Pahami Mata Kuliah <br className="hidden lg:block" />
                  <span className="text-[#007A5E]">Lebih Cepat</span> <br className="hidden lg:block" />
                  dengan Tutor Sebayamu
                </h1>
                <p className="text-lg text-slate-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Terhubung dengan mentor mahasiswa terbaik yang telah unggul di kurikulum yang sama dengan Anda. Solusi cepat untuk memahami kesulitan dalam mata kuliah.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button onClick={() => navigate('/login')} className="bg-gradient-to-br from-[#1a1a4b] to-[#2b2b73] hover:opacity-90 shadow-xl text-white rounded-xl h-14 px-8 text-lg font-semibold w-full sm:w-auto">
                    Mulai Belajar <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" className="border-slate-300 text-[#1a1a4b] hover:bg-slate-50 rounded-xl h-14 px-8 text-lg font-semibold w-full sm:w-auto">
                    Pelajari Lebih Lanjut
                  </Button>
                </div>
              </div>

              {/* Right Column: Visuals & Overlays */}
              <div className="relative hidden lg:block px-8">
                {/* Decorative blob behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-gradient-to-tr from-[#8DF5E4]/40 to-[#E0E0FF]/40 rounded-full blur-3xl -z-10"></div>
                
                <div className="relative w-full max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Students studying" className="rounded-[2rem] shadow-2xl object-cover h-[520px] w-full border-8 border-white" />
                  
                  {/* Overlay Card */}
                  <div className="absolute -bottom-8 -left-12 bg-white/95 backdrop-blur-sm p-5 rounded-2xl shadow-xl border border-slate-100 transform -rotate-3 flex flex-col gap-4 w-72">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#8DF5E4]/40 rounded-full flex items-center justify-center text-[#007A5E]">
                        <UserPlus size={24} />
                      </div>
                      <div>
                        <h4 className="text-[#1a1a4b] font-bold text-base leading-tight">Tutor Tersertifikasi</h4>
                        <p className="text-slate-500 text-sm">Bimbingan Terpercaya</p>
                      </div>
                    </div>
                    <div className="flex items-center -space-x-3 mt-1 pl-1">
                      <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="User" />
                      <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="User" />
                      <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="User" />
                      <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-800 shadow-sm z-10">
                        +10k
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features / Course Categories */}
        <section className="bg-[#F2F4F6] py-24 border-y border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center justify-center py-1.5 px-5 rounded-full bg-[#8DF5E4] text-[#007A5E] font-bold text-xs tracking-widest uppercase mb-6 shadow-sm">
                Tersedia Semua Mata Kuliah
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a4b] mb-6 leading-tight">Tingkatkan Pemahamanmu Bersama Ahlinya</h2>
              <p className="text-slate-500 text-lg md:text-xl italic">"Didampingi tutor terbaik untuk setiap materi."</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <Card className="p-8 border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-[1.5rem] group cursor-pointer hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#EEF2FF] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Network className="text-[#1a1a4b] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a4b] mb-4">Struktur Data</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-base">Kuasai stack, queue, tree, dan graph. Bangun fondasi untuk rekayasa perangkat lunak yang efisien.</p>
                <div className="flex items-center text-[#007A5E] font-bold text-base">
                  Cari Mentor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Card>

              {/* Feature 2 */}
              <Card className="p-8 border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-[1.5rem] group cursor-pointer hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#F0FDFA] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Database className="text-[#007A5E] w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a4b] mb-4">Sistem Basis Data</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-base">SQL, NoSQL, dan normalisasi basis data. Pelajari cara merancang lapisan data yang skalabel.</p>
                <div className="flex items-center text-[#007A5E] font-bold text-base">
                  Cari Mentor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Card>

              {/* Feature 3 */}
              <Card className="p-8 border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white rounded-[1.5rem] group cursor-pointer hover:-translate-y-1">
                <div className="w-16 h-16 bg-[#FFFBEB] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <Code className="text-amber-600 w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a4b] mb-4">Algoritma</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-base">Sorting, searching, dan dynamic programming. Lalui wawancara teknis dengan mudah.</p>
                <div className="flex items-center text-[#007A5E] font-bold text-base">
                  Cari Mentor <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              
              {/* Left: Steps */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a1a4b] mb-12">Cara Kerja KonekDin</h2>
                
                <div className="space-y-12 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[28px] top-8 bottom-8 w-[2px] bg-slate-100 -z-10 hidden sm:block"></div>
                  
                  {/* Step 1 */}
                  <div className="flex flex-col sm:flex-row items-start gap-6 group">
                    <div className="w-14 h-14 bg-[#007A5E] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg text-white ring-8 ring-white group-hover:scale-110 transition-transform">
                      <MousePointerClick size={26} />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-[#1a1a4b] mb-3">Pilih Mata Kuliah</h3>
                      <p className="text-slate-600 leading-relaxed text-base">Jelajahi katalog mata kuliah teknis kami dan pilih bidang yang paling Anda butuhkan bantuannya.</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col sm:flex-row items-start gap-6 group">
                    <div className="w-14 h-14 bg-[#007A5E] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg text-white ring-8 ring-white group-hover:scale-110 transition-transform">
                      <Calendar size={26} />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-[#1a1a4b] mb-3">Pilih Waktu</h3>
                      <p className="text-slate-600 leading-relaxed text-base">Pilih slot yang sesuai dengan jadwal Anda. Mentor kami tersedia di berbagai zona waktu.</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col sm:flex-row items-start gap-6 group">
                    <div className="w-14 h-14 bg-[#007A5E] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg text-white ring-8 ring-white group-hover:scale-110 transition-transform">
                      <Users size={26} />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-xl font-bold text-[#1a1a4b] mb-3">Padankan dengan Tutor</h3>
                      <p className="text-slate-600 leading-relaxed text-base">Dapatkan padanan dengan mentor sebaya yang telah berhasil menyelesaikan kursus yang sama di institusi Anda.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-14">
                  <Button onClick={() => navigate('/register')} className="bg-[#1a1a4b] hover:bg-[#121235] text-white rounded-xl h-14 px-8 text-base font-semibold w-full sm:w-auto shadow-lg hover:shadow-xl transition-all">
                    <UserPlus className="w-5 h-5 mr-2" /> Daftar sebagai Tutor
                  </Button>
                </div>
              </div>

              {/* Right: Summary Card Demo */}
              <div className="bg-[#F2F4F6] p-6 sm:p-10 lg:p-14 rounded-[2.5rem] relative">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-[#8DF5E4] rounded-full blur-3xl opacity-40"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                
                <Card className="p-8 bg-white rounded-3xl shadow-2xl border-none relative z-10 transform hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-8 pb-5 border-b border-slate-100">
                    <h4 className="font-bold text-[#1a1a4b] text-xl">Ringkasan Pemesanan</h4>
                    <div className="bg-slate-50 p-2 rounded-full cursor-pointer hover:bg-slate-100 transition-colors">
                      <X className="text-slate-400" size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-5">
                    <div className="bg-[#F0FDFA] p-5 rounded-2xl flex items-center gap-5">
                      <div className="bg-white p-2.5 rounded-xl shadow-sm">
                        <BookOpen className="text-[#007A5E]" size={26} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Mata Kuliah Terpilih</p>
                        <p className="font-bold text-[#007A5E] text-lg">Algoritma Lanjutan</p>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 p-5 rounded-2xl flex items-center gap-5">
                      <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100">
                        <Clock className="text-[#1a1a4b]" size={26} />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium mb-1">Waktu yang Dipilih</p>
                        <p className="font-bold text-[#1a1a4b] text-lg">Besok, 16:00 WIB</p>
                      </div>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                      <div>
                        <p className="text-sm text-slate-500 font-medium mb-2">Total Harga</p>
                        <p className="text-3xl font-extrabold text-[#1a1a4b]">Rp 45.000</p>
                      </div>
                      <Button className="bg-[#1a1a4b] hover:bg-[#121235] text-white rounded-xl px-8 h-12 text-base font-bold w-full sm:w-auto shadow-md">
                        Konfirmasi
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-gradient-to-br from-[#1a1a4b] via-[#1e1b4b] to-[#0a0f44] py-24 text-center px-4 relative overflow-hidden">
          {/* Abstract background shapes */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-0 translate-x-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-[#8DF5E4] rounded-full blur-[100px]"></div>
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
              Siap Meningkatkan Perjalanan <br className="hidden md:block" /> Akademik Anda?
            </h2>
            <p className="text-[#E0E0FF] text-xl mb-12 leading-relaxed max-w-3xl mx-auto opacity-90">
              Bergabunglah dengan 10.000+ mahasiswa yang telah meningkatkan nilai mereka melalui pendampingan sebaya yang intensif.
            </p>
            <Button onClick={() => navigate('/login')} className="bg-[#8DF5E4] hover:bg-[#72e5d1] text-[#007A5E] rounded-xl h-16 px-12 text-xl font-bold shadow-[0_0_40px_rgba(141,245,228,0.3)] hover:shadow-[0_0_60px_rgba(141,245,228,0.5)] transition-all transform hover:-translate-y-1">
              Gabung Sekarang
            </Button>
          </div>
        </section>
      </main>

      {/* Global Footer (Matching Login Page) */}
      <footer className="w-full bg-white py-10 px-4 md:px-12 flex flex-col justify-center items-center text-xs text-slate-500 font-medium border-t border-slate-200/60">
        <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-0">
          
          <div className="flex flex-col items-center lg:items-start space-y-2 text-center lg:text-left">
            <div className="flex items-center mb-2">
              <img src="/images/logo_konekdin(background_putih).png" alt="KonekDin" className="h-8 w-auto grayscale opacity-80" />
            </div>
            <p className="text-slate-400 max-w-xs">Memberdayakan mahasiswa melalui bimbingan teknis antar sebaya dan lingkungan belajar kolaboratif.</p>
            <span className="block mt-2">© 2026 KonekDin. Part of the Academic Commons.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-12 lg:pt-4">
            <div className="flex items-center space-x-8 uppercase tracking-widest font-semibold text-[11px]">
              <button className="flex items-center space-x-1.5 text-slate-400 hover:text-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                <span>IDN</span>
              </button>
              <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">Pusat Bantuan</a>
              <a href="#" className="text-slate-400 hover:text-slate-800 transition-colors">Kebijakan Privasi</a>
            </div>

            <div className="flex items-center space-x-5">
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-[#1a1a4b] hover:bg-slate-100 transition-all">
                {/* Fake FB Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-[#e1306c] hover:bg-slate-100 transition-all">
                 {/* Fake Insta Icon SVG */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
