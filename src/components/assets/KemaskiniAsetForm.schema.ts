// src/components/assets/KemaskiniAsetForm.schema.ts
import { z } from 'zod';

export const kemaskiniAsetSchema = z.object({
  asset_id: z.string()
    .min(1, 'Asset ID wajib diisi')
    .regex(/^[A-Z0-9\-]+$/, 'Format: Huruf besar, nombor, atau sengkang sahaja'),
  
  category_code: z.enum(['KEND', 'BANG', 'ICT', 'FURN', 'OTHER'], {
    message: 'Sila pilih kategori yang sah', // ✅ Zod v4 syntax
  }),
  
  description: z.string().min(3, 'Deskripsi terlalu pendek'),
  
  acquisition_date: z.coerce.date({
    message: 'Tarikh perolehan wajib diisi', // ✅ Zod v4 syntax
  }),
  
  fund_source: z.enum(['PERSEKUTUAN', 'SENDIRI', 'GRANT']).optional(),
  
  original_cost: z.coerce.number()
    .positive('Kos asal mesti > 0')
    .max(999999999.99, 'Nilai melebihi had sistem'),
  
  useful_life_years: z.coerce.number()
    .int()
    .min(1)
    .max(50)
    .optional(),
  
  net_book_value: z.coerce.number().min(0).optional(),
  
  condition_rating: z.enum(['1', '2', '3', '4', '5'], {
    message: 'Rating kondisi wajib dipilih', // ✅ Zod v4 syntax
  }),
  
  last_maintenance_date: z.coerce.date().optional(),
  
  annual_maintenance_cost: z.coerce.number().min(0).default(0),
  
  location_code: z.string().min(1, 'Lokasi wajib diisi'),
  
  custodian_department: z.string().min(1, 'Jabatan custodian wajib diisi'),
  custodian_name: z.string().optional(),
  contact_no: z.string().optional(),
  
  status: z.enum(['ACTIVE', 'MAINT', 'DISPOSED', 'IDLE']),
});

export type KemaskiniAsetFormData = z.infer<typeof kemaskiniAsetSchema>;