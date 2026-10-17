import React, { useState } from 'react';
import { submitIncidentReport } from '../utils/api';

export default function IncidentReportModal({ reportDraft, score, message, onClose }) {
  const [phone, setPhone] = useState('');
  const [sender, setSender] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await submitIncidentReport({
      victimPhone: phone || 'Anonymous',
      suspectSender: sender || 'Unknown',
      messageContent: message,
      riskScore: score,
      evidenceDossier: reportDraft
    });
    setReportId(res.reportId || 'SS-REP-LOCAL');
    setSubmitted(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reportDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel p-6 bg-[#0a0f1d] border-cyan-500/30" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <h2 className="text-base font-bold text-white uppercase tracking-wide">
              Cybercrime Incident Evidence Dossier (Slide 7)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/80"
          >
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="p-5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 text-xl font-bold mb-3">
              ✓
            </div>
            <h3 className="text-sm font-bold text-emerald-300 mb-1">
              Incident Dossier Registered
            </h3>
            <p className="text-xs text-slate-300 font-mono mb-4">
              Dossier ID: {reportId}
            </p>
            <p className="text-xs text-slate-400 mb-5">
              Copy this formatted evidence and paste directly into the National Cybercrime Reporting Portal.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={handleCopy}
                className="btn-primary text-xs font-semibold px-4 py-2"
              >
                {copied ? 'Copied to Clipboard!' : 'Copy Formatted Evidence'}
              </button>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-emergency-1930 text-xs font-semibold px-4 py-2"
              >
                Open Cybercrime.gov.in ↗
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-xs text-slate-300 mb-4">
              ScamSpotter automatically formats detected technical indicators, timestamps, and threat vectors into a standardized cyber fraud report ready for legal filing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Your Contact Phone (Optional):
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Suspect SMS Header / Sender ID:
                </label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="e.g. AD-SBIINB"
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Generated Evidence Dossier:
              </label>
              <textarea
                rows={8}
                readOnly
                value={reportDraft}
                className="w-full p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-300 leading-relaxed resize-none focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 font-semibold"
              >
                {copied ? 'Copied!' : 'Copy Dossier'}
              </button>
              <button
                type="submit"
                className="btn-primary text-xs font-semibold px-4 py-2"
              >
                Register & Prepare Filing
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
