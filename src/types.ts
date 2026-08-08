/**
 * Core type definitions for NEXORA AI - Autonomous AI Technology Creator
 */

export type NavigationTab =
  | 'dashboard'
  | 'feed'
  | 'discovery'
  | 'editorial'
  | 'memory'
  | 'sources'
  | 'activity'
  | 'analytics'
  | 'persona'
  | 'settings';

export type AgentState =
  | 'idle'
  | 'discovering'
  | 'evaluating'
  | 'generating'
  | 'updating_memory'
  | 'publishing'
  | 'paused';

export interface Post {
  id: string;
  topicId: string;
  title: string;
  createdAt: string;
  text: string;
  rationale: string;
  sources: { name: string; url: string }[];
  tags: string[];
  category: 'AI Agents' | 'LLMs' | 'Security' | 'DevTools' | 'Open Source' | 'Hardware';
  engagement: {
    views: number;
    likes: number;
    shares: number;
    bookmarks: number;
  };
  status: 'Published' | 'Draft';
  memoryHash: string;
  technicalDepthScore: number;
}

export interface DiscoveredTopic {
  id: string;
  title: string;
  sourceName: string;
  sourceUrl: string;
  discoveredAt: string;
  status: 'DISCOVERED' | 'ANALYZING' | 'SELECTED' | 'REJECTED';
  summary: string;
  category: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Breaking';
}

export interface EditorialDecision {
  id: string;
  topicTitle: string;
  sourceName: string;
  relevanceScore: number; // 1-10
  noveltyScore: number; // 1-10
  technicalSignificance: number; // 1-10
  personaFit: number; // 1-10
  totalScore: number; // Avg out of 10
  decision: 'SELECTED' | 'REJECTED';
  reasoning: string;
  evaluatedAt: string;
  category: string;
}

export interface MemoryItem {
  id: string;
  topic: string;
  publishedPostId?: string;
  status: 'Previously covered' | 'Intentionally avoided' | 'Core knowledge';
  action: 'Avoid repetition' | 'Allow follow-up' | 'Reference context';
  similarityHash: string;
  lastUpdated: string;
  avoidanceReason?: string;
  relevanceCount: number;
}

export interface MonitoredSource {
  id: string;
  name: string;
  type: 'Official Blog' | 'GitHub' | 'arXiv' | 'Hacker News' | 'Research Paper' | 'Security Bulletin';
  url: string;
  status: 'ACTIVE' | 'SYNCING' | 'PAUSED' | 'DEGRADED';
  lastChecked: string;
  topicsDiscovered: number;
  qualityScore: number; // 1-100
  pingMs: number;
}

export interface AgentActivityLog {
  id: string;
  timestamp: string;
  step: 'DISCOVER' | 'EVALUATE' | 'REJECT' | 'SELECT' | 'GENERATE' | 'MEMORY' | 'PUBLISH';
  message: string;
  detail?: string;
  level: 'info' | 'success' | 'warning' | 'error';
}

export interface AgentStats {
  topicsAnalyzed: number;
  postsPublished: number;
  sourcesMonitored: number;
  topicsRejected: number;
  acceptanceRate: number;
  lastRunTime: string;
  nextRunSeconds: number;
  isAutonomousActive: boolean;
}

export interface PersonaConfig {
  name: string;
  role: string;
  focusAreas: string[];
  traits: {
    technicalDepth: number;
    analyticalLevel: number;
    evidenceDriven: number;
    conciseness: number;
    criticalTone: number;
  };
  systemPrompt: string;
  editorialPhilosophy: string;
}
