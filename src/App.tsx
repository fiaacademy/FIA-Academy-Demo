import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Sidebar, Topbar } from './components/Navbar';
import { cn } from './utils/cn';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Materi } from './pages/Materi';
import { Mentoring } from './pages/Mentoring';
import { BankMateri } from './pages/BankMateri';
import { Tracker } from './pages/Tracker';
import { Gamifikasi } from './pages/Gamifikasi';
import { Premium } from './pages/Premium';
import { Profile } from './pages/Profile';
import { CourseDetail } from './pages/CourseDetail';
import { DashboardTutorial } from './components/DashboardTutorial';
import confetti from 'canvas-confetti';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';

  // Sidebar States
  const [isCollapsed, setIsCollapsed] = React.useState(() => {
    const saved = localStorage.getItem('fia_sidebar_collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  // Persist Sidebar State
  useEffect(() => {
    localStorage.setItem('fia_sidebar_collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  // Handle auto-collapse on tablet
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 768 && width < 1024) {
        setIsCollapsed(true);
      } else if (width >= 1024) {
        // Only expand if it wasn't manually collapsed by user in this session
        // or just follow the "default expanded" rule if no preference is saved
        const saved = localStorage.getItem('fia_sidebar_collapsed');
        if (saved === null) {
          setIsCollapsed(false);
        }
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleXpGained = (e: Event) => {
      const customEvent = e as CustomEvent;
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EF4444', '#3B82F6', '#FACC15']
      });
    };

    window.addEventListener('xp-gained', handleXpGained);
    return () => window.removeEventListener('xp-gained', handleXpGained);
  }, []);

  return (
    <div className="font-sans text-gray-900 antialiased selection:bg-secondary/20 selection:text-secondary">
      {!isAuthPage && user && (
        <div className="flex min-h-screen">
          <Sidebar 
            isCollapsed={isCollapsed} 
            setIsCollapsed={setIsCollapsed}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
          
          <div className={cn(
            "flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out",
            isCollapsed ? "lg:pl-[80px]" : "lg:pl-[260px]"
          )}>
            <Topbar 
              isCollapsed={isCollapsed} 
              setIsCollapsed={setIsCollapsed}
              setIsMobileOpen={setIsMobileOpen}
            />
            <main className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/materi" element={<ProtectedRoute><Materi /></ProtectedRoute>} />
                <Route path="/materi/:courseId" element={<ProtectedRoute><CourseDetail /></ProtectedRoute>} />
                <Route path="/mentoring" element={<ProtectedRoute><Mentoring /></ProtectedRoute>} />
                <Route path="/bank-materi" element={<ProtectedRoute><BankMateri /></ProtectedRoute>} />
                <Route path="/tracker" element={<ProtectedRoute><Tracker /></ProtectedRoute>} />
                <Route path="/gamifikasi" element={<ProtectedRoute><Gamifikasi /></ProtectedRoute>} />
                <Route path="/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <DashboardTutorial />
          </div>
        </div>
      )}

      {(isAuthPage || !user) && (
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
