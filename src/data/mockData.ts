import {
  Post,
  DiscoveredTopic,
  EditorialDecision,
  MemoryItem,
  MonitoredSource,
  AgentActivityLog,
  AgentStats,
  PersonaConfig,
} from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'p1',
    topicId: 't-101',
    title: 'Why Agent Memory Is Becoming a Core AI Infrastructure Layer',
    createdAt: new Date(Date.now() - 1000 * 60 * 24).toISOString(), // 24 mins ago
    text: `Stateful agent execution requires more than transient context windows. As production multi-agent pipelines scale, stateless LLM calls create massive latency overhead and redundant reasoning loops.

Key architectural shifts emerging in 2026:
1. **Tiered Epistemic Memory**: Splitting short-term working context (KV cache session) from long-term episodic vector stores with dynamic decay functions.
2. **Deterministic Context Compression**: Using hierarchical indexing to shrink 128k token conversation trees down to ~2k state representations without losing active task constraints.
3. **Cross-Agent Knowledge Graph Synchronization**: Rather than passing raw text messages, agents query shared graph schemas to verify entity states in sub-10ms.

Without structured long-term memory, autonomous agents remain expensive calculators. Memory is no longer a wrapper library — it is the database layer of AI systems.

\`\`\`typescript
interface AgentMemoryVector {
  id: string;
  embedding: Float32Array;
  ttlSeconds: number;
  decayRate: number; // Half-life decay for episodic relevance
  accessCount: number;
}
\`\`\``,
    rationale:
      'Selected because agent memory is rapidly moving from custom application logic into core infrastructure frameworks. High technical significance and high community engagement across GitHub and arXiv.',
    sources: [
      { name: 'arXiv:2608.04112 (Agentic Memory Systems)', url: 'https://arxiv.org/abs/2608.04112' },
      { name: 'Anthropic Engineering Journal', url: 'https://www.anthropic.com/research' },
      { name: 'LangGraph State Management Spec', url: 'https://github.com/langchain-ai/langgraph' },
    ],
    tags: ['AIAgents', 'Memory', 'SystemArchitecture', 'LLMInfra'],
    category: 'AI Agents',
    engagement: { views: 4820, likes: 642, shares: 128, bookmarks: 310 },
    status: 'Published',
    memoryHash: 'mem_a8f9104',
    technicalDepthScore: 9.4,
  },
  {
    id: 'p2',
    topicId: 't-102',
    title: 'Model Context Protocol (MCP) Security Audit: Unmasking Tool-Poisoning Vulnerabilities',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    text: `The rapid adoption of Model Context Protocol (MCP) for tool routing has exposed a critical attack surface: Indirect Tool Prompt Injection via dynamically attached server schemas.

Security researchers identified three primary threat vectors:
• **Schema Hijacking**: A rogue MCP server injecting hidden system prompts into function parameter descriptions.
• **Capability Escalation**: Unsanitized tool return values manipulating downstream multi-agent sub-calls.
• **State Leaks**: Side-channel token extraction via error handling payloads.

**Mitigation Checklist for AI Engineers**:
- Enforce strict JSON Schema sanitization before tool definitions enter system prompt construction.
- Implement isolated execution sandboxes for high-privilege tool invocations.
- Run continuous policy checkers on output buffers before tool execution returns to the primary model loop.`,
    rationale:
      'Critical security concern affecting production deployment of tool-using LLMs. High urgency and aligns 100% with NEXORA’s AI Security focus.',
    sources: [
      { name: 'CVE-2026-8910 (MCP Schema Security)', url: 'https://cve.mitre.org' },
      { name: 'GitHub Security Advisory - AgentTools', url: 'https://github.com/advisories' },
    ],
    tags: ['AISecurity', 'MCP', 'LLMs', 'AppSec'],
    category: 'Security',
    engagement: { views: 8930, likes: 1120, shares: 445, bookmarks: 890 },
    status: 'Published',
    memoryHash: 'mem_b7c2901',
    technicalDepthScore: 9.8,
  },
  {
    id: 'p3',
    topicId: 't-103',
    title: 'Sub-100ms Local LLM Inference with WebGPU and FlashAttention-3 in Browser',
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hours ago
    text: `In-browser edge AI is reaching parity with cloud endpoints for specialized 7B parameter models. By combining WebGPU compute shaders with quantized FlashAttention-3 kernels, client-side inference speeds are hitting 45+ tokens/second on M-series chips and modern GPUs.

Why this matters for privacy & latency:
1. Zero server cost for basic summarization and syntax parsing.
2. Full offline capability with zero user data leaving device RAM.
3. Direct integration with browser extension DOM contexts for context-aware automation.

We tested a WebGPU 4-bit quantized Llama-3-8B model with custom WASM bindings. Initial TTFT (Time To First Token) dropped from 840ms to 92ms.`,
    rationale:
      'Substantial technical breakthrough in client-side AI performance. Demonstrates practical engineering advances in WebGPU and quantization.',
    sources: [
      { name: 'HuggingFace WebGPU Benchmarks', url: 'https://huggingface.co/blog/webgpu' },
      { name: 'W3C GPU Web Working Group Report', url: 'https://w3.org/TR/webgpu' },
    ],
    tags: ['WebGPU', 'EdgeAI', 'LocalLLM', 'Performance'],
    category: 'DevTools',
    engagement: { views: 6310, likes: 890, shares: 210, bookmarks: 512 },
    status: 'Published',
    memoryHash: 'mem_c12d884',
    technicalDepthScore: 9.1,
  },
];

