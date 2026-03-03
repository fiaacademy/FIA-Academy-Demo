import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Star, MessageCircle, Calendar, Award, X, ChevronRight, Filter, Search, CheckCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const MENTORS = [
  { id: 1, name: 'Dr. Budi Santoso', role: 'Dosen Administrasi Niaga', rating: 4.9, reviews: 120, price: 150000, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=budi', top: true, jurusan: 'Niaga', company: 'Universitas Indonesia' },
  { id: 2, name: 'Siti Aminah, M.Si', role: 'Praktisi Kebijakan Publik', rating: 4.8, reviews: 85, price: 120000, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=siti', top: false, jurusan: 'Negara', company: 'Kementerian Keuangan' },
  { id: 3, name: 'Ahmad Fauzi, S.E., M.Ak', role: 'Konsultan Pajak', rating: 5.0, reviews: 200, price: 200000, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ahmad', top: true, jurusan: 'Fiskal', company: 'PwC Indonesia' },
  { id: 4, name: 'Rina Wati, M.A.', role: 'Peneliti Administrasi', rating: 4.7, reviews: 50, price: 100000, img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rina', top: false, jurusan: 'Niaga', company: 'LIPI' },
];

export const Mentoring = () => {
  const { addXp } = useAuth();
  const [filter, setFilter] = useState('Semua');
  const [selectedMentor, setSelectedMentor] = useState<typeof MENTORS[0] | null>(null);
  const [search, setSearch] = useState('');

  const handleBooking = () => {
    addXp(150, 'Ikut Mentoring');
    alert(`Berhasil booking sesi dengan ${selectedMentor?.name}. +150 XP!`);
    setSelectedMentor(null);
  };

  const filteredMentors = MENTORS.filter(m => 
    (filter === 'Semua' || m.jurusan === filter) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Mentoring Profesional</h1>
            <p className="text-gray-500 mt-1 font-medium">Konsultasi langsung dengan dosen dan praktisi ahli.</p>
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Cari nama mentor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none bg-gray-50/50 text-sm transition-all"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {['Semua', 'Niaga', 'Fiskal', 'Negara'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap border",
                filter === f
                  ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20"
                  : "bg-white text-gray-500 hover:bg-gray-50 border-gray-100"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {filteredMentors.map((mentor) => (
              <motion.div
                key={mentor.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100 relative group hover:border-secondary/30 hover:shadow-xl transition-all flex flex-col"
              >
                {mentor.top && (
                  <div className="absolute top-4 right-4 bg-primary/20 text-gray-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-primary/30">
                    <Award size={12} /> Top Mentor
                  </div>
                )}
                
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="relative mb-4">
                    <img src={mentor.img} alt={mentor.name} className="w-24 h-24 rounded-3xl bg-gray-50 border border-gray-100 object-cover" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-xl border-4 border-white flex items-center justify-center text-white">
                      <CheckCircle size={16} />
                    </div>
                  </div>
                  <h3 className="font-extrabold text-gray-900 text-lg leading-tight mb-1">{mentor.name}</h3>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">{mentor.role}</p>
                  <p className="text-xs text-gray-400 font-medium">{mentor.company}</p>
                </div>

                <div className="flex items-center justify-center gap-4 mb-8 bg-gray-50/50 py-3 rounded-2xl border border-gray-100">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-gray-900 font-black text-sm">
                      <Star size={14} className="fill-primary text-primary" /> {mentor.rating}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Rating</p>
                  </div>
                  <div className="w-px h-6 bg-gray-200" />
                  <div className="text-center">
                    <p className="text-gray-900 font-black text-sm">{mentor.reviews}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ulasan</p>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tarif Sesi</span>
                    <span className="font-black text-gray-900">Rp {mentor.price.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMentor(mentor)}
                      className="flex-1 py-3.5 bg-primary text-gray-900 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      Booking <ChevronRight size={18} />
                    </button>
                    <button className="p-3.5 bg-white text-gray-400 border border-gray-100 rounded-2xl hover:bg-gray-50 hover:text-secondary transition-all">
                      <MessageCircle size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Booking Modal */}
        <AnimatePresence>
          {selectedMentor && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-[2.5rem] p-8 lg:p-12 w-full max-w-xl shadow-2xl relative border border-gray-100"
              >
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="absolute top-8 right-8 p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
                >
                  <X size={20} />
                </button>
                
                <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">Jadwalkan Sesi</h2>
                
                <div className="flex items-center gap-6 mb-10 p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <img src={selectedMentor.img} alt={selectedMentor.name} className="w-16 h-16 rounded-2xl bg-white border border-gray-100" />
                  <div>
                    <h3 className="font-extrabold text-gray-900">{selectedMentor.name}</h3>
                    <p className="text-sm font-bold text-secondary uppercase tracking-wider">{selectedMentor.role}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Pilih Tanggal</label>
                    <input type="date" className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-sm bg-gray-50/50 focus:bg-white transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Pilih Waktu</label>
                    <select className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-sm bg-gray-50/50 focus:bg-white transition-all">
                      <option>09:00 - 10:00 WIB</option>
                      <option>10:00 - 11:00 WIB</option>
                      <option>13:00 - 14:00 WIB</option>
                      <option>15:00 - 16:00 WIB</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-widest">Topik Diskusi</label>
                    <textarea rows={3} className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none resize-none text-sm bg-gray-50/50 focus:bg-white transition-all" placeholder="Jelaskan secara singkat apa yang ingin Anda pelajari..."></textarea>
                  </div>
                </div>

                <button
                  onClick={handleBooking}
                  className="w-full py-4 bg-primary text-gray-900 rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                  <Calendar size={20} /> Konfirmasi Jadwal Sesi
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
