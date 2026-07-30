import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  TooltipProps
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

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as PortfolioData;
    
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-md">
        <p className="font-bold text-gray-800 m-0">{data.name}</p>
        <p className="mt-2 m-0 font-medium" style={{ color: data.color }}>
          Count: {data.count}
        </p>
        <p className="m-0 text-gray-600">
          Percentage: {data.percentage}%
        </p>
      </div>
    );
  }
  return null;
};

const PortfolioStatusChart: React.FC = () => {
  return (
    <div className="w-full h-[500px] bg-gray-50 p-6 rounded-xl shadow-sm">
      <h2 className="text-center font-sans text-xl font-semibold text-gray-800 m-0">
        MyPortfolio Status Dashboard
      </h2>
      <p className="text-center text-gray-500 text-sm mt-1 mb-6">
        As at 20/06/2026 | Total: 1,541
      </p>

      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={portfolioData}
            cx="50%"
            cy="50%"
            innerRadius={100}
            outerRadius={140}
            paddingAngle={3}
            dataKey="count"
            isAnimationActive={true}
            animationBegin={200}
            animationDuration={1200}
            animationEasing="ease-out"
          >
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          
          <Tooltip content={<CustomTooltip />} />
          
          <Legend 
            layout="horizontal" 
            verticalAlign="bottom" 
            align="center" 
            wrapperStyle={{ paddingTop: '20px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioStatusChart;