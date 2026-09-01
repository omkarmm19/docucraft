import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "")

# Fix Render/Heroku style postgres:// → postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# If DATABASE_URL is missing or invalid, fall back to SQLite
if not DATABASE_URL.startswith(("postgresql://", "postgresql+", "sqlite://")):
    print("WARNING: No valid DATABASE_URL found — falling back to SQLite (data will reset on redeploy)")
    DATABASE_URL = "sqlite:///./docucraft.db"

def _get_engine(url: str):
    if "sqlite" in url:
        return create_engine(url, connect_args={"check_same_thread": False})
    return create_engine(url, pool_pre_ping=True, pool_recycle=300)

try:
    engine = _get_engine(DATABASE_URL)
except Exception as e:
    print(f"WARNING: Could not connect to database ({e}) — falling back to SQLite")
    DATABASE_URL = "sqlite:///./docucraft.db"
    engine = _get_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
