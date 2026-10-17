import React, { useState } from 'react';

export default function MessageScanner({
  inputText,
  setInputText,
  senderHeader,
  setSenderHeader,
  onAnalyze,
  isAnalyzing,
  onReset
}) {
  const [autoClean, setAutoClean] = useState(true);

  const cleanInput = (text) => {
    if (!autoClean) return text;
    let cleaned = text.trim();
    cleaned = cleaned.replace(/^["'“”‘’]+|["'“”‘’]+$/g, '');
    cleaned = cleaned.replace(/^(?:Fwd:\s*|Forwarded:\s*|\[Forwarded\]\s*)/i, '');
    return cleaned;
  };

  const handlePaste = () => {
    if (autoClean) {
      setTimeout(() => {
        setInputText((prev) => cleanInput(prev));
      }, 10);
    }
  };

  return (
    <div className="glass-panel p-5 sm:p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            Engine 01: SMS & Phishing Input Inspector
          </h2>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-400 hover:text-cyan-300 transition-colors font-medium">
            <input
              type="checkbox"
              checked={autoClean}
              onChange={(e) => setAutoClean(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0 w-3.5 h-3.5"
            />
            <span>Smart Auto-Clean (Quotes & Headers)</span>
          </label>

          <span className="text-slate-600">|</span>

          <button
            onClick={onReset}
            className="text-slate-400 hover:text-rose-400 transition-colors font-medium text-xs"
          >
            Clear Text
          </button>
        </div>
      </div>

      {/* Sender Header Input */}
      <div className="mb-3.5 flex flex-wrap items-center gap-2.5">
        <span className="text-xs font-semibold text-slate-400 shrink-0">
          Sender ID / Header (Optional):
        </span>
        <input
          type="text"
          value={senderHeader}
          onChange={(e) => setSenderHeader(e.target.value)}
          placeholder="e.g. AD-SBIINB, VK-HDFCBK, VM-ELECTR"
          className="flex-1 min-w-[200px] px-3.5 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-cyan-300 placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-400/60 transition-colors font-mono"
        />
      </div>

      {/* Text Area */}
      <div className="relative">
        <textarea
          rows={4}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onPaste={handlePaste}
          placeholder="Paste suspicious SMS, WhatsApp notice, or emergency email here..."
          className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400/80 focus:ring-1 focus:ring-cyan-400/40 transition-all font-sans text-sm resize-y leading-relaxed shadow-inner"
        />
        <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 font-mono bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          {inputText.length} chars
        </div>
      </div>

      {/* Footer controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>&lt;15ms Client Edge Execution • 100% Private (No SMS sent to cloud LLM)</span>
        </div>

        <button
          onClick={() => onAnalyze(cleanInput(inputText))}
          disabled={isAnalyzing || !inputText.trim()}
          className={`btn-primary shadow-glow-cyan ${
            isAnalyzing || !inputText.trim() ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
          }`}
        >
          {isAnalyzing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Dissecting Threat...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <span>Dissect Threat Mechanically</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
