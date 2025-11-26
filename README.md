# Vestr - Financial Literacy Quiz Application

A full-stack web application for a simple finance quiz: React app with quiz layout and logic pulls quiz questions/answers from an Express api.


## Tech Stack

**Frontend:**
- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS v4 for styling
- shadcn/ui component library

**Backend:**
- Node.js with Express
- SQLite database (better-sqlite3)
- RESTful API design

## Basic Project Structure

```
vestr/
├── client/          # React frontend application
├── server/          # Express backend API
└── README.md        # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vestr
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm i
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm i
   ```

### Running the Application

#### 1. Start the Backend Server

```bash
cd server
npm start
```

The server will start on `http://localhost:5000`

- **API endpoint:** `GET http://localhost:5000/api/quiz`
- **Health check:** `GET http://localhost:5000/health`

#### 2. Start the Frontend Development Server

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

Visit `http://localhost:5173` in your browser to use the application.

## Database Schema

schema and some seed data is included in `server/data/schema.sql`, which gets run using db.exec() on startup(`server/src/db/database.js`).

```sql
CREATE TABLE IF NOT EXISTS quizes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT,
  duration INTEGER NOT NULL DEFAULT 600
);

CREATE TABLE IF NOT EXISTS questions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  question_text TEXT NOT NULL,
  quiz_id INTEGER,
  FOREIGN KEY(quiz_id) REFERENCES quizes(id)
);

CREATE TABLE IF NOT EXISTS options (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  option_text TEXT NOT NULL,
  question_id INTEGER NOT NULL,
  FOREIGN KEY(question_id) REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS correct_answers (
  question_id INTEGER PRIMARY KEY,
  correct_option_id INTEGER NOT NULL,
  FOREIGN KEY(question_id) REFERENCES questions(id),
  FOREIGN KEY(correct_option_id) REFERENCES options(id)
);
```

## Development Commands

### Backend

```bash
npm start       # Start production server
npm run dev     # Start with nodemon (auto-reload)
```

### Frontend

```bash
npm run dev     # Start Vite dev server
npm run build   # Build for production
```

## API Documentation

### GET /api/quiz

Returns quiz metadata and questions.

**Response:**
```json
{
  "quiz": {
    "quiz_id": 1,
    "subject": "Stocks and the Stock Market",
    "duration": 600,
    "questions": [
      {
        "id": 1,
        "questionText": "What was the primary innovation...",
        "options": [
          {
            "id": 1,
            "optionText": "Selling rights to profits..."
          }
        ]
      }
    ]
  }
}
```

**Note:** Correct answers are NOT included in the response for security.

Also, the assignment specification didn't have this, but there should be a /api/quiz/answers POST route for submitting answers, and getting back a json indicating which questions were correct, which were incorrect(and the correct options for these). Time was scarce so I skipped this and hardcoded the correct answers in the React app.

## Environment Variables

### Server

Create a `.env` from the .env.example file in the `server/` directory:
DATABASE_PATH is the .db file path that better_sqlite3 uses to create/access a db.

```env
PORT=5000
NODE_ENV=development
DATABASE_PATH=./data/vestr.db
```
## Testing the Application

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Click "Start" to begin the quiz
4. Answer the 3 financial literacy questions
5. Click "Finish Test" to see your results
6. Click "Back" to restart the quiz

## Production Deployment

This project includes a deployment script (`deploy.sh`) for deploying to a VPS with nginx.

If you already have an nginx configuration file serving a bunch of different `location`s for your domain, copy the related lines from the given `nginx.conf.example` and paste them in there.

### The setup I used - adapt for your circumstances

I presuppose ssh key auth for the vps: `deploy.sh` starts an ssh agent using your private key.

- VPS with Ubuntu/Debian Linux
- nginx installed on VPS
- SSH access to VPS
- Node.js installed on VPS

### Deployment Configuration

1. **Configure deployment settings**

   Edit `.build_deploy.env` with your VPS details:

   ```bash
   VPS_SSH_KEY_PATH="$HOME/.ssh/your-key"
   VPS_SSH_PORT='22'
   VPS_USER="your-user"
   VPS_HOST="your-domain.com"
   VPS_WORKTREE="/var/www/vestr_demo"
   ```

