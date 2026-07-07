from pydantic import BaseModel, EmailStr
from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base


# ── SQLAlchemy ORM Model ─────────────────────────────────────────────────────

class User(Base):
    __tablename__ = "users"

    id             = Column(Integer, primary_key=True, index=True)
    email          = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    created_at     = Column(DateTime(timezone=True), server_default=func.now())


# ── Pydantic Schemas ──────────────────────────────────────────────────────────

class GenerateRequest(BaseModel):
    topic:       str
    slide_count: int = 8
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