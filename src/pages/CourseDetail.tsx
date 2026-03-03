import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { 
  Play, Lock, CheckCircle, 
  Crown, ChevronLeft, Star,
  Clock, Zap, Trophy,
  Info, AlertCircle
} from 'lucide-react';
import { cn } from '../utils/cn';
import { FiaGorilla } from '../components/Mascot';
import confetti from 'canvas-confetti';

const COURSES = [
  { 
    id: 'niaga-1', 
    title: 'Pengantar Ilmu Administrasi Niaga', 
    jurusan: 'Niaga', 
    videos: 14, 
    image: 'https://picsum.photos/seed/niaga1/1200/600',
    desc: 'Mempelajari dasar-dasar administrasi dalam dunia bisnis dan korporasi. Fokus pada struktur organisasi, manajemen sumber daya, dan strategi operasional.'
  },
  { 
    id: 'fiskal-1', 
    title: 'Dasar-dasar Perpajakan', 
    jurusan: 'Fiskal', 
    videos: 14, 
    image: 'https://picsum.photos/seed/fiskal1/1200/600',
    desc: 'Memahami sistem perpajakan di Indonesia dan kebijakan fiskal global. Mempelajari jenis-jenis pajak, subjek dan objek pajak, serta tata cara pemungutan.'
  },
  { 
    id: 'negara-1', 
    title: 'Sistem Administrasi Negara RI', 
    jurusan: 'Negara', 
    videos: 14, 
    image: 'https://picsum.photos/seed/negara1/1200/600',
    desc: 'Analisis mendalam mengenai struktur dan fungsi birokrasi di Indonesia. Mempelajari sejarah administrasi publik, reformasi birokrasi, dan tata kelola pemerintahan.'
  },
];

