import React, { useState } from 'react';
import {
  Sliders,
  TrendingUp,
  AlertTriangle,
  ShieldAlert,
  PieChart,
  ArrowRight,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { PortfolioImpact } from '../../types';

interface PortfolioImpactSimulatorProps {
  impact: PortfolioImpact;
  onSimulateAmount: (amount: number) => void;
}

export const PortfolioImpactSimulator: React.FC<PortfolioImpactSimulatorProps> = ({
  impact,
  onSimulateAmount,
}) => {
  const [customAmount, setCustomAmount] = useState<number>(impact.investmentAmount);
  const [isEditing, setIsEditing] = useState(false);

  const quickAmounts = [25000, 50000, 100000, 200000];

  const handleApplyAmount = (amt: number) => {
    setCustomAmount(amt);
    onSimulateAmount(amt);
    setIsEditing(false);
  };

  const metrics = [
    {
      label: 'Total Portfolio Value',
      before: `₹${impact.before.portfolioValue.toLocaleString('en-IN')}`,
      after: `₹${impact.after.portfolioValue.toLocaleString('en-IN')}`,
      change: `+₹${impact.investmentAmount.toLocaleString('en-IN')}`,
      isPositive: true,
      icon: TrendingUp,
      beforeVal: 48.2,
      afterVal: 53.2,
      unit: 'L',
    },
    {
      label: 'IT Sector Exposure',
      before: `${impact.before.sectorExposure}%`,
      after: `${impact.after.sectorExposure}%`,
      change: `+${impact.after.sectorExposure - impact.before.sectorExposure}%`,
      isWarning: impact.after.sectorExposure > 40,
      icon: AlertTriangle,
      beforeVal: impact.before.sectorExposure,
      afterVal: impact.after.sectorExposure,
      unit: '%',
    },
    {
      label: 'Portfolio Risk Score',
      before: `${impact.before.riskScore} / 100`,
      after: `${impact.after.riskScore} / 100`,
      change: `+${impact.after.riskScore - impact.before.riskScore} pts`,
      isWarning: impact.after.riskScore > 70,
      icon: ShieldAlert,
      beforeVal: impact.before.riskScore,
      afterVal: impact.after.riskScore,
      unit: '/100',
    },
    {
      label: 'Diversification Score',
      before: `${impact.before.diversification} / 100`,
      after: `${impact.after.diversification} / 100`,
      change: `${impact.after.diversification - impact.before.diversification} pts`,
      isWarning: impact.after.diversification < 70,
      icon: PieChart,
      beforeVal: impact.before.diversification,
      afterVal: impact.after.diversification,
      unit: '/100',
    },
  ];

  return (
    <div
      id="portfolio-impact-simulator"
      className="rounded-3xl p-6 sm:p-7 bg-[#0d1424]/90 border border-slate-800 shadow-xl space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              What happens if I invest ₹{impact.investmentAmount.toLocaleString('en-IN')}?
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Live Simulation
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time multi-dimensional portfolio variance modeling before you execute the trade.
          </p>
        </div>

        {/* Quick Amount Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {quickAmounts.map((amt) => (
            <button
              key={amt}
              onClick={() => handleApplyAmount(amt)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                impact.investmentAmount === amt
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 text-slate-300 hover:text-slate-100 border-slate-700 hover:border-slate-600'
              }`}
            >
              ₹{(amt / 1000).toFixed(0)}k
            </button>
          ))}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors"
          >
            Custom
          </button>
        </div>
      </div>

      {/* Custom Amount Input Bar (if open) */}
      {isEditing && (
        <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs text-slate-300 font-mono">Custom Investment Amount (₹):</span>
          <input
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(Number(e.target.value))}
            className="w-48 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-sm font-mono text-white focus:outline-none focus:border-cyan-500"
            placeholder="e.g. 75000"
          />
          <button
            onClick={() => handleApplyAmount(customAmount)}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs font-mono transition-colors"
          >
            Simulate Trade
          </button>
        </div>
      )}

      {/* Comparison Matrix Table & Visual Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-slate-900/90 border flex flex-col justify-between transition-all ${
                m.isWarning
                  ? 'border-amber-500/30 bg-amber-950/10'
                  : 'border-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400 font-medium truncate">{m.label}</span>
                  <Icon
                    className={`w-4 h-4 ${
                      m.isWarning ? 'text-amber-400' : 'text-cyan-400'
                    }`}
                  />
                </div>

                <div className="flex items-baseline justify-between mt-1">
                  <div>
                    <span className="text-[11px] text-slate-400 block font-mono">
                      BEFORE
                    </span>
                    <span className="text-sm font-bold font-mono text-slate-300">
                      {m.before}
                    </span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400" />

                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block font-mono">
                      AFTER
                    </span>
                    <span
                      className={`text-sm font-extrabold font-mono ${
                        m.isWarning ? 'text-amber-400' : 'text-cyan-300'
                      }`}
                    >
                      {m.after}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delta change pill */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Impact Delta</span>
                <span
                  className={`font-bold px-1.5 py-0.5 rounded ${
                    m.isWarning
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  }`}
                >
                  {m.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
