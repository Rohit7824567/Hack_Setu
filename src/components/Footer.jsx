import React from 'react';

export default function Footer({ onOpenModal }) {
  return (
    <footer className="mt-12 border-t border-slate-800/80 bg-[#05070e] py-8 px-4 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-bold text-slate-200 text-sm">ScamSpotter</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              SETU 2026 PS-01
            </span>
          </div>
          <p className="text-slate-500 max-w-md text-[11px] leading-relaxed">
            Rule-Driven Phishing & Fraud Detector: Turning Panic Messages into Visible Rules, Transparent Risk Scores & Safe Immediate Action.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <button onClick={() => onOpenModal('banks')} className="hover:text-cyan-300 transition-colors">
            Bank Directory
          </button>
          <span>•</span>
          <button onClick={() => onOpenModal('threats')} className="hover:text-amber-300 transition-colors">
            Threat API Feed
          </button>
          <span>•</span>
          <button onClick={() => onOpenModal('falsePositive')} className="hover:text-emerald-300 transition-colors">
            False Positive Proof
          </button>
          <span>•</span>
          <button onClick={() => onOpenModal('monetization')} className="hover:text-amber-400 transition-colors">
            Monetization (30M)
          </button>
          <span>•</span>
          <button onClick={() => onOpenModal('architecture')} className="hover:text-cyan-400 transition-colors">
            Architecture (20M)
          </button>
        </div>

        <div className="text-right flex flex-col items-end">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[11px] font-mono text-slate-300">Netlify & MERN Ready</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Direct Helpline: 1930 • cybercrime.gov.in
          </span>
        </div>
      </div>
    </footer>
  );
}
