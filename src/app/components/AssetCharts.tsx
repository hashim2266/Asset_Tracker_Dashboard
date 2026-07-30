import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, BarChart, Bar, Legend, ComposedChart, CartesianGrid,
  ScatterChart, Scatter, ZAxis, Treemap, PieChart, Pie, Cell
} from 'recharts';
import { BarChart2 } from 'lucide-react';

const premiumTorchCard = "relative rounded-[24px] bg-[#05180d] border border-emerald-500/10 shadow-[0_16px_40px_0_rgba(0,0,0,0.85)] p-5 overflow-hidden transition-all duration-300 hover:border-emerald-400/30 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_45%)] after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.05),transparent_40%)]";

// --- MOCK DATA (Ready to be replaced with your live database fetches) ---
const acquisitionData = [
  { year: '2021', ICT: 45, KEND: 30, BANG: 15, PERABOT: 10 },
  { year: '2022', ICT: 52, KEND: 25, BANG: 20, PERABOT: 12 },
  { year: '2023', ICT: 38, KEND: 40, BANG: 25, PERABOT: 15 },
  { year: '2024', ICT: 65, KEND: 35, BANG: 10, PERABOT: 18 },
  { year: '2025', ICT: 48, KEND: 45, BANG: 30, PERABOT: 20 },
];

const agingData = [
  { category: 'ICT', '0-2yrs': 60, '3-5yrs': 30, '6-8yrs': 8, '9+yrs': 2 },
  { category: 'KEND', '0-2yrs': 20, '3-5yrs': 40, '6-8yrs': 30, '9+yrs': 10 },
  { category: 'BANG', '0-2yrs': 5, '3-5yrs': 15, '6-8yrs': 30, '9+yrs': 50 },
  { category: 'PERABOT', '0-2yrs': 40, '3-5yrs': 35, '6-8yrs': 15, '9+yrs': 10 },
];

const maintenanceData = [
  { name: 'KPKM-VEH-045', value: 5000, maint: 12000, age: 15, fill: '#ef4444' },
  { name: 'KPKM-BANG-002', value: 45000, maint: 2000, age: 3, fill: '#10b981' },
  { name: 'KPKM-ICT-112', value: 15000, maint: 8000, age: 7, fill: '#eab308' },
  { name: 'KPKM-VEH-088', value: 8000, maint: 9000, age: 12, fill: '#ef4444' },
];

const locationData = [
  { name: 'K. LUMPUR (RM45.8M)', size: 45800000, fill: '#ef4444' },
  { name: 'JOHOR (RM12.4M)', size: 12400000, fill: '#eab308' },
  { name: 'SELANGOR (RM28.5M)', size: 28500000, fill: '#10b981' },
  { name: 'PENANG (RM18.2M)', size: 18200000, fill: '#3b82f6' },
];

const budgetData = [
  { year: '2021', budget: 100, actual: 95, variance: -5 },
  { year: '2022', budget: 110, actual: 115, variance: 4.5 },
  { year: '2023', budget: 105, actual: 100, variance: -4.7 },
  { year: '2024', budget: 120, actual: 128, variance: 6.6 },
];

const dangerZoneData = [
  { id: 'KPKM-VEH-2018-045', score: 95, desc: 'Proton Wira', fill: '#ef4444' },
  { id: 'KPKM-ICT-2019-112', score: 88, desc: 'Server HP', fill: '#ef4444' },
  { id: 'KPKM-BANG-2015-003', score: 82, desc: 'Bangunan Pejabat', fill: '#eab308' },
  { id: 'KPKM-PERABOT-089', score: 65, desc: 'Set Meja Pejabat', fill: '#10b981' },
];

const complianceDonutData = [
  { name: 'Lengkap', value: 85, fill: '#10b981' },
  { name: 'Gap', value: 15, fill: '#ef4444' }
];

