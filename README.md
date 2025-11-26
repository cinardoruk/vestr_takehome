# Vestr - Financial Literacy Quiz Application

A full-stack web application for testing financial literacy knowledge with a focus on stocks and the stock market.

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

## Project Structure

```
vestr/
├── client/          # React frontend application
├── server/          # Express backend API
└── README.md        # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vestr
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
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

## Features

### Quiz Interface
- **Financial literacy test** with multiple-choice questions
- **Timed quiz mode** with countdown timer
- **Real-time answer tracking** using radio button selections
- **Immediate feedback** with color-coded results (green for correct, red for incorrect)
- **Score calculation** with pass/fail indicators

### UI Components
- **Top navigation bar** with logo, menu items, and search functionality
- **Quiz header** with detailed scoring information
- **Quiz info section** displaying question count and time limit
- **Results display** showing total score, correct answers, time taken, and performance level
- **Dark theme** with green accent colors matching the Figma design

### Backend API
- **RESTful API** serving quiz data
- **SQLite database** with normalized schema
- **Secure design** - correct answers stored separately and not exposed to frontend
- **Automatic database seeding** on server startup

## Database Schema

```sql
quizes          # Quiz metadata (subject, duration)
questions       # Quiz questions
options         # Answer options for each question
correct_answers # Correct answer mappings (not exposed to client)
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
npm run preview # Preview production build
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

## Environment Variables

### Server

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
DATABASE_PATH=./data/vestr.db
```

## Design

The UI follows a dark theme design with green accent colors as specified in the Figma mockup. Key design elements:

- Dark background (`oklch(0.145 0 0)`)
- Light text (`oklch(0.985 0 0)`)
- Green accent color (`#00ff00`) for interactive elements
- Clear visual hierarchy with proper spacing
- Responsive layout

## Testing the Application

1. Start both backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Click "Start" to begin the quiz
4. Answer the 3 financial literacy questions
5. Click "Finish Test" to see your results
6. Click "Back" to restart the quiz

## Production Deployment

This project includes a deployment script (`deploy.sh`) for deploying to a VPS with nginx.

### Prerequisites for Deployment

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

2. **Make deploy script executable**

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
   - Install backend dependencies on VPS

2. **Setup nginx**

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

Built as a take-home assignment for a full-stack developer position.
