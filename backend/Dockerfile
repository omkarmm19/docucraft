# ──────────────────────────────────────────────────────────────────────────────
# DocuCraft Backend — Dockerfile
# Multi-stage build: keeps final image lean by not including build tools
# ──────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Base image ───────────────────────────────────────────────────────
FROM python:3.12-slim AS base

# Prevents Python from writing .pyc files & enables unbuffered logging
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# ── Stage 2: Install dependencies ─────────────────────────────────────────────
FROM base AS deps

# Install system dependencies needed by psycopg2 and python-pptx
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── Stage 3: Final production image ───────────────────────────────────────────
FROM base AS production

# Copy installed packages from deps stage
COPY --from=deps /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=deps /usr/local/bin /usr/local/bin

# Copy application source code
COPY . .

# Expose the port Uvicorn will listen on (overridden by $PORT on Render)
EXPOSE 8000

# Start the FastAPI server
# Uses $PORT env var if set (Render), otherwise defaults to 8000
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}"]
