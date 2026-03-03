import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiaGorilla } from '../components/Mascot';
import { ChevronRight, Play } from 'lucide-react';

const slides = [
  {
    title: "Selamat Datang di FIAcademy!",
    desc: "Platform belajar paling asik buat Gen Z. Belajar jadi seru kayak main game!",
    animation: "wave",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "Akses Materi Lengkap",
    desc: "Pilih jurusan Niaga, Fiskal, atau Negara. Tonton video materi yang gampang dipahami.",
    animation: "point",
    color: "from-red-500 to-rose-600"
  },
  {
    title: "Dapatkan XP & Naik Level",
    desc: "Tiap selesai nonton video atau ikut mentoring, kamu bakal dapet XP. Kejar ranking 1 di Leaderboard!",
    animation: "jump",
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Ikut Mentoring 1-on-1",
    desc: "Belajar langsung dari ahlinya. Tanya sepuasnya dan dapatkan insight baru.",
    animation: "idle",
    color: "from-emerald-400 to-teal-500"
  },
  {
    title: "Unlock Fitur Premium",
    desc: "Akses semua video, materi eksklusif, dan prioritas mentoring dengan upgrade ke Premium.",
    animation: "clap",
    color: "from-purple-500 to-fuchsia-600"
  }
];

export const Onboarding = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const { completeOnboarding } = useAuth();

  const handleNext = () => {
    if (current === slides.length - 1) {
      completeOnboarding();
      navigate('/login');
    } else {
      setCurrent(c => c + 1);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(c => c - 1);
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

      <div className="w-full max-w-md p-6 z-10 flex flex-col h-[600px]">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button onClick={handleSkip} className="text-gray-500 font-medium hover:text-gray-800 transition-colors text-sm">
            Skip
          </button>
        </div>

        <div className="relative flex-1 w-full mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${slides[current].color} shadow-2xl flex flex-col items-center justify-center p-8 text-center`}
            >
              <div className="mb-8 w-48 h-48 flex items-center justify-center">
                <FiaGorilla className="w-full h-full drop-shadow-2xl" animation={slides[current].animation} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">{slides[current].title}</h2>
              <p className="text-white/90 text-sm leading-relaxed">{slides[current].desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleBack}
            disabled={current === 0}
            className={`px-6 py-4 rounded-2xl font-bold transition-all ${current === 0 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white shadow-md hover:bg-gray-50'}`}
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 hover:scale-[1.02] transition-all shadow-xl shadow-gray-900/20"
          >
            {current === slides.length - 1 ? 'Mulai Sekarang' : 'Lanjut'}
            {current === slides.length - 1 ? <Play size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

