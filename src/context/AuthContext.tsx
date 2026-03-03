import React, { createContext, useContext, useState, useEffect } from 'react';

type VideoProgress = {
  courseId: string;
  videoIndex: number;
  progress: number; // 0-100
  milestones: number[]; // [20, 50, 70, 100]
};

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPremium: boolean;
  xp: number;
  level: number;
  badges: string[];
  trialRemaining: number;
  videoProgress: VideoProgress[];
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => Promise<void>;
  logout: () => void;
  addXp: (amount: number, reason: string) => Promise<void>;
  upgradePremium: () => Promise<void>;
  consumeTrial: (courseId: string, videoIndex: number) => Promise<{ success: boolean; trialRemaining?: number; message?: string }>;
  updateVideoProgress: (courseId: string, videoIndex: number, progress: number) => Promise<{ xpGained: number; milestoneReached: boolean }>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('fia_user_email');
    if (savedEmail) {
      const fetchUser = async () => {
        const userRes = await fetch(`/api/user/me?email=${savedEmail}`);
        const userData = await userRes.json();
        
        if (userData.error) {
          localStorage.removeItem('fia_user_email');
          return;
        }

        const progressRes = await fetch(`/api/video/progress?email=${savedEmail}`);
        const progressData = await progressRes.json();

        setUser({
          ...userData,
          badges: ['Mahasiswa Baru'],
          videoProgress: progressData
        });
      };
      fetchUser();
    }
  }, []);

  const login = async (email: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    
    const progressRes = await fetch(`/api/video/progress?email=${email}`);
    const progressData = await progressRes.json();

    const newUser: User = {
      ...data,
      badges: ['Mahasiswa Baru'],
      videoProgress: progressData,
    };
    setUser(newUser);
    localStorage.setItem('fia_user_email', email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fia_user_email');
  };

  const addXp = async (amount: number, reason: string) => {
    if (!user) return;
    
    const event = new CustomEvent('xp-gained', { detail: { amount, reason } });
    window.dispatchEvent(event);

    const res = await fetch('/api/user/add-xp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, amount })
    });
    
    if (res.ok) {
      const { xp, level } = await res.json();
      setUser(prev => prev ? { ...prev, xp, level } : null);
    }
  };

  const consumeTrial = async (courseId: string, videoIndex: number) => {
    if (!user) return { success: false };
    
    const res = await fetch('/api/video/consume-trial', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email, courseId, videoIndex })
    });
    
    const data = await res.json();
    if (data.success && data.trialRemaining !== undefined) {
      setUser(prev => prev ? { ...prev, trialRemaining: data.trialRemaining } : null);
    }
    return data;
  };

  const updateVideoProgress = async (courseId: string, videoIndex: number, progress: number) => {
    let xpGained = 0;
    let milestoneReached = false;

    if (!user) return { xpGained, milestoneReached };

    const milestones = [
      { threshold: 20, xp: 2 },
      { threshold: 50, xp: 3 },
      { threshold: 70, xp: 5 },
      { threshold: 100, xp: 10 },
    ];

    const currentItem = user.videoProgress.find(v => v.courseId === courseId && v.videoIndex === videoIndex);
    const reachedBefore = currentItem?.milestones || [];

    let newMilestone: number | null = null;
    milestones.forEach(m => {
      if (progress >= m.threshold && !reachedBefore.includes(m.threshold)) {
        xpGained += m.xp;
        milestoneReached = true;
        newMilestone = m.threshold;
      }
    });

    // Sync to backend
    await fetch('/api/video/update-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: user.email, 
        courseId, 
        videoIndex, 
        progress, 
        milestone: newMilestone 
      })
    });

    if (xpGained > 0) {
      await addXp(xpGained, `Progress Video ${videoIndex + 1}`);
    }

    // Update local state for immediate UI feedback
    setUser(prev => {
      if (!prev) return null;
      const newProgress = [...prev.videoProgress];
      const idx = newProgress.findIndex(v => v.courseId === courseId && v.videoIndex === videoIndex);
      if (idx > -1) {
        newProgress[idx] = {
          ...newProgress[idx],
          progress: Math.max(newProgress[idx].progress, progress),
          milestones: newMilestone ? [...newProgress[idx].milestones, newMilestone] : newProgress[idx].milestones
        };
      } else {
        newProgress.push({
          courseId,
          videoIndex,
          progress,
          milestones: newMilestone ? [newMilestone] : []
        });
      }
      return { ...prev, videoProgress: newProgress };
    });

    return { xpGained, milestoneReached };
  };

  const upgradePremium = async () => {
    if (!user) return;
    const res = await fetch('/api/user/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: user.email })
    });
    if (res.ok) {
      setUser(prev => prev ? { ...prev, isPremium: true } : null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, addXp, upgradePremium, consumeTrial, updateVideoProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
