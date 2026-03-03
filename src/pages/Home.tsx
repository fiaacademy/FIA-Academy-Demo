import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MascotMessage } from '../components/Mascot';
import { 
  Play, Crown, Star, TrendingUp, 
  BookOpen, Trophy, ArrowRight, 
  Target, Zap, Clock, ChevronRight 
} from 'lucide-react';
import { cn } from '../utils/cn';

export const Home = () => {
  const { user } = useAuth();

  const recommendations = [
    { id: 'niaga-1', title: 'Pengantar Ilmu Administrasi Niaga', type: 'Video', duration: '12 min', progress: 45, image: 'https://picsum.photos/seed/niaga/400/250' },
    { id: 'fiskal-1', title: 'Dasar-dasar Perpajakan', type: 'Video', duration: '15 min', progress: 10, image: 'https://picsum.photos/seed/publik/400/250' },
    { id: 'negara-1', title: 'Sistem Administrasi Negara RI', type: 'Video', duration: '20 min', progress: 0, image: 'https://picsum.photos/seed/negara/400/250' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      <MascotMessage 
        message={`Halo ${user?.name}! Aku FIA Gorilla. Siap untuk lanjut belajar hari ini?`} 
        autoClose={5000} 
        animation="wave" 
      />
      
      {/* Hero Section with UI Background */}
      <section className="relative h-[400px] flex items-center px-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/ui-campus/1920/1080" 
            alt="UI Campus" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
        </div>

        <div className="relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            id="dashboard-greeting"
          >
            <h1 className="text-5xl font-black text-gray-900 tracking-tight mb-4">
              Selamat Datang, <span className="text-secondary">{user?.name}</span>! 👋
            </h1>
            <p className="text-xl text-gray-600 font-medium max-w-2xl leading-relaxed">
              Siap untuk melanjutkan perjalanan akademikmu hari ini? Fokus dan raih mimpimu di FIAcademy.
            </p>
            
            {!user?.isPremium && (
              <div className="mt-8 inline-flex items-center gap-4 bg-white/50 backdrop-blur-md p-2 pl-6 rounded-2xl border border-white shadow-xl">
                <div className="flex flex-col">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sisa Trial Gratis</p>
                  <p className="text-sm font-black text-gray-900">{user?.trialRemaining ?? 0} / 3 Video</p>
                </div>
                <Link to="/premium" className="px-6 py-3 bg-primary text-gray-900 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
                  Upgrade Premium
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="px-10 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Progress Card */}
            <motion.div 
              id="stats-xp"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2.5rem] p-10 shadow-soft border border-gray-50"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Progress Belajar</h2>
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                  <TrendingUp size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">Meningkat 12%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Level {user?.level}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{user?.xp} XP</p>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${(user?.xp || 0) % 1000 / 10}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 font-bold">{(1000 - ((user?.xp || 0) % 1000))} XP lagi untuk Level {user?.level + 1}</p>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-secondary">
                    <Target size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target Hari Ini</p>
                    <p className="text-lg font-black text-gray-900">2 / 5 Video</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-primary">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Streak Belajar</p>
                    <p className="text-lg font-black text-gray-900">5 Hari</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Rekomendasi Untukmu</h2>
                <Link to="/materi" className="text-xs font-black text-secondary uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
                  Lihat Semua <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.slice(0, 2).map((item) => (
                  <motion.div 
                    key={item.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-soft border border-gray-50 group"
                  >
                    <Link to={`/materi/${item.id}`}>
                      <div className="h-48 relative overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-900">
                          {item.type}
                        </div>
                      </div>
                    </Link>
                    <div className="p-6 space-y-4">
                      <Link to={`/materi/${item.id}`}>
                        <h3 className="font-extrabold text-gray-900 line-clamp-1 hover:text-secondary transition-colors">{item.title}</h3>
                      </Link>
                      <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1"><Clock size={12} /> {item.duration}</span>
                        <span>{item.progress}% Selesai</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-secondary" style={{ width: `${item.progress}%` }} />
                      </div>
                      <Link 
                        to={`/materi/${item.id}`}
                        className="w-full py-3 bg-gray-50 text-gray-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center"
                      >
                        Lanjut Belajar
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="space-y-10">
            {/* Leaderboard Preview */}
            <div id="nav-gamifikasi" className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-50">
              <h3 className="text-lg font-black text-gray-900 tracking-tight mb-6">Top Mahasiswa</h3>
              <div className="space-y-4">
                {[
                  { name: 'Budi Santoso', xp: 2450, rank: 1, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi' },
                  { name: 'Siti Aminah', xp: 2100, rank: 2, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti' },
                  { name: 'Andi Wijaya', xp: 1950, rank: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi' },
                ].map((student) => (
                  <div key={student.rank} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-xl bg-gray-100" />
                        <div className={cn(
                          "absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg",
                          student.rank === 1 ? "bg-yellow-400" : student.rank === 2 ? "bg-gray-400" : "bg-orange-400"
                        )}>
                          {student.rank}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-gray-900">{student.name}</p>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{student.xp} XP</p>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-gray-300" />
                  </div>
                ))}
              </div>
              <Link to="/gamifikasi" className="w-full mt-6 py-3 border border-gray-100 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest hover:text-secondary hover:border-secondary transition-all flex items-center justify-center gap-2">
                Lihat Leaderboard <ArrowRight size={14} />
              </Link>
            </div>

            {/* Target Card */}
            <div className="bg-secondary text-white rounded-[2.5rem] p-8 shadow-xl shadow-secondary/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-lg font-black tracking-tight mb-2 relative z-10">Target Mingguan</h3>
              <p className="text-blue-100 text-sm font-medium mb-6 relative z-10">Selesaikan 15 video minggu ini untuk mendapatkan Badge Eksklusif!</p>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '60%' }} />
                </div>
              </div>
            </div>

            {/* Premium CTA */}
            {!user?.isPremium && (
              <Link id="nav-premium" to="/premium" className="block bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <Crown className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-extrabold mb-2">Akses Tanpa Batas</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Unlock semua video materi dan dapatkan Double XP setiap hari!
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm">
                  Upgrade Sekarang <ArrowRight size={16} />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
