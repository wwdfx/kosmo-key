# Kosmo Key — Backend API (Node.js + Express + TypeScript)

Complete REST API for the **Kosmo Key** platform covering **Servicios**, **Terapias** (Calendly), **Programas** (*PROGRAMA ORIGEN*), **Productos** (*Sylvia's Sensory Kit* & therapy packs), **Experiencias** (Waitlist), **Team** (*La Familia Kosmo*), and **Stripe Checkout**.

---

## 1. Environment Configuration (`.env`)

Copy `backend/.env.example` to `backend/.env`:

```env
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173

# Stripe Credentials (from Ona)
# Leave empty during local frontend development to use automatic Mock Checkout mode
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Calendly Booking URLs
CALENDLY_BASE_URL=https://calendly.com/kosmokey
CALENDLY_CONSULTING_URL=https://calendly.com/kosmokey/consultoria-personalizada
CALENDLY_THERAPY_DEFAULT_URL=https://calendly.com/kosmokey/sesion-terapia
```

> **Automatic Mock Mode for Frontend Development**: If `STRIPE_SECRET_KEY` is not set yet (while waiting for credentials from Ona), `POST /api/checkout/session` automatically runs in `mock` mode and returns a working `{ orderId, sessionId, checkoutUrl, mode: "mock" }` response so the frontend trainee can build and test the entire checkout flow without needing Stripe keys locally.

---

## 2. REST API Endpoints

All endpoints are prefixed with `/api` (proxied automatically by Vite in `frontend/vite.config.ts`).

### Health & Full Catalog
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Returns server status, `stripeMode` (`"stripe_live" \| "stripe_test" \| "mock"`), and `calendlyBaseUrl`. |
| `GET` | `/api/catalog` | Returns the entire catalog in one request: `{ team, servicios, terapias, programas, productos, experiencias }`. |

### Team ("La Familia Kosmo" Slider)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/team` | List all 9 Kosmo Key team members (`{ team: TeamMember[], total }`). |
| `GET` | `/api/team/:id` | Get a single team member by ID or slug (e.g., `/api/team/lluis-espinosa`). |

### 1. Servicios (`ServiciosPage`)
Covers the 4 service pillars:
1. **Kosmo Architecture** (`kosmo-architecture`) — Customer Architecture Strategy building
2. **Digitalización de Negocio** (`digitalizacion-de-negocio`) — Website, E-Commerce, CRMs, automation
3. **Estrategia Redes Sociales** (`estrategia-redes-sociales`) — SMM & content strategy
4. **Consultoría Personalizada** (`consultoria-personalizada`) — 1:1 consulting connected to **Calendly**

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/servicios` | List all services (`{ servicios: ServiceItem[], total }`). Optional `?category=STRATEGY\|DIGITALIZATION\|SMM\|CONSULTING`. |
| `GET` | `/api/servicios/:id` | Get a single service by ID or slug. |
| `POST` | `/api/servicios/inquiry` | Submit an inquiry `{ serviceIdOrSlug, fullName, email, companyName?, phone?, message }` and receive a prefilled `calendlyUrl`. |

### 2. Terapias (`TerapiasPage` — Connected to Calendly)
Covers the therapy sessions:
- **Biodescodificación** (`biodescodificacion` — Lluís Espinosa)
- **Constelaciones** (`constelaciones` — Lluís Espinosa)
- **Respiración Conectada** (`respiracion-conectada` — Fernando Respira)
- **Meditación Cuántica** (`meditacion-cuantica` — Jana Transition)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/terapias` | List all therapy sessions (`{ terapias: TherapySession[], total }`) with `calendlyUrl` and price. |
| `GET` | `/api/terapias/:id` | Get a single therapy session by ID or slug. |

### 3. Programas (`ProgramasPage` — PROGRAMA ORIGEN)
Includes Sylvia's template for **PROGRAMA ORIGEN** (*Programa de Biodescodificación con Lluís Espinosa* — **799 €** en pago único, Garantía 7 días, 9 items included).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/programas` | List all programs (`{ programas: ProgramItem[], total }`). |
| `GET` | `/api/programas/:id` | Get a single program (e.g., `/api/programas/programa-origen`). |
| `POST` | `/api/programas/:id/enroll` | Direct 1-click Stripe Checkout enrollment for a program (`{ customerName?, customerEmail?, successUrl?, cancelUrl? }`). |

### 4. Productos (`ProductosPage` — E-Commerce & Sylvia's Sensory Kit)
Includes **Sylvia's Sensory Kit** (`sylvias-sensory-kit` — 145 €), **Pack 3 Sesiones de Terapia** (`pack-3-sesiones-terapia` — 235 €), and **E-Book: Mapa Transgeneracional** (`ebook-mapa-transgeneracional` — 39 €).

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/productos` | List all products (`{ productos: ProductItem[], total }`). Optional `?type=physical\|digital\|therapy_bundle`. |
| `GET` | `/api/productos/:id` | Get a single product by ID or slug. |

### 5. Experiencias (`ExperienciasPage` — TBD & Waitlist)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/experiencias` | List upcoming experiences (`{ status: "TBD", experiencias: ExperienceItem[], total }`). |
| `POST` | `/api/experiencias/waitlist` | Register for the experiences waitlist (`{ fullName, email, experienceSlug? }`). |

### 6. Calendly Scheduling (`/api/calendly`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/calendly/links` | Get all Calendly links for Consultoría Personalizada and Terapias. |
| `POST` | `/api/calendly/schedule` | Generate a prefilled Calendly redirect URL (`{ type: "CONSULTING" \| "THERAPY", targetIdOrSlug, name, email, notes? }`). |

### 7. Stripe Checkout & Webhooks (`/api/checkout`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/checkout/session` | Create a Stripe Checkout session for any cart of `programa`, `producto`, `terapia`, or `servicio` items. |
| `GET` | `/api/checkout/session/:sessionId` | Get order & payment status (`PAID` / `PENDING`) and `calendlyNextStepUrl`. |
| `POST` | `/api/webhooks/stripe` | Stripe webhook receiver (`checkout.session.completed`). |

---

## 3. Copy-Paste TypeScript Interfaces for Frontend (`frontend/src/types/api.ts`)

The frontend trainee can copy or import the exact interfaces from [`backend/src/models/catalog.types.ts`](./src/models/catalog.types.ts):

```ts
// Example: Creating a Stripe Checkout Session from the React Frontend
const response = await fetch('/api/checkout/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    customerName: 'María López',
    customerEmail: 'maria@example.com',
    items: [
      { itemType: 'programa', itemId: 'programa-origen', quantity: 1 },
      { itemType: 'producto', itemId: 'sylvias-sensory-kit', quantity: 1 },
    ],
  }),
});

const data = await response.json();
// Redirect user to Stripe Checkout (or mock success URL in local dev):
window.location.href = data.checkoutUrl;
```
