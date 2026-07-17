# DocuCraft ⚡

> AI-powered document generator — Create stunning PPT, DOC & PDF files in seconds using Groq Llama-3

[![Live Demo](https://img.shields.io/badge/Live%20Demo-docuucraft.netlify.app-00d4ff?style=for-the-badge&logo=netlify&logoColor=white)](https://docuucraft.netlify.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://docucraft-backend.onrender.com)
[![CI](https://github.com/omkarmm19/docucraft/actions/workflows/ci.yml/badge.svg)](https://github.com/omkarmm19/docucraft/actions/workflows/ci.yml)
[![GitHub](https://img.shields.io/badge/GitHub-omkarmm19-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/omkarmm19/docucraft)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.135-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| 🖥️ Frontend | https://docuucraft.netlify.app |
| ⚙️ Backend API | https://docucraft-backend.onrender.com |
| 📖 API Docs | https://docucraft-backend.onrender.com/docs |
| 🔁 CI/CD Pipeline | [GitHub Actions Workflow](https://github.com/omkarmm19/docucraft/actions) |

---

## ✨ Features

- 🤖 **AI-Powered** — Uses Groq Llama-3.3-70B to generate structured content instantly
- 📊 **PowerPoint (.pptx)** — Multi-slide presentations with custom color themes
- 📝 **Word Document (.docx)** — Formatted documents with themed headings and bullet points
- 📄 **PDF Export** — Clean PDF with colored backgrounds matching chosen theme
- 🎨 **5 Themes** — Dark, Blue, Green, Purple, Light
- 🎛️ **Custom Slide Count** — Choose between 4 to 15 slides
- ⚡ **Instant Download** — Files download directly to your device and self-clean on the server
- 🔐 **User Auth** — Register, login, JWT-protected routes, logout
- 📜 **Generation History** — Every download is logged; view, regenerate, & delete from your dashboard
- 🛡️ **Error Boundaries** — Resilient frontend with branded error recovery screens
- 🐳 **Dockerized** — Fully containerized using Docker and Docker Compose
- 🚀 **CI/CD Pipeline** — Automated GitHub Actions pipeline verifying builds and tests on every push

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

### Backend
| Tech | Purpose |
|------|---------|
| FastAPI | Python web framework |
| Groq SDK | Llama-3 AI API |
| SQLAlchemy | ORM for database access (PostgreSQL) |
| python-jose & bcrypt | JWT token creation & Password hashing |
| python-pptx, docx, fpdf2| Document generation libraries |

### DevOps & Hosting
| Tech | Purpose |
|------|---------|
| Docker & Compose | Local containerization and orchestration |
| GitHub Actions | Automated CI/CD pipeline |
| Nginx | Production frontend static server / router |
| Neon (PostgreSQL) | Persistent cloud database |
| Netlify & Render | Frontend & Backend cloud hosting |

---

## 🏗️ Project Structure

```
docucraft/
├── backend/
│   ├── main.py                  # FastAPI app, CORS, routes
│   ├── generator.py             # Groq AI integration + PPT/DOC/PDF generation
│   ├── auth.py                  # JWT creation, bcrypt
│   ├── database.py              # SQLAlchemy engine (Neon PostgreSQL)
│   ├── models.py                # ORM models + Pydantic schemas
│   ├── Dockerfile               # Multi-stage lean Python image
│   └── .env.example             # Env vars template
│
├── frontend/
│   ├── src/
│   │   ├── api.js               # Axios instance + JWT interceptor
│   │   ├── components/          # ErrorBoundary, ProtectedRoute
│   │   └── pages/               # Login, Register, Generator, History
│   ├── Dockerfile               # Multi-stage Node build -> Nginx serve
│   └── nginx.conf               # Nginx SPA fallback configuration
│
├── .github/workflows/ci.yml     # CI/CD Pipeline (Build & Test)
├── docker-compose.yml           # One-command full-stack orchestration
└── README.md
```

---

## 🚀 Getting Started Locally (Recommended: Docker)

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Groq API Key — free at [console.groq.com](https://console.groq.com)

### 1. Clone the repository

```bash
git clone https://github.com/omkarmm19/docucraft.git
cd docucraft
```

### 2. Configure Environment Variables

```bash
cp backend/.env.example backend/.env
```
Edit `backend/.env` and add your Groq API Key and a random string for the `SECRET_KEY`.

### 3. Run the Full Stack

```bash
docker compose up --build
```

- **Frontend** runs at: `http://localhost:5173`
- **Backend API** runs at: `http://localhost:8000`
- **Interactive API Docs** at: `http://localhost:8000/docs`

> *Note: If `DATABASE_URL` is not set in `.env`, the app falls back to a local SQLite database inside the container automatically.*

---

## 🌐 API Reference

### Base URL
```
https://docucraft-backend.onrender.com
```

### Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/register` | ❌ | Register new account → returns JWT |
| `POST` | `/auth/login` | ❌ | Login → returns JWT |
| `GET` | `/auth/me` | ✅ | Get current user info |
| `POST` | `/generate/ppt` | ✅ | Generate PowerPoint file |
| `POST` | `/generate/doc` | ✅ | Generate Word document |
| `POST` | `/generate/pdf` | ✅ | Generate PDF file |
| `GET` | `/history/` | ✅ | Get last 50 generations for current user |
| `DELETE` | `/history/{id}` | ✅ | Delete a specific history record |

---

## 🚢 CI/CD & Deployment

This project uses **GitHub Actions** for Continuous Integration. On every push to the `main` branch, the pipeline:
1. Runs a Python smoke test on all backend imports.
2. Builds the backend Docker image.
3. Builds the production frontend Vite bundle.

Continuous Deployment is handled natively:
- **Backend:** Hosted on [Render](https://render.com) using the `render.yaml` infrastructure-as-code configuration. Auto-deploys on `main` branch updates.
- **Frontend:** Hosted on [Netlify](https://netlify.com). Auto-builds and deploys the static React app.

---

## 🗺️ Roadmap & Status

### ✅ v1.0 — Core Release
- [x] AI-powered PPT, DOC, PDF generation via Groq Llama-3
- [x] 5 custom color themes
- [x] Adjustable slide count (4–15)
- [x] Instant file download

### ✅ v1.1 — Authentication
- [x] User registration & login (JWT + bcrypt)
- [x] Protected API routes

### ✅ v1.2 — Database & History
- [x] PostgreSQL database integration (Neon)
- [x] Generation history dashboard
- [x] Regenerate documents with one click

### ✅ v1.3 — DevOps & CI/CD
- [x] GitHub Actions CI pipeline
- [x] Dockerfile for containerized backend & frontend
- [x] Docker Compose for local full-stack development
- [x] Nginx configuration for SPA routing

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feat/your-feature-name`)
3. Commit your changes (`git commit -m "feat: add your feature"`)
4. Push to the branch (`git push origin feat/your-feature-name`)
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
  <b>DocuCraft</b> — Built with ❤️ using Groq Llama-3 • 2026
</p>
