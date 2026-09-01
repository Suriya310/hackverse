import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  UserCheck,
  Percent,
  Sliders,
  TrendingUp,
  Info,
} from 'lucide-react';
import { CommitteeVerdict, StockInfo } from '../../types';
import { ConfidenceMeter } from '../common/ConfidenceMeter';
import { SignalBadge } from '../common/SignalBadge';

interface CommitteeVerdictCardProps {
  verdict: CommitteeVerdict;
  stock: StockInfo;
  investmentAmount: number;
}

export const CommitteeVerdictCard: React.FC<CommitteeVerdictCardProps> = ({
  verdict,
  stock,
  investmentAmount,
}) => {
  const getVerdictStyles = (v: string) => {
    switch (v) {
      case 'BUY':
      case 'STRONG_BUY':
        return {
          text: 'text-emerald-400',
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-500/10',
          badge: 'bg-emerald-400',
        };
      case 'WATCH':
      case 'HOLD':
        return {
          text: 'text-amber-400',
          border: 'border-amber-500/40',
          bg: 'bg-amber-500/10',
          badge: 'bg-amber-400',
        };
      case 'WARNING':
      case 'REDUCE':
      case 'SELL':
        return {
          text: 'text-rose-400',
          border: 'border-rose-500/40',
          bg: 'bg-rose-500/10',
          badge: 'bg-rose-400',
        };
      default:
        return {
          text: 'text-cyan-400',
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-500/10',
          badge: 'bg-cyan-400',
        };
    }
  };

  const style = getVerdictStyles(verdict.verdict);

  return (
    <div
      id="committee-verdict-card"
      className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0e1628] via-[#0b101d] to-[#080d19] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.08)] relative overflow-hidden"
    >
      {/* Subtle background radial lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-500/[0.04] rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <div className="px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/20 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Consensus Synthesis
            </div>
            <span className="text-xs text-slate-400 font-mono">
              4 of 4 Agents Quorum
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight mt-2">
            Investment Committee Verdict
          </h2>
        </div>

        {/* Large Verdict Display Box */}
        <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-800 p-3.5 sm:px-6 rounded-2xl shadow-xl">
          <div className="text-right">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Final Recommendation
            </div>
            <div className={`text-2xl sm:text-3xl font-black font-mono tracking-tight ${style.text} flex items-center gap-2 justify-end`}>
              <span>{verdict.verdictLabel}</span>
            </div>
          </div>
          <div className={`w-3.5 h-12 rounded-full ${style.bg} border ${style.border} flex items-center justify-center p-0.5`}>
            <div className={`w-2 h-2 rounded-full ${style.badge} animate-ping`} />
          </div>
        </div>
      </div>

      {/* Confidence Meter Bar */}
      <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-300 font-bold flex items-center gap-1.5">
            <Percent className="w-3.5 h-3.5 text-cyan-400" />
            Weighted Committee Confidence
          </span>
          <span className="text-sm font-extrabold text-cyan-300 font-mono">
            {verdict.confidence}% (High Certainty)
          </span>
        </div>
        <ConfidenceMeter confidence={verdict.confidence} size="md" showLabel={false} />
      </div>

      {/* Split Likes vs Concerns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
        {/* Likes */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              What the Committee Likes
            </h3>
            <span className="text-[10px] font-mono text-emerald-300/80">3 Core Drivers</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-200">
            {verdict.likes.map((like, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="leading-relaxed">{like}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Concerns */}
        <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              What Concerns the Committee
            </h3>
            <span className="text-[10px] font-mono text-amber-300/80">Risk Checks</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-200">
            {verdict.concerns.map((concern, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.8)]" />
                <span className="leading-relaxed">{concern}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Explanation & Personalization Card */}
      <div
        id="why-this-decision-card"
        className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0e1628] to-slate-900/90 border border-indigo-500/30 shadow-lg space-y-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Info className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold text-slate-100 font-mono uppercase tracking-wide">
              Why this decision?
            </h3>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 font-semibold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/60">
            Personalized to You
          </span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed font-sans font-normal">
          {verdict.aiExplanation}
        </p>

        {/* Personalization Applied Tags */}
        <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Personalization Applied:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              Risk Profile: <span className="text-cyan-300 font-bold">{verdict.personalization.riskProfile}</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              Horizon: <span className="text-cyan-300 font-bold">{verdict.personalization.investmentHorizon}</span>
            </div>
            <div className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
              Current IT Exposure: <span className="text-amber-300 font-bold">{verdict.personalization.currentSectorExposure}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
