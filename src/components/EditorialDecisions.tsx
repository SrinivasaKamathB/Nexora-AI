import React, { useState } from 'react';
import {
  Filter,
  CheckCircle2,
  XCircle,
  Sparkles,
  Sliders,
  ShieldAlert,
  Brain,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { EditorialDecision } from '../types';

interface EditorialDecisionsProps {
  decisions: EditorialDecision[];
}

export const EditorialDecisions: React.FC<EditorialDecisionsProps> = ({ decisions }) => {
  const [filter, setFilter] = useState<'ALL' | 'SELECTED' | 'REJECTED'>('ALL');

  const filteredDecisions = decisions.filter((item) => {
    if (filter === 'SELECTED') return item.decision === 'SELECTED';
    if (filter === 'REJECTED') return item.decision === 'REJECTED';
    return true;
  });

  const selectedCount = decisions.filter((d) => d.decision === 'SELECTED').length;
  const rejectedCount = decisions.filter((d) => d.decision === 'REJECTED').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Editorial Decisions</h2>
              <p className="text-xs text-zinc-400">
                Demonstrating NEXORA’s autonomous filtering: rejecting ~75% of noise to preserve technical quality
              </p>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-2xl border border-zinc-800">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === 'ALL'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            All ({decisions.length})
          </button>
          <button
            onClick={() => setFilter('SELECTED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === 'SELECTED'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Selected ({selectedCount})
          </button>
          <button
            onClick={() => setFilter('REJECTED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filter === 'REJECTED'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Rejected ({rejectedCount})
          </button>
        </div>
      </div>

      {/* Editorial Filter Rationale Alert Box */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3.5 text-xs text-amber-200">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
            Editorial Standards Active
          </h4>
          <p className="leading-relaxed">
            NEXORA AI evaluates candidates across 4 core axes: <strong>Relevance</strong>, <strong>Novelty</strong>, <strong>Technical Significance</strong>, and <strong>Persona Fit</strong>. Topics scoring below 7.5/10 total or lacking technical rigor are automatically rejected to maintain feed density.
          </p>
        </div>
      </div>

      {/* Decision Cards List */}
      <div className="space-y-4">
        {filteredDecisions.map((item) => {
          const isSelected = item.decision === 'SELECTED';

          return (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all shadow-xl backdrop-blur-md ${
                isSelected
                  ? 'bg-zinc-950/90 border-emerald-500/30 hover:border-emerald-500/60'
                  : 'bg-zinc-950/70 border-amber-900/30 hover:border-amber-500/40 opacity-90'
              }`}
            >
              {/* Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-purple-400 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/60">
                    {item.sourceName}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500 font-mono">{item.evaluatedAt}</span>
                </div>

                {/* Decision Badge */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    Score: {item.totalScore}/10
                  </span>
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>SELECTED FOR PUBLICATION</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <XCircle className="w-4 h-4 text-amber-400" />
                      <span>REJECTED BY AI JUDGE</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
                {item.topicTitle}
              </h3>

              {/* 4 Core Score Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800/80">
                <div>
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Relevance
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${(item.relevanceScore / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold font-mono text-zinc-200">
                      {item.relevanceScore}/10
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Novelty
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${(item.noveltyScore / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold font-mono text-zinc-200">
                      {item.noveltyScore}/10
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Technical Depth
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-cyan-500"
                        style={{ width: `${(item.technicalSignificance / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold font-mono text-zinc-200">
                      {item.technicalSignificance}/10
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                    Persona Fit
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-500"
                        style={{ width: `${(item.personaFit / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold font-mono text-zinc-200">
                      {item.personaFit}/10
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Reasoning */}
              <div
                className={`p-3.5 rounded-xl border text-xs leading-relaxed italic ${
                  isSelected
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
                    : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
                }`}
              >
                <div className="font-bold font-mono text-[11px] not-italic uppercase mb-1 flex items-center gap-1.5">
                  <Brain className="w-3.5 h-3.5" />
                  <span>AI Decision Rationale:</span>
                </div>
                "{item.reasoning}"
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
