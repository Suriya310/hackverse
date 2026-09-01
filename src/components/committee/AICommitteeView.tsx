import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Sliders,
  AlertTriangle,
  FileDown,
  Share2,
  TrendingUp,
  ShieldCheck,
  Building2,
  DollarSign,
  ArrowRight,
  Server,
} from 'lucide-react';
import { AgentOutput, DocumentSource, StockInfo, UserRiskProfile, CommitteeVerdict } from '../../types';
import { getStockAnalysis, STOCKS_DATABASE } from '../../data/mockData';
import { fetchCommitteeAnalysis } from '../../services/apiClient';
import { AgentCard } from './AgentCard';
import { CommitteeVerdictCard } from './CommitteeVerdictCard';
import { PortfolioImpactSimulator } from './PortfolioImpactSimulator';
import { BullBearDebate } from './BullBearDebate';
import { EvidenceSourcesSection } from './EvidenceSourcesSection';
import { AgentReasoningDrawer } from './AgentReasoningDrawer';
import { DocumentViewerModal } from './DocumentViewerModal';
import { AgentExecutionAnimation } from './AgentExecutionAnimation';

interface AICommitteeViewProps {
  currentStockSymbol: string;
  investmentAmount: number;
  userProfile: UserRiskProfile;
  isDegraded: boolean;
  onStockChange: (symbol: string) => void;
  onAmountChange: (amount: number) => void;
  onToggleDegraded: (val: boolean) => void;
}

export const AICommitteeView: React.FC<AICommitteeViewProps> = ({
  currentStockSymbol,
  investmentAmount,
  userProfile,
  isDegraded,
  onStockChange,
  onAmountChange,
  onToggleDegraded,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<AgentOutput | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<DocumentSource | null>(null);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isAiEnhanced, setIsAiEnhanced] = useState(false);

  // State populated from backend API with fallback initial data
  const initial = getStockAnalysis(currentStockSymbol, investmentAmount, userProfile, isDegraded);
  const [agents, setAgents] = useState<AgentOutput[]>(initial.agents);
  const [verdict, setVerdict] = useState<CommitteeVerdict>(initial.verdict);
  const [stock, setStock] = useState<StockInfo>(initial.stock);
  const [sources, setSources] = useState<DocumentSource[]>(initial.sources);

  const runAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await fetchCommitteeAnalysis(
        currentStockSymbol,
        investmentAmount,
        userProfile,
        isDegraded
      );
      setAgents(result.agents);
      setVerdict(result.verdict);
      setStock(result.stock);
      setSources(result.sources);
      setIsAiEnhanced(Boolean(result.aiEnhanced));
    } catch (err) {
      console.error('Failed to analyze via API:', err);
    }
  };

  useEffect(() => {
    runAnalysis();
  }, [currentStockSymbol, investmentAmount, isDegraded]);

  const handleTriggerReanalysis = () => {
    runAnalysis();
  };

  const handleShareReport = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 3000);
  };

  return (
    <div id="ai-committee-page" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-100 font-mono tracking-tight flex items-center gap-2.5">
              <Sparkles className="w-6 h-6 text-cyan-400" />
              AI Investment Committee
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              Active Quorum
            </span>
            {isAiEnhanced ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Gemini 3.7 Synthesized
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Server className="w-3 h-3 text-emerald-400" />
                Express Backend Engine
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Four specialized AI agents independently analyze the opportunity before the committee reaches a conclusion.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            id="re-analyze-btn"
            onClick={handleTriggerReanalysis}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>Re-Run Analysis</span>
          </button>

          <button
            id="share-report-btn"
            onClick={handleShareReport}
            className="px-3.5 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-xs font-semibold text-indigo-300 flex items-center gap-2 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Export Briefing</span>
          </button>
        </div>
      </div>

      {/* Share Notification Toast */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 p-4 rounded-xl bg-indigo-950 border border-indigo-500/40 text-xs font-mono text-indigo-200 shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>InvestAI Committee Dossier copied to clipboard!</span>
        </div>
      )}

      {/* Prominent Question & Stock Banner */}
      <div
        id="user-query-card"
        className="rounded-3xl p-6 bg-gradient-to-r from-[#0c1424] via-[#0f1b33] to-[#0c1424] border border-cyan-500/30 shadow-xl space-y-4"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              Investigator Query Under Review
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white font-mono">
              “Should I invest ₹{investmentAmount.toLocaleString('en-IN')} in {stock.symbol}?”
            </h2>
          </div>

          {/* Stock Quick Info Badge */}
          <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl">
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-slate-100 font-mono">
                  {stock.symbol}
                </span>
                <span className="text-xs font-semibold text-slate-400 font-mono">
                  ₹{stock.price.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-[11px] text-emerald-400 font-mono font-semibold">
                +{stock.changePercent}% today • {stock.sector}
              </div>
            </div>

            {/* Quick Switch Dropdown */}
            <select
              value={currentStockSymbol}
              onChange={(e) => {
                onStockChange(e.target.value);
                setIsAnalyzing(true);
              }}
              className="bg-slate-800 border border-slate-700 text-xs text-cyan-300 font-mono font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              {Object.keys(STOCKS_DATABASE).map((sym) => (
                <option key={sym} value={sym}>
                  {sym}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading Animation during Execution */}
      {isAnalyzing ? (
        <AgentExecutionAnimation
          stockSymbol={stock.symbol}
          onFinished={() => setIsAnalyzing(false)}
        />
      ) : (
        <>
          {/* Degraded Data State Notification (if active) */}
          {isDegraded && (
            <div
              id="degraded-data-alert"
              className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-300 font-mono">
                    ⚠️ Fundamental data temporarily unavailable
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Committee confidence reduced from <span className="font-bold text-slate-200">82% → 67%</span>. The committee will not produce an uncited fundamental conclusion until source data becomes available.
                  </p>
                </div>
              </div>

              <button
                id="retry-analysis-btn"
                onClick={() => {
                  onToggleDegraded(false);
                  setIsAnalyzing(true);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs font-mono transition-colors whitespace-nowrap"
              >
                Retry Analysis
              </button>
            </div>
          )}

          {/* Four Specialized Agent Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Independent Agent Analyses
              </h3>
              <span className="text-xs text-slate-400 font-mono">
                Click any agent for deterministic trace
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onOpenDrawer={(a) => setSelectedAgent(a)}
                />
              ))}
            </div>
          </div>

          {/* Committee Verdict Component */}
          <CommitteeVerdictCard
            verdict={verdict}
            stock={stock}
            investmentAmount={investmentAmount}
          />

          {/* Portfolio Impact Simulator */}
          <PortfolioImpactSimulator
            impact={verdict.portfolioImpact}
            onSimulateAmount={(amt) => {
              onAmountChange(amt);
            }}
          />

          {/* Bull vs Bear Debate */}
          <BullBearDebate bullBear={verdict.bullBear} />

          {/* Evidence & Sources (RAG Section) */}
          <EvidenceSourcesSection
            sources={sources}
            onViewDoc={(doc) => setSelectedDoc(doc)}
          />
        </>
      )}

      {/* Right Drawer for Agent Reasoning */}
      <AgentReasoningDrawer
        agent={selectedAgent}
        onClose={() => setSelectedAgent(null)}
        onViewSourceDoc={(doc) => {
          setSelectedAgent(null);
          setSelectedDoc(doc);
        }}
      />

      {/* Document Viewer Modal for RAG inspection */}
      <DocumentViewerModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
};
