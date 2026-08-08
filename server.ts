import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_POSTS,
  INITIAL_DISCOVERED_TOPICS,
  INITIAL_EDITORIAL_DECISIONS,
  INITIAL_MEMORY_ITEMS,
  INITIAL_LOGS,
  INITIAL_STATS,
} from './src/data/mockData.js';

const app = express();
const PORT = 3001;
const startTime = Date.now();

app.use(express.json());

// In-memory runtime state for Express backend
let statePosts = [...INITIAL_POSTS];
let stateDiscovered = [...INITIAL_DISCOVERED_TOPICS];
let stateDecisions = [...INITIAL_EDITORIAL_DECISIONS];
let stateMemory = [...INITIAL_MEMORY_ITEMS];
let stateLogs = [...INITIAL_LOGS];
let stateStats = { ...INITIAL_STATS };

// Helper to initialize Gemini lazily if API key is present
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

// ==================== API ENDPOINTS ====================

// 1. POST /api/agent/init
app.post('/api/agent/init', (req, res) => {
  const { agentId } = req.body || {};
  res.json({
    agentId: agentId || 'nexora-core-01',
    name: 'NEXORA AI',
    status: 'ACTIVE',
    isAutonomousActive: stateStats.isAutonomousActive,
    message: 'NEXORA Autonomous Agent Session Initialized',
    timestamp: new Date().toISOString(),
  });
});

// 2. GET /api/agent/feed?agentId=abc-123
app.get('/api/agent/feed', (req, res) => {
  const { agentId } = req.query;
  res.json({
    agentId: agentId || 'nexora-core-01',
    posts: statePosts,
    discoveredTopics: stateDiscovered,
    editorialDecisions: stateDecisions,
    memoryItems: stateMemory,
    logs: stateLogs,
    stats: stateStats,
  });
});

// 3. GET /api/agent/status
app.get('/api/agent/status', (req, res) => {
  const ai = getGeminiClient();
  let autonomousStarted = false;
let autonomyTimer: ReturnType<typeof setInterval> | null = null;

const AUTONOMY_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

async function runAutonomousCycle(topicPrompt?: string) {
  const response = await fetch(`http://localhost:${PORT}/api/agent/run-cycle`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topicPrompt }),
  });

  if (!response.ok) {
    throw new Error(`Autonomous cycle failed: HTTP ${response.status}`);
  }

  return await response.json();
}

async function startAutonomousAgent() {
  if (autonomousStarted) return;

  autonomousStarted = true;
  stateStats.isAutonomousActive = true;

  console.log('NEXORA autonomous agent started');

  await runAutonomousCycle();

  autonomyTimer = setInterval(async () => {
    try {
      await runAutonomousCycle();
    } catch (error) {
      console.error('Autonomous cycle error:', error);
    }
  }, AUTONOMY_INTERVAL_MS);
}
  res.json({
    serverTime: new Date().toISOString(),
    geminiKeyConfigured: !!ai,
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    stats: stateStats,
  });
});

// 4. POST /api/agent/run-cycle
app.post('/api/agent/run-cycle', async (req, res) => {
  try {
    const { topicPrompt } = req.body || {};
    const ai = getGeminiClient();

    let title = topicPrompt || 'Evaluating Multi-Agent State Synchronization Protocols';
    let postText = '';
    let rationale = '';
    let category: any = 'AI Agents';

    if (ai) {
      // Use Gemini to generate realistic technical post in NEXORA voice
      try {
        const prompt = `You are NEXORA, an autonomous AI Technology Creator.
Evaluate this topic: "${title}".
Generate a structured JSON output with:
- "title": a high-impact technical title
- "text": a 250-word LinkedIn/X style technical deep-dive with bullet points and a brief code snippet if relevant
- "rationale": why this topic was selected by an autonomous AI system
- "category": one of ["AI Agents", "LLMs", "Security", "DevTools", "Open Source"]

Respond ONLY in valid JSON.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-lite',
          contents: prompt,
        });

        const rawText = response.text || '';
        const cleanedJson = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanedJson);

        title = parsed.title || title;
        postText = parsed.text || '';
        rationale = parsed.rationale || '';
        category = parsed.category || 'AI Agents';
      } catch (genErr) {
        console.error('GEMINI ERROR:', genErr);
      }
    }

    if (!postText) {
      postText = `State synchronization across multi-agent clusters requires deterministic event logs and CRDT structures.

Key Architectural Insights:
1. **Delta-Based Context Diffing**: Transmitting JSON-patch payloads instead of full conversation histories reduces inter-node bandwidth by 92%.
2. **Conflict-Free Agent Memory (CFAM)**: Conflict resolution via LWW-element-set registers prevents race conditions during parallel sub-agent reasoning loops.

\`\`\`typescript
interface AgentStatePatch {
  nodeId: string;
  sequence: number;
  patch: Array<{ op: 'add' | 'replace'; path: string; value: unknown }>;
}
\`\`\``;
      rationale =
        'Selected during autonomous run cycle. High relevance score (9.6/10) for multi-agent distributed systems.';
    }

    const newPostId = `p_${Date.now()}`;
    const newPost = {
      id: newPostId,
      topicId: `t-${Date.now()}`,
      title,
      createdAt: new Date().toISOString(),
      text: postText,
      rationale,
      sources: [
        { name: 'arXiv:2608.10234 (Multi-Agent State Sync)', url: 'https://arxiv.org/abs/2608.10234' },
        { name: 'GitHub - DistributedAgentSync', url: 'https://github.com' },
      ],
      tags: ['AIAgents', 'StateSync', 'DistributedSystems', 'LLMInfra'],
      category,
      engagement: { views: 42, likes: 8, shares: 2, bookmarks: 5 },
      status: 'Published' as const,
      memoryHash: `mem_${Math.random().toString(16).substring(2, 9)}`,
      technicalDepthScore: 9.6,
    };

    // Update state
    statePosts = [newPost, ...statePosts];
    stateStats.postsPublished += 1;
    stateStats.topicsAnalyzed += 3;
    stateStats.topicsRejected += 2;

    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      step: 'PUBLISH' as const,
      message: `Autonomous cycle completed. Published post: "${title}"`,
      detail: `Persisted to vector memory store ${newPost.memoryHash}`,
      level: 'success' as const,
    };
    stateLogs = [newLog, ...stateLogs];

    res.json({
      success: true,
      newPost,
      newLog,
      message: 'Autonomous run cycle executed successfully',
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || 'Internal error' });
  }
});

// ==================== VITE & PRODUCTION SETUP ====================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`NEXORA AI Express Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
