import React from 'react';
import { motion } from 'motion/react';
import {
  LineChart,
  Line,
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
        <p className="font-bold text-xs text-slate-400 mb-2 uppercase tracking-wider">Fiscal Year {label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm font-semibold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
              RM {entry.value}M on {entry.name}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function AssetAcquisitionChart({ externalData }: { externalData: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full h-[400px] p-6 bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] rounded-2xl flex flex-col hover:bg-white/[0.02] transition-colors duration-300 overflow-hidden"
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-200">Asset Acquisition Trend</h2>
        <p className="text-xs text-slate-500 mt-0.5">Total Acquisition Spend (RM Million)</p>
      </div>

      <div className="flex-1 w-full h-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={externalData} margin={{ top: 5, right: 15, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
            <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 11 }} dx={-5} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 2 }} />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ paddingTop: '20px', color: '#94A3B8' }} />
            <Line type="monotone" dataKey="KEND" stroke="#3B82F6" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="BANG" stroke="#10B981" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="ICT" stroke="#6366F1" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="PERABOT" stroke="#F59E0B" strokeWidth={3} dot={false} activeDot={{ r: 5, strokeWidth: 0 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}