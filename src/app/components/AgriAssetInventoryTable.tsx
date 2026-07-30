import React, { useState } from 'react';
import { Search, Filter, Plus, Wrench, ShieldCheck, AlertTriangle, Trash2, Edit2, Download, CheckCircle, Tag, MapPin, DollarSign, Layers } from 'lucide-react';
import { ASSET_CATEGORIES, CORE_4_ASSET_CLASSES, CoreAssetCategory, detectCoreAssetCategory } from './ui/IGFMAS_Mapping';

export interface AgriAssetItem {
  id: string;
  assetNo: string;
  name: string;
  catCode: string; // JENT, SENS, IRRG, STOR, KEND, BANG, BIOL, KETA, OTHER
  mainCategory?: CoreAssetCategory; // 'ASET_ALIH' | 'ASET_TAK_ALIH' | 'ASET_BIOLOGI' | 'ASET_TAK_KETARA'
  origCost: number;
  condRating: '1' | '2' | '3' | '4' | '5';
  locationPlot: string;
  status: 'ACTIVE' | 'MAINT' | 'DISPOSED' | 'IDLE';
  fuelOrBattery?: number;
  lastServiced: string;
  custodian: string;
}

export const defaultAgriAssets: AgriAssetItem[] = [
  // ASET ALIH (Movable)
  {
    id: '1',
    assetNo: 'JENT-2026-001',
    name: 'Traktor John Deere 5075E 75HP High-Torque',
    catCode: 'JENT',
    mainCategory: 'ASET_ALIH',
    origCost: 185000,
    condRating: '1',
    locationPlot: 'Plot A - Sawah Padi Moden',
    status: 'ACTIVE',
    fuelOrBattery: 85,
    lastServiced: '2026-06-12',
    custodian: 'En. Ahmad Zaki (Mekanisasi)',
  },
  {
    id: '2',
    assetNo: 'KEND-2026-022',
    name: 'Drone Semburan & Pemetaan DJI Agras T40 Smart',
    catCode: 'KEND',
    mainCategory: 'ASET_ALIH',
    origCost: 58000,
    condRating: '2',
    locationPlot: 'Plot A & D (Sawah Padi)',
    status: 'ACTIVE',
    fuelOrBattery: 92,
    lastServiced: '2026-07-02',
    custodian: 'Unit Operasi Drone KPKM',
  },
  {
    id: '3',
    assetNo: 'JENT-2026-009',
    name: 'Jentera Tuai Padi Kubota DC-70 Plus',
    catCode: 'JENT',
    mainCategory: 'ASET_ALIH',
    origCost: 210000,
    condRating: '3',
    locationPlot: 'Plot A - Sawah Padi',
    status: 'MAINT',
    fuelOrBattery: 30,
    lastServiced: '2026-05-15',
    custodian: 'En. Ramli (Ketua Bengkel)',
  },

  // ASET TAK ALIH (Immovable)
  {
    id: '4',
    assetNo: 'BANG-2026-002',
    name: 'Rumah Hijau Pintar Kawalan Iklim (Smart Greenhouse 01)',
    catCode: 'BANG',
    mainCategory: 'ASET_TAK_ALIH',
    origCost: 450000,
    condRating: '1',
    locationPlot: 'Pusat Inovasi Pertanian',
    status: 'ACTIVE',
    lastServiced: '2026-07-10',
    custodian: 'Dr. Nizam (Unit Inovasi)',
  },
  {
    id: '5',
    assetNo: 'STOR-2026-003',
    name: 'Unit Storan Sejuk Controlled Atmosphere 50 Ton',
    catCode: 'STOR',
    mainCategory: 'ASET_TAK_ALIH',
    origCost: 320000,
    condRating: '2',
    locationPlot: 'Pusat Pemprosesan Hasil',
    status: 'ACTIVE',
    lastServiced: '2026-04-18',
    custodian: 'En. Hafiz (Pusat Pengumpulan)',
  },
  {
    id: '6',
    assetNo: 'IRRG-2026-008',
    name: 'Stesen Terusan & Sistem Pam Solar Main Drip 30kW',
    catCode: 'IRRG',
    mainCategory: 'ASET_TAK_ALIH',
    origCost: 145000,
    condRating: '1',
    locationPlot: 'Plot B - Terusan Utama',
    status: 'ACTIVE',
    lastServiced: '2026-06-30',
    custodian: 'Ir. Razak Din (Pengairan)',
  },

  // ASET BIOLOGI (Biological Assets)
  {
    id: '7',
    assetNo: 'BIOL-2026-101',
    name: 'Blok Tanaman Pokok Kelapa Sawit Hybrid Tenera (120 Hektar)',
    catCode: 'BIOL_POKOK',
    mainCategory: 'ASET_BIOLOGI',
    origCost: 680000,
    condRating: '1',
    locationPlot: 'Sektor B - Ladang Kelapa Sawit',
    status: 'ACTIVE',
    lastServiced: '2026-07-01',
    custodian: 'En. Azman (Pengurus Ladang)',
  },
  {
    id: '8',
    assetNo: 'BIOL-2026-102',
    name: 'Dusun Durian Musang King & Black Thorn Matang (50 Hektar)',
    catCode: 'BIOL_POKOK',
    mainCategory: 'ASET_BIOLOGI',
    origCost: 520000,
    condRating: '1',
    locationPlot: 'Sektor C - Dusun Buah-Buahan',
    status: 'ACTIVE',
    lastServiced: '2026-06-20',
    custodian: 'En. Mustaffa (Penyelia Dusun)',
  },
  {
    id: '9',
    assetNo: 'BIOL-2026-103',
    name: 'Kumpulan Ternakan Lembu Baka Kedah-Kelantan (100 Ekor)',
    catCode: 'BIOL_TERNAK',
    mainCategory: 'ASET_BIOLOGI',
    origCost: 280000,
    condRating: '2',
    locationPlot: 'Plot E - Pusat Ternakan Integrated',
    status: 'ACTIVE',
    lastServiced: '2026-07-12',
    custodian: 'Dr. Salmah (Veterinar Ladang)',
  },

  // ASET TAK KETARA (Intangible Assets)
  {
    id: '10',
    assetNo: 'KETA-2026-201',
    name: 'Perisian & Portal Telemetri IoT Ladang Smart Ag 5G Enterprise',
    catCode: 'KETA_SOFT',
    mainCategory: 'ASET_TAK_KETARA',
    origCost: 195000,
    condRating: '1',
    locationPlot: 'Pusat Kawalan Data Cloud',
    status: 'ACTIVE',
    lastServiced: '2026-07-15',
    custodian: 'Unit ICT KPKM',
  },
  {
    id: '11',
    assetNo: 'KETA-2026-202',
    name: 'Lesen Pemetaan GIS Satelit Sentinel-2 & Udara (5 Tahun)',
    catCode: 'KETA_GIS',
    mainCategory: 'ASET_TAK_KETARA',
    origCost: 110000,
    condRating: '1',
    locationPlot: 'Sistem Pemetaan GIS',
    status: 'ACTIVE',
    lastServiced: '2026-06-10',
    custodian: 'Unit Pemetaan Satelit',
  },
  {
    id: '12',
    assetNo: 'KETA-2026-203',
    name: 'Hak Cipta Agronomi & IP Varieti Biji Benih Padi Wangi KPKM',
    catCode: 'KETA_IP',
    mainCategory: 'ASET_TAK_KETARA',
    origCost: 350000,
    condRating: '1',
    locationPlot: 'Pusat R&D Agronomi',
    status: 'ACTIVE',
    lastServiced: '2026-05-01',
    custodian: 'Pasukan R&D Agronomi',
  }
];

