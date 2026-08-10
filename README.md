# Yogdham Sansthan — MERN Stack Website

A full-stack website for a premium yoga institution, built with MongoDB, Express, React (Vite) and Node.js.

```
yogdham-sansthan/
├── backend/     Express API + MongoDB (Mongoose) + JWT admin auth
└── frontend/    React (Vite) site + admin dashboard
```

## Features

- Public site: Home, About, Programs, Trainers, Gallery, Contact
- Registration form → stored in MongoDB (`Registration` collection)
- Trainers fetched live from MongoDB and rendered on Home + Trainers pages
- JWT-protected admin dashboard:
  - View / update status / delete registrations
  - Add / edit / delete trainer profiles (instantly reflected on the site)
- Rate limiting, Helmet, CORS, centralized error handling on the API
- Fully responsive, no build-breaking dependencies, clean component structure

## 0. Quick start (run everything from the root)

Install root dev-dependency (`concurrently`) once:

```bash
npm install
```

Then install both apps' dependencies and set up env files:

```bash
npm run install:all
cp backend/.env.example backend/.env      # then edit values, see table below
cp frontend/.env.example frontend/.env    # set VITE_API_URL if backend isn't on localhost:5000
```

Create the first admin account (run once):

```bash
npm run seed:admin
```

Start **both** backend and frontend together, from the project root:

```bash
npm run dev
```

- Backend API → `http://localhost:5000` (health check: `GET /api/health`)
- Frontend site → `http://localhost:5173`

You can still run them individually if you prefer:

```bash
npm run dev:backend
npm run dev:frontend
```

## 1. Backend setup (manual / individual)

```bash
cd backend
cp .env.example .env      # then edit values below
npm install
```

Edit `backend/.env`:

| Variable | Description |
|---|---|
| `MONGO_URI` | Your MongoDB connection string (local or Atlas) |
| `JWT_SECRET` | Any long random string |
| `CLIENT_URL` | URL(s) of the frontend, comma-separated if more than one |
| `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Used once by the seed script below |

Create the first admin account:

```bash
npm run seed:admin
```

Run the API:

```bash
npm run dev      # nodemon, auto-restarts
# or
npm start
```

The API runs on `http://localhost:5000` by default. Health check: `GET /api/health`.

## 2. Frontend setup (manual / individual)

```bash
cd frontend
cp .env.example .env      # set VITE_API_URL if backend isn't on localhost:5000
npm install
npm run dev
```

Visit `http://localhost:5173`.

## 3. Using the admin panel

The admin login is intentionally **not linked anywhere on the public site** (no "Admin Login" button in the navbar/footer) — it's only reachable if you know the URL.

1. Go directly to `/admin/login` (e.g. `http://localhost:5173/admin/login`).
2. Sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `backend/.env` before running `npm run seed:admin`.
3. From the dashboard you can:
   - Review, update status, and delete registrations.
   - Add, edit, and delete trainers — changes appear on the public **Trainers** page and **Home** page immediately (no redeploy needed).

## 4. API reference

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/login` | Public | Admin login, returns JWT |
| GET | `/api/auth/me` | Private | Current admin profile |
| POST | `/api/registrations` | Public | Submit a new registration |
| GET | `/api/registrations` | Private | List all registrations |
| PUT | `/api/registrations/:id` | Private | Update registration status |
| DELETE | `/api/registrations/:id` | Private | Delete a registration |
| GET | `/api/trainers` | Public | List active trainers (used by the website) |
| GET | `/api/trainers/all` | Private | List all trainers (admin) |
| POST | `/api/trainers` | Private | Create a trainer |
| PUT | `/api/trainers/:id` | Private | Update a trainer |
| DELETE | `/api/trainers/:id` | Private | Delete a trainer |

All `Private` routes require `Authorization: Bearer <token>`.

## 5. Deployment notes

- Backend: deploy to Render / Railway / any Node host. Set the same environment variables as `.env.example`, plus a production `MONGO_URI` (e.g. MongoDB Atlas) and `CLIENT_URL` pointing to your deployed frontend domain.
- Frontend: `npm run build` produces a static `dist/` folder deployable to Vercel, Netlify, or any static host. Set `VITE_API_URL` to your deployed backend's `/api` URL at build time.
- Rotate `JWT_SECRET` and the seeded admin password before going to production.

## 6. Design system

| Token | Value |
|---|---|
| Primary | `#1F5E4A` |
| Secondary | `#4C8C6A` |
| Accent | `#D6B36A` |
| Background | `#F8F8F6` |
| Headings | Poppins |
| Body | Inter |

Gallery and trainer placeholder photography currently link to Unsplash — replace with your own studio photography before launch.
