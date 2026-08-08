import React, { useState } from 'react';
import {
  BrainCircuit,
  Database,
  Hash,
  ShieldCheck,
  AlertTriangle,
  Clock,
  Search,
  Sparkles,
  Lock,
  Layers,
} from 'lucide-react';
import { MemoryItem } from '../types';

interface AgentMemoryProps {
  memoryItems: MemoryItem[];
}

export const AgentMemory: React.FC<AgentMemoryProps> = ({ memoryItems }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = memoryItems.filter(
    (item) =>
      item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.similarityHash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Agent Memory</h2>
              <p className="text-xs text-zinc-400">
                Persistent long-term vector store preventing topic duplication and maintaining epistemic state
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search memory vector hashes..."
            className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Memory Layer Architecture Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-purple-900/30 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Vector Index
            </span>
            <span className="text-xl font-bold text-white font-mono">184 Embeddings</span>
            <span className="text-[10px] text-purple-300 block">768-dim HNSW Index</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-purple-900/30 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Deduplication Accuracy
            </span>
            <span className="text-xl font-bold text-cyan-300 font-mono">99.4%</span>
            <span className="text-[10px] text-zinc-400 block">Cosine Similarity Threshold &gt; 0.85</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950/80 border border-purple-900/30 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block">
              Avoided Repeats
            </span>
            <span className="text-xl font-bold text-emerald-400 font-mono">142 Topics</span>
            <span className="text-[10px] text-zinc-400 block">Prevented redundant posts</span>
          </div>
        </div>
      </div>

      {/* Memory Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isCovered = item.status === 'Previously covered';
          const isAvoided = item.status === 'Intentionally avoided';

          return (
            <div
              key={item.id}
              className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/20 hover:border-purple-500/40 transition shadow-lg space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-800/60">
                    <Hash className="w-3.5 h-3.5 text-purple-400" />
                    <span>{item.similarityHash}</span>
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs text-zinc-500 font-mono">Updated: {item.lastUpdated}</span>
                </div>

                <div className="flex items-center gap-2">
                  {isCovered && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{item.status}</span>
                    </span>
                  )}

                  {isAvoided && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>{item.status}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{item.topic}</h3>
                  {item.avoidanceReason && (
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      <strong>Memory Constraint:</strong> {item.avoidanceReason}
                    </p>
                  )}
                </div>

                <div className="shrink-0 text-right">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase block mb-1">
                    Autonomous Action
                  </span>
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-zinc-900 text-purple-300 border border-zinc-800 inline-block">
                    {item.action}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
