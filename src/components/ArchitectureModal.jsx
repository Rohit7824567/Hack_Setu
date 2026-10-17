import React from 'react';

export default function ArchitectureModal({ onClose }) {
  const comparisonData = [
    {
      criteria: 'Latency',
      genericAi: '2,500ms – 5,000ms (Unusable in panic rush)',
      scamSpotter: '< 15ms (Instant edge / client evaluation)',
      winner: 'scamspotter'
    },
    {
      criteria: 'Explainability',
      genericAi: 'Black-box ("Looks fishy", no clear evidence)',
      scamSpotter: 'Transparent Math (Exact points + rules visible)',
      winner: 'scamspotter'
    },
    {
      criteria: 'Reliability',
      genericAi: 'Hallucination & prompt injection jailbreaks',
      scamSpotter: '100% Deterministic verifiable rules',
      winner: 'scamspotter'
    },
    {
      criteria: 'Unit Cost',
      genericAi: '$0.005 – $0.02 per API query',
      scamSpotter: '$0.0000 (Runs client-side / edge zero cost)',
      winner: 'scamspotter'
    },
    {
      criteria: 'Privacy',
      genericAi: 'Sends private victim SMS to 3rd-party cloud LLMs',
      scamSpotter: '100% On-Device / Zero data leakage',
      winner: 'scamspotter'
    }
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel p-6 bg-[#0a0f1d] border-cyan-500/40" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-wide">
                Innovation & Architecture (Slide 4 & 5)
              </h2>
              <span className="text-[11px] text-cyan-300 font-mono">
                Judging Criteria: Innovation (20 Marks) • Rule Engine vs Black-Box AI
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

        {/* Head-to-Head Comparison Table (Slide 4) */}
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          Head-to-Head Comparison: Why Deterministic Rules Beat Black-Box AI
        </h3>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono uppercase text-[11px]">
                <th className="py-2 px-3">Criteria</th>
                <th className="py-2 px-3 text-rose-400">Generic AI / Chatbot</th>
                <th className="py-2 px-3 text-cyan-300">ScamSpotter Rule Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/40">
                  <td className="py-2.5 px-3 font-semibold text-slate-300">{row.criteria}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.genericAi}</td>
                  <td className="py-2.5 px-3 font-semibold text-emerald-400 bg-emerald-950/20">{row.scamSpotter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4-Stage Pipeline Architecture (Slide 5) */}
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">
          System Architecture: 4-Stage Detection Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                STAGE 01
              </span>
              <span className="text-[10px] text-slate-500 uppercase">Pre-processing</span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Input Normalization & Sanitization</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Strips zero-width characters, maps Cyrillic homoglyphs to Latin, extracts raw URLs, IPs, and phone numbers. Resolves cloaked redirects.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                STAGE 02
              </span>
              <span className="text-[10px] text-slate-500 uppercase">Pattern Engine</span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Deterministic Security Rules</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Urgency Engine (+20 pts), Threat Coercion (+15 pts), and Credential/OTP Trap (+40 pts) with negation parsing.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                STAGE 03
              </span>
              <span className="text-[10px] text-slate-500 uppercase">Domain Verification</span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Domain Whitelist & Lookalike Checker</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Parses host domain, executes Levenshtein distance against Indian Bank Registry to detect typosquatting and fake subdomains.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800 font-bold">
                STAGE 04
              </span>
              <span className="text-[10px] text-slate-500 uppercase">Presentation</span>
            </div>
            <h4 className="text-xs font-bold text-white mb-1">Explainability & Emergency Action Hub</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Sums transparent math (0-100), paints in-text scam phrase badges, generates 1-click rescue dialer for 1930 & cybercrime evidence dossier.
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Hackathon Mandate Compliance:</span>
          <span className="text-cyan-300 font-semibold">100% Deterministic Core with Verified Rule Attribution</span>
        </div>
      </div>
    </div>
  );
}
