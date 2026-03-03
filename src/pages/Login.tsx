import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FiaGorilla } from '../components/Mascot';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Branding & Mascot */}
        <div className="hidden lg:flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiaGorilla className="w-64 h-64" animation="wave" />
          </motion.div>
          <div className="space-y-4">
            <h1 className="text-5xl font-black text-gray-900 tracking-tight">
              <span className="text-secondary">FIA</span>cademy
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-md mx-auto">
              Platform edukasi modern untuk mahasiswa Fakultas Ilmu Administrasi.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="bg-white p-4 rounded-3xl shadow-soft border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                <Sparkles size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Gamifikasi</p>
                <p className="text-[10px] text-gray-400 font-bold">Belajar jadi seru!</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-3xl shadow-soft border border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary">
                <ArrowRight size={20} />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-gray-900 uppercase tracking-widest">Akses Mudah</p>
                <p className="text-[10px] text-gray-400 font-bold">Kapanpun & Dimanapun</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl border border-gray-100"
        >
          <div className="mb-10 lg:hidden text-center">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              <span className="text-secondary">FIA</span>cademy
            </h1>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Selamat Datang!</h2>
            <p className="text-gray-500 font-medium">Masuk ke akun FIAcademy kamu untuk mulai belajar.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none bg-gray-50/50 font-bold text-gray-700 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none bg-gray-50/50 font-bold text-gray-700 transition-all"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-bold">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-secondary focus:ring-secondary" />
                Ingat Saya
              </label>
              <a href="#" className="text-secondary hover:underline">Lupa Kata Sandi?</a>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3"
            >
              Masuk Sekarang <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm font-bold text-gray-400">
              Belum punya akun? <a href="#" className="text-secondary hover:underline">Daftar Gratis</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
