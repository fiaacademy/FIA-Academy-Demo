import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Trophy, Star, Award, Medal, Crown, Zap, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

const LEADERBOARD = [
  { rank: 1, name: 'Budi Santoso', xp: 2500, level: 5, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=budi', badge: 'Master Akademik' },
  { rank: 2, name: 'Siti Aminah', xp: 2100, level: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=siti', badge: 'Rajin Banget' },
  { rank: 3, name: 'Ahmad Fauzi', xp: 1800, level: 4, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad', badge: 'Top 10 Nasional' },
  { rank: 4, name: 'Rina Wati', xp: 1500, level: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rina', badge: 'Rajin Banget' },
  { rank: 5, name: 'Joko Anwar', xp: 1200, level: 3, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joko', badge: 'Newbie' },
];

export const Gamifikasi = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('Minggu Ini');

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">Papan Peringkat</h1>
          <p className="text-gray-500 font-medium">Kumpulkan XP dan jadilah mahasiswa terbaik di FIAcademy!</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-16 overflow-x-auto pb-2 scrollbar-hide">
          {['Hari Ini', 'Minggu Ini', 'Tahun Ini', 'All Time'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-8 py-3.5 rounded-2xl font-bold text-sm transition-all whitespace-nowrap border",
                filter === f
                  ? "bg-primary text-gray-900 border-primary shadow-lg shadow-primary/20"
                  : "bg-white text-gray-500 hover:bg-gray-50 border-gray-100"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Top 3 Podium */}
          <div className="lg:col-span-3 flex justify-center items-end gap-6 md:gap-12 mb-16 h-80">
            {/* Rank 2 */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col items-center">
              <div className="relative mb-6">
                <img src={LEADERBOARD[1].avatar} alt="" className="w-20 h-20 md:w-24 md:h-24 rounded-3xl border-4 border-gray-200 bg-white shadow-xl" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-400 text-white w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shadow-lg border-4 border-white">2</div>
              </div>
              <div className="w-28 md:w-40 h-36 bg-gray-50 rounded-t-[2.5rem] flex flex-col items-center justify-start pt-6 shadow-soft border border-gray-100">
                <p className="font-extrabold text-gray-900 text-sm truncate w-full text-center px-4">{LEADERBOARD[1].name}</p>
                <p className="text-xs font-black text-secondary mt-2 uppercase tracking-widest">{LEADERBOARD[1].xp} XP</p>
              </div>
            </motion.div>

            {/* Rank 1 */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center z-10">
              <div className="relative mb-6">
                <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 text-primary w-10 h-10 drop-shadow-xl animate-bounce" />
                <img src={LEADERBOARD[0].avatar} alt="" className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] border-4 border-primary bg-white shadow-2xl" />
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary text-gray-900 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm shadow-xl border-4 border-white">1</div>
              </div>
              <div className="w-32 md:w-48 h-48 bg-primary/10 rounded-t-[3rem] flex flex-col items-center justify-start pt-8 shadow-soft border border-primary/20">
                <p className="font-extrabold text-gray-900 text-base truncate w-full text-center px-4">{LEADERBOARD[0].name}</p>
                <p className="text-sm font-black text-secondary mt-2 uppercase tracking-widest">{LEADERBOARD[0].xp} XP</p>
              </div>
            </motion.div>

            {/* Rank 3 */}
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col items-center">
              <div className="relative mb-6">
                <img src={LEADERBOARD[2].avatar} alt="" className="w-20 h-20 md:w-24 md:h-24 rounded-3xl border-4 border-amber-200 bg-white shadow-xl" />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shadow-lg border-4 border-white">3</div>
              </div>
              <div className="w-28 md:w-40 h-28 bg-amber-50/50 rounded-t-[2.5rem] flex flex-col items-center justify-start pt-6 shadow-soft border border-amber-100">
                <p className="font-extrabold text-gray-900 text-sm truncate w-full text-center px-4">{LEADERBOARD[2].name}</p>
                <p className="text-xs font-black text-secondary mt-2 uppercase tracking-widest">{LEADERBOARD[2].xp} XP</p>
              </div>
            </motion.div>
          </div>

          {/* List Rank 4+ */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="text-secondary" size={24} /> Peringkat Mahasiswa
            </h3>
            <div className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {LEADERBOARD.slice(3).map((player) => (
                <motion.div 
                  key={player.rank} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="flex items-center justify-between p-6 hover:bg-gray-50 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <span className="w-8 text-center font-black text-gray-300 group-hover:text-secondary transition-colors">{player.rank}</span>
                    <img src={player.avatar} alt="" className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-extrabold text-gray-900 group-hover:text-secondary transition-colors">{player.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Level {player.level}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{player.badge}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900 text-lg">{player.xp}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">XP</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* User Stats Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl text-white relative overflow-hidden sticky top-8">
              <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
              
              <h3 className="font-extrabold text-xl mb-8 flex items-center gap-3 relative z-10">
                <Star className="fill-primary text-primary" size={24} /> Statistik Kamu
              </h3>
              
              <div className="flex items-center gap-6 mb-10 relative z-10">
                <div className="relative">
                  <img src={user?.avatar} alt="" className="w-20 h-20 rounded-3xl border-2 border-white/20 bg-white/5" />
                  <div className="absolute -bottom-2 -right-2 bg-primary text-gray-900 w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border-4 border-gray-900">
                    {user?.level}
                  </div>
                </div>
                <div>
                  <p className="font-extrabold text-xl tracking-tight">{user?.name}</p>
                  <p className="text-primary text-xs font-black uppercase tracking-widest mt-1">Peringkat #42 Nasional</p>
                </div>
              </div>

              <div className="space-y-6 relative z-10">
                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-2">Total XP Terkumpul</p>
                  <div className="flex items-baseline justify-between mb-4">
                    <p className="text-4xl font-black tracking-tight">{user?.xp}</p>
                    <p className="text-xs font-bold text-primary">Level {user?.level}</p>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-primary h-full rounded-full transition-all duration-1000" style={{ width: `${((user?.xp || 0) % 1000) / 10}%` }} />
                  </div>
                  <p className="text-[10px] font-bold text-gray-500 mt-3 text-right uppercase tracking-widest">
                    {(1000 - ((user?.xp || 0) % 1000))} XP lagi ke Level {user?.level! + 1}
                  </p>
                </div>

                <div className="bg-white/5 rounded-3xl p-6 border border-white/10">
                  <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-4">Pencapaian Terbaru</p>
                  <div className="flex flex-wrap gap-2">
                    {user?.badges.map((badge, i) => (
                      <span key={i} className="px-4 py-1.5 bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-white/5">
                        <Medal size={12} className="text-primary" /> {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Link to="/profile" className="w-full mt-10 py-4 bg-white text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-primary transition-all relative z-10">
                Lihat Profil Lengkap <ChevronRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
