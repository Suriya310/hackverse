import React from 'react';
import { SignalType } from '../../types';

interface SignalBadgeProps {
  signal: SignalType | string;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
}

export const SignalBadge: React.FC<SignalBadgeProps> = ({
  signal,
  size = 'md',
  showDot = true,
}) => {
  const getStyles = () => {
    switch (signal) {
      case 'BULLISH':
      case 'STRONG_BUY':
      case 'BUY':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
          label: 'BULLISH',
        };
      case 'POSITIVE':
      case 'ACCUMULATE':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
          label: 'POSITIVE',
        };
      case 'NEUTRAL':
      case 'HOLD':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
          label: 'NEUTRAL',
        };
      case 'WATCH':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
          label: 'WATCH',
        };
      case 'WARNING':
      case 'REDUCE':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          dot: 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]',
          label: 'WARNING',
        };
      case 'BEARISH':
      case 'SELL':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          dot: 'bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]',
          label: 'BEARISH',
        };
      case 'DATA UNAVAILABLE':
        return {
          bg: 'bg-slate-500/10 border-slate-500/30 text-slate-400',
          dot: 'bg-slate-400',
          label: 'DATA UNAVAILABLE',
        };
      default:
        return {
          bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
          dot: 'bg-blue-400',
          label: signal,
        };
    }
  };

  const style = getStyles();

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold tracking-wide',
    lg: 'text-sm px-3.5 py-1.5 font-bold tracking-wider',
  };

  return (
    <span
      id={`signal-badge-${signal.toLowerCase()}`}
      className={`inline-flex items-center gap-1.5 rounded-full border ${style.bg} ${sizeClasses[size]} whitespace-nowrap`}
    >
      {showDot && (
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot} animate-pulse`} />
      )}
      <span>{style.label}</span>
    </span>
  );
};
