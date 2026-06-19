import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '@/lib/axios';
import { ArrowLeft, University, FileText, Link2, ImageIcon, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminProfilUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/admin/users/${id}`);
        setUser(response.data.data);
      } catch (err) {
        console.error('Gagal mengambil detail user', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#000666]"></div>
        <p className="mt-4 text-slate-500 font-medium">Memuat profil pengguna...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-xl font-bold text-red-600 mb-2">Pengguna Tidak Ditemukan</h2>
        <Button onClick={() => navigate(-1)} className="mt-4 bg-[#0a0f44]">Kembali</Button>
      </div>
    );
  }

  const InputField = ({ label, value }) => (
    <div>
      <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase mb-1.5">{label}</p>
      <input
        type="text"
        value={value || '-'}
        readOnly
        className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 bg-slate-50 cursor-default outline-none"
      />
    </div>
  );

  const isTutor = user.role === 'tutor';

  return (
    <div className="flex flex-col min-h-full space-y-6 pb-10 animate-in fade-in duration-300">
      {/* Header with back button */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-[#0a0f44]">Profil Pengguna</h1>
      </div>

      <div className={`flex flex-col gap-6 items-start ${isTutor ? 'lg:flex-row' : 'max-w-5xl mx-auto w-full'}`}>
        {/* Kolom Kiri / Bagian Utama (Learner & Tutor) */}
        <div className={`w-full flex flex-col gap-6 ${isTutor ? 'lg:w-1/3' : 'md:flex-row md:items-stretch'}`}>
          
          {/* Card Foto Profil */}
          <div className={`bg-white rounded-[24px] border border-slate-100 shadow-sm p-8 text-center ${isTutor ? '' : 'md:w-1/3 flex flex-col items-center justify-center'}`}>
             <div className="w-32 h-32 mx-auto rounded-[24px] overflow-hidden mb-4 border-4 border-slate-50 bg-teal-50">
               <img src={user.avatar ? `http://127.0.0.1:8000/storage/${user.avatar}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`} alt={user.name} className="w-full h-full object-cover" />
             </div>
             <h2 className="text-xl font-bold text-[#0a0f44] mb-1">{user.name}</h2>
             <p className="text-sm text-slate-500 mb-3">{user.email}</p>
             <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize ${isTutor ? 'bg-[#A7F3D0] text-[#047857]' : 'bg-[#E4E4E7] text-[#52525B]'}`}>
                Role: {user.role}
             </span>
             <p className="text-sm font-semibold text-slate-600 mt-4 flex items-center justify-center gap-2">
               <University className="w-4 h-4 text-slate-400" />
               {user.university || 'Universitas Dian Nuswantoro'}
             </p>
          </div>

          {/* Card Info Pribadi */}
          <div className={`bg-white rounded-[24px] border border-slate-100 shadow-sm p-6 ${isTutor ? 'space-y-4' : 'md:w-2/3 flex flex-col justify-center'}`}>
            <h3 className="font-bold text-[#0a0f44] mb-4">Informasi Pribadi</h3>
            <div className={isTutor ? "space-y-4" : "grid grid-cols-1 sm:grid-cols-2 gap-5"}>
              <InputField label="Nama Lengkap" value={user.name} />
              <InputField label="Email" value={user.email} />
              <InputField label="Nomor Telepon" value={user.phone} />
              <InputField label="NIM" value={user.nim} />
              <InputField label="Jurusan" value={user.major || 'Teknik Informatika'} />
              <InputField label="Fakultas" value={user.faculty || 'Ilmu Komputer'} />
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Khusus Tutor */}
        {user.role === 'tutor' && (
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Keahlian & Tarif */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Tarif Per Sesi</h3>
                <p className="text-3xl font-extrabold text-[#0d7c6b]">
                  Rp {user.price_per_session ? Number(user.price_per_session).toLocaleString('id-ID') : '-'}
                </p>
              </div>
              <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">IPK</h3>
                 <p className="text-3xl font-extrabold text-indigo-600">{user.ipk || '-'}</p>
              </div>
            </div>

            {/* Mata Kuliah */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-5 h-5 text-[#0a0f44]" />
                <h3 className="font-bold text-[#0a0f44]">Mata Kuliah Diajarkan</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.courses && user.courses.length > 0 ? user.courses.map((mk, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-[#0d7c6b]/10 text-[#0d7c6b] rounded-full text-sm font-bold border border-[#0d7c6b]/20">
                    {mk.name || mk}
                  </span>
                )) : <span className="text-sm text-slate-400 italic">Belum ada data mata kuliah</span>}
              </div>
            </div>

            {/* Keahlian */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-[#0a0f44] mb-4">Keahlian Tambahan</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills && user.skills.length > 0 ? user.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200 text-slate-600 text-sm font-semibold px-3.5 py-1.5 rounded-full">
                    {skill.name || skill}
                  </span>
                )) : <span className="text-sm text-slate-400 italic">Belum ada data keahlian</span>}
              </div>
            </div>

            {/* Dokumen & Portofolio */}
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-[#0a0f44] mb-4">Dokumen & Portofolio</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.documents && user.documents.length > 0 ? user.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="w-10 h-10 rounded-lg bg-[#000666]/10 flex items-center justify-center text-[#000666]">
                      {['file', 'transcript', 'certificate'].includes(doc.type) && <FileText className="w-5 h-5" />}
                      {doc.type === 'link' && <Link2 className="w-5 h-5" />}
                      {doc.type === 'image' && <ImageIcon className="w-5 h-5" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{doc.label || 'Dokumen'}</p>
                      <a href={doc.url || doc.value || '#'} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-[#000666] truncate hover:underline cursor-pointer block">
                        {doc.type === 'link' ? (doc.value || doc.url) : doc.name}
                      </a>
                    </div>
                  </div>
                )) : <span className="text-sm text-slate-400 italic">Belum ada data dokumen</span>}
              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
