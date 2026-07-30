import React from 'react';
import { Package, Wrench, DollarSign, AlertCircle } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  colorClass: string;
}

const StatCard = ({ title, value, subtitle, icon, colorClass }: StatCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
    <div className={`p-4 rounded-xl ${colorClass}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-gray-900">{value}</h4>
      <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
    </div>
  </div>
);

export default function AssetStatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      <StatCard 
        title="Jumlah Aset Keseluruhan" 
        value="1,248" 
        subtitle="+12 bulan ini"
        icon={<Package size={24} className="text-blue-700" />} 
        colorClass="bg-blue-50"
      />
      <StatCard 
        title="Jumlah Nilai Aset" 
        value="RM 42.5M" 
        subtitle="Susut nilai: 5%"
        icon={<DollarSign size={24} className="text-emerald-700" />} 
        colorClass="bg-emerald-50"
      />
      <StatCard 
        title="Sedang Diselenggara" 
        value="34" 
        subtitle="Kos: RM 15,200"
        icon={<Wrench size={24} className="text-amber-700" />} 
        colorClass="bg-amber-50"
      />
      <StatCard 
        title="Perlu Perhatian" 
        value="7" 
        subtitle="Tamat waranti / Rosak"
        icon={<AlertCircle size={24} className="text-rose-700" />} 
        colorClass="bg-rose-50"
      />
    </div>
  );
}