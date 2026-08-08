import React, { useState } from 'react';
import {
  Rss,
  Search,
  Filter,
  Sparkles,
  Zap,
  Plus,
  SlidersHorizontal,
  Bot,
} from 'lucide-react';
import { Post } from '../types';
import { FeedCard } from './FeedCard';

interface FeedProps {
  posts: Post[];
  isCycling: boolean;
  onTriggerCycle: (prompt?: string) => void;
  onViewMemoryItem?: (hash: string) => void;
}

export const Feed: React.FC<FeedProps> = ({
  posts,
  isCycling,
  onTriggerCycle,
  onViewMemoryItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);

  const categories = ['All', 'AI Agents', 'LLMs', 'Security', 'DevTools', 'Open Source'];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    onTriggerCycle(customPrompt.trim());
    setCustomPrompt('');
    setShowCustomModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-950/80 border border-purple-900/30 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Rss className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">AI Generated Feed</h2>
              <p className="text-xs text-zinc-400">
                Live autonomous publications with verified technical sources & AI rationale
              </p>
            </div>
          </div>
        </div>

        {/* Search & Custom Trigger */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search feed, tags, CVEs..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50 transition"
            />
          </div>

          <button
            onClick={() => setShowCustomModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 text-xs font-semibold transition"
          >
            <Plus className="w-4 h-4 text-purple-400" />
            <span className="hidden sm:inline">Inject Seed Topic</span>
          </button>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30 border border-purple-400/40'
                : 'bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Custom Seed Topic Inject Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-zinc-950 border border-purple-500/30 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-400" />
                <h3 className="text-base font-bold text-white">Inject Topic into Autonomous Agent</h3>
              </div>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-zinc-500 hover:text-zinc-300 text-xs font-mono"
              >
                ✕ ESC
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Pass a seed research topic or CVE reference to NEXORA AI. The agent will run its editorial evaluation, check long-term memory for duplicates, and generate a post if scores pass threshold.
            </p>

            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Topic Prompt / Paper Title
                </label>
                <textarea
                  rows={3}
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="e.g. Model Context Protocol security vulnerabilities or DeepSeek-V3 KV cache architecture..."
                  className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-purple-500/50"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCycling}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30"
                >
                  <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>Run Evaluation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-zinc-950/60 border border-zinc-900 text-zinc-400 space-y-3">
          <Sparkles className="w-8 h-8 text-purple-400 mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-zinc-200">No Posts Match Search</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Try adjusting your search query or trigger an autonomous run cycle to discover new technical topics.
          </p>
          <button
            onClick={() => onTriggerCycle()}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition"
          >
            Trigger Autonomous Cycle
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <FeedCard key={post.id} post={post} onViewMemoryItem={onViewMemoryItem} />
          ))}
        </div>
      )}
    </div>
  );
};
