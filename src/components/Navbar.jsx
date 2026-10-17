import React from 'react';

export default function Navbar({ onOpenModal, backendStatus }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#060913]/85 border-b border-sky-500/15 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Track Badge */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/25 via-sky-600/20 to-blue-900/40 border border-cyan-400/40 shadow-glow-cyan">
            <svg className="w-5 h-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Scam<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">Spotter</span>
              </h1>
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 shadow-sm">
                SETU 2026 • PS-01
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              Rule-Driven Phishing & Fraud Detector • Zero-Latency Edge
            </p>
          </div>
        </div>

        {/* Navigation & Action Modals */}
        <div className="flex items-center flex-wrap gap-2 text-xs font-semibold">
          {backendStatus?.status === 'ONLINE' ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold">MERN API: Online (Port 5000)</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-cyan-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="font-mono text-[11px]">Engine: Client Edge Active (&lt;15ms)</span>
            </div>
          )}

          <button
            onClick={() => onOpenModal('banks')}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-400/50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Official Bank Helpline Directory"
          >
            <span>🏦 Bank Directory</span>
          </button>

          <button
            onClick={() => onOpenModal('threats')}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-amber-400/50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Live Phishing Feed API for Banks"
          >
            <span>📡 Threat Feed</span>
          </button>

          <button
            onClick={() => onOpenModal('falsePositive')}
            className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-emerald-400/50 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Slide 9: False Positive Prevention Proof"
          >
            <span>🛡️ Guardrails</span>
          </button>

          <button
            onClick={() => onOpenModal('monetization')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500/15 to-orange-500/15 hover:from-amber-500/25 hover:to-orange-500/25 text-amber-300 border border-amber-500/40 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Slide 8: 3 High-Margin Revenue Streams (30 Marks)"
          >
            <span>💼 Monetization</span>
          </button>

          <button
            onClick={() => onOpenModal('architecture')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600/25 to-blue-600/25 hover:from-cyan-600/35 hover:to-blue-600/35 text-cyan-300 border border-cyan-500/40 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Slide 4 & 5: 4-Stage Pipeline Architecture (20 Marks)"
          >
            <span>⚡ Architecture</span>
          </button>
        </div>
      </div>
    </header>
  );
}
