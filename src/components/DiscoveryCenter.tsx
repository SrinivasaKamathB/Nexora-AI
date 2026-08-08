import React from 'react';
import {
  Compass,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Flame,
  Radio,
} from 'lucide-react';
import { DiscoveredTopic } from '../types';

interface DiscoveryCenterProps {
  discoveredTopics: DiscoveredTopic[];
  onTriggerCycle: (topicTitle?: string) => void;
  isCycling: boolean;
}

export const DiscoveryCenter: React.FC<DiscoveryCenterProps> = ({
  discoveredTopics,
  onTriggerCycle,
  isCycling,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Discovery Center</h2>
              <p className="text-xs text-zinc-400">
                Live stream of raw technology topics ingested by NEXORA’s autonomous crawler
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>5 Feed Crawlers Active</span>
          </span>
        </div>
      </div>

      {/* Discovery Pipeline Progression Visual */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 border border-purple-900/30">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-4">
          Autonomous Ingestion Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 flex items-center justify-center font-bold text-xs">
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">DISCOVERED</h4>
              <p className="text-[11px] text-zinc-400">Crawling arXiv, GitHub, HN & Blogs</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 ml-auto hidden md:block" />
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">ANALYZING</h4>
              <p className="text-[11px] text-zinc-400">Evaluating relevance & novelty scores</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-600 ml-auto hidden md:block" />
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">SELECTED / REJECTED</h4>
              <p className="text-[11px] text-zinc-400">Filtering noise & publishing winners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Discovered Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {discoveredTopics.map((topic) => {
          const isSelected = topic.status === 'SELECTED';
          const isRejected = topic.status === 'REJECTED';
          const isAnalyzing = topic.status === 'ANALYZING';

          return (
            <div
              key={topic.id}
              className="group p-5 rounded-2xl bg-zinc-950/80 border border-purple-900/20 hover:border-purple-500/40 transition shadow-lg space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 px-2.5 py-0.5 rounded-full border border-purple-800/60">
                  {topic.sourceName}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500 font-mono">{topic.discoveredAt}</span>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>SELECTED</span>
                    </span>
                  )}
                  {isRejected && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      <XCircle className="w-3 h-3 text-amber-400" />
                      <span>REJECTED</span>
                    </span>
                  )}
                  {isAnalyzing && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      <Clock className="w-3 h-3 text-cyan-400 animate-spin" />
                      <span>ANALYZING</span>
                    </span>
                  )}
                </div>
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-purple-200 transition">
                {topic.title}
              </h4>

              <p className="text-xs text-zinc-400 leading-relaxed">{topic.summary}</p>

              <div className="flex items-center justify-between pt-3 border-t border-zinc-900 text-xs">
                <a
                  href={topic.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:underline"
                >
                  <span>Inspect Source</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {isAnalyzing && (
                  <button
                    onClick={() => onTriggerCycle(topic.title)}
                    disabled={isCycling}
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-semibold transition"
                  >
                    Force Evaluate
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
