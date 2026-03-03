import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, BookOpen, Users, FolderOpen, 
  BarChart2, Trophy, Crown, Search, 
  Bell, LogOut, Menu, X, HelpCircle 
} from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { id: 'nav-beranda', path: '/', icon: <Home size={20} />, label: 'Beranda' },
    { id: 'nav-materi', path: '/materi', icon: <BookOpen size={20} />, label: 'Materi' },
    { id: 'nav-mentoring', path: '/mentoring', icon: <Users size={20} />, label: 'Mentoring' },
    { id: 'nav-bank-materi', path: '/bank-materi', icon: <FolderOpen size={20} />, label: 'Bank Materi' },
    { id: 'nav-tracker', path: '/tracker', icon: <BarChart2 size={20} />, label: 'Tracker' },
    { id: 'nav-gamifikasi', path: '/gamifikasi', icon: <Trophy size={20} />, label: 'Gamifikasi' },
    { id: 'nav-premium', path: '/premium', icon: <Crown size={20} />, label: 'Premium' },
  ];

  const sidebarWidth = isCollapsed ? 'w-[80px]' : 'w-[260px]';

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[60] bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out",
          sidebarWidth,
          // Mobile behavior: off-canvas
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className={cn(
          "h-20 flex items-center px-6 border-b border-gray-50 transition-all duration-300",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-extrabold tracking-tight text-secondary">FIA</span>
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-extrabold tracking-tight text-primary"
              >
                cademy
              </motion.span>
            )}
          </Link>
          
          {/* Mobile Close Button */}
          <button 
            onClick={() => setIsMobileOpen(false)} 
            className="lg:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div key={item.path} className="relative group">
                <Link
                  id={item.id}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-3.5 py-3 rounded-2xl font-bold text-sm transition-all duration-200",
                    isCollapsed ? "justify-center" : "justify-start",
                    isActive
                      ? "bg-primary text-gray-900 shadow-lg shadow-primary/20"
                      : "text-gray-500 hover:bg-gray-50 hover:text-secondary"
                  )}
                >
                  <span className={cn(
                    "transition-colors shrink-0",
                    isActive ? "text-gray-900" : "text-gray-400 group-hover:text-secondary"
                  )}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>

                {/* Tooltip for Collapsed Mode */}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[70] whitespace-nowrap pointer-events-none">
                    {item.label}
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-50 space-y-1">
          <div className="relative group">
            <button 
              onClick={() => (window as any).restartFiaTutorial?.()}
              className={cn(
                "w-full flex items-center gap-4 px-3.5 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 hover:text-secondary transition-all",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <HelpCircle size={20} className="text-gray-400 shrink-0" />
              {!isCollapsed && <span>Bantuan</span>}
            </button>
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[70] whitespace-nowrap pointer-events-none">
                Bantuan
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </div>
            )}
          </div>

          <div className="relative group">
            <button 
              onClick={logout}
              className={cn(
                "w-full flex items-center gap-4 px-3.5 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-red-50 hover:text-accent transition-all",
                isCollapsed ? "justify-center" : "justify-start"
              )}
            >
              <LogOut size={20} className="text-gray-400 shrink-0" />
              {!isCollapsed && <span>Keluar</span>}
            </button>
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[70] whitespace-nowrap pointer-events-none">
                Keluar
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[55] lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface TopbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  setIsMobileOpen: (value: boolean) => void;
}

export const Topbar: React.FC<TopbarProps> = ({ 
  isCollapsed, 
  setIsCollapsed, 
  setIsMobileOpen 
}) => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Hamburger / Toggle Button */}
        <button 
          onClick={() => {
            if (window.innerWidth < 1024) {
              setIsMobileOpen(true);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
          className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-2xl border border-gray-100 w-80 lg:w-96 focus-within:ring-2 focus-within:ring-secondary/20 focus-within:border-secondary transition-all">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Cari materi..." 
            className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2.5 text-gray-400 hover:bg-gray-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white" />
        </button>
        
        <div className="h-8 w-px bg-gray-100 mx-2" />

        <Link to="/profile" className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-2xl transition-all">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900">{user?.name}</p>
            <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Level {user?.level}</p>
          </div>
          <img 
            src={user?.avatar} 
            alt={user?.name} 
            className="w-10 h-10 rounded-xl border border-gray-100 shadow-sm"
          />
        </Link>
      </div>
    </header>
  );
};
