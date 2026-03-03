import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../utils/cn';

type MascotProps = {
  message?: string;
  onClose?: () => void;
  autoClose?: number;
  animation?: 'idle' | 'point' | 'clap' | 'jump' | 'wave' | 'thumbsup';
  className?: string;
};

export type MascotAnimation = 'idle' | 'point' | 'openbook' | 'clap' | 'jump' | 'thumbsup' | 'wave';

interface FiaGorillaProps {
  className?: string;
  animation?: MascotAnimation;
  size?: 'normal' | 'large';
}

export const FiaGorilla: React.FC<FiaGorillaProps> = ({ 
  className, 
  animation = 'idle',
  size = 'normal'
}) => {
  const scale = size === 'large' ? 1.5 : 1;

  const variants = {
    idle: {
      y: [0, -5, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    point: {
      rotate: [0, -5, 0],
      transition: { duration: 0.5, repeat: Infinity }
    },
    openbook: {
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity }
    },
    clap: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.3, repeat: Infinity }
    },
    jump: {
      y: [0, -20, 0],
      transition: { duration: 0.5, repeat: Infinity }
    },
    thumbsup: {
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, repeat: Infinity }
    },
    wave: {
      rotate: [0, 10, -10, 0],
      transition: { duration: 1, repeat: Infinity }
    }
  };

  return (
    <motion.div
      className={cn("relative flex items-center justify-center", className)}
      animate={animation}
      variants={variants}
      style={{ scale }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="40" ry="10" fill="black" fillOpacity="0.05" />
        
        {/* Body */}
        <rect x="60" y="80" width="80" height="90" rx="40" fill="#4B5563" />
        
        {/* Jacket (Red-Purple Gradient) */}
        <defs>
          <linearGradient id="jacketGradient" x1="60" y1="80" x2="140" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#EF4444" />
            <stop offset="1" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <path d="M60 120C60 97.9086 77.9086 80 100 80C122.091 80 140 97.9086 140 120V170H60V120Z" fill="url(#jacketGradient)" />
        <path d="M100 80V170" stroke="white" strokeWidth="2" strokeOpacity="0.2" />
        
        {/* Head */}
        <circle cx="100" cy="70" r="45" fill="#4B5563" />
        <path d="M70 75C70 58.4315 83.4315 45 100 45C116.569 45 130 58.4315 130 75V85H70V75Z" fill="#374151" />
        
        {/* Face Details */}
        <circle cx="85" cy="70" r="4" fill="white" />
        <circle cx="115" cy="70" r="4" fill="white" />
        <motion.circle 
          cx="85" cy="70" r="2" fill="black" 
          animate={{ scaleY: [1, 0.1, 1] }} 
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.95, 1] }}
        />
        <motion.circle 
          cx="115" cy="70" r="2" fill="black" 
          animate={{ scaleY: [1, 0.1, 1] }} 
          transition={{ duration: 3, repeat: Infinity, times: [0, 0.95, 1] }}
        />
        
        {/* Smile */}
        <path d="M90 85C90 85 95 90 100 90C105 90 110 85 110 85" stroke="white" strokeWidth="2" strokeLinecap="round" />

        {/* Arms */}
        {/* Left Arm holding Book */}
        <rect x="35" y="110" width="30" height="15" rx="7.5" fill="#4B5563" />
        <rect x="25" y="90" width="35" height="45" rx="4" fill="#FACC15" />
        <rect x="28" y="95" width="29" height="35" rx="2" fill="white" />
        <rect x="32" y="105" width="20" height="2" fill="#E5E7EB" />
        <rect x="32" y="110" width="20" height="2" fill="#E5E7EB" />
        <rect x="32" y="115" width="20" height="2" fill="#E5E7EB" />

        {/* Right Arm holding Pen/Tablet */}
        <motion.g
          animate={animation === 'point' ? { rotate: [0, -20, 0] } : {}}
        >
          <rect x="135" y="110" width="30" height="15" rx="7.5" fill="#4B5563" />
          <rect x="155" y="95" width="6" height="30" rx="3" fill="#3B82F6" />
        </motion.g>

        {/* Ears */}
        <circle cx="60" cy="70" r="8" fill="#374151" />
        <circle cx="140" cy="70" r="8" fill="#374151" />
      </svg>
    </motion.div>
  );
};

export const MascotMessage: React.FC<MascotProps> = ({ message, onClose, autoClose, animation = 'idle', className }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          className={cn("fixed bottom-6 right-6 z-50 flex items-end gap-3 max-w-sm pointer-events-none", className)}
        >
          {message && (
            <div className="bg-white p-4 rounded-2xl rounded-br-none shadow-xl border border-blue-100 relative pointer-events-auto">
              <button onClick={handleClose} className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 text-gray-500 hover:text-gray-800">
                <X size={14} />
              </button>
              <p className="text-sm font-medium text-gray-800 leading-relaxed">{message}</p>
            </div>
          )}
          <FiaGorilla className="w-24 h-24 drop-shadow-xl pointer-events-auto" animation={animation} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
