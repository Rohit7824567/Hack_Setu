import React, { useEffect, useState } from 'react';
import { fetchThreats } from '../utils/api';

export default function ThreatIntelligenceLiveFeed({ onClose }) {
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchThreats().then(data => {
      if (mounted) {
        setThreats(data);
        setLoading(false);
      }
    });
    return () => { mounted = false; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel p-6 bg-[#0a0f1d] border-amber-500/30" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                B2B FinTech SaaS: Bank Threat Intelligence API (Slide 8)
              </h2>
              <span className="text-[11px] text-amber-300 font-mono">
                Live Feed API • Automated Domain Takedown Triggers (₹30k - ₹75k / mo)
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-4 leading-relaxed">
          Indian banks lose billions to brand spoofing. ScamSpotter crowdsources anonymized telemetry from millions of scans and exposes a real-time webhooks & REST feed to automated registrar takedown workflows.
        </p>

        {/* Live Stream Table */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
          {loading ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              Connecting to Threat Intelligence Stream...
            </div>
          ) : (
            threats.map((threat, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">
                      {threat.targetBrand}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Header: {threat.senderHeader}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Score: {threat.riskScore}/100
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {threat.status}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 font-sans mb-2 italic">
                  "{threat.messageSnippet}"
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Flagged URL:</span>
                    <span className="font-mono text-cyan-300">
                      {threat.detectedDomain || 'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {threat.attackVectors?.map((v, i) => (
                      <span key={i} className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <span>Endpoint: <code>GET /api/threats</code></span>
          <span className="text-emerald-400">Sync: Realtime Webhooks</span>
        </div>
      </div>
    </div>
  );
}
