import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import '../../src/index.css'

// Layouts
import AdminLayout from '@/layouts/AdminLayout'
import TutorLayout from '@/layouts/TutorLayout'
import LearnerLayout from '@/layouts/LearnerLayout'

// Auth Pages
import Login from '@/pages/Auth/Login'

// Admin Pages
import AdminDashboard from '@/pages/Admin/Dashboard'
import KelolaUser from '@/pages/Admin/KelolaUser'

// Tutor Pages
import TutorDashboard from '@/pages/Tutor/Dashboard'
import JadwalMengajar from '@/pages/Tutor/JadwalMengajar'

// Learner Pages
import LearnerDashboard from '@/pages/Learner/Dashboard'
import CariTutor from '@/pages/Learner/CariTutor'

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
        </Route>

        {/* Tutor Routes */}
        <Route path="/tutor" element={<TutorLayout />}>
          <Route index element={<TutorDashboard />} />
          <Route path="jadwal-mengajar" element={<JadwalMengajar />} />
        </Route>

        {/* Learner Routes */}
        <Route path="/learner" element={<LearnerLayout />}>
          <Route index element={<LearnerDashboard />} />
          <Route path="cari-tutor" element={<CariTutor />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
