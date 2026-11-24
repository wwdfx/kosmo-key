# Kosmo Key — The Source (Coaching E-Commerce Platform)

Welcome to the **Kosmo Key** monorepo. Kosmo Key is an e-commerce web platform for selling coaching, somatic therapy, and personal transformation courses inspired by the *Kosmo Key — The Source* Figma design.

---

## 1. Project Scope & Overview

The goal of this project is to build a full-stack e-commerce web application where visitors can:
1. Experience the **Kosmo Key — The Source** landing and hero experience from the Figma design:
   - **Figma Design Reference**: [Kosmokey Figma File (Node 1-2)](https://www.figma.com/design/lRuObcYPhBvehszqhP5TES/Kosmokey?node-id=1-2)
2. Browse and filter coaching programs across the core categories shown in the navigation bar:
   - `SERVICIOS` (Ontological & Executive Coaching)
   - `TERAPIAS` (Somatic & Relational Therapy Courses)
   - `CONÓCENOS` (About Kosmo Key & Methodology)
   - `PRODUCTOS` (Self-Guided Digital Coaching Kits)
   - `SANCTUARY` (Community Membership & Virtual Retreats)
3. Register for **Priority Access (`ACCESO PRIORITARIO`)** via the main hero CTA.
4. Add coaching courses to a shopping bag and complete checkout against the Node.js/TypeScript backend API.

---

## 2. Team Ownership & Where to Work

To keep collaboration clean and avoid merge conflicts, ownership is strictly separated by directory:

| Area | Directory | Owner | Responsibility |
| :--- | :--- | :--- | :--- |
| **Frontend UI** | [`frontend/`](./frontend) | **Trainee Frontend Developer** | Build the React + TypeScript UI from the Figma design, manage client state (course filters, modals, shopping bag), and consume the `/api/*` endpoints. |
| **Backend API** | [`backend/`](./backend) | **Backend Lead** | Develop the Node.js + Express + TypeScript REST API, business logic, database integration, and payment/checkout endpoints. |
| **DevOps & Proxy** | [`Caddyfile`](./Caddyfile), [`deploy/`](./deploy), [`docker-compose.yml`](./docker-compose.yml) | **Backend / DevOps Lead** | Containerization (Docker), reverse proxy routing (Caddy), HTTPS, and production deployment. |

> **Important for Frontend Trainee**: Do **not** modify files inside `backend/`, `deploy/`, `Caddyfile`, or `docker-compose.yml` unless coordinated with the Backend Lead. All of your work lives inside [`frontend/`](./frontend). Read [`frontend/README.md`](./frontend/README.md) before starting.

---

## 3. Repository Structure

```text
kosmo-key/
├── README.md                  # Project overview, scope, and setup instructions
├── package.json               # Root convenience scripts for running frontend & backend
├── docker-compose.yml         # Multi-container orchestration (frontend, backend, caddy)
├── Caddyfile                  # Root Caddy reverse proxy (/api/* -> backend, /* -> frontend)
├── .env.example               # Template for root environment variables
├── deploy/
│   └── Caddyfile.prod         # Production Caddyfile with automatic HTTPS & security headers
├── frontend/                  # 👈 TRAINEE FRONTEND WORKSPACE (React + TypeScript + Vite)
│   ├── README.md              # Detailed frontend trainee guide & Figma specifications
│   ├── Dockerfile             # Multi-stage build (Node 22 -> Caddy static SPA server)
│   ├── Caddyfile              # SPA routing config for the frontend container
│   ├── index.html             # HTML entrypoint (preloaded with Nunito Sans & Red Hat Display)
│   ├── vite.config.ts         # Vite config with /api proxy to http://localhost:4000
│   ├── public/
│   │   └── assets/            # Exported Figma images, logos, and SVGs go here
│   └── src/
│       ├── main.tsx           # React DOM root
│       ├── App.tsx            # Main application component (starter placeholder)
│       ├── App.css            # Global styles and CSS variables
│       ├── api/
│       │   └── client.ts      # Typed API fetch functions
│       ├── components/        # Reusable UI components (Navbar, Hero, CourseCard, Cart...)
│       ├── pages/             # Page-level views
│       └── types/
│           └── api.ts         # Shared TypeScript interfaces for API payloads
└── backend/                   # 🔒 BACKEND WORKSPACE (Node.js + Express + TypeScript)
    ├── README.md              # Backend API reference
    ├── Dockerfile             # Multi-stage production Node 22 build
    └── src/
        ├── index.ts           # Express server entrypoint (Port 4000)
        ├── config/            # Environment configuration
        ├── routes/            # Express route definitions (/api/health, /api/courses, etc.)
        ├── controllers/       # Request handlers
        ├── models/            # TypeScript domain interfaces
        └── data/              # Starter seed courses for frontend integration testing
```

---

## 4. Quickstart (Local Development)

### Prerequisites
- **Node.js** `>= 20.x` (Node 22+ recommended)
- **npm** `>= 10.x`

### 1. Install Dependencies
From the repository root:
```bash
npm run install:all
```

### 2. Start the Backend API (Port `4000`)
In terminal 1:
```bash
npm run dev:backend
```
The backend API will run at `http://localhost:4000` (health check: `http://localhost:4000/api/health`).

### 3. Start the Frontend Dev Server (Port `5173`)
In terminal 2:
```bash
npm run dev:frontend
```
Open `http://localhost:5173` in your browser. Vite is already configured to proxy any request starting with `/api` to `http://localhost:4000`.

---

## 5. Running with Docker & Caddy

To build and test the full containerized stack locally (Frontend + Backend + Caddy Reverse Proxy):

```bash
docker compose up --build
```

Once running, the application is served through **Caddy** at `http://localhost:8080`:
- `http://localhost:8080/` → React Frontend
- `http://localhost:8080/api/health` → Node.js Backend API

---

## 6. Available API Endpoints (Starter Contract)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check returning `{ status: "ok", service: "kosmo-key-backend", timestamp }` |
| `GET` | `/api/courses` | List coaching courses. Optional query param: `?category=SERVICIOS\|TERAPIAS\|PRODUCTOS\|SANCTUARY` |
| `GET` | `/api/courses/:id` | Get a single course by ID or slug |
| `POST` | `/api/priority-access` | Submit `"ACCESO PRIORITARIO"` form (`{ fullName, email, interestCategory }`) |
| `POST` | `/api/checkout` | Submit a course purchase order (`{ customerName, customerEmail, items }`) |
