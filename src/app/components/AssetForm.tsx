import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Save } from 'lucide-react';

// 1. Define the shape of your form data
interface AssetFormData {
  assetName: string;
  category: string;
  value: number;
  status: string;
}

export default function AssetForm() {
  // 2. Pass the interface to useForm
  const { register, handleSubmit, formState: { errors }, reset } = useForm<AssetFormData>();

  // 3. Type the submit handler
  const onSubmit: SubmitHandler<AssetFormData> = (data) => {
    console.log("Saved Asset Data:", data);
    // TODO: Send data to Supabase here
    reset(); // Clears the form after submission
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Aset Baru</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Aset</label>
            <input 
              {...register("assetName", { required: true })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Cth: Dell Latitude 5420"
            />
            {errors.assetName && <span className="text-red-500 text-xs mt-1">Ruangan ini wajib diisi</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Aset</label>
            <select 
              {...register("category", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="">Pilih Kategori...</option>
              <option value="IT">IT & Elektronik (Aset Alih)</option>
              <option value="Vehicles">Kenderaan (Aset Alih)</option>
              <option value="Machinery">Mesin & Jentera (Aset Alih)</option>
              <option value="Building">Bangunan (Aset Tak Alih)</option>
            </select>
            {errors.category && <span className="text-red-500 text-xs mt-1">Sila pilih kategori</span>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nilai Pembelian (RM)</label>
            <input 
              type="number"
              {...register("value", { required: true, min: 0, valueAsNumber: true })} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="0.00"
            />
            {errors.value && <span className="text-red-500 text-xs mt-1">Sila masukkan nilai yang sah</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
            >
              <option value="Aktif">Aktif</option>
              <option value="Penyelenggaraan">Sedang Diselenggara</option>
              <option value="Stor">Dalam Stor</option>
              <option value="Pelupusan">Proses Pelupusan</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button 
            type="submit" 
            className="flex items-center gap-2 bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition shadow-sm font-medium cursor-pointer"
          >
            <Save size={18} />
            Simpan Aset
          </button>
        </div>

      </form>
    </div>
  );
}