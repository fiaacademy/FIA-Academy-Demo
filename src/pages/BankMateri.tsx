import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FileText, Download, Upload, Search, Filter, FolderOpen, Calendar, User, File } from 'lucide-react';
import { cn } from '../utils/cn';

const MATERI = [
  { id: 1, title: 'Catatan Pengantar Ilmu Administrasi Niaga', type: 'PDF', size: '2.4 MB', uploader: 'Budi', year: '2023', category: 'Catatan Kuliah' },
  { id: 2, title: 'Soal UAS Kebijakan Publik 2022', type: 'PDF', size: '1.1 MB', uploader: 'Siti', year: '2022', category: 'UAS' },
  { id: 3, title: 'Rangkuman Hukum Pajak', type: 'DOCX', size: '500 KB', uploader: 'Ahmad', year: '2023', category: 'Catatan Kuliah' },
  { id: 4, title: 'Latihan UTS Manajemen Pemasaran', type: 'PDF', size: '1.8 MB', uploader: 'Rina', year: '2023', category: 'UTS' },
];

export const BankMateri = () => {
  const { addXp } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');

  const handleUpload = () => {
    addXp(50, 'Upload Materi');
    alert('Berhasil upload materi! +50 XP');
  };

  const filteredMateri = MATERI.filter(m => 
    (filter === 'Semua' || m.category === filter) &&
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Bank Materi</h1>
            <p className="text-gray-500 mt-1 font-medium">Kumpulan catatan, soal, dan jurnal akademik.</p>
          </div>
          <button
            onClick={handleUpload}
            className="px-8 py-3.5 bg-primary text-gray-900 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 shrink-0"
          >
            <Upload size={18} /> Upload Materi (+50 XP)
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-soft border border-gray-100 overflow-hidden">
          {/* Filters Bar */}
          <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-6 items-center justify-between bg-gray-50/30">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari dokumen atau topik..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-sm bg-white transition-all"
              />
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
                <Filter size={14} /> Filter:
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-3 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none text-sm bg-white flex-1 md:w-56 font-bold text-gray-600 transition-all"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Catatan Kuliah">Catatan Kuliah</option>
                <option value="UTS">UTS</option>
                <option value="UAS">UAS</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-50">
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Dokumen</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">Kategori</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden md:table-cell">Tahun</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden lg:table-cell">Uploader</th>
                  <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredMateri.map((materi, index) => (
                  <motion.tr
                    key={materi.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0 border border-secondary/10">
                          <FileText size={24} />
                        </div>
                        <div>
                          <p className="font-extrabold text-gray-900 text-sm line-clamp-1 group-hover:text-secondary transition-colors">{materi.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{materi.type}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{materi.size}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 hidden sm:table-cell">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-gray-200">
                        {materi.category}
                      </span>
                    </td>
                    <td className="p-6 hidden md:table-cell">
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                        <Calendar size={14} className="text-gray-300" /> {materi.year}
                      </div>
                    </td>
                    <td className="p-6 hidden lg:table-cell">
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
                        <User size={14} className="text-gray-300" /> {materi.uploader}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <button className="p-3 text-gray-400 hover:text-secondary hover:bg-secondary/10 rounded-2xl transition-all border border-transparent hover:border-secondary/10 inline-flex items-center justify-center">
                        <Download size={20} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredMateri.length === 0 && (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-6 border border-gray-100">
                <FolderOpen className="text-gray-300 w-10 h-10" />
              </div>
              <h3 className="text-gray-900 font-extrabold text-xl mb-2">Dokumen tidak ditemukan</h3>
              <p className="text-sm text-gray-500 font-medium max-w-xs mx-auto">Coba gunakan kata kunci lain atau ubah filter kategori untuk menemukan materi yang kamu cari.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
