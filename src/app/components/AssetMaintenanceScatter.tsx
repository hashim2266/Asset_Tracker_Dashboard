import React from 'react';
import { motion } from 'motion/react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ZAxis,
  TooltipProps
} from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const asset = payload[0].payload;
    const isDanger = asset.maintenanceCost > asset.assetValue;

    return (
      <div className="bg-[#121826]/90 backdrop-blur-xl p-4 rounded-xl border border-white/[0.08] shadow-2xl max-w-xs">
        <div className="flex justify-between items-center mb-2 gap-4">
          <p className="font-bold text-sm text-slate-200 truncate">{asset.name}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
            isDanger ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            {isDanger ? 'Replace Asset' : 'Healthy'}
          </span>
        </div>
        <div className="space-y-1 text-xs font-medium text-slate-400">
          <p>Category: <span className="text-slate-200">{asset.category}</span></p>
          <p>Value: <span className="text-slate-200">RM {asset.assetValue}k</span></p>
          <p>Maint. Cost: <span className="text-slate-200">RM {asset.maintenanceCost}k</span></p>
          <p>Age: <span className="text-slate-200">{asset.ageYears} Years</span></p>
        </div>
      </div>
    );
  }
  return null;
};

export default function AssetMaintenanceScatter({ externalData }: { externalData: any[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="w-full h-[450px] p-6 bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] rounded-2xl flex flex-col hover:bg-white/[0.02] transition-colors duration-300 overflow-hidden xl:col-span-2"
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-200">Maintenance Cost vs. Current Asset Value</h2>
        <p className="text-xs text-slate-500 mt-0.5">Identifies sub-optimal assets where cumulative repairs outvalue the asset</p>
      </div>

      <div className="flex-1 w-full h-full min-h-0 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 15, left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
            <XAxis type="number" dataKey="assetValue" name="Asset Value" unit="k" axisLine={false} tickLine={false} tick={{ fill: '#475569' }} />
            <YAxis type="number" dataKey="maintenanceCost" name="Maintenance Cost" unit="k" axisLine={false} tickLine={false} tick={{ fill: '#475569' }} />
            <ZAxis type="number" dataKey="ageYears" range={[60, 400]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'rgba(255,255,255,0.1)' }} />
            <ReferenceLine segment={[{ x: 0, y: 0 }, { x: 220, y: 220 }]} stroke="#EF4444" strokeDasharray="5 5" strokeWidth={1.5} />
            <Scatter name="Assets" data={externalData} fill="#6366F1" shape="circle" className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}