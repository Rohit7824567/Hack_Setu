import React from 'react';

export default function RiskGauge({ score = 0, riskTier = 'LOW', latencyMs = 0 }) {
  const clampedScore = Math.min(Math.max(score, 0), 100);
  const needleAngle = -90 + (clampedScore / 100) * 180;

  let statusColor = '#10b981'; // Green
  let statusBg = 'rgba(16, 185, 129, 0.12)';
  let statusBorder = 'rgba(16, 185, 129, 0.45)';
  let statusLabel = 'SAFE / LOW RISK';
  let statusAdvice = 'No coercive fraud patterns or suspicious links detected.';
  let panelGlowClass = 'glass-panel-glow-green';

  if (clampedScore >= 60) {
    statusColor = '#ef4444'; // Red
    statusBg = 'rgba(239, 68, 68, 0.15)';
    statusBorder = 'rgba(239, 68, 68, 0.55)';
    statusLabel = 'HIGH RISK SCAM DETECTED';
    statusAdvice = 'Critical threat! High probability of credential theft or financial drain.';
    panelGlowClass = 'glass-panel-glow-red';
  } else if (clampedScore >= 30) {
    statusColor = '#f59e0b'; // Amber
    statusBg = 'rgba(245, 158, 11, 0.15)';
    statusBorder = 'rgba(245, 158, 11, 0.45)';
    statusLabel = 'SUSPICIOUS / MEDIUM RISK';
    statusAdvice = 'Borderline indicators detected. Verify with official branch before acting.';
    panelGlowClass = 'glass-panel-glow-amber';
  }

  return (
    <div className={`glass-panel p-6 text-center flex flex-col justify-between h-full ${panelGlowClass}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }}></span>
          <span>Risk Speedometer</span>
        </span>
        <span className="text-[11px] font-mono text-cyan-300 bg-slate-950/80 px-2.5 py-0.5 rounded-full border border-slate-700">
          {latencyMs}ms Edge
        </span>
      </div>

      {/* SVG Semicircle Gauge */}
      <div className="relative flex flex-col items-center justify-center my-3">
        <svg viewBox="0 0 200 120" className="w-64 max-w-full overflow-visible drop-shadow-md">
          {/* Background Track */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#162032"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Low Zone: 0 - 29 (Green) */}
          <path
            d="M 20 100 A 80 80 0 0 1 54 44"
            fill="none"
            stroke="#10b981"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Medium Zone: 30 - 59 (Amber) */}
          <path
            d="M 54 44 A 80 80 0 0 1 126 23"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="16"
            opacity="0.35"
          />

          {/* High Zone: 60 - 100 (Red) */}
          <path
            d="M 126 23 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ef4444"
            strokeWidth="16"
            strokeLinecap="round"
            opacity="0.35"
          />

          {/* Dynamic Value Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke={statusColor}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (clampedScore / 100) * 251.2}
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s'
            }}
          />

          {/* Needle Base Circle */}
          <circle cx="100" cy="100" r="9" fill="#0f172a" stroke={statusColor} strokeWidth="2" />
          <circle cx="100" cy="100" r="4" fill="#ffffff" />

          {/* Rotating Needle */}
          <g
            style={{
              transformOrigin: '100px 100px',
              transform: `rotate(${needleAngle}deg)`,
              transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <polygon points="98,100 102,100 100,24" fill="#ffffff" />
            <polygon points="99,100 101,100 100,28" fill={statusColor} />
          </g>
        </svg>

        {/* Score Value Display */}
        <div className="mt-1">
          <div className="flex items-baseline justify-center gap-1.5">
            <span
              className="text-5xl font-black font-mono tracking-tight transition-colors drop-shadow"
              style={{ color: statusColor }}
            >
              {clampedScore}
            </span>
            <span className="text-sm font-bold text-slate-500 font-mono">/ 100</span>
          </div>
        </div>
      </div>

      {/* Risk Badge */}
      <div
        className="px-4 py-2.5 rounded-xl border text-xs font-extrabold uppercase tracking-wider mb-2.5 transition-all shadow-sm"
        style={{
          backgroundColor: statusBg,
          borderColor: statusBorder,
          color: statusColor
        }}
      >
        {statusLabel}
      </div>

      <p className="text-xs text-slate-300 leading-snug px-2 mb-1">
        {statusAdvice}
      </p>

      {/* Threshold Reference Indicator */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex justify-between text-[10px] text-slate-400 font-mono">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>0-29 Low</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>30-59 Med</span>
        </span>
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          <span>60-100 High</span>
        </span>
      </div>
    </div>
  );
}
