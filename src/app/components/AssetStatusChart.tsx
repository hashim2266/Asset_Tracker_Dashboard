import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Aktif', value: 850, color: '#1E3A8A' },       // Gov Blue
  { name: 'Dalam Stor', value: 200, color: '#64748B' },    // Slate Gray
  { name: 'Penyelenggaraan', value: 150, color: '#D97706' },// Amber
  { name: 'Pelupusan', value: 48, color: '#BE123C' },      // Rose/Red
];

export default function AssetStatusChart() {
  return (
    <div className="w-full h-[400px] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-2">
        <h3 className="text-xl font-bold text-gray-800">Status Aset Semasa</h3>
      </div>
      
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value} Unit`, 'Jumlah']}
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="bottom" height={36} iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}