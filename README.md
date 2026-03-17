# DocuCraft ⚡

> AI-powered document generator — Create stunning PPT, DOC & PDF files in seconds using Groq Llama-3

[![Live Demo](https://img.shields.io/badge/Live%20Demo-docuucraft.netlify.app-00d4ff?style=for-the-badge&logo=netlify&logoColor=white)](https://docuucraft.netlify.app)
[![Backend](https://img.shields.io/badge/Backend-Railway-7B2FFF?style=for-the-badge&logo=railway&logoColor=white)](https://docucraft-production.up.railway.app)
[![GitHub](https://img.shields.io/badge/GitHub-omkarmm19-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/omkarmm19/docucraft)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.14-3776AB?style=for-the-badge&logo=python&logoColor=white)

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| 🖥️ Frontend | https://docuucraft.netlify.app |
| ⚙️ Backend API | https://docucraft-production.up.railway.app |
| 📖 API Docs | https://docucraft-production.up.railway.app/docs |

---

## ✨ Features

- 🤖 **AI-Powered** — Uses Groq Llama-3.3-70B to generate structured content instantly
- 📊 **PowerPoint (.pptx)** — Multi-slide presentations with custom color themes
- 📝 **Word Document (.docx)** — Formatted documents with headings and bullet points
- 📄 **PDF Export** — Clean PDF with colored backgrounds matching chosen theme
- 🎨 **5 Themes** — Dark, Blue, Green, Purple, Light
- 🎛️ **Custom Slide Count** — Choose between 4 to 15 slides
- ⚡ **Instant Download** — Files download directly to your device
- 🌙 **Dark UI** — Sleek dark/tech aesthetic

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Axios | HTTP requests to backend |
| React Hot Toast | Notifications |
| Lucide React | Icons |

### Backend
| Tech | Purpose |
|------|---------|
| FastAPI | Python web framework |
| Uvicorn | ASGI server |
| Groq SDK | Llama-3 AI API |
| python-pptx | PowerPoint generation |
| python-docx | Word document generation |
| fpdf2 | PDF generation |
| python-dotenv | Environment variable management |

### DevOps & Deployment
| Tech | Purpose |
|------|---------|
| Netlify | Frontend hosting + auto-deploy |
| Railway | Backend hosting + auto-deploy |
| GitHub | Version control |
| Git | Source code management |

---

## 🏗️ Project Structure

```
docucraft/
├── backend/
│   ├── main.py            # FastAPI app, CORS middleware, API routes
│   ├── generator.py       # Groq AI integration + PPT/DOC/PDF generation
│   ├── models.py          # Pydantic request/response models
│   ├── requirements.txt   # Python dependencies
│   └── .env               # Environment variables (not committed)
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx        # Main React component — UI + API calls
│   │   ├── App.css        # Component styles
│   │   ├── index.css      # Global styles
│   │   └── main.jsx       # React entry point
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
```

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
https://docucraft-production.up.railway.app
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/generate/ppt` | Generate PowerPoint file |
| `POST` | `/generate/doc` | Generate Word document |
| `POST` | `/generate/pdf` | Generate PDF file |

### Request Body (all endpoints)

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
| `theme` | string | "dark" | Color theme |

### Response
Returns a binary file download (`.pptx` / `.docx` / `.pdf`)

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

### Backend → Railway

1. Go to [railway.app](https://railway.app) and login with GitHub
2. New Project → GitHub Repository → select `docucraft`
3. Click the service → **Settings**:
   - Root Directory: `backend`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Go to **Variables** tab → add:
   ```
   GROQ_API_KEY = your_groq_api_key
   ```
5. Railway auto-deploys on every GitHub push to `main`

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
docs:  add complete project README with roadmap
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

### ✅ v1.0 — Current Release
- [x] AI-powered PPT, DOC, PDF generation via Groq Llama-3
- [x] 5 custom color themes
- [x] Adjustable slide count (4–15)
- [x] Instant file download
- [x] Dark/tech UI
- [x] Deployed on Netlify + Railway
- [x] Auto-deploy on every GitHub push

### 🔐 v1.1 — Authentication (Planned)
- [ ] User registration & login
- [ ] JWT access tokens + refresh tokens
- [ ] Password hashing with bcrypt
- [ ] Protected API routes with auth middleware
- [ ] Logout & session management

### 🗄️ v1.2 — Database & History (Planned)
- [ ] PostgreSQL database integration via SQLAlchemy
- [ ] User table schema
- [ ] Download history per user
- [ ] User dashboard page
- [ ] Usage statistics & analytics

### ⚙️ v1.3 — DevOps & CI/CD (Planned)
- [ ] GitHub Actions pipeline
- [ ] Automated tests on every pull request
- [ ] Auto-deploy to Railway + Netlify on merge to `main`
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