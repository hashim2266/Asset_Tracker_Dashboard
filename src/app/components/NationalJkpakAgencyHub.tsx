import React, { useState } from 'react';
import { 
  Building2, DollarSign, Package, Sprout, Trees, Truck, CheckCircle2, 
  AlertTriangle, ArrowUpRight, ChevronRight, Layers, FileSpreadsheet, 
  PieChart as PieChartIcon, Search, ShieldCheck, Activity, Landmark, Bot, HeartPulse,
  TrendingUp, BarChart2, PieChart, Lightbulb, Award, Sparkles, FileText, Check
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from 'recharts';
import { AnimalMortalityTracker } from './AnimalMortalityTracker';
import { AiReportAnalyzer } from './AiReportAnalyzer';
import { ThreeDBarChart } from './ThreeDBarChart';
import { ThreeDPieChart } from './ThreeDPieChart';
import { ThreeDLineChart } from './ThreeDLineChart';

export interface JkpakAgencyRecord {
  bil: number;
  code: string;
  name: string;
  fullTitle: string;
  allocation: number;
  expense: number;
  balance: number;
  percentageSpent: number;
  movableAssetsCount: number;
  movableInspectedCount: number;
  inspectionRate: number;
  primaryFocus: string;
  color: string;
}

export const KPKM_AGENCIES_DATA: JkpakAgencyRecord[] = [
  { bil: 1, code: 'MADA', name: 'MADA', fullTitle: 'Lembaga Kemajuan Pertanian Muda', allocation: 3348700.00, expense: 2060317.08, balance: 1288382.92, percentageSpent: 61.53, movableAssetsCount: 22507, movableInspectedCount: 12566, inspectionRate: 55.83, primaryFocus: 'Pengairan & Sawah Padi Kedah/Perlis', color: '#059669' },
  { bil: 2, code: 'FAMA', name: 'FAMA', fullTitle: 'Lembaga Pemasaran Pertanian Persekutuan', allocation: 539409.40, expense: 314138.33, balance: 225271.07, percentageSpent: 58.24, movableAssetsCount: 44563, movableInspectedCount: 35776, inspectionRate: 80.28, primaryFocus: 'Pusat Logistik, Storan & Pasar Tani', color: '#0d9488' },
  { bil: 3, code: 'LKIM', name: 'LKIM', fullTitle: 'Lembaga Kemajuan Ikan Malaysia', allocation: 1180000.00, expense: 675052.40, balance: 504947.60, percentageSpent: 57.21, movableAssetsCount: 20584, movableInspectedCount: 14410, inspectionRate: 70.01, primaryFocus: 'Jeti Nelayan, Kompleks Ikan & Akuakultur', color: '#0284c7' },
  { bil: 4, code: 'DOA', name: 'DOA', fullTitle: 'Jabatan Pertanian Malaysia', allocation: 6338022.21, expense: 3492636.77, balance: 2845385.44, percentageSpent: 55.11, movableAssetsCount: 56229, movableInspectedCount: 35482, inspectionRate: 63.10, primaryFocus: 'Pertanian, Baka Tanaman & Dron Ladang', color: '#10b981' },
  { bil: 5, code: 'DOF', name: 'DOF', fullTitle: 'Jabatan Perikanan Malaysia', allocation: 17299400.00, expense: 9215869.71, balance: 8083530.29, percentageSpent: 53.27, movableAssetsCount: 57556, movableInspectedCount: 27876, inspectionRate: 48.43, primaryFocus: 'Bot Rondaan, Akuakultur & Hatcheri Ikan', color: '#3b82f6' },
  { bil: 6, code: 'KADA', name: 'KADA', fullTitle: 'Lembaga Kemajuan Pertanian Kemubu', allocation: 4300000.00, expense: 2234436.45, balance: 2065563.55, percentageSpent: 51.96, movableAssetsCount: 8874, movableInspectedCount: 3219, inspectionRate: 36.27, primaryFocus: 'Pam Pengairan & Sawah Kelantan', color: '#84cc16' },
  { bil: 7, code: 'MAQIS', name: 'MAQIS', fullTitle: 'Jabatan Perkhidmatan Kuarantin & Pemeriksaan', allocation: 4128380.85, expense: 2112567.75, balance: 2015813.10, percentageSpent: 51.17, movableAssetsCount: 10114, movableInspectedCount: 3385, inspectionRate: 33.47, primaryFocus: 'Stesen Kuarantin Sempadan & X-Ray Scanner', color: '#f59e0b' },
  { bil: 8, code: 'LPP', name: 'LPP', fullTitle: 'Lembaga Pertubuhan Peladang', allocation: 2800000.00, expense: 1423584.19, balance: 1376415.81, percentageSpent: 50.84, movableAssetsCount: 6097, movableInspectedCount: 5329, inspectionRate: 87.40, primaryFocus: 'Jentera Pertubuhan Peladang & Silo', color: '#14b8a6' },
  { bil: 9, code: 'DVS', name: 'DVS', fullTitle: 'Jabatan Perkhidmatan Veterinar', allocation: 21763000.00, expense: 10507415.62, balance: 11255584.38, percentageSpent: 48.28, movableAssetsCount: 37237, movableInspectedCount: 1790, inspectionRate: 4.81, primaryFocus: 'Pusat Inseminasi, Abattoir & Ternakan Lembu', color: '#d97706' },
  { bil: 10, code: 'LPNM', name: 'LPNM', fullTitle: 'Lembaga Perindustrian Nanas Malaysia', allocation: 2185400.00, expense: 981456.43, balance: 1203943.57, percentageSpent: 44.91, movableAssetsCount: 6095, movableInspectedCount: 3730, inspectionRate: 61.20, primaryFocus: 'Ladang Nanas MD2, Benih & Loji Pemprosesan', color: '#eab308' },
  { bil: 11, code: 'MARDI', name: 'MARDI', fullTitle: 'Institut Penyelidikan & Kemajuan Pertanian', allocation: 13098901.54, expense: 2536961.00, balance: 10561940.54, percentageSpent: 19.37, movableAssetsCount: 49710, movableInspectedCount: 11397, inspectionRate: 22.93, primaryFocus: 'Makmal R&D, Baka Varieti & Alat Saintifik', color: '#a855f7' },
];

export const KPKM_HQ_DIVISIONS = [
  { bil: 1, code: 'BPKLP', name: 'BPKLP', fullTitle: 'Bahagian Pembangunan Kawasan Luar Bandar', allocation: 8924500.00, expense: 2174660.47, balance: 6749839.53, pct: 24.37, assets: 1510, inspected: 833 },
  { bil: 2, code: 'PENTADBIRAN', name: 'PENTADBIRAN', fullTitle: 'Bahagian Pentadbiran (Wisma Tani)', allocation: 1393400.00, expense: 695664.99, balance: 697735.01, pct: 49.93, assets: 2738, inspected: 26 },
  { bil: 3, code: 'BPD', name: 'BPD', fullTitle: 'Bahagian Pembangunan Industri', allocation: 304700.00, expense: 148557.44, balance: 156142.56, pct: 48.76, assets: 1478, inspected: 16 },
  { bil: 4, code: 'BPSP', name: 'BPSP', fullTitle: 'Bahagian Pelaburan & Sekitaran', allocation: 372700.00, expense: 126846.10, balance: 245853.90, pct: 34.03, assets: 2309, inspected: 0 },
  { bil: 5, code: 'BPP', name: 'BPP', fullTitle: 'Bahagian Perancangan & Penyelidikan', allocation: 185078.38, expense: 42057.63, balance: 143020.75, pct: 22.72, assets: 307, inspected: 214 },
  { bil: 6, code: 'AKAUN', name: 'AKAUN', fullTitle: 'Bahagian Akaun KPKM', allocation: 39700.00, expense: 34575.45, balance: 5124.55, pct: 87.09, assets: 611, inspected: 269 },
  { bil: 7, code: 'IMAT', name: 'IMAT', fullTitle: 'Bahagian Pengurusan Maklumat ICT', allocation: 126700.00, expense: 33032.00, balance: 93668.00, pct: 26.07, assets: 248, inspected: 78 },
  { bil: 8, code: 'PSM', name: 'PSM', fullTitle: 'Bahagian Pengurusan Sumber Manusia', allocation: 112500.00, expense: 22861.20, balance: 89638.80, pct: 20.32, assets: 887, inspected: 5 },
  { bil: 9, code: 'BSM', name: 'BSM', fullTitle: 'Bahagian Sains & Makmal', allocation: 93750.00, expense: 5424.00, balance: 88326.00, pct: 5.79, assets: 359, inspected: 0 },
  { bil: 10, code: 'UAD', name: 'UAD', fullTitle: 'Unit Audit Dalam', allocation: 189500.00, expense: 2355.90, balance: 187144.10, pct: 1.24, assets: 342, inspected: 205 },
  { bil: 11, code: 'UI', name: 'UI', fullTitle: 'Unit Integriti', allocation: 10000.00, expense: 6053.00, balance: 3947.00, pct: 60.53, assets: 422, inspected: 173 },
  { bil: 12, code: 'AB', name: 'AB', fullTitle: 'Bahagian Antarabangsa', allocation: 5000.00, expense: 4990.00, balance: 10.00, pct: 99.80, assets: 339, inspected: 338 },
];

export const BIOLOGICAL_COMPARISON_DATA = [
  { category: 'DVS (Ternakan & Baka)', expenditure: 4100000, revenue: 8450000, unitQty: '25.3k Unit Haiwan', description: 'Ternakan Lembu Baka, Kambing, Ayam & Inseminasi' },
  { category: 'DOA (Tumbuhan & Benih)', expenditure: 3150000, revenue: 6200000, unitQty: '122.8k Pokok Induk', description: 'Pokok Baka Induk, Benih Buah-Buahan & Padi' },
  { category: 'DOF (Akuakultur & Hatcheri)', expenditure: 2900000, revenue: 5800000, unitQty: '18.9k Induk Ikan/Udang', description: 'Hatcheri Benih Ikan Air Tawar & Udang Galah' },
  { category: 'LPNM (Nanas MD2)', expenditure: 1200000, revenue: 3100000, unitQty: '45.0k Sulur Nanas', description: 'Ladang Baka Nanas MD2 & Benih Berakreditasi' },
  { category: 'MARDI (Baka R&D Biologi)', expenditure: 1800000, revenue: 2900000, unitQty: '15.2k Sampel Biologi', description: 'Varieti Padi MARDI, Herba & Baka Elit R&D' },
  { category: 'MADA / KADA (Pengairan)', expenditure: 1450000, revenue: 2100000, unitQty: '8.5k Baka Padi', description: 'Petak Baka Induk Padi & Nurseri Pengairan' },
];

export const INTANGIBLE_IP_DATA = [
  { agency: 'MARDI', fullAgency: 'Institut Penyelidikan MARDI', ipCount: 142, revenueRoyalty: 4850000, topIp: 'Varieti Padi MR297/MR315, Paten Makanan & Mesin', status: '142 Didaftarkan (MyIPO)' },
  { agency: 'DOA', fullAgency: 'Jabatan Pertanian Malaysia', ipCount: 68, revenueRoyalty: 2400000, topIp: 'Skim Hak Cipta Varieti Tanaman (PVP) & Hakcipta SOP', status: '68 Hak Cipta/PVP' },
  { agency: 'DOF', fullAgency: 'Jabatan Perikanan Malaysia', ipCount: 45, revenueRoyalty: 1950000, topIp: 'Paten Sistem Recirculating Aquaculture (RAS) & Baka Ikan', status: '45 Paten/Hak Cipta' },
  { agency: 'DVS', fullAgency: 'Jabatan Perkhidmatan Veterinar', ipCount: 38, revenueRoyalty: 1800000, topIp: 'Paten Vaksin Sampar & Baka Ternakan Inseminasi', status: '38 Paten Vaksin' },
  { agency: 'HQ KPKM', fullAgency: 'Ibu Pejabat KPKM', ipCount: 12, revenueRoyalty: 1200000, topIp: 'Perisian Sistem iGFMAS, e-Aset & Portal KPKM', status: '12 Hak Cipta Perisian' },
  { agency: 'LPNM', fullAgency: 'Lembaga Perindustrian Nanas', ipCount: 18, revenueRoyalty: 850000, topIp: 'Hak Cipta Varieti Nanas MD2 & Standard Pemprosesan', status: '18 Hak Cipta Varieti' },
  { agency: 'FAMA', fullAgency: 'Lembaga Pemasaran Pertanian', ipCount: 15, revenueRoyalty: 620000, topIp: 'Tanda Dagangan (Trademark) Agrobazaar & Hak Cipta Brand', status: '15 Trademark/Hak Cipta' },
];

interface NationalJkpakProps {
  selectedAgencyCode: string;
  onSelectAgency: (code: string) => void;
}

export function NationalJkpakAgencyHub({ selectedAgencyCode, onSelectAgency }: NationalJkpakProps) {
  const [dataCategory, setDataCategory] = useState<'ALL' | 'HQ' | 'AGENCIES'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'HQ_VIEW' | 'AGENCY_VIEW' | 'BIOLOGICAL' | 'INTANGIBLE' | 'AI_ANALYZER' | 'STRATEGIC_PITCH'>('STRATEGIC_PITCH');

  // Filtered lists
  const filteredAgencies = KPKM_AGENCIES_DATA.filter(a => 
    a.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.fullTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.primaryFocus.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredHqDivisions = KPKM_HQ_DIVISIONS.filter(h =>
    h.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.fullTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Totals
  const hqAllocation = 21343073.16;
  const hqExpense = 8496908.30;
  const hqBalance = 12846164.86;
  const hqPct = 39.81;

  const agencyAllocation = 76981214.00;
  const agencyExpense = 35554435.73;
  const agencyBalance = 41426778.27;
  const agencyPct = 46.18;

  const totalAllocation = 98324287.16;
  const totalExpense = 44051344.03;
  const totalBalance = 54272943.13;
  const totalPct = 44.80;

  // 3D Chart Data for HQ (Category 1)
  const hqQuarterly3DData = [
    { name: 'ST4 2025', value: 21.26 },
    { name: 'ST1 2026', value: 4.95 },
    { name: 'ST2 2026', value: 8.50 },
  ];

  const hqDivision3DPie = KPKM_HQ_DIVISIONS.slice(0, 6).map(h => ({
    name: h.code,
    value: Math.round(h.expense / 1000)
  }));

  const hqPaperless3DLine = [
    { name: 'BPSP', value: 71768 },
    { name: 'BPEM', value: 57314 },
    { name: 'DPS', value: 19747 },
    { name: 'BPIP', value: 18107 },
    { name: 'BSM', value: 15718 },
    { name: 'BPSM', value: 13079 },
  ];

  // 3D Chart Data for Agencies (Category 2)
  const agency3DExpenseBar = KPKM_AGENCIES_DATA.map(a => ({
    name: a.code,
    value: Math.round(a.expense / 1000)
  }));

  const agency3DPieAssets = KPKM_AGENCIES_DATA.slice(0, 7).map(a => ({
    name: a.code,
    value: a.movableAssetsCount
  }));

  const agency3DQuarterlyTrend = [
    { name: 'ST4 2025', value: 61.91 },
    { name: 'ST1 2026', value: 13.36 },
    { name: 'ST2 2026', value: 35.55 },
  ];

  // Combined overview chart data (HQ + 12 Agencies) for Gabungan tab
  const combinedOverviewChartData = [
    { code: 'HQ KPKM', name: 'Ibu Pejabat KPKM', allocation: 21343073.16, expense: 8496908.30 },
    ...KPKM_AGENCIES_DATA.map(a => ({
      code: a.code,
      name: a.name,
      allocation: a.allocation,
      expense: a.expense
    }))
  ];

  return (
    <div className="space-y-6 w-full">
      {/* Top Header Card */}
      <div className="torch-light-card p-6 bg-gradient-to-r from-[#071d13] via-[#0b291a] to-[#081820] border border-emerald-500/30">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Landmark size={13} /> KPKM MALAYSIA • JKPAK BIL 3/2026
              </span>
              <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                Laporan Bersepadu 3D
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Sistem Pemantauan Aset KPKM - Pecahan 2 Kategori Utama
            </h2>
            <p className="text-xs text-slate-300 max-w-3xl leading-relaxed">
              Analisis peruntukan, perbelanjaan & pengurusan aset alih, biologi & stor mengikut <strong>(1) Ibu Pejabat KPKM</strong> & <strong>(2) 12 Jabatan / Agensi KPKM</strong> bagi 3 Suku Tahun.
            </p>
          </div>

          {/* Quick Category Selector Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
            <button
              onClick={() => {
                setDataCategory('HQ');
                setActiveTab('HQ_VIEW');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                dataCategory === 'HQ'
                  ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)] scale-105'
                  : 'bg-[#082216] text-amber-300 border-amber-500/40 hover:bg-amber-950/60'
              }`}
            >
              <Building2 size={16} />
              (1) Ibu Pejabat KPKM
            </button>

            <button
              onClick={() => {
                setDataCategory('AGENCIES');
                setActiveTab('AGENCY_VIEW');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                dataCategory === 'AGENCIES'
                  ? 'bg-emerald-400 text-black border-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.4)] scale-105'
                  : 'bg-[#082216] text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/60'
              }`}
            >
              <Landmark size={16} />
              (2) Jabatan / Agensi KPKM
            </button>

            <button
              onClick={() => {
                setDataCategory('ALL');
                setActiveTab('OVERVIEW');
              }}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                dataCategory === 'ALL'
                  ? 'bg-teal-500 text-black border-teal-300 shadow-md'
                  : 'bg-[#082216] text-teal-200 border-teal-500/40 hover:bg-teal-950/60'
              }`}
            >
              🌐 Gabungan
            </button>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-emerald-900/40 pb-3">
        <button
          onClick={() => setActiveTab('STRATEGIC_PITCH')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border flex items-center gap-1.5 ${
            activeTab === 'STRATEGIC_PITCH'
              ? 'bg-gradient-to-r from-amber-400 to-emerald-400 text-black border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
              : 'bg-[#0f1f17] text-amber-300 border-amber-600/50 hover:bg-amber-950/60'
          }`}
        >
          <Sparkles size={14} className="text-amber-900" /> 🌟 Mod Pembentangan & Pelan Strategik
        </button>
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
            activeTab === 'OVERVIEW'
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-[#061810] text-emerald-300/80 border-emerald-900/50 hover:bg-emerald-950'
          }`}
        >
          📊 Ringkasan Eksekutif (Semua)
        </button>
        <button
          onClick={() => {
            setActiveTab('HQ_VIEW');
            setDataCategory('HQ');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
            activeTab === 'HQ_VIEW'
              ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
              : 'bg-[#061810] text-amber-300/80 border-amber-900/50 hover:bg-amber-950'
          }`}
        >
          🏢 Kategori 1: Ibu Pejabat KPKM
        </button>
        <button
          onClick={() => {
            setActiveTab('AGENCY_VIEW');
            setDataCategory('AGENCIES');
          }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
            activeTab === 'AGENCY_VIEW'
              ? 'bg-teal-400 text-black border-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.3)]'
              : 'bg-[#061810] text-teal-300/80 border-teal-900/50 hover:bg-teal-950'
          }`}
        >
          🏛️ Kategori 2: 12 Jabatan / Agensi KPKM
        </button>
        <button
          onClick={() => setActiveTab('BIOLOGICAL')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
            activeTab === 'BIOLOGICAL'
              ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
              : 'bg-[#061810] text-emerald-300/80 border-emerald-900/50 hover:bg-emerald-950'
          }`}
        >
          🌿 Aset Biologi (Hasil vs Belanja)
        </button>
        <button
          onClick={() => setActiveTab('INTANGIBLE')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
            activeTab === 'INTANGIBLE'
              ? 'bg-amber-400 text-black border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
              : 'bg-[#061810] text-amber-300/80 border-amber-900/50 hover:bg-amber-950'
          }`}
        >
          💡 Aset Tak Ketara & IP
        </button>
        <button
          onClick={() => setActiveTab('AI_ANALYZER')}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
            activeTab === 'AI_ANALYZER'
              ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]'
              : 'bg-[#0b182b] text-indigo-300/90 border-indigo-900/50 hover:bg-indigo-950'
          }`}
        >
          🤖 Analisis AI Gemini
        </button>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          {/* Executive Audit Clarification Banner regarding Unit Asset Quantities */}
          <div className="p-4 rounded-2xl bg-[#031c11] border-2 border-emerald-500/40 space-y-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-black uppercase flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-400" /> AUDIT QUANTITY AUDIT & INVENTORI KESELURUHANA
              </span>
              <span className="text-[11px] text-emerald-300 font-mono font-bold">
                Pegangan Keseluruhan: <strong className="text-white text-sm">363,343 Unit Aset Alih & Stok</strong>
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-emerald-300">Penjelasan Pengagihan Unit Aset:</strong> Tag "12 Unit" di dalam ringkasan merujuk kepada <u className="decoration-emerald-400 font-bold">12 Jabatan dan Agensi Utama</u> di bawah Kementerian Pertanian dan Keterjaminan Makanan (KPKM). Jumlah fizikal sebenar aset alih dan inventori stok yang dikawal selia di iGFMAS adalah sebanyak <strong>363,343 Unit</strong> bernilai <strong>RM 98.32 Juta</strong> (Ibu Pejabat KPKM: 40,616 Unit Aset Alih + 101,247 Stok; 12 Agensi: 322,727 Unit Aset Alih).
            </p>
          </div>

          {/* Comparison Cards between Category 1 (HQ) & Category 2 (Agencies) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category 1 Card */}
            <div className="torch-light-card p-6 border-2 border-amber-400/40 relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 text-xs font-black uppercase">
                  (1) KATEGORI IBU PEJABAT KPKM
                </span>
                <Building2 className="text-amber-400" size={24} />
              </div>
              <h3 className="text-3xl font-black text-white">RM 21,343,073.16</h3>
              <p className="text-xs text-amber-200 mt-1 font-semibold">
                Perbelanjaan Q2: <strong>RM 8,496,908.30</strong> (Prestasi: 39.81%)
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-[#04120b] p-3 rounded-xl border border-amber-500/20">
                <div>
                  <span className="text-slate-400 block">Kuantiti Aset Alih:</span>
                  <strong className="text-white font-mono text-sm">40,616 Unit</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Kuantiti Stok Stor:</span>
                  <strong className="text-emerald-400 font-mono text-sm">101,247 Unit</strong>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('HQ_VIEW');
                  setDataCategory('HQ');
                }}
                className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                Lihat Laporan Lengkap 3D Ibu Pejabat <ChevronRight size={14} />
              </button>
            </div>

            {/* Category 2 Card */}
            <div className="torch-light-card p-6 border-2 border-emerald-400/40 relative overflow-hidden">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-xs font-black uppercase">
                  (2) KATEGORI 12 JABATAN / AGENSI KPKM
                </span>
                <Landmark className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-3xl font-black text-white">RM 76,981,214.00</h3>
              <p className="text-xs text-emerald-200 mt-1 font-semibold">
                Perbelanjaan Q2: <strong>RM 35,554,435.73</strong> (Prestasi: 46.18%)
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs bg-[#04120b] p-3 rounded-xl border border-emerald-500/20">
                <div>
                  <span className="text-slate-400 block">Kuantiti Aset Alih Agensi:</span>
                  <strong className="text-white font-mono text-sm">322,727 Unit</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Pegangan Aset Biologi:</span>
                  <strong className="text-teal-300 font-mono text-sm">RM 19.29 Juta</strong>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('AGENCY_VIEW');
                  setDataCategory('AGENCIES');
                }}
                className="w-full mt-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                Lihat Laporan Lengkap 3D 12 Agensi <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Allocation vs Expense Bar Chart */}
          <div className="torch-light-card p-6">
            <h3 className="text-base font-bold text-emerald-300 mb-2 flex items-center gap-2">
              <Landmark size={18} className="text-teal-400" />
              Prestasi Peruntukan vs Perbelanjaan Gabungan (HQ & 12 Agensi) (RM Juta)
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Laporan Peruntukan Bagi Perolehan Aset Alih, Biologi & Stok Q2 2026 (RM 98.32 Juta Keseluruhan: RM 21.34M Ibu Pejabat + RM 76.98M 12 Agensi)
            </p>
            <div className="w-full h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={combinedOverviewChartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 185, 129, 0.15)" />
                  <XAxis dataKey="code" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tickFormatter={(val) => `RM ${(val / 1000000).toFixed(1)}M`} />
                  <Tooltip 
                    formatter={(val: any) => `RM ${Number(val).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                    contentStyle={{ backgroundColor: '#091712', borderColor: '#10b981', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend />
                  <Bar name="Peruntukan (RM)" dataKey="allocation" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={18} />
                  <Bar name="Perbelanjaan (RM)" dataKey="expense" fill="#10b981" radius={[4, 4, 0, 0]} barSize={18} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 1: IBU PEJABAT KPKM TAB */}
      {activeTab === 'HQ_VIEW' && (
        <div className="space-y-6">
          {/* Header Badge */}
          <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black text-[10px] uppercase">
                KATEGORI 1 • IBU PEJABAT KPKM
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Laporan & Carta 3D Pengurusan Aset Ibu Pejabat KPKM Putrajaya
              </h3>
              <p className="text-xs text-amber-200/80">
                Data terperinci Bahagian Pentadbiran, BPKLP, Akaun, PSM, Pembangunan, BPSP, BPP, UAD, UI, UKK, AB, BSM, IMAT.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Jumlah Peruntukan ST2 2026:</span>
              <strong className="text-2xl font-black text-amber-300 font-mono">RM 21,343,073.16</strong>
            </div>
          </div>

          {/* 3D GRAPHS FOR CATEGORY 1 (IBU PEJABAT) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 3D Graph 1 */}
            <div className="torch-light-card p-5 space-y-2 border border-amber-500/30">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <BarChart2 size={14} className="text-amber-400" /> 1. Carta 3D Perbelanjaan HQ 3 Sukuan (RM Juta)
              </h4>
              <p className="text-[11px] text-slate-300">Trend Belanja Ibu Pejabat (ST4 2025, ST1 2026, ST2 2026)</p>
              <div className="pt-2">
                <ThreeDBarChart data={hqQuarterly3DData} color="#f59e0b" />
              </div>
            </div>

            {/* 3D Graph 2 */}
            <div className="torch-light-card p-5 space-y-2 border border-amber-500/30">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <PieChart size={14} className="text-amber-400" /> 2. Carta 3D Agihan Belanja Bahagian HQ (RM '000)
              </h4>
              <p className="text-[11px] text-slate-300">Pecahan BPKLP, Pentadbiran, BPD, BPSP, BPP, IMAT</p>
              <div className="pt-2">
                <ThreeDPieChart data={hqDivision3DPie} colors={['#f59e0b', '#10b981', '#06b6d4', '#6366f1', '#ec4899', '#84cc16']} />
              </div>
            </div>

            {/* 3D Graph 3 */}
            <div className="torch-light-card p-5 space-y-2 border border-amber-500/30">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                <TrendingUp size={14} className="text-amber-400" /> 3. Carta 3D Paperless Kertas HQ (Helai)
              </h4>
              <p className="text-[11px] text-slate-300">Statistik Penggunaan Kertas Bahagian Utamanya (ST1 2026)</p>
              <div className="pt-2">
                <ThreeDLineChart data={hqPaperless3DLine} color="#34d399" />
              </div>
            </div>
          </div>

          {/* Detailed Data Table for Category 1 */}
          <div className="torch-light-card p-6 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 size={18} className="text-amber-400" />
              Jadual Pecahan Peruntukan Bahagian-Bahagian Ibu Pejabat KPKM
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-amber-800/60 text-amber-300 uppercase text-[10px] tracking-wider bg-amber-950/30">
                    <th className="p-3">Bil</th>
                    <th className="p-3">Bahagian / Unit HQ</th>
                    <th className="p-3 text-right">Peruntukan (RM)</th>
                    <th className="p-3 text-right">Perbelanjaan (RM)</th>
                    <th className="p-3 text-right">Baki (RM)</th>
                    <th className="p-3 text-center">Prestasi Belanja (%)</th>
                    <th className="p-3 text-center">Aset Alih (Diperiksa)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/30 text-slate-200">
                  {filteredHqDivisions.map((hq) => (
                    <tr key={hq.code} className="hover:bg-amber-900/10 transition-all">
                      <td className="p-3 text-slate-400">{hq.bil}</td>
                      <td className="p-3 font-bold text-white">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-extrabold text-[11px] mr-2">
                          {hq.code}
                        </span>
                        {hq.fullTitle}
                      </td>
                      <td className="p-3 text-right font-mono">RM {hq.allocation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400">RM {hq.expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right font-mono text-amber-300">RM {hq.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-900/80 text-emerald-300 font-black text-[11px]">
                          {hq.pct.toFixed(2)}%
                        </span>
                      </td>
                      <td className="p-3 text-center font-mono text-slate-300">
                        {hq.assets} unit ({hq.inspected} diperiksa)
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-amber-500/50 bg-amber-950/60 font-black text-white text-xs">
                  <tr>
                    <td colSpan={2} className="p-3 uppercase text-amber-300 tracking-wider">JUMLAH KESELURUHAN IBU PEJABAT KPKM</td>
                    <td className="p-3 text-right font-mono text-amber-200">RM {hqAllocation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-right font-mono text-emerald-300">RM {hqExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-right font-mono text-amber-300">RM {hqBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-center font-extrabold text-amber-300">{hqPct}%</td>
                    <td className="p-3 text-center font-mono">40,616 Unit</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CATEGORY 2: JABATAN / AGENSI KPKM TAB */}
      {activeTab === 'AGENCY_VIEW' && (
        <div className="space-y-6">
          {/* Header Badge */}
          <div className="p-4 rounded-2xl bg-emerald-950/60 border-2 border-emerald-500/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black text-[10px] uppercase">
                KATEGORI 2 • 12 JABATAN & AGENSI KPKM
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Laporan & Carta 3D Pengurusan Aset 12 Jabatan & Agensi KPKM
              </h3>
              <p className="text-xs text-emerald-200/80">
                Data MADA, FAMA, LKIM, DOA, DOF, KADA, MAQIS, LPP, DVS, LPNM, MARDI, IADA.
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block">Jumlah Peruntukan Agensi ST2 2026:</span>
              <strong className="text-2xl font-black text-emerald-300 font-mono">RM 76,981,214.00</strong>
            </div>
          </div>

          {/* 3D GRAPHS FOR CATEGORY 2 (JABATAN/AGENSI) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 3D Graph 1 */}
            <div className="torch-light-card p-5 space-y-2 border border-emerald-500/30">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <BarChart2 size={14} className="text-emerald-400" /> 1. Carta 3D Perbelanjaan Agensi (RM '000)
              </h4>
              <p className="text-[11px] text-slate-300">Perbandingan Belanja Q2 2026 Mengikut Agensi</p>
              <div className="pt-2">
                <ThreeDBarChart data={agency3DExpenseBar.slice(0, 6)} color="#10b981" />
              </div>
            </div>

            {/* 3D Graph 2 */}
            <div className="torch-light-card p-5 space-y-2 border border-emerald-500/30">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <PieChart size={14} className="text-emerald-400" /> 2. Carta 3D Pegangan Aset Alih Agensi
              </h4>
              <p className="text-[11px] text-slate-300">Pengagihan Unit Aset Alih 7 Agensi Utama</p>
              <div className="pt-2">
                <ThreeDPieChart data={agency3DPieAssets} colors={['#10b981', '#06b6d4', '#3b82f6', '#84cc16', '#f59e0b', '#eab308', '#a855f7']} />
              </div>
            </div>

            {/* 3D Graph 3 */}
            <div className="torch-light-card p-5 space-y-2 border border-emerald-500/30">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-400" /> 3. Carta 3D Trend Belanja 12 Agensi (RM Juta)
              </h4>
              <p className="text-[11px] text-slate-300">Perbandingan 3 Suku Tahun (ST4 2025, ST1 2026, ST2 2026)</p>
              <div className="pt-2">
                <ThreeDLineChart data={agency3DQuarterlyTrend} color="#06b6d4" />
              </div>
            </div>
          </div>

          {/* Detailed Data Table for Category 2 */}
          <div className="torch-light-card p-6 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Landmark size={18} className="text-emerald-400" />
              Jadual Pecahan Peruntukan 12 Jabatan & Agensi KPKM Malaysia
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-emerald-800/60 text-emerald-400 uppercase text-[10px] tracking-wider bg-emerald-950/40">
                    <th className="p-3">Bil</th>
                    <th className="p-3">Jabatan / Agensi</th>
                    <th className="p-3">Fokus Utama</th>
                    <th className="p-3 text-right">Peruntukan (RM)</th>
                    <th className="p-3 text-right">Perbelanjaan (RM)</th>
                    <th className="p-3 text-right">Baki (RM)</th>
                    <th className="p-3 text-center">Prestasi Belanja (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/30 text-slate-200">
                  {filteredAgencies.map((ag) => (
                    <tr key={ag.code} className="hover:bg-emerald-900/20 transition-all">
                      <td className="p-3 text-slate-400">{ag.bil}</td>
                      <td className="p-3 font-bold text-white">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[11px] mr-2">
                          {ag.code}
                        </span>
                        {ag.fullTitle}
                      </td>
                      <td className="p-3 text-slate-300 text-[11px]">{ag.primaryFocus}</td>
                      <td className="p-3 text-right font-mono">RM {ag.allocation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400">RM {ag.expense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-right font-mono text-amber-300">RM {ag.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-900/80 text-emerald-300 font-black text-[11px]">
                          {ag.percentageSpent.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-emerald-500/50 bg-emerald-950/80 font-black text-white text-xs">
                  <tr>
                    <td colSpan={3} className="p-3 uppercase text-emerald-300 tracking-wider">JUMLAH KESELURUHAN 12 AGENSI KPKM</td>
                    <td className="p-3 text-right font-mono text-emerald-300">RM {agencyAllocation.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-right font-mono text-emerald-400">RM {agencyExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-right font-mono text-amber-300">RM {agencyBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                    <td className="p-3 text-center font-extrabold text-emerald-300">{agencyPct}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* BIOLOGICAL ASSETS TAB */}
      {activeTab === 'BIOLOGICAL' && (
        <div className="space-y-6">
          <div className="torch-light-card p-6">
            <h3 className="text-lg font-bold text-amber-300 mb-1 flex items-center gap-2">
              <Trees className="size-5 text-amber-400" />
              Laporan Pengurusan Aset Biologi (Haiwan, Tumbuhan, Ikan)
            </h3>
            <p className="text-xs text-slate-300 mb-6">
              Ringkasan pendaftaran, kos penjagaan/rawatan, dan hasil jualan aset biologi KPKM Suku Tahun Kedua 2026 (Lampiran A8 - A10)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Animals */}
              <div className="p-5 rounded-2xl bg-[#091f14] border border-amber-500/30 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">1. ASET BIOLOGI HAIWAN</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">DVS / DOF / LPP</span>
                </div>
                <h4 className="text-2xl font-black text-white">RM 12,189,336.15</h4>
                <p className="text-xs text-slate-300">Jumlah Kad Pendaftaran: <strong>6,965 Kad</strong></p>
                <div className="space-y-1.5 pt-2 border-t border-amber-900/40 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kos Penjagaan Q2:</span>
                    <span className="font-mono text-white">RM 1,397,131 (25.3k unit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hasil Jualan Q2:</span>
                    <span className="font-mono text-emerald-400">RM 591,347 (1,682 unit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pemeriksaan Sihat:</span>
                    <span className="font-mono text-teal-300">812 unit sihat</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Plants */}
              <div className="p-5 rounded-2xl bg-[#091f14] border border-emerald-500/30 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">2. ASET BIOLOGI TUMBUHAN</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">DOA / MADA / KADA</span>
                </div>
                <h4 className="text-2xl font-black text-white">RM 5,482,824.26</h4>
                <p className="text-xs text-slate-300">Jumlah Kad Pendaftaran: <strong>22,760 Kad</strong></p>
                <div className="space-y-1.5 pt-2 border-t border-emerald-900/40 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kos Penjagaan Q2:</span>
                    <span className="font-mono text-white">RM 444,076.97 (122.8k unit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hasil Jualan Q2:</span>
                    <span className="font-mono text-emerald-400">RM 1,477,892.16 (28.5k unit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Diperiksa Sihat:</span>
                    <span className="font-mono text-teal-300">62,811 pokok (99.28%)</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Fish */}
              <div className="p-5 rounded-2xl bg-[#091f14] border border-teal-500/30 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wide">3. ASET BIOLOGI IKAN</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">DOF / LKIM</span>
                </div>
                <h4 className="text-2xl font-black text-white">RM 1,618,138.08</h4>
                <p className="text-xs text-slate-300">Jumlah Kad Pendaftaran: <strong>559 Kad</strong></p>
                <div className="space-y-1.5 pt-2 border-t border-teal-900/40 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Kos Penjagaan Q2:</span>
                    <span className="font-mono text-white">RM 150,940.50 (18.9k unit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hasil Jualan Q2:</span>
                    <span className="font-mono text-emerald-400">RM 0.00 (Ternakan Baka)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pemeriksaan Sihat:</span>
                    <span className="font-mono text-teal-300">8,083 ternakan sihat</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnimalMortalityTracker />

          {/* New Highlight Section: Perbandingan Hasil Jualan vs Perbelanjaan Mengurus Aset Biologi */}
          <div className="torch-light-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-900/40 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-extrabold text-[10px] uppercase tracking-wider">
                  ANALISIS PRESTASI ASET BIOLOGI (2025 - 2026)
                </span>
                <h3 className="text-lg font-bold text-emerald-300 mt-1 flex items-center gap-2">
                  <Sprout size={18} className="text-emerald-400" />
                  Perbandingan Hasil Jualan vs Perbelanjaan Mengurus Aset Biologi (RM)
                </h3>
                <p className="text-xs text-slate-300">
                  Visualisasi perbandingan pendapatan jualan ternakan/tanaman/perikanan berbanding kos pemeliharaan & penyelenggaraan.
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Jumlah Hasil Jualan Biologi Q2 2026:</span>
                <strong className="text-xl font-black text-emerald-400 font-mono">RM 26,450,000.00</strong>
              </div>
            </div>

            {/* Recharts Bar Chart comparing Revenue vs Expenditure */}
            <div className="w-full h-[360px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BIOLOGICAL_COMPARISON_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 185, 129, 0.15)" />
                  <XAxis dataKey="category" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tickFormatter={(val) => `RM ${(val / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#091712', borderColor: '#10b981', borderRadius: '12px', color: '#fff' }}
                    formatter={(val: any) => [`RM ${Number(val).toLocaleString('en-US')}`, '']}
                  />
                  <Legend />
                  <Bar name="Perbelanjaan Mengurus/Senggara (RM)" dataKey="expenditure" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={22} />
                  <Bar name="Hasil Jualan & Pulangan (RM)" dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* INTANGIBLE ASSETS & INTELLECTUAL PROPERTY TAB */}
      {activeTab === 'INTANGIBLE' && (
        <div className="space-y-6">
          {/* Top Banner for Intangible Assets */}
          <div className="torch-light-card p-6 border-2 border-amber-400/40 relative overflow-hidden">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 text-xs font-black uppercase flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-amber-400" /> ASET TAK KETARA & HARTA INTELEK (IP)
                </span>
                <h3 className="text-2xl font-black text-white mt-2">
                  Laporan Harta Intelek Didaftarkan vs Kutipan Royalti & Jualan
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Pemantauan harta intelek KPKM merangkumi Paten, Hak Cipta Varieti Tanaman (PVP), Hak Cipta Perisian ICT (iGFMAS/e-Aset), Tanda Dagangan, dan Standard SOP Penyelidikan.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 bg-[#020e08] p-4 rounded-xl border border-amber-500/30">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Jumlah Harta Intelek:</span>
                  <strong className="text-2xl font-black text-amber-300 font-mono">338 IP</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Hasil Royalti & Jualan:</span>
                  <strong className="text-2xl font-black text-emerald-400 font-mono">RM 13.67M</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Bar Chart Comparison: IP Registered vs Revenue/Royalty */}
          <div className="torch-light-card p-6 space-y-4 border border-amber-500/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-amber-900/40 pb-4">
              <div>
                <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
                  <Award size={18} className="text-amber-400" />
                  Perbandingan Jumlah Harta Intelek Didaftarkan vs Kutipan Royalti Mengikut Agensi
                </h3>
                <p className="text-xs text-slate-300">
                  Kuantiti Pendaftaran MyIPO / PVP berbanding pulangan kewangan royalti dan jualan lesen hak cipta.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 text-xs font-bold font-mono">
                Peringkat Kebangsaan 2025-2026
              </span>
            </div>

            <div className="w-full h-[380px] pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={INTANGIBLE_IP_DATA} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(245, 158, 11, 0.15)" />
                  <XAxis dataKey="agency" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" tickFormatter={(val) => `${val} IP`} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10b981" tickFormatter={(val) => `RM ${(val / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#091712', borderColor: '#f59e0b', borderRadius: '12px', color: '#fff' }}
                  />
                  <Legend />
                  <Bar yAxisId="left" name="Harta Intelek Didaftarkan (Unit IP)" dataKey="ipCount" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={22} />
                  <Bar yAxisId="right" name="Hasil Jualan & Royalti (RM)" dataKey="revenueRoyalty" fill="#10b981" radius={[4, 4, 0, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Intangible Asset Data Table */}
          <div className="torch-light-card p-6 space-y-4">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-amber-400" />
              Jadual Perincian Aset Tak Ketara & Harta Intelek KPKM
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-amber-800/60 text-amber-300 uppercase text-[10px] tracking-wider bg-amber-950/40">
                    <th className="p-3">Agensi / Bahagian</th>
                    <th className="p-3">Status Pendaftaran MyIPO / PVP</th>
                    <th className="p-3">Harta Intelek Utama / Hak Cipta</th>
                    <th className="p-3 text-center">Bil. IP Didaftarkan</th>
                    <th className="p-3 text-right">Hasil Royalti & Jualan (RM)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/30 text-slate-200">
                  {INTANGIBLE_IP_DATA.map((ip) => (
                    <tr key={ip.agency} className="hover:bg-amber-900/20 transition-all">
                      <td className="p-3 font-bold text-white">
                        <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-black text-[11px] mr-2">
                          {ip.agency}
                        </span>
                        {ip.fullAgency}
                      </td>
                      <td className="p-3 text-teal-300 font-medium">{ip.status}</td>
                      <td className="p-3 text-slate-300 text-[11px] max-w-xs">{ip.topIp}</td>
                      <td className="p-3 text-center font-mono font-bold text-amber-300 text-sm">{ip.ipCount} Unit</td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-400 text-sm">
                        RM {ip.revenueRoyalty.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="border-t-2 border-amber-500/50 bg-amber-950/80 font-black text-white text-xs">
                  <tr>
                    <td colSpan={3} className="p-3 uppercase text-amber-300 tracking-wider">JUMLAH KESELURUHAN HARTA INTELEK KPKM</td>
                    <td className="p-3 text-center font-mono text-amber-300 text-sm">338 Unit IP</td>
                    <td className="p-3 text-right font-mono text-emerald-300 text-sm">RM 13,670,000.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* STRATEGIC PITCH & PRESENTATION MODE */}
      {activeTab === 'STRATEGIC_PITCH' && (
        <div className="space-y-6">
          {/* Main Strategic Banner */}
          <div className="torch-light-card p-6 md:p-8 border-2 border-amber-400/50 bg-gradient-to-br from-[#041a10] via-[#08291b] to-[#0d1626] relative overflow-hidden">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/50 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400" /> MOD PEMBENTANGAN STRATEGIK KEBANGSAAN
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 text-xs font-bold">
                    Standard Pengurusan Aset KPKM 2026-2030
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  Pelan Transformasi & Analisis Aset KPKM: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-300">Rangka Kerja Dashboard Terpilih</span>
                </h2>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed">
                  Dashboard ini dirancang secara saintifik dan berstruktur bagi membantu YBhg. KSU dan Ahli Mesyuarat JKPAK Kementerian membuat keputusan berasaskan data real-time iGFMAS. Berikut adalah nilai strategik, panduan data dan inisiatif penambahbaikan yang disediakan.
                </p>
              </div>

              {/* Quick Stat Pill */}
              <div className="bg-[#020e08]/90 p-5 rounded-2xl border border-amber-500/40 space-y-2 min-w-[240px] text-center shadow-xl">
                <span className="text-[10px] text-amber-300 uppercase font-black tracking-wider block">Potensi Penjimatan Tahunan</span>
                <strong className="text-3xl font-black text-emerald-400 font-mono block">RM 14.75M</strong>
                <span className="text-[10px] text-slate-300 block">Melalui Perkongsian Aset Inter-Agensi</span>
              </div>
            </div>
          </div>

          {/* 4 Pillars of Success */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="torch-light-card p-5 border border-emerald-500/30 space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 w-fit">
                <Layers size={20} />
              </div>
              <h4 className="text-sm font-bold text-white">1. Pengasingan 2 Kategori Unik</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Menyelesaikan kekeliruan data dengan mengasingkan <strong>Kategori 1 (Ibu Pejabat KPKM)</strong> dan <strong>Kategori 2 (12 Jabatan & Agensi)</strong> sambil menyediakan paparan <strong>Gabungan Keseluruhan</strong>.
              </p>
            </div>

            <div className="torch-light-card p-5 border border-amber-500/30 space-y-2">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 w-fit">
                <Sprout size={20} />
              </div>
              <h4 className="text-sm font-bold text-white">2. Analisis Aset Biologi (Hasil vs Belanja)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pertama seumpamanya yang menjejak pulangan hasil jualan ternakan & tanaman (RM 26.45M) berbanding kos pengurusan aset biologi.
              </p>
            </div>

            <div className="torch-light-card p-5 border border-teal-500/30 space-y-2">
              <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 w-fit">
                <Lightbulb size={20} />
              </div>
              <h4 className="text-sm font-bold text-white">3. Monetisasi Harta Intelek (IP)</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pemantauan 338 Hak Cipta Varieti Tanaman & Paten R&D MARDI / Jabatan bagi meningkatkan kutipan royalti kementerian (RM 13.67M).
              </p>
            </div>

            <div className="torch-light-card p-5 border border-indigo-500/30 space-y-2">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 w-fit">
                <Bot size={20} />
              </div>
              <h4 className="text-sm font-bold text-white">4. AI Gemini Decision Engine</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Integrasi kecerdasan buatan termaju untuk menterjemah data perolehan iGFMAS kepada syor draf kertas pertimbangan JKPAK.
              </p>
            </div>
          </div>

          {/* iGFMAS Extraction Field Guide */}
          <div className="torch-light-card p-6 space-y-4 border border-emerald-500/40">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-emerald-900/40 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider">
                  PANDUAN PEMBEKALAN DATA UNTUK PEGAWAI ASET KEMENTERIAN
                </span>
                <h3 className="text-lg font-bold text-emerald-300 mt-1 flex items-center gap-2">
                  <FileSpreadsheet size={18} className="text-emerald-400" />
                  Senarai Medan Data iGFMAS Utama Yang Perlu Diekstrak
                </h3>
                <p className="text-xs text-slate-300">
                  Untuk mengemaskini dashboard ini secara real-time, pegawai aset boleh memuat turun laporan CSV dari Sub-Modul Aset iGFMAS berdasarkan 8 medan standard berikut:
                </p>
              </div>
              <button
                onClick={() => alert("Muat turun Templat CSV iGFMAS KPKM berjaya! Gunakan fail ini untuk memuat naik data terkini.")}
                className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-extrabold text-xs hover:bg-emerald-400 transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <FileSpreadsheet size={14} /> Muat Turun Templat CSV iGFMAS
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">1. Kod_Agensi / Jabatan</strong>
                <span className="text-slate-300 block text-[11px]">Pengenalan pusat tanggungjawab (cth: HQ, DOA, DVS, MARDI, LPNM).</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">2. Kategori_Aset_Pekeliling</strong>
                <span className="text-slate-300 block text-[11px]">Aset Alih, Aset Tak Alih, Aset Biologi, atau Aset Tak Ketara.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">3. Kos_Perolehan_Asal (RM)</strong>
                <span className="text-slate-300 block text-[11px]">Nilai pembelian asal mengikut pesanan tempatan (LO) iGFMAS.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">4. Nilai_Buku_Semasa (RM)</strong>
                <span className="text-slate-300 block text-[11px]">Nilai terkini selepas mengambil kira susut nilai tahunan.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">5. Kos_Senggara_Terkumpul</strong>
                <span className="text-slate-300 block text-[11px]">Jumlah perbelanjaan penyelenggaraan berkala dan pembaikan.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">6. Hasil_Jualan_Biologi / IP</strong>
                <span className="text-slate-300 block text-[11px]">Kutipan hasil jualan ternakan, benih, atau royalti IP.</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">7. Indeks_Keadaan_Fizikal</strong>
                <span className="text-slate-300 block text-[11px]">Skor fizikal aset (1: Sangat Baik - 5: Rosak Teruk/Lupus).</span>
              </div>
              <div className="p-3 rounded-xl bg-[#03150d] border border-emerald-900/60 space-y-1">
                <strong className="text-emerald-300 block font-mono">8. Kadar_Guna_Sama_%</strong>
                <span className="text-slate-300 block text-[11px]">Peratusan kecekapan penggunaan jentera/makmal inter-agensi.</span>
              </div>
            </div>
          </div>

          {/* Strategic Initiatives Roadmap for Presentation */}
          <div className="torch-light-card p-6 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-emerald-900/40 pb-3">
              <Award size={18} className="text-amber-400" />
              Syor Inisiatif Strategik Pengurusan Aset KPKM 2026-2028 (Kertas Cadangan JKPAK)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#031a10] border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">INISIATIF 1</span>
                  <span className="text-emerald-400 font-bold font-mono">Penjimatan: RM 12.4M / tahun</span>
                </div>
                <h4 className="text-sm font-bold text-white">Hub Perkongsian Logistik & Aset Inter-Agensi (KPKM ShareHub)</h4>
                <p className="text-slate-300 leading-relaxed">
                  Mewujudkan platform perkongsian jentera berat, dron pemetaan pertanian, dan lori penyejuk antara DOA, DVS dan FAMA bagi mengelakkan pembelian semula (duplikasi perolehan).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#031a10] border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">INISIATIF 2</span>
                  <span className="text-emerald-400 font-bold font-mono">Unjuran Hasil: +35% Pulangan</span>
                </div>
                <h4 className="text-sm font-bold text-white">Pengoptimuman Monetisasi Aset Biologi & Benih Elit</h4>
                <p className="text-slate-300 leading-relaxed">
                  Meningkatkan hasil jualan baka induk ternakan DVS dan benih berakreditasi DOA/MARDI melalui saluran pengedaran digital e-Agrobazaar FAMA.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#031a10] border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">INISIATIF 3</span>
                  <span className="text-emerald-400 font-bold font-mono">Sasaran Royalti: RM 25.0M</span>
                </div>
                <h4 className="text-sm font-bold text-white">Pemberdayaan Dana Royalti Harta Intelek R&D Pertanian</h4>
                <p className="text-slate-300 leading-relaxed">
                  Pendaftaran aktif PVP dan paten varieti padi/makanan MARDI di MyIPO, disusuli lesen komersial kepada pengusaha industri asas tani tempatan.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#031a10] border border-emerald-500/30 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">INISIATIF 4</span>
                  <span className="text-emerald-400 font-bold font-mono">Masa Pelupusan: 90 Hari ➔ 14 Hari</span>
                </div>
                <h4 className="text-sm font-bold text-white">Sistem E-Lelongan Pelupusan Berkelompok Digital</h4>
                <p className="text-slate-300 leading-relaxed">
                  Menggantikan proses pelupusan manual kepada e-lelongan telus berkelompok bagi merealisasikan nilai sisa (scrap value) dengan lebih pantas.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI REPORT ANALYZER */}
      {activeTab === 'AI_ANALYZER' && (
        <AiReportAnalyzer />
      )}
    </div>
  );
}
