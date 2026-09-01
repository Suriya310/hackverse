import React, { useState } from 'react';
import {
  FileText,
  Database,
  Search,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Layers,
  Sparkles,
  Send,
  Loader2,
  Bot,
} from 'lucide-react';
import { TCS_EVIDENCE_DOCS } from '../../data/mockData';
import { DocumentSource } from '../../types';
import { DocumentViewerModal } from '../committee/DocumentViewerModal';
import { queryRAGRepository } from '../../services/apiClient';

export const ResearchView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentSource | null>(null);
  
  // RAG query state
  const [ragPrompt, setRagPrompt] = useState('');
  const [isQueryingRAG, setIsQueryingRAG] = useState(false);
  const [ragResult, setRagResult] = useState<{ answer: string; matchedCitations: string[] } | null>(null);

  const docs = TCS_EVIDENCE_DOCS;
  const filtered = docs.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAskRAG = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ragPrompt.trim() || isQueryingRAG) return;

    setIsQueryingRAG(true);
    try {
      const res = await queryRAGRepository(ragPrompt);
      setRagResult(res);
    } catch (err) {
      console.error('RAG query failed:', err);
    } finally {
      setIsQueryingRAG(false);
    }
  };

  return (
    <div id="research-rag-page" className="p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
              <Database className="w-6 h-6 text-cyan-400" />
              RAG Financial Research Repository
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time vector index containing verified SEBI disclosures, quarterly audited earnings reports, and management call transcripts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/60">
          <ShieldCheck className="w-4 h-4" />
          <span>Vector Database Synchronized</span>
        </div>
      </div>

      {/* Interactive RAG Vector Query Engine Box */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#0c1424] via-[#0f1b33] to-[#0c1424] border border-cyan-500/30 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Semantic Vector Search & Citations Engine</span>
        </div>

        <form onSubmit={handleAskRAG} className="flex gap-2">
          <input
            type="text"
            value={ragPrompt}
            onChange={(e) => setRagPrompt(e.target.value)}
            placeholder="Ask anything about filings: e.g. 'What was the BFSI deal volume growth and operating margin in Q3?'"
            className="flex-1 px-4 py-3 bg-slate-900/90 border border-slate-700/80 rounded-2xl text-xs sm:text-sm font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors"
          />
          <button
            type="submit"
            disabled={isQueryingRAG || !ragPrompt.trim()}
            className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 transition-colors shadow-lg cursor-pointer"
          >
            {isQueryingRAG ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>Query RAG</span>
          </button>
        </form>

        {ragResult && (
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 space-y-2 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400">
              <Bot className="w-4 h-4 text-cyan-400" />
              <span>Verified RAG Answer:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed">
              {ragResult.answer}
            </p>
            {ragResult.matchedCitations && ragResult.matchedCitations.length > 0 && (
              <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-cyan-400 border-t border-slate-800">
                <span className="text-slate-400">Referenced Citations:</span>
                {ragResult.matchedCitations.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/80 font-bold cursor-pointer hover:underline"
                    onClick={() => {
                      const found = docs.find((d) => d.citationKey === c);
                      if (found) setSelectedDoc(found);
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter and Document Archive */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search filings, transcripts, disclosures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <span className="text-xs font-mono text-slate-400">
            Showing {filtered.length} of {docs.length} indexed documents
          </span>
        </div>

        {/* Grid of Documents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-[#0e1626]/90 border border-slate-800/80 hover:border-cyan-500/40 transition-all space-y-3 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-cyan-300 border border-slate-700">
                    {doc.type}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {doc.date}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-100 font-mono">
                  {doc.title}
                </h3>
                <p className="text-xs text-slate-400 italic line-clamp-3 mt-2 leading-relaxed">
                  "{doc.excerpt}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-cyan-400">
                  {doc.citationKey}
                </span>
                <button
                  onClick={() => setSelectedDoc(doc)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Read Full Filing</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <DocumentViewerModal
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
};

