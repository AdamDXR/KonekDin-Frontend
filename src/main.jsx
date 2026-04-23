import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Layouts
import AdminLayout from '@/layouts/AdminLayout'
import TutorLayout from '@/layouts/TutorLayout'
import LearnerLayout from '@/layouts/LearnerLayout'

// Auth Pages
import Login from '@/pages/Auth/Login'

// Admin Pages
import AdminDashboard from '@/pages/Admin/Dashboard'
import KelolaUser from '@/pages/Admin/KelolaUser'
import KelolaMatakuliah from '@/pages/Admin/KelolaMatakuliah'
import ValidasiBadge from '@/pages/Admin/ValidasiBadge'
import Settings from '@/pages/Admin/Settings'
import LogTransaksi from '@/pages/Admin/LogTransaksi'

// Tutor Pages
import TutorDashboard from '@/pages/Tutor/Dashboard'
import JadwalMengajar from '@/pages/Tutor/JadwalMengajar'

// Learner Pages
import LearnerDashboard from '@/pages/Learner/Dashboard'
import CariTutor from '@/pages/Learner/CariTutor'
import DetailPesanan from '@/pages/Learner/DetailPesanan'
import JadwalBelajar from '@/pages/Learner/JadwalBelajar'
import RiwayatBelajar from '@/pages/Learner/RiwayatBelajar'
import Notifikasi from '@/pages/Learner/Notifikasi'
import ProfilTutor from '@/pages/Learner/ProfilTutor'
import ProfilLearner from '@/pages/Learner/ProfilLearner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="kelola-user" element={<KelolaUser />} />
          <Route path="kelola-matakuliah" element={<KelolaMatakuliah />} />
          <Route path="validasi-badge" element={<ValidasiBadge />} />
          <Route path="log-transaksi" element={<LogTransaksi />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Tutor Routes */}
        <Route path="/tutor" element={<TutorLayout />}>
          <Route index element={<TutorDashboard />} />
          <Route path="jadwal-mengajar" element={<JadwalMengajar />} />
        </Route>

        {/* Learner Routes */}
        <Route path="/learner" element={<LearnerLayout />}>
          {/* Default: redirect ke dashboard */}
          <Route index element={<Navigate to="/learner/dashboard" replace />} />
          <Route path="dashboard" element={<LearnerDashboard />} />
          <Route path="cari-tutor" element={<CariTutor />} />
          <Route path="profil-tutor/:id" element={<ProfilTutor />} />
          <Route path="profil-learner" element={<ProfilLearner />} />
          <Route path="detail-pesanan" element={<DetailPesanan />} />
          <Route path="jadwal-belajar" element={<JadwalBelajar />} />
          <Route path="riwayat-belajar" element={<RiwayatBelajar />} />
          <Route path="notifikasi" element={<Notifikasi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
