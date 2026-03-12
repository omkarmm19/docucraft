from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import GenerateRequest
from generator import generate_ppt, generate_doc, generate_pdf

app = FastAPI(title="DocuCraft API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "DocuCraft API is running 🚀"}

@app.post("/generate/ppt")
async def create_ppt(req: GenerateRequest):
    return await generate_ppt(req)

@app.post("/generate/doc")
async def create_doc(req: GenerateRequest):
    return await generate_doc(req)

@app.post("/generate/pdf")
async def create_pdf(req: GenerateRequest):
    return await generate_pdf(req)