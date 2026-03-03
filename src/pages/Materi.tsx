import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Search, Play, 
  Star, ChevronRight, BookOpen, 
  Clock
} from 'lucide-react';
import { cn } from '../utils/cn';
import { Link } from 'react-router-dom';

const JURUSAN = ['Semua', 'Niaga', 'Fiskal', 'Negara'];

const COURSES = [
  { 
    id: 'niaga-1', 
    title: 'Pengantar Ilmu Administrasi Niaga', 
    jurusan: 'Niaga', 
    videos: 14, 
    image: 'https://picsum.photos/seed/niaga1/600/400',
    desc: 'Mempelajari dasar-dasar administrasi dalam dunia bisnis dan korporasi.'
  },
  { 
    id: 'fiskal-1', 
    title: 'Dasar-dasar Perpajakan', 
    jurusan: 'Fiskal', 
    videos: 14, 
    image: 'https://picsum.photos/seed/fiskal1/600/400',
    desc: 'Memahami sistem perpajakan di Indonesia dan kebijakan fiskal global.'
  },
  { 
    id: 'negara-1', 
    title: 'Sistem Administrasi Negara RI', 
    jurusan: 'Negara', 
    videos: 14, 
    image: 'https://picsum.photos/seed/negara1/600/400',
    desc: 'Analisis mendalam mengenai struktur dan fungsi birokrasi di Indonesia.'
  },
  { 
    id: 'niaga-2', 
    title: 'Manajemen Pemasaran Strategis', 
    jurusan: 'Niaga', 
    videos: 14, 
    image: 'https://picsum.photos/seed/niaga2/600/400',
    desc: 'Strategi pemasaran modern untuk meningkatkan daya saing bisnis.'
  },
  { 
    id: 'fiskal-2', 
    title: 'Kebijakan Fiskal & Moneter', 
    jurusan: 'Fiskal', 
    videos: 14, 
    image: 'https://picsum.photos/seed/fiskal2/600/400',
    desc: 'Hubungan antara kebijakan fiskal pemerintah dan stabilitas moneter.'
  },
  { 
    id: 'negara-2', 
    title: 'Kepemimpinan Sektor Publik', 
    jurusan: 'Negara', 
    videos: 14, 
    image: 'https://picsum.photos/seed/negara2/600/400',
    desc: 'Membangun jiwa kepemimpinan yang berintegritas di instansi pemerintah.'
  },
];

export const Materi = () => {
  const { user } = useAuth();
  const [selectedJurusan, setSelectedJurusan] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter(course => {
    const matchesJurusan = selectedJurusan === 'Semua' || course.jurusan === selectedJurusan;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesJurusan && matchesSearch;
  });

  const getCourseProgress = (courseId: string) => {
    const progress = user?.videoProgress.filter(v => v.courseId === courseId) || [];
    if (progress.length === 0) return 0;
    const totalProgress = progress.reduce((acc, curr) => acc + curr.progress, 0);
    return Math.round(totalProgress / 14);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 id="nav-materi" className="text-4xl font-black text-gray-900 tracking-tight">Eksplorasi Materi</h1>
            <p className="text-gray-500 font-medium">Pilih mata kuliah dan mulai perjalanan akademikmu hari ini.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari mata kuliah..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none w-full sm:w-64 font-bold text-gray-700 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Jurusan Filter */}
        <div className="flex flex-wrap gap-3">
          {JURUSAN.map((j) => (
            <button
              key={j}
              onClick={() => setSelectedJurusan(j)}
              className={cn(
                "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                selectedJurusan === j 
                  ? "bg-secondary text-white shadow-xl shadow-secondary/20" 
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100"
              )}
            >
              {j}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredCourses.map((course, i) => {
            const progress = getCourseProgress(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[2.5rem] overflow-hidden shadow-soft border border-gray-50 group flex flex-col"
              >
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-900 shadow-lg">
                    {course.jurusan}
                  </div>
                  {progress === 100 && (
                    <div className="absolute top-6 right-6 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg">
                      <Star size={20} fill="currentColor" />
                    </div>
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium mb-6 line-clamp-2 leading-relaxed">
                    {course.desc}
                  </p>

                  <div className="mt-auto space-y-6">
                    <div className="flex items-center justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <span className="flex items-center gap-2"><Play size={14} fill="currentColor" /> {course.videos} Video</span>
                      <span>{progress}% Selesai</span>
                    </div>
                    
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>

                    <Link 
                      to={`/materi/${course.id}`}
                      className="w-full py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Lihat Detail <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Search size={32} />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Mata kuliah tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
};
