from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


# ── SQLAlchemy ORM Models ─────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id              = Column(Integer, primary_key=True, index=True)
    email           = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at      = Column(DateTime(timezone=True), server_default=func.now())


class GenerationHistory(Base):
    __tablename__ = "generation_history"

    id          = Column(Integer, primary_key=True, index=True)
    user_id     = Column(Integer, ForeignKey("users.id"), nullable=False)
    topic       = Column(String, nullable=False)
    doc_type    = Column(String, nullable=False)   # "ppt" | "doc" | "pdf"
    theme       = Column(String, nullable=False)
    slide_count = Column(Integer, nullable=False)
    created_at  = Column(DateTime(timezone=True), server_default=func.now())


# ── Pydantic Schemas ──────────────────────────────────────────────────────────

class GenerateRequest(BaseModel):
    topic:       str
    slide_count: int = Field(default=8, ge=4, le=15)
    theme:       str = "dark"


class UserCreate(BaseModel):
    email:    EmailStr
    password: str


class UserLogin(BaseModel):
    email:    EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type:   str = "bearer"


class UserOut(BaseModel):
    id:    int
    email: str

    model_config = {"from_attributes": True}


class HistoryOut(BaseModel):
    id:          int
    topic:       str
    doc_type:    str
    theme:       str
    slide_count: int
    created_at:  datetime

    model_config = {"from_attributes": True}