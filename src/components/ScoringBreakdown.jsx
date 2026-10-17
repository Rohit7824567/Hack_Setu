import React from 'react';

export default function ScoringBreakdown({ pointsBreakdown, findings, totalScore }) {
  const breakdownRows = [
    {
      category: 'Fake Urgency',
      points: pointsBreakdown?.urgency || 0,
      matches: findings?.filter(f => f.type === 'urgency').map(f => `"${f.matchedText}"`).join(', ') || 'None detected',
      why: 'Pressure stops victims from thinking critically or verifying with the official branch.',
      color: 'text-amber-400',
      tagColor: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      category: 'Account Threat / Coercion',
      points: pointsBreakdown?.threat || 0,
      matches: findings?.filter(f => f.type === 'threat').map(f => `"${f.matchedText}"`).join(', ') || 'None detected',
      why: 'Scammers exploit fear of losing money, netbanking access, or vital utilities.',
      color: 'text-orange-400',
      tagColor: 'bg-orange-500/10 border-orange-500/30'
    },
    {
      category: 'Suspicious / Spoofed Link',
      points: pointsBreakdown?.link || 0,
      matches: findings?.filter(f => f.type === 'suspicious_link').map(f => `"${f.matchedText}"`).join(', ') || 'No suspicious links',
      why: 'Not an official bank domain (official is onlinesbi.sbi); classic phishing clone.',
      color: 'text-purple-400',
      tagColor: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      category: 'OTP / Credential Request',
      points: pointsBreakdown?.credential || 0,
      matches: findings?.filter(f => f.type === 'credential_trap').map(f => `"${f.matchedText}"`).join(', ') || 'No credential harvest detected',
      why: 'CRITICAL: No legitimate bank or payment gateway EVER asks for your OTP, PIN, or remote app install!',
      color: 'text-rose-400',
      tagColor: 'bg-rose-500/10 border-rose-500/30'
    }
  ];

  return (
    <div className="glass-panel p-5 sm:p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400"></div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Engine 03: Transparent Scoring & Point Math
          </h3>
        </div>
        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-800/60">
          Slide 6 Benchmark Rubric
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800/80 bg-slate-950/40">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-mono uppercase text-[11px]">
              <th className="py-3 px-3.5">Warning Sign</th>
              <th className="py-3 px-3.5">Found in Message</th>
              <th className="py-3 px-3.5">Why It Matters</th>
              <th className="py-3 px-3.5 text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-sans">
            {breakdownRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                <td className={`py-3.5 px-3.5 font-bold ${row.color}`}>
                  {row.category}
                </td>
                <td className="py-3.5 px-3.5 font-mono text-slate-200 max-w-[200px] truncate" title={row.matches}>
                  {row.matches}
                </td>
                <td className="py-3.5 px-3.5 text-slate-300 max-w-[260px] leading-relaxed">
                  {row.why}
                </td>
                <td className="py-3.5 px-3.5 text-right font-mono font-black text-sm">
                  {row.points > 0 ? (
                    <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      +{row.points}
                    </span>
                  ) : (
                    <span className="text-slate-600">0</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-slate-700 bg-slate-900/90">
              <td colSpan="3" className="py-3.5 px-3.5 font-extrabold text-slate-200 uppercase tracking-wider text-xs">
                Total Calculated Threat Score
              </td>
              <td className="py-3.5 px-3.5 text-right font-mono font-black text-base text-cyan-300">
                {totalScore} / 100
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
