import React from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  TrendingUp,
  Building2,
  MessageSquareText,
  ShieldAlert,
  Clock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { AgentOutput, DocumentSource } from '../../types';
import { SignalBadge } from '../common/SignalBadge';

interface AgentReasoningDrawerProps {
  agent: AgentOutput | null;
  onClose: () => void;
  onViewSourceDoc: (doc: DocumentSource) => void;
}

export const AgentReasoningDrawer: React.FC<AgentReasoningDrawerProps> = ({
  agent,
  onClose,
  onViewSourceDoc,
}) => {
  if (!agent) return null;

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

  return (
    <div
      id="agent-reasoning-drawer-backdrop"
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-end animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="agent-reasoning-drawer-panel"
        className="w-full max-w-xl bg-[#090e1a] border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl overflow-hidden animate-slideInRight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800/80 bg-slate-950/60 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-lg">
              {getIcon()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-slate-100 font-mono">
                  {agent.name} Reasoning
                </h2>
                <SignalBadge signal={agent.signalLabel} size="sm" />
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {agent.role}
              </p>
            </div>
          </div>
          <button
            id="close-drawer-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-7">
          {/* Agent Conclusion Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0e1628] border border-cyan-500/20 shadow-lg space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Agent Synthesis & Verdict
              </span>
              <span className="font-mono text-slate-300 font-bold bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                Confidence: {agent.confidence}%
              </span>
            </div>
            <p className="text-sm font-medium text-slate-200 leading-relaxed">
              "{agent.conclusion}"
            </p>
          </div>

          {/* Input Data Matrix */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
              Input Data & Observation Points
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {agent.inputData.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between"
                >
                  <span className="text-[11px] text-slate-400">{item.label}</span>
                  <span className="text-xs font-bold font-mono text-slate-100 mt-1">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Reasoning Trace Timeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Reasoning Trace Timeline
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Deterministic Execution
              </span>
            </div>

            <div className="relative pl-6 border-l border-slate-800 space-y-6">
              {agent.timeline.map((step, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline bullet dot */}
                  <div
                    className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border ${
                      step.status === 'completed'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                        : step.status === 'warning'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : step.status === 'warning' ? (
                      <AlertTriangle className="w-2.5 h-2.5" />
                    ) : (
                      <Clock className="w-2.5 h-2.5" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200 font-mono flex items-center gap-1.5">
                        <span className="text-cyan-400">{idx + 1}.</span> {step.title}
                      </span>
                      {step.timestamp && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {step.timestamp}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RAG Document Sources linked to this agent */}
          {agent.sources && agent.sources.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Attributed RAG Sources
              </h3>
              <div className="space-y-2">
                {agent.sources.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200">
                          {doc.title}
                        </div>
                        <div className="text-[10px] text-cyan-400 font-mono">
                          {doc.citationKey}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => onViewSourceDoc(doc)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      <span>Inspect</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between">
          <div className="text-xs text-slate-400 font-mono">
            Agent Status: <span className="text-emerald-400 font-semibold">{agent.status}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors border border-slate-700"
          >
            Close Trace
          </button>
        </div>
      </div>
    </div>
  );
};
