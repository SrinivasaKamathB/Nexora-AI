# NEXORA AI — AI Usage Log

## Overview

NEXORA AI was developed with AI-assisted programming and iterative problem solving.
AI tools were used to support architecture decisions, debugging, implementation,
UI improvements, testing, and deployment preparation.

## AI-Assisted Development

### 1. Project Architecture
Prompts were used to:
- Plan the NEXORA AI autonomous-agent architecture.
- Structure the React frontend and Express backend.
- Define the interaction between the frontend API service and backend endpoints.
- Design the autonomous discovery → decision → generation → publication workflow.

### 2. Autonomous Agent
AI assistance was used to:
- Implement the autonomous cycle.
- Configure the autonomous execution interval.
- Implement the countdown timer for the next autonomous cycle.
- Update runtime state after an autonomous cycle completes.
- Debug the difference between the frontend countdown and backend execution interval.

### 3. AI Feed
AI assistance was used to:
- Connect the frontend feed to `/api/agent/feed`.
- Implement `getFeed()` in the frontend API service.
- Fetch generated posts from the Express backend.
- Automatically refresh the feed without requiring a browser refresh.
- Debug browser caching and asynchronous feed updates.

### 4. Backend API
AI assistance was used to:
- Implement and debug the Express API endpoints.
- Verify the `/api/agent/feed` endpoint.
- Connect backend runtime state to the frontend.
- Debug autonomous-cycle execution and generated-post persistence.

### 5. Debugging
AI assistance was used during development to diagnose:
- TypeScript errors.
- Timer/reset issues.
- Feed synchronization problems.
- Port conflicts on localhost:3001.
- Frontend/backend communication issues.
- Build and deployment configuration issues.

### 6. Testing
The application was tested locally by:
- Running the Express/Vite development environment.
- Verifying autonomous-cycle execution.
- Monitoring the browser console for frontend feed requests.
- Confirming that the feed updated without manual browser refresh.
- Confirming the 600-second autonomous cycle configuration.

### 7. Deployment
AI assistance was used to:
- Prepare the project for production deployment.
- Configure the Netlify build.
- Configure the `dist` publish directory.
- Configure the `GEMINI_API_KEY` environment variable.
- Deploy the project from the public GitHub repository.

## Human Contribution

The project direction, product concept, implementation decisions, testing,
iteration, and final submission decisions were made by the project team.
AI assistance was used as a development and debugging tool throughout the
build process.

## AI Tools Used

- ChatGPT — development assistance, debugging, architecture guidance,
  implementation guidance, testing guidance, and deployment assistance.
- Google AI / Gemini — AI capabilities used by the application where applicable.

## Development Workflow

The development process was iterative:

1. Define a feature.
2. Implement it in the project.
3. Run the application locally.
4. Inspect errors and runtime behavior.
5. Use AI assistance to diagnose issues.
6. Modify and test the implementation.
7. Verify the feature in the browser.
8. Commit working changes to GitHub.
9. Deploy the working version.
