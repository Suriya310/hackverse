import React from 'react';
import {
  Zap,
  TrendingUp,
  BarChart3,
  MessageSquareText,
  Activity,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  Flame,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { MARKET_INTELLIGENCE_DATA } from '../../data/mockData';
import { SignalBadge } from '../common/SignalBadge';

interface MarketSignalsViewProps {
  onAnalyzeStock: (symbol: string, amount: number) => void;
}

export const MarketSignalsView: React.FC<MarketSignalsViewProps> = ({
  onAnalyzeStock,
}) => {
  const volumeChartData = [
    { symbol: 'TCS', surge: 18, fill: '#06b6d4' },
    { symbol: 'RELIANCE', surge: 12, fill: '#3b82f6' },
    { symbol: 'ICICI', surge: 14, fill: '#10b981' },
    { symbol: 'BHARTIARTL', surge: 9, fill: '#8b5cf6' },
    { symbol: 'INFY', surge: 8, fill: '#f59e0b' },
  ];

  return (
    <div id="market-signals-page" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
              <Zap className="w-6 h-6 text-cyan-400" />
              Market Intelligence & Alpha Signals
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Institutional signal engine scanning price action, algorithmic order flow anomalies, and news sentiment vectors.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/60">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Tick Engine: 24,000 events/sec</span>
        </div>
      </div>

      {/* Top Cards: Momentum, Volume Anomalies, Sentiment Shifts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Momentum Signals */}
        <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-cyan-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Momentum Signals
              </h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">RSI & MACD</span>
          </div>

          <div className="space-y-3">
            {MARKET_INTELLIGENCE_DATA.momentum.map((item) => (
              <div
                key={item.symbol}
                onClick={() => onAnalyzeStock(item.symbol, 50000)}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-xs font-mono text-slate-100 group-hover:text-cyan-300">
                    {item.symbol}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">RSI: {item.rsi}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {item.change}
                  </span>
                  <SignalBadge
                    signal={item.signal === 'Strong' ? 'BULLISH' : item.signal === 'Positive' ? 'POSITIVE' : 'NEUTRAL'}
                    size="sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volume Anomalies */}
        <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-indigo-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Volume Anomalies
              </h3>
            </div>
            <span className="text-[10px] font-mono text-indigo-400">+3σ Spikes</span>
          </div>

          <div className="space-y-3">
            {MARKET_INTELLIGENCE_DATA.volumeAnomalies.map((item) => (
              <div
                key={item.symbol}
                onClick={() => onAnalyzeStock(item.symbol.split(' ')[0], 50000)}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/40 cursor-pointer transition-all flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-xs font-mono text-slate-100 group-hover:text-indigo-300">
                    {item.symbol}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {item.currentVol} (avg {item.avgVol})
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-1 rounded bg-cyan-950/60 border border-cyan-800/60">
                  {item.volume}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sentiment Shifts */}
        <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-emerald-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Sector Sentiment Shifts
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">NLP Polarity</span>
          </div>

          <div className="space-y-3">
            {MARKET_INTELLIGENCE_DATA.sentimentShifts.map((item) => (
              <div
                key={item.sector}
                className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold text-xs font-mono text-slate-100">
                    {item.sector}
                  </span>
                  <div className="text-[10px] text-slate-400 font-mono">{item.trend}</div>
                </div>
                <span
                  className={`text-xs font-mono font-bold px-2 py-1 rounded border ${
                    item.status === 'positive'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {item.sentiment}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Volume Surge Distribution Chart */}
      <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Institutional Volume Surge vs 20-Day Moving Average (%)
            </h3>
            <p className="text-xs text-slate-400">
              Unusual accumulation footprint detected by quantitative momentum scanners
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">NSE Order Flow</span>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={volumeChartData}>
              <XAxis dataKey="symbol" stroke="#64748b" fontSize={12} />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickFormatter={(val) => `+${val}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  fontFamily: 'monospace',
                }}
                formatter={(val: any) => [`+${val}% volume spike`, 'Unusual Volume']}
              />
              <Bar dataKey="surge" radius={[8, 8, 0, 0]}>
                {volumeChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
