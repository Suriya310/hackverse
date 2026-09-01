import React from 'react';
import { History, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { INITIAL_ACTIVITY_LOGS } from '../../data/mockData';
import { SignalBadge } from '../common/SignalBadge';

interface ActivityViewProps {
  onAnalyzeStock: (symbol: string, amount: number) => void;
}

export const ActivityView: React.FC<ActivityViewProps> = ({ onAnalyzeStock }) => {
  return (
    <div id="activity-logs-page" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
              <History className="w-6 h-6 text-indigo-400" />
              Committee Activity & Audit Trail
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Immutable chronological ledger of all multi-agent investment reviews generated for your account.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-xl border border-cyan-800/60">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Audit Trail Verified</span>
        </div>
      </div>

      {/* Logs Table */}
      <div className="p-6 rounded-3xl bg-[#0e1626]/90 border border-slate-800 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="text-slate-400 border-b border-slate-800 pb-3">
              <th className="pb-3 font-semibold">TIMESTAMP</th>
              <th className="pb-3 font-semibold">STOCK SYMBOL</th>
              <th className="pb-3 font-semibold">CAPITAL REVIEWED</th>
              <th className="pb-3 font-semibold">COMMITTEE VERDICT</th>
              <th className="pb-3 font-semibold">CONFIDENCE</th>
              <th className="pb-3 font-semibold">PRIMARY DECISION DRIVER</th>
              <th className="pb-3 font-semibold text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {INITIAL_ACTIVITY_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 transition-colors group">
                <td className="py-4 text-slate-400">{log.timestamp}</td>
                <td className="py-4 font-bold text-sm text-slate-100 group-hover:text-cyan-300">
                  {log.stockSymbol}
                </td>
                <td className="py-4 font-semibold text-slate-200">
                  ₹{log.amount.toLocaleString('en-IN')}
                </td>
                <td className="py-4">
                  <SignalBadge signal={log.verdict} size="sm" />
                </td>
                <td className="py-4">
                  <span className="font-bold text-cyan-300">{log.confidence}%</span>
                </td>
                <td className="py-4 text-slate-300 max-w-xs font-sans text-xs">
                  {log.keyDrivers}
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => onAnalyzeStock(log.stockSymbol, log.amount)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 text-xs flex items-center gap-1.5 ml-auto transition-colors"
                  >
                    <span>Re-examine</span>
                    <ArrowRight className="w-3 h-3" />
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
