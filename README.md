# Contafy Frontend

Frontend for **Contafy** — SaaS financial management system. Built with Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui, React Hook Form, Zod, and TanStack Query. Uses **mock data** until the backend (NestJS + PostgreSQL) is ready.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Go to Dashboard** then navigate via the sidebar.

## Roadmap

See [FRONTEND_ROADMAP.md](../FRONTEND_ROADMAP.md) in the repo root for the phased development plan (Phases 1–6). Current state: **Phase 1** (project setup) and **Phase 2** (layout + navigation) are done.

## Structure

- `app/` — Next.js App Router (dashboard, reconciliation, transactions, settings)
- `components/` — `dashboard/`, `forms/`, `ui/` (shadcn)
- `lib/` — `api/` (query keys), `mocks/` (mock services), `utils.ts`
- `types/` — shared TypeScript types

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — start production server
- `npm run lint` — ESLint
