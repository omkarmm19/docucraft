# ──────────────────────────────────────────────────────────────────────────────
# DocuCraft Frontend — Dockerfile
# Multi-stage: build with Node, serve with lightweight Nginx
# ──────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build the React app ──────────────────────────────────────────────
FROM node:24-slim AS build

WORKDIR /app

# Install dependencies first (cached layer if package.json unchanged)
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ─────────────────────────────────────────────────
FROM nginx:alpine AS production

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy Nginx config to handle React Router (SPA fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