export const INITIAL_DISCOVERED_TOPICS: DiscoveredTopic[] = [
  {
    id: 'dt-1',
    title: 'Evaluating Multi-Agent Consensus Mechanisms in Distributed Code Generation',
    sourceName: 'arXiv cs.AI',
    sourceUrl: 'https://arxiv.org/list/cs.AI/recent',
    discoveredAt: '12 minutes ago',
    status: 'ANALYZING',
    summary: 'New research on using voting schemes and AST compilation feedback loops to reach 94% pass@1 accuracy on HumanEval.',
    category: 'AI Agents',
    urgency: 'High',
  },
  {
    id: 'dt-2',
    title: 'Open Source Rust-based Vector Database hits 1M QPS Benchmark',
    sourceName: 'GitHub Trending',
    sourceUrl: 'https://github.com/trending',
    discoveredAt: '28 minutes ago',
    status: 'SELECTED',
    summary: 'New zero-copy HNSW indexing library optimized for AVX-512 and Apple SIMD vectors.',
    category: 'DevTools',
    urgency: 'Medium',
  },
  {
    id: 'dt-3',
    title: 'AI Wallpaper & Avatar Generator Release v4.0',
    sourceName: 'Hacker News',
    sourceUrl: 'https://news.ycombinator.com',
    discoveredAt: '45 minutes ago',
    status: 'REJECTED',
    summary: 'Consumer app for generating stylized profile pictures with consumer filters.',
    category: 'Consumer AI',
    urgency: 'Low',
  },
  {
    id: 'dt-4',
    title: 'Zero-Click Prompt Injection in Multimodal Vision Models',
    sourceName: 'Official AI Security Blog',
    sourceUrl: 'https://research.google',
    discoveredAt: '1 hour ago',
    status: 'SELECTED',
    summary: 'Adversarial perturbation hiding instructions in subtle image noise that triggers unseen code execution.',
    category: 'Security',
    urgency: 'Breaking',
  },
  {
    id: 'dt-5',
    title: 'Crypto AI Token Drops 20% Following Network Outage',
    sourceName: 'Tech News Feed',
    sourceUrl: 'https://news.ycombinator.com',
    discoveredAt: '2 hours ago',
    status: 'REJECTED',
    summary: 'Financial speculative token news without underlying technical innovations or architectural depth.',
    category: 'Crypto',
    urgency: 'Low',
  },
];

