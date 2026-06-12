import { useState, useRef, useCallback, useEffect } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/utils/cropImage'
import { useNavigate } from 'react-router-dom'
import {
  University,
  CalendarDays,
  History,
  Pencil,
  Save,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import axios from '@/lib/axios'

// ─── Data dummy ───────────────────────────────────────────────────────────────
const profilData = {
  nama: 'Budi Santoso',
  foto: 'https://i.pravatar.cc/300?img=68',
  universitas: 'Universitas Dian Nuswantoro',
  email: 'budi@mhs.dinus.ac.id',
  phone: '+62 812 3456 7890',
  nim: 'A11.2024.12345',
  jurusan: 'Teknik Informatika',
  fakultas: 'Ilmu Komputer',
}

// ─── InputField ───────────────────────────────────────────────────────────────
function InputField({ label, value, onChange, readOnly }) {
  return (
    <div>
      <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1.5">
        {label}
      </p>
      <input
        type="text"
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-700 outline-none transition
          ${
            readOnly
              ? 'bg-slate-50 border-slate-200 cursor-default'
              : 'bg-white border-[#0d7c6b] ring-2 ring-[#0d7c6b]/20 cursor-text'
          }`}
      />
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProfilLearner() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [profil, setProfil] = useState(profilData)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(profilData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingFoto, setIsUploadingFoto] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/me')
        if (response.data && response.data.data) {
          const user = response.data.data
          const mappedProfile = {
            nama: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            foto: user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `http://127.0.0.1:8000/storage/${user.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random`,
            universitas: user.university || 'Universitas Dian Nuswantoro',
            nim: user.nim || '',
            jurusan: user.major || 'Teknik Informatika',
            fakultas: user.faculty || 'Ilmu Komputer',
          }
          setProfil(mappedProfile)
          setDraft(mappedProfile)
        }
      } catch (err) {
        console.error("Gagal mengambil profil:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProfile()
  }, [])

  // ── State for Cropper ──
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleFotoChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
    // Reset input value so the same file can be selected again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSaveCrop = async () => {
    setIsUploadingFoto(true)
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
      
      // Langsung kirim foto ke backend
      let formData = new FormData()
      formData.append('_method', 'PATCH')
      const res = await fetch(croppedImage)
      const blob = await res.blob()
      formData.append('avatar', blob, 'avatar.png')
      
      const response = await axios.post('/me', formData, {
         headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      if (response.data && response.data.data) {
          const user = response.data.data
          const newAvatarUrl = user.avatar ? (user.avatar.startsWith('http') ? user.avatar : `http://127.0.0.1:8000/storage/${user.avatar}`) : croppedImage
          
          setProfil((prev) => ({ ...prev, foto: newAvatarUrl }))
          setDraft((prev) => ({ ...prev, foto: newAvatarUrl }))
          
          // Perbarui localStorage
          const oldUser = JSON.parse(localStorage.getItem('user')) || {}
          const newUser = { ...oldUser, avatar: user.avatar }
          localStorage.setItem('user', JSON.stringify(newUser))
          window.dispatchEvent(new Event('profileUpdated'))
      } else {
          setProfil((prev) => ({ ...prev, foto: croppedImage }))
          setDraft((prev) => ({ ...prev, foto: croppedImage }))
      }
      
      setImageSrc(null)
    } catch (e) {
      console.error(e)
      alert(e.response?.data?.message || "Gagal menyimpan foto profil")
    } finally {
      setIsUploadingFoto(false)
    }
  }

  const handleEdit = () => {
    setDraft(profil)
    setEditing(true)
  }

  const handleSimpan = async () => {
    setIsSubmitting(true)
    try {
      const payload = {
         name: draft.nama || '',
         phone: draft.phone || '',
         nim: draft.nim || ''
      }
      if (draft.email) payload.email = draft.email
      
      // Karena tidak kirim file lagi, cukup pakai PATCH dengan JSON biasa
      const response = await axios.patch('/me', payload)
      
      if (response.data && response.data.data) {
          const user = response.data.data
          const updatedProfile = {
            ...draft,
            foto: profil.foto, // pertahankan foto yang sudah ada
            phone: user.phone || '',
            nim: user.nim || '',
            nama: user.name || ''
          }
          setProfil(updatedProfile)
          setDraft(updatedProfile)
          
          // Perbarui localStorage user agar sidebar terupdate
          const oldUser = JSON.parse(localStorage.getItem('user')) || {}
          const newUser = { ...oldUser, name: user.name, phone: user.phone || '' }
          localStorage.setItem('user', JSON.stringify(newUser))
          window.dispatchEvent(new Event('profileUpdated'))
      } else {
          setProfil(draft)
      }
      setEditing(false)
    } catch (err) {
       console.error("Gagal menyimpan profil", err)
       alert(err.response?.data?.message || "Gagal menyimpan perubahan")
    } finally {
       setIsSubmitting(false)
    }
  }

  const setField = (key) => (e) =>
    setDraft((prev) => ({ ...prev, [key]: e.target.value }))

  const current = editing ? draft : profil

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000666]"></div>
        <p className="mt-4 text-slate-500 font-medium">Memuat profil...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full space-y-6 pb-10">

      {/* ── Hero ── */}
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Foto + tombol edit */}
        <div className="relative flex-shrink-0">
          <img
            src={profil.foto}
            alt={profil.nama}
            className="h-[140px] w-[120px] object-cover rounded-2xl border border-slate-100 shadow-sm"
          />
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFotoChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-2 right-2 h-7 w-7 bg-[#0d7c6b] hover:bg-[#0a5c4e] rounded-full flex items-center justify-center shadow transition"
          >
            <Pencil className="h-3.5 w-3.5 text-white" />
          </button>
        </div>

        {/* Nama + universitas + tombol navigasi */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-[#0a0f44] mb-2">
            {profil.nama}
          </h1>
          <p className="flex items-center gap-2 text-slate-500">
            <University className="h-4 w-4 text-slate-400" />
            {profil.universitas}
          </p>

          <div className="flex flex-wrap gap-3 mt-5">
            <Button
              onClick={() => navigate('/learner/jadwal-belajar')}
              className="bg-[#0a0f44] hover:bg-[#141a6e] text-white font-semibold px-5 py-2.5 h-auto rounded-xl text-sm gap-2"
            >
              <CalendarDays className="h-4 w-4" />
              Lihat Jadwal Belajar
            </Button>
            <Button
              onClick={() => navigate('/learner/riwayat-belajar')}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold px-5 py-2.5 h-auto rounded-xl text-sm gap-2"
            >
              <History className="h-4 w-4" />
              Lihat Riwayat Belajar
            </Button>
          </div>
        </div>
      </div>

      {/* ── Informasi Pribadi ── */}
      <div>

        {/* Informasi Pribadi */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-[#0a0f44]">Informasi Pribadi</h2>
            {editing ? (
              <button
                onClick={handleSimpan}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0d7c6b] hover:text-[#0a5c4e] transition disabled:opacity-50"
              >
                <Save className="h-3.5 w-3.5" />
                {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#0d7c6b] hover:text-[#0a5c4e] transition"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit Profil
              </button>
            )}
          </div>

          <div className="space-y-4">
            <InputField
              label="Nama"
              value={current.nama}
              onChange={setField('nama')}
              readOnly={!editing}
            />
            <InputField
              label="NIM"
              value={current.nim}
              onChange={setField('nim')}
              readOnly={!editing}
            />
            <InputField
              label="Jurusan"
              value={current.jurusan}
              onChange={setField('jurusan')}
              readOnly={!editing}
            />
            <InputField
              label="Fakultas"
              value={current.fakultas}
              onChange={setField('fakultas')}
              readOnly={!editing}
            />
            <InputField
              label="Email"
              value={current.email}
              onChange={setField('email')}
              readOnly={!editing}
            />
            <InputField
              label="Nomor Telepon"
              value={current.phone}
              onChange={setField('phone')}
              readOnly={!editing}
            />
          </div>
        </div>
      </div>

      {/* ── Banner CTA ── */}
      <div className="bg-[#0a0f44] rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <h3 className="text-xl font-extrabold text-white">Yuk daftar jadi tutor!</h3>
          <p className="text-sm text-slate-300 mt-1 max-w-sm leading-relaxed">
            "Bagikan keahlianmu dan bantu mahasiswa lain berkembang bersama."
          </p>
        </div>
        <Button
          className="flex-shrink-0 bg-white text-[#0a0f44] hover:bg-slate-100 font-bold px-6 py-2.5 h-auto rounded-xl text-sm transition-colors shadow-sm"
        >
          Daftar Tutor
        </Button>
      </div>

      {/* ── Modal Crop Foto ── */}
      {imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Sesuaikan Foto Profil</h3>
              <p className="text-sm text-slate-500">Geser dan perbesar foto Anda</p>
            </div>
            
            <div className="relative h-72 w-full bg-slate-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={120 / 140}
                showGrid={true}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-500">Zoom</span>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(e.target.value)}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0d7c6b]"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={() => setImageSrc(null)}
                  variant="outline"
                  className="flex-1 font-semibold rounded-xl text-slate-600 border-slate-300"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleSaveCrop}
                  disabled={isUploadingFoto}
                  className="flex-1 font-semibold rounded-xl bg-[#0d7c6b] hover:bg-[#0a5c4e] text-white disabled:opacity-50"
                >
                  {isUploadingFoto ? 'Menyimpan...' : 'Simpan'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
