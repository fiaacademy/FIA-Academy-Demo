import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Crown, CheckCircle, Zap, Star, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import confetti from 'canvas-confetti';

export const Premium = () => {
  const { user, upgradePremium } = useAuth();

  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleUpgrade = async () => {
    await upgradePremium();
    setIsSuccess(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#FACC15', '#3B82F6', '#EF4444']
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-[3rem] flex items-center justify-center mx-auto">
            <CheckCircle size={64} />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Selamat Datang di Premium!</h1>
            <p className="text-gray-500 font-medium leading-relaxed">
              Akun kamu sekarang sudah Premium. Nikmati akses tanpa batas ke semua materi dan fitur eksklusif FIAcademy.
            </p>
          </div>
          <Link 
            to="/materi"
            className="block w-full py-5 bg-primary text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            Mulai Belajar Sekarang
          </Link>
        </motion.div>
      </div>
    );
  }

  const features = [
    { icon: <CheckCircle className="text-emerald-500" size={24} />, text: 'Akses semua video materi tanpa batas' },
    { icon: <Zap className="text-primary" size={24} fill="currentColor" />, text: 'Double XP setiap menyelesaikan materi' },
    { icon: <Star className="text-secondary" size={24} />, text: 'Prioritas booking mentoring 1-on-1' },
    { icon: <Shield className="text-indigo-500" size={24} />, text: 'Bebas iklan selamanya' },
    { icon: <Sparkles className="text-amber-500" size={24} />, text: 'Badge eksklusif "Premium Member"' },
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-24 h-24 bg-primary rounded-[2rem] mx-auto flex items-center justify-center mb-8 shadow-2xl shadow-primary/30"
          >
            <Crown className="text-gray-900 w-12 h-12" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Upgrade ke <span className="text-secondary">Premium</span></h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Buka potensi belajarmu secara maksimal. Akses semua materi eksklusif, dapatkan double XP, dan raih prestasi akademik terbaik.
          </p>
        </div>

        {user?.isPremium ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-gray-900 rounded-[3rem] p-12 lg:p-16 text-center shadow-2xl max-w-2xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-primary" />
            <Crown className="w-20 h-20 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Kamu sudah Premium!</h2>
            <p className="text-gray-400 text-lg mb-10 font-medium">Nikmati semua fitur eksklusif FIAcademy setiap hari.</p>
            <button className="px-10 py-4 bg-white/10 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">
              Kelola Langganan
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Features List */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="lg:col-span-7 bg-white rounded-[3rem] p-10 lg:p-12 shadow-soft border border-gray-100"
            >
              <h3 className="text-2xl font-black text-gray-900 mb-10 tracking-tight">Keuntungan Eksklusif</h3>
              <ul className="space-y-8">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-6 group">
                    <div className="mt-1 shrink-0 p-3 bg-gray-50 rounded-2xl group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <div>
                      <p className="text-lg font-extrabold text-gray-900 mb-1">{feature.text}</p>
                      <p className="text-sm text-gray-500 font-medium">Dapatkan akses penuh tanpa batas untuk mempercepat kelulusanmu.</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="lg:col-span-5 space-y-8"
            >
              {/* Monthly */}
              <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-soft border border-gray-100 hover:border-secondary/20 transition-all cursor-pointer group relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Paket Bulanan</h4>
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-black text-gray-900 tracking-tight">Rp 49.000</span>
                  <span className="text-gray-400 font-bold">/bulan</span>
                </div>
                <button onClick={handleUpgrade} className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl font-black text-sm uppercase tracking-widest group-hover:bg-secondary group-hover:text-white transition-all shadow-sm">
                  Pilih Paket
                </button>
              </div>

              {/* Yearly - Best Value */}
              <div className="bg-gray-900 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-gray-800 relative overflow-hidden transform hover:scale-[1.02] transition-all cursor-pointer group">
                <div className="absolute top-0 right-0 bg-primary text-gray-900 text-[10px] font-black px-4 py-2 rounded-bl-2xl uppercase tracking-widest">HEMAT 30%</div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest">Paket Tahunan</h4>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-white tracking-tight">Rp 399.000</span>
                  <span className="text-gray-500 font-bold">/tahun</span>
                </div>
                <p className="text-sm text-primary font-bold mb-10 flex items-center gap-2">
                  <Sparkles size={16} /> Hemat Rp 189.000 dibanding bulanan
                </p>
                <button onClick={handleUpgrade} className="w-full py-5 bg-primary text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3">
                  Upgrade Sekarang <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Trial Section */}
        {!user?.isPremium && (
          <div className="mt-20 bg-secondary/5 rounded-[3rem] p-10 lg:p-16 text-center border border-secondary/10">
            <h3 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">Belum yakin? Coba dulu gratis!</h3>
            <p className="text-gray-500 font-medium mb-10 max-w-xl mx-auto">
              Kamu bisa mengakses 3 video pertama di setiap mata kuliah secara gratis tanpa biaya apapun.
            </p>
            <Link to="/materi" className="inline-flex items-center gap-3 text-secondary font-black text-sm uppercase tracking-widest hover:underline">
              Mulai Belajar Gratis <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
