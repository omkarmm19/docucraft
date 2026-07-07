# DocuCraft ⚡

> AI-powered document generator — Create stunning PPT, DOC & PDF files in seconds using Groq Llama-3

[![Live Demo](https://img.shields.io/badge/Live%20Demo-docuucraft.netlify.app-00d4ff?style=for-the-badge&logo=netlify&logoColor=white)](https://docuucraft.netlify.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://docucraft-production.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-omkarmm19-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/omkarmm19/docucraft)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| 🖥️ Frontend | https://docuucraft.netlify.app |
| ⚙️ Backend API | https://docucraft-production.onrender.com |
| 📖 API Docs | https://docucraft-production.onrender.com/docs |

---

## ✨ Features

- 🤖 **AI-Powered** — Uses Groq Llama-3.3-70B to generate structured content instantly
- 📊 **PowerPoint (.pptx)** — Multi-slide presentations with custom color themes
- 📝 **Word Document (.docx)** — Formatted documents with headings and bullet points
- 📄 **PDF Export** — Clean PDF with colored backgrounds matching chosen theme
- 🎨 **5 Themes** — Dark, Blue, Green, Purple, Light
- 🎛️ **Custom Slide Count** — Choose between 4 to 15 slides
- ⚡ **Instant Download** — Files download directly to your device
- 🔐 **User Auth** — Register, login, JWT-protected routes, logout
- 📜 **Generation History** — Every download is logged; view & delete from your dashboard
- 🌙 **Dark UI** — Sleek dark/tech aesthetic

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| React Router | Client-side routing |
| Axios | HTTP requests + JWT interceptor |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Tech | Purpose |
|------|---------|
| FastAPI | Python web framework |
| Uvicorn | ASGI server |
| Groq SDK | Llama-3 AI API |
| SQLAlchemy | ORM for database access |
| python-jose | JWT token creation & validation |
| bcrypt | Password hashing |
| python-pptx | PowerPoint generation |
| python-docx | Word document generation |
| fpdf2 | PDF generation |
| python-dotenv | Environment variable management |

### Database & Hosting
| Tech | Purpose |
|------|---------|
| Neon (PostgreSQL) | Persistent cloud database |
| Netlify | Frontend hosting + auto-deploy |
| Render | Backend hosting + auto-deploy |
| GitHub | Version control |

---

## 🏗️ Project Structure

```
docucraft/
├── backend/
│   ├── main.py                  # FastAPI app, CORS, routes, history saving
│   ├── generator.py             # Groq AI integration + PPT/DOC/PDF generation
│   ├── auth.py                  # JWT creation, bcrypt, get_current_user dependency
│   ├── database.py              # SQLAlchemy engine + session (Neon PostgreSQL)
│   ├── models.py                # ORM models (User, GenerationHistory) + Pydantic schemas
│   ├── requirements.txt         # Python dependencies
│   ├── render.yaml              # Render deployment config
│   ├── routers/
│   │   ├── auth_router.py       # POST /auth/register, /auth/login, GET /auth/me
│   │   └── history_router.py    # GET /history/, DELETE /history/{id}
│   └── .env                     # Environment variables (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Routes: /, /login, /register, /history
│   │   ├── api.js               # Axios instance + JWT interceptor + helpers
│   │   ├── components/
│   │   │   └── ProtectedRoute.jsx
│   │   └── pages/
│   │       ├── LoginPage.jsx
│   │       ├── RegisterPage.jsx
│   │       ├── GeneratorPage.jsx
│   │       └── HistoryPage.jsx
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js v18+
- Python 3.10+
- Git
- Groq API Key — free at [console.groq.com](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/omkarmm19/docucraft.git
cd docucraft
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate        # Mac/Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder:

```env
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_long_random_secret_key_here
DATABASE_URL=your_neon_postgresql_url_here
```

> **Tip**: Generate a secure SECRET_KEY with `openssl rand -hex 32`  
> **Tip**: If `DATABASE_URL` is not set, the app falls back to SQLite automatically (data won't persist across restarts)

Start the backend server:

```bash
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`  
Interactive API docs at: `http://localhost:8000/docs`

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🌐 API Reference

### Base URL
```
https://docucraft-production.onrender.com
```

### Auth Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Register new account → returns JWT |
| `POST` | `/auth/login` | ❌ | Login → returns JWT |
| `GET` | `/auth/me` | ✅ | Get current user info |

### Generation Endpoints (all require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ❌ | Health check |
| `POST` | `/generate/ppt` | ✅ | Generate PowerPoint file |
| `POST` | `/generate/doc` | ✅ | Generate Word document |
| `POST` | `/generate/pdf` | ✅ | Generate PDF file |

### History Endpoints (all require JWT)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/history/` | ✅ | Get last 50 generations for current user |
| `DELETE` | `/history/{id}` | ✅ | Delete a specific history record |

### Request Body (generate endpoints)

```json
{
  "topic": "Machine Learning",
  "slide_count": 8,
  "theme": "dark"
}
```

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `topic` | string | required | Topic for the document |
| `slide_count` | integer | 8 | Number of slides (4–15) |
| `theme` | string | `"dark"` | Color theme |

### Available Themes

| Theme | Background | Title Color |
|-------|-----------|-------------|
| `dark` | #121212 | Cyan |
| `blue` | Deep Navy | Light Blue |
| `green` | Deep Green | Mint Green |
| `purple` | Deep Purple | Violet |
| `light` | Off White | Dark Gray |

---

## 🚢 Deployment Guide

### Backend → Render

1. Go to [render.com](https://render.com) and login with GitHub
2. New Web Service → connect `docucraft` repo
3. Settings:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Go to **Environment** tab → add:
   ```
   GROQ_API_KEY = your_groq_api_key
   SECRET_KEY   = your_secret_key
   DATABASE_URL = your_neon_postgresql_url
   ```
5. Render auto-deploys on every GitHub push to `main`

### Frontend → Netlify

1. Go to [netlify.com](https://netlify.com) and login with GitHub
2. Add new site → Import from Git → select `docucraft`
3. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy site
5. Netlify auto-deploys on every GitHub push to `main`

---

## 📝 Git Commit History

This project follows the **Conventional Commits** standard:

```
chore: initial backend setup with FastAPI and dependencies
feat:  add AI document generation for PPT, DOC and PDF
fix:   update Groq model and fix PDF unicode encoding
feat:  add React frontend with dark theme and file generation UI
feat:  connect frontend to Railway backend
chore: add render.yaml and use env var for API URL
feat:  add JWT authentication with register/login and protected routes
fix:   replace passlib with direct bcrypt for Python 3.14 compatibility
fix:   make database.py resilient with SQLite fallback on invalid URL
fix:   add Netlify _redirects for React Router SPA routing
fix:   restrict CORS to Netlify frontend only
feat:  add generation history — backend table + GET/DELETE endpoints + frontend dashboard
docs:  update README — Render backend, completed v1.1 and v1.2
```

### Commit Convention

| Prefix | Use for |
|--------|---------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `chore:` | Setup / config / tooling |
| `docs:` | Documentation only |
| `refactor:` | Code restructure, no feature change |
| `style:` | Formatting, no logic change |
| `test:` | Adding tests |

---

## 🗺️ Roadmap

### ✅ v1.0 — Core Release
- [x] AI-powered PPT, DOC, PDF generation via Groq Llama-3
- [x] 5 custom color themes
- [x] Adjustable slide count (4–15)
- [x] Instant file download
- [x] Dark/tech UI
- [x] Deployed on Netlify + Render
- [x] Auto-deploy on every GitHub push

### ✅ v1.1 — Authentication
- [x] User registration & login
- [x] JWT access tokens
- [x] Password hashing with bcrypt
- [x] Protected API routes with auth middleware
- [x] Logout & session management

### ✅ v1.2 — Database & History
- [x] PostgreSQL database integration via SQLAlchemy (Neon)
- [x] User table schema
- [x] Generation history table (topic, type, theme, slides, timestamp)
- [x] GET /history — fetch last 50 per user
- [x] DELETE /history/{id} — remove a record
- [x] Frontend history dashboard page

### ⚙️ v1.3 — DevOps & CI/CD (Planned)
- [ ] GitHub Actions pipeline
- [ ] Automated tests on every pull request
- [ ] Auto-deploy to Render + Netlify on merge to `main`
- [ ] Dockerfile for containerized backend
- [ ] Docker Compose for local full-stack development
- [ ] Environment-based config (dev / staging / prod)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch:
   ```bash
   git checkout -b feat/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feat/your-feature-name
   ```
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

## 👨‍💻 Author

**Omkar Mahesh**
- 🐙 GitHub: [@omkarmm19](https://github.com/omkarmm19)
- 📧 Email: omkarmahesh12345@gmail.com

---

<p align="center">
  <b>DocuCraft</b> — Built with ❤️ using Groq Llama-3 • 2025
</p>
