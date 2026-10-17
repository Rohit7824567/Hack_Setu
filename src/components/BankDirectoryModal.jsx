import React, { useState } from 'react';
import { OFFICIAL_BANKS } from '../engine/bankingRegistry';

export default function BankDirectoryModal({ onClose }) {
  const [search, setSearch] = useState('');

  const filteredBanks = OFFICIAL_BANKS.filter(b => 
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.shortName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel p-6 bg-[#0a0f1d] border-cyan-500/30" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            <h2 className="text-base font-bold text-white uppercase tracking-wide">
              Official Indian Bank Support Directory
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
          >
            ✕
          </button>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-amber-200 text-xs mb-4 flex items-center gap-2.5">
          <span className="text-base">⚠️</span>
          <span>
            <strong>Anti-Fraud Warning:</strong> Never search customer care numbers on Google or social media! Scammers post fake numbers to scam panicked victims. Use only verified directory numbers below.
          </span>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bank name (e.g. SBI, HDFC, ICICI, PNB)..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Banks Grid */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {filteredBanks.map((bank, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="font-bold text-xs text-slate-100 flex items-center gap-2">
                  <span>{bank.name}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300">
                    {bank.officialApp}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap gap-2">
                  <span>Domains: {bank.officialDomains.join(', ')}</span>
                </div>
                <div className="text-xs text-emerald-400 font-mono font-semibold mt-1">
                  Helpline: {bank.helpline}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${bank.helpline.split('/')[0].replace(/\s+/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>Call Branch</span>
                </a>

                <a
                  href="tel:1930"
                  className="px-3 py-1.5 rounded-lg bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>1930</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
