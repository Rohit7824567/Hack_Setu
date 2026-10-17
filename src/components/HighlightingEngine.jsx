import React, { useState } from 'react';

export default function HighlightingEngine({ cleanText, findings }) {
  const [activeFinding, setActiveFinding] = useState(null);

  if (!cleanText) {
    return (
      <div className="glass-panel p-6 text-center text-slate-500 text-sm">
        No message content to inspect. Enter text above to see in-text highlights.
      </div>
    );
  }

  const flaggedFindings = findings.filter(f => f.points > 0 || f.type === 'negation_pass');

  const renderHighlightedContent = () => {
    if (!flaggedFindings || flaggedFindings.length === 0) {
      return <span className="text-slate-200">{cleanText}</span>;
    }

    let textPieces = [];
    const sorted = [...flaggedFindings].filter(f => f.matchedText).sort((a, b) => {
      const idxA = cleanText.toLowerCase().indexOf(a.matchedText.toLowerCase());
      const idxB = cleanText.toLowerCase().indexOf(b.matchedText.toLowerCase());
      return idxA - idxB;
    });

    let cursor = 0;
    const lower = cleanText.toLowerCase();

    sorted.forEach((item, i) => {
      const matchIdx = lower.indexOf(item.matchedText.toLowerCase(), cursor);
      if (matchIdx !== -1 && matchIdx >= cursor) {
        if (matchIdx > cursor) {
          textPieces.push(cleanText.substring(cursor, matchIdx));
        }

        const matchOriginal = cleanText.substring(matchIdx, matchIdx + item.matchedText.length);

        let highlightClass = 'highlight-urgency';
        if (item.type === 'credential_trap') highlightClass = 'highlight-credential';
        else if (item.type === 'threat') highlightClass = 'highlight-threat';
        else if (item.type === 'suspicious_link') highlightClass = 'highlight-link';
        else if (item.type === 'negation_pass' || item.type === 'verified_domain') highlightClass = 'highlight-verified';

        textPieces.push(
          <span
            key={`match-${i}-${matchIdx}`}
            onClick={() => setActiveFinding(item)}
            className={`${highlightClass} inline-flex items-center gap-1.5 my-0.5 shadow-sm`}
            title={`Click to inspect rule: ${item.title}`}
          >
            <span>{matchOriginal}</span>
            <span className="text-[10px] font-mono font-bold bg-black/50 text-white/90 px-1.5 py-0.2 rounded">
              +{item.points}
            </span>
          </span>
        );

        cursor = matchIdx + item.matchedText.length;
      }
    });

    if (cursor < cleanText.length) {
      textPieces.push(cleanText.substring(cursor));
    }

    return textPieces;
  };

  return (
    <div className="glass-panel p-5 sm:p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Engine 02: In-Text Scam Phrase Highlighter
          </h3>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Click highlighted words to view plain-English rule breakdown
        </span>
      </div>

      {/* Rendered Text Body */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/85 border border-slate-800/90 text-sm sm:text-base leading-relaxed text-slate-100 font-sans break-words shadow-inner">
        {renderHighlightedContent()}
      </div>

      {/* Active Finding Detail Card */}
      {activeFinding && (
        <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-cyan-500/50 shadow-glow-cyan flex flex-col sm:flex-row items-start justify-between gap-3 animate-fadeIn">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-cyan-300 font-mono uppercase tracking-wide">
                {activeFinding.title}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-700">
                +{activeFinding.points} Points
              </span>
            </div>
            <p className="text-xs text-slate-300 mb-1">
              <strong className="text-slate-400">Exact Phrase:</strong> "{activeFinding.matchedText}"
            </p>
            <p className="text-xs text-amber-300 leading-snug">
              <strong className="text-slate-400">Why It Matters:</strong> {activeFinding.whyItMatters}
            </p>
          </div>
          <button
            onClick={() => setActiveFinding(null)}
            className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 shrink-0 transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
