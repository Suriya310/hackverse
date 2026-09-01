import React from 'react';
import { Swords, Check, AlertTriangle, Scale, Sparkles } from 'lucide-react';
import { BullBearCase } from '../../types';

interface BullBearDebateProps {
  bullBear: BullBearCase;
}

export const BullBearDebate: React.FC<BullBearDebateProps> = ({ bullBear }) => {
  return (
    <div id="bull-bear-debate-section" className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
            <Swords className="w-4 h-4 text-cyan-400" />
            Committee Debate & Dialectic Synthesis
          </h3>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Adversarial Review
          </span>
        </div>
        <span className="text-xs text-slate-400 font-mono hidden sm:inline">
          Bull vs Bear Weighting
        </span>
      </div>

      {/* Side-by-Side Debate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* 🐂 Bull Case */}
        <div className="p-5 rounded-2xl bg-[#0c181a]/90 border border-emerald-500/30 shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-emerald-500/20">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🐂</span>
                <div>
                  <h4 className="font-extrabold text-sm text-emerald-400 font-mono">
                    Bull Case Thesis
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Catalysts & Growth Drivers
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">THESIS SCORE</div>
                <div className="text-lg font-black font-mono text-emerald-400">
                  {bullBear.bullCase.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2.5 mt-4 text-xs text-slate-200">
              {bullBear.bullCase.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">
                    ✓
                  </span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-emerald-400 rounded-full"
              style={{ width: `${bullBear.bullCase.score}%` }}
            />
          </div>
        </div>

        {/* 🐻 Bear Case */}
        <div className="p-5 rounded-2xl bg-[#1a0e14]/90 border border-rose-500/30 shadow-lg space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🐻</span>
                <div>
                  <h4 className="font-extrabold text-sm text-rose-400 font-mono">
                    Bear Case Thesis
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Frictional Risks & Downside
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">RISK SCORE</div>
                <div className="text-lg font-black font-mono text-rose-400">
                  {bullBear.bearCase.score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                </div>
              </div>
            </div>

            <ul className="space-y-2.5 mt-4 text-xs text-slate-200">
              {bullBear.bearCase.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] mt-0.5 flex-shrink-0">
                    ✕
                  </span>
                  <span className="leading-relaxed">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-rose-400 rounded-full"
              style={{ width: `${bullBear.bearCase.score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Committee Resolution Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 flex items-center gap-3.5 shadow-md">
        <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 flex-shrink-0">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-mono uppercase font-bold text-indigo-400">
            Committee Resolution & Adjudication
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-100 mt-0.5">
            "{bullBear.resolution}"
          </p>
        </div>
      </div>
    </div>
  );
};
