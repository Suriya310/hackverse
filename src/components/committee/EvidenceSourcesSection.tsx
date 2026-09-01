import React from 'react';
import {
  FileText,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  Database,
  ArrowRight,
} from 'lucide-react';
import { DocumentSource } from '../../types';

interface EvidenceSourcesSectionProps {
  sources: DocumentSource[];
  onViewDoc: (doc: DocumentSource) => void;
}

export const EvidenceSourcesSection: React.FC<EvidenceSourcesSectionProps> = ({
  sources,
  onViewDoc,
}) => {
  return (
    <div id="evidence-sources-section" className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Evidence & Sources
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              RAG Grounded
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Every AI agent claim is grounded in deterministic vector embeddings of verified filings and transcripts.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Hallucination Guarantee</span>
        </div>
      </div>

      {/* Grid of Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sources.slice(0, 3).map((doc) => (
          <div
            key={doc.id}
            id={`source-card-${doc.id}`}
            className="rounded-2xl p-4 bg-[#0d1424]/90 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Background shimmer */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.02] rounded-full blur-xl pointer-events-none" />

            <div>
              {/* Top metadata */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700/80">
                  {doc.type}
                </span>
                <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <span>{doc.relevance}%</span>
                  <span className="text-[9px] font-normal text-emerald-300">Match</span>
                </div>
              </div>

              {/* Title */}
              <h4 className="font-bold text-sm text-slate-100 font-mono mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                {doc.title}
              </h4>

              {/* Excerpt */}
              <p className="text-xs text-slate-400 italic line-clamp-3 leading-relaxed mb-4">
                "{doc.excerpt}"
              </p>
            </div>

            {/* Bottom Actions & Attribution */}
            <div className="space-y-2.5 pt-3 border-t border-slate-800/80">
              <div className="text-[10px] font-mono text-cyan-400/90 font-medium truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                <span>{doc.citationKey}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => onViewDoc(doc)}
                  className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-[11px] font-semibold text-slate-300 flex items-center justify-center gap-1 transition-colors"
                >
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Open Source</span>
                </button>
                <button
                  onClick={() => onViewDoc(doc)}
                  className="py-1.5 px-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-[11px] font-semibold text-cyan-300 flex items-center justify-center gap-1 transition-colors"
                >
                  <FileText className="w-3 h-3 text-cyan-400" />
                  <span>View Doc</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
