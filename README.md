# NEXORA AI

### Autonomous AI Technology Creator

NEXORA AI is an autonomous AI technology intelligence system designed to discover emerging technical topics, evaluate their relevance, generate technical insights, track source references, maintain memory references to reduce duplication, and publish technology content automatically.

> **Discovers. Decides. Creates. Publishes.**

---

## 🚀 Core Capabilities

- 🔎 Autonomous technology topic discovery
- 🧠 AI-powered topic evaluation and reasoning
- ✍️ Automated technical content generation
- 🔬 Editorial relevance and technical-depth scoring
- 🧠 Memory-based duplicate detection
- 📚 Technical source tracking
- ⚡ Autonomous execution cycles
- 📡 Live generated technology feed
- 📊 Agent activity and system statistics
- 🤖 Gemini-powered content generation
- 📝 Autonomous activity logging
- 🏷️ Automatic technology categorization

---

## 🏗️ Architecture

```text
                         ┌─────────────────────┐
                         │      NEXORA AI      │
                         │   Autonomous Agent  │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  Topic Discovery    │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │ Editorial Evaluation│
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │ Memory / Duplicate  │
                         │      Detection      │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  Gemini Generation  │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │    Publish Feed     │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │   Activity Logging  │
                         └──────────┬──────────┘
                                    │
                         ┌──────────▼──────────┐
                         │  Memory Reference   │
                         └─────────────────────┘
   
## ⚙️ Technology Stack

| Technology | Purpose |
|---|---|
| React | Frontend interface |
| TypeScript | Type-safe application development |
| Vite | Frontend development and build tooling |
| Tailwind CSS | UI styling |
| Node.js | Backend runtime |
| Express | REST API server |
| Google Gemini API | AI-powered content generation |
| Git | Version control |
| GitHub | Source code hosting |

---

## 🔄 Autonomous Cycle

NEXORA operates through an autonomous execution pipeline.

During each cycle, the system can:

1. Analyze technical topics
2. Evaluate technical relevance
3. Check existing memory for duplicate topics
4. Select a topic for generation
5. Generate a technical insight
6. Assign a technology category
7. Attach technical source references
8. Publish the generated post
9. Record the activity in the agent log
10. Store a memory reference for the generated content

The current autonomous execution interval is **45 seconds**.

The system also supports manually triggering an autonomous cycle through the dashboard.

---

## 🧠 AI Generation

NEXORA uses Google's Gemini API to generate structured technical content.

The backend requests structured output containing:

- Technical title
- Technical deep-dive
- Selection rationale
- Technology category

Supported technology categories include:

- AI Agents
- LLMs
- Security
- DevTools
- Open Source

When Gemini is unavailable, NEXORA uses a local fallback generation path so the application can continue operating.

---

## 🧠 Memory & Duplicate Detection

NEXORA maintains memory references associated with generated posts.

The memory workflow is designed to:

```text
New Topic
    ↓
Existing Memory Check
    ↓
Similarity Evaluation
    ↓
Duplicate Detection
    ↓
Approve / Reject
    ↓
Generate Content
    ↓
Store Memory Reference
---

## 📡 API

### Initialize Agent

```http
POST /api/agent/init
Initializes a NEXORA autonomous agent session.

Example request:

```json
{
  "agentId": "nexora-core-01"
}

### Get Generated Feed

```http
GET /api/agent/feed
```

Returns the current NEXORA feed and runtime information, including:

- Published posts
- Discovered topics
- Editorial decisions
- Memory items
- Activity logs
- System statistics

### Get Agent Status

```http
GET /api/agent/status
```

Returns:

- Server time
- Gemini API configuration status
- Server uptime
- Topics analyzed
- Posts published
- Sources monitored
- Topics rejected
- Acceptance rate
- Last run time
- Next execution cycle
- Autonomous agent status

### Trigger Autonomous Cycle

```http
POST /api/agent/run-cycle
```

Triggers an autonomous content-generation cycle.

Optional request body:

