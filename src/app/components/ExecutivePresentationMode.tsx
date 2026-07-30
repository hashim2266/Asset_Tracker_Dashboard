import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Tv, Maximize2, Minimize2, ChevronLeft, ChevronRight, Play, Pause, X, 
  Layers, Sprout, Activity, ShieldCheck, DollarSign, Package, Wrench, AlertCircle,
  Truck, Building2, Trees, Cpu, CheckCircle2
} from 'lucide-react';
import { KpkmLogo } from './KpkmLogo';

interface ExecutivePresentationProps {
  categoryData: any[];
  trendData: any[];
  agingData: any[];
  maintenanceData: any[];
  totalAssetsCount: number;
  totalAssetsValue: number;
  activeAssetsCount: number;
  maintenanceAssetsCount: number;
  onClose: () => void;
}

export function ExecutivePresentationMode({
  categoryData,
  trendData,
  agingData,
  maintenanceData,
  totalAssetsCount,
  totalAssetsValue,
  activeAssetsCount,
  maintenanceAssetsCount,
  onClose
}: ExecutivePresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = 5;

  // Auto-play slideshow timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % totalSlides);
      }, 7000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(console.error);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(console.error);
      }
    }
  };

  const slides = [
    { id: 0, title: "Slaid 1: Ringkasan Nilai & KPI Executive 4 Aset" },
    { id: 1, title: "Slaid 2: Analisis Nilai 4 Kategori Utama" },
    { id: 2, title: "Slaid 3: Trend Perolehan (2025 - 2026)" },
    { id: 3, title: "Slaid 4: Profil Kondisi Fizikal & Penyelenggaraan" },
    { id: 4, title: "Slaid 5: Pematuhan iGFMAS & Audit KPKM" },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#010a05] text-white flex flex-col justify-between overflow-hidden backdrop-blur-3xl animate-in fade-in duration-300">
      
      {/* PRESENTATION TOP HEADER BAR */}
      <header className="h-16 px-6 bg-[#03140a]/90 border-b border-amber-500/30 flex items-center justify-between shrink-0 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-gradient-to-br from-[#082215] via-[#0b331f] to-[#1e1703] rounded-xl border border-amber-400/60 shadow-md backdrop-blur-md">
            <KpkmLogo size="sm" variant="badge" />
          </div>
          <div>
            <h2 className="text-sm font-black text-amber-300 tracking-wide flex items-center gap-2">
              <Tv size={16} className="text-amber-400 animate-pulse" />
              MOD PEMBENTANGAN EKSEKUTIF (DASHBOARD KPKM)
            </h2>
            <p className="text-[10px] text-slate-300">Untuk Kegunaan Pengurusan Tertinggi / Mesyuarat YBhg. Boss • Design by MrMH</p>
          </div>
        </div>

        {/* Slide navigation quick dropdown & controls */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
            {slides[currentSlide].title}
          </span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isPlaying 
                ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                : 'bg-emerald-900/40 text-emerald-300 border-emerald-700/50 hover:bg-emerald-800/60'
            }`}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            {isPlaying ? 'Main Autoplay' : 'Main Slaid'}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-300 hover:text-white transition-all cursor-pointer"
            title="Skrin Penuh"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shadow-lg"
          >
            <X size={16} /> Tutup
          </button>
        </div>
      </header>

      {/* MAIN SLIDE BODY */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto space-y-6">

          {/* SLIDE 0: EXECUTIVE OVERVIEW */}
          {currentSlide === 0 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div className="text-center space-y-2">
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-emerald-500/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-widest shadow-lg">
                  Ringkasan Eksekutif Utiliti Aset Pertanian
                </span>
                <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-white via-emerald-200 to-amber-300 bg-clip-text text-transparent">
                  Portfolio 4 Kategori Utama Aset KPKM 2026
                </h1>
                <p className="text-sm text-slate-300 max-w-2xl mx-auto">
                  Paparan grafik berkualiti tinggi merangkumi Aset Alih, Tak Alih, Biologi, dan Tak Ketara bagi memudahkan keputusan strategik pengurusan.
                </p>
              </div>

              {/* 4 Big Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#072414] to-[#020d07] border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-center space-y-2">
                  <Package className="size-10 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Jumlah Aset Berdaftar</p>
                  <h3 className="text-4xl font-black text-white">{totalAssetsCount} Unit</h3>
                  <p className="text-[11px] text-emerald-400">Tercatat dalam Sistem iGFMAS</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#072414] to-[#020d07] border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-center space-y-2">
                  <DollarSign className="size-10 text-amber-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nilai Buku Keseluruhan</p>
                  <h3 className="text-3xl lg:text-4xl font-black text-amber-300">RM {totalAssetsValue.toLocaleString()}</h3>
                  <p className="text-[11px] text-amber-400/80">Nilai Perolehan Terkumpul</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#072414] to-[#020d07] border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.15)] text-center space-y-2">
                  <Wrench className="size-10 text-teal-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kondisi Baik / Aktif</p>
                  <h3 className="text-4xl font-black text-emerald-400">{activeAssetsCount} Unit</h3>
                  <p className="text-[11px] text-emerald-300">Siap Sedia Beroperasi</p>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#072414] to-[#020d07] border border-rose-500/40 shadow-[0_0_25px_rgba(225,29,72,0.15)] text-center space-y-2">
                  <AlertCircle className="size-10 text-rose-400 mx-auto" />
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Perlu Servis / Baik Pulih</p>
                  <h3 className="text-4xl font-black text-rose-400">{maintenanceAssetsCount} Unit</h3>
                  <p className="text-[11px] text-rose-300">Dalam Jadual Penyelenggaraan</p>
                </div>
              </div>

              {/* 4 Core Category Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#03180c] border border-teal-500/40 flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-teal-500/20 text-teal-400">
                    <Truck size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-teal-300 uppercase block">1. Aset Alih</span>
                    <h4 className="text-xl font-black text-white">Jentera & Kenderaan</h4>
                    <p className="text-xs text-slate-400 mt-0.5">RM 2.23M (30.0%)</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#03180c] border border-emerald-500/40 flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-emerald-300 uppercase block">2. Aset Tak Alih</span>
                    <h4 className="text-xl font-black text-white">Infrastruktur & Plot</h4>
                    <p className="text-xs text-slate-400 mt-0.5">RM 3.85M (52.1%)</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#03180c] border border-amber-500/40 flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-amber-500/20 text-amber-400">
                    <Trees size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-300 uppercase block">3. Aset Biologi</span>
                    <h4 className="text-xl font-black text-white">Tumbuhan & Haiwan</h4>
                    <p className="text-xs text-slate-400 mt-0.5">RM 1.42M (19.2%)</p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#03180c] border border-indigo-500/40 flex items-center gap-4">
                  <div className="p-3.5 rounded-xl bg-indigo-500/20 text-indigo-400">
                    <Cpu size={28} />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-indigo-300 uppercase block">4. Aset Tak Ketara</span>
                    <h4 className="text-xl font-black text-white">IP & Perisian Agronomi</h4>
                    <p className="text-xs text-slate-400 mt-0.5">RM 0.89M (12.0%)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SLIDE 1: BAR CHART 4 CORE CLASSES */}
          {currentSlide === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Slaid 2 dari 5</span>
                <h2 className="text-2xl font-black text-white">Analisis Nilai Kos Perolehan 4 Kategori Utama Aset</h2>
                <p className="text-xs text-slate-300">Pengagihan Kos dalam RM Mengikut Jenis Aset KPKM</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#03140a] border border-emerald-500/30 h-[420px] shadow-2xl">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 185, 129, 0.15)" />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#e2e8f0', fontSize: 13, fontWeight: 'bold' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 12 }} tickFormatter={(val) => `RM ${(val / 1000).toFixed(0)}k`} />
                    <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="value" name="Kos Perolehan (RM)" radius={[8, 8, 0, 0]} barSize={60}>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color || '#059669'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* SLIDE 2: TREND PEROLEHAN */}
          {currentSlide === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Slaid 3 dari 5</span>
                <h2 className="text-2xl font-black text-white">Trend Perolehan Suku Tahun (2025 - 2026)</h2>
                <p className="text-xs text-slate-300">Pertumbuhan Perbelanjaan Modal Aset KPKM (RM Juta)</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#03140a] border border-amber-500/30 h-[420px] shadow-2xl">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(245, 158, 11, 0.15)" vertical={false} />
                    <XAxis dataKey="year" stroke="#cbd5e1" tickLine={false} axisLine={false} dy={10} />
                    <YAxis stroke="#cbd5e1" tickLine={false} axisLine={false} tickFormatter={(val) => `RM${val}M`} />
                    <RechartsTooltip />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="asetAlih" name="Aset Alih" stroke="#0d9488" strokeWidth={4} dot={{ r: 6 }} />
                    <Line type="monotone" dataKey="asetTakAlih" name="Aset Tak Alih" stroke="#059669" strokeWidth={4} dot={{ r: 6 }} />
                    <Line type="monotone" dataKey="asetBiologi" name="Aset Biologi" stroke="#d97706" strokeWidth={4} dot={{ r: 6 }} />
                    <Line type="monotone" dataKey="asetTakKetara" name="Aset Tak Ketara" stroke="#6366f1" strokeWidth={4} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* SLIDE 3: AGING & CONDITION PROFILE */}
          {currentSlide === 3 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Slaid 4 dari 5</span>
                <h2 className="text-2xl font-black text-white">Profil Kondisi Fizikal & Nisbah Kesihatan Aset</h2>
                <p className="text-xs text-slate-300">Status Kondisi 1 (Sangat Baik) Hingga 5 (Rosak/Pelupusan)</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#03140a] border border-teal-500/30 h-[420px] shadow-2xl">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={agingData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(20, 184, 166, 0.15)" horizontal={false} />
                    <XAxis type="number" stroke="#cbd5e1" tickFormatter={(val) => `${val}%`} />
                    <YAxis dataKey="category" type="category" stroke="#cbd5e1" tickLine={false} axisLine={false} width={120} />
                    <RechartsTooltip />
                    <Legend />
                    <Bar dataKey="baik" name="1-2 Baik / Cemerlang" stackId="a" fill="#059669" />
                    <Bar dataKey="sederhana" name="3 Sederhana" stackId="a" fill="#0284c7" />
                    <Bar dataKey="servis" name="4 Perlu Servis" stackId="a" fill="#d97706" />
                    <Bar dataKey="rosak" name="5 Rosak / Pelupusan" stackId="a" fill="#e11d48" radius={[0, 6, 6, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* SLIDE 4: AUDIT COMPLIANCE & AGENCIES */}
          {currentSlide === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <div className="text-center space-y-2">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-widest">
                  Pematuhan Audit & Status Agensi KPKM
                </span>
                <h2 className="text-3xl font-black text-white">Jaminan Keselarasan iGFMAS & Standards MFRS 141</h2>
                <p className="text-xs text-slate-300 max-w-xl mx-auto">
                  Semua rekod pendaftaran diselaraskan secara langsung dengan Jabatan Akauntan Negara Malaysia (ANM) untuk audit bersih tahun 2026.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#03180c] border border-emerald-500/40 space-y-3">
                  <ShieldCheck className="size-10 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Audit Pematuhan TPA & iGFMAS</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    100% kod kategori dikadarkan mengikut pekeliling perbendaharaan terkini bagi menjamin sifar teguran audit.
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    100% Patuh Standards
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#03180c] border border-amber-500/40 space-y-3">
                  <Trees className="size-10 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">Penilaian Aset Biologi MFRS 141</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Pengiktirafan nilai saksama (fair value) bagi ternakan DVS dan tanaman DOA dikemaskini mengikut kitaran matang.
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                    Aset Hidup Dinilai
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-[#03180c] border border-teal-500/40 space-y-3">
                  <Activity className="size-10 text-teal-400" />
                  <h3 className="text-lg font-bold text-white">Integrasi 7 Agensi KPKM</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    FAMA, LPP, MAQIS, DVS, DOA, LKIM, & MARDI menyumbang data inventori teragih dalam satu sistem berpusat.
                  </p>
                  <span className="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-bold">
                    Hub Agensi Bersepadu
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* PRESENTATION FOOTER CONTROLS */}
      <footer className="h-16 px-6 bg-[#03140a]/90 border-t border-amber-500/30 flex items-center justify-between shrink-0">
        
        {/* Slide navigation controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlide(prev => (prev > 0 ? prev - 1 : totalSlides - 1))}
            className="p-2 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
          >
            <ChevronLeft size={16} /> Slaid Sebelumnya
          </button>

          <button
            onClick={() => setCurrentSlide(prev => (prev + 1) % totalSlides)}
            className="p-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold transition-all cursor-pointer flex items-center gap-1 text-xs shadow-md"
          >
            Slaid Seterusnya <ChevronRight size={16} />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-2">
          {slides.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx 
                  ? 'w-8 bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]' 
                  : 'w-2.5 bg-emerald-900/80 hover:bg-emerald-700'
              }`}
              title={s.title}
            />
          ))}
        </div>

        {/* Slide counter text */}
        <div className="text-xs font-bold text-slate-300">
          Slaid <span className="text-amber-400 font-extrabold text-sm">{currentSlide + 1}</span> / {totalSlides}
        </div>
      </footer>

    </div>
  );
}
