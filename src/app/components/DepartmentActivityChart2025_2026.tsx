import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  Legend, ResponsiveContainer, Cell 
} from 'recharts';
import { 
  Building2, Landmark, DollarSign, Wrench, Trash2, ShoppingCart, 
  ChevronRight, X, AlertCircle, CheckCircle2, FileText, Info, Filter, ArrowUpRight
} from 'lucide-react';

export interface DepartmentActivityData {
  code: string;
  name: string;
  fullTitle: string;
  perolehanBaru: number; // in RM
  penyelenggaraan: number; // in RM
  pelupusan: number; // in RM
  // Breakdown details for 2025-2026 modal
  detailPerolehan: Array<{ item: string; cost: number; category: string; status: string }>;
  detailMaintenance: Array<{ task: string; cost: number; vendor: string; status: string }>;
  detailPelupusan: Array<{ item: string; qty: number; estimatedValue: number; reason: string }>;
}

export const DEPARTMENT_DATA_2025_2026: DepartmentActivityData[] = [
  {
    code: 'HQ KPKM',
    name: 'Ibu Pejabat KPKM',
    fullTitle: 'Ibu Pejabat Wisma Tani Putrajaya',
    perolehanBaru: 8500000,
    penyelenggaraan: 2300000,
    pelupusan: 1100000,
    detailPerolehan: [
      { item: 'Naik Taraf Server Pusat Data iGFMAS & Cloud', cost: 4200000, category: 'ICT & Perisian', status: 'Selesai ST1 2026' },
      { item: 'Komputer Kompak & Laptop Bahagian Pentadbiran (120 Unit)', cost: 2300000, category: 'Aset Alih ICT', status: 'Selesai ST2 2026' },
      { item: 'Kenderaan Rasmi Jabatan (3 Unit SUV Hybrid)', cost: 2000000, category: 'Kenderaan', status: 'Aktif' },
    ],
    detailMaintenance: [
      { task: 'Penyelenggaraan Berkala Server Data Center Wisma Tani', cost: 1100000, vendor: 'Sistem Integrator Berhad', status: 'Dalam Pelaksanaan' },
      { task: 'Servis & Penyelenggaraan Aircond Central Wisma Tani', cost: 750000, vendor: 'HVAC Tech Sdn Bhd', status: 'Selesai' },
      { task: 'Penyelenggaraan Kenderaan Rasmi Ibu Pejabat', cost: 450000, vendor: 'Panel Bengkel KPKM', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Laptop & Desktop Usang (> 6 Tahun)', qty: 145, estimatedValue: 280000, reason: 'Tamat Hayat Ekonomi (Pekeliling AM 2.7)' },
      { item: 'Perabot Pejabat Rosak & Kerusi Seminar', qty: 320, estimatedValue: 120000, reason: 'Rosak Teruk Tidak Boleh Dibaiki' },
      { item: 'Server Rangkaian Legacy 2017', qty: 12, estimatedValue: 700000, reason: 'Teknologi Usang (Obsolete)' },
    ]
  },
  {
    code: 'DOA',
    name: 'Jabatan Pertanian',
    fullTitle: 'Jabatan Pertanian Malaysia',
    perolehanBaru: 6338022,
    penyelenggaraan: 1820000,
    pelupusan: 950000,
    detailPerolehan: [
      { item: 'Dron Penyembur Racun Pintar (20 Unit)', cost: 2400000, category: 'Jentera Pertanian', status: 'Selesai ST1 2026' },
      { item: 'Traktor Kubota 45HP & Aksesori Bajak', cost: 2138022, category: 'Jentera Berat', status: 'Dalam Agihan' },
      { item: 'Sistem Drip Aeroponik Stesen Pertanian', cost: 1800000, category: 'Aset Tak Alih', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Servis Overhaul Traktor & Jentera Ladang DOA', cost: 980000, vendor: 'AgriMech Services', status: 'Selesai' },
      { task: 'Penyelenggaraan Rumah Hijau & Sensor Tanaman', cost: 540000, vendor: 'Greenhouse Automation', status: 'Berkala' },
      { task: 'Servis Kenderaan Khidmat Nasihat Lapangan', cost: 300000, vendor: 'Bengkel Wilayah DOA', status: 'Aktif' },
    ],
    detailPelupusan: [
      { item: 'Traktor Usang Umur > 12 Tahun', qty: 18, estimatedValue: 550000, reason: 'Kos Pembaikan Melebihi 60% Nilai Buku' },
      { item: 'Peralatan Makmal Baka Tanaman Usang', qty: 45, estimatedValue: 400000, reason: 'Alat Analisis Tidak Lagi Tepat' },
    ]
  },
  {
    code: 'DOF',
    name: 'Jabatan Perikanan',
    fullTitle: 'Jabatan Perikanan Malaysia',
    perolehanBaru: 8920000,
    penyelenggaraan: 2450000,
    pelupusan: 1200000,
    detailPerolehan: [
      { item: 'Bot Rondaan Marin Class A Kuarantin', cost: 4800000, category: 'Maritim & Bot', status: 'Selesai ST1 2026' },
      { item: 'Sistem Oksigen Hatcheri Akuakultur Moden', cost: 2620000, category: 'Peralatan Biologi', status: 'Selesai ST2 2026' },
      { item: 'Radar & Sonar Marin Pengawasan Bot', cost: 1500000, category: 'ICT Maritim', status: 'Pemasangan' },
    ],
    detailMaintenance: [
      { task: 'Overhaul Enjin Twin-Engine Bot Rondaan DOF', cost: 1350000, vendor: 'Marine Propulsion Corp', status: 'Selesai ST1 2026' },
      { task: 'Penyelenggaraan Tangki Hatcheri & Pam Air Laut', cost: 720000, vendor: 'AquaTech Engineering', status: 'Berkala' },
      { task: 'Servis Radar & GPS Stesen Perikanan', cost: 380000, vendor: 'NaviCom Malaysia', status: 'Selesai' },
    ],
    detailPelupusan: [
      { item: 'Bot Rondaan Usang Kasar Teruk', qty: 4, estimatedValue: 850000, reason: 'Struktur Gentian Kaca Retak Teruk' },
      { item: 'Kompressor Oksigen Akuakultur 2015', qty: 12, estimatedValue: 350000, reason: 'Tidak Ekonomik Dibaiki' },
    ]
  },
  {
    code: 'DVS',
    name: 'Jabatan Veterinar',
    fullTitle: 'Jabatan Perkhidmatan Veterinar',
    perolehanBaru: 7800000,
    penyelenggaraan: 2100000,
    pelupusan: 1150000,
    detailPerolehan: [
      { item: 'Peralatan Abattoir Moden & Timbangan Lembu', cost: 3600000, category: 'Mesin & Industri', status: 'Selesai ST1 2026' },
      { item: 'Kontena Penyejuk Inseminasi Buatan Ternakan', cost: 2400000, category: 'Aset Biologi/Storan', status: 'Selesai ST2 2026' },
      { item: 'Lori Frigo Pengangkutan Daging Segar', cost: 1800000, category: 'Kenderaan', status: 'Pendaftaran' },
    ],
    detailMaintenance: [
      { task: 'Servis Bilik Sejuk & Chillers Abattoir DVS', cost: 1100000, vendor: 'FrigoCold Specialist', status: 'Selesai' },
      { task: 'Penyelenggaraan Autoklaf Makmal Diagnosis', cost: 650000, vendor: 'BioLab Maintenance', status: 'Berkala' },
      { task: 'Servis Kenderaan Operasi Wabak Ternakan', cost: 350000, vendor: 'Panel DVS Bengkel', status: 'Aktif' },
    ],
    detailPelupusan: [
      { item: 'Peralatan Operation Theatre Klinik Usang', qty: 32, estimatedValue: 680000, reason: 'Teknologi Lama Tidak Patuh SOP' },
      { item: 'Lori Kutipan Sampel Usang (2014)', qty: 5, estimatedValue: 470000, reason: 'Gagal Pemeriksaan PUSPAKOM' },
    ]
  },
  {
    code: 'MAQIS',
    name: 'MAQIS',
    fullTitle: 'Jabatan Perkhidmatan Kuarantin & Pemeriksaan',
    perolehanBaru: 4128380,
    penyelenggaraan: 880000,
    pelupusan: 350000,
    detailPerolehan: [
      { item: 'Pengimbas X-Ray Begasi Kargo Sempadan (4 Unit)', cost: 2800000, category: 'Peralatan Sempadan', status: 'Selesai ST1 2026' },
      { item: 'Peranti Mudah Alih Pemeriksaan Kuarantin', cost: 1328380, category: 'ICT Field', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Kalibrasi & Servis Pengimbas X-Ray KLIA/Pelabuhan', cost: 580000, vendor: 'Nuctech Security Tech', status: 'Selesai ST1 2026' },
      { task: 'Penyelenggaraan Bilik Kuarantin Sementara', cost: 300000, vendor: 'FacilityCare Services', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Mesin X-Ray Kuarantin Generasi 1 (2016)', qty: 3, estimatedValue: 350000, reason: 'Komponen Alat Ganti Tiada Di Pasaran' },
    ]
  },
  {
    code: 'FAMA',
    name: 'FAMA',
    fullTitle: 'Lembaga Pemasaran Pertanian Persekutuan',
    perolehanBaru: 5394094,
    penyelenggaraan: 1250000,
    pelupusan: 620000,
    detailPerolehan: [
      { item: 'Trak Frigo Pasar Tani Bergerak (8 Unit)', cost: 3100000, category: 'Kenderaan Logistik', status: 'Selesai ST1 2026' },
      { item: 'Bilik Sejuk Pusat Storan Makanan FAMA', cost: 2294094, category: 'Aset Tak Alih', status: 'Pemasangan' },
    ],
    detailMaintenance: [
      { task: 'Penyelenggaraan Kenderaan Logistik & Trak FAMA', cost: 780000, vendor: 'FAMA Logistics Fleet', status: 'Berkala' },
      { task: 'Servis Bilik Sejuk Pusat Pemasaran Pasir Puteh', cost: 470000, vendor: 'ColdChain Tech', status: 'Selesai' },
    ],
    detailPelupusan: [
      { item: 'Kenderaan Penghantaran Usang (> 10 Tahun)', qty: 12, estimatedValue: 620000, reason: 'Tamat Tempoh Kegunaan Ekonomi' },
    ]
  },
  {
    code: 'LKIM',
    name: 'LKIM',
    fullTitle: 'Lembaga Kemajuan Ikan Malaysia',
    perolehanBaru: 3500000,
    penyelenggaraan: 940000,
    pelupusan: 480000,
    detailPerolehan: [
      { item: 'Kren Menurunkan Hasil Laut Jeti LKIM', cost: 1900000, category: 'Jentera Jeti', status: 'Selesai ST1 2026' },
      { item: 'Mesin Ice Maker Flake Kompleks LKIM', cost: 1600000, category: 'Loji & Mesin', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Penyelenggaraan Kilang Ais Kompleks Perikanan', cost: 580000, vendor: 'Fisheries Mech Corp', status: 'Selesai' },
      { task: 'Servis & Baik Pulih Jeti Nelayan LKIM', cost: 360000, vendor: 'Kontraktor Marin Wilayah', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Peralatan Kren Jeti Lama Usang', qty: 2, estimatedValue: 480000, reason: 'Karat Teruk Air Laut' },
    ]
  },
  {
    code: 'MADA',
    name: 'MADA',
    fullTitle: 'Lembaga Kemajuan Pertanian Muda',
    perolehanBaru: 5850000,
    penyelenggaraan: 1950000,
    pelupusan: 800000,
    detailPerolehan: [
      { item: 'Stesen Pam Pengairan Sawah Padi Kedah', cost: 3450000, category: 'Aset Tak Alih', status: 'Selesai ST1 2026' },
      { item: 'Jentera Penuaian Padi Combine Harvester', cost: 2400000, category: 'Jentera Berat', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Penyelenggaraan Pam Utama Pengairan Muda', cost: 1250000, vendor: 'Empangan Muda Hydro', status: 'Selesai ST1 2026' },
      { task: 'Servis Jentera Berat MADA', cost: 700000, vendor: 'Bengkel MADA Alor Setar', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Pam Air Diesel Usang (Tahun 2010)', qty: 8, estimatedValue: 800000, reason: 'Syor Pelupusan Pekeliling AM 2.7' },
    ]
  },
  {
    code: 'KADA',
    name: 'KADA',
    fullTitle: 'Lembaga Kemajuan Pertanian Kemubu',
    perolehanBaru: 4300000,
    penyelenggaraan: 1120000,
    pelupusan: 520000,
    detailPerolehan: [
      { item: 'Pam Air Diesel High-Volume Pengairan Kelantan', cost: 2800000, category: 'Jentera Pengairan', status: 'Selesai ST1 2026' },
      { item: 'Dron Pemetaan Sawah & Padi KADA', cost: 1500000, category: 'Aset Alih ICT', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Penyelenggaraan Stesen Pam Kemubu', cost: 750000, vendor: 'Kemubu Hydro Engineering', status: 'Selesai' },
      { task: 'Baik Pulih Saluran Pengairan Sawah', cost: 370000, vendor: 'Kontraktor Pengairan KADA', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Stesen Pam Bergerak Usang', qty: 6, estimatedValue: 520000, reason: 'Kerosakan Enjin Utama' },
    ]
  },
  {
    code: 'LPP',
    name: 'LPP',
    fullTitle: 'Lembaga Pertubuhan Peladang',
    perolehanBaru: 3200000,
    penyelenggaraan: 850000,
    pelupusan: 400000,
    detailPerolehan: [
      { item: 'Silo Storan Padi Pertubuhan Peladang', cost: 2100000, category: 'Storan & Loji', status: 'Selesai ST1 2026' },
      { item: 'Traktor Mini Peladang (6 Unit)', cost: 1100000, category: 'Jentera Pertanian', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Servis Silo & Penyelenggaraan Pengering Padi', cost: 550000, vendor: 'Peladang Tech Corp', status: 'Selesai' },
      { task: 'Penyelenggaraan Jentera Peladang Kawasan', cost: 300000, vendor: 'Bengkel LPP Wilayah', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Traktor Usang Pertubuhan Peladang', qty: 5, estimatedValue: 400000, reason: 'Tamat Umur Guna' },
    ]
  },
  {
    code: 'MARDI',
    name: 'MARDI',
    fullTitle: 'Institut Penyelidikan & Kemajuan Pertanian',
    perolehanBaru: 6500000,
    penyelenggaraan: 1480000,
    pelupusan: 720000,
    detailPerolehan: [
      { item: 'Spektrometer & Sequencer DNA Baka Tanaman', cost: 3800000, category: 'Peralatan Makmal R&D', status: 'Selesai ST1 2026' },
      { item: 'Chamber Fitotron Kawalan Iklim R&D', cost: 2700000, category: 'Aset Makmal', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Kalibrasi Tahunan Alat Saintifik Makmal MARDI', cost: 980000, vendor: 'Precision Calibration Lab', status: 'Selesai ST1 2026' },
      { task: 'Penyelenggaraan Fitotron & Bilik Tisu R&D', cost: 500000, vendor: 'MARDI Scientific Services', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Alat Analisis Spektroskopi 2012', qty: 8, estimatedValue: 720000, reason: 'Alat Ganti Discontinue Oleh Pengeluar' },
    ]
  },
  {
    code: 'LPNM',
    name: 'LPNM',
    fullTitle: 'Lembaga Perindustrian Nanas Malaysia',
    perolehanBaru: 2185400,
    penyelenggaraan: 580000,
    pelupusan: 280000,
    detailPerolehan: [
      { item: 'Mesin Gred & Pembungkusan Nanas MD2', cost: 1400000, category: 'Mesin Industri', status: 'Selesai ST1 2026' },
      { item: 'Jentera Penanaman Nanas Pintar', cost: 785400, category: 'Jentera Pertanian', status: 'Selesai ST2 2026' },
    ],
    detailMaintenance: [
      { task: 'Penyelenggaraan Loji Pemprosesan Nanas LPNM', cost: 380000, vendor: 'Pineapple Machinery Corp', status: 'Selesai' },
      { task: 'Servis Jentera Field Ladang Nanas', cost: 200000, vendor: 'Bengkel LPNM Johor', status: 'Berkala' },
    ],
    detailPelupusan: [
      { item: 'Mesin Pemotong & Gred Nanas Lama', qty: 4, estimatedValue: 280000, reason: 'Rosak Teruk Tidak Boleh Dibaiki' },
    ]
  }
];

export function DepartmentActivityChart2025_2026() {
  const [selectedDept, setSelectedDept] = useState<DepartmentActivityData | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'ALL' | 'HQ' | 'AGENCIES'>('ALL');

  const filteredData = DEPARTMENT_DATA_2025_2026.filter(item => {
    if (activeCategoryFilter === 'HQ') return item.code === 'HQ KPKM';
    if (activeCategoryFilter === 'AGENCIES') return item.code !== 'HQ KPKM';
    return true; // 'ALL'
  });

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dept = DEPARTMENT_DATA_2025_2026.find(d => d.code === label);
      return (
        <div className="bg-[#031109] p-4 border border-emerald-500/50 shadow-2xl rounded-2xl text-white max-w-xs backdrop-blur-md">
          <p className="font-black text-amber-300 text-sm border-b border-emerald-800/60 pb-1 mb-2">
            {dept ? dept.fullTitle : label}
          </p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex justify-between items-center gap-4 text-xs my-1.5">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-mono font-bold" style={{ color: entry.color }}>
                RM {(entry.value / 1000000).toFixed(2)}M
              </span>
            </div>
          ))}
          <div className="mt-3 pt-2 border-t border-emerald-900/60 text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <Info size={12} /> Klik bar untuk lihat maklumat terperinci!
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#04160d] border border-emerald-500/20 rounded-3xl p-6 shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-emerald-900/40 pb-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Landmark size={12} /> KPKM • DATA 2025-2026
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
              Interaktif (Klik Jabatan)
            </span>
          </div>
          <h3 className="text-xl font-black text-white tracking-tight">
            Perbandingan Aktiviti Aset: Perolehan Baru, Penyelenggaraan & Pelupusan (2025-2026)
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Analisis aktiviti pengurusan aset. Gunakan penapis di bawah untuk melihat Ibu Pejabat, 12 Jabatan / Agensi atau Gabungan Keseluruhan.
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={() => setActiveCategoryFilter('ALL')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeCategoryFilter === 'ALL'
                  ? 'bg-emerald-500 text-black border-emerald-300 shadow-md'
                  : 'bg-[#020d07] text-emerald-300/80 border-emerald-900 hover:bg-emerald-950'
              }`}
            >
              🌐 Semua / Gabungan
            </button>
            <button
              onClick={() => setActiveCategoryFilter('HQ')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeCategoryFilter === 'HQ'
                  ? 'bg-amber-400 text-black border-amber-300 shadow-md'
                  : 'bg-[#020d07] text-amber-300/80 border-amber-900 hover:bg-amber-950'
              }`}
            >
              🏢 (1) Ibu Pejabat KPKM Sahaja
            </button>
            <button
              onClick={() => setActiveCategoryFilter('AGENCIES')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeCategoryFilter === 'AGENCIES'
                  ? 'bg-teal-400 text-black border-teal-300 shadow-md'
                  : 'bg-[#020d07] text-teal-300/80 border-teal-900 hover:bg-teal-950'
              }`}
            >
              🏛️ (2) 12 Jabatan & Agensi Sahaja
            </button>
          </div>
        </div>

        {/* Legend Quick Summary */}
        <div className="flex flex-wrap items-center gap-3 bg-[#020b06] p-3 rounded-2xl border border-emerald-900/60 text-xs shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            <span className="text-slate-200 font-bold">Perolehan Baru</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
            <span className="text-slate-200 font-bold">Penyelenggaraan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <span className="text-slate-200 font-bold">Pelupusan</span>
          </div>
        </div>
      </div>

      {/* Main Bar Chart */}
      <div className="h-[420px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={filteredData}
            margin={{ top: 15, right: 15, left: 10, bottom: 25 }}
            onClick={(state) => {
              if (state && state.activePayload && state.activePayload.length) {
                const clickedCode = state.activePayload[0].payload.code;
                const found = DEPARTMENT_DATA_2025_2026.find(d => d.code === clickedCode);
                if (found) setSelectedDept(found);
              }
            }}
            className="cursor-pointer"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 185, 129, 0.12)" />
            <XAxis 
              dataKey="code" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 700 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickFormatter={(value) => `RM ${(value / 1000000).toFixed(1)}M`}
            />
            <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.08)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="circle" />

            <Bar 
              name="Perolehan Baru 2025-2026" 
              dataKey="perolehanBaru" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              barSize={14}
            />
            <Bar 
              name="Penyelenggaraan 2025-2026" 
              dataKey="penyelenggaraan" 
              fill="#f59e0b" 
              radius={[4, 4, 0, 0]} 
              barSize={14}
            />
            <Bar 
              name="Pelupusan 2025-2026" 
              dataKey="pelupusan" 
              fill="#f43f5e" 
              radius={[4, 4, 0, 0]} 
              barSize={14}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Interactive Department Selector Grid */}
      <div className="space-y-2 pt-2 border-t border-emerald-900/40">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Pilih Jabatan untuk Lihat Detail 2025-2026:
        </span>
        <div className="flex flex-wrap gap-2">
          {DEPARTMENT_DATA_2025_2026.map(dept => (
            <button
              key={dept.code}
              onClick={() => setSelectedDept(dept)}
              className="px-3 py-1.5 rounded-xl bg-[#020d07] hover:bg-emerald-950 border border-emerald-500/20 hover:border-emerald-400 text-xs font-bold text-emerald-300 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>{dept.code}</span>
              <ChevronRight size={13} className="text-emerald-500" />
            </button>
          ))}
        </div>
      </div>

      {/* DETAIL MODAL POPUP WHEN CLICKED */}
      {selectedDept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#04180e] border-2 border-emerald-500/40 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-white shadow-[0_0_50px_rgba(16,185,129,0.3)] relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedDept(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-emerald-950/80 hover:bg-emerald-800 text-slate-300 hover:text-white border border-emerald-500/30 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 border-b border-emerald-900/60 pb-4 pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black uppercase">
                  Laporan Terperinci 2025-2026
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                  {selectedDept.code}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                {selectedDept.fullTitle}
              </h2>
              <p className="text-xs text-slate-300">
                Laporan komprehensif aktiviti pengurusan aset merangkumi pendaftaran perolehan baharu, penyelenggaraan berjadual & pelupusan mengikut Garis Panduan Pekeliling Perbendaharaan (2025 - 2026).
              </p>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Perolehan */}
              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 space-y-1">
                <div className="flex justify-between items-center text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-1"><ShoppingCart size={14} /> Perolehan Baru</span>
                  <span>2025-2026</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  RM {selectedDept.perolehanBaru.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-300">{selectedDept.detailPerolehan.length} projek perolehan utama</p>
              </div>

              {/* Card 2: Penyelenggaraan */}
              <div className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/30 space-y-1">
                <div className="flex justify-between items-center text-xs text-amber-400 font-bold">
                  <span className="flex items-center gap-1"><Wrench size={14} /> Penyelenggaraan</span>
                  <span>2025-2026</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  RM {selectedDept.penyelenggaraan.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-300">{selectedDept.detailMaintenance.length} tugasan servis & pembaikan</p>
              </div>

              {/* Card 3: Pelupusan */}
              <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 space-y-1">
                <div className="flex justify-between items-center text-xs text-rose-400 font-bold">
                  <span className="flex items-center gap-1"><Trash2 size={14} /> Pelupusan Aset</span>
                  <span>2025-2026</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  RM {selectedDept.pelupusan.toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-300">{selectedDept.detailPelupusan.length} kategori syor pelupusan</p>
              </div>
            </div>

            {/* TABULAR BREAKDOWN SECTIONS */}
            <div className="space-y-6 pt-2">
              
              {/* Section 1: Perolehan Baru 2025-2026 */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-emerald-300 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-900/60 pb-2">
                  <ShoppingCart size={16} className="text-emerald-400" />
                  1. Butiran Perolehan Baru (2025 - 2026)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-emerald-900/50 bg-[#020e07]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-emerald-950/80 text-emerald-300 font-extrabold uppercase border-b border-emerald-900">
                      <tr>
                        <th className="p-3">Nama Perolehan Aset</th>
                        <th className="p-3">Kategori iGFMAS</th>
                        <th className="p-3 text-right">Kos Perolehan (RM)</th>
                        <th className="p-3">Status Pelaksanaan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-900/30 text-slate-200 font-medium">
                      {selectedDept.detailPerolehan.map((p, idx) => (
                        <tr key={idx} className="hover:bg-emerald-950/30">
                          <td className="p-3 font-bold text-white">{p.item}</td>
                          <td className="p-3 text-slate-300">{p.category}</td>
                          <td className="p-3 text-right font-mono font-bold text-emerald-300">
                            RM {p.cost.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Penyelenggaraan 2025-2026 */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider flex items-center gap-2 border-b border-amber-900/60 pb-2">
                  <Wrench size={16} className="text-amber-400" />
                  2. Butiran Penyelenggaraan & Pembaikan (2025 - 2026)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-amber-900/50 bg-[#0c0a03]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-amber-950/80 text-amber-300 font-extrabold uppercase border-b border-amber-900">
                      <tr>
                        <th className="p-3">Tugasan Penyelenggaraan</th>
                        <th className="p-3">Syarikat / Kontraktor Panel</th>
                        <th className="p-3 text-right">Kos Servis (RM)</th>
                        <th className="p-3">Status Work-Order</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-900/30 text-slate-200 font-medium">
                      {selectedDept.detailMaintenance.map((m, idx) => (
                        <tr key={idx} className="hover:bg-amber-950/30">
                          <td className="p-3 font-bold text-white">{m.task}</td>
                          <td className="p-3 text-slate-300">{m.vendor}</td>
                          <td className="p-3 text-right font-mono font-bold text-amber-300">
                            RM {m.cost.toLocaleString()}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3: Pelupusan 2025-2026 */}
              <div className="space-y-3">
                <h4 className="text-sm font-black text-rose-300 uppercase tracking-wider flex items-center gap-2 border-b border-rose-900/60 pb-2">
                  <Trash2 size={16} className="text-rose-400" />
                  3. Butiran Syor Pelupusan Aset (2025 - 2026)
                </h4>
                <div className="overflow-x-auto rounded-xl border border-rose-900/50 bg-[#120407]">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-rose-950/80 text-rose-300 font-extrabold uppercase border-b border-rose-900">
                      <tr>
                        <th className="p-3">Aset Dilupuskan</th>
                        <th className="p-3 text-center">Kuantiti (Unit)</th>
                        <th className="p-3 text-right">Anggaran Nilai Scrap (RM)</th>
                        <th className="p-3">Sebab & Justifikasi Pekeliling</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-rose-900/30 text-slate-200 font-medium">
                      {selectedDept.detailPelupusan.map((d, idx) => (
                        <tr key={idx} className="hover:bg-rose-950/30">
                          <td className="p-3 font-bold text-white">{d.item}</td>
                          <td className="p-3 text-center font-mono font-bold text-slate-200">{d.qty}</td>
                          <td className="p-3 text-right font-mono font-bold text-rose-300">
                            RM {d.estimatedValue.toLocaleString()}
                          </td>
                          <td className="p-3 text-slate-300 text-[11px]">{d.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Pengesahan Audit JKPAK Bil. 3/2026 • Kementerian Pertanian & Keterjaminan Makanan</span>
              </div>
              <button
                onClick={() => setSelectedDept(null)}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                Tutup Maklumat Jabatan
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
