import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const maintenanceData = [
  { month: 'Jan', kenderaan: 45, bangunan: 28, ict: 15 },
  { month: 'Feb', kenderaan: 52, bangunan: 32, ict: 18 },
  { month: 'Mac', kenderaan: 78, bangunan: 45, ict: 22 },
  { month: 'Apr', kenderaan: 61, bangunan: 38, ict: 19 },
  { month: 'Mei', kenderaan: 55, bangunan: 41, ict: 21 },
  { month: 'Jun', kenderaan: 68, bangunan: 52, ict: 24 },
  { month: 'Jul', kenderaan: 72, bangunan: 58, ict: 26 },
  { month: 'Ogs', kenderaan: 65, bangunan: 49, ict: 23 },
  { month: 'Sep', kenderaan: 58, bangunan: 44, ict: 20 },
  { month: 'Okt', kenderaan: 62, bangunan: 47, ict: 22 },
  { month: 'Nov', kenderaan: 71, bangunan: 51, ict: 25 },
  { month: 'Dis', kenderaan: 85, bangunan: 62, ict: 28 },
];

export default function MaintenanceChart() {
  return (
    <div className="w-full h-[400px] p-6 text-white">
      <h3 className="text-xl font-bold text-emerald-400 mb-2">Trend Kos Penyelenggaraan (2024)</h3>
      <p className="text-sm text-gray-400 mb-4">Nilai dalam RM Ribu</p>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={maintenanceData}>
          <defs>
            <linearGradient id="colorKend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorBang" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorICT" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(16, 185, 129, 0.1)" />
          <XAxis dataKey="month" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="kenderaan" name="Kenderaan" stroke="#F59E0B" fill="url(#colorKend)" />
          <Area type="monotone" dataKey="bangunan" name="Bangunan" stroke="#3B82F6" fill="url(#colorBang)" />
          <Area type="monotone" dataKey="ict" name="ICT" stroke="#10B981" fill="url(#colorICT)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}