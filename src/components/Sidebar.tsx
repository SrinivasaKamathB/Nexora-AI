import React from 'react';
import {
  LayoutDashboard,
  Rss,
  Compass,
  Filter,
  BrainCircuit,
  Database,
  Activity,
  BarChart3,
  UserCheck,
  Settings,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  publishedCount: number;
  rejectedCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isMobileOpen,
  onCloseMobile,
  publishedCount,
  rejectedCount,
}) => {
  const navItems: {
    id: NavigationTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'feed', label: 'AI Feed', icon: Rss, badge: publishedCount, badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { id: 'discovery', label: 'Discovery Center', icon: Compass },
    { id: 'editorial', label: 'Editorial Decisions', icon: Filter, badge: rejectedCount, badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { id: 'memory', label: 'Agent Memory', icon: BrainCircuit },
    { id: 'sources', label: 'Monitored Sources', icon: Database },
    { id: 'activity', label: 'Agent Activity', icon: Activity },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'persona', label: 'Persona Profile', icon: UserCheck },
    { id: 'settings', label: 'API & Settings', icon: Settings },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const navContent = (
    <div className="flex flex-col h-full py-4 px-3 space-y-6">
      {/* Sidebar Top Title */}
      <div className="px-3">
        <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-purple-400 uppercase">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Navigation</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                isActive
                  ? 'bg-gradient-to-r from-purple-900/50 via-purple-900/30 to-transparent border border-purple-500/30 text-white shadow-lg shadow-purple-950/50'
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60 hover:border-zinc-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-purple-400' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge !== undefined && (
                <span
                  className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${
                    item.badgeColor || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Autonomous System Card at bottom of sidebar */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-purple-950/40 border border-purple-500/20 text-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-zinc-200">System Mode</span>
          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            ACTIVE
          </span>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
          NEXORA evaluates feeds continuously, publishing top insights without human intervention.
        </p>
        <button
          onClick={() => handleNavClick('activity')}
          className="w-full py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 text-purple-300 font-medium text-[11px] flex items-center justify-center gap-1 transition"
        >
          <span>View Live Activity</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 bg-zinc-950/60 backdrop-blur-md border-r border-purple-900/20 min-h-[calc(100vh-61px)]">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content */}
          <div className="relative w-72 max-w-[80vw] bg-zinc-950 border-r border-purple-900/30 h-full z-10 animate-in slide-in-from-left duration-200">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
