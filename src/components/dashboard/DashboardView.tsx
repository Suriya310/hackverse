import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Percent,
  ArrowUpRight,
  ArrowRight,
  Search,
  Zap,
  Clock,
  Layers,
  CheckCircle2,
  DollarSign,
} from 'lucide-react';
import { StockInfo, TabType, UserRiskProfile } from '../../types';
import { STOCKS_DATABASE, INITIAL_ACTIVITY_LOGS, MARKET_INTELLIGENCE_DATA } from '../../data/mockData';
import { SignalBadge } from '../common/SignalBadge';

interface DashboardViewProps {
  onNavigateTab: (tab: TabType) => void;
  onAnalyzeStock: (symbol: string, amount: number) => void;
  userProfile: UserRiskProfile;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
  onAnalyzeStock,
  userProfile,
}) => {
  const [selectedStock, setSelectedStock] = useState('TCS');
  const [customAmount, setCustomAmount] = useState('50000');
  const [customPrompt, setCustomPrompt] = useState('Should I invest ₹50,000 in TCS?');

  const exampleQuestions = [
    { text: 'Should I invest ₹50,000 in TCS?', symbol: 'TCS', amount: 50000 },
    { text: 'Should I buy ₹75,000 in Reliance Industries?', symbol: 'RELIANCE', amount: 75000 },
    { text: 'Evaluate ₹1,00,000 addition to HDFC Bank', symbol: 'HDFC', amount: 100000 },
    { text: 'Check portfolio risk if I buy ₹30,000 in Infosys', symbol: 'INFY', amount: 30000 },
  ];

  const handleRunAnalysis = () => {
    const amt = parseInt(customAmount) || 50000;
    onAnalyzeStock(selectedStock, amt);
  };

  const handleSelectExample = (ex: { text: string; symbol: string; amount: number }) => {
    setSelectedStock(ex.symbol);
    setCustomAmount(ex.amount.toString());
    setCustomPrompt(ex.text);
    onAnalyzeStock(ex.symbol, ex.amount);
  };

  return (
    <div id="dashboard-page" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
            Good morning, Investor 👋
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Your AI-powered market intelligence at a glance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-800/60">
          <Sparkles className="w-4 h-4" />
          <span>Committee Status: 4/4 Agents Synchronized</span>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Portfolio Value */}
        <div
          id="kpi-portfolio-value"
          onClick={() => onNavigateTab('portfolio')}
          className="p-5 rounded-2xl bg-[#0e1626]/90 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Portfolio Value</span>
            <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Layers className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-white font-mono">
              ₹4,82,500
            </div>
            <div className="flex items-center gap-1 text-xs font-bold font-mono text-emerald-400 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+₹12,430 (+2.64%)</span>
            </div>
          </div>
        </div>

        {/* 2. Today's P&L */}
        <div
          id="kpi-today-pnl"
          onClick={() => onNavigateTab('portfolio')}
          className="p-5 rounded-2xl bg-[#0e1626]/90 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Today's P&L</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              +₹12,430
            </div>
            <div className="text-xs font-semibold font-mono text-emerald-300 mt-1">
              +2.64% intraday net gain
            </div>
          </div>
        </div>

        {/* 3. Portfolio Risk */}
        <div
          id="kpi-portfolio-risk"
          onClick={() => onNavigateTab('profile')}
          className="p-5 rounded-2xl bg-[#0e1626]/90 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Portfolio Risk</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-100 font-mono">
              {userProfile.riskScore} <span className="text-sm text-slate-400 font-normal">/ 100</span>
            </div>
            <div className="text-xs font-semibold font-mono text-cyan-400 mt-1">
              {userProfile.riskTolerance} Tolerance Mandate
            </div>
          </div>
        </div>

        {/* 4. AI Confidence */}
        <div
          id="kpi-ai-confidence"
          onClick={() => onNavigateTab('committee')}
          className="p-5 rounded-2xl bg-[#0e1626]/90 border border-slate-800/90 hover:border-slate-700 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>AI Confidence</span>
            <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Percent className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-cyan-300 font-mono">
              82%
            </div>
            <div className="text-xs font-semibold font-mono text-slate-400 mt-1">
              Based on latest analysis
            </div>
          </div>
        </div>
      </div>

      {/* “Ask the Investment Committee” Hero Card */}
      <div
        id="ask-investment-committee-card"
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-[#0d162b] via-[#101d3b] to-[#0d162b] border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.12)] space-y-6 relative overflow-hidden"
      >
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-10 w-72 h-72 bg-cyan-500/[0.06] rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Multi-Agent Deliberation
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
            Ask the Investment Committee
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Get transparent technical, fundamental, sentiment, and risk-adjusted verdicts before you invest.
          </p>
        </div>

        {/* Input Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 p-2 bg-slate-950/80 rounded-2xl border border-slate-700/80 shadow-2xl">
          {/* Stock Selector */}
          <div className="md:col-span-4 flex items-center gap-2 px-3 py-2 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono">Asset:</span>
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="w-full bg-transparent text-xs font-mono font-bold text-white focus:outline-none cursor-pointer"
            >
              {Object.values(STOCKS_DATABASE).map((s) => (
                <option key={s.symbol} value={s.symbol} className="bg-slate-900 text-white">
                  {s.symbol} — {s.name.split(' ')[0]} (₹{s.price})
                </option>
              ))}
            </select>
          </div>

          {/* Amount Input */}
          <div className="md:col-span-5 flex items-center gap-2 px-3 py-2 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono">Capital (₹):</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="50000"
              className="w-full bg-transparent text-xs font-mono font-bold text-white focus:outline-none"
            />
          </div>

          {/* Analyze Button */}
          <div className="md:col-span-3">
            <button
              id="analyze-opportunity-btn"
              onClick={handleRunAnalysis}
              className="w-full h-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-xs font-mono tracking-wide flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all cursor-pointer"
            >
              <span>Analyze Opportunity</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Example Questions Pills */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
            Or try these sample institutional inquiries:
          </span>
          <div className="flex flex-wrap gap-2">
            {exampleQuestions.map((eq, i) => (
              <button
                key={i}
                onClick={() => handleSelectExample(eq)}
                className="px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 transition-all flex items-center gap-1.5"
              >
                <span>“{eq.text}”</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Split Section: Market Signals Glimpse + Recent Committee Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Momentum Signals */}
        <div className="p-6 rounded-2xl bg-[#0e1626]/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Market Momentum & Volume Anomalies
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('signals')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-800/60">
            {MARKET_INTELLIGENCE_DATA.momentum.slice(0, 4).map((item) => (
              <div
                key={item.symbol}
                onClick={() => onAnalyzeStock(item.symbol, 50000)}
                className="py-3 flex items-center justify-between hover:bg-slate-800/30 px-2 rounded-lg cursor-pointer transition-colors"
              >
                <div>
                  <span className="font-bold text-xs font-mono text-slate-100">
                    {item.symbol}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-2 font-mono">
                    RSI: {item.rsi}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-semibold text-emerald-400">
                    {item.change}
                  </span>
                  <SignalBadge signal="BULLISH" size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Committee Activity Logs */}
        <div className="p-6 rounded-2xl bg-[#0e1626]/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Recent Committee Deliberations
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('activity')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-mono flex items-center gap-1"
            >
              <span>Audit Log</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {INITIAL_ACTIVITY_LOGS.slice(0, 3).map((log) => (
              <div
                key={log.id}
                onClick={() => onAnalyzeStock(log.stockSymbol, log.amount)}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-slate-700 cursor-pointer transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-slate-100">{log.stockSymbol}</span>
                    <span className="text-slate-400">₹{log.amount.toLocaleString('en-IN')}</span>
                  </div>
                  <SignalBadge signal={log.verdict} size="sm" />
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {log.keyDrivers}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
