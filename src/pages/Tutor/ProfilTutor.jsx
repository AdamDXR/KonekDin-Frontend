import React from 'react'
import { User, Mail, Phone, BookOpen, Star, Award } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfilTutor() {
  return (
    <div className="max-w-3xl">
      <div className="mb-7">
        <h1 className="text-2xl font-extrabold text-[#0a0f44] tracking-tight">
          Profil Saya
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Kelola informasi profil, keahlian, dan detail kontak Anda.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-[#0d7c6b] to-[#129480]" />

        {/* Profile Info Card */}
        <div className="px-8 pb-8 relative">
          {/* Avatar floating */}
          <div className="absolute -top-12 left-8">
            <Avatar className="h-24 w-24 rounded-2xl border-4 border-white shadow-md">
              <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Irkham Wildan" />
              <AvatarFallback className="bg-[#0a0f44] text-white text-xl font-bold">IW</AvatarFallback>
            </Avatar>
          </div>

          <div className="pt-16 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0a0f44]">Irkham Wildan</h2>
              <p className="text-sm text-slate-500 mt-1">
                Tutor &bull; Teknik Informatika &bull; Angkatan 2021
              </p>
            </div>
            <div className="flex gap-2 items-center bg-[#f0fbf8] px-4 py-2 rounded-xl border border-teal-50">
              <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
              <span className="text-sm font-bold text-[#0d7c6b]">4.9 / 5.0 Rating</span>
            </div>
          </div>

          <div className="h-px bg-slate-100 my-6" />

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Detail Kontak</h3>
              
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="h-5 w-5 text-[#0d7c6b]" />
                <span className="text-sm font-medium">irkham.wildan@konekdin.com</span>
              </div>
              
              <div className="flex items-center gap-3 text-slate-600">
                <Phone className="h-5 w-5 text-[#0d7c6b]" />
                <span className="text-sm font-medium">+62 812-3456-7890</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Keahlian & Mata Kuliah</h3>
              
              <div className="flex items-start gap-3 text-slate-600">
                <BookOpen className="h-5 w-5 text-[#0d7c6b] mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#0a0f44]">Pemrograman Web</p>
                  <p className="text-xs text-slate-400">HTML, CSS, JS, React, Node.js</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-600">
                <Award className="h-5 w-5 text-[#0d7c6b] mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#0a0f44]">Algoritma & Struktur Data</p>
                  <p className="text-xs text-slate-400">Array, Queue, Trees, Sorting, Searching</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
