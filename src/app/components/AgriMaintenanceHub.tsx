import React, { useState } from 'react';
import { Wrench, CheckCircle2, Clock, AlertTriangle, Calendar, Plus, User, Tag, Sparkles } from 'lucide-react';

export interface MaintenanceTask {
  id: string;
  assetName: string;
  category: string;
  taskTitle: string;
  dueDate: string;
  priority: 'TINGGI' | 'SEDERHANA' | 'RENDAH';
  status: 'SELESAI' | 'DALAM_PROSES' | 'BELUM_MULA';
  assignedTechnician: string;
  costEst: number;
}

export const defaultMaintenanceTasks: MaintenanceTask[] = [
  {
    id: 'MAINT-101',
    assetName: 'Traktor John Deere 5075E',
    category: 'Jentera Berat',
    taskTitle: 'Penukaran Minyak Enjin & Penapis Udara Hidraulik',
    dueDate: '2026-08-01',
    priority: 'TINGGI',
    status: 'DALAM_PROSES',
    assignedTechnician: 'En. Ramli & Pasukan Bengkel A',
    costEst: 1200,
  },
  {
    id: 'MAINT-102',
    assetName: 'Drone Semburan Agras T40',
    category: 'Kenderaan / Drone',
    taskTitle: 'Pengantian Bilah Rotor & Kalibrasi Nozel Semburan',
    dueDate: '2026-07-28',
    priority: 'TINGGI',
    status: 'BELUM_MULA',
    assignedTechnician: 'Juruteknik Drone KPKM',
    costEst: 2500,
  },
  {
    id: 'MAINT-103',
    assetName: 'Sistem Pam Solar Drip High-Pressure',
    category: 'Pengairan',
    taskTitle: 'Cuci Inverter Solar & Periksa Injap Tekanan Pam',
    dueDate: '2026-08-10',
    priority: 'SEDERHANA',
    status: 'SELESAI',
    assignedTechnician: 'Ir. Razak Din',
    costEst: 450,
  },
  {
    id: 'MAINT-104',
    assetName: 'Unit Storan Sejuk Cold-Room 50 Ton',
    taskTitle: 'Servis Pemampat Gas R404a & Pengesyoran Sensor Suhu',
    category: 'Storan Sejuk',
    dueDate: '2026-08-15',
    priority: 'SEDERHANA',
    status: 'BELUM_MULA',
    assignedTechnician: 'Syarikat Servis Penyejukan Utama',
    costEst: 1800,
  },
  {
    id: 'MAINT-105',
    assetName: 'Stesen Sensor IoT NPK Plot B',
    category: 'Sensor IoT',
    taskTitle: 'Penukaran Bateri Solar Backup & Kalibrasi Probe pH',
    dueDate: '2026-07-26',
    priority: 'RENDAH',
    status: 'DALAM_PROSES',
    assignedTechnician: 'Puan Siti Hajar',
    costEst: 300,
  },
];

