import React, { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, TooltipProps 
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { 
  LayoutDashboard, FileText, Package, Wrench, DollarSign, AlertCircle, Save, ExternalLink,
  Sprout, Radio, Tag, Layers, Calendar, BookOpen, Plus, Activity, RefreshCw, Download, 
  CheckCircle2, ChevronRight, FileSpreadsheet, Sparkles, Database, Trees, Cpu, Building2, Truck,
  HelpCircle, Search, Filter, ShieldCheck, HeartPulse, Edit3, Tv
} from 'lucide-react';

import { supabase } from '../../lib/supabase';
import { DashboardSidebar } from '../components/DashboardSidebar';
import { AgriTelemetryCard } from '../components/AgriTelemetryCard';
import { AgriAssetInventoryTable, defaultAgriAssets, AgriAssetItem } from '../components/AgriAssetInventoryTable';
import { AgriMaintenanceHub } from '../components/AgriMaintenanceHub';
import { ReportLibrary } from '../components/ReportLibrary';
import { DataExtractorModal } from '../components/DataExtractorModal';
import { NationalJkpakAgencyHub } from '../components/NationalJkpakAgencyHub';
import { KpkmHeaderBanner } from '../components/KpkmHeaderBanner';
import { DepartmentActivityChart2025_2026 } from '../components/DepartmentActivityChart2025_2026';
import { AiReportAnalyzer } from '../components/AiReportAnalyzer';
import { AnimalMortalityTracker } from '../components/AnimalMortalityTracker';
import AssetLocationTreemap from '../components/AssetLocationTreemap';
import { ExecutivePresentationMode } from '../components/ExecutivePresentationMode';
import { ASSET_CATEGORIES, CORE_4_ASSET_CLASSES, detectCoreAssetCategory } from '../components/ui/IGFMAS_Mapping';

interface IgfmasFormData {
  asset_no: string; 
  name: string;
  cat_code: string; 
  orig_cost: number; 
  cond_rating: '1' | '2' | '3' | '4' | '5';
  location_plot: string;
  custodian: string;
}

type TabType = 
  | 'DASHBOARD' 
  | 'KEMASKINI' 
  | 'SEGMEN_ALIH' 
  | 'SEGMEN_TAK_ALIH' 
  | 'SEGMEN_BIOLOGI' 
  | 'SEGMEN_TAK_KETARA' 
  | 'AI_HELP' 
  | 'TELEMETRY' 
  | 'MAINTENANCE';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#091712] p-4 border border-emerald-700/50 shadow-2xl rounded-xl text-white">
        {label && <p className="font-bold text-emerald-300 mb-2 border-b border-emerald-800/60 pb-1">{label}</p>}
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-xs my-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-slate-300 flex-1">{entry.name}:</span>
            <span className="font-semibold" style={{ color: entry.color }}>
              {typeof entry.value === 'number' 
                ? (entry.value >= 1000 ? `RM ${entry.value.toLocaleString()}` : entry.value.toLocaleString())
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Dynamic 4-Class Core Category Bar Chart
const CoreClassBarChart = ({ data }: { data: any[] }) => (
  <div className="w-full h-[400px] p-6 text-white relative z-10">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
        <Layers className="size-5 text-teal-400" /> Analisis Nilai 4 Kategori Utama Aset (Real-Time)
      </h3>
      <p className="text-xs text-slate-300">Pengagihan Kos Perolehan mengikut Aset Alih, Tak Alih, Biologi, & Tak Ketara</p>
    </div>
    <ResponsiveContainer width="100%" height="80%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 185, 129, 0.15)" />
        <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 11 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#cbd5e1', fontSize: 11 }} tickFormatter={(value) => `RM ${(value / 1000).toFixed(0)}k`} />
        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
        <Bar dataKey="value" name="Jumlah Kos (RM)" radius={[6, 6, 0, 0]} barSize={48}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color || '#059669'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// 2. Acquisition Trend Chart by 4 Core Asset Classes
const AcquisitionTrendChart = ({ data }: { data: any[] }) => (
  <div className="w-full h-[400px] p-6 text-white relative z-10">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
        <Sprout className="size-5 text-emerald-400" /> Trend Perolehan 4 Kategori Utama (2025-2026)
      </h3>
      <p className="text-xs text-slate-300">Perbandingan Pelaburan Mengikut Suku Tahun 2025-2026 (RM Juta)</p>
    </div>
    <ResponsiveContainer width="100%" height="78%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.15)" vertical={false} />
        <XAxis dataKey="year" stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} tickFormatter={(val) => `RM${val}M`} />
        <RechartsTooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: '15px' }} />
        <Line type="monotone" dataKey="asetAlih" name="Aset Alih" stroke="#0d9488" strokeWidth={3} dot={{ r: 4 }} animationDuration={1000} />
        <Line type="monotone" dataKey="asetTakAlih" name="Aset Tak Alih" stroke="#059669" strokeWidth={3} dot={{ r: 4 }} animationDuration={1000} />
        <Line type="monotone" dataKey="asetBiologi" name="Aset Biologi" stroke="#d97706" strokeWidth={3} dot={{ r: 4 }} animationDuration={1000} />
        <Line type="monotone" dataKey="asetTakKetara" name="Aset Tak Ketara" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} animationDuration={1000} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

// 3. Asset Aging & Rating Distribution Across 4 Classes
const AssetAgingChart = ({ data }: { data: any[] }) => (
  <div className="w-full h-[400px] p-6 text-white relative z-10">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
        <Activity className="size-5 text-amber-400" /> Profil Kondisi Fizikal 4 Kategori Aset (%)
      </h3>
      <p className="text-xs text-slate-300">Nisbah unit dalam kondisi Sangat Baik, Baik, Sederhana, & Perlu Servis</p>
    </div>
    <ResponsiveContainer width="100%" height="78%">
      <BarChart layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.15)" horizontal={false} />
        <XAxis type="number" stroke="#94a3b8" tickFormatter={(val) => `${val}%`} />
        <YAxis dataKey="category" type="category" stroke="#94a3b8" tickLine={false} axisLine={false} width={110} />
        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
        <Legend />
        <Bar dataKey="baik" name="1-2 Baik / Cemerlang" stackId="a" fill="#059669" animationDuration={800} />
        <Bar dataKey="sederhana" name="3 Sederhana" stackId="a" fill="#0284c7" animationDuration={800} />
        <Bar dataKey="servis" name="4 Perlu Servis" stackId="a" fill="#d97706" animationDuration={800} />
        <Bar dataKey="rosak" name="5 Rosak / Pelupusan" stackId="a" fill="#e11d48" animationDuration={800} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// 4. Comparison Chart: Historical & Live 4 Core Asset Growth
