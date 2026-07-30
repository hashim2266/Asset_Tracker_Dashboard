import React, { useState, useEffect } from 'react';
import { 
  Sparkles, BookOpen, Clock, Calendar, ShieldCheck, 
  Building2, Layers, Cpu, Radio, CheckCircle2 
} from 'lucide-react';
import { KpkmLogo } from './KpkmLogo';

interface KpkmHeaderBannerProps {
  onOpenExtractor: () => void;
  onOpenReport: () => void;
  extractedNoticeCount?: number | null;
}

export function KpkmHeaderBanner({
  onOpenExtractor,
  onOpenReport,
  extractedNoticeCount
}: KpkmHeaderBannerProps) {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date in Malay format (e.g. Ahad, 26 Julai 2026)
  const formattedDate = currentTime.toLocaleDateString('ms-MY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Format time (e.g. 13:58:24 MYT)
  const formattedTime = currentTime.toLocaleTimeString('ms-MY', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#03140a] via-[#082216] to-[#04161f] border border-amber-500/30 p-4 sm:p-5 shadow-2xl relative overflow-hidden">
      {/* Subtle background metallic glow accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
        
        {/* LEFT BLOCK: LOGO + BAHAGIAN PENTADBIRAN + SYSTEM TITLE (GOLD) + TRADEMARK (GOLD) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1 min-w-0">
          
          {/* Official Logo KPKM Badge Container */}
          <div className="shrink-0 flex flex-col items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-xl transition-transform hover:scale-105">
            <KpkmLogo size="lg" variant="badge" />
            <span className="text-[9px] font-black text-[#003882] uppercase tracking-widest mt-1">
              MALAYSIA
            </span>
          </div>

          {/* Title & Department Info */}
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              {/* Department Name Badge */}
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Building2 size={12} className="text-emerald-400" />
                BAHAGIAN PENTADBIRAN
              </span>

              {/* Integration Status Badge */}
              <span className="px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[11px] font-semibold tracking-wide shadow-sm flex items-center gap-1">
                <ShieldCheck size={12} className="text-teal-400" />
                Integrasi iGFMAS 2026
              </span>
            </div>

            {/* System Headnote Title in Gold - USER REQUESTED GOLD ONLY ON HEADNOTE */}
            <h1 className="text-lg sm:text-xl xl:text-2xl font-black tracking-tight leading-snug bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(245,158,11,0.3)]">
              DASHBOARD PENGURUSAN & PEMANTAUAN ASET KPKM
            </h1>

            <p className="text-xs text-slate-300 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
              <span>Kementerian Pertanian dan Keterjaminan Makanan (KPKM)</span>
            </p>
          </div>
        </div>

        {/* RIGHT BLOCK: REAL-TIME CLOCK/DATE & ACTION BUTTONS */}
        <div className="flex flex-wrap sm:flex-nowrap lg:flex-col xl:flex-row items-center lg:items-end xl:items-center justify-between lg:justify-end gap-3 border-t lg:border-t-0 border-emerald-900/40 pt-3 lg:pt-0 shrink-0">
          
          {/* Live Date & Time Display */}
          <div className="bg-[#031109] px-4 py-2 rounded-xl border border-amber-500/30 text-left sm:text-right space-y-0.5 shadow-inner shrink-0 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 text-slate-300 text-[11px] justify-start sm:justify-end font-semibold">
              <Calendar size={12} className="text-emerald-400 shrink-0" />
              <span className="whitespace-nowrap">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5 justify-start sm:justify-end">
              <Clock size={13} className="text-amber-400 animate-pulse shrink-0" />
              <span className="font-mono text-sm sm:text-base font-black text-amber-300 tracking-wider whitespace-nowrap">
                {formattedTime} <span className="text-[10px] text-amber-500/80 font-sans">MYT</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenExtractor}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black text-xs font-black flex items-center gap-2 shadow-[0_0_20px_rgba(245,158,11,0.35)] transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Sparkles size={16} className="text-black" />
              Ekstrak Excel / CSV / PDF
            </button>

            <button
              onClick={onOpenReport}
              className="px-3.5 py-2.5 rounded-xl bg-[#082216] border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-950 text-emerald-200 text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <BookOpen size={16} className="text-emerald-400" />
              Laporan PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
