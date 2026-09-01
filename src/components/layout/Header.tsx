import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  X,
  ExternalLink,
} from 'lucide-react';
import { STOCKS_DATABASE } from '../../data/mockData';

interface HeaderProps {
  onSearchStock: (symbol: string) => void;
  isDegraded: boolean;
  onToggleDegraded: (val: boolean) => void;
  onOpenNotifications?: () => void;
  currentStock: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchStock,
  isDegraded,
  onToggleDegraded,
  currentStock,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const stockList = Object.values(STOCKS_DATABASE);
  const filteredStocks = stockList.filter(
    (s) =>
      s.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const notifications = [
    {
      id: 'n1',
      title: 'Committee Report Generated',
      desc: 'TCS multi-agent synthesis completed with WATCH verdict.',
      time: '5m ago',
      type: 'info',
    },
    {
      id: 'n2',
      title: 'Concentration Warning',
      desc: 'IT sector allocation is at 35%, close to maximum 40% threshold.',
      time: '25m ago',
      type: 'warning',
    },
    {
      id: 'n3',
      title: 'Price Breakout Alert',
      desc: 'RELIANCE crossed 50 DMA with +12% volume anomaly.',
      time: '1h ago',
      type: 'success',
    },
  ];

  return (
    <header
      id="main-header"
      className="h-16 border-b border-slate-800/80 bg-[#080d19]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20"
    >
      {/* Left: Global Stock Search Bar */}
      <div className="relative w-80 lg:w-96">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            id="global-stock-search-input"
            type="text"
            placeholder="Search stock symbol or name (e.g. TCS, INFY)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full pl-9 pr-8 py-1.5 bg-slate-900/90 border border-slate-800 focus:border-cyan-500/60 rounded-lg text-xs text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 text-slate-400 hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Search Results Dropdown */}
        {isSearchOpen && (
          <div
            id="search-results-dropdown"
            className="absolute left-0 right-0 mt-2 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800/60"
          >
            <div className="p-2 text-[10px] font-mono text-slate-400 uppercase tracking-wider bg-slate-950/60 flex items-center justify-between">
              <span>Quick Analyzers</span>
              <span>NSE Listed</span>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => {
                    onSearchStock(stock.symbol);
                    setSearchTerm('');
                    setIsSearchOpen(false);
                  }}
                  className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-slate-800/80 transition-colors text-left group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-100 group-hover:text-cyan-400 font-mono">
                        {stock.symbol}
                      </span>
                      <span className="text-[10px] text-slate-400 px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700">
                        {stock.sector}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[200px]">
                      {stock.name}
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-xs font-semibold text-slate-200">
                      ₹{stock.price.toLocaleString('en-IN')}
                    </div>
                    <div
                      className={`text-[10px] font-semibold ${
                        stock.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {stock.changePercent >= 0 ? '+' : ''}
                      {stock.changePercent}%
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Center: Live Mini Tickers Tape */}
      <div className="hidden xl:flex items-center gap-6 text-xs font-mono">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800/80">
          <span className="text-slate-400 font-semibold">NIFTY 50</span>
          <span className="text-slate-200 font-bold">22,480.20</span>
          <span className="text-emerald-400 font-semibold">+0.45%</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800/80">
          <span className="text-slate-400 font-semibold">SENSEX</span>
          <span className="text-slate-200 font-bold">73,890.10</span>
          <span className="text-emerald-400 font-semibold">+0.38%</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800/80">
          <span className="text-slate-400 font-semibold">NIFTY IT</span>
          <span className="text-slate-200 font-bold">38,120.40</span>
          <span className="text-emerald-400 font-semibold">+1.82%</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Degraded Mode Demo Switch (Hackathon Highlight) */}
        <div
          id="degraded-mode-toggle-card"
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all ${
            isDegraded
              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
              : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700'
          }`}
        >
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              id="degraded-mode-checkbox"
              type="checkbox"
              checked={isDegraded}
              onChange={(e) => onToggleDegraded(e.target.checked)}
              className="sr-only"
            />
            <div
              className={`w-7 h-4 rounded-full transition-colors relative flex items-center ${
                isDegraded ? 'bg-amber-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full bg-white transition-transform transform ${
                  isDegraded ? 'translate-x-3.5' : 'translate-x-0.5'
                }`}
              />
            </div>
            <span className="font-mono text-[11px] font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              Demo Degraded Data
            </span>
          </label>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            id="header-notifications-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400"></span>
          </button>

          {showNotifications && (
            <div
              id="notifications-panel"
              className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 p-2 space-y-1"
            >
              <div className="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100">
                  Committee Alerts
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">3 New</span>
              </div>
              <div className="divide-y divide-slate-800/40">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 hover:bg-slate-800/50 rounded-lg text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{n.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div
          id="header-user-avatar"
          className="flex items-center gap-2 pl-2 border-l border-slate-800"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-sm">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-cyan-300 font-bold text-xs">
              IO
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
