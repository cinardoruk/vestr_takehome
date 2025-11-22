# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vestr is a full-stack application with a React frontend and Express backend, designed for VPS deployment. The project uses SQLite with better-sqlite3 as the database, replacing traditional Redis/RabbitMQ setup for simplicity in small-scale deployments.

## Project Structure

```
vestr/
├── client/          # Vite + React frontend (JavaScript)
│   ├── src/         # React components and application code
│   └── dist/        # Built static assets (generated)
├── server/          # Express backend with SQLite
└── dev/             # Development notes and todos
```

This is a monorepo structure where both frontend and backend share the root directory, intended for single-VPS deployment.

## Development Commands

### Frontend (client/)
```bash
cd client
npm run dev      # Start Vite dev server with HMR
npm run build    # Build production assets to dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

### Backend (server/)
```bash
cd server
# No run scripts defined yet - backend is in early setup phase
```

## Key Architecture Details

### Frontend Stack
- **Vite**: Using `rolldown-vite@7.2.5` (faster Rust-based bundler)
- **React 19.2**: Latest React with modern patterns
- **ESLint 9**: Configured with React hooks and refresh plugins
- **No TypeScript**: Intentionally using JavaScript for simplicity

### Backend Stack
- **Express 5.1**: Latest major version with modern patterns
- **better-sqlite3**: Synchronous SQLite driver (faster than async alternatives for small apps)
- **License**: AGPL-3.0-only

### Database Strategy
The project uses SQLite to replace both Redis (caching/data) and RabbitMQ (task queues):
- All persistent data in SQLite tables
- Task queues implemented as database tables with status columns
- No external service dependencies beyond SQLite file

## Deployment Context

- **Target**: Single VPS deployment
- **Strategy**: Both frontend and backend deployed together
- **Build process**:
  1. `git pull` to update code
  2. `npm install` in both client/ and server/
  3. `npm run build` in client/ to generate static assets
  4. Restart server (likely via pm2 or systemd)
- **Static serving**: Backend serves built frontend or nginx proxies API routes

## Development Philosophy

This is explicitly a **small project** optimized for:
- Minimal dependencies and complexity
- Single-machine deployment
- Shared codebase (no separate packages for front/back)
- SQLite over distributed systems (Redis/RabbitMQ)
- JavaScript over TypeScript for reduced tooling overhead
