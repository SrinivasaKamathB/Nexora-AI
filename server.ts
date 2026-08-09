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
const AUTONOMY_INTERVAL_MS = 10 * 60 * 1000;
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

// Prevent startup/manual/interval cycles from running concurrently.
let cycleInProgress = false;

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
// NORMALIZATION / DUPLICATE DETECTION
// ============================================================

function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\d{10,}/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function normalizeTitle(value: string): string {
  let normalized = normalizeText(value);

  // Remove the generic title wrapper used by older versions.
  normalized = normalized.replace(
    /^nexora ai technical analysis\s*/,
    ''
  );

  // Remove common generic words so "Technical Analysis X" cannot
  // masquerade as a new topic.
  normalized = normalized
    .replace(/^technical analysis\s*/, '')
    .trim();

  return normalized;
}

function isGenericGeneratedTitle(title: string): boolean {
  const normalized = normalizeText(title);

  return (
    normalized === 'nexora ai technical analysis' ||
    normalized.startsWith('nexora ai technical analysis ')
  );
}

function isDuplicatePost(title: string, text: string): boolean {
  const incomingTitle = normalizeTitle(title);
  const incomingText = normalizeText(text);

  return statePosts.some((post) => {
    const existingTitle = normalizeTitle(post.title);
    const existingText = normalizeText(post.text);

    // Exact topic match.
    if (
      incomingTitle &&
      existingTitle &&
      incomingTitle === existingTitle
    ) {
      return true;
    }

    // Exact normalized content match.
    // This catches the repeated fallback/Gemini response even when
    // the model changes a timestamp or formatting.
    if (
      incomingText &&
      existingText &&
      incomingText === existingText
    ) {
      return true;
    }

    return false;
  });
}

function getUnusedSeedTopics(): string[] {
  const fallbackTopics = [
    'Multi-Agent Memory Architectures',
    'Autonomous AI Agent Planning',
    'LLM Context Management Systems',
    'Agentic Workflow Orchestration',
    'AI Agent Security and Guardrails',
    'Multi-Agent Communication Protocols',
    'Retrieval-Augmented Generation for Agents',
    'Autonomous Code Generation Systems',
  ];

  const usedTopicKeys = new Set(
    statePosts
      .map((post) => normalizeTitle(post.title))
      .filter(Boolean)
  );

  return fallbackTopics.filter(
    (topic) => !usedTopicKeys.has(normalizeTitle(topic))
  );
}

// ============================================================
// AUTONOMOUS CYCLE
// ============================================================

