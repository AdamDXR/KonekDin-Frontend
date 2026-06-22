import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '@/lib/axios';
import BookingCard from '@/components/shared/BookingCard';
import { 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Calendar, 
  Video, 
  ChevronRight, 
  Star,
  TrendingUp,
  Award,
  Info,
  Lightbulb,
  MessageSquare
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Button } from '@/components/ui/button';

// Mock Data for the Chart
const chartData = [
  { name: 'Jan', jam: 10 },
  { name: 'Feb', jam: 15 },
  { name: 'Mar', jam: 13 },
  { name: 'Apr', jam: 22 },
  { name: 'Mei', jam: 18 },
  { name: 'Jun', jam: 25 },
];

export default function LearnerDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total_sessions: 0,
    total_hours: 0,
    total_subjects: 0
  });
  const [upcomingSchedule, setUpcomingSchedule] = useState(null);
  const [recommendedTutors, setRecommendedTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Ambil data user dari localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // 2. Fetch dashboard data dari server
    const fetchDashboard = async () => {
      try {
        const response = await axios.get('/dashboard');
        console.log("Dashboard Response:", response.data);
        if (response.data && response.data.data) {
          const { stats, upcoming_schedule, recommended_tutors } = response.data.data;
          if (stats) setStats(stats);
          if (upcoming_schedule) setUpcomingSchedule(upcoming_schedule);
          if (recommended_tutors) setRecommendedTutors(recommended_tutors);
        }
      } catch (error) {
        console.error('Gagal mengambil data dashboard', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex flex-col min-h-full">
      
      {/* 1. Top Welcome Banner */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-[#000666] to-teal-700 rounded-[32px] p-10 flex flex-col md:flex-row items-start md:items-center justify-between text-white shadow-xl shadow-teal-900/10 relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -right-20 -top-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Selamat Datang Kembali, {user?.name ? user.name.split(' ')[0] : 'Learner'}! 👋
            </h1>
            <p className="text-teal-100 font-medium text-sm md:text-base">
              Siap untuk melanjutkan petualangan belajarmu hari ini?
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/learner/cari-tutor')}
            className="mt-6 md:mt-0 bg-white text-[#000666] hover:bg-slate-100 rounded-2xl px-8 h-14 font-bold text-base shadow-lg transition-transform hover:scale-105 relative z-10"
          >
            + Sesi Baru
          </Button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8 pb-10">
        
        {/* 2. Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total Sesi */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
              <CheckCircle className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Sesi Selesai</div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-slate-900">{stats.total_sessions}</span>
                <span className="flex items-center text-emerald-600 text-xs font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3 mr-1" /> +12.5%
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Jam Belajar */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Total Jam Belajar</div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-slate-900">{stats.total_hours}<span className="text-xl text-slate-500 font-bold"> jam</span></span>
                <span className="flex items-center text-emerald-600 text-xs font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3 mr-1" /> +18.5%
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Mata Kuliah */}
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0">
              <BookOpen className="w-7 h-7 text-orange-600" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-wider">Matkul Dipelajari</div>
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-slate-900">{stats.total_subjects}</span>
                <span className="flex items-center text-emerald-600 text-xs font-bold mb-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <TrendingUp className="w-3 h-3 mr-1" /> +7.0%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Layout (Left 60% / Right 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN (col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Jadwal Mendatang */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#000666]">Jadwal Mendatang</h2>
                <Button variant="link" className="text-teal-600 font-bold p-0" onClick={() => navigate('/learner/jadwal-belajar')}>
                  Lihat Semua
                </Button>
              </div>
              
              {isLoading ? (
                <div className="animate-pulse bg-slate-100 rounded-2xl h-40 w-full"></div>
              ) : upcomingSchedule ? (
                <BookingCard
                  image={upcomingSchedule.tutor?.avatar ? (upcomingSchedule.tutor.avatar.startsWith('http') ? upcomingSchedule.tutor.avatar : `http://127.0.0.1:8000/storage/${upcomingSchedule.tutor.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(upcomingSchedule.tutor?.name || upcomingSchedule.tutor || 'Tutor')}&background=random`}
                  rating={Number(upcomingSchedule.tutor?.rating_avg || 0)}
                  title={upcomingSchedule.tutor?.name || upcomingSchedule.tutor || 'Nama Tutor'}
                  subtitle={upcomingSchedule.course?.name || upcomingSchedule.course || 'Sesi Belajar'}
                  date={upcomingSchedule.date}
                  time={upcomingSchedule.time}
                  actionNode={
                    <Button 
                      onClick={() => navigate(`/learner/jadwal-belajar?tutor=${upcomingSchedule.tutor?.name || upcomingSchedule.tutor}`)}
                      className="w-full sm:w-auto bg-[#000666] hover:bg-blue-900 text-white rounded-xl h-12 px-6 font-bold"
                    >
                      Rincian Sesi
                    </Button>
                  }
                />
              ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-[24px] p-8 text-center text-slate-500 flex flex-col items-center">
                  <Calendar className="w-10 h-10 text-slate-300 mb-3" />
                  <p className="font-medium">Tidak ada jadwal terdekat.</p>
                  <p className="text-sm mt-1">Yuk pesan sesi baru dan mulai belajar!</p>
                </div>
              )}
            </div>

            {/* Insight Cards */}
            <div className="space-y-4">
              {/* Insight 1: Sesi Belajar */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-[24px] p-5 flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="bg-blue-100 p-2.5 rounded-2xl flex-shrink-0 mt-0.5 shadow-sm">
                  <Info className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-1 text-sm">Informasi Sesi Belajar</h3>
                  <p className="text-blue-800 text-[13px] leading-relaxed font-medium">
                    Setiap sesi belajar berdurasi <span className="font-bold bg-white/50 px-1.5 py-0.5 rounded text-blue-900">50 menit</span>. Anda dapat memesan <span className="font-bold bg-white/50 px-1.5 py-0.5 rounded text-blue-900">lebih dari 1 sesi</span> sekaligus untuk memperpanjang waktu belajar bersama tutor secara otomatis.
                  </p>
                </div>
              </div>

              {/* Insight 2: Tips Persiapan */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-[24px] p-5 flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
                <div className="bg-emerald-100 p-2.5 rounded-2xl flex-shrink-0 mt-0.5 shadow-sm">
                  <Lightbulb className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 mb-1 text-sm">Tips Belajar Maksimal</h3>
                  <p className="text-emerald-800 text-[13px] leading-relaxed font-medium">
                    Pastikan Anda telah <span className="font-bold bg-white/50 px-1.5 py-0.5 rounded text-emerald-900">menyiapkan materi & pertanyaan</span> sebelum sesi dimulai agar waktu diskusi bersama tutor bisa digunakan secara efisien.
                  </p>
                </div>
              </div>

              {/* Insight 3: Ulasan */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 rounded-[24px] p-5 flex items-start gap-4 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-700 delay-200">
                <div className="bg-orange-100 p-2.5 rounded-2xl flex-shrink-0 mt-0.5 shadow-sm">
                  <MessageSquare className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h3 className="font-bold text-orange-900 mb-1 text-sm">Bantu Learner Lain</h3>
                  <p className="text-orange-800 text-[13px] leading-relaxed font-medium">
                    Jangan lupa untuk <span className="font-bold bg-white/50 px-1.5 py-0.5 rounded text-orange-900">meninggalkan ulasan</span> setelah sesi berakhir! Ulasan Anda sangat berharga bagi teman-teman Learner lain untuk menemukan tutor terbaik.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#000666]">Tutor Rekomendasi</h2>
              <div className="bg-yellow-100 text-yellow-700 p-1.5 rounded-lg">
                <Award className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-6 space-y-5">
              
              {isLoading ? (
                <div className="animate-pulse space-y-6">
                   <div className="h-20 bg-slate-100 rounded-xl"></div>
                   <div className="h-20 bg-slate-100 rounded-xl"></div>
                   <div className="h-20 bg-slate-100 rounded-xl"></div>
                </div>
              ) : recommendedTutors && recommendedTutors.length > 0 ? (
                recommendedTutors.slice(0, 3).map((tutor, index, arr) => (
                  <div key={tutor.id || index}>
                    <div className="flex items-center justify-between group cursor-pointer" onClick={() => navigate(`/learner/profil-tutor/${tutor.id}`)}>
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <img src={tutor.avatar ? (tutor.avatar.startsWith('http') ? tutor.avatar : `http://127.0.0.1:8000/storage/${tutor.avatar}`) : `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&background=random`} alt={tutor.name} className="w-24 h-24 rounded-xl object-cover border border-slate-100 group-hover:ring-2 ring-teal-500 ring-offset-2 transition-all" />
                          <div className="absolute top-2 right-2 bg-white px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold shadow-sm">
                            <Star className="w-2 h-2 text-yellow-400 fill-yellow-400" /> {Number(tutor.rating_avg || tutor.rating || 0).toFixed(1)}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg mb-0.5 group-hover:text-teal-600 transition-colors">{tutor.name}</h3>
                          <div className="text-md text-slate-500 font-medium">{tutor.courses ? (tutor.courses[0]?.name || tutor.courses[0]) : 'Tutor'}</div>
                          <div className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">({tutor.review_count || 120 - index * 15} Ulasan)</div>
                        </div>
                      </div>
                    </div>

                    {index < arr.length - 1 && (
                      <div className="h-px bg-slate-100 w-full mt-5"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center text-slate-500 py-6 font-medium">Belum ada tutor rekomendasi</div>
              )}

            </div>

            <Button 
              onClick={() => navigate('/learner/cari-tutor')}
              variant="outline"
              className="w-full h-14 border-2 border-dashed border-teal-700 text-teal-700 bg-teal-50/50 hover:bg-teal-50 hover:border-blue-700 hover:text-blue-700 rounded-2xl font-bold transition-all"
            >
              Jelajahi Tutor Lainnya
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>

          </div>
        </div>

      </div>
    </div>
  );
}
