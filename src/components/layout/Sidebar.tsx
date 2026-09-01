import React from 'react';
import {
  LayoutDashboard,
  Users,
  PieChart,
  Eye,
  Activity,
  FileText,
  History,
  ShieldCheck,
  Settings,
  Sparkles,
  Zap,
} from 'lucide-react';
import { TabType, UserRiskProfile } from '../../types';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  userProfile: UserRiskProfile;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userProfile,
}) => {
  const navItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'committee' as TabType, label: 'AI Committee', icon: Users, badge: 'Core' },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: PieChart },
    { id: 'watchlist' as TabType, label: 'Watchlist', icon: Eye },
    { id: 'signals' as TabType, label: 'Market Signals', icon: Zap },
    { id: 'research' as TabType, label: 'Research & RAG', icon: FileText },
    { id: 'activity' as TabType, label: 'Activity Logs', icon: History },
  ];

  return (
    <aside
      id="main-sidebar"
      className="w-64 flex-shrink-0 bg-[#080d19] border-r border-slate-800/80 flex flex-col justify-between select-none z-30 h-screen sticky top-0"
    >
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/60">
        <div
          onClick={() => onSelectTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
          id="sidebar-brand"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-[1.5px] shadow-[0_0_20px_rgba(56,189,248,0.25)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white font-mono">
                Invest<span className="text-cyan-400">AI</span>
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 font-mono font-semibold border border-cyan-500/20">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              AI Investment Committee
            </p>
          </div>
        </div>

        {/* Live Market Bar */}
        <div className="mt-4 px-3 py-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Markets Open</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold">
            NSE / BSE
          </span>
        </div>
      </div>

      {/* Main Navigation Links */}
      <div className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
          Intelligence Suite
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-item-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(56,189,248,0.1)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${
                    isActive ? 'text-cyan-400' : 'text-slate-400'
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono border border-indigo-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Profile & Risk Section */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-2">
        {/* Risk Profile Card Trigger */}
        <button
          id="sidebar-risk-profile-btn"
          onClick={() => onSelectTab('profile')}
          className={`w-full p-2.5 rounded-xl border transition-all text-left flex items-center justify-between ${
            currentTab === 'profile'
              ? 'bg-indigo-950/40 border-indigo-500/40 text-indigo-200'
              : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-400 leading-tight">
                Risk Profile
              </div>
              <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <span>{userProfile.riskTolerance}</span>
                <span className="text-[10px] font-mono text-cyan-400">
                  ({userProfile.riskScore}/100)
                </span>
              </div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
        </button>

        {/* User Profile Mini Bar */}
        <div className="flex items-center justify-between px-2 pt-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
              IN
            </div>
            <div>
              <div className="text-xs font-medium text-slate-200">Investor One</div>
              <div className="text-[10px] text-slate-400 font-mono">
                ₹4.82L Portfolio
              </div>
            </div>
          </div>
          <button
            id="sidebar-settings-btn"
            onClick={() => onSelectTab('profile')}
            className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            title="Investor Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
