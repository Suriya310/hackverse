import React from 'react';

interface ConfidenceMeterProps {
  confidence: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ConfidenceMeter: React.FC<ConfidenceMeterProps> = ({
  confidence,
  label = 'AI Confidence',
  size = 'md',
  showLabel = true,
}) => {
  const getColor = (val: number) => {
    if (val >= 80) return 'from-emerald-500 to-teal-400 text-emerald-400';
    if (val >= 65) return 'from-cyan-500 to-blue-500 text-cyan-400';
    if (val >= 50) return 'from-amber-500 to-yellow-400 text-amber-400';
    return 'from-rose-500 to-red-400 text-rose-400';
  };

  const getTrackColor = (val: number) => {
    if (val >= 80) return 'bg-emerald-500/20';
    if (val >= 65) return 'bg-cyan-500/20';
    if (val >= 50) return 'bg-amber-500/20';
    return 'bg-rose-500/20';
  };

  const heightClass = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  }[size];

  return (
    <div id="confidence-meter-container" className="w-full space-y-1.5">
      {showLabel && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium">{label}</span>
          <span className={`font-bold font-mono ${getColor(confidence).split(' ').pop()}`}>
            {confidence}%
          </span>
        </div>
      )}
      <div className={`w-full ${heightClass} ${getTrackColor(confidence)} rounded-full overflow-hidden p-0.5 bg-slate-900/80 border border-white/5`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${getColor(confidence).replace(/ text-.*$/, '')} transition-all duration-700 ease-out shadow-[0_0_12px_rgba(56,189,248,0.3)]`}
          style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
        />
      </div>
    </div>
  );
};
