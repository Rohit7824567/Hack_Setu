import React, { useState } from 'react';

export default function EmergencyActionHub({
  riskTier,
  actions,
  reportDraft,
  onOpenReportModal,
  onOpenBankModal
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyReport = () => {
    if (!reportDraft) return;
    navigator.clipboard.writeText(reportDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const isHighRisk = riskTier === 'HIGH';

  return (
    <div className={`glass-panel p-5 sm:p-6 mb-6 ${isHighRisk ? 'glass-panel-glow-red' : ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className={`flex h-3 w-3 rounded-full ${isHighRisk ? 'bg-rose-500 animate-ping' : 'bg-emerald-400'}`}></span>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100 flex items-center gap-2">
            <span>Engine 04: Safe Action & Rescue Hub</span>
            {isHighRisk && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/50">
                CRITICAL RESCUE
              </span>
            )}
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Instant countermeasures to freeze fraudulent transfers within the golden hour
        </span>
      </div>

      {/* Immediate Rescue Action Playbook */}
      <div className="space-y-2.5 mb-5">
        {actions.map((act, index) => (
          <div
            key={index}
            className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
              act.priority === 1
                ? 'bg-rose-950/40 border-rose-700/60 text-rose-100'
                : 'bg-slate-900/70 border-slate-800 text-slate-200'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
              act.priority === 1 ? 'bg-rose-600 text-white shadow-sm' : 'bg-slate-800 text-slate-300'
            }`}>
              {act.priority}
            </div>
            <div className="flex-1 text-xs sm:text-sm">
              <span className="font-semibold">{act.instruction}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Primary Emergency Action Buttons (Slide 6 & 7) */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch gap-3 pt-3 border-t border-slate-800/80">
        {/* Call 1930 Dialer Button */}
        <a
          href="tel:1930"
          className="btn-emergency-1930 flex-1 min-w-[200px]"
          title="Direct dial to National Cyber Crime Reporting Portal Helpline"
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span className="text-xs sm:text-sm font-black">DIAL 1930 (CYBER HELPLINE)</span>
        </a>

        {/* Official Cybercrime Portal */}
        <a
          href="https://cybercrime.gov.in"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex-1 min-w-[190px] text-xs sm:text-sm shadow-glow-cyan"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          <span>CYBERCRIME.GOV.IN ↗</span>
        </a>

        {/* Copy Evidence Dossier */}
        <button
          onClick={handleCopyReport}
          className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400 text-xs sm:text-sm font-semibold text-slate-200 transition-all flex items-center justify-center gap-2 flex-1 min-w-[180px] shadow-sm active:scale-95"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-emerald-300 font-bold">Dossier Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <span>1-Click Evidence Dossier</span>
            </>
          )}
        </button>

        {/* Official Bank Helplines */}
        <button
          onClick={onOpenBankModal}
          className="px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-400 text-xs sm:text-sm font-semibold text-slate-200 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
        >
          <span>🏦 Bank Numbers</span>
        </button>
      </div>
    </div>
  );
}
