import React, { useState } from 'react';
import {
  Activity,
  Terminal,
  Search,
  Brain,
  XCircle,
  CheckCircle2,
  PenTool,
  Save,
  Rocket,
  Play,
  Zap,
  Clock,
  Sparkles,
} from 'lucide-react';
import { AgentActivityLog } from '../types';

interface AgentActivityProps {
  logs: AgentActivityLog[];
  isCycling: boolean;
  onTriggerCycle: () => void;
}

export const AgentActivity: React.FC<AgentActivityProps> = ({
  logs,
  isCycling,
  onTriggerCycle,
}) => {
  const [filterStep, setFilterStep] = useState<string>('ALL');

  const steps = [
    { key: 'DISCOVER', label: '1. Discovering Topics', icon: Search, color: 'text-cyan-400' },
    { key: 'EVALUATE', label: '2. Evaluating Candidates', icon: Brain, color: 'text-purple-400' },
    { key: 'REJECT', label: '3. Rejecting Low-Value', icon: XCircle, color: 'text-amber-400' },
    { key: 'SELECT', label: '4. Selecting High-Value', icon: CheckCircle2, color: 'text-emerald-400' },
    { key: 'GENERATE', label: '5. Generating Post', icon: PenTool, color: 'text-indigo-400' },
    { key: 'MEMORY', label: '6. Updating Memory', icon: Save, color: 'text-cyan-300' },
    { key: 'PUBLISH', label: '7. Publishing to Feed', icon: Rocket, color: 'text-rose-400' },
  ];

  const filteredLogs = logs.filter((log) => {
    if (filterStep === 'ALL') return true;
    return log.step === filterStep;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Autonomous Agent Pipeline</h2>
              <p className="text-xs text-zinc-400">
                Live step-by-step trace of NEXORA’s continuous autonomous creation loop
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onTriggerCycle}
          disabled={isCycling}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30"
        >
          <Zap className={`w-4 h-4 ${isCycling ? 'animate-spin' : 'fill-amber-300 text-amber-300'}`} />
          <span>{isCycling ? 'Loop Active...' : 'Simulate Autonomous Loop'}</span>
        </button>
      </div>

      {/* 7-Step Horizontal Flow Stepper */}
      <div className="p-6 rounded-3xl bg-zinc-950/90 border border-purple-900/30">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-6">
          7-Step Execution Cycle Flow
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {steps.map((stepItem, idx) => {
            const Icon = stepItem.icon;
            const isActive = isCycling && idx === 1; // Highlight during cycle

            return (
              <div
                key={stepItem.key}
                onClick={() => setFilterStep(stepItem.key)}
                className={`relative p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  filterStep === stepItem.key
                    ? 'bg-purple-900/40 border-purple-500/60 shadow-lg shadow-purple-950/80'
                    : 'bg-zinc-900/60 border-zinc-800 hover:border-purple-500/30'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl mx-auto mb-2 flex items-center justify-center bg-zinc-950 border border-zinc-800 ${stepItem.color}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold text-zinc-200 block truncate">
                  {stepItem.label}
                </span>

                {/* Arrow indicator */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-zinc-700 z-10">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Agent Thought Terminal Log */}
      <div className="rounded-3xl bg-zinc-950 border border-purple-900/40 shadow-2xl overflow-hidden font-mono text-xs">
        {/* Terminal Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-purple-400" />
            <span className="font-bold text-zinc-200 text-xs">NEXORA Agent Thought Stream</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-400">
            <button
              onClick={() => setFilterStep('ALL')}
              className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            >
              Reset Filter
            </button>
            <span className="text-emerald-400 font-bold">● Streaming</span>
          </div>
        </div>

        {/* Terminal Window Content */}
        <div className="p-4 space-y-2.5 max-h-96 overflow-y-auto bg-black/60">
          {filteredLogs.map((log) => {
            let badgeBg = 'bg-zinc-800 text-zinc-300';
            if (log.level === 'success') badgeBg = 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60';
            if (log.level === 'warning') badgeBg = 'bg-amber-950/80 text-amber-300 border-amber-800/60';

            return (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-purple-500/30 transition space-y-1"
              >
                <div className="flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeBg}`}>
                      [{log.step}]
                    </span>
                    <span className="text-purple-400 font-semibold">{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-zinc-200 font-sans font-medium text-xs leading-snug">{log.message}</p>
                {log.detail && (
                  <p className="text-zinc-400 text-[11px] font-mono leading-normal pt-1">{log.detail}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