2. **Configure base URL for your deployment**

   The current configuration deploys the app to a subpath (e.g., `your-domain.com/vestr`).

   Edit `client/vite.config.ts` based on your deployment path:

   ```typescript
   // For subpath deployment (e.g., your-domain.com/vestr):
   base: "/vestr/",

   // For root path deployment (e.g., your-domain.com/):
   base: "/",

   // For other subpaths (e.g., your-domain.com/app/):
   base: "/app/",
   ```

   Also update your nginx configuration accordingly:
   - Root path: Use `root` directive instead of `location /vestr` with `alias`
   - Subpath: Use `location /your-path` with `alias` and rewrite rules as shown in `nginx.conf.example`

3. **Make deploy script executable**

   ```bash
   chmod +x deploy.sh
   ```

### Step-by-Step Deployment

#### First Time Deployment

1. **Build and deploy frontend and backend**

   ```bash
   ./deploy.sh build_rsync_all
   ```

   This will:
   - Build the React frontend with Vite
   - Sync frontend files to VPS
   - Sync backend files to VPS
   - Install backend dependencies on VPS using npm

2. **Setup nginx**

   (SKIP IF YOU ALREADY HAVE AN NGINX SETUP AT THE VPS, SEE BEGINNING OF PRODUCTION DEPLOYMENT HEADING)
   ```bash
   ./deploy.sh setup_nginx
   ```

   This will:
   - Copy nginx configuration to VPS
   - Enable the site
   - Test and reload nginx

3. **Start the backend server**

   ```bash
   ./deploy.sh start_backend
   ```

   The backend will start on port 5000 and run in the background.

4. **Verify deployment**

   Visit `http://your-domain.com` in your browser.

#### Updating an Existing Deployment

**Update frontend only:**
```bash
./deploy.sh rsync_frontend
./deploy.sh reload_nginx
```

**Update backend only:**
```bash
./deploy.sh rsync_backend
./deploy.sh restart_backend
```

**Update both:**
```bash
./deploy.sh build_rsync_all
./deploy.sh restart_backend
./deploy.sh reload_nginx
```

**Update nginx configuration:**
```bash
./deploy.sh setup_nginx
```

### Deployment Script Commands

**Build & Deploy:**
- `build` - Build React frontend with Vite
- `rsync_frontend` - Build and sync frontend to VPS
- `rsync_backend` - Sync backend to VPS and install dependencies
- `build_rsync_all` - Build and sync both frontend and backend

**Backend Management:**
- `start_backend` - Start the Express backend on VPS
- `stop_backend` - Stop the Express backend on VPS
- `restart_backend` - Restart the Express backend on VPS
- `check_logs` - View live server logs (tail -f)
- `browse_logs` - Browse server logs (less)

**Nginx Management:**
- `setup_nginx` - Copy nginx config to VPS and enable site
- `reload_nginx` - Reload nginx configuration
- `start_nginx` - Start nginx service
- `stop_nginx` - Stop nginx service
- `check_nginx_status` - Check nginx service status

**Help:**
- `help` - Show all available commands

### Architecture

The deployed application uses:
- **nginx** - Serves frontend static files and proxies API requests
- **Express backend** - Runs on localhost:5000
- **SQLite database** - Automatically initialized with seed data

nginx configuration:
- Frontend served from `/var/www/vestr_demo/dist`
- `/api/*` proxied to Express backend at `http://localhost:5000`
- `/health` endpoint proxied to backend
- Gzip compression enabled
- Static asset caching (1 year)

### Alternative Deployment Options

The application can also be deployed to cloud platforms:

- **Backend:** Railway, Render, DigitalOcean, Heroku
- **Frontend:** Vercel, Netlify, Cloudflare Pages
- **Full-stack:** AWS, GCP, Azure

## License

MIT

## Author

Cinar Doruk

Built as a take-home assignment for a full-stack developer position.