```json
{
  "topicPrompt": "Multi-agent AI systems"
}
```

---

## 🖥️ Running Locally

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/SrinivasaKamathB/Nexora-AI.git
cd Nexora-AI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a local `.env` file in the project root:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Never commit your real API key to GitHub.

### 4. Start NEXORA

```bash
npm run dev
```

The application runs locally through the Vite development server and Express backend.

The backend API is available at:

```text
http://localhost:3001
```

---

## 📊 Dashboard

The NEXORA dashboard provides real-time visibility into:

- Autonomous agent status
- Next execution cycle
- Published posts
- Technology categories
- Agent memory
- Activity logs
- Technical sources
- System statistics
- Manual autonomous-cycle trigger

---

## 📈 System Statistics

NEXORA tracks runtime statistics including:

- Topics Analyzed
- Posts Published
- Sources Monitored
- Topics Rejected
- Acceptance Rate
- Last Run Time
- Next Run
- Autonomous Status

---

## 🔐 Security

Sensitive configuration is kept outside the source code.

The Gemini API key should be stored in:

```text
.env
```

The `.env` file is excluded from version control through `.gitignore`.

A safe configuration template is provided through:

```text
.env.example
```

Never publish private API keys, credentials, tokens, or other secrets to GitHub.

---

## 🧪 Build Verification

Verify the production build with:

```bash
npm run build
```

A successful build confirms that the application can be compiled for production deployment.

---

## 📁 Project Structure

```text
NEXORA-AI/
│
├── src/
│   ├── components/
│   ├── data/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
│
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── README.md
├── server.ts
├── tsconfig.json
└── vite.config.ts
```

---

## 🎯 Project Objective

NEXORA AI demonstrates an autonomous AI workflow that moves beyond simple prompt-response interaction.

The system follows a continuous:

```text
Discover
   ↓
Evaluate
   ↓
Remember
   ↓
Create
   ↓
Publish
   ↓
Log
   ↓
Repeat
```

The objective is to demonstrate how AI agents can perform structured decision-making, content generation, memory-based reasoning, and autonomous execution within a software system.

---

## 💡 Key Differentiator

Traditional AI applications generally follow:

```text
User Prompt
     ↓
AI Response
```

NEXORA is designed around:

```text
Technology Environment
        ↓
Topic Discovery
        ↓
Evaluation
        ↓
Memory / Deduplication
        ↓
AI Generation
        ↓
Publishing
        ↓
Activity Logging
        ↓
Next Autonomous Cycle
```

This makes NEXORA an example of an autonomous AI content intelligence system rather than a simple chatbot interface.

---

## 🚀 Future Improvements

Potential future improvements include:

- Persistent production-grade vector database
- Advanced semantic similarity search
- Real-time external technology-source ingestion
- More sophisticated editorial scoring
- Multi-agent collaboration
- Source credibility scoring
- Content quality evaluation agents
- Automated deployment pipelines
- Production authentication and authorization
- Database-backed analytics
- Distributed autonomous workers
- Observability and monitoring
- Containerized deployment
- Cloud deployment
- Advanced RAG-based knowledge retrieval

---

## 🎬 Demonstration Flow

A typical demonstration can follow this sequence:

```text
1. Open NEXORA Dashboard
        ↓
2. Show Autonomous Mode
        ↓
3. Show Next Cycle Countdown
        ↓
4. Trigger Autonomous Cycle
        ↓
5. Agent evaluates a technical topic
        ↓
6. Memory / duplicate check
        ↓
7. Gemini generates technical content
        ↓
8. Post is published to the feed
        ↓
9. Activity log records the execution
        ↓
10. System waits for the next autonomous cycle
```

This demonstrates the complete autonomous workflow from topic evaluation to publication.

---

## 📜 License

This project is licensed under the Apache License 2.0.

---

## 👨‍💻 Author

**Srinivasa Kamath B**

**NEXORA AI — Autonomous AI Technology Creator**

> **Discovers. Decides. Creates. Publishes.**