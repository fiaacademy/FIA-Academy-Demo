import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiaGorilla, MascotAnimation } from './Mascot';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

type Step = {
  targetId: string;
  message: string;
  animation: MascotAnimation;
};

const STEPS: Step[] = [
  {
    targetId: 'dashboard-greeting',
    message: "Halo! Aku FIA Gorilla. Aku akan bantu kamu memahami dashboard FIAcademy.",
    animation: 'wave'
  },
  {
    targetId: 'nav-materi',
    message: "Di sini kamu bisa akses semua mata kuliah. Ada 14 video per mata kuliah lho!",
    animation: 'point'
  },
  {
    targetId: 'stats-xp',
    message: "Pantau terus Progress & XP kamu. Makin rajin belajar, makin tinggi levelmu!",
    animation: 'jump'
  },
  {
    targetId: 'nav-gamifikasi',
    message: "Cek peringkatmu di Leaderboard dan kumpulkan badge keren di sini.",
    animation: 'clap'
  },
  {
    targetId: 'nav-premium',
    message: "Kamu punya 3 video trial gratis. Upgrade ke Premium untuk akses tanpa batas!",
    animation: 'point'
  }
];

export const DashboardTutorial = () => {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('fia_tutorial_seen');
    if (!hasSeenTutorial) {
      setTimeout(() => {
        setIsVisible(true);
        setCurrentStep(0);
      }, 1500);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('fia_tutorial_seen', 'true');
  };

  const restartTutorial = () => {
    setIsVisible(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    (window as any).restartFiaTutorial = restartTutorial;
  }, []);

  if (!isVisible || currentStep === -1) return null;

  const step = STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <div className="absolute inset-0 bg-black/60 pointer-events-auto" onClick={handleSkip} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 flex items-center justify-center z-[110] pointer-events-none"
        >
          <div className="flex flex-col items-center gap-8 max-w-lg w-full px-6">
            <FiaGorilla 
              className="w-64 h-64 drop-shadow-2xl pointer-events-auto" 
              animation={step.animation} 
              size="large"
            />
            
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 relative pointer-events-auto w-full">
              <button 
                onClick={handleSkip}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
              
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-secondary"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    {currentStep + 1} / {STEPS.length}
                  </span>
                </div>
                <p className="text-xl font-extrabold text-gray-900 leading-tight tracking-tight">{step.message}</p>
              </div>
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <button 
                    onClick={handleSkip}
                    className="px-4 py-2 text-xs font-black text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest"
                  >
                    Skip
                  </button>
                  {currentStep > 0 && (
                    <button 
                      onClick={handleBack}
                      className="px-4 py-2 text-xs font-black text-secondary hover:text-secondary/80 transition-colors uppercase tracking-widest flex items-center gap-1"
                    >
                      <ChevronLeft size={14} /> Back
                    </button>
                  )}
                </div>
                
                <button 
                  onClick={handleNext}
                  className="px-8 py-3 bg-primary text-gray-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                  {currentStep === STEPS.length - 1 ? 'Selesai' : 'Lanjut'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
