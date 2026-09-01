import React from 'react';
import {
  TrendingUp,
  Building2,
  MessageSquareText,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from 'lucide-react';
import { AgentOutput } from '../../types';
import { SignalBadge } from '../common/SignalBadge';

interface AgentCardProps {
  agent: AgentOutput;
  onOpenDrawer: (agent: AgentOutput) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, onOpenDrawer }) => {
  const getIcon = () => {
    switch (agent.id) {
      case 'technical':
        return <TrendingUp className="w-5 h-5 text-cyan-400" />;
      case 'fundamental':
        return <Building2 className="w-5 h-5 text-emerald-400" />;
      case 'sentiment':
        return <MessageSquareText className="w-5 h-5 text-amber-400" />;
      case 'risk':
        return <ShieldAlert className="w-5 h-5 text-rose-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getAccentBorder = () => {
    switch (agent.id) {
      case 'technical':
        return 'border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.06)]';
      case 'fundamental':
        return agent.isAvailable === false
          ? 'border-amber-500/40 hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.06)]'
          : 'border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_20px_rgba(16,185,129,0.06)]';
      case 'sentiment':
        return 'border-amber-500/30 hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.06)]';
      case 'risk':
        return 'border-rose-500/30 hover:border-rose-400/60 shadow-[0_0_20px_rgba(244,63,94,0.08)]';
    }
  };

  const getButtonLabel = () => {
    switch (agent.id) {
      case 'technical':
        return 'View Reasoning';
      case 'fundamental':
        return 'View Evidence';
      case 'sentiment':
        return 'View Sources';
      case 'risk':
        return 'View Risk';
      default:
        return 'Inspect Agent';
    }
  };

  return (
    <div
      id={`agent-card-${agent.id}`}
      className={`rounded-2xl p-5 bg-[#0e1626]/90 border ${getAccentBorder()} flex flex-col justify-between transition-all duration-300 relative group overflow-hidden`}
    >
      {/* Top Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Agent Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shadow-inner">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-100 font-mono tracking-tight">
                {agent.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                {agent.isAvailable === false ? (
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                    <AlertTriangle className="w-3 h-3" />
                    Degraded Data
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    {agent.status}
                  </span>
                )}
              </div>
            </div>
          </div>

          <SignalBadge signal={agent.signalLabel} size="sm" />
        </div>

        {/* Confidence & Score Bar */}
        <div className="mb-4 pb-4 border-b border-slate-800/80 space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-medium">Confidence Score</span>
            <span className="font-bold text-slate-200">{agent.confidence}%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${
                agent.confidence >= 80
                  ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                  : agent.confidence >= 65
                  ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                  : agent.confidence >= 50
                  ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                  : 'bg-rose-400'
              }`}
              style={{ width: `${agent.confidence}%` }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {agent.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between"
            >
              <span className="text-[11px] text-slate-400 font-medium truncate">
                {metric.label}
              </span>
              <div className="flex items-center justify-between mt-1">
                <span
                  className={`text-xs font-bold font-mono ${
                    metric.highlight ? 'text-cyan-300' : 'text-slate-200'
                  }`}
                >
                  {metric.value}
                </span>
                {metric.trend === 'up' && (
                  <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                )}
                {metric.trend === 'down' && (
                  <ArrowDownRight className="w-3 h-3 text-rose-400" />
                )}
                {metric.trend === 'neutral' && (
                  <Minus className="w-3 h-3 text-amber-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button
        id={`agent-btn-${agent.id}`}
        onClick={() => onOpenDrawer(agent)}
        className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition-all group-hover:shadow-md"
      >
        <span>{getButtonLabel()}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
