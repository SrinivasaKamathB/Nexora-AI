import React, { useState } from 'react';
import {
  Cpu,
  Zap,
  Bell,
  Menu,
  X,
  Sparkles,
  Bot,
  Activity,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { AgentStats, AgentActivityLog } from '../types';

interface TopNavProps {
  stats: AgentStats;
  isCycling: boolean;
  onTriggerCycle: () => void;
  onToggleMobileMenu: () => void;
  isMobileMenuOpen: boolean;
  logs: AgentActivityLog[];
  onOpenPersonaModal: () => void;
  onOpenSettings: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  stats,
  isCycling,
  onTriggerCycle,
  onToggleMobileMenu,
  isMobileMenuOpen,
  logs,
  onOpenPersonaModal,
  onOpenSettings,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-purple-900/30 px-4 md:px-6 py-3 transition-all">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={onOpenPersonaModal}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-cyan-500 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition">
              <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              </div>
              {/* Status pulse dot */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-zinc-950"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-300">
                  NEXORA AI
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider bg-purple-500/10 text-purple-300 border border-purple-500/30 uppercase">
                  v2.6 Autonomous
                </span>
              </div>
              <p className="text-xs text-zinc-400 hidden sm:block">
                Autonomous AI Technology Creator
              </p>
            </div>
          </div>
        </div>

        {/* Center: Live Agent Status Banner (Desktop) */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-purple-500/20 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-zinc-200">
              {isCycling ? 'Executing Autonomous Cycle...' : 'Autonomous Mode Active'}
            </span>
          </div>
          <span className="text-zinc-600">|</span>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Next Run: <strong className="text-purple-300 font-mono">{stats.nextRunSeconds}s</strong></span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Manual Run Cycle Trigger */}
          <button
            onClick={onTriggerCycle}
            disabled={isCycling}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
              isCycling
                ? 'bg-purple-900/50 text-purple-300 border border-purple-500/30 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-600/25 hover:shadow-purple-500/40 active:scale-95'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${isCycling ? 'animate-spin text-purple-300' : 'text-amber-300 fill-amber-300'}`} />
            <span className="hidden xs:inline">
              {isCycling ? 'Evaluating...' : 'Trigger Run Cycle'}
            </span>
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-purple-500/30 transition"
              aria-label="Agent Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-zinc-900/95 border border-purple-500/30 rounded-2xl shadow-2xl backdrop-blur-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-400" />
                    <h4 className="text-sm font-semibold text-zinc-100">Live Agent Notifications</h4>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-zinc-500 hover:text-zinc-300 text-xs"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1 text-xs">
                  {logs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 hover:border-purple-500/30 transition"
                    >
                      <div className="flex items-center justify-between text-zinc-400 text-[10px] mb-1">
                        <span className="font-mono text-purple-400 font-medium">[{log.step}]</span>
                        <span>{log.timestamp}</span>
                      </div>
                      <p className="text-zinc-200 font-medium leading-snug">{log.message}</p>
                      {log.detail && (
                        <p className="text-zinc-400 text-[11px] mt-1 leading-normal">{log.detail}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t border-zinc-800 flex justify-between text-[11px] text-zinc-400">
                  <span>System status: Normal</span>
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onOpenSettings();
                    }}
                    className="text-purple-400 hover:underline flex items-center gap-1"
                  >
                    View System Logs <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Persona Avatar */}
          <button
            onClick={onOpenPersonaModal}
            className="flex items-center gap-2 p-1 pl-2.5 pr-1 rounded-full bg-zinc-900 border border-purple-500/20 hover:border-purple-500/50 transition group"
            title="NEXORA Persona Profile"
          >
            <span className="text-xs font-semibold text-zinc-300 group-hover:text-purple-300 hidden sm:inline">
              NEXORA
            </span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 flex items-center justify-center text-white text-xs font-bold shadow-md">
              N
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
