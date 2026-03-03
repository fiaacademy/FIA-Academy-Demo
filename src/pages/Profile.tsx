import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Settings, LogOut, Camera, Edit2, Shield, Bell, Crown, Star, Trophy, ChevronRight, Mail, Calendar, MapPin } from 'lucide-react';
import { cn } from '../utils/cn';

export const Profile = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');

  const stats = [
    { label: 'Total XP', value: user?.xp, icon: <Zap size={20} fill="currentColor" />, color: 'bg-primary/10 text-primary' },
    { label: 'Level', value: user?.level, icon: <Trophy size={20} />, color: 'bg-secondary/10 text-secondary' },
    { label: 'Badges', value: user?.badges.length, icon: <Medal size={20} />, color: 'bg-emerald-50 text-emerald-500' },
  ];

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[3rem] shadow-soft border border-gray-100 overflow-hidden">
          {/* Header/Cover */}
          <div className="h-64 bg-gray-900 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://picsum.photos/seed/ui-campus/1920/1080" 
                alt="Background" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
            
            <div className="absolute -bottom-16 left-10 flex items-end gap-8">
              <div className="relative group cursor-pointer">
                <img src={user?.avatar} alt="Profile" className="w-40 h-40 rounded-[2.5rem] border-8 border-white bg-white shadow-2xl" />
                <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={32} />
                </div>
              </div>
              <div className="mb-6 text-white">
                <h1 className="text-4xl font-black flex items-center gap-3 tracking-tight">
                  {user?.name}
                  {user?.isPremium && (
                    <div className="bg-primary text-gray-900 p-1.5 rounded-xl shadow-lg shadow-primary/20">
                      <Crown size={20} />
                    </div>
                  )}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-gray-400 font-bold text-sm uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Mail size={14} /> {user?.email}</span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span className="flex items-center gap-1.5"><MapPin size={14} /> Jakarta, ID</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="pt-28 px-10 pb-12">
            {/* Tabs */}
            <div className="flex gap-10 border-b border-gray-50 mb-12">
              {['Overview', 'Settings', 'Notifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-6 text-xs font-black uppercase tracking-widest transition-all relative",
                    activeTab === tab ? "text-secondary" : "text-gray-400 hover:text-gray-900"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div layoutId="activeTabProfile" className="absolute bottom-0 left-0 right-0 h-1 bg-secondary rounded-t-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'Overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Stats & Badges */}
                    <div className="lg:col-span-2 space-y-10">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {stats.map((stat, i) => (
                          <div key={i} className="bg-gray-50/50 rounded-3xl p-6 border border-gray-100 flex flex-col items-center text-center group hover:bg-white hover:shadow-lg transition-all">
                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.color)}>
                              {stat.icon}
                            </div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                          </div>
                        ))}
                      </div>

                      {/* Badges */}
                      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-soft">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
                          <Shield className="text-secondary" size={24} /> Koleksi Badge
                        </h3>
                        <div className="flex flex-wrap gap-4">
                          {user?.badges.map((badge, i) => (
                            <div key={i} className="px-6 py-3 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-3 font-black text-[10px] text-gray-600 uppercase tracking-widest hover:bg-secondary hover:text-white hover:border-secondary transition-all cursor-default">
                              <Star size={14} className="fill-primary text-primary" />
                              {badge}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Menu Akun</h3>
                      <button className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-secondary transition-colors">
                            <Edit2 size={18} />
                          </div>
                          <span className="font-extrabold text-gray-700 text-sm">Edit Profil</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-secondary transition-all" />
                      </button>
                      <button className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100 group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-gray-400 group-hover:text-secondary transition-colors">
                            <Settings size={18} />
                          </div>
                          <span className="font-extrabold text-gray-700 text-sm">Pengaturan</span>
                        </div>
                        <ChevronRight size={18} className="text-gray-300 group-hover:text-secondary transition-all" />
                      </button>
                      <button onClick={logout} className="w-full flex items-center justify-between p-5 bg-red-50 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-transparent group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-red-500 group-hover:scale-110 transition-transform">
                            <LogOut size={18} />
                          </div>
                          <span className="font-extrabold text-sm uppercase tracking-widest">Keluar Akun</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'Settings' && (
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-10 tracking-tight">Pengaturan Profil</h3>
                    <div className="space-y-8">
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Nama Lengkap</label>
                        <input type="text" defaultValue={user?.name} className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none bg-gray-50/50 font-bold text-gray-700" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Alamat Email</label>
                        <input type="email" defaultValue={user?.email} className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none bg-gray-100 font-bold text-gray-400" disabled />
                        <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">Email tidak dapat diubah untuk alasan keamanan.</p>
                      </div>
                      <button className="px-10 py-4 bg-primary text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'Notifications' && (
                  <div className="max-w-2xl">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-10 tracking-tight flex items-center gap-3">
                      <Bell className="text-secondary" size={24} /> Notifikasi & Alert
                    </h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Email Notifikasi', desc: 'Dapatkan update mingguan via email.' },
                        { title: 'Push Notifikasi', desc: 'Notifikasi langsung di browser kamu.' },
                        { title: 'Update Materi', desc: 'Info saat ada materi kuliah baru.' },
                        { title: 'Pengingat Belajar', desc: 'Ingatkan aku jika belum belajar hari ini.' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                          <div>
                            <p className="font-extrabold text-gray-900 text-sm mb-1">{item.title}</p>
                            <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                            <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

function Zap(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function Medal(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
      <path d="M11 12 5.12 2.2" />
      <path d="m13 12 5.88-9.8" />
      <path d="M8 7h8" />
      <circle cx="12" cy="17" r="5" />
      <path d="M12 18v-2" />
    </svg>
  );
}
