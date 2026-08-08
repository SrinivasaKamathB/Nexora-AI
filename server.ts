import 'dotenv/config';
import express from 'express';
import path from 'path';
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
const AUTONOMY_INTERVAL_MS = 45 * 1000;
const startTime = Date.now();

app.use(express.json());

// ============================================================
// RUNTIME STATE
// ============================================================

let statePosts = [...INITIAL_POSTS];
let stateDiscovered = [...INITIAL_DISCOVERED_TOPICS];
let stateDecisions = [...INITIAL_EDITORIAL_DECISIONS];
let stateMemory = [...INITIAL_MEMORY_ITEMS];
let stateLogs = [...INITIAL_LOGS];
let stateStats = { ...INITIAL_STATS };

let autonomousStarted = false;
let autonomyTimer: ReturnType<typeof setInterval> | null = null;

// ============================================================
// GEMINI
// ============================================================

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }

  return new GoogleGenAI({ apiKey });
}

// ============================================================
// AUTONOMOUS CYCLE
// ============================================================

async function runAutonomousCycle(topicPrompt?: string) {
  const ai = getGeminiClient();

  let title =
    topicPrompt ||
    'Evaluating Multi-Agent State Synchronization Protocols';

  let postText = '';
  let rationale = '';
  let category:
  | 'AI Agents'
  | 'LLMs'
  | 'Security'
  | 'DevTools'
  | 'Open Source' = 'AI Agents';

  // ----------------------------------------------------------
  // Gemini generation
  // ----------------------------------------------------------

  if (ai) {
    try {
      const prompt = `
You are NEXORA, an autonomous AI Technology Creator.

Evaluate this technical topic:

"${title}"

Generate ONLY valid JSON with these fields:

{
  "title": "high-impact technical title",
  "text": "approximately 250 words of technical analysis",
  "rationale": "why an autonomous AI system selected this topic",
  "category": "one of AI Agents, LLMs, Security, DevTools, Open Source"
}

The text should:
- Be technically useful
- Use NEXORA's editorial voice
- Include bullet points where appropriate
- Include a short code snippet if relevant
- Avoid unsupported claims
- Return ONLY JSON
`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: prompt,
      });

      const rawText = response.text || '';

      const cleanedJson = rawText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanedJson);

      title = parsed.title || title;
      postText = parsed.text || '';
      rationale = parsed.rationale || '';
      const allowedCategories = [
  'AI Agents',
  'LLMs',
  'Security',
  'DevTools',
  'Open Source',
] as const;

category = allowedCategories.includes(parsed.category)
  ? parsed.category
  : 'AI Agents';
    } catch (error) {
      console.error('GEMINI GENERATION ERROR:', error);
    }
  }

  // ----------------------------------------------------------
  // Fallback generation
  // ----------------------------------------------------------

  if (!postText) {
    postText = `
State synchronization across multi-agent clusters requires deterministic event logs and CRDT-based coordination.

Key Architectural Insights:

1. Delta-Based Context Diffing:
Transmitting JSON-patch payloads instead of complete conversation histories can significantly reduce inter-node communication overhead.

2. Conflict-Free Agent Memory:
Conflict resolution mechanisms such as LWW registers can reduce race conditions during parallel sub-agent reasoning.

\`\`\`typescript
interface AgentStatePatch {
  nodeId: string;
  sequence: number;
  patch: Array<{
    op: 'add' | 'replace';
    path: string;
    value: unknown;
  }>;
}
\`\`\`
`.trim();

    rationale =
      'Selected during autonomous run cycle based on technical significance and relevance to multi-agent distributed systems.';
  }

  // ----------------------------------------------------------
  // Create post
  // ----------------------------------------------------------

  const timestamp = Date.now();

  const newPost = {
    id: `p_${timestamp}`,
    topicId: `t-${timestamp}`,
    title,
    createdAt: new Date().toISOString(),
    text: postText,
    rationale,

    sources: [
      {
        name: 'arXiv: Multi-Agent State Synchronization',
        url: 'https://arxiv.org/',
      },
      {
        name: 'GitHub',
        url: 'https://github.com/',
      },
    ],

    tags: [
      'AIAgents',
      'StateSync',
      'DistributedSystems',
      'LLMInfra',
    ],

    category,

    engagement: {
      views: 42,
      likes: 8,
      shares: 2,
      bookmarks: 5,
    },

    status: 'Published' as const,

    memoryHash: `mem_${Math.random()
      .toString(16)
      .substring(2, 9)}`,

    technicalDepthScore: 9.6,
  };

  // ----------------------------------------------------------
  // Update runtime state
  // ----------------------------------------------------------

  statePosts = [newPost, ...statePosts];

  stateStats.postsPublished += 1;
  stateStats.topicsAnalyzed += 3;
  stateStats.topicsRejected += 2;
  stateStats.lastRunTime = 'Just now';
  stateStats.nextRunSeconds = 45;

  // ----------------------------------------------------------
  // Activity log
  // ----------------------------------------------------------

  const newLog = {
    id: `log-${timestamp}`,

    timestamp: new Date().toLocaleTimeString('en-US', {
      hour12: false,
    }),

    step: 'PUBLISH' as const,

    message: `Autonomous cycle completed. Published post: "${title}"`,

    detail: `Persisted to vector memory store ${newPost.memoryHash}`,

    level: 'success' as const,
  };

  stateLogs = [newLog, ...stateLogs];

  console.log(
    `NEXORA autonomous cycle completed: "${title}"`
  );

  return {
    success: true,
    newPost,
    newLog,
    message: 'Autonomous run cycle executed successfully',
  };
}

// ============================================================
// AUTONOMOUS AGENT
// ============================================================

async function startAutonomousAgent() {
  if (autonomousStarted) {
    return;
  }

  autonomousStarted = true;
  stateStats.isAutonomousActive = true;

  console.log('NEXORA autonomous agent started');
  console.log('Autonomous cycle interval: 45 seconds');

  // Run immediately on startup
  try {
    await runAutonomousCycle();
  } catch (error) {
    console.error('Initial autonomous cycle error:', error);
  }

  // Continue every 45 seconds
  autonomyTimer = setInterval(async () => {
    try {
      await runAutonomousCycle();
    } catch (error) {
      console.error('Autonomous cycle error:', error);
    }
  }, AUTONOMY_INTERVAL_MS);
}

// ============================================================
// API ENDPOINTS
// ============================================================

// 1. Initialize agent
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

// 2. Get feed
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

// 3. Get status
app.get('/api/agent/status', (_req, res) => {
  const ai = getGeminiClient();

  res.json({
    serverTime: new Date().toISOString(),

    geminiKeyConfigured: !!ai,

    uptimeSeconds: Math.floor(
      (Date.now() - startTime) / 1000
    ),

    stats: stateStats,
  });
});

// 4. Manually trigger cycle
app.post('/api/agent/run-cycle', async (req, res) => {
  try {
    const { topicPrompt } = req.body || {};

    const result = await runAutonomousCycle(topicPrompt);

    res.json(result);
  } catch (error) {
    console.error('RUN CYCLE ERROR:', error);

    res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Internal server error',
    });
  }
});

// ============================================================
// VITE / PRODUCTION
// ============================================================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import(
      'vite'
    );

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');

    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', async () => {
    console.log(
      `NEXORA AI Express Server running on http://localhost:${PORT}`
    );

    await startAutonomousAgent();
  });
}

startServer();

// Prevent unused-variable warnings while keeping timer reference.
void autonomyTimer;