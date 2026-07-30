import React from 'react';

interface KpkmLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'badge';
}

export function KpkmLogo({ className = '', size = 'md', variant = 'badge' }: KpkmLogoProps) {
  // Dimensions map
  const sizeClasses = {
    sm: 'h-8 px-2.5 py-1',
    md: 'h-11 px-3.5 py-1.5',
    lg: 'h-14 px-4.5 py-2',
    xl: 'h-18 px-5 py-2.5',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center justify-center bg-white rounded-xl shadow-lg border border-slate-200/90 ${sizeClasses[size]} ${className}`}>
        {/* KPKM Official Styled Vector Wordmark Logo */}
        <div className="flex items-baseline font-black tracking-tighter select-none font-sans" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          {/* First 'k' with official green leaf accent */}
          <span className="relative inline-block text-[#003882] font-extrabold text-[1.15em] leading-none">
            k
            <span className="absolute bottom-[2px] left-[1px] w-[6px] h-[7px] bg-[#3fa32a] clip-path-leaf transform -rotate-12 rounded-sm shadow-sm" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
          </span>

          {/* 'p' */}
          <span className="text-[#003882] font-extrabold text-[1.15em] leading-none">p</span>

          {/* Second 'k' with official green leaf accent */}
          <span className="relative inline-block text-[#003882] font-extrabold text-[1.15em] leading-none">
            k
            <span className="absolute bottom-[2px] left-[1px] w-[6px] h-[7px] bg-[#3fa32a] clip-path-leaf transform -rotate-12 rounded-sm shadow-sm" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
          </span>

          {/* 'm' */}
          <span className="text-[#003882] font-extrabold text-[1.15em] leading-none">m</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1 font-black tracking-tighter select-none ${textSizes[size]} ${className}`}>
      <svg viewBox="0 0 180 50" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* First 'k' stem & bowl */}
        <path d="M 15 8 L 24 8 L 24 42 L 15 42 Z" fill={variant === 'dark' ? '#38bdf8' : '#fbbf24'} />
        <path d="M 38 18 L 24 28 L 24 21 L 34 14 Z" fill={variant === 'dark' ? '#38bdf8' : '#fbbf24'} />
        <path d="M 24 29 L 39 42 L 29 42 L 18 32 Z" fill="#34d399" />

        {/* 'p' */}
        <path d="M 45 18 L 54 18 L 54 49 L 45 49 Z" fill={variant === 'dark' ? '#38bdf8' : '#fef08a'} />
        <path d="M 54 18 C 65 18, 73 23, 73 30 C 73 37, 65 42, 54 42 L 54 35 C 60 35, 65 33, 65 30 C 65 27, 60 25, 54 25 Z" fill={variant === 'dark' ? '#38bdf8' : '#fef08a'} />

        {/* Second 'k' */}
        <path d="M 80 8 L 89 8 L 89 42 L 80 42 Z" fill={variant === 'dark' ? '#38bdf8' : '#fbbf24'} />
        <path d="M 103 18 L 89 28 L 89 21 L 99 14 Z" fill={variant === 'dark' ? '#38bdf8' : '#fbbf24'} />
        <path d="M 89 29 L 104 42 L 94 42 L 83 32 Z" fill="#34d399" />

        {/* 'm' */}
        <path d="M 110 18 L 118 18 L 118 42 L 110 42 Z" fill={variant === 'dark' ? '#38bdf8' : '#34d399'} />
        <path d="M 118 18 C 122 18, 128 20, 131 25 C 134 20, 140 18, 145 18 C 153 18, 158 23, 158 31 L 158 42 L 150 42 L 150 32 C 150 27, 147 24, 142 24 C 137 24, 134 27, 134 32 L 134 42 L 126 42 L 126 32 C 126 27, 123 24, 118 24 Z" fill={variant === 'dark' ? '#38bdf8' : '#34d399'} />
      </svg>
    </div>
  );
}

