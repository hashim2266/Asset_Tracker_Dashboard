import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { kemaskiniAsetSchema, type KemaskiniAsetFormData } from './KemaskiniAsetForm.schema';
import { ASSET_CATEGORIES, FUND_SOURCES } from './iGFMAS_Mappings';

export function KemaskiniAsetForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<KemaskiniAsetFormData>({
    resolver: zodResolver(kemaskiniAsetSchema),
    defaultValues: {
      annual_maintenance_cost: 0,
      status: 'ACTIVE',
    },
  });

  const onSubmit = async (data: KemaskiniAsetFormData) => {
    console.log('Ready for iGFMAS/Dashboard:', data);
    // TODO: Add Supabase insert/update call here
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '800px', margin: '2rem auto', padding: '1.5rem' }}>
      <h2>Kemaskini Aset</h2>
      
      {/* Asset ID */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Asset ID *</label><br />
        <input {...register('asset_id')} placeholder="e.g., KPKM-ICT-001" style={{ width: '100%', padding: '0.5rem' }} />
        {errors.asset_id && <p style={{ color: 'red' }}>{errors.asset_id.message}</p>}
      </div>

      {/* Category */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Kategori *</label><br />
        <select {...register('category_code')} style={{ width: '100%', padding: '0.5rem' }}>
          <option value="">Pilih...</option>
          {ASSET_CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        {errors.category_code && <p style={{ color: 'red' }}>{errors.category_code.message}</p>}
      </div>

      {/* Description */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Deskripsi *</label><br />
        <input {...register('description')} placeholder="e.g., Laptop Dell Latitude 5420" style={{ width: '100%', padding: '0.5rem' }} />
        {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
      </div>

      {/* Acquisition Date */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Tarikh Perolehan *</label><br />
        <input type="date" {...register('acquisition_date')} style={{ width: '100%', padding: '0.5rem' }} />
        {errors.acquisition_date && <p style={{ color: 'red' }}>{errors.acquisition_date.message}</p>}
      </div>

      {/* Fund Source */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Sumber Kewangan</label><br />
        <select {...register('fund_source')} style={{ width: '100%', padding: '0.5rem' }}>
          <option value="">Pilih...</option>
          {FUND_SOURCES.map(fund => (
            <option key={fund.value} value={fund.value}>{fund.label}</option>
          ))}
        </select>
      </div>

      {/* Original Cost */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Kos Asal (RM) *</label><br />
        <input type="number" step="0.01" {...register('original_cost')} placeholder="0.00" style={{ width: '100%', padding: '0.5rem' }} />
        {errors.original_cost && <p style={{ color: 'red' }}>{errors.original_cost.message}</p>}
      </div>

      {/* Useful Life */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Umur Manfaat (Tahun)</label><br />
        <input type="number" min="1" max="50" {...register('useful_life_years')} placeholder="e.g., 5" style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      {/* Net Book Value */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Nilai Buku Bersih (RM)</label><br />
        <input type="number" step="0.01" min="0" {...register('net_book_value')} placeholder="0.00" style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      {/* Condition Rating */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Rating Kondisi *</label><br />
        <select {...register('condition_rating')} style={{ width: '100%', padding: '0.5rem' }}>
          <option value="">Pilih...</option>
          <option value="1">1 - Excellent</option>
          <option value="2">2 - Good</option>
          <option value="3">3 - Fair</option>
          <option value="4">4 - Poor</option>
          <option value="5">5 - Critical</option>
        </select>
        {errors.condition_rating && <p style={{ color: 'red' }}>{errors.condition_rating.message}</p>}
      </div>

      {/* Last Maintenance Date */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Tarikh Penyelenggaraan Terakhir</label><br />
        <input type="date" {...register('last_maintenance_date')} style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      {/* Annual Maintenance Cost */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Kos Penyelenggaraan Tahunan (RM)</label><br />
        <input type="number" step="0.01" min="0" {...register('annual_maintenance_cost')} placeholder="0.00" style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      {/* Location Code */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Lokasi *</label><br />
        <input {...register('location_code')} placeholder="e.g., KL, JHR" style={{ width: '100%', padding: '0.5rem' }} />
        {errors.location_code && <p style={{ color: 'red' }}>{errors.location_code.message}</p>}
      </div>

      {/* Custodian Department */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Jabatan Custodian *</label><br />
        <input {...register('custodian_department')} placeholder="e.g., Bahagian Pentadbiran" style={{ width: '100%', padding: '0.5rem' }} />
        {errors.custodian_department && <p style={{ color: 'red' }}>{errors.custodian_department.message}</p>}
      </div>

      {/* Custodian Name */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Nama Custodian</label><br />
        <input {...register('custodian_name')} style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      {/* Contact No */}
      <div style={{ marginBottom: '1rem' }}>
        <label>No. Telefon</label><br />
        <input {...register('contact_no')} style={{ width: '100%', padding: '0.5rem' }} />
      </div>

      {/* Status */}
      <div style={{ marginBottom: '1rem' }}>
        <label>Status Semasa *</label><br />
        <select {...register('status')} style={{ width: '100%', padding: '0.5rem' }}>
          <option value="ACTIVE">Aktif</option>
          <option value="MAINT">Dalam Penyelenggaraan</option>
          <option value="DISPOSED">Dilupuskan</option>
          <option value="IDLE">Tidak Diguna</option>
        </select>
        {errors.status && <p style={{ color: 'red' }}>{errors.status.message}</p>}
      </div>

      <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#003366', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        💾 SIMPAN DATA
      </button>
    </form>
  );
}