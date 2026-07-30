// src/components/assets/KemaskiniAsetForm.schema.ts
import { z } from 'zod';

export const kemaskiniAsetSchema = z.object({
  // CHART 1,2,4,6 | iGFMAS: ASSET_NO
  asset_id: z.string()
    .min(1, 'Asset ID wajib diisi')
    .regex(/^[A-Z0-9\-]+$/, 'Format: Huruf besar, nombor, atau sengkang sahaja'),
  
  // CHART 1,2,4 | iGFMAS: ASSET_CAT_CODE
  category_code: z.enum(['KEND', 'BANG', 'ICT', 'FURN', 'OTHER'], {
    errorMap: () => ({ message: 'Sila pilih kategori yang sah' }),
  }),
  
  description: z.string().min(3, 'Deskripsi terlalu pendek'),
  
  // CHART 1,2,3 | iGFMAS: ACQ_DATE
  acquisition_date: z.coerce.date({
    required_error: 'Tarikh perolehan wajib diisi',
  }),
  
  // CHART 5 | iGFMAS: FUND_SRC
  fund_source: z.enum(['PERSEKUTUAN', 'SENDIRI', 'GRANT']).optional(),
  
  // CHART 3,5 | iGFMAS: ORIG_COST
  original_cost: z.coerce.number()
    .positive('Kos asal mesti > 0')
    .max(999999999.99, 'Nilai melebihi had sistem'),
  
  useful_life_years: z.coerce.number()
    .int()
    .min(1)
    .max(50)
    .optional(),
  
  // CHART 3 | iGFMAS: NBV (Auto-calc or manual override)
  net_book_value: z.coerce.number().min(0).optional(),
  
  // CHART 2,4,6 | iGFMAS: COND_RATING
  condition_rating: z.enum(['1', '2', '3', '4', '5'], {
    errorMap: () => ({ message: 'Rating kondisi wajib dipilih' }),
  }),
  
  last_maintenance_date: z.coerce.date().optional(),
  
  // CHART 3,6 | iGFMAS: MAINT COST
  annual_maintenance_cost: z.coerce.number().min(0).default(0),
  
  // CHART 4 | iGFMAS: LOC_CODE
  location_code: z.string().min(1, 'Lokasi wajib diisi'),
  
  custodian_department: z.string().min(1, 'Jabatan custodian wajib diisi'),
  custodian_name: z.string().optional(),
  contact_no: z.string().optional(),
  
  // CHART 7 | iGFMAS: ASSET_STATUS
  status: z.enum(['ACTIVE', 'MAINT', 'DISPOSED', 'IDLE']),
});

export type KemaskiniAsetFormData = z.infer<typeof kemaskiniAsetSchema>;