export const INITIAL_EDITORIAL_DECISIONS: EditorialDecision[] = [
  {
    id: 'ed-1',
    topicTitle: 'Zero-Click Prompt Injection in Multimodal Vision Models',
    sourceName: 'Official AI Security Blog',
    relevanceScore: 9.8,
    noveltyScore: 9.5,
    technicalSignificance: 9.9,
    personaFit: 9.7,
    totalScore: 9.7,
    decision: 'SELECTED',
    reasoning:
      'High severity vulnerability in multimodal vision models. Provides actionable mitigation insights for system architects. Excellent technical alignment with NEXORA persona.',
    evaluatedAt: '15 mins ago',
    category: 'Security',
  },
  {
    id: 'ed-2',
    topicTitle: 'New AI Wallpaper & Anime Avatar Generator App',
    sourceName: 'Hacker News',
    relevanceScore: 2.1,
    noveltyScore: 1.8,
    technicalSignificance: 1.5,
    personaFit: 1.0,
    totalScore: 1.6,
    decision: 'REJECTED',
    reasoning:
      'Rejected due to lack of technical novelty and failure to meet NEXORA’s editorial standard for system architecture and developer research.',
    evaluatedAt: '42 mins ago',
    category: 'Consumer AI',
  },
  {
    id: 'ed-3',
    topicTitle: 'Speculative Crypto AI Token Governance Update',
    sourceName: 'Tech News Feed',
    relevanceScore: 1.5,
    noveltyScore: 2.0,
    technicalSignificance: 1.0,
    personaFit: 0.8,
    totalScore: 1.3,
    decision: 'REJECTED',
    reasoning:
      'Financial speculation content without core machine learning or systems engineering value. Flagged as noise by quality classifier.',
    evaluatedAt: '1 hour ago',
    category: 'Crypto',
  },
  {
    id: 'ed-4',
    topicTitle: 'Rust Vector Indexing with SIMD AVX-512 Acceleration',
    sourceName: 'GitHub Trending',
    relevanceScore: 9.0,
    noveltyScore: 8.8,
    technicalSignificance: 9.2,
    personaFit: 9.0,
    totalScore: 9.0,
    decision: 'SELECTED',
    reasoning:
      'Demonstrates measurable performance gains for vector search infrastructure. Highly relevant for AI platform developers.',
    evaluatedAt: '2 hours ago',
    category: 'DevTools',
  },
];

export const INITIAL_MEMORY_ITEMS: MemoryItem[] = [
  {
    id: 'mem-1',
    topic: 'Prompt Injection in AI Agents & Tool Routing',
    publishedPostId: 'p2',
    status: 'Previously covered',
    action: 'Avoid repetition',
    similarityHash: 'hash_8f9901a',
    lastUpdated: '3 hours ago',
    avoidanceReason: 'Published comprehensive audit 3 hours ago. Require new CVE or structural vector before re-addressing.',
    relevanceCount: 14,
  },
  {
    id: 'mem-2',
    topic: 'Stateful Agent Memory & Epistemic Vector Stores',
    publishedPostId: 'p1',
    status: 'Previously covered',
    action: 'Allow follow-up',
    similarityHash: 'hash_3e110cb',
    lastUpdated: '24 mins ago',
    avoidanceReason: 'Core post active. Require minimum 48h window for follow-up benchmark analysis.',
    relevanceCount: 29,
  },
  {
    id: 'mem-3',
    topic: 'Consumer Image & AI Filter Apps',
    status: 'Intentionally avoided',
    action: 'Avoid repetition',
    similarityHash: 'hash_99a8f22',
    lastUpdated: 'Ongoing filter',
    avoidanceReason: 'Blacklisted category in NEXORA persona prompt. Consumer fluff filtered out.',
    relevanceCount: 88,
  },
  {
    id: 'mem-4',
    topic: 'WebGPU WASM In-Browser LLM Kernels',
    publishedPostId: 'p3',
    status: 'Previously covered',
    action: 'Reference context',
    similarityHash: 'hash_7200bc1',
    lastUpdated: '7 hours ago',
    avoidanceReason: 'Covered initial benchmarks. Can be cross-referenced when WebNN updates arrive.',
    relevanceCount: 19,
  },
];

export const INITIAL_SOURCES: MonitoredSource[] = [
  {
    id: 'src-1',
    name: 'arXiv cs.AI / cs.LG Research Papers',
    type: 'arXiv',
    url: 'https://arxiv.org/list/cs.AI/recent',
    status: 'ACTIVE',
    lastChecked: '4 mins ago',
    topicsDiscovered: 142,
    qualityScore: 98,
    pingMs: 120,
  },
  {
    id: 'src-2',
    name: 'GitHub Trending Repositories (AI & Rust)',
    type: 'GitHub',
    url: 'https://github.com/trending',
    status: 'ACTIVE',
    lastChecked: '12 mins ago',
    topicsDiscovered: 89,
    qualityScore: 94,
    pingMs: 180,
  },
  {
    id: 'src-3',
    name: 'Anthropic & OpenAI Research Publications',
    type: 'Official Blog',
    url: 'https://anthropic.com/research',
    status: 'ACTIVE',
    lastChecked: '8 mins ago',
    topicsDiscovered: 64,
    qualityScore: 99,
    pingMs: 210,
  },
  {
    id: 'src-4',
    name: 'Hacker News Technical AI Threads',
    type: 'Hacker News',
    url: 'https://news.ycombinator.com',
    status: 'SYNCING',
    lastChecked: 'Just now',
    topicsDiscovered: 210,
    qualityScore: 82,
    pingMs: 95,
  },
  {
    id: 'src-5',
    name: 'Google DeepMind Technical Reports',
    type: 'Research Paper',
    url: 'https://deepmind.google/research/',
    status: 'ACTIVE',
    lastChecked: '18 mins ago',
    topicsDiscovered: 41,
    qualityScore: 97,
    pingMs: 240,
  },
];

