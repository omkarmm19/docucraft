from fastapi import FastAPI, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, Base, get_db
from models import GenerateRequest, GenerationHistory
from generator import generate_ppt, generate_doc, generate_pdf
from auth import get_current_user
from routers.auth_router import router as auth_router
from routers.history_router import router as history_router

# Create DB tables on startup (User + GenerationHistory)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DocuCraft API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://docuucraft.netlify.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth_router)
app.include_router(history_router)


# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "DocuCraft API is running 🚀"}


# ── Helper: save a generation record ─────────────────────────────────────────
def save_history(db: Session, user_id: int, req: GenerateRequest, doc_type: str):
    record = GenerationHistory(
        user_id     = user_id,
        topic       = req.topic,
        doc_type    = doc_type,
        theme       = req.theme,
        slide_count = req.slide_count,
    )
    db.add(record)
    db.commit()


# ── Protected generation routes ───────────────────────────────────────────────
@app.post("/generate/ppt")
async def create_ppt(
    req:              GenerateRequest,
    background_tasks: BackgroundTasks,
    current_user      = Depends(get_current_user),
    db: Session       = Depends(get_db),
):
    response = await generate_ppt(req, background_tasks)
    save_history(db, current_user.id, req, "ppt")
    return response


@app.post("/generate/doc")
async def create_doc(
    req:              GenerateRequest,
    background_tasks: BackgroundTasks,
    current_user      = Depends(get_current_user),
    db: Session       = Depends(get_db),
):
    response = await generate_doc(req, background_tasks)
    save_history(db, current_user.id, req, "doc")
    return response


@app.post("/generate/pdf")
async def create_pdf(
    req:              GenerateRequest,
    background_tasks: BackgroundTasks,
    current_user      = Depends(get_current_user),
    db: Session       = Depends(get_db),
):
    response = await generate_pdf(req, background_tasks)
    save_history(db, current_user.id, req, "pdf")
    return response