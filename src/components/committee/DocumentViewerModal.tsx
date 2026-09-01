import React from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Download, ExternalLink, Calendar, Percent } from 'lucide-react';
import { DocumentSource } from '../../types';

interface DocumentViewerModalProps {
  document: DocumentSource | null;
  onClose: () => void;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  onClose,
}) => {
  if (!document) return null;

  return (
    <div
      id="document-viewer-modal-backdrop"
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="document-viewer-modal-container"
        className="w-full max-w-3xl bg-[#090e1a] border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                  {document.type}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  RAG Verified Source
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-100 font-mono mt-1">
                {document.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Metadata Bar */}
        <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {document.date}
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <Percent className="w-3.5 h-3.5" />
              Relevance: {document.relevance}%
            </span>
          </div>
          <div className="text-slate-400">
            Citation: <span className="text-slate-200 font-semibold">{document.citationKey}</span>
          </div>
        </div>

        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 font-mono text-xs">
          {/* Highlighted Relevant Excerpt */}
          <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Retrieved Excerpt Grounding AI Claim
            </div>
            <p className="text-slate-200 font-sans text-sm italic leading-relaxed">
              "{document.excerpt}"
            </p>
          </div>

          {/* Full Official Document Body */}
          <div className="space-y-2">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Official Filing Text / Transcript Stream
            </h4>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-slate-300 whitespace-pre-wrap leading-relaxed">
              {document.fullDocText || document.excerpt}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">
            Cryptographically Indexed in Vector Store
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