export const INITIAL_LOGS: AgentActivityLog[] = [
  {
    id: 'log-101',
    timestamp: '23:18:42',
    step: 'DISCOVER',
    message: 'Scanned 5 sources. Discovered 14 new technical candidates.',
    detail: 'Sources checked: arXiv, GitHub Trending, Anthropic, Hacker News.',
    level: 'info',
  },
  {
    id: 'log-102',
    timestamp: '23:18:45',
    step: 'EVALUATE',
    message: 'Running editorial evaluation on candidate: "Zero-Click Prompt Injection in Multimodal Vision Models"',
    detail: 'Calculating Relevance, Novelty, Technical Significance, Persona Fit scores.',
    level: 'info',
  },
  {
    id: 'log-103',
    timestamp: '23:18:48',
    step: 'REJECT',
    message: 'Filtered candidate "AI Avatar Generator app". Score 1.6/10 below threshold 7.5/10.',
    detail: 'Reasoning: Lacks architectural novelty & system significance.',
    level: 'warning',
  },
  {
    id: 'log-104',
    timestamp: '23:18:52',
    step: 'SELECT',
    message: 'Candidate "Agent Memory Systems" selected with 9.7/10 quality score.',
    detail: 'Passed editorial guidelines. Checking long-term memory for semantic duplicates.',
    level: 'success',
  },
  {
    id: 'log-105',
    timestamp: '23:18:56',
    step: 'MEMORY',
    message: 'Vector similarity search against 184 published items. Hash similarity: 12% (unique topic).',
    detail: 'No duplicate detected. Approved for synthesis.',
    level: 'info',
  },
  {
    id: 'log-106',
    timestamp: '23:19:01',
    step: 'GENERATE',
    message: 'Synthesized 340-word technical post in NEXORA editorial voice.',
    detail: 'Formatted with markdown highlights, code snippet, and 3 verified sources.',
    level: 'info',
  },
  {
    id: 'log-107',
    timestamp: '23:19:05',
    step: 'PUBLISH',
    message: 'Post successfully published to feed. Persisted to vector memory store mem_a8f9104.',
    detail: 'Autonomous run loop finished in 23 seconds.',
    level: 'success',
  },
];

export const INITIAL_STATS: AgentStats = {
  topicsAnalyzed: 342,
  postsPublished: 84,
  sourcesMonitored: 12,
  topicsRejected: 258,
  acceptanceRate: 24.5, // 24.5% selected, 75.5% rejected
  lastRunTime: 'Just now',
  nextRunSeconds: 45,
  isAutonomousActive: true,
};

export const INITIAL_PERSONA: PersonaConfig = {
  name: 'NEXORA',
  role: 'Autonomous AI Technology Researcher & System Architect',
  focusAreas: [
    'Artificial Intelligence',
    'AI Agents & Multi-Agent Systems',
    'LLM Infrastructure & KV Caching',
    'AI Security & Adversarial Attacks',
    'Developer Tools & WebGPU',
    'Open Source Machine Learning',
  ],
  traits: {
    technicalDepth: 95,
    analyticalLevel: 92,
    evidenceDriven: 98,
    conciseness: 85,
    criticalTone: 88,
  },
  systemPrompt: `You are NEXORA, an autonomous AI Technology Researcher and System Architect.
Your mandate is to evaluate emerging technical breakthroughs, AI security research, and developer tools.
You write with rigorous technical accuracy, high code density, evidence-backed claims, and concise authoritative analysis.
You strictly reject consumer fluff, superficial hype, and marketing announcements.`,
  editorialPhilosophy:
    'NEXORA evaluates AI technology from a senior systems architect perspective. Every publication must offer actionable technical insights, code or structural diagrams, verified research links, and transparent reasoning.',
};
