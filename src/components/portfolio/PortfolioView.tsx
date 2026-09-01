import React, { useState } from 'react';
import {
  PieChart as PieChartIcon,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Plus,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { INITIAL_HOLDINGS, PORTFOLIO_PERFORMANCE_HISTORY } from '../../data/mockData';
import { SignalBadge } from '../common/SignalBadge';

interface PortfolioViewProps {
  onAnalyzeStock: (symbol: string, amount: number) => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({ onAnalyzeStock }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '1Y'>('1D');

  const sectorData = [
    { name: 'Technology (IT)', value: 35, color: '#38bdf8' },
    { name: 'Banking & Financials', value: 30, color: '#818cf8' },
    { name: 'Energy & Petrochemicals', value: 20, color: '#34d399' },
    { name: 'Consumer FMCG', value: 15, color: '#fbbf24' },
  ];

  return (
    <div id="portfolio-page" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight">
              My Portfolio
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Verified Demat Sync
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time equity holdings integrated with continuous AI risk telemetry.
          </p>
        </div>

        {/* Portfolio Stats Badge */}
        <div className="flex items-center gap-6 bg-slate-900/90 border border-slate-800 p-3.5 px-5 rounded-2xl">
          <div>
            <span className="text-[11px] font-mono text-slate-400 block uppercase">
              Total Portfolio
            </span>
            <span className="text-xl sm:text-2xl font-black text-white font-mono">
              ₹4,82,500
            </span>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">
              Today's Net Gain
            </span>
            <span className="text-base font-bold text-emerald-400 font-mono flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +₹12,430 (+2.64%)
            </span>
          </div>
        </div>
      </div>

      {/* Top Grid: Performance Area Chart + Sector Allocation Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intraday Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#0e1626]/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-100 font-mono">
                Intraday Portfolio Performance
              </h3>
              <p className="text-xs text-slate-400">
                Live tick equity curve tracking benchmark NIFTY 50
              </p>
            </div>
            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              {(['1D', '1W', '1M', '1Y'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeframe(t)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeframe === t
                      ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PORTFOLIO_PERFORMANCE_HISTORY}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={11} />
                <YAxis
                  domain={['dataMin - 2000', 'dataMax + 2000']}
                  stroke="#475569"
                  fontSize={11}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [`₹${Number(val).toLocaleString('en-IN')}`, 'Portfolio Value']}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#portfolioGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation Donut Chart */}
        <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 font-mono flex items-center gap-2">
                <PieChartIcon className="w-4 h-4 text-cyan-400" />
                Sector Allocation
              </h3>
              <span className="text-[11px] font-mono text-amber-400 font-semibold">
                IT 35% (Watch)
              </span>
            </div>

            <div className="h-44 w-full flex items-center justify-center my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#0b0f19" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid #334155',
                      borderRadius: '0.5rem',
                      fontSize: '11px',
                    }}
                    formatter={(val: any) => [`${val}%`, 'Allocation']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            {sectorData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[11px] text-slate-300 truncate max-w-[140px]">{item.name}</span>
                </div>
                <span className="font-bold text-slate-100">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-slate-800 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-extrabold text-slate-100 font-mono">
              Current Holdings & AI Diagnostics
            </h3>
            <p className="text-xs text-slate-400">
              Hover and click "Ask Committee" to launch instant multi-agent re-assessment on any asset.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">
            5 Active Positions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 pb-2">
                <th className="pb-3 font-semibold">STOCK</th>
                <th className="pb-3 font-semibold">QUANTITY</th>
                <th className="pb-3 font-semibold">AVG PRICE</th>
                <th className="pb-3 font-semibold">CURRENT</th>
                <th className="pb-3 font-semibold">P&L</th>
                <th className="pb-3 font-semibold">AI SIGNAL</th>
                <th className="pb-3 font-semibold text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {INITIAL_HOLDINGS.map((h) => (
                <tr key={h.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-3.5">
                    <div className="font-bold text-sm text-slate-100 group-hover:text-cyan-300">
                      {h.symbol}
                    </div>
                    <div className="text-[10px] text-slate-400">{h.name}</div>
                  </td>
                  <td className="py-3.5 text-slate-200 font-semibold">{h.quantity}</td>
                  <td className="py-3.5 text-slate-300">₹{h.avgPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 text-slate-100 font-bold">₹{h.currentPrice.toLocaleString('en-IN')}</td>
                  <td className="py-3.5">
                    <div className={h.pnl >= 0 ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {h.pnl >= 0 ? '+' : ''}₹{h.pnl.toLocaleString('en-IN')}
                    </div>
                    <div className={`text-[10px] ${h.pnlPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {h.pnlPercent >= 0 ? '+' : ''}{h.pnlPercent}%
                    </div>
                  </td>
                  <td className="py-3.5">
                    <SignalBadge signal={h.aiSignal} size="sm" />
                  </td>
                  <td className="py-3.5 text-right">
                    <button
                      onClick={() => onAnalyzeStock(h.symbol, 50000)}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 text-xs flex items-center gap-1.5 ml-auto transition-colors"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>Ask Committee</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
