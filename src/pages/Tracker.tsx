import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, BookOpen, Target, Trophy, Calendar, Zap, TrendingUp } from 'lucide-react';

const dataJamBelajar = [
  { name: 'Sen', jam: 2 },
  { name: 'Sel', jam: 3 },
  { name: 'Rab', jam: 1.5 },
  { name: 'Kam', jam: 4 },
  { name: 'Jum', jam: 2.5 },
  { name: 'Sab', jam: 5 },
  { name: 'Min', jam: 1 },
];

const dataXP = [
  { name: 'Minggu 1', xp: 120 },
  { name: 'Minggu 2', xp: 250 },
  { name: 'Minggu 3', xp: 400 },
  { name: 'Minggu 4', xp: 650 },
];

export const Tracker = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Jam Belajar', value: '19.5h', icon: <Clock size={24} />, color: 'bg-secondary/10 text-secondary', trend: '+2.4h' },
    { label: 'Total XP', value: user?.xp || 0, icon: <Zap size={24} fill="currentColor" />, color: 'bg-primary/10 text-primary', trend: '+120' },
    { label: 'Materi Selesai', value: '12', icon: <BookOpen size={24} />, color: 'bg-emerald-50 text-emerald-500', trend: '+2' },
    { label: 'Level', value: user?.level || 1, icon: <Trophy size={24} />, color: 'bg-amber-50 text-amber-500', trend: 'Top 10%' },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Analitik Belajar</h1>
          <p className="text-gray-500 mt-1 font-medium">Pantau perkembangan akademikmu secara real-time.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-soft border border-gray-100 group hover:border-secondary/20 transition-all"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", stat.color)}>
                {stat.icon}
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Hours Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-soft border border-gray-100"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-3">
                <Calendar className="text-secondary" size={24} /> Jam Belajar Mingguan
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-secondary rounded-full" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Waktu (Jam)</span>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataJamBelajar}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 800 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 800 }} dx={-10} />
                  <Tooltip 
                    cursor={{ fill: '#f9fafb' }} 
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '1rem' }} 
                  />
                  <Bar dataKey="jam" fill="#3B82F6" radius={[10, 10, 0, 0]} barSize={45} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* XP Growth Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.2 }} 
            className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-soft border border-gray-100"
          >
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-3">
                <TrendingUp className="text-primary" size={24} /> Pertumbuhan XP
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">XP Akumulatif</span>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataXP}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 800 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 800 }} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '1rem' }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#FACC15" 
                    strokeWidth={6} 
                    dot={{ r: 8, fill: '#FACC15', strokeWidth: 4, stroke: '#fff' }} 
                    activeDot={{ r: 10, strokeWidth: 0 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Weekly Insights */}
        <div className="mt-12 bg-gray-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center shrink-0 border border-white/10">
              <Target className="text-primary" size={48} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-extrabold mb-2 tracking-tight">Insight AI: Kamu sangat produktif di hari Sabtu!</h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                Berdasarkan data belajarmu, kamu cenderung menyelesaikan lebih banyak materi di akhir pekan. 
                Coba pertahankan ritme ini untuk mencapai Level 5 dalam 2 minggu ke depan.
              </p>
            </div>
            <button className="px-8 py-4 bg-primary text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
              Lihat Rekomendasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
