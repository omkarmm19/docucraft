from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
from models import GenerateRequest
from generator import generate_ppt, generate_doc, generate_pdf
from auth import get_current_user
from routers.auth_router import router as auth_router

# Create DB tables on startup (User table etc.)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="DocuCraft API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://docuucraft.netlify.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Auth routes (/auth/register, /auth/login, /auth/me) ──────────────────────
app.include_router(auth_router)


# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "DocuCraft API is running 🚀"}


# ── Protected generation routes ───────────────────────────────────────────────
@app.post("/generate/ppt")
async def create_ppt(req: GenerateRequest, current_user=Depends(get_current_user)):
    return await generate_ppt(req)


@app.post("/generate/doc")
async def create_doc(req: GenerateRequest, current_user=Depends(get_current_user)):
    return await generate_doc(req)


@app.post("/generate/pdf")
async def create_pdf(req: GenerateRequest, current_user=Depends(get_current_user)):
    return await generate_pdf(req)