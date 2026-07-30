import React from 'react';
import { motion } from 'motion/react';

// 1. Data structure mapping value size and colors matching our theme
interface TreemapNode {
  name: string;
  location: string;
  value: string; // Display string
  width: string;  // CSS width %
  height: string; // CSS height %
  color: string;  // Premium glass glow color gradient
  delay: number;
}

// 2. Mock data based on your regional asset inventory metrics
const nodes: TreemapNode[] = [
  { name: 'BANG (HQ Building)', location: 'Putrajaya', value: 'RM 45.2M', width: 'w-[60%]', height: 'h-[65%]', color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400', delay: 0 },
  { name: 'ICT (Main Server Room)', location: 'Putrajaya', value: 'RM 18.0M', width: 'w-[40%]', height: 'h-[65%]', color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400', delay: 0.1 },
  { name: 'KEND (Fleet Operations)', location: 'Johor Branch', value: 'RM 15.2M', width: 'w-[35%]', height: 'h-[35%]', color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400', delay: 0.2 },
  { name: 'BANG (State Office)', location: 'N. Sembilan', value: 'RM 12.4M', width: 'w-[35%]', height: 'h-[35%]', color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400', delay: 0.3 },
  { name: 'Mixed Assets (Others)', location: 'Other Sites', value: 'RM 9.5M', width: 'w-[30%]', height: 'h-[35%]', color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400', delay: 0.4 },
];

export default function AssetLocationTreemap() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="w-full h-[450px] p-6 bg-white/[0.01] backdrop-blur-xl border border-white/[0.05] rounded-2xl flex flex-col hover:bg-white/[0.02] transition-colors duration-300 overflow-hidden xl:col-span-2"
    >
      <div className="mb-6">
        <h2 className="text-base font-semibold text-slate-200">Asset Distribution by Location</h2>
        <p className="text-xs text-slate-500 mt-0.5">Hierarchical value mapping across state offices and categories</p>
      </div>

      {/* Hierarchical Treemap Grid Layout */}
      <div className="flex-1 w-full h-full flex flex-wrap gap-3 p-1">
        {nodes.map((node, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: node.delay, ease: "easeOut" }}
            className={`${node.width} ${node.height} flex flex-col justify-between p-4 rounded-xl border bg-gradient-to-br backdrop-blur-md transition-all duration-300 hover:scale-[1.01] hover:brightness-110 group cursor-pointer relative overflow-hidden ${node.color}`}
          >
            {/* Ambient inner card glow */}
            <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-60 block">
                {node.location}
              </span>
              <h3 className="font-bold text-sm text-slate-200 mt-0.5 group-hover:text-white transition-colors">
                {node.name}
              </h3>
            </div>
            
            <div className="text-right">
              <span className="text-xl font-extrabold tracking-tight block">
                {node.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
