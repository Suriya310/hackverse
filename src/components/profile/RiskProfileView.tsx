import React, { useState } from 'react';
import {
  ShieldCheck,
  User,
  Sliders,
  Sparkles,
  Info,
  CheckCircle2,
  Lock,
  Layers,
  PieChart,
  Percent,
} from 'lucide-react';
import { UserRiskProfile } from '../../types';

interface RiskProfileViewProps {
  userProfile: UserRiskProfile;
  onUpdateProfile: (updated: UserRiskProfile) => void;
}

export const RiskProfileView: React.FC<RiskProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const [tolerance, setTolerance] = useState<'Conservative' | 'Moderate' | 'Aggressive'>(
    userProfile.riskTolerance
  );
  const [horizon, setHorizon] = useState(userProfile.horizon);
  const [maxAlloc, setMaxAlloc] = useState(userProfile.maxAllocation);
  const [selectedSectors, setSelectedSectors] = useState<string[]>(
    userProfile.preferredSectors
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const sectorOptions = [
    'Technology',
    'Banking',
    'Consumer',
    'Energy',
    'Automobile',
    'Pharma',
    'Infrastructure',
  ];

  const handleToggleSector = (sec: string) => {
    if (selectedSectors.includes(sec)) {
      setSelectedSectors(selectedSectors.filter((s) => s !== sec));
    } else {
      setSelectedSectors([...selectedSectors, sec]);
    }
  };

  const handleSave = () => {
    const riskScore = tolerance === 'Conservative' ? 45 : tolerance === 'Moderate' ? 68 : 85;
    onUpdateProfile({
      ...userProfile,
      riskTolerance: tolerance,
      horizon,
      maxAllocation: maxAlloc,
      preferredSectors: selectedSectors,
      riskScore,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div id="risk-profile-page" className="p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
              Your Investor Profile & Risk Mandate
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Configure the personal parameters the AI Investment Committee uses to calibrate all buy/sell/hold verdicts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-800/60">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Active Risk Constraint Engine</span>
        </div>
      </div>

      {/* Why Personalization Matters Callout */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-950/30 via-[#0e1628] to-slate-900 border border-indigo-500/30 shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Info className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold text-slate-100 font-mono">
            Why personalization matters
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
          “Your AI Committee uses your profile and portfolio composition when evaluating investment opportunities. A stock with stellar fundamentals may receive a <strong>WATCH</strong> verdict if your portfolio already carries heavy sector concentration or exceeds your risk ceiling.”
        </p>
      </div>

      {/* Main Settings Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e1626]/90 border border-slate-800 space-y-7 shadow-xl">
        {/* Risk Tolerance */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block">
            1. Risk Tolerance Class
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'Conservative', desc: 'Capital preservation first, low drawdown ceiling.' },
              { id: 'Moderate', desc: 'Balanced growth with sector diversification rules.' },
              { id: 'Aggressive', desc: 'Alpha seeking, higher volatility tolerance.' },
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setTolerance(r.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  tolerance === r.id
                    ? 'bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(6,182,212,0.15)] text-cyan-200'
                    : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-sm font-mono text-slate-100 mb-1 flex items-center justify-between">
                  <span>{r.id}</span>
                  {tolerance === r.id && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  )}
                </div>
                <p className="text-xs text-slate-400">{r.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Investment Horizon */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block">
            2. Investment Horizon
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {['1–3 years', '3–5 years', '5–10 years', '10+ years'].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHorizon(h)}
                className={`py-3 px-4 rounded-xl border text-xs font-mono font-semibold transition-all text-center ${
                  horizon === h
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border-slate-800'
                }`}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        {/* Maximum Single-Stock Allocation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              3. Maximum Single-Stock Allocation Cap
            </label>
            <span className="text-sm font-extrabold text-cyan-300 font-mono bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              {maxAlloc}% of Portfolio
            </span>
          </div>
          <input
            type="range"
            min={10}
            max={40}
            step={5}
            value={maxAlloc}
            onChange={(e) => setMaxAlloc(Number(e.target.value))}
            className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>10% (Strict diversification)</span>
            <span>25% (Standard)</span>
            <span>40% (Concentrated)</span>
          </div>
        </div>

        {/* Preferred Sectors */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono block">
            4. Preferred Sectors
          </label>
          <div className="flex flex-wrap gap-2">
            {sectorOptions.map((sec) => {
              const isSelected = selectedSectors.includes(sec);
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => handleToggleSector(sec)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {sec} {isSelected ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div>
            {savedSuccess && (
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-semibold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4" />
                Profile synchronized with AI Committee!
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs font-mono tracking-wide shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all"
          >
            Save Risk Mandate
          </button>
        </div>
      </div>
    </div>
  );
};
