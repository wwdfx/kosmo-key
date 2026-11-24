# Kosmo Key — Backend API (Node.js + TypeScript)

This `backend/` directory contains the Express + TypeScript REST API for the Kosmo Key coaching e-commerce platform.

## Commands

```bash
# Development server with live reload (Port 4000)
npm run dev

# Type-check without emitting files
npm run typecheck

# Compile TypeScript to dist/
npm run build

# Run compiled production build
npm start
```

## Endpoints

- `GET /api/health` — Service health status
- `GET /api/courses` — List coaching courses (optional `?category=SERVICIOS|TERAPIAS|PRODUCTOS|SANCTUARY`)
- `GET /api/courses/:id` — Fetch a single coaching course by ID or slug
- `POST /api/priority-access` — Register a user for priority access (`ACCESO PRIORITARIO`)
- `POST /api/checkout` — Process a course enrollment order