export function AgriMaintenanceHub() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(defaultMaintenanceTasks);
  const [showAddForm, setShowAddForm] = useState(false);

  // New task form state
  const [newAsset, setNewAsset] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Jentera Berat');
  const [newPriority, setNewPriority] = useState<'TINGGI' | 'SEDERHANA' | 'RENDAH'>('SEDERHANA');
  const [newDueDate, setNewDueDate] = useState('2026-08-05');
  const [newTech, setNewTech] = useState('');

  const handleToggleStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus =
            t.status === 'BELUM_MULA'
              ? 'DALAM_PROSES'
              : t.status === 'DALAM_PROSES'
              ? 'SELESAI'
              : 'BELUM_MULA';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsset || !newTaskTitle) return;

    const newTask: MaintenanceTask = {
      id: `MAINT-${100 + tasks.length + 1}`,
      assetName: newAsset,
      category: newCategory,
      taskTitle: newTaskTitle,
      dueDate: newDueDate,
      priority: newPriority,
      status: 'BELUM_MULA',
      assignedTechnician: newTech || 'Juruteknik Bertugas',
      costEst: 850,
    };

    setTasks([newTask, ...tasks]);
    setNewAsset('');
    setNewTaskTitle('');
    setNewTech('');
    setShowAddForm(false);
  };

  const getPriorityBadge = (p: string) => {
    switch (p) {
      case 'TINGGI':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">Keutamaan Tinggi</span>;
      case 'SEDERHANA':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">Keutamaan Sederhana</span>;
      case 'RENDAH':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Rutin Biasa</span>;
    }
  };

  const getStatusBadge = (s: string) => {
    switch (s) {
      case 'SELESAI':
        return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"><CheckCircle2 className="size-3" /> Selesai</span>;
      case 'DALAM_PROSES':
        return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30"><Clock className="size-3" /> Dalam Proses</span>;
      case 'BELUM_MULA':
      default:
        return <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-500/20 text-gray-400 border border-gray-500/30"><AlertTriangle className="size-3" /> Belum Mula</span>;
    }
  };

  return (
    <div className="w-full relative rounded-[24px] bg-[#05140b] border border-emerald-500/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.7)] p-6 overflow-hidden">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="size-5 text-amber-400" />
            Pusat Penyelenggaraan & Servicing Aset Pertanian
          </h3>
          <p className="text-xs text-emerald-200/60 mt-1">
            Penjadualan berkala bagi penukaran minyak traktor, kalibrasi sensor IoT, dan pencegahan kerosakan.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer"
        >
          <Plus className="size-4" />
          {showAddForm ? 'Batal' : 'Tambah Tugasan Servis'}
        </button>
      </div>

      {/* Add Task Form Collapsible */}
      {showAddForm && (
        <form onSubmit={handleCreateTask} className="mb-6 p-5 rounded-2xl bg-[#020d06] border border-amber-500/30 space-y-4">
          <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="size-4" />
            Tugasan Penyelenggaraan Baru
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-emerald-200/80 mb-1">Nama Aset / Equipment</label>
              <input
                type="text"
                required
                placeholder="Contoh: Traktor Kubota L4508"
                value={newAsset}
                onChange={e => setNewAsset(e.target.value)}
                className="w-full bg-[#05140b] border border-emerald-800/60 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-200/30 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-emerald-200/80 mb-1">Tajuk Servis / Servicing Task</label>
              <input
                type="text"
                required
                placeholder="Contoh: Penukaran Penapis Udara & palam pencetus"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                className="w-full bg-[#05140b] border border-emerald-800/60 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-200/30 outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-emerald-200/80 mb-1">Keutamaan (Priority)</label>
              <select
                value={newPriority}
                onChange={e => setNewPriority(e.target.value as any)}
                className="w-full bg-[#05140b] border border-emerald-800/60 rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-amber-500"
              >
                <option value="TINGGI">Tinggi (Kerosakan / Kritikal)</option>
                <option value="SEDERHANA">Sederhana (Rutin Berkala)</option>
                <option value="RENDAH">Rendah (Pemeriksaan Fizikal)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-emerald-200/80 mb-1">Juruteknik / Jurutera Bertugas</label>
              <input
                type="text"
                placeholder="Contoh: En. Faiz (Bengkel Ladang)"
                value={newTech}
                onChange={e => setNewTech(e.target.value)}
                className="w-full bg-[#05140b] border border-emerald-800/60 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-200/30 outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all cursor-pointer"
            >
              Simpan Tugasan Servis
            </button>
          </div>
        </form>
      )}

      {/* Maintenance Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tasks.map(task => (
          <div
            key={task.id}
            className="p-4 rounded-2xl bg-[#020a05]/80 border border-emerald-900/50 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                  {task.id}
                </span>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(task.priority)}
                  {getStatusBadge(task.status)}
                </div>
              </div>

              <h4 className="text-sm font-bold text-white mb-1">{task.taskTitle}</h4>
              <p className="text-xs font-semibold text-emerald-400 mb-3">{task.assetName} • <span className="text-emerald-200/60 font-normal">{task.category}</span></p>

              <div className="space-y-1.5 text-[11px] text-emerald-200/70 border-t border-emerald-950 pt-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Calendar className="size-3 text-emerald-500" /> Tarikh Sasaran:</span>
                  <span className="font-semibold text-white">{task.dueDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><User className="size-3 text-emerald-500" /> Juruteknik:</span>
                  <span className="font-medium text-emerald-200">{task.assignedTechnician}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-950 flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-200/50 uppercase">
                Anggaran Kos: <span className="text-white">RM {task.costEst}</span>
              </span>

              <button
                onClick={() => handleToggleStatus(task.id)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold transition-all cursor-pointer"
              >
                Kemaskini Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
