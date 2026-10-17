import React from 'react';

export default function MonetizationModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel p-6 bg-[#0a0f1d] border-amber-500/40" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-400"></span>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                Monetization & Business Model (Slide 8)
              </h2>
              <span className="text-[11px] text-amber-300 font-mono">
                Judging Criteria: Monetization (30 Marks) • 3 High-Margin Revenue Streams
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

        {/* 3 Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Stream 1 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 inline-block mb-2">
                B2C Freemium
              </span>
              <h3 className="text-sm font-bold text-white mb-1">
                Family Shield Plan
              </h3>
              <p className="text-[11px] text-slate-400 mb-3">
                Target: Everyday Families & Students
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mb-4">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Free Tier:</strong> Unlimited web app scans for basic self-protection.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">✓</span>
                  <span><strong>WhatsApp Scam Bot:</strong> Forward SMS/WhatsApp messages directly for instant verification.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400">✓</span>
                  <span><strong>Elderly Parent Alert:</strong> Instant push notification to family when high-risk SMS hits parent's device.</span>
                </li>
              </ul>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-bold text-cyan-300">₹49/mo</span>
              <span className="text-[11px] text-slate-400"> or ₹399/year</span>
            </div>
          </div>

          {/* Stream 2 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-bold text-[9px] px-2 py-0.5 uppercase tracking-wider rounded-bl-lg">
              High Margin
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 inline-block mb-2">
                B2B FinTech SaaS
              </span>
              <h3 className="text-sm font-bold text-white mb-1">
                Bank Threat Intel API
              </h3>
              <p className="text-[11px] text-slate-400 mb-3">
                Target: Banks, NBFCs & Payment Gateways
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mb-4">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span>Protects banks from brand spoofing & RBI compliance penalties.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">✓</span>
                  <span><strong>Live Phishing Feed API:</strong> Crowdsourced lookalike domains & active SMS templates.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-400">✓</span>
                  <span>Automated triggers for instant registrar DNS takedown.</span>
                </li>
              </ul>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-bold text-amber-300">₹30,000 – ₹75,000</span>
              <span className="text-[11px] text-slate-400"> / month per bank</span>
            </div>
          </div>

          {/* Stream 3 */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800 inline-block mb-2">
                B2B2C Telco VAS
              </span>
              <h3 className="text-sm font-bold text-white mb-1">
                Carrier & Insurance Add-on
              </h3>
              <p className="text-[11px] text-slate-400 mb-3">
                Target: Telecom Carriers (Jio, Airtel, Vi)
              </p>
              <ul className="text-xs text-slate-300 space-y-2 mb-4">
                <li className="flex items-start gap-1.5">
                  <span className="text-emerald-400">✓</span>
                  <span><strong>Carrier VAS Integration:</strong> Bundled with monthly recharge packs for automated SMS safety flags.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-cyan-400">✓</span>
                  <span><strong>Cyber Insurance Tie-Up:</strong> ScamSpotter risk score used by insurers for digital theft micro-policies.</span>
                </li>
              </ul>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
              <span className="text-xs font-bold text-purple-300">₹5 / month</span>
              <span className="text-[11px] text-slate-400"> per subscriber</span>
            </div>
          </div>
        </div>

        {/* Unit Economics Highlight from Slide 8 */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-400 font-medium">Unit Economics: </span>
            <span className="text-emerald-400 font-bold">Edge serverless hosting costs &lt; ₹0.005 per scan</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold font-mono">
            &gt; 90% Gross Margin
          </div>
        </div>
      </div>
    </div>
  );
}