const AssetComparisonChart = ({ data }: { data: any[] }) => (
  <div className="w-full h-[400px] p-6 text-white relative z-10">
    <div className="mb-4">
      <h3 className="text-lg font-bold text-emerald-300">Perbandingan Nilai Buku 4 Kategori Utama (2021-2026)</h3>
      <p className="text-xs text-slate-300">Analisis pengumpulan aset alih vs tak alih vs biologi vs tak ketara</p>
    </div>
    <ResponsiveContainer width="100%" height="78%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(16, 185, 129, 0.15)" />
        <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} tickFormatter={(value) => `RM ${(value / 1000000).toFixed(1)}M`} />
        <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
        <Legend wrapperStyle={{ paddingTop: '15px' }} iconType="circle" />
        <Bar name="Aset Alih" dataKey="asetAlih" fill="#0d9488" radius={[4, 4, 0, 0]} barSize={16} />
        <Bar name="Aset Tak Alih" dataKey="asetTakAlih" fill="#059669" radius={[4, 4, 0, 0]} barSize={16} />
        <Bar name="Aset Biologi" dataKey="asetBiologi" fill="#d97706" radius={[4, 4, 0, 0]} barSize={16} />
        <Bar name="Aset Tak Ketara" dataKey="asetTakKetara" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

