import React, { useState } from 'react';
import {
  Database,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Clock,
  Radio,
  Sparkles,
  Layers,
} from 'lucide-react';
import { MonitoredSource } from '../types';

interface SourceCenterProps {
  sources: MonitoredSource[];
}

export const SourceCenter: React.FC<SourceCenterProps> = ({ sources: initialSources }) => {
  const [sources, setSources] = useState<MonitoredSource[]>(initialSources);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleRefreshSource = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setSources((prev) =>
        prev.map((s) =>
          s.id === id
            ? {
                ...s,
                lastChecked: 'Just now',
                topicsDiscovered: s.topicsDiscovered + Math.floor(Math.random() * 3) + 1,
                status: 'ACTIVE',
              }
            : s
        )
      );
      setSyncingId(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Monitored Sources</h2>
              <p className="text-xs text-zinc-400">
                Primary research feeds and developer hubs scanned continuously by NEXORA
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => sources.forEach((s) => handleRefreshSource(s.id))}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-semibold transition"
        >
          <RefreshCw className="w-4 h-4 text-purple-400" />
          <span>Refresh All Sources</span>
        </button>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sources.map((src) => {
          const isSyncing = syncingId === src.id;

          return (
            <div
              key={src.id}
              className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/20 hover:border-purple-500/40 transition shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/80 text-purple-300 border border-purple-800/60">
                    {src.type}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                    <span>{src.status}</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{src.name}</h3>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono">
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-500 block">Topics Discovered</span>
                    <span className="text-sm font-bold text-cyan-300">{src.topicsDiscovered}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-zinc-500 block">Quality Score</span>
                    <span className="text-sm font-bold text-emerald-400">{src.qualityScore}/100</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-xs text-zinc-400">
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  <Clock className="w-3 h-3 text-zinc-500" />
                  <span>{src.lastChecked}</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-purple-300 hover:text-white transition"
                    title="Open Source URL"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleRefreshSource(src.id)}
                    disabled={isSyncing}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-[11px] font-semibold transition"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-purple-400' : ''}`} />
                    <span>{isSyncing ? 'Syncing' : 'Sync'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
