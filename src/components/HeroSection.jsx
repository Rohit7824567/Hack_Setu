import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative pt-6 pb-6 text-center max-w-5xl mx-auto px-4">
      {/* Decorative Cyber Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-cyan-500/10 blur-[80px] -z-10 pointer-events-none rounded-full"></div>

      {/* Target Problem Banner */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
        <span>SETU 2026 • Forge Realm • Problem Statement PS-01</span>
      </div>

      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-3 leading-tight">
        Turning Panic Messages into <br className="hidden sm:inline" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
          Visible Rules & Safe Action
        </span>
      </h1>
      
      <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal mb-7 leading-relaxed">
        Black-box AI leaves panicked victims confused. ScamSpotter mechanically dissects financial SMS threats in <strong className="text-cyan-400 font-semibold">&lt;15ms</strong> directly on-device with transparent math and 1-click rescue countermeasures.
      </p>

      {/* 4 Architectural Pillars (Slide 3 & 4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto text-left">
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/35 flex items-center justify-center text-cyan-300 font-mono text-xs font-bold shrink-0">
            &lt;15ms
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Zero Latency</div>
            <div className="text-[11px] text-slate-400">Client / Edge Core</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-emerald-500/40 transition-all flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-300 text-sm font-bold shrink-0">
            ✓
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Deterministic</div>
            <div className="text-[11px] text-slate-400">Zero Hallucination</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 transition-all flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/35 flex items-center justify-center text-purple-300 text-sm font-bold shrink-0">
            🔒
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">100% Privacy</div>
            <div className="text-[11px] text-slate-400">Zero Data Leakage</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-rose-500/40 transition-all flex items-center gap-3 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-500/35 flex items-center justify-center text-rose-300 text-xs font-extrabold shrink-0">
            1930
          </div>
          <div>
            <div className="text-xs font-bold text-slate-100">Action Hub</div>
            <div className="text-[11px] text-slate-400">Direct Rescue Dialer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
