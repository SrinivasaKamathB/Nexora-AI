import React from 'react';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Activity,
  PieChart as PieIcon,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { AgentStats } from '../types';

interface AnalyticsProps {
  stats: AgentStats;
}

export const Analytics: React.FC<AnalyticsProps> = ({ stats }) => {
  // Weekly publication history chart data
  const timeSeriesData = [
    { day: 'Mon', published: 8, rejected: 24, analyzed: 32 },
    { day: 'Tue', published: 12, rejected: 38, analyzed: 50 },
    { day: 'Wed', published: 10, rejected: 31, analyzed: 41 },
    { day: 'Thu', published: 15, rejected: 44, analyzed: 59 },
    { day: 'Fri', published: 14, rejected: 40, analyzed: 54 },
    { day: 'Sat', published: 11, rejected: 39, analyzed: 50 },
    { day: 'Sun', published: 14, rejected: 42, analyzed: 56 },
  ];

  // Editorial filter ratio data
  const pieData = [
    { name: 'Posts Published (Pass)', value: stats.postsPublished, color: '#10b981' },
    { name: 'Topics Filtered (Rejected)', value: stats.topicsRejected, color: '#f59e0b' },
  ];

  // Category breakdown
  const categoryData = [
    { category: 'AI Agents', count: 32 },
    { category: 'LLMs', count: 24 },
    { category: 'Security', count: 18 },
    { category: 'DevTools', count: 12 },
    { category: 'Open Source', count: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">System Analytics</h2>
              <p className="text-xs text-zinc-400">
                Metrics evaluating NEXORA’s autonomous publication velocity and filtering efficiency
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 4 Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-1">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Posts Published
          </span>
          <div className="text-3xl font-black text-emerald-400 font-mono">{stats.postsPublished}</div>
          <span className="text-[10px] text-zinc-500 block">Verified technical quality</span>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-1">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Topics Analyzed
          </span>
          <div className="text-3xl font-black text-white font-mono">{stats.topicsAnalyzed}</div>
          <span className="text-[10px] text-zinc-500 block">Raw candidate feed</span>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-1">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Topics Rejected
          </span>
          <div className="text-3xl font-black text-amber-400 font-mono">{stats.topicsRejected}</div>
          <span className="text-[10px] text-zinc-500 block">Noise & duplicate suppression</span>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-1">
          <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
            Acceptance Rate
          </span>
          <div className="text-3xl font-black text-indigo-300 font-mono">{stats.acceptanceRate}%</div>
          <span className="text-[10px] text-zinc-500 block">Strict 75%+ filter ratio</span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Publication vs Rejection Area Chart */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Publication vs Rejection Velocity</h3>
              <p className="text-xs text-zinc-400">Daily breakdown of evaluated research topics</p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2.5 py-1 rounded-lg border border-purple-800/60">
              7-Day Trend
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPublished" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRejected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} tickLine={false} />
                <YAxis stroke="#71717a" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '12px' }}
                  labelStyle={{ color: '#f4f4f5' }}
                />
                <Area type="monotone" dataKey="published" stroke="#10b981" fillOpacity={1} fill="url(#colorPublished)" name="Published" />
                <Area type="monotone" dataKey="rejected" stroke="#f59e0b" fillOpacity={1} fill="url(#colorRejected)" name="Rejected" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Editorial Filter Efficiency Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white">Editorial Efficiency</h3>
            <p className="text-xs text-zinc-400">Published vs Filtered noise</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#3f3f46', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-zinc-900 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Pass Rate (Selected)</span>
              </span>
              <span className="font-bold font-mono text-emerald-400">24.5%</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-zinc-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Rejection Rate (Filtered)</span>
              </span>
              <span className="font-bold font-mono text-amber-400">75.5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
