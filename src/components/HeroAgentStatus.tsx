import React from 'react';
import {
  Zap,
  Activity,
  CheckCircle2,
  XCircle,
  Database,
  Clock,
  Sparkles,
  Bot,
  Play,
  Pause,
  ArrowUpRight,
} from 'lucide-react';
import { AgentStats } from '../types';
import { HolographicCore } from './3D/HolographicCore';

interface HeroAgentStatusProps {
  stats: AgentStats;
  isCycling: boolean;
  onTriggerCycle: () => void;
  onToggleAutonomous: () => void;
  onViewFeed: () => void;
  onViewEditorial: () => void;
}

export const HeroAgentStatus: React.FC<HeroAgentStatusProps> = ({
  stats,
  isCycling,
  onTriggerCycle,
  onToggleAutonomous,
  onViewFeed,
  onViewEditorial,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-purple-950/40 border border-purple-500/20 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Col: Main Autonomous Pitch & Actions */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            {/* Mode Tag */}
            <button
              onClick={onToggleAutonomous}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider border transition-all ${
                stats.isAutonomousActive
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                {stats.isAutonomousActive && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    stats.isAutonomousActive ? 'bg-emerald-500' : 'bg-amber-500'
                  }`}
                ></span>
              </span>
              <span>
                {stats.isAutonomousActive ? 'AUTONOMOUS MODE ACTIVE' : 'AUTONOMOUS MODE PAUSED'}
              </span>
              {stats.isAutonomousActive ? (
                <Pause className="w-3 h-3 ml-1 text-emerald-400" />
              ) : (
                <Play className="w-3 h-3 ml-1 text-amber-400" />
              )}
            </button>

            <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              Next cycle: <span className="text-purple-300 font-bold">{stats.nextRunSeconds}s</span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                NEXORA <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">AI</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl font-medium text-purple-300 mt-1">
              Autonomous AI Technology Creator
            </p>
            <p className="text-sm md:text-base text-zinc-300 mt-2 font-mono tracking-wide">
              "Discovers. Decides. Creates. Publishes."
            </p>
          </div>

          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-xl">
            NEXORA scans technical research, arXiv preprints, GitHub trends, and security blogs.
            It exercises strict editorial filtering, retains persistent memory to avoid duplicates,
            and publishes verified technical insights autonomously.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onTriggerCycle}
              disabled={isCycling}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                isCycling
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-500/30'
                  : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 active:scale-95'
              }`}
            >
              <Zap className={`w-4 h-4 ${isCycling ? 'animate-spin' : 'fill-amber-300 text-amber-300'}`} />
              <span>{isCycling ? 'Executing Autonomous Loop...' : 'Trigger Autonomous Cycle Now'}</span>
            </button>

            <button
              onClick={onViewFeed}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900/90 border border-purple-500/20 hover:border-purple-500/50 text-zinc-200 text-xs font-semibold hover:bg-zinc-800 transition"
            >
              <span>View Generated Feed</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-purple-400" />
            </button>
          </div>
        </div>

        {/* Right Col: 3D Holographic Visual Command Center */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          <div className="relative w-full max-w-sm h-64 md:h-72">
            <HolographicCore isCycling={isCycling} />
            
            {/* Overlay Status Pill on top of 3D Canvas */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-zinc-950/80 border border-purple-500/30 text-[11px] font-mono text-purple-300 backdrop-blur-md flex items-center gap-2 shadow-xl whitespace-nowrap">
              <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Agent Memory: 184 Vector Hashes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-8 pt-6 border-t border-purple-900/30">
        <div
          onClick={onViewEditorial}
          className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/30 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Topics Analyzed</span>
            <Activity className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{stats.topicsAnalyzed}</div>
          <span className="text-[10px] text-zinc-500">Live arXiv & GitHub feed</span>
        </div>

        <div
          onClick={onViewFeed}
          className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-purple-500/30 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Posts Published</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{stats.postsPublished}</div>
          <span className="text-[10px] text-zinc-500">Verified editorial quality</span>
        </div>

        <div
          onClick={onViewEditorial}
          className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/30 transition cursor-pointer group"
        >
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Topics Rejected</span>
            <XCircle className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{stats.topicsRejected}</div>
          <span className="text-[10px] text-zinc-500">Filtered low-value fluff</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/30 transition group">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Sources Monitored</span>
            <Database className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">{stats.sourcesMonitored}</div>
          <span className="text-[10px] text-zinc-500">100% active sources</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/30 transition group col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs mb-1">
            <span>Acceptance Rate</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-indigo-300 font-mono">{stats.acceptanceRate}%</div>
          <span className="text-[10px] text-zinc-500">Selective 75%+ rejection</span>
        </div>
      </div>
    </div>
  );
};
