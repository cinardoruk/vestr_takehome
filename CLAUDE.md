# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vestr is a full-stack application with a React frontend and Express backend, designed for VPS deployment. The project uses SQLite with better-sqlite3 as the database, replacing traditional Redis/RabbitMQ setup for simplicity in small-scale deployments.

## Project Structure

```
vestr/
├── client/          # Vite + React TypeScript frontend
│   ├── src/         # React components and application code
│   │   ├── components/  # React components
│   │   │   └── ui/      # shadcn/ui components
│   │   ├── lib/         # Utility functions
│   │   └── hooks/       # Custom React hooks
│   ├── dist/        # Built static assets (generated)
│   └── components.json  # shadcn/ui configuration
├── server/          # Express backend with SQLite
│   ├── src/         # Backend source code
│   ├── data/        # SQLite database and schema
│   └── .rsyncignore # Files to exclude from deployment
├── deploy.sh        # Deployment script for VPS
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
npm start        # Start the server
npm run dev      # Start with auto-reload (nodemon)
```

### Deployment (from project root)
```bash
./deploy.sh build              # Build React frontend
./deploy.sh rsync_frontend     # Sync frontend to VPS
./deploy.sh rsync_backend      # Sync backend to VPS
./deploy.sh build_rsync_all    # Build and sync everything
./deploy.sh start_backend      # Start backend on VPS
./deploy.sh stop_backend       # Stop backend on VPS
./deploy.sh restart_backend    # Restart backend on VPS
./deploy.sh check_logs         # View live logs (tail -f)
./deploy.sh browse_logs        # Browse logs (less)
```

## Key Architecture Details

### Frontend Stack
- **Vite**: Latest version with React plugin
- **React 19**: Latest React with modern patterns
- **TypeScript**: Strict mode enabled for type safety
- **Tailwind CSS v4**: Using new Vite plugin (`@tailwindcss/vite`)
- **shadcn/ui**: Component library (New York style, neutral theme)
  - Path aliases configured (`@/*` maps to `src/*`)
  - Icon library: lucide-react
  - CSS variables for theming
- **ESLint**: Configured with React hooks and refresh plugins
- **Path aliases**: `@/` resolves to `src/` for cleaner imports

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

This project is optimized for:
- **Single-machine deployment** - Everything runs on one VPS
- **Monorepo structure** - Frontend and backend share the same repository
- **Modern stack** - TypeScript, React 19, Tailwind v4, shadcn/ui
- **Simple database** - SQLite replaces Redis (cache) and RabbitMQ (queues)
- **Production-ready** - Proper TypeScript setup suitable for job interviews/take-homes

## Important Notes

### Frontend Development
- Use `@/` imports for cleaner paths: `import Button from '@/components/ui/button'`
- shadcn/ui components are in `src/components/ui/`
- Add new components with: `npx shadcn@latest add <component-name>`
- Tailwind v4 uses the new Vite plugin (no PostCSS config needed)

### Backend Development
- Backend uses ES modules (`"type": "module"`)
- Environment variables in `.env` (gitignored)
- Database auto-initializes from `data/schema.sql` on first run
- Use `nohup` for background processes on VPS

### Deployment
- `.rsyncignore` excludes `node_modules`, `.db` files, logs from sync
- Frontend built assets go to `client/dist/`
- Backend runs on port 5000 (configurable via `.env`)
- Nginx serves static files and proxies `/api` to backend
