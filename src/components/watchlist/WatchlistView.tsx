import React, { useState } from 'react';
import {
  Eye,
  Sparkles,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Plus,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { WATCHLIST_DATA } from '../../data/mockData';
import { SignalBadge } from '../common/SignalBadge';

interface WatchlistViewProps {
  onAnalyzeStock: (symbol: string, amount: number) => void;
}

export const WatchlistView: React.FC<WatchlistViewProps> = ({ onAnalyzeStock }) => {
  const [filterSignal, setFilterSignal] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = WATCHLIST_DATA.filter((item) => {
    const matchesSearch =
      item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterSignal === 'ALL' || item.aiSignal === filterSignal;
    return matchesSearch && matchesFilter;
  });

  return (
    <div id="watchlist-page" className="p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
              <Eye className="w-6 h-6 text-cyan-400" />
              AI Watchlist & Opportunity Monitor
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Continuous background telemetry scanning multi-agent alpha signals across key equities.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-800/60">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Real-time Sentinel Active</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search watchlist symbols..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto text-xs font-mono">
          {['ALL', 'BULLISH', 'POSITIVE', 'NEUTRAL', 'WARNING'].map((sig) => (
            <button
              key={sig}
              onClick={() => setFilterSignal(sig)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterSignal === sig
                  ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {sig}
            </button>
          ))}
        </div>
      </div>

      {/* Watchlist Table */}
      <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-slate-800 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800 pb-3">
              <th className="pb-3 font-semibold">TICKER</th>
              <th className="pb-3 font-semibold">PRICE</th>
              <th className="pb-3 font-semibold">24H CHANGE</th>
              <th className="pb-3 font-semibold">AI SIGNAL</th>
              <th className="pb-3 font-semibold">CONFIDENCE</th>
              <th className="pb-3 font-semibold">RISK LEVEL</th>
              <th className="pb-3 font-semibold">LAST ANALYZED</th>
              <th className="pb-3 font-semibold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredItems.map((item) => (
              <tr key={item.symbol} className="hover:bg-slate-800/40 transition-colors group">
                <td className="py-4">
                  <div className="font-extrabold text-sm text-slate-100 group-hover:text-cyan-300">
                    {item.symbol}
                  </div>
                  <div className="text-[10px] text-slate-400">{item.name} • {item.sector}</div>
                </td>
                <td className="py-4 font-bold text-slate-100">
                  ₹{item.price.toLocaleString('en-IN')}
                </td>
                <td className="py-4">
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      item.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {item.changePercent >= 0 ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {item.changePercent >= 0 ? '+' : ''}
                    {item.changePercent}%
                  </span>
                </td>
                <td className="py-4">
                  <SignalBadge signal={item.aiSignal} size="sm" />
                </td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-200">{item.confidence}%</span>
                  </div>
                </td>
                <td className="py-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      item.risk === 'Low'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                        : item.risk === 'Moderate'
                        ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                    }`}
                  >
                    {item.risk} Risk
                  </span>
                </td>
                <td className="py-4 text-slate-400 text-[11px]">{item.lastAnalyzed}</td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => onAnalyzeStock(item.symbol.split(' ')[0], 50000)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 text-xs flex items-center gap-1.5 ml-auto transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>Run Committee</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
