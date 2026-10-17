import React from 'react';
import { BENCHMARKS_DATA } from '../engine/benchmarksData';

export default function BenchmarkChips({ onSelectBenchmark, activeBenchmarkId }) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
        <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>1-Click Test Scenarios (Grand Jury Evaluation Benchmarks)</span>
        </label>
        <span className="text-[11px] text-cyan-400 font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
          Slide 6 & 7 Mandate
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {BENCHMARKS_DATA.map((bm) => {
          const isActive = activeBenchmarkId === bm.id;
          const isHigh = bm.badge.includes('HIGH');
          const isSafe = bm.badge.includes('SAFE');

          return (
            <button
              key={bm.id}
              onClick={() => onSelectBenchmark(bm)}
              className={`p-3 rounded-xl text-left text-xs transition-all border flex flex-col justify-between gap-2 group ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border-cyan-400 text-white shadow-glow-cyan ring-1 ring-cyan-400/50 scale-[1.01]'
                  : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800/90 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <span className="text-[10px] uppercase font-mono text-slate-400 group-hover:text-slate-300">
                  {bm.tag}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  isHigh
                    ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                    : isSafe
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-amber-500/15 text-amber-300 border-amber-500/40'
                }`}>
                  {bm.badge.split(' ')[0]}
                </span>
              </div>

              <div className="font-bold text-slate-100 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${
                  isHigh ? 'bg-rose-500' : isSafe ? 'bg-emerald-400' : 'bg-amber-400'
                }`}></span>
                <span className="truncate">{bm.title}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
