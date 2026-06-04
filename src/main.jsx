import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// Layouts
import AdminLayout from "@/layouts/AdminLayout";
import TutorLayout from "@/layouts/TutorLayout";
import LearnerLayout from "@/layouts/LearnerLayout";

// Auth Pages
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import RegisterTutorDokumen from "@/pages/Auth/RegisterTutorDokumen";
import RegisterTutorMataKuliah from "@/pages/Auth/RegisterTutorMataKuliah";
import RegisterTutorKeahlian from "@/pages/Auth/RegisterTutorKeahlian";
import RegisterTutorTinjauan from "@/pages/Auth/RegisterTutorTinjauan";

// Landing Page
import Landing from "@/pages/Landing/Landing";

// Admin Pages
// import AdminDashboard from '@/pages/Admin/Dashboard'
// import KelolaUser from '@/pages/Admin/KelolaUser'
// import KelolaMatakuliah from '@/pages/Admin/KelolaMatakuliah'
// import ValidasiBadge from '@/pages/Admin/ValidasiBadge'
// import Settings from '@/pages/Admin/Settings'
// import LogTransaksi from '@/pages/Admin/LogTransaksi'

// Tutor Pages
import TutorDashboard from "@/pages/Tutor/Dashboard";
import JadwalMengajar from "@/pages/Tutor/JadwalMengajar";
import RiwayatMengajar from "@/pages/Tutor/RiwayatMengajar";
import PengaturanJadwal from "@/pages/Tutor/PengaturanJadwal";
import Ulasan from '@/pages/Tutor/Ulasan'
import NotifikasiTutor from '@/pages/Tutor/Notifikasi'
import Profil from '@/pages/Tutor/Profil'

// Learner Pages
import LearnerDashboard from '@/pages/Learner/Dashboard'
import CariTutor from '@/pages/Learner/CariTutor'
import DetailPesanan from '@/pages/Learner/DetailPesanan'
import JadwalBelajar from '@/pages/Learner/JadwalBelajar'
import RiwayatBelajar from '@/pages/Learner/RiwayatBelajar'
import Notifikasi from '@/pages/Learner/Notifikasi'
import ProfilTutor from '@/pages/Learner/ProfilTutor'
import ProfilLearner from '@/pages/Learner/ProfilLearner'
import Pembayaran from '@/pages/Learner/Pembayaran'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/tutor/dokumen" element={<RegisterTutorDokumen />} />
        <Route path="/register/tutor/mata-kuliah" element={<RegisterTutorMataKuliah />} />
        <Route path="/register/tutor/keahlian" element={<RegisterTutorKeahlian />} />
        <Route path="/register/tutor/tinjauan" element={<RegisterTutorTinjauan />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* 
          <Route index element={<AdminDashboard />} />
          <Route path="kelola-user" element={<KelolaUser />} />
          <Route path="kelola-matakuliah" element={<KelolaMatakuliah />} />
          <Route path="validasi-badge" element={<ValidasiBadge />} />
          <Route path="log-transaksi" element={<LogTransaksi />} />
          <Route path="settings" element={<Settings />} /> 
          */}
        </Route>

        {/* Tutor Routes */}
        <Route path="/tutor" element={<TutorLayout />}>
          <Route index element={<Navigate to="/tutor/dashboard" replace />} />
          <Route path="dashboard" element={<TutorDashboard />} />
          <Route path="jadwal-mengajar" element={<JadwalMengajar />} />
          <Route path="riwayat-mengajar" element={<RiwayatMengajar />} />
          <Route path="pengaturan-jadwal" element={<PengaturanJadwal />} />
          <Route path="ulasan" element={<Ulasan />} />
          <Route path="notifikasi" element={<NotifikasiTutor />} />
          <Route path="profil" element={<Profil />} />
        </Route>

        {/* Learner Routes */}
        <Route path="/learner" element={<LearnerLayout />}>
          {/* Default: redirect ke dashboard */}
          <Route index element={<Navigate to="/learner/dashboard" replace />} />
          <Route path="dashboard" element={<LearnerDashboard />} />
          <Route path="cari-tutor" element={<CariTutor />} />
          <Route path="jadwal-belajar" element={<JadwalBelajar />} />
          <Route path="riwayat-belajar" element={<RiwayatBelajar />} />
          <Route path="notifikasi" element={<Notifikasi />} />
          <Route path="profil-learner" element={<ProfilLearner />} />
          <Route path="profil-tutor/:id" element={<ProfilTutor />} />
          <Route path="detail-pesanan" element={<DetailPesanan />} />
          <Route path="pembayaran" element={<Pembayaran />} />
          {/*
          <Route path="beri-ulasan/:id" element={<BeriUlasan />} />
          */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
