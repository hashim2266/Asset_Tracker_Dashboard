import { useState, useMemo } from 'react';

// Sample data structure (replace with your iGFMAS export)
const maintenanceData = [
  { month: 1, year: 2024, category: 'KEND', cost: 8000 },
  { month: 2, year: 2024, category: 'KEND', cost: 9500 },
  { month: 3, year: 2024, category: 'KEND', cost: 22000 },
  { month: 4, year: 2024, category: 'KEND', cost: 12000 },
  { month: 5, year: 2024, category: 'KEND', cost: 15000 },
  { month: 6, year: 2024, category: 'KEND', cost: 18000 },
  { month: 7, year: 2024, category: 'KEND', cost: 20000 },
  { month: 8, year: 2024, category: 'KEND', cost: 17000 },
  { month: 9, year: 2024, category: 'KEND', cost: 14000 },
  { month: 10, year: 2024, category: 'KEND', cost: 16000 },
  { month: 11, year: 2024, category: 'KEND', cost: 19000 },
  { month: 12, year: 2024, category: 'KEND', cost: 25000 },
  // Add more data for other categories...
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogs', 'Sep', 'Okt', 'Nov', 'Dis'];
const CATEGORIES = ['KEND', 'BANG', 'ICT', 'FURN', 'OTHER'];
const CATEGORY_LABELS: Record<string, string> = {
  KEND: 'Kenderaan',
  BANG: 'Bangunan',
  ICT: 'ICT',
  FURN: 'Perabot',
  OTHER: 'Lain-lain',
};

export function MaintenanceHeatmap() {
  const [selectedYear, setSelectedYear] = useState(2024);
  const years = [2021, 2022, 2023, 2024, 2025];

  const heatmapData = useMemo(() => {
    return CATEGORIES.map(category => {
      const row: Record<string, any> = { category: CATEGORY_LABELS[category] };
      MONTHS.forEach((month, idx) => {
        const entry = maintenanceData.find(
          d => d.month === idx + 1 && d.year === selectedYear && d.category === category
        );
        row[month] = entry?.cost || 0;
      });
      return row;
    });
  }, [selectedYear]);

  const getColor = (value: number) => {
    if (value === 0) return '#f5f5f5';
    if (value < 5000) return '#fef3c7';
    if (value < 15000) return '#fbbf24';
    if (value < 30000) return '#f97316';
    return '#dc2626';
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-[#003366]">
          🔧 Corak Kos Penyelenggaraan Aset
        </h3>
        <div className="flex gap-2">
          {years.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded border-none cursor-pointer ${
                selectedYear === year 
                  ? 'bg-[#003366] text-white font-bold' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 text-left bg-gray-50">Kategori</th>
              {MONTHS.map(month => (
                <th key={month} className="p-2 text-center bg-gray-50 text-sm">
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((row, idx) => (
              <tr key={idx}>
                <td className="p-2 font-bold bg-gray-50">
                  {row.category}
                </td>
                {MONTHS.map(month => {
                  const value = row[month];
                  return (
                    <td
                      key={month}
                      className="p-3 text-center border border-white cursor-pointer transition-colors duration-300"
                      style={{ background: getColor(value) }}
                      title={`RM ${value.toLocaleString()}`}
                    >
                      {value > 0 && (
                        <span className="text-xs font-bold">
                          RM {(value / 1000).toFixed(1)}K
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#fef3c7]" />
          <span>RM 0-5K</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#fbbf24]" />
          <span>RM 5-15K</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#f97316]" />
          <span>RM 15-30K</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#dc2626]" />
          <span>RM 30K+</span>
        </div>
      </div>

      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-[#003366] rounded">
        <strong>💡 Insight Tahun {selectedYear}:</strong>
        <p className="mt-2 mb-0">
          Kos penyelenggaraan kenderaan memuncak pada bulan Mac dan Disember, 
          berkemungkinan berkaitan persediaan musim tengkujuh dan akhir tahun kewangan.
        </p>
      </div>
    </div>
  );
}
{
  "webhint.hints": {
    "no-inline-styles": "off"
  }
}