export const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, updateVideoProgress, addXp, consumeTrial } = useAuth();
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showMascotReaction, setShowMascotReaction] = useState<string | null>(null);
  const [trialMessage, setTrialMessage] = useState<string | null>(null);
  const [playTime, setPlayTime] = useState(0);
  const [hasConsumedTrialForThis, setHasConsumedTrialForThis] = useState(false);

  const course = COURSES.find(c => c.id === courseId);

  useEffect(() => {
    // Reset play time and consumption flag when video changes
    setPlayTime(0);
    setHasConsumedTrialForThis(false);
    setIsPlaying(false);
  }, [activeVideo]);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-center flex-col gap-4">
        <p className="text-gray-500 font-bold uppercase tracking-widest">Mata kuliah tidak ditemukan</p>
        <Link to="/materi" className="text-secondary font-black text-sm uppercase tracking-widest hover:underline">Kembali ke Katalog</Link>
      </div>
    );
  }

  const currentProgress = user?.videoProgress.find(v => v.courseId === courseId && v.videoIndex === activeVideo)?.progress || 0;
  const isVideoCompleted = currentProgress === 100;
  const isTrialVideo = activeVideo < 3;
  const isLocked = !user?.isPremium && !isTrialVideo;

  const handlePlay = async () => {
    if (!user) return;

    // Backend Validation
    const res = await fetch('/api/video/play-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, courseId, videoIndex: activeVideo })
    });
    const data = await res.json();

    if (!data.allowed) {
      setShowPremiumModal(true);
      return;
    }

    setIsPlaying(true);
  };

  const handleVideoProgress = async (newProgress: number) => {
    if (!courseId) return;
    
    const { milestoneReached } = await updateVideoProgress(courseId, activeVideo, newProgress);

    if (milestoneReached) {
      let reaction = 'clap';
      if (newProgress >= 100) {
        reaction = 'thumbsup';
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FACC15', '#3B82F6', '#EF4444']
        });
      }

      setShowMascotReaction(reaction);
      setTimeout(() => setShowMascotReaction(null), 3000);
    }
  };

  // Video progress and Trial consumption timer
  useEffect(() => {
    let interval: any;
    if (isPlaying && currentProgress < 100) {
      interval = setInterval(() => {
        // Update progress
        handleVideoProgress(Math.min(currentProgress + 2, 100));
        
        // Update play time for trial
        if (!user?.isPremium && !hasConsumedTrialForThis) {
          setPlayTime(prev => {
            const next = prev + 1;
            if (next >= 10) {
              // Trigger trial consumption
              consumeTrial(courseId!, activeVideo).then(res => {
                if (res.success && !res.alreadyConsumed) {
                  setTrialMessage(res.message || "1 Trial digunakan.");
                  setShowMascotReaction('point'); // Serious expression
                  setTimeout(() => {
                    setTrialMessage(null);
                    setShowMascotReaction(null);
                  }, 4000);
                }
              });
              setHasConsumedTrialForThis(true);
            }
            return next;
          });
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentProgress, user?.isPremium, hasConsumedTrialForThis]);

  const trialRemaining = user?.trialRemaining ?? 0;
  const trialColor = trialRemaining === 0 ? 'text-accent' : trialRemaining === 1 ? 'text-primary' : 'text-secondary';

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Trial Indicator */}
      {!user?.isPremium && (
        <div className="bg-gray-900 py-2 px-10 flex items-center justify-between sticky top-20 z-30">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <p className="text-[10px] font-black text-white uppercase tracking-widest">
              Sisa Trial Anda: <span className={cn("text-lg ml-2", trialColor)}>{trialRemaining} / 3</span>
            </p>
          </div>
          <Link to="/premium" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline flex items-center gap-2">
            <Crown size={14} /> Upgrade Premium
          </Link>
        </div>
      )}
      {/* Header Image */}
      <div className="h-[300px] relative overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute bottom-10 left-10 max-w-4xl">
          <Link to="/materi" className="inline-flex items-center gap-2 text-gray-900 font-black text-xs uppercase tracking-widest mb-6 hover:gap-3 transition-all">
            <ChevronLeft size={16} /> Kembali ke Katalog
          </Link>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2">{course.title}</h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-secondary text-white rounded-lg text-[10px] font-black uppercase tracking-widest">{course.jurusan}</span>
            <span className="text-gray-500 text-xs font-bold flex items-center gap-1"><Play size={14} fill="currentColor" /> 14 Video</span>
          </div>
        </div>
      </div>

      <div className="px-10 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Video Player & Info */}
          <div className="lg:col-span-2 space-y-10">
            {/* Player Area */}
            <div className="aspect-video bg-gray-900 rounded-[2.5rem] overflow-hidden relative group shadow-2xl">
              {isPlaying ? (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                    <p className="text-white font-black text-xs uppercase tracking-widest">Memutar Video {activeVideo + 1}...</p>
                    <button 
                      onClick={() => setIsPlaying(false)}
                      className="px-6 py-2 bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"
                    >
                      Pause
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <img src={course.image} className="w-full h-full object-cover opacity-40 blur-sm" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                      onClick={handlePlay}
                      className="w-24 h-24 bg-primary text-gray-900 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all group/play"
                    >
                      {isLocked ? <Lock size={32} /> : <Play size={32} fill="currentColor" className="ml-2" />}
                    </button>
                  </div>
                  {isLocked && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-white font-black text-sm uppercase tracking-widest mb-2">Video Ini Terkunci</p>
                      <p className="text-gray-400 text-xs font-medium">Upgrade Premium untuk akses tanpa batas</p>
                    </div>
                  )}
                </div>
              )}

              {/* Progress Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/10">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${currentProgress}%` }}
                />
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-gray-50 rounded-[2.5rem] p-10 space-y-6">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Tentang Mata Kuliah</h2>
              <p className="text-gray-600 font-medium leading-relaxed text-lg">
                {course.desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-secondary shadow-sm">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total XP</p>
                    <p className="text-lg font-black text-gray-900">140 XP</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sertifikat</p>
                    <p className="text-lg font-black text-gray-900">Tersedia</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-accent shadow-sm">
                    <Star size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rating</p>
                    <p className="text-lg font-black text-gray-900">4.9 / 5.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video List Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-soft border border-gray-50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black text-gray-900 tracking-tight">Daftar Video</h3>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">14 Materi</span>
              </div>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-100">
                {Array.from({ length: 14 }).map((_, i) => {
                  const isFree = i < 3;
                  const locked = !user?.isPremium && !isFree;
                  const active = activeVideo === i;
                  const progress = user?.videoProgress.find(v => v.courseId === courseId && v.videoIndex === i)?.progress || 0;
                  const completed = progress === 100;

                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveVideo(i);
                        setIsPlaying(false);
                      }}
                      className={cn(
                        "w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group",
                        active ? "bg-secondary/10 border-secondary/20 border" : "hover:bg-gray-50 border border-transparent",
                        locked && "opacity-60"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
                        active ? "bg-secondary text-white" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200",
                        completed && "bg-emerald-500 text-white"
                      )}>
                        {locked ? <Lock size={16} /> : completed ? <CheckCircle size={18} /> : <Play size={18} fill={active ? "currentColor" : "none"} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm font-extrabold truncate",
                          active ? "text-secondary" : "text-gray-900"
                        )}>
                          {i + 1}. {locked ? 'Materi Premium' : `Video Pembelajaran ${i + 1}`}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">15:00</span>
                          {progress > 0 && progress < 100 && (
                            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mascot Reaction Overlay */}
            <AnimatePresence>
              {(showMascotReaction || trialMessage) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 50 }}
                  className="bg-white rounded-[2.5rem] p-6 shadow-2xl border border-gray-100 flex items-center gap-4"
                >
                  <FiaGorilla size={80} animation={(showMascotReaction || 'point') as any} />
                  <div>
                    <p className="text-sm font-black text-gray-900">{trialMessage ? "Trial Digunakan" : "Bagus Sekali!"}</p>
                    <p className="text-[10px] font-black text-secondary uppercase tracking-widest">
                      {trialMessage || "Kamu dapat XP baru!"}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Premium Modal */}
      <AnimatePresence>
        {showPremiumModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPremiumModal(false)}
              className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] p-12 max-w-lg w-full text-center space-y-8 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              
              <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary">
                <Crown size={48} />
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Ups, Akses Terbatas!</h2>
                <p className="text-gray-500 font-medium leading-relaxed">
                  Kamu telah menggunakan semua trial gratis atau mencoba mengakses materi premium. Upgrade ke FIAcademy Premium untuk akses tanpa batas!
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Link 
                  to="/premium"
                  className="w-full py-4 bg-primary text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                  Upgrade Sekarang
                </Link>
                <button 
                  onClick={() => setShowPremiumModal(false)}
                  className="w-full py-4 bg-gray-50 text-gray-400 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all"
                >
                  Nanti Saja
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <AlertCircle size={14} />
                Hanya Rp 49.000 / Bulan
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
