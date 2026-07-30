// src/components/assets/iGFMAS_Mappings.ts
export const ASSET_CATEGORIES = [
  { value: 'KEND', label: 'Kenderaan / Vehicles' },
  { value: 'BANG', label: 'Bangunan / Buildings' },
  { value: 'ICT', label: 'Peralatan ICT' },
  { value: 'FURN', label: 'Perabot & Kelengkapan' },
  { value: 'OTHER', label: 'Lain-lain / Others' },
] as const;

export const FUND_SOURCES = [
  { value: 'PERSEKUTUAN', label: 'Peruntukan Persekutuan' },
  { value: 'SENDIRI', label: 'Hasil Sendiri' },
  { value: 'GRANT', label: 'Grant/Khas' },
] as const;