async function runAutonomousCycle(topicPrompt?: string) {
  if (cycleInProgress) {
    console.log(
      'NEXORA cycle skipped: another cycle is already running.'
    );

    return {
      success: false,
      skipped: true,
      message:
        'Autonomous cycle skipped because another cycle is already running',
    };
  }

  cycleInProgress = true;

  try {
    const ai = getGeminiClient();

    // Do not manufacture/publish a post when Gemini is unavailable.
    // That was the source of the repeated fake-looking posts.
    if (!ai) {
      console.error(
        'GEMINI_API_KEY is missing or invalid. No post will be published.'
      );

      return {
        success: false,
        skipped: true,
        aiUnavailable: true,
        message:
          'Gemini is not configured. No post was published.',
      };
    }

    const unusedTopics = getUnusedSeedTopics();

    const selectedSeed =
      topicPrompt?.trim() ||
      unusedTopics[0] ||
      'Emerging AI Agent Engineering';

    let requestedTopic = selectedSeed;
    let title = '';
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

    try {
      const prompt = `
You are NEXORA, an autonomous AI Technology Creator.

Create ONE genuinely new technical publication about this topic:

"${requestedTopic}"

Important uniqueness rules:
- Do not reuse a previous publication.
- Do not use a generic title such as "NEXORA AI Technical Analysis".
- Do not put timestamps, random numbers, IDs, or dates in the title.
- The title must identify the actual technical subject.
- Do not repeat the same explanation used for a previous post.
- If the requested topic is already covered, choose a closely related but distinct technical angle.

Generate ONLY valid JSON with exactly these fields:

{
  "title": "specific technical title with no timestamp or random number",
  "text": "approximately 250 words of technical analysis",
  "rationale": "why an autonomous AI system selected this topic",
  "category": "one of AI Agents, LLMs, Security, DevTools, Open Source"
}

The text should:
- Be technically useful
- Use NEXORA's editorial voice
- Use concise sections or bullet points where appropriate
- Include a short code snippet only if relevant
- Avoid unsupported numerical claims
- Avoid fabricated citations
- Return ONLY JSON
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: prompt,
      });

      const rawText = response.text || '';

      const cleanedJson = rawText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanedJson);

      title =
        typeof parsed.title === 'string'
          ? parsed.title.trim()
          : '';

      postText =
        typeof parsed.text === 'string'
          ? parsed.text.trim()
          : '';

      rationale =
        typeof parsed.rationale === 'string'
          ? parsed.rationale.trim()
          : '';

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

      // If Gemini returns the old generic timestamp-style title,
      // use the actual requested topic instead.
      if (!title || isGenericGeneratedTitle(title)) {
        title = requestedTopic;
      }

      if (!postText) {
        throw new Error(
          'Gemini returned no publication text.'
        );
      }

      if (!rationale) {
        rationale =
          'Selected during an autonomous run cycle based on technical relevance and topic diversity.';
      }
    } catch (error) {
      const status =
        typeof error === 'object' &&
        error !== null &&
        'status' in error
          ? Number((error as { status?: unknown }).status)
          : undefined;

      const message =
        error instanceof Error
          ? error.message
          : String(error);

      console.error(
        'GEMINI GENERATION ERROR:',
        status ? `HTTP ${status}` : '',
        message
      );

      // CRITICAL:
      // Never create a fake fallback publication after an AI failure.
      // In particular, do not publish the same hard-coded text again.
      if (status === 429 || /429|rate.?limit|quota/i.test(message)) {
        return {
          success: false,
          skipped: true,
          rateLimited: true,
          message:
            'Gemini rate limit reached. No post was published.',
        };
      }

      return {
        success: false,
        skipped: true,
        generationFailed: true,
        message:
          'Gemini generation failed. No post was published.',
      };
    }

    // ----------------------------------------------------------
    // Final validation before publishing
    // ----------------------------------------------------------

    if (!title || !postText) {
      return {
        success: false,
        skipped: true,
        generationFailed: true,
        message:
          'Generated publication was empty. No post was published.',
      };
    }

    if (isGenericGeneratedTitle(title)) {
      console.log(
        `Generic generated title rejected: "${title}"`
      );

      return {
        success: false,
        skipped: true,
        duplicate: true,
        message:
          'Generic generated title rejected. No post was published.',
      };
    }

    if (isDuplicatePost(title, postText)) {
      console.log(
        `Duplicate topic/content rejected: "${title}"`
      );

      stateStats.topicsRejected += 1;

      return {
        success: false,
        skipped: true,
        duplicate: true,
        message:
          `Duplicate topic/content rejected: "${title}"`,
      };
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
          name: 'arXiv',
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
    stateStats.lastRunTime = 'Just now';
    stateStats.nextRunSeconds = 600;

    // ----------------------------------------------------------
    // Activity log
    // ----------------------------------------------------------

    const newLog = {
      id: `log-${timestamp}`,

      timestamp: new Date().toLocaleTimeString('en-US', {
        hour12: false,
      }),

      step: 'PUBLISH' as const,

      message:
        `Autonomous cycle completed. Published post: "${title}"`,

      detail:
        `Persisted to vector memory store ${newPost.memoryHash}`,

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
      message:
        'Autonomous run cycle executed successfully',
    };
  } finally {
    cycleInProgress = false;
  }
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
  console.log('Autonomous cycle interval: 600 seconds');

  try {
    await runAutonomousCycle();
  } catch (error) {
    console.error(
      'Initial autonomous cycle error:',
      error
    );
  }

  autonomyTimer = setInterval(async () => {
    try {
      await runAutonomousCycle();
    } catch (error) {
      console.error(
        'Autonomous cycle error:',
        error
      );
    }
  }, AUTONOMY_INTERVAL_MS);
}

// ============================================================
// API ENDPOINTS
// ============================================================

app.post('/api/agent/init', (req, res) => {
  const { agentId } = req.body || {};

  res.json({
    agentId: agentId || 'nexora-core-01',
    name: 'NEXORA AI',
    status: 'ACTIVE',
    isAutonomousActive: stateStats.isAutonomousActive,
    message:
      'NEXORA Autonomous Agent Session Initialized',
    timestamp: new Date().toISOString(),
  });
});

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

app.post('/api/agent/run-cycle', async (req, res) => {
  try {
    const { topicPrompt } = req.body || {};

    const result = await runAutonomousCycle(
      topicPrompt
    );

    if (result?.skipped && !result?.duplicate) {
      const statusCode = result?.rateLimited
        ? 429
        : result?.aiUnavailable
          ? 503
          : 409;

      res.status(statusCode).json(result);
      return;
    }

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
    const distPath = path.join(
      process.cwd(),
      'dist'
    );

    app.use(express.static(distPath));

    app.get('*', (_req, res) => {
      res.sendFile(
        path.join(distPath, 'index.html')
      );
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

void autonomyTimer;
