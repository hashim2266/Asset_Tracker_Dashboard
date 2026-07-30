// src/app/components/ui/IGFMAS_Mapping.ts

export const CORE_4_ASSET_CLASSES = [
  { 
    id: 'ASET_ALIH', 
    label: 'Aset Alih', 
    code: 'ALIH',
    desc: 'Jentera, Traktor, Harvester, Dron, Kenderaan, Pam & Peralatan Alih',
    color: '#0D9488', // Steel Teal / Cyan
    bgBadge: 'bg-teal-500/15 text-teal-300 border-teal-500/30'
  },
  { 
    id: 'ASET_TAK_ALIH', 
    label: 'Aset Tak Alih', 
    code: 'TAK_ALIH',
    desc: 'Rumah Hijau, Bangunan Pemprosesan, Kilang Padi, Terusan & Infrastruktur',
    color: '#16A34A', // Forest Emerald Green
    bgBadge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
  },
  { 
    id: 'ASET_BIOLOGI', 
    label: 'Aset Biologi', 
    code: 'BIOLOGI',
    desc: 'Pokok Kelapa Sawit, Durian Musang King, Baka Padi, Ternakan & Akuakultur',
    color: '#D97706', // Warm Harvest Gold
    bgBadge: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  },
  { 
    id: 'ASET_TAK_KETARA', 
    label: 'Aset Tak Ketara', 
    code: 'TAK_KETARA',
    desc: 'Perisian IoT, Lisens Pemetaan GIS, Hak Cipta Agronomi & IP Biji Benih',
    color: '#6366F1', // Royal Indigo
    bgBadge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30'
  }
] as const;

export type CoreAssetCategory = typeof CORE_4_ASSET_CLASSES[number]['id'];

export const ASSET_CATEGORIES = [
  { value: 'JENT', label: 'Jentera & Traktor (Aset Alih)', mainCategory: 'ASET_ALIH' },
  { value: 'KEND', label: 'Kenderaan Ladang & Drone (Aset Alih)', mainCategory: 'ASET_ALIH' },
  { value: 'SENS', label: 'Sensor IoT & Telemetri (Aset Alih/Tak Ketara)', mainCategory: 'ASET_ALIH' },
  { value: 'IRRG', label: 'Sistem Pengairan & Pam (Aset Tak Alih/Alih)', mainCategory: 'ASET_TAK_ALIH' },
  { value: 'BANG', label: 'Bangunan & Rumah Hijau (Aset Tak Alih)', mainCategory: 'ASET_TAK_ALIH' },
  { value: 'STOR', label: 'Pusat Pemprosesan & Storan (Aset Tak Alih)', mainCategory: 'ASET_TAK_ALIH' },
  { value: 'BIOL_POKOK', label: 'Tanaman Kekal - Sawit/Durian (Aset Biologi)', mainCategory: 'ASET_BIOLOGI' },
  { value: 'BIOL_TERNAK', label: 'Ternakan & Akuakultur (Aset Biologi)', mainCategory: 'ASET_BIOLOGI' },
  { value: 'BIOL_PADI', label: 'Baka Padi & Seedling (Aset Biologi)', mainCategory: 'ASET_BIOLOGI' },
  { value: 'KETA_SOFT', label: 'Perisian & Telemetri Platform (Aset Tak Ketara)', mainCategory: 'ASET_TAK_KETARA' },
  { value: 'KETA_GIS', label: 'Lesen Pemetaan GIS & Satelit (Aset Tak Ketara)', mainCategory: 'ASET_TAK_KETARA' },
  { value: 'KETA_IP', label: 'Hak Cipta Agronomi & IP Varieti (Aset Tak Ketara)', mainCategory: 'ASET_TAK_KETARA' },
  { value: 'OTHER', label: 'Lain-lain Aset', mainCategory: 'ASET_ALIH' },
] as const;

export const FUND_SOURCES = [
  { value: 'PERSEKUTUAN', label: 'Peruntukan Persekutuan (KPKM)' },
  { value: 'SENDIRI', label: 'Hasil Sendiri / Ladang' },
  { value: 'GRANT', label: 'Geran Inovasi Pertanian / Khas' },
] as const;

/**
 * Helper to auto-determine Core Asset Category from text/name/code
 */
export function detectCoreAssetCategory(item: { name?: string; catCode?: string; mainCategory?: string }): CoreAssetCategory {
  if (item.mainCategory && ['ASET_ALIH', 'ASET_TAK_ALIH', 'ASET_BIOLOGI', 'ASET_TAK_KETARA'].includes(item.mainCategory)) {
    return item.mainCategory as CoreAssetCategory;
  }

  const text = `${item.name || ''} ${item.catCode || ''}`.toLowerCase();

  if (
    text.includes('sawit') || text.includes('durian') || text.includes('pokok') || 
    text.includes('biologi') || text.includes('lembu') || text.includes('kambing') || 
    text.includes('ternakan') || text.includes('baka') || text.includes('akuakultur') ||
    text.includes('tanaman') || text.includes('biol')
  ) {
    return 'ASET_BIOLOGI';
  }

  if (
    text.includes('perisian') || text.includes('software') || text.includes('lisens') || 
    text.includes('license') || text.includes('hak cipta') || text.includes('ip ') || 
    text.includes('ketara') || text.includes('gis') || text.includes('satelit') || 
    text.includes('keta') || text.includes('sistem igfmas')
  ) {
    return 'ASET_TAK_KETARA';
  }

  if (
    text.includes('rumah hijau') || text.includes('greenhouse') || text.includes('bangunan') || 
    text.includes('kilang') || text.includes('storan') || text.includes('cold room') || 
    text.includes('terusan') || text.includes('infrastruktur') || text.includes('bang') || 
    text.includes('stor') || text.includes('tak alih')
  ) {
    return 'ASET_TAK_ALIH';
  }

  // Default to Aset Alih for tractors, drones, sensors, machinery, vehicles
  return 'ASET_ALIH';
}