interface AgriAssetInventoryTableProps {
  assets: AgriAssetItem[];
  onAddNewAsset: () => void;
  onUpdateRating: (id: string, newRating: '1' | '2' | '3' | '4' | '5') => void;
  onDeleteAsset: (id: string) => void;
}

export function AgriAssetInventoryTable({
  assets,
  onAddNewAsset,
  onUpdateRating,
  onDeleteAsset,
}: AgriAssetInventoryTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCoreClass, setSelectedCoreClass] = useState<string>('ALL');
  const [selectedCond, setSelectedCond] = useState<string>('ALL');

  const filteredAssets = assets.filter(item => {
    const itemCoreClass = detectCoreAssetCategory(item);
    
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.assetNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.locationPlot.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.custodian.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClass = selectedCoreClass === 'ALL' || itemCoreClass === selectedCoreClass;
    const matchesCond = selectedCond === 'ALL' || item.condRating === selectedCond;

    return matchesSearch && matchesClass && matchesCond;
  });

  const getCoreClassBadge = (item: AgriAssetItem) => {
    const coreClass = detectCoreAssetCategory(item);
    const meta = CORE_4_ASSET_CLASSES.find(c => c.id === coreClass);
    if (!meta) return null;

    return (
      <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${meta.bgBadge}`}>
        {meta.label}
      </span>
    );
  };

  const getConditionBadge = (rating: string) => {
    switch (rating) {
      case '1':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">1 - Sangat Baik</span>;
      case '2':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">2 - Baik</span>;
      case '3':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">3 - Sederhana</span>;
      case '4':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/15 text-orange-300 border border-orange-500/30">4 - Lemah</span>;
      case '5':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30">5 - Rosak</span>;
    }
  };

  const handleExportCSV = () => {
    const headers = ['ID Aset', 'Nama Aset', 'Kategori Utama', 'Sub-Kategori', 'Kos (RM)', 'Rating', 'Lokasi', 'Status', 'Custodian'];
    const rows = filteredAssets.map(a => [
      a.assetNo,
      `"${a.name}"`,
      detectCoreAssetCategory(a),
      a.catCode,
      a.origCost,
      a.condRating,
      `"${a.locationPlot}"`,
      a.status,
      `"${a.custodian}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Aset_Pertanian_KPKM_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full relative rounded-2xl bg-[#11241a] border border-emerald-800/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] p-6 overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Tag className="size-5 text-emerald-400" />
            Inventori & Analisis Aset Pertanian (iGFMAS)
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Fokus Pemantauan 4 Kategori Utama: <strong className="text-teal-300">Aset Alih</strong>, <strong className="text-emerald-300">Aset Tak Alih</strong>, <strong className="text-amber-300">Aset Biologi</strong>, & <strong className="text-indigo-300">Aset Tak Ketara</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 text-xs font-semibold transition-all cursor-pointer"
          >
            <Download className="size-4" />
            Eksport CSV
          </button>
          <button
            onClick={onAddNewAsset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md"
          >
            <Plus className="size-4" />
            Daftar Aset Baru
          </button>
        </div>
      </div>

      {/* 4 Core Category Tab Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 custom-scrollbar">
        <button
          onClick={() => setSelectedCoreClass('ALL')}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
            selectedCoreClass === 'ALL'
              ? 'bg-emerald-800 text-white border-emerald-600 shadow-sm'
              : 'bg-[#0a1711] text-slate-400 border-emerald-900/40 hover:text-white hover:bg-emerald-950/60'
          }`}
        >
          Semua Kategori ({assets.length})
        </button>
        {CORE_4_ASSET_CLASSES.map(cls => {
          const count = assets.filter(a => detectCoreAssetCategory(a) === cls.id).length;
          const isSelected = selectedCoreClass === cls.id;
          return (
            <button
              key={cls.id}
              onClick={() => setSelectedCoreClass(cls.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border flex items-center gap-2 ${
                isSelected
                  ? 'bg-emerald-800 text-white border-emerald-500 shadow-sm'
                  : 'bg-[#0a1711] text-slate-300 border-emerald-900/40 hover:bg-emerald-950/80'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: cls.color }} />
              {cls.label}
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/40 text-slate-300">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <div className="md:col-span-2 relative">
          <input
            type="text"
            placeholder="Cari traktor, pokok sawit, rumah hijau, perisian IoT, no. aset, lokasi..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-[#081510] border border-emerald-800/60 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/80 transition-all"
          />
          <Search className="absolute left-3.5 top-3 size-4 text-emerald-400/80" />
        </div>

        <div>
          <select
            value={selectedCond}
            onChange={e => setSelectedCond(e.target.value)}
            className="w-full bg-[#081510] border border-emerald-800/60 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-emerald-500/80 transition-all"
          >
            <option value="ALL">Semua Rating Kondisi (1-5)</option>
            <option value="1">1 - Sangat Baik</option>
            <option value="2">2 - Baik</option>
            <option value="3">3 - Sederhana</option>
            <option value="4">4 - Lemah</option>
            <option value="5">5 - Rosak Teruk</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-xl border border-emerald-800/40">
        <table className="w-full text-left text-xs text-slate-200">
          <thead className="bg-[#091812] text-[10px] uppercase tracking-wider text-emerald-400 border-b border-emerald-800/50">
            <tr>
              <th className="py-3.5 px-4 font-bold">No. Aset</th>
              <th className="py-3.5 px-4 font-bold">Nama Aset Pertanian</th>
              <th className="py-3.5 px-4 font-bold">Kategori Utama</th>
              <th className="py-3.5 px-4 font-bold">Kos Asal (RM)</th>
              <th className="py-3.5 px-4 font-bold">Kondisi</th>
              <th className="py-3.5 px-4 font-bold">Lokasi / Plot</th>
              <th className="py-3.5 px-4 font-bold">Custodian</th>
              <th className="py-3.5 px-4 font-bold text-center">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-950/80 bg-[#11241a]/80">
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-slate-400 font-medium">
                  Tiada aset pertanian dijumpai padan dengan carian / tapisan.
                </td>
              </tr>
            ) : (
              filteredAssets.map(item => (
                <tr key={item.id} className="hover:bg-emerald-950/60 transition-all">
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-300 whitespace-nowrap">
                    {item.assetNo}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {item.name}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getCoreClassBadge(item)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-emerald-300 whitespace-nowrap">
                    RM {item.origCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getConditionBadge(item.condRating)}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="size-3 text-emerald-500 shrink-0" />
                      {item.locationPlot}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 text-[11px]">
                    {item.custodian}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-2">
                      <select
                        value={item.condRating}
                        onChange={e => onUpdateRating(item.id, e.target.value as '1' | '2' | '3' | '4' | '5')}
                        className="bg-[#081510] border border-emerald-800/60 rounded-lg px-2 py-1 text-[10px] text-slate-200 focus:outline-none"
                        title="Tukar Rating Kondisi"
                      >
                        <option value="1">1 - Sangat Baik</option>
                        <option value="2">2 - Baik</option>
                        <option value="3">3 - Sederhana</option>
                        <option value="4">4 - Lemah</option>
                        <option value="5">5 - Rosak</option>
                      </select>

                      <button
                        onClick={() => onDeleteAsset(item.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                        title="Padam Rekod"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
