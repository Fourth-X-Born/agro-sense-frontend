# AgroSense AI - Frontend

**Live Web:** `https://agrosense-web.netlify.app`

React dashboard for AgroSense AI, an intelligent agricultural decision-support web platform built for Sri Lankan farmers. It covers weather-driven crop risk analysis, market prices, crop cultivation guides, and fertilizer recommendations, plus a full admin management panel. It talks to the [Spring Boot backend](https://github.com/Fourth-X-Born/agro-sense-AI-backend) (Live at `https://agro-sense-backend-km1l.onrender.com`) over a JWT-secured REST API.

## What it does

- **Personalized farmer dashboard**: greets the user by name, auto-detects the current cultivation season (Yala/Maha), and surfaces district weather, crop advisories, and market trends at a glance
- **Crop risk analysis**: runs the backend's weather-driven risk engine for the farmer's selected crop and district, and displays score, level, explanation, and recommendations, with history
- **Weather & alerts**: current conditions, forecasts, and severity-classified alerts per district
- **Market prices**: browse and filter pricing by crop and district, with trend indicators
- **Crop guide**: growth stages and DO/DON'T best-practice guidelines per crop
- **Profile management**: two-step onboarding (district + crop selection), profile photo upload, password change
- **Support**: a contact form (public, no login needed) and an interactive map of agricultural office locations
- **Admin panel**: separate login, full CRUD for crops, districts, market prices, fertilizers, and crop guides, a farmer directory, and a contact message inbox with stats
- **Robust Data Validation**: Comprehensive inline field-level validation across all forms (strict Sri Lankan phone number formats, robust password strength checks, email validation) ensuring data integrity before hitting the API.

## Tech stack

- React 19 with Vite 7
- Tailwind CSS v4
- React Router v7
- Axios, using two independent API clients (farmer and admin), each attaching its own JWT
- React Leaflet for the interactive map on the support page
- jsPDF for exportable reports

## Architecture

```text
src/
  components/
    dashboard/          Navbar, footer, notifications for logged-in farmer pages
    landing/             Public marketing page sections
    admin/                Admin panel layout and sidebar
    ProtectedRoute.jsx    Gates farmer routes on AuthContext
    AdminProtectedRoute.jsx  Gates admin routes on AdminAuthContext
  context/
    AuthContext.jsx, useAuth.js           Farmer session state (single source of truth)
    AdminAuthContext.jsx, useAdminAuth.js  Admin session state, fully separate from the farmer's
  pages/                    One file per route (see table below)
    admin/                 Admin panel pages
  routes/
    AppRoutes.jsx          All route definitions
  services/
    api.js                Axios client factory. Builds the farmer client plus adminApi.
    authService.js, adminAuthService.js  Login, register, logout, token storage
    dataService.js        Weather, risk, market prices, crop guide, and profile calls
    adminService.js       Admin CRUD calls
```

Farmer and admin sessions are kept fully independent: separate `localStorage` token keys, separate Axios clients (so an admin token never leaks onto a farmer request or vice versa), and separate React contexts and route guards.

## Available routes

| Route | Description | Access |
| --- | --- | --- |
| `/` | Landing page | Public |
| `/login`, `/register` | Auth forms | Public |
| `/complete-profile` | Two-step profile completion | Farmer |
| `/dashboard` | Farmer dashboard | Farmer |
| `/crop-risk` | Crop risk assessment | Farmer |
| `/weather` | Weather forecasts and alerts | Farmer |
| `/market-prices` | Market price tracker | Farmer |
| `/crop-guide` | Crop cultivation guide | Farmer |
| `/settings` | Profile settings | Farmer |
| `/contact`, `/contact-us` | Support contact form | Public |
| `/privacy`, `/terms` (and landing variants) | Policy pages | Public |
| `/admin/login`, `/admin/register` | Admin auth | Public |
| `/admin`, `/admin/crops`, `/admin/crop-guides`, `/admin/market-prices`, `/admin/fertilizer`, `/admin/farmers`, `/admin/user-requests` | Admin panel | Admin |

## Getting started

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- The [backend](https://github.com/Fourth-X-Born/agro-sense-AI-backend) running locally on port 8080, or a deployed instance

### 1. Install and run

```bash
npm install
npm run dev
```

Open the URL printed in the terminal, usually `http://localhost:5173`.

### 2. Point at a different backend (optional)

By default the app calls `http://localhost:8080/api`. To point elsewhere, set the `VITE_API_URL` environment variable to your backend's URL before running the dev server or build.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Fully configured for seamless deployment on **Netlify** (via `netlify.toml`). Make sure to set `VITE_API_URL=https://agro-sense-backend-km1l.onrender.com/api` (or your backend URL) in your Netlify environment variables before deploying.

## Team

Fourth X Born, DEV-55

- Vibhath Kalsara
- Isuru Adikaram
- Ashen Randira
- Dileepa Prabhath
- Chanuka Ushan
