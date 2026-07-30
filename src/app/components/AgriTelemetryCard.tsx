import React, { useState } from 'react';
import { Thermometer, Droplets, Sun, Activity, RefreshCw, Zap, Wind, Radio } from 'lucide-react';

export interface FarmPlotTelemetry {
  id: string;
  plotName: string;
  cropType: string;
  soilMoisture: number; // %
  soilPh: number;
  temp: number; // °C
  humidity: number; // %
  solarOutput: number; // kW
  irrigationStatus: 'ACTIVE' | 'IDLE' | 'MAINTENANCE';
  lastUpdated: string;
}

export const initialFarmPlots: FarmPlotTelemetry[] = [
  {
    id: 'PLOT-A',
    plotName: 'Plot A - Sawah Padi Moden',
    cropType: 'Padi MR220 CL',
    soilMoisture: 72,
    soilPh: 6.5,
    temp: 29.2,
    humidity: 78,
    solarOutput: 12.4,
    irrigationStatus: 'ACTIVE',
    lastUpdated: 'Baru sahaja',
  },
  {
    id: 'PLOT-B',
    plotName: 'Plot B - Ladang Kelapa Sawit Pintar',
    cropType: 'Sawit Tenera High-Yield',
    soilMoisture: 64,
    soilPh: 6.2,
    temp: 31.0,
    humidity: 71,
    solarOutput: 18.5,
    irrigationStatus: 'IDLE',
    lastUpdated: '2 minit lalu',
  },
  {
    id: 'PLOT-C',
    plotName: 'Rumah Hijau 1 - Hidroponik Sayuran',
    cropType: 'Sawi & Salad Aeroponik',
    soilMoisture: 85,
    soilPh: 6.8,
    temp: 26.5,
    humidity: 82,
    solarOutput: 8.2,
    irrigationStatus: 'ACTIVE',
    lastUpdated: '1 minit lalu',
  },
  {
    id: 'PLOT-D',
    plotName: 'Plot D - Dusun Durian Musang King',
    cropType: 'Durian D197 Premium',
    soilMoisture: 58,
    soilPh: 6.1,
    temp: 30.4,
    humidity: 68,
    solarOutput: 14.1,
    irrigationStatus: 'IDLE',
    lastUpdated: '5 minit lalu',
  },
];

export function AgriTelemetryCard() {
  const [plots, setPlots] = useState<FarmPlotTelemetry[]>(initialFarmPlots);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedPlotId, setSelectedPlotId] = useState('PLOT-A');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setPlots(prev =>
        prev.map(p => ({
          ...p,
          soilMoisture: Math.min(95, Math.max(45, p.soilMoisture + Math.floor(Math.random() * 5 - 2))),
          temp: Number((p.temp + (Math.random() * 0.4 - 0.2)).toFixed(1)),
          solarOutput: Number((p.solarOutput + (Math.random() * 0.8 - 0.4)).toFixed(1)),
          lastUpdated: 'Baru sahaja',
        }))
      );
      setIsRefreshing(false);
    }, 600);
  };

  const selectedPlot = plots.find(p => p.id === selectedPlotId) || plots[0];

  return (
    <div className="w-full relative rounded-[24px] bg-[#05140b] border border-emerald-500/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.7)] p-6 overflow-hidden">
      {/* Edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Radio className="size-4 animate-pulse" />
            </span>
            <h3 className="text-lg font-bold text-white tracking-wide">
              Stesen Telemetri Tanah & Cuaca Ladang
            </h3>
          </div>
          <p className="text-xs text-emerald-200/60">
            Pemantauan IoT masa nyata bagi tahap kelembapan tanah, pH, suhu, dan pengairan automatik.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold transition-all self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw className={`size-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Kemaskini Sensor</span>
        </button>
      </div>

      {/* Plot Selector Chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        {plots.map(plot => {
          const isActive = plot.id === selectedPlotId;
          return (
            <button
              key={plot.id}
              onClick={() => setSelectedPlotId(plot.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                  : 'bg-emerald-950/30 text-emerald-200/50 border-emerald-900/30 hover:bg-emerald-900/40 hover:text-emerald-200'
              }`}
            >
              {plot.plotName.split(' - ')[0]} ({plot.cropType.split(' ')[0]})
            </button>
          );
        })}
      </div>

      {/* Main Telemetry Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Soil Moisture */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-emerald-300/70 uppercase tracking-wider">Kelembapan Tanah</span>
            <Droplets className="size-4 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{selectedPlot.soilMoisture}%</div>
            <div className="text-[10px] font-medium text-emerald-400 mt-1">
              {selectedPlot.soilMoisture > 60 ? ' optimal' : ' perlubasahan'}
            </div>
          </div>
        </div>

        {/* Soil pH */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-emerald-300/70 uppercase tracking-wider">pH Tanah</span>
            <Activity className="size-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{selectedPlot.soilPh}</div>
            <div className="text-[10px] font-medium text-emerald-400 mt-1">
              {selectedPlot.soilPh >= 6.0 && selectedPlot.soilPh <= 7.0 ? ' Ideal (Subur)' : ' Perlu Baja'}
            </div>
          </div>
        </div>

        {/* Ambient Temp */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-emerald-300/70 uppercase tracking-wider">Suhu Persekitaran</span>
            <Thermometer className="size-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{selectedPlot.temp}°C</div>
            <div className="text-[10px] font-medium text-amber-300/80 mt-1">Normal Tropika</div>
          </div>
        </div>

        {/* Relative Humidity */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-emerald-300/70 uppercase tracking-wider">Kelembapan Udara</span>
            <Wind className="size-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{selectedPlot.humidity}%</div>
            <div className="text-[10px] font-medium text-cyan-300/80 mt-1">Sesuai Tanaman</div>
          </div>
        </div>

        {/* Solar Generation */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-emerald-300/70 uppercase tracking-wider">Penjanaan Solar</span>
            <Sun className="size-4 text-amber-300 animate-spin-slow" />
          </div>
          <div>
            <div className="text-2xl font-black text-white tracking-tight">{selectedPlot.solarOutput} <span className="text-xs font-normal">kW</span></div>
            <div className="text-[10px] font-medium text-emerald-400 mt-1">Pam Bertenaga Solar</div>
          </div>
        </div>

        {/* Irrigation Status */}
        <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] font-bold text-emerald-300/70 uppercase tracking-wider">Sistem Pengairan</span>
            <Zap className="size-4 text-emerald-400" />
          </div>
          <div>
            <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${
              selectedPlot.irrigationStatus === 'ACTIVE'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}>
              {selectedPlot.irrigationStatus === 'ACTIVE' ? 'Semburan Aktif' : 'Standby / Rehat'}
            </span>
            <div className="text-[10px] font-medium text-emerald-200/50 mt-1">Dikemas: {selectedPlot.lastUpdated}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
