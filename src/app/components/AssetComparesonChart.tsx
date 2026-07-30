import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';

// 1. Define the shape of your data
interface AssetData {
  year: string;
  asetAlih: number;
  asetTakAlih: number;
}

// 2. Apply the type to your data array
const data: AssetData[] = [
  { year: '2021', asetAlih: 4500000, asetTakAlih: 12000000 },
  { year: '2022', asetAlih: 5200000, asetTakAlih: 15500000 },
  { year: '2023', asetAlih: 4800000, asetTakAlih: 8000000 },
  { year: '2024', asetAlih: 6100000, asetTakAlih: 18200000 },
  { year: '2025', asetAlih: 5900000, asetTakAlih: 11000000 },
];

// 3. Type the custom tooltip using Recharts' built-in TooltipProps
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-xl rounded-xl">
        <p className="font-bold text-gray-800 mb-2 border-b pb-1">Tahun {label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm my-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600 flex-1">{entry.name}:</span>
            <span className="font-semibold" style={{ color: entry.color }}>
              RM {Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function AssetComparisonChart() {
  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">Perbandingan Pembelian Aset (5 Tahun)</h3>
        <p className="text-sm text-gray-500">Aset Alih vs Aset Tak Alih</p>
      </div>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          
          <XAxis 
            dataKey="year" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 13, fontWeight: 500 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickFormatter={(value: number) => `RM ${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="circle"
          />
          
          <Bar 
            name="Aset Alih" 
            dataKey="asetAlih" 
            fill="#1E3A8A" 
            radius={[4, 4, 0, 0]} 
            barSize={32} 
          />
          <Bar 
            name="Aset Tak Alih" 
            dataKey="asetTakAlih" 
            fill="#059669" 
            radius={[4, 4, 0, 0]} 
            barSize={32} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}