export default function AssetCharts() {
  return (
    <div className="mt-6 border-t border-emerald-900/40 pt-6">
      <h2 className="text-sm font-extrabold text-[#f5f7f2] uppercase tracking-widest mb-6 flex items-center gap-2">
        <BarChart2 className="size-5 text-emerald-400" />
        ANALISIS PENGURUSAN ASET (KOMPREHENSIF)
      </h2>
      
      <div className="grid grid-cols-2 gap-5">
        
        {/* 📈 Chart 1 */}
        <div className={premiumTorchCard}>
          <div className="relative z-10 h-72">
            <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-4">
              1. Trend Perolehan Aset (RM Juta)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={acquisitionData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="year" stroke="#4ade80" opacity={0.5} tick={{ fill: '#a7f3d0', fontSize: 10 }} />
                <YAxis stroke="#4ade80" opacity={0.5} tick={{ fill: '#a7f3d0', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#020704', borderColor: '#059669', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="ICT" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="KEND" stroke="#eab308" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="BANG" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="PERABOT" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📊 Chart 5 */}
        <div className={premiumTorchCard}>
          <div className="relative z-10 h-72">
            <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-4">
              5. Bajet vs Perbelanjaan Sebenar & Varians (%)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={budgetData} margin={{ top: 5, right: -20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" vertical={false} />
                <XAxis dataKey="year" stroke="#4ade80" opacity={0.5} tick={{ fill: '#a7f3d0', fontSize: 10 }} />
                <YAxis yAxisId="left" stroke="#4ade80" opacity={0.5} tick={{ fill: '#a7f3d0', fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#ef4444" opacity={0.5} tick={{ fill: '#ef4444', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#020704', borderColor: '#059669', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar yAxisId="left" dataKey="budget" name="Bajet (RM Juta)" fill="#4b5563" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="left" dataKey="actual" name="Sebenar (RM Juta)" fill="#0284c7" radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="variance" name="Varians (%)" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: '#ef4444' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📉 Chart 2 */}
        <div className={`${premiumTorchCard} col-span-2`}>
          <div className="relative z-10 h-56">
            <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-4">
              2. Profil Penuaan Aset Mengikut Kategori (%)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agingData} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" stroke="#4ade80" opacity={0.8} tick={{ fill: '#a7f3d0', fontSize: 11, fontWeight: 'bold' }} width={60} />
                <Tooltip cursor={{fill: 'rgba(16, 185, 129, 0.1)'}} contentStyle={{ backgroundColor: '#020704', borderColor: '#059669', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="0-2yrs" name="0-2 Tahun" stackId="a" fill="#10b981" radius={[4, 0, 0, 4]} />
                <Bar dataKey="3-5yrs" name="3-5 Tahun" stackId="a" fill="#eab308" />
                <Bar dataKey="6-8yrs" name="6-8 Tahun" stackId="a" fill="#f97316" />
                <Bar dataKey="9+yrs" name="9+ Tahun (Kritikal)" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 💸 Chart 3 */}
        <div className={premiumTorchCard}>
          <div className="relative z-10 h-72">
            <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-4">
              3. Kos Penyelenggaraan vs Nilai Aset (RM)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 20, bottom: -10, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#064e3b" />
                <XAxis type="number" dataKey="value" name="Net Book Value" unit=" RM" stroke="#4ade80" opacity={0.5} tick={{ fill: '#a7f3d0', fontSize: 10 }} />
                <YAxis type="number" dataKey="maint" name="Kos Penyelenggaraan" unit=" RM" stroke="#4ade80" opacity={0.5} tick={{ fill: '#a7f3d0', fontSize: 10 }} />
                <ZAxis type="number" dataKey="age" range={[60, 400]} name="Umur (Tahun)" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#020704', borderColor: '#059669', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
                <Scatter name="Aset" data={maintenanceData}>
                  {maintenanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 🗂️ Chart 4 */}
        <div className={premiumTorchCard}>
          <div className="relative z-10 h-72">
            <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-4">
              4. Taburan Aset Mengikut Lokasi
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={locationData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#020704"
                fill="#10b981"
              >
                <Tooltip contentStyle={{ backgroundColor: '#020704', borderColor: '#059669', borderRadius: '8px', color: '#fff', fontSize: '11px' }} />
              </Treemap>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ⚠️ Chart 6 */}
        <div className={`${premiumTorchCard} col-span-2`}>
          <div className="relative z-10 h-64">
            <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-4">
              6. Aset Zon Bahaya / Kritikal (Skor Risiko Tinggi)
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dangerZoneData} layout="vertical" margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="id" type="category" stroke="#4ade80" opacity={0.8} tick={{ fill: '#a7f3d0', fontSize: 10, fontWeight: 'bold' }} width={120} />
                <Tooltip cursor={{fill: 'rgba(16, 185, 129, 0.1)'}} contentStyle={{ backgroundColor: '#020704', borderColor: '#059669', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="score" name="Skor Risiko" radius={[0, 4, 4, 0]} barSize={20}>
                  {dangerZoneData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 📋 Chart 7 */}
        <div className={`${premiumTorchCard} col-span-2`}>
          <div className="relative z-10 flex items-center justify-between h-56">
            
            <div className="w-1/3 h-full flex flex-col items-center justify-center border-r border-emerald-900/40">
              <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-2 w-full text-center">
                7. Pematuhan Rekod
              </h3>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={complianceDonutData} cx="50%" cy="50%" innerRadius={45} outerRadius={60} dataKey="value" stroke="none">
                    {complianceDonutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#020704', borderColor: '#059669', borderRadius: '8px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="w-2/3 h-full pl-6 overflow-hidden">
              <h3 className="text-[10px] font-extrabold text-[#f5f7f2]/60 uppercase tracking-widest mb-3">
                Status Kriteria Pematuhan Pekeliling
              </h3>
              <table className="w-full text-left text-[11px]">
                <thead>
                  <tr className="border-b border-emerald-900/60 text-[#f5f7f2]/50 uppercase font-extrabold">
                    <th className="py-2">Kriteria Pengauditan</th>
                    <th className="py-2 text-center">Lengkap</th>
                    <th className="py-2 text-center">Gap</th>
                    <th className="py-2 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-[#f5f7f2] font-medium">
                  <tr className="border-b border-emerald-950/40">
                    <td className="py-2">Verifikasi Fizikal Aset</td>
                    <td className="py-2 text-center text-emerald-400">92%</td>
                    <td className="py-2 text-center">8%</td>
                    <td className="py-2 text-center">✅</td>
                  </tr>
                  <tr className="border-b border-emerald-950/40">
                    <td className="py-2">Kemas Kini Susut Nilai</td>
                    <td className="py-2 text-center text-yellow-400">88%</td>
                    <td className="py-2 text-center">12%</td>
                    <td className="py-2 text-center">⚠️</td>
                  </tr>
                  <tr className="border-b border-emerald-950/40">
                    <td className="py-2">Dokumentasi Pelupusan</td>
                    <td className="py-2 text-center text-rose-400">65%</td>
                    <td className="py-2 text-center">35%</td>
                    <td className="py-2 text-center">❌</td>
                  </tr>
                  <tr>
                    <td className="py-2">Penugasan Pegawai Aset</td>
                    <td className="py-2 text-center text-emerald-400">95%</td>
                    <td className="py-2 text-center">5%</td>
                    <td className="py-2 text-center">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}