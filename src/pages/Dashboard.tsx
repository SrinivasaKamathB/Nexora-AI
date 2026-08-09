import React, { useState, useEffect, useCallback } from 'react';
import { NavigationTab, Post, DiscoveredTopic, EditorialDecision, MemoryItem, AgentActivityLog, AgentStats, MonitoredSource, PersonaConfig } from '../types';
import { agentApi } from '../services/api';
import {
  INITIAL_POSTS,
  INITIAL_DISCOVERED_TOPICS,
  INITIAL_EDITORIAL_DECISIONS,
  INITIAL_MEMORY_ITEMS,
  INITIAL_SOURCES,
  INITIAL_LOGS,
  INITIAL_STATS,
  INITIAL_PERSONA,
} from '../data/mockData';

import { TopNav } from '../components/TopNav';
import { Sidebar } from '../components/Sidebar';
import { HeroAgentStatus } from '../components/HeroAgentStatus';
import { Feed } from '../components/Feed';
import { DiscoveryCenter } from '../components/DiscoveryCenter';
import { EditorialDecisions } from '../components/EditorialDecisions';
import { AgentMemory } from '../components/AgentMemory';
import { AgentActivity } from '../components/AgentActivity';
import { SourceCenter } from '../components/SourceCenter';
import { Analytics } from '../components/Analytics';
import { PersonaPanel } from '../components/PersonaPanel';
import { SystemSettings } from '../components/SystemSettings';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCycling, setIsCycling] = useState(false);

  // Core Data States
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [discoveredTopics, setDiscoveredTopics] = useState<DiscoveredTopic[]>(INITIAL_DISCOVERED_TOPICS);
  const [editorialDecisions, setEditorialDecisions] = useState<EditorialDecision[]>(INITIAL_EDITORIAL_DECISIONS);
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>(INITIAL_MEMORY_ITEMS);
  const [sources, setSources] = useState<MonitoredSource[]>(INITIAL_SOURCES);
  const [logs, setLogs] = useState<AgentActivityLog[]>(INITIAL_LOGS);
  const [stats, setStats] = useState<AgentStats>(INITIAL_STATS);
  const [persona, setPersona] = useState<PersonaConfig>(INITIAL_PERSONA);

  // Initialize from backend and keep feed synchronized
useEffect(() => {
  agentApi.initAgent();

  const loadFeed = () => {
    console.log("🔄 FRONTEND FETCHING FEED", new Date().toLocaleTimeString());
    agentApi.getFeed().then((feed) => {
      if (feed.posts && feed.posts.length > 0) {
        setPosts(feed.posts);
      }
    });
  };

  // Load immediately
  loadFeed();

  // Refresh feed every 10 seconds
  const feedTimer = setInterval(loadFeed, 10000);

  return () => clearInterval(feedTimer);
}, []);

  // Trigger Autonomous Cycle
  const handleTriggerCycle = useCallback(async (customPrompt?: string) => {
    if (isCycling) return;
    setIsCycling(true);

    // Add immediate log for DISCOVER
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const log1: AgentActivityLog = {
      id: `log-${Date.now()}-1`,
      timestamp,
      step: 'DISCOVER',
      message: customPrompt ? `Evaluating custom topic prompt: "${customPrompt}"` : 'CRAWLER: Ingesting 5 active research feeds (arXiv, GitHub, HN)...',
      level: 'info',
    };
    setLogs((prev) => [log1, ...prev]);

    try {
      const result = await agentApi.triggerAutonomousCycle(customPrompt);

      if (result.success && result.newPost) {
        setPosts((prev) => [result.newPost!, ...prev]);

        // Add corresponding decision
        const newDecision: EditorialDecision = {
          id: `ed-${Date.now()}`,
          topicTitle: result.newPost.title,
          sourceName: 'arXiv / Live Search',
          relevanceScore: 9.6,
          noveltyScore: 9.4,
          technicalSignificance: 9.8,
          personaFit: 9.5,
          totalScore: 9.6,
          decision: 'SELECTED',
          reasoning: result.newPost.rationale,
          evaluatedAt: 'Just now',
          category: result.newPost.category,
        };
        setEditorialDecisions((prev) => [newDecision, ...prev]);

        // Add memory item
        const newMemory: MemoryItem = {
          id: `mem-${Date.now()}`,
          topic: result.newPost.title,
          publishedPostId: result.newPost.id,
          status: 'Previously covered',
          action: 'Avoid repetition',
          similarityHash: result.newPost.memoryHash,
          lastUpdated: 'Just now',
          relevanceCount: 1,
        };
        setMemoryItems((prev) => [newMemory, ...prev]);

        // Update stats
        setStats((prev) => ({
          ...prev,
          postsPublished: prev.postsPublished + 1,
          topicsAnalyzed: prev.topicsAnalyzed + 3,
          topicsRejected: prev.topicsRejected + 2,
          nextRunSeconds: 600
        }));
      }
    } catch (err) {
      console.error('Cycle trigger error:', err);
    } finally {
      setIsCycling(false);
    }
  }, [isCycling]);

// Autonomous Timer Countdown Display// Autonomous Timer Countdown Display
useEffect(() => {
  if (!stats.isAutonomousActive) return;

  const timer = setInterval(() => {
    setStats((prev) => {
      if (prev.nextRunSeconds <= 1) {
        return {
          ...prev,
          nextRunSeconds: 600,
        };
      }

      return {
        ...prev,
        nextRunSeconds: prev.nextRunSeconds - 1,
      };
    });
  }, 1000);

  return () => clearInterval(timer);
}, [stats.isAutonomousActive]);

// Toggle Autonomous mode
const handleToggleAutonomous = () => {
  setStats((prev) => ({
    ...prev,
    isAutonomousActive: !prev.isAutonomousActive,
  }));
};

  // Reset System Memory State
  const handleResetData = () => {
    setPosts(INITIAL_POSTS);
    setDiscoveredTopics(INITIAL_DISCOVERED_TOPICS);
    setEditorialDecisions(INITIAL_EDITORIAL_DECISIONS);
    setMemoryItems(INITIAL_MEMORY_ITEMS);
    setLogs(INITIAL_LOGS);
    setStats(INITIAL_STATS);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Top Navigation */}
      <TopNav
        stats={stats}
        isCycling={isCycling}
        onTriggerCycle={() => handleTriggerCycle()}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        logs={logs}
        onOpenPersonaModal={() => setActiveTab('persona')}
        onOpenSettings={() => setActiveTab('settings')}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          publishedCount={posts.length}
          rejectedCount={editorialDecisions.filter((d) => d.decision === 'REJECTED').length}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-6 space-y-8 overflow-x-hidden min-w-0">
          {/* Always show Hero Banner on Dashboard tab */}
          {activeTab === 'dashboard' && (
            <>
              <HeroAgentStatus
                stats={stats}
                isCycling={isCycling}
                onTriggerCycle={() => handleTriggerCycle()}
                onToggleAutonomous={handleToggleAutonomous}
                onViewFeed={() => setActiveTab('feed')}
                onViewEditorial={() => setActiveTab('editorial')}
              />

              {/* Feed Preview */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white tracking-tight">Recent Autonomous Publications</h2>
                  <button
                    onClick={() => setActiveTab('feed')}
                    className="text-xs text-purple-400 hover:underline font-medium"
                  >
                    View All {posts.length} Posts →
                  </button>
                </div>

                <Feed
                  posts={posts.slice(0, 2)}
                  isCycling={isCycling}
                  onTriggerCycle={handleTriggerCycle}
                  onViewMemoryItem={() => setActiveTab('memory')}
                />
              </div>

              {/* Editorial Decisions Section Preview */}
              <EditorialDecisions decisions={editorialDecisions.slice(0, 3)} />

              {/* Activity Trace Preview */}
              <AgentActivity
                logs={logs}
                isCycling={isCycling}
                onTriggerCycle={() => handleTriggerCycle()}
              />
            </>
          )}

          {/* AI Feed Tab */}
          {activeTab === 'feed' && (
            <Feed
              posts={posts}
              isCycling={isCycling}
              onTriggerCycle={handleTriggerCycle}
              onViewMemoryItem={() => setActiveTab('memory')}
            />
          )}

          {/* Discovery Center Tab */}
          {activeTab === 'discovery' && (
            <DiscoveryCenter
              discoveredTopics={discoveredTopics}
              onTriggerCycle={handleTriggerCycle}
              isCycling={isCycling}
            />
          )}

          {/* Editorial Decisions Tab */}
          {activeTab === 'editorial' && (
            <EditorialDecisions decisions={editorialDecisions} />
          )}

          {/* Agent Memory Tab */}
          {activeTab === 'memory' && (
            <AgentMemory memoryItems={memoryItems} />
          )}

          {/* Monitored Sources Tab */}
          {activeTab === 'sources' && (
            <SourceCenter sources={sources} />
          )}

          {/* Agent Activity Tab */}
          {activeTab === 'activity' && (
            <AgentActivity
              logs={logs}
              isCycling={isCycling}
              onTriggerCycle={() => handleTriggerCycle()}
            />
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <Analytics stats={stats} />
          )}

          {/* Persona Tab */}
          {activeTab === 'persona' && (
            <PersonaPanel persona={persona} onUpdatePersona={setPersona} />
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <SystemSettings onResetData={handleResetData} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-zinc-950 border-t border-purple-900/20 py-4 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NEXORA AI © 2026 — Autonomous AI Technology Creator</span>
          <span className="font-mono text-purple-400">
          </span>
        </div>
      </footer>
    </div>
  );
};
