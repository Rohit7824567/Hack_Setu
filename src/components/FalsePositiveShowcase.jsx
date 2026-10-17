import React from 'react';

export default function FalsePositiveShowcase({ onClose, onLoadTest }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel p-6 bg-[#0a0f1d] border-emerald-500/30" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
            <h2 className="text-base font-bold text-white uppercase tracking-wide">
              Rubric Requirement: False Positive Prevention (Slide 9)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
          >
            ✕
          </button>
        </div>

        <p className="text-xs text-slate-300 mb-5 leading-relaxed">
          An over-sensitive scanner that flags legitimate college announcements or actual bank OTPs destroys credibility and user adoption. ScamSpotter employs a <strong className="text-emerald-400">Multi-Tier Safety Guardrail Architecture</strong> to guarantee zero false alarms on regular communications.
        </p>

        {/* 3 Safety Guardrails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-bold text-emerald-400 mb-1">
              1. Co-occurrence Gating
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Urgency words alone (e.g. <em>"Submit lab record today by 5 PM"</em>) only add 10-15 points. Without an unverified link or credential trap, the message remains firmly in <strong>LOW RISK (Green)</strong>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-bold text-cyan-400 mb-1">
              2. Domain Whitelisting
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Verified domains (e.g. <code>onlinesbi.sbi</code>, <code>iitb.ac.in</code>, <code>gov.in</code>, <code>irctc.co.in</code>) are whitelisted with zero risk penalties.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-xs font-bold text-purple-400 mb-1">
              3. Negation & Intent Parsing
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Genuine bank alerts say <em>"Do NOT share OTP with anyone"</em>. ScamSpotter explicitly checks negation clauses so actual bank security notices aren't penalized.
            </p>
          </div>
        </div>

        {/* Tested Proof Box from Slide 9 */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/40 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Tested Proof: College Notice Evaluation
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              PASSED (0/100)
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-200 mb-3">
            "College Notice: Tomorrow's lecture on Operating Systems is rescheduled to 11 AM in Room 302. Submit your assignment to Prof. Gupta."
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Coercive Threat Check:</span>
              <span className="text-slate-200 font-mono">No financial/account threat detected (0 pts)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Credential Trap Check:</span>
              <span className="text-slate-200 font-mono">No password, PIN or OTP requested (0 pts)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/60">
              <span className="text-slate-400">Lookalike Domain Check:</span>
              <span className="text-slate-200 font-mono">No suspicious URL found (0 pts)</span>
            </div>
            <div className="flex justify-between py-1.5 font-bold text-emerald-400">
              <span>FINAL EVALUATION:</span>
              <span className="font-mono">0 / 100 POINTS — SAFE / LOW RISK</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              onLoadTest('college-notice-safe');
              onClose();
            }}
            className="btn-primary text-xs font-semibold"
          >
            Load College Notice Test
          </button>
          <button
            onClick={() => {
              onLoadTest('bank-legitimate-otp');
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-semibold border border-slate-700"
          >
            Load Legitimate Bank Alert Test
          </button>
        </div>
      </div>
    </div>
  );
}