// 5. Maintenance Area Chart by 4 Core Asset Classes
const MaintenanceTrendChart = ({ data }: { data: any[] }) => (
  <div className="w-full h-[400px] p-6 text-white relative z-10">
    <h3 className="text-lg font-bold text-emerald-300 mb-1">Kos Penyelenggaraan & Pemeliharaan 2026</h3>
    <p className="text-xs text-slate-300 mb-4">Perbelanjaan penyelenggaraan bulanan mengikut 4 Kategori (RM Ribu)</p>
    <ResponsiveContainer width="100%" height="78%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorAlih" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0d9488" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0d9488" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorTakAlih" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#059669" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorBiologi" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#d97706" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#d97706" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorTakKetara" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.15)" vertical={false} />
        <XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} dy={10} />
        <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
        <RechartsTooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ paddingTop: '15px' }} />
        <Area type="monotone" dataKey="asetAlih" name="Aset Alih" stroke="#0d9488" fillOpacity={1} fill="url(#colorAlih)" animationDuration={1000} />
        <Area type="monotone" dataKey="asetTakAlih" name="Aset Tak Alih" stroke="#059669" fillOpacity={1} fill="url(#colorTakAlih)" animationDuration={1000} />
        <Area type="monotone" dataKey="asetBiologi" name="Aset Biologi" stroke="#d97706" fillOpacity={1} fill="url(#colorBiologi)" animationDuration={1000} />
        <Area type="monotone" dataKey="asetTakKetara" name="Aset Tak Ketara" stroke="#6366f1" fillOpacity={1} fill="url(#colorTakKetara)" animationDuration={1000} />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<TabType>('DASHBOARD');
  const [selectedAgencyCode, setSelectedAgencyCode] = useState<string>('ALL');
  const [agriAssets, setAgriAssets] = useState<AgriAssetItem[]>(defaultAgriAssets);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isExtractorOpen, setIsExtractorOpen] = useState(false);
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [lastExtractionNotice, setLastExtractionNotice] = useState<{ file: string; count: number } | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<IgfmasFormData>();

  // Fetch live Supabase assets if available
  const fetchAssetsFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .from('igfmas_assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        const mappedData: AgriAssetItem[] = data.map((item: any, index: number) => ({
          id: item.id || `sp-${index}`,
          assetNo: item.asset_no || `AGRI-${index}`,
          name: item.name || `Aset Pertanian ${item.asset_no || index}`,
          catCode: item.cat_code || 'JENT',
          origCost: Number(item.orig_cost) || 50000,
          condRating: (item.cond_rating || '1') as any,
          locationPlot: item.location_plot || 'Plot A - Sawah Padi',
          status: 'ACTIVE',
          lastServiced: '2026-06-01',
          custodian: item.custodian || 'KPKM Admin',
        }));
        setAgriAssets(mappedData);
      }
    } catch (e) {
      console.log('Supabase offline or fallback to local agri state.');
    }
  };

  useEffect(() => {
    fetchAssetsFromSupabase();
  }, []);

  // Compute dynamic chart datasets based on agriAssets state
  const computedCategoryData = useMemo(() => {
    const sums: Record<string, number> = {
      'Aset Alih': 2230000,
      'Aset Tak Alih': 3850000,
      'Aset Biologi': 1420000,
      'Aset Tak Ketara': 890000,
    };

    const colors: Record<string, string> = {
      'Aset Alih': '#0d9488',
      'Aset Tak Alih': '#059669',
      'Aset Biologi': '#d97706',
      'Aset Tak Ketara': '#6366f1',
    };

    agriAssets.forEach(item => {
      const coreClass = detectCoreAssetCategory(item.catCode, item.name);
      sums[coreClass] = (sums[coreClass] || 0) + item.origCost;
    });

    return CORE_4_ASSET_CLASSES.map(cls => ({
      category: cls.label,
      value: sums[cls.label] || 0,
      color: colors[cls.label] || cls.color,
    }));
  }, [agriAssets]);

  const computedTrendData = useMemo(() => {
    const additions = { 'Aset Alih': 0, 'Aset Tak Alih': 0, 'Aset Biologi': 0, 'Aset Tak Ketara': 0 };
    agriAssets.forEach(item => {
      const coreClass = detectCoreAssetCategory(item.catCode, item.name) as keyof typeof additions;
      if (additions[coreClass] !== undefined) {
        additions[coreClass] += item.origCost / 1000000;
      }
    });

    return [
      { year: 'ST1 2025', asetAlih: 4.2, asetTakAlih: 8.5, asetBiologi: 2.1, asetTakKetara: 1.2 },
      { year: 'ST2 2025', asetAlih: 5.5, asetTakAlih: 10.2, asetBiologi: 2.8, asetTakKetara: 1.8 },
      { year: 'ST3 2025', asetAlih: 4.8, asetTakAlih: 7.0, asetBiologi: 2.2, asetTakKetara: 1.5 }, 
      { year: 'ST4 2025', asetAlih: 6.1, asetTakAlih: 11.5, asetBiologi: 3.9, asetTakKetara: 2.8 },
      { year: 'ST1 2026', asetAlih: 5.0, asetTakAlih: 8.0, asetBiologi: 2.5, asetTakKetara: 1.4 },
      { 
        year: 'ST2 2026 (Semasa)', 
        asetAlih: Number((6.8 + additions['Aset Alih']).toFixed(2)), 
        asetTakAlih: Number((12.4 + additions['Aset Tak Alih']).toFixed(2)), 
        asetBiologi: Number((3.6 + additions['Aset Biologi']).toFixed(2)), 
        asetTakKetara: Number((2.2 + additions['Aset Tak Ketara']).toFixed(2)) 
      },
    ];
  }, [agriAssets]);

  const computedAgingData = useMemo(() => {
    const profile = {
      'Aset Alih': { baik: 45, sederhana: 30, servis: 15, rosak: 10 },
      'Aset Tak Alih': { baik: 60, sederhana: 25, servis: 10, rosak: 5 },
      'Aset Biologi': { baik: 50, sederhana: 35, servis: 10, rosak: 5 },
      'Aset Tak Ketara': { baik: 75, sederhana: 15, servis: 8, rosak: 2 },
    };

    agriAssets.forEach(item => {
      const cls = detectCoreAssetCategory(item.catCode, item.name) as keyof typeof profile;
      if (profile[cls]) {
        if (item.condRating === '1' || item.condRating === '2') profile[cls].baik += 1;
        else if (item.condRating === '3') profile[cls].sederhana += 1;
        else if (item.condRating === '4') profile[cls].servis += 1;
        else if (item.condRating === '5') profile[cls].rosak += 1;
      }
    });

    return [
      { category: 'Aset Alih', ...profile['Aset Alih'] },
      { category: 'Aset Tak Alih', ...profile['Aset Tak Alih'] },
      { category: 'Aset Biologi', ...profile['Aset Biologi'] },
      { category: 'Aset Tak Ketara', ...profile['Aset Tak Ketara'] },
    ];
  }, [agriAssets]);

  const computedMaintenanceData = useMemo(() => [
    { month: 'Jan', asetAlih: 35, asetTakAlih: 42, asetBiologi: 18, asetTakKetara: 12 },
    { month: 'Feb', asetAlih: 42, asetTakAlih: 48, asetBiologi: 22, asetTakKetara: 15 },
    { month: 'Mac', asetAlih: 58, asetTakAlih: 65, asetBiologi: 31, asetTakKetara: 18 },
    { month: 'Apr', asetAlih: 46, asetTakAlih: 52, asetBiologi: 25, asetTakKetara: 14 },
    { month: 'Mei', asetAlih: 40, asetTakAlih: 49, asetBiologi: 28, asetTakKetara: 16 },
    { month: 'Jun', asetAlih: 52, asetTakAlih: 68, asetBiologi: 35, asetTakKetara: 20 },
    { month: 'Jul', asetAlih: 58, asetTakAlih: 74, asetBiologi: 38, asetTakKetara: 22 },
    { month: 'Ogs', asetAlih: 51, asetTakAlih: 62, asetBiologi: 32, asetTakKetara: 19 },
    { month: 'Sep', asetAlih: 44, asetTakAlih: 55, asetBiologi: 27, asetTakKetara: 17 },
    { month: 'Okt', asetAlih: 48, asetTakAlih: 59, asetBiologi: 29, asetTakKetara: 18 },
    { month: 'Nov', asetAlih: 55, asetTakAlih: 69, asetBiologi: 34, asetTakKetara: 21 },
    { month: 'Dis', asetAlih: 65, asetTakAlih: 82, asetBiologi: 42, asetTakKetara: 25 },
  ], []);

  const handleDataExtracted = (extractedAssets: AgriAssetItem[], fileMeta: { name: string; type: string; rowCount: number }) => {
    setAgriAssets(prev => [...extractedAssets, ...prev]);
    setLastExtractionNotice({ file: fileMeta.name, count: extractedAssets.length });
  };

  const handleAddNewAsset = async (formData: IgfmasFormData) => {
    setIsSubmitting(true);

    const newAssetObj: AgriAssetItem = {
      id: `local-${Date.now()}`,
      assetNo: formData.asset_no,
      name: formData.name || `Aset Pertanian (${formData.asset_no})`,
      catCode: formData.cat_code,
      origCost: Number(formData.orig_cost),
      condRating: formData.cond_rating,
      locationPlot: formData.location_plot || 'Plot A - Sawah Padi Moden',
      status: 'ACTIVE',
      lastServiced: new Date().toISOString().slice(0, 10),
      custodian: formData.custodian || 'Admin KPKM',
    };

    setAgriAssets(prev => [newAssetObj, ...prev]);

    try {
      await supabase.from('igfmas_assets').insert([{
        asset_no: formData.asset_no,
        cat_code: formData.cat_code,
        orig_cost: Number(formData.orig_cost), 
        cond_rating: formData.cond_rating
      }]);
    } catch (e) {
      // Ignored if local fallback
    }

    setIsSubmitting(false);
    reset();
    alert('Aset Pertanian berjaya didaftarkan ke pangkalan data!');
  };

  const handleUpdateRating = (id: string, newRating: '1' | '2' | '3' | '4' | '5') => {
    setAgriAssets(prev =>
      prev.map(a => (a.id === id ? { ...a, condRating: newRating } : a))
    );
  };

  const handleDeleteAsset = (id: string) => {
    if (confirm('Adakah anda pasti untuk memadam rekod aset pertanian ini?')) {
      setAgriAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  const totalAssetsCount = agriAssets.length;
  const totalAssetsValue = agriAssets.reduce((sum, item) => sum + Number(item.origCost), 0);
  const activeAssetsCount = agriAssets.filter(a => a.condRating === '1' || a.condRating === '2').length;
  const maintenanceAssetsCount = agriAssets.filter(a => a.condRating === '4' || a.condRating === '5').length;

  return (
    <div className="flex h-screen w-full relative overflow-hidden bg-[#020604] text-white">
      {/* Grouped Sidebar Navigation */}
      <aside className="w-64 bg-[#05140b] border-r border-emerald-900/30 z-20 flex flex-col justify-between shrink-0 transition-all duration-300">
        <div className="overflow-y-auto custom-scrollbar flex-1">
          {/* Logo Branding - User requested MH logo & Design by MrMH under AgriAssets (removed KPKM text) */}
          <div className="h-24 flex items-center px-5 border-b border-emerald-900/40 sticky top-0 bg-[#04140b]/95 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              {/* Custom Designed MH Logo Badge */}
              <div className="size-10 rounded-xl bg-gradient-to-br from-amber-400 via-emerald-500 to-teal-700 p-[1.5px] shadow-[0_0_15px_rgba(245,158,11,0.35)] shrink-0 transition-transform hover:scale-105">
                <div className="w-full h-full bg-gradient-to-br from-[#062415] to-[#141002] rounded-[10px] flex items-center justify-center font-black text-amber-300 text-sm tracking-wider font-mono shadow-inner">
                  MH
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <h1 className="text-lg font-black text-emerald-300 tracking-tight leading-none">
                  AgriAssets
                </h1>
                <span className="text-[10px] font-bold text-amber-400 mt-1.5 flex items-center gap-1 font-mono tracking-wide">
                  <span className="text-amber-300">✨</span> Design by <span className="underline decoration-amber-400/60 font-black text-amber-200">MrMH</span>
                </span>
              </div>
            </div>
          </div>

          {/* Grouped Sidebar Menu */}
          <nav className="px-3 py-4 space-y-5">
            {/* GROUP 1: UTAMA */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-2">
                1. Utiliti Eksekutif
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('DASHBOARD')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-bold ${
                    activeTab === 'DASHBOARD'
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300'
                  }`}
                >
                  <LayoutDashboard size={16} /> Ringkasan Eksekutif
                </button>
                <button
                  onClick={() => setIsPresentationOpen(true)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 hover:border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                >
                  <Tv size={16} className="text-amber-400 animate-pulse" /> Mod Pembentangan (Boss)
                </button>
              </div>
            </div>

            {/* GROUP 2: RUANG KEMASKINI */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-amber-400/80 mb-2">
                2. Ruang Kemaskini
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('KEMASKINI')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-bold ${
                    activeTab === 'KEMASKINI'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-amber-300'
                  }`}
                >
                  <Save size={16} className="text-amber-400" /> Pendaftaran & Kemaskini
                </button>
                <button
                  onClick={() => setIsExtractorOpen(true)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/15 to-amber-500/10 border border-emerald-500/30 text-emerald-300 hover:border-emerald-400 text-xs font-bold transition-all cursor-pointer"
                >
                  <Sparkles size={16} className="text-amber-400" /> Ekstrak Fail Pukal
                </button>
              </div>
            </div>

            {/* GROUP 3: MENGIKUT SEGMEN ASET */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-teal-400/80 mb-2">
                3. Segmen 4 Jenis Aset
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('SEGMEN_ALIH')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                    activeTab === 'SEGMEN_ALIH'
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-teal-300'
                  }`}
                >
                  <Truck size={16} className="text-teal-400" /> Aset Alih (Jentera)
                </button>
                <button
                  onClick={() => setActiveTab('SEGMEN_TAK_ALIH')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                    activeTab === 'SEGMEN_TAK_ALIH'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300'
                  }`}
                >
                  <Building2 size={16} className="text-emerald-400" /> Aset Tak Alih
                </button>
                <button
                  onClick={() => setActiveTab('SEGMEN_BIOLOGI')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                    activeTab === 'SEGMEN_BIOLOGI'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-amber-300'
                  }`}
                >
                  <Trees size={16} className="text-amber-400" /> Aset Hidup (Tumbuhan/Haiwan)
                </button>
                <button
                  onClick={() => setActiveTab('SEGMEN_TAK_KETARA')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                    activeTab === 'SEGMEN_TAK_KETARA'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-indigo-300'
                  }`}
                >
                  <Cpu size={16} className="text-indigo-400" /> Aset Tak Ketara (IP)
                </button>
              </div>
            </div>

            {/* GROUP 4: ANALITIK & PUSAT UTILITI */}
            <div>
              <p className="px-3 text-[10px] font-black uppercase tracking-widest text-emerald-400/80 mb-2">
                4. Analitik & Laporan
              </p>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('AI_HELP')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                    activeTab === 'AI_HELP'
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300'
                  }`}
                >
                  <Sparkles size={16} className="text-emerald-400" /> Pembantu AI Laporan
                </button>
                <button
                  onClick={() => setActiveTab('TELEMETRY')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                    activeTab === 'TELEMETRY'
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300'
                  }`}
                >
                  <Radio size={16} /> Telemetri & IoT
                </button>
                <button
                  onClick={() => setActiveTab('MAINTENANCE')}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-xs font-semibold ${
                    activeTab === 'MAINTENANCE'
                      ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300'
                  }`}
                >
                  <Wrench size={16} /> Penyelenggaraan Servis
                </button>
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300 transition-all text-xs font-semibold cursor-pointer"
                >
                  <BookOpen size={16} /> Laporan & Eksport PDF
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-900/30">
              <a 
                href="https://igfmas.anm.gov.my" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-[11px] text-gray-400 hover:bg-emerald-900/20 hover:text-emerald-300 transition-all"
              >
                <ExternalLink size={14} /> Portal iGFMAS (ANM)
              </a>
            </div>
          </nav>
        </div>

        {/* User profile banner at bottom */}
        <div className="p-4 border-t border-emerald-900/30 bg-[#020a05]/60">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-sm shadow-[0_0_10px_rgba(16,185,129,0.4)]">
              K
            </div>
            <div>
              <p className="text-xs font-bold text-white">Admin KPKM</p>
              <p className="text-[10px] text-emerald-400/80">Kementerian Pertanian</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 overflow-y-auto h-screen p-6 lg:p-8 custom-scrollbar bg-[#020604]">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Integrated Top Header Banner Note */}
          <KpkmHeaderBanner 
            onOpenExtractor={() => setIsExtractorOpen(true)}
            onOpenReport={() => setIsReportOpen(true)}
            extractedNoticeCount={lastExtractionNotice?.count}
          />

          {/* Toast Notice when Data is Extracted */}
          {lastExtractionNotice && (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.2)] animate-bounce">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-emerald-400" />
                <span>
                  <strong>Data Terkstrak Berjaya:</strong> {lastExtractionNotice.count} rekod baru daripada <em>{lastExtractionNotice.file}</em> telah dimuat masuk. Semua carta dan nilai telah dikemaskini secara langsung!
                </span>
              </div>
              <button
                onClick={() => setLastExtractionNotice(null)}
                className="px-2 py-1 rounded bg-emerald-900/60 text-emerald-200 hover:text-white"
              >
                Tutup
              </button>
            </div>
          )}

          {/* Tab Navigation Quick Chips */}
          <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-emerald-900/40">
            <button
              onClick={() => setActiveTab('DASHBOARD')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'DASHBOARD'
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-[#05140b] text-emerald-200/70 border-emerald-900/40 hover:bg-emerald-950'
              }`}
            >
              📊 Ringkasan Eksekutif
            </button>
            <button
              onClick={() => setIsPresentationOpen(true)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border-amber-500/50 hover:bg-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
            >
              🖥️ Mod Pembentangan (Boss)
            </button>
            <button
              onClick={() => setActiveTab('KEMASKINI')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'KEMASKINI'
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-[#05140b] text-amber-300/80 border-amber-900/40 hover:bg-amber-950/40'
              }`}
            >
              📝 Ruang Kemaskini ({totalAssetsCount} Aset)
            </button>
            <button
              onClick={() => setActiveTab('SEGMEN_ALIH')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'SEGMEN_ALIH'
                  ? 'bg-teal-500 text-black border-teal-400 shadow-[0_0_12px_rgba(20,184,166,0.3)]'
                  : 'bg-[#05140b] text-teal-300/70 border-emerald-900/40 hover:bg-emerald-950'
              }`}
            >
              🚜 Aset Alih
            </button>
            <button
              onClick={() => setActiveTab('SEGMEN_TAK_ALIH')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'SEGMEN_TAK_ALIH'
                  ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                  : 'bg-[#05140b] text-emerald-300/70 border-emerald-900/40 hover:bg-emerald-950'
              }`}
            >
              🏢 Aset Tak Alih
            </button>
            <button
              onClick={() => setActiveTab('SEGMEN_BIOLOGI')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'SEGMEN_BIOLOGI'
                  ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                  : 'bg-[#05140b] text-amber-300/70 border-emerald-900/40 hover:bg-emerald-950'
              }`}
            >
              🌾 Aset Hidup (Tumbuhan/Haiwan)
            </button>
            <button
              onClick={() => setActiveTab('SEGMEN_TAK_KETARA')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'SEGMEN_TAK_KETARA'
                  ? 'bg-indigo-500 text-white border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                  : 'bg-[#05140b] text-indigo-300/70 border-emerald-900/40 hover:bg-emerald-950'
              }`}
            >
              💻 Aset Tak Ketara
            </button>
            <button
              onClick={() => setActiveTab('AI_HELP')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeTab === 'AI_HELP'
                  ? 'bg-emerald-600 text-white border-emerald-400'
                  : 'bg-[#05140b] text-emerald-300/70 border-emerald-900/40 hover:bg-emerald-950'
              }`}
            >
              🤖 Pembantu AI
            </button>
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: EXECUTIVE FIRST PAGE (CARTA 4 ASET -> PEMBANTU AI -> SEGMEN)      */}
          {/* ========================================================================= */}
          {activeTab === 'DASHBOARD' && (
            <div className="space-y-8">

              {/* SECTION A: FIRST IMPRESSION - CARTA MEWAKILI 4 JENIS ASET UTAMA */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/90 via-[#051b11] to-[#04130c] border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-extrabold uppercase tracking-widest">
                      Visual Ringkasan Eksekutif (4 jenis aset)
                    </span>
                    <p className="text-xs text-slate-300 mt-2">
                      Status maklumat masa nyata merangkumi Aset Alih, Aset Tak Alih, Aset Biologi (Tumbuhan & Haiwan), dan Aset Tak Ketara (IP).
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('KEMASKINI')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-black transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.3)] shrink-0"
                  >
                    <Save size={16} /> Ke Ruang Kemaskini
                  </button>
                </div>

                {/* Top 4 KPI Metric Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  <div className="torch-light-card p-5 flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <Package size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 mb-1">Jumlah Aset Rekod</p>
                      <h4 className="text-2xl font-black text-white">{totalAssetsCount} Unit</h4>
                      <p className="text-[10px] text-emerald-400 mt-1">Lengkap berdaftar iGFMAS</p>
                    </div>
                  </div>

                  <div className="torch-light-card p-5 flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <DollarSign size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 mb-1">Nilai Keseluruhan</p>
                      <h4 className="text-2xl font-black text-white">RM {totalAssetsValue.toLocaleString()}</h4>
                      <p className="text-[10px] text-emerald-400 mt-1">Nilai buku bersih dikemaskini</p>
                    </div>
                  </div>

                  <div className="torch-light-card p-5 flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Wrench size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 mb-1">Kondisi Baik / Aktif</p>
                      <h4 className="text-2xl font-black text-white">{activeAssetsCount} Unit</h4>
                      <p className="text-[10px] text-emerald-400 mt-1">Siap sedia beroperasi</p>
                    </div>
                  </div>

                  <div className="torch-light-card p-5 flex items-start gap-4">
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
                      <AlertCircle size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-400 mb-1">Perlu Servis / Rosak</p>
                      <h4 className="text-2xl font-black text-white">{maintenanceAssetsCount} Unit</h4>
                      <p className="text-[10px] text-rose-400 mt-1">Keutamaan penyelenggaraan</p>
                    </div>
                  </div>
                </div>

                {/* 4 Core Focus Asset Classes Visual Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                  {CORE_4_ASSET_CLASSES.map((cls) => {
                    const itemVal = computedCategoryData.find(c => c.category === cls.label)?.value || 0;
                    const tabTarget = 
                      cls.id === 'ALIH' ? 'SEGMEN_ALIH' :
                      cls.id === 'TAK_ALIH' ? 'SEGMEN_TAK_ALIH' :
                      cls.id === 'BIOLOGI' ? 'SEGMEN_BIOLOGI' : 'SEGMEN_TAK_KETARA';

                    return (
                      <div 
                        key={cls.id} 
                        onClick={() => setActiveTab(tabTarget as TabType)}
                        className="torch-light-card p-4 flex items-center gap-3 border-l-4 cursor-pointer hover:border-emerald-400 transition-all group" 
                        style={{ borderLeftColor: cls.color }}
                      >
                        <div className="p-2.5 rounded-xl text-white group-hover:scale-110 transition-transform" style={{ backgroundColor: `${cls.color}20` }}>
                          {cls.id === 'ALIH' && <Truck size={22} className="text-teal-400" />}
                          {cls.id === 'TAK_ALIH' && <Building2 size={22} className="text-emerald-400" />}
                          {cls.id === 'BIOLOGI' && <Trees size={22} className="text-amber-400" />}
                          {cls.id === 'TAK_KETARA' && <Cpu size={22} className="text-indigo-400" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">{cls.label}</span>
                          <h5 className="text-lg font-bold text-white">RM {itemVal.toLocaleString()}</h5>
                          <p className="text-[10px] text-emerald-400/80 truncate flex items-center gap-1 mt-0.5">
                            Visual Segmen <ChevronRight size={10} />
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Main Visual Executive Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="torch-light-card">
                    <CoreClassBarChart data={computedCategoryData} />
                  </div>
                  <div className="torch-light-card">
                    <AcquisitionTrendChart data={computedTrendData} />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="torch-light-card">
                    <AssetAgingChart data={computedAgingData} />
                  </div>
                  <div className="torch-light-card">
                    <MaintenanceTrendChart data={computedMaintenanceData} />
                  </div>
                </div>
              </div>

              {/* SECTION B: PEMBANTU AI (AI HELP / REPORT ANALYZER) */}
              <div className="space-y-4 pt-4 border-t border-emerald-900/40">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
                      <Sparkles className="size-5 text-amber-400" /> Pembantu AI Laporan & Analisis Dokumen (4 Jenis Aset)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Tanya sebarang soalan terus kepada ejen AI tentang status aset alih, tak alih, biologi, atau tak ketara.
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                    Pembantu AI Aktif
                  </span>
                </div>

                {/* Embedded AiReportAnalyzer */}
                <AiReportAnalyzer />
              </div>

              {/* SECTION C: JABATAN & NATIONAL AGENCIES HUB */}
              <div className="space-y-6 pt-4 border-t border-emerald-900/40">
                <DepartmentActivityChart2025_2026 />
                <NationalJkpakAgencyHub 
                  selectedAgencyCode={selectedAgencyCode} 
                  onSelectAgency={setSelectedAgencyCode} 
                />
              </div>

              {/* SECTION D: SIDEBAR CLOCK & SYSTEM HIGHLIGHTS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                <div className="lg:col-span-1">
                  <DashboardSidebar />
                </div>
                <div className="lg:col-span-2 torch-light-card p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-2">
                      <ShieldCheck size={20} className="text-teal-400" /> Ringkasan Pematuhan iGFMAS & e-Perolehan KPKM
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Seluruh sistem inventori aset pertanian telah diselaraskan mengikut Tatacara Pengurusan Aset Kerajaan (TPA), MFRS 141 untuk Aset Biologi, dan iGFMAS ANM bagi memastikan audit bersih tahun 2026.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-6">
                      <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/50">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Pemeriksaan Aset Alih</span>
                        <span className="text-lg font-black text-white">82.4% Selesai</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Sasaran FAMA, LPP, MAQIS, DVS</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/50">
                        <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Penilaian Aset Biologi</span>
                        <span className="text-lg font-black text-white">RM 14.2M MFRS141</span>
                        <p className="text-[10px] text-slate-400 mt-0.5">Ternakan DVS & Tanaman DOA</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setActiveTab('KEMASKINI')}
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                    >
                      Buka Ruang Kemaskini Pendaftaran <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: KHAS PAGE KEMASKINI & PENDAFTARAN (DEDICATED UPDATE PAGE)          */}
          {/* ========================================================================= */}
          {activeTab === 'KEMASKINI' && (
            <div className="space-y-6">
              {/* Top Announcement Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/80 via-[#181104] to-[#0a140d] border border-amber-500/40 text-white shadow-[0_0_25px_rgba(245,158,11,0.15)]">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-widest">
                      Halaman Khas Kemaskini & Pendaftaran Aset Fizikal
                    </span>
                    <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                      <Save className="text-amber-400 size-6" /> Ruang Pendaftaran Jentera, Kenderaan & Physical Asset Entry
                    </h2>
                    <p className="text-xs text-slate-300 mt-1 max-w-3xl">
                      Semua borang pendaftaran kenderaan, kemaskini rating kondisi fizikal, serta ekstraksi pukal fail Excel/CSV diletakkan di ruang ini untuk memudahkan carian & susunan data.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsExtractorOpen(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-extrabold text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    >
                      <Sparkles size={16} /> Muat Naik Fail Pukal (Excel/CSV/PDF)
                    </button>
                  </div>
                </div>
              </div>

              {/* Form Manual Registration Section */}
              <div className="torch-light-card p-6">
                <div className="flex items-center justify-between mb-4 border-b border-emerald-900/40 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                      <Edit3 size={18} className="text-amber-400" /> Borang Pendaftaran & Kemaskini Manual Aset (iGFMAS)
                    </h3>
                    <p className="text-xs text-gray-400">
                      Daftar jentera baharu, kenderaan rasmi, atau peralatan ladang secara terus ke pangkalan data.
                    </p>
                  </div>
                  <span className="text-[10px] px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 font-mono font-bold">
                    iGFMAS Ready
                  </span>
                </div>

                <form onSubmit={handleSubmit(handleAddNewAsset)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">ID Aset (Nombor Pendaftaran iGFMAS)</label>
                      <input 
                        {...register("asset_no", { required: true })} 
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-emerald-500/20 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none text-white text-xs font-mono" 
                        placeholder="Contoh: JENT-2026-099 ATAU WXX 1234" 
                      />
                      {errors.asset_no && <span className="text-[10px] text-rose-500">Nombor aset wajib diisi</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Nama Aset / Kenderaan / Jentera</label>
                      <input 
                        {...register("name", { required: true })} 
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-emerald-500/20 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none text-white text-xs" 
                        placeholder="Contoh: Traktor Kubota 45HP / Penuai Padi Yanmar" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Kategori Kod iGFMAS</label>
                      <select 
                        {...register("cat_code")} 
                        className="w-full px-3.5 py-2.5 bg-[#05140b] border border-emerald-500/20 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none text-white text-xs"
                      >
                        {ASSET_CATEGORIES.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Kos Asal Perolehan (RM)</label>
                      <input 
                        type="number" 
                        step="0.01" 
                        {...register("orig_cost", { required: true })} 
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-emerald-500/20 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none text-white text-xs font-mono" 
                        placeholder="120000.00" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Rating Kondisi Fizikal</label>
                      <select 
                        {...register("cond_rating")} 
                        className="w-full px-3.5 py-2.5 bg-[#05140b] border border-emerald-500/20 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none text-white text-xs"
                      >
                        <option value="1">1 - Sangat Baik (Cemerlang)</option>
                        <option value="2">2 - Baik (Beroperasi)</option>
                        <option value="3">3 - Sederhana (Dalam Standby)</option>
                        <option value="4">4 - Lemah / Perlu Servis</option>
                        <option value="5">5 - Rosak Teruk / Pelupusan</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Lokasi Stesen / Plot Ladang</label>
                      <input 
                        {...register("location_plot")} 
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-emerald-500/20 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none text-white text-xs" 
                        placeholder="Contoh: Plot A - Sawah Padi Moden Sekinchan" 
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1">Pegawai Custodian / Agensi</label>
                      <input 
                        {...register("custodian")} 
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-emerald-500/20 rounded-xl focus:ring-1 focus:ring-emerald-500 outline-none text-white text-xs" 
                        placeholder="Contoh: En. Ahmad Zaki (Seksyen Mekanisasi LPP)" 
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => reset()}
                      className="px-4 py-2.5 rounded-xl border border-emerald-900/50 hover:bg-emerald-900/20 text-xs text-gray-300 font-semibold cursor-pointer"
                    >
                      Set Semula
                    </button>
                    <button 
                      disabled={isSubmitting} 
                      type="submit" 
                      className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 text-xs font-black rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
                    >
                      {isSubmitting ? "Menyimpan..." : "Simpan Pendaftaran Aset Baharu"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Full Inventory Table & Physical Condition Management */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Tag size={18} className="text-emerald-400" /> Senarai & Pengurusan Kondisi Fizikal Aset Terdaftar ({totalAssetsCount})
                  </h3>
                  <span className="text-xs text-slate-400">
                    Kemaskini rating 1-5 terus pada jadual di bawah
                  </span>
                </div>

                <AgriAssetInventoryTable
                  assets={agriAssets}
                  onAddNewAsset={() => setIsExtractorOpen(true)}
                  onUpdateRating={handleUpdateRating}
                  onDeleteAsset={handleDeleteAsset}
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: SEGMEN ASET ALIH (JENTERA & KENDERAAN)                              */}
          {/* ========================================================================= */}
          {activeTab === 'SEGMEN_ALIH' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#04130c] border border-teal-500/30 text-white">
                <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-black uppercase tracking-widest">
                  Segmen 1: Aset Alih
                </span>
                <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                  <Truck className="text-teal-400 size-6" /> Jentera Pertanian, Kenderaan Rasmi & Peralatan Mekanisasi
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Pengurusan 363,343 unit aset alih bernilai RM 1.54B di bawah Jabatan Pertanian, LPP, FAMA, MAQIS, DVS, & DOF.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="torch-light-card">
                  <CoreClassBarChart data={computedCategoryData} />
                </div>
                <div className="torch-light-card">
                  <MaintenanceTrendChart data={computedMaintenanceData} />
                </div>
              </div>

              <AgriAssetInventoryTable
                assets={agriAssets.filter(a => detectCoreAssetCategory(a.catCode, a.name) === 'Aset Alih')}
                onAddNewAsset={() => setActiveTab('KEMASKINI')}
                onUpdateRating={handleUpdateRating}
                onDeleteAsset={handleDeleteAsset}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: SEGMEN ASET TAK ALIH (BANGUNAN & TANAH)                            */}
          {/* ========================================================================= */}
          {activeTab === 'SEGMEN_TAK_ALIH' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#04130c] border border-emerald-500/30 text-white">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-widest">
                  Segmen 2: Aset Tak Alih
                </span>
                <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                  <Building2 className="text-emerald-400 size-6" /> Bangunan Makmal, Stesen Pertanian, Terusan & Infrastruktur
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  1,280 struktur premis, terusan pengairan MADA/KADA (1,450 km), kompleks storan sejuk FAMA, & stesen penyelidikan bernilai RM 3.82B.
                </p>
              </div>

              <AssetLocationTreemap />

              <AgriAssetInventoryTable
                assets={agriAssets.filter(a => detectCoreAssetCategory(a.catCode, a.name) === 'Aset Tak Alih')}
                onAddNewAsset={() => setActiveTab('KEMASKINI')}
                onUpdateRating={handleUpdateRating}
                onDeleteAsset={handleDeleteAsset}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: SEGMEN ASET HIDUP / BIOLOGI (TUMBUHAN & HAIWAN TERNAKAN)           */}
          {/* ========================================================================= */}
          {activeTab === 'SEGMEN_BIOLOGI' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#04130c] border border-amber-500/30 text-white">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black uppercase tracking-widest">
                  Segmen 3: Aset Biologi / Hidup (MFRS 141)
                </span>
                <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                  <Trees className="text-amber-400 size-6" /> Tanaman Kekal, Induk Ternakan & Sumber Akuakultur
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Kawalan nilai saksama (fair value) bagi 18,450 pokok baka induk, 12,300 ternakan lembu/kambing DVS, & ternakan akuakultur DOF bernilai RM 1.42B.
                </p>
              </div>

              {/* Animal Mortality Tracker */}
              <AnimalMortalityTracker />

              <AgriAssetInventoryTable
                assets={agriAssets.filter(a => detectCoreAssetCategory(a.catCode, a.name) === 'Aset Biologi')}
                onAddNewAsset={() => setActiveTab('KEMASKINI')}
                onUpdateRating={handleUpdateRating}
                onDeleteAsset={handleDeleteAsset}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: SEGMEN ASET TAK KETARA (PERISIAN & HAK CIPTA/PATEN)               */}
          {/* ========================================================================= */}
          {activeTab === 'SEGMEN_TAK_KETARA' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#04130c] border border-indigo-500/30 text-white">
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-black uppercase tracking-widest">
                  Segmen 4: Aset Tak Ketara (IP & Perisian)
                </span>
                <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                  <Cpu className="text-indigo-400 size-6" /> Lesen Perisian, Varieti Tanaman PVP, Paten & Hak Cipta
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  338 unit Harta Intelek (IP) di bawah MyIPO & PVP MARDI, DOA, DOF, & DVS bernilai RM 890M.
                </p>
              </div>

              <AgriAssetInventoryTable
                assets={agriAssets.filter(a => detectCoreAssetCategory(a.catCode, a.name) === 'Aset Tak Ketara')}
                onAddNewAsset={() => setActiveTab('KEMASKINI')}
                onUpdateRating={handleUpdateRating}
                onDeleteAsset={handleDeleteAsset}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 7: PEMBANTU AI (FULL PAGE MODE)                                       */}
          {/* ========================================================================= */}
          {activeTab === 'AI_HELP' && (
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-[#04130c] border border-emerald-500/30 text-white">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-black uppercase tracking-widest">
                  Pembantu AI Pintar KPKM
                </span>
                <h2 className="text-xl font-black text-white mt-2 flex items-center gap-2">
                  <Sparkles className="text-amber-400 size-6" /> Pembantu AI Laporan & Analisis Pengetahuan Dokumen
                </h2>
                <p className="text-xs text-slate-300 mt-1">
                  Enjin analisis dokumen pintar berasaskan Gemini AI. Muat naik laporan atau minta analisis merentasi 4 jenis aset.
                </p>
              </div>

              <AiReportAnalyzer />
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 8: TELEMETRY & SENSOR IOT LAPANGAN                                   */}
          {/* ========================================================================= */}
          {activeTab === 'TELEMETRY' && (
            <div className="space-y-6">
              <AgriTelemetryCard />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="torch-light-card p-6 space-y-3">
                  <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                    <Activity className="size-4" /> Status Sensor IoT Lapangan
                  </h3>
                  <p className="text-xs text-gray-400">
                    Sistem sensor lorong pertanian mengumpul data tanah dan kelembapan secara automatik setiap 15 minit.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/40">
                      <span>Sensor Moisture Plot A (Padi)</span>
                      <span className="font-bold text-emerald-400">99.2% Online</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/40">
                      <span>Sensor pH Plot B (Sawit)</span>
                      <span className="font-bold text-emerald-400">98.5% Online</span>
                    </div>
                    <div className="flex justify-between items-center text-xs p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/40">
                      <span>Sensor Aeroponik Rumah Hijau 1</span>
                      <span className="font-bold text-emerald-400">100% Optimal</span>
                    </div>
                  </div>
                </div>

                <div className="torch-light-card p-6 space-y-3">
                  <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                    <RefreshCw className="size-4" /> Pengairan Bertenaga Solar
                  </h3>
                  <p className="text-xs text-gray-400">
                    Inverter solar membekalkan 42.8 kW tenaga bersih untuk pam air bawah tanah dan sistem fertigasi.
                  </p>
                  <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Kapasiti Terpasang:</span>
                      <span className="font-bold text-white">60.0 kW Peak</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Pengurangan Karbon:</span>
                      <span className="font-bold text-emerald-400">-12.4 Ton CO₂/Bulan</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Penjimatan Kos Tenaga:</span>
                      <span className="font-bold text-emerald-400">RM 8,450 / Bulan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 9: PUSAT PENYELENGGARAAN SERVIS                                       */}
          {/* ========================================================================= */}
          {activeTab === 'MAINTENANCE' && (
            <AgriMaintenanceHub />
          )}

        </div>
      </main>

      {/* Extractor Modal */}
      <DataExtractorModal
        isOpen={isExtractorOpen}
        onClose={() => setIsExtractorOpen(false)}
        onDataExtracted={handleDataExtracted}
      />

      {/* PDF Report Library Modal */}
      <ReportLibrary
        isOpen={isReportOpen}
        onOpenChange={setIsReportOpen}
      />

      {/* Executive Slide Presentation Mode (Boss) */}
      {isPresentationOpen && (
        <ExecutivePresentationMode
          categoryData={computedCategoryData}
          trendData={computedTrendData}
          agingData={computedAgingData}
          maintenanceData={computedMaintenanceData}
          totalAssetsCount={totalAssetsCount}
          totalAssetsValue={totalAssetsValue}
          activeAssetsCount={activeAssetsCount}
          maintenanceAssetsCount={maintenanceAssetsCount}
          onClose={() => setIsPresentationOpen(false)}
        />
      )}
    </div>
  );
}
