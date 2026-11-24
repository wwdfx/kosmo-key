# Kosmo Key — Frontend Developer Guide (Trainee)

Welcome! This `frontend/` directory is your workspace for building the **Kosmo Key — The Source** user interface in **React + TypeScript**.

---

## 1. Where You Should Work

All of your code should live inside `frontend/`:

- **`frontend/public/assets/`**: Place all exported images, backgrounds, and SVG icons from Figma here (e.g., `hero-moss.png`, `micelio-roots.png`, `logo.png`). Reference them in JSX as `/assets/<filename>`.
- **`frontend/src/components/`**: Build modular, reusable components here:
  - `Navbar.tsx` — Top header with the `KOSMO KEY` logo, User & Bag icons, and navigation items (`SERVICIOS`, `TERAPIAS`, `CONÓCENOS`, `PRODUCTOS`, `SANCTUARY`).
  - `Hero.tsx` — Hero section featuring the moss background, `"THE SOURCE"` headline, `"Vuelve al lugar donde todo comienza"` subtitle, and the rounded `"ACCESO PRIORITARIO"` CTA button.
  - `CourseCatalog.tsx` & `CourseCard.tsx` — E-commerce course grid rendered over the lower mycelium roots background.
  - `CartModal.tsx` / `PriorityAccessModal.tsx` — Interactive modals/drawers for priority registration and course checkout.
- **`frontend/src/pages/`**: Page-level views if you split the application into multiple views.
- **`frontend/src/api/client.ts`**: Add or extend typed `fetch` calls to communicate with the backend (`/api/*`).
- **`frontend/src/types/api.ts`**: Keep TypeScript interfaces aligned with the backend API responses.

---

## 2. Figma Design Specs

- **Figma File**: [Kosmokey Design (Node 1-2)](https://www.figma.com/design/lRuObcYPhBvehszqhP5TES/Kosmokey?node-id=1-2)
- **Canvas Size**: `1440px` desktop reference width (`#000000` black base background).
- **Typography** (already loaded in `frontend/index.html` via Google Fonts):
  - **Primary / Headings**: `'Nunito Sans', sans-serif`
    - Navigation links (`12px`–`13px`, letter-spacing `0.6px`)
    - Hero Title (`"THE SOURCE"`): `64px`, extra-black weight (`900+`), letter-spacing `3.2px`, wide variation (`font-variation-settings: "YTLC" 500, "wdth" 125`)
    - CTA Button (`"ACCESO PRIORITARIO"`): `20px`, letter-spacing `1px`, pill border-radius `100px`
  - **Display / Subtitle**: `'Red Hat Display', sans-serif`
    - Hero Subtitle (`"Vuelve al lugar donde todo comienza"`): `40px`, regular weight (`400`), line-height `60px`, letter-spacing `2px`, right-aligned.

---

## 3. Running & Verifying Your Work

1. Start the backend server from the repo root (so `/api/courses` works):
   ```bash
   npm run dev:backend
   ```
2. Start the frontend Vite server:
   ```bash
   cd frontend
   npm run dev
   ```
3. Before opening a Pull Request, always verify that TypeScript compiles cleanly with zero errors:
   ```bash
   npm run typecheck
   npm run build
   ```

---

## 4. Git Workflow for Trainee

1. Create a feature branch from `main` for each task:
   ```bash
   git checkout -b feat/hero-and-navbar
   ```
2. Commit your changes in clear, small commits:
   ```bash
   git add frontend/
   git commit -m "feat(frontend): implement navbar and hero section from Figma"
   ```
3. Push your branch and open a Pull Request for review:
   ```bash
   git push -u origin feat/hero-and-navbar
   ```
