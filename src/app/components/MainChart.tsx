import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface PortfolioData {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

const portfolioData: PortfolioData[] = [
  { name: 'Telah Diluluskan', count: 398, percentage: 25.83, color: '#22c55e' },
  { name: 'Deraf', count: 687, percentage: 44.58, color: '#eab308' },
  { name: 'Tindakan Pengesah & Pelulus', count: 95, percentage: 6.16, color: '#f97316' },
  { name: 'Perlu Pindaan', count: 24, percentage: 1.56, color: '#ef4444' },
  { name: 'Tiada Maklumat', count: 337, percentage: 21.87, color: '#9ca3af' },
];

// 💡 FIX: Removed strict TooltipProps and used 'any' to stop TypeScript from complaining
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-[#020a06]/90 backdrop-blur-md p-4 border border-emerald-500/20 rounded-xl shadow-[0_4px_16px_0_rgba(0,0,0,0.4)]">
        <p className="font-bold text-emerald-50 m-0">{data.name}</p>
        <p className="mt-2 m-0 font-medium" style={{ color: data.color }}>
          Count: {data.count}
        </p>
        <p className="m-0 text-emerald-200/70 text-sm">
          Percentage: {data.percentage}%
        </p>
      </div>
    );
  }
  return null;
};

export function MainChart() {
  return (
    <div className="relative w-full h-[500px] p-6 rounded-[24px] bg-glass-surface backdrop-blur-[24px] border border-glass-border shadow-[0_12px_32px_0_rgba(0,0,0,0.6)] overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />

      <h2 className="text-center font-sans text-xl font-semibold text-emerald-50 m-0 relative z-10">
        MyPortfolio Status Dashboard
      </h2>
      <p className="text-center text-[10px] text-emerald-200/40 uppercase tracking-wider mt-2 mb-6 relative z-10">
        As at 20/06/2026 | Total: 1,541
      </p>

      <div className="relative z-10 w-full h-full pb-10">
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={90}
              outerRadius={130}
              paddingAngle={4}
              dataKey="count"
              stroke="none"
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1200}
              animationEasing="ease-out"
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center" 
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: '#a7f3d0' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}