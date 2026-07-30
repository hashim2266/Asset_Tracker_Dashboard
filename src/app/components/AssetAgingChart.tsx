import React from 'react';
import { motion } from 'motion/react';
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
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#121826]/90 backdrop-blur-xl p-4 rounded-xl border border-white/[0.08] shadow-2xl">
        <p className="font-bold text-xs text-slate-400 mb-2 uppercase tracking-wider">{label} Category</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold flex items-center gap-4 justify-between">
              <span>{entry.name}:</span>
              <span>{entry.value}%</span>
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AssetAgingChart({ scatterRefData }: { scatterRefData: any[] }) {
  // Compute percentage categories dynamically from master list
  const categories = ['ICT', 'PERABOT', 'KEND', 'BANG'];
  const data = categories.map(cat => {
    const items = scatterRefData.filter(i => i.category === cat);
    if (items.length === 0) return { category: cat, '0-2 yrs': 25, '3-5 yrs': 25, '6-8 yrs': 25, '9+ yrs': 25 };
    
    let brackets = { '0-2 yrs': 0, '3-5 yrs': 0, '6-8 yrs': 0, '9+ yrs': 0 };
    items.forEach(i => {
      if (i.ageYears <= 2) brackets['0-2 yrs']++;
      else if (i.ageYears <= 5) brackets['3-5 yrs']++;
      else if (i.ageYears <= 8) brackets['6-8 yrs']++;
      else brackets['9+ yrs']++;
    });

    return {
      category: cat,
      '0-2 yrs': Math.round((brackets['0-2 yrs'] / items.length) * 100),
      '3-5 yrs': Math.round((brackets['3-5 yrs'] / items.length) * 100),
      '6-8 yrs': Math.round((brackets['6-8 yrs'] / items.length) * 100),
      '9+ yrs': Math.round((brackets['9+ yrs'] / items.length) * 100),
    };
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full h-[400px] p-6 bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] rounded-2xl flex flex-col overflow-hidden"
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-200">Asset Aging Distribution</h2>
      </div>
      <div className="flex-1 w-full h-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} stackOffset="expand">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis type="number" tickFormatter={(v) => `${Math.round(v * 100)}%`} axisLine={false} tickLine={false} tick={{ fill: '#475569' }} />
            <YAxis type="category" dataKey="category" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontWeight: 600 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ color: '#94A3B8' }} />
            <Bar dataKey="0-2 yrs" stackId="a" fill="#10B981" />
            <Bar dataKey="3-5 yrs" stackId="a" fill="#3B82F6" />
            <Bar dataKey="6-8 yrs" stackId="a" fill="#F59E0B" />
            <Bar dataKey="9+ yrs" stackId="a" fill="#EF4444" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}