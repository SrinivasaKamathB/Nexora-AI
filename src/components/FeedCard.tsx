import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Bookmark,
  Eye,
  Heart,
  Brain,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Post } from '../types';

interface FeedCardProps {
  post: Post;
  onViewMemoryItem?: (hash: string) => void;
}

export const FeedCard: React.FC<FeedCardProps> = ({ post, onViewMemoryItem }) => {
  const [copied, setCopied] = useState(false);
  const [isRationaleExpanded, setIsRationaleExpanded] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.engagement.likes);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${post.title}\n\n${post.text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    if (!liked) {
      setLikesCount((prev) => prev + 1);
      setLiked(true);
    } else {
      setLikesCount((prev) => prev - 1);
      setLiked(false);
    }
  };

  return (
    <article className="group relative rounded-2xl bg-zinc-950/80 border border-purple-900/30 hover:border-purple-500/50 p-5 md:p-6 shadow-xl backdrop-blur-md transition-all duration-300">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2">
          {/* Category Pill */}
          <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wider uppercase bg-purple-500/10 text-purple-300 border border-purple-500/30">
            {post.category}
          </span>
          <span className="text-zinc-600">•</span>
          <span className="text-xs font-mono text-zinc-400">{post.createdAt}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>PUBLISHED</span>
          </span>

          <span
            onClick={() => onViewMemoryItem?.(post.memoryHash)}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-800/60 hover:bg-cyan-900/80 cursor-pointer transition"
            title="Click to inspect in Agent Memory"
          >
            <Brain className="w-3 h-3 text-cyan-400" />
            <span>{post.memoryHash}</span>
          </span>
        </div>
      </div>

      {/* Post Title */}
      <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-purple-200 transition-colors">
        {post.title}
      </h3>

      {/* Post Main Body Content */}
      <div className="mt-4 text-zinc-300 text-sm md:text-base leading-relaxed space-y-3 font-normal whitespace-pre-line">
        {post.text}
      </div>

      {/* Topic Tags */}
      <div className="flex flex-wrap gap-1.5 mt-5">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md text-xs font-medium text-purple-300 bg-zinc-900/80 hover:bg-purple-950/60 border border-purple-900/40 transition cursor-pointer"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* AI RATIONALE BOX - Explicitly displaying why the autonomous agent selected this */}
      <div className="mt-5 rounded-xl bg-gradient-to-r from-purple-950/40 via-zinc-900/90 to-indigo-950/30 border border-purple-500/30 p-4 transition-all">
        <button
          onClick={() => setIsRationaleExpanded(!isRationaleExpanded)}
          className="w-full flex items-center justify-between text-xs font-bold text-purple-300 uppercase tracking-wider mb-1 hover:text-purple-200"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            <span>AI Autonomous Rationale</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-500/20 text-purple-200 font-mono">
              Depth: {post.technicalDepthScore}/10
            </span>
          </div>
          {isRationaleExpanded ? (
            <ChevronUp className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          )}
        </button>

        {isRationaleExpanded && (
          <p className="text-xs text-zinc-300 leading-relaxed mt-2 pt-2 border-t border-purple-900/30 font-sans italic">
            "{post.rationale}"
          </p>
        )}
      </div>

      {/* VERIFIED SOURCES SECTION */}
      <div className="mt-4 pt-3 border-t border-zinc-900">
        <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Verified Sources ({post.sources.length}):
        </div>
        <div className="flex flex-wrap gap-2">
          {post.sources.map((src, idx) => (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-purple-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-purple-500/40 transition group/link"
            >
              <ExternalLink className="w-3 h-3 text-purple-400 group-hover/link:translate-x-0.5 transition-transform" />
              <span className="truncate max-w-[200px]">{src.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Engagement & Action Bar */}
      <div className="flex items-center justify-between pt-4 mt-5 border-t border-zinc-900 text-xs text-zinc-400">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition ${
              liked ? 'text-rose-400' : 'hover:text-rose-400'
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-rose-400' : ''}`} />
            <span className="font-mono">{likesCount}</span>
          </button>

          <div className="flex items-center gap-1.5 text-zinc-500" title="Views">
            <Eye className="w-4 h-4" />
            <span className="font-mono">{post.engagement.views}</span>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-500" title="Bookmarks">
            <Bookmark className="w-4 h-4" />
            <span className="font-mono">{post.engagement.bookmarks}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-medium">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-400" />
                <span>Copy Post</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
