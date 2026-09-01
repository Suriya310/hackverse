import React, { useEffect, useState } from 'react';
import {
  TrendingUp,
  Building2,
  MessageSquareText,
  ShieldAlert,
  Loader2,
  CheckCircle2,
  Sparkles,
  Database,
  Cpu,
} from 'lucide-react';

interface AgentExecutionAnimationProps {
  stockSymbol: string;
  onFinished: () => void;
}

export const AgentExecutionAnimation: React.FC<AgentExecutionAnimationProps> = ({
  stockSymbol,
  onFinished,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'Fetching real-time market data & order book ticks', icon: Database, agent: 'Market Feed' },
    { label: 'Technical Agent analyzing momentum, RSI & moving averages', icon: TrendingUp, agent: 'Technical' },
    { label: 'Fundamental Agent retrieving & embedding Q4 filings', icon: Building2, agent: 'Fundamental' },
    { label: 'Sentiment Agent processing media news & analyst notes', icon: MessageSquareText, agent: 'Sentiment' },
    { label: 'Risk Agent evaluating sector concentration & drawdown', icon: ShieldAlert, agent: 'Risk' },
    { label: 'Synthesizing multi-agent committee consensus verdict', icon: Cpu, agent: 'Orchestrator' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            onFinished();
          }, 400);
          return prev;
        }
      });
    }, 450);

    return () => clearInterval(timer);
  }, [onFinished, steps.length]);

  return (
    <div
      id="agent-execution-animation-card"
      className="rounded-3xl p-8 bg-gradient-to-b from-[#0e1628] to-[#080d19] border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.15)] my-6 relative overflow-hidden"
    >
      {/* Background Animated Laser Pulse */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold border border-cyan-500/20">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Multi-Agent Quorum In Progress
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-mono text-slate-100">
            Committee is analyzing <span className="text-cyan-400">{stockSymbol}</span>...
          </h2>
          <p className="text-xs text-slate-400">
            Parallel inference pipelines executing independent analytical validation protocols
          </p>
        </div>

        {/* Multi-Agent Steps Timeline */}
        <div className="space-y-3 pt-2">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isCompleted = activeStep > idx;
            const isCurrent = activeStep === idx;

            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                  isCurrent
                    ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-[1.01]'
                    : isCompleted
                    ? 'bg-slate-900/80 border-slate-800 text-slate-300'
                    : 'bg-slate-950/50 border-slate-900 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 shadow-md'
                        : isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-slate-400">
                      {step.agent}
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-medium ${
                        isCurrent
                          ? 'text-cyan-200 font-semibold'
                          : isCompleted
                          ? 'text-slate-200'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 font-mono text-xs">
                  {isCompleted ? (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Ready</span>
                    </span>
                  ) : isCurrent ? (
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Analyzing</span>
                    </span>
                  ) : (
                    <span className="text-slate-400">Queued</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
