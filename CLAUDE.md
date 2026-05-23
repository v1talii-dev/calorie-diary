# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # start dev server
npm run build        # tsc type-check + vite build
npm run lint         # eslint src/
npm run format       # prettier --write
npm run deploy       # build + publish to GitHub Pages
```

No test suite is configured.

## Environment setup

Copy `env.example` to `.env` and fill in Firebase credentials from the Firebase console. All variables are prefixed `VITE_FIREBASE_`.

## Architecture

The project follows **Feature-Sliced Design (FSD)**. Layers, from lowest to highest abstraction:

```
shared/     — reusable primitives (api clients, constants, lib utils, UI kit)
entities/   — business domain models: diary, product, user
features/   — user-facing interactions: diaryList, diaryPopup, diaryStatistic, loginForm, profileActions
widgets/    — page sections composed from features: diaryContent, statisticContent, mainLayout, mainHeader, mainNavigation
pages/      — route-level components: diary, statistic, profile, login, notFound
app/        — providers, store, router bootstrap
```

Import direction is strict: higher layers may import from lower, never the reverse. Each layer exposes a public barrel via `index.ts`.

Path alias `@/` maps to `src/`.

## State management

- **Redux Toolkit** with a single store (`src/app/providers/store/model/store.ts`).
- **RTK Query** (`rtkQueryApi` in `src/shared/api/rtkQuery.ts`) is used as the base API instance. All Firebase service modules extend it via `rtkQueryApi.enhanceEndpoints(...).injectEndpoints(...)` — no separate API slices.
- Firebase Firestore is accessed directly inside RTK Query `queryFn` callbacks (not via the axios base query). The axios instance (`src/shared/api/axios.ts`) exists for future REST endpoints.
- The only Redux slice holding non-server state is `diarySlice` (date filters for the diary view).

## Firebase collections

| Collection | Purpose |
|---|---|
| `diary` | Calorie diary entries per user; `product` field is a Firestore `DocumentReference` into the `product` collection |
| `product` | Product catalog with nutrients |
| `user_settings` | Per-user settings (e.g. `calories_limit`, default `2000`) |

Auth state is tracked by `FirebaseAuthProvider` (`src/app/providers/firebase/ui/FirebaseProvider.tsx`) via `onAuthStateChanged`. The `useFirebaseAuth()` hook exposes `{ user, loading }` throughout the app.

**Known limitation (see TODO comments):** `auth.currentUser` is read imperatively inside `queryFn` — switching users does not automatically re-fetch RTK Query data.

## Routing

Routes are defined in `src/shared/const/router.ts` and lazily loaded. `RouteWrapper` redirects unauthenticated users away from private routes and authenticated users away from `/login`.

Pages: `/` (Diary), `/statistic`, `/profile`, `/login`, `*` (NotFound).

## UI

- **antd-mobile** for all components (mobile-first).
- **SCSS Modules** for component styles (`style.module.scss`).
- **ECharts** (via `echarts-for-react`) for the statistics chart.
- **dayjs** for date handling; custom helpers in `src/shared/lib/dayjs.ts`.

## Linting

ESLint enforces:
- `import/order` alphabetical — imports must be sorted.
- `react-hooks/exhaustive-deps` as an error.
- `@typescript-eslint/no-unused-vars` with `argsIgnorePattern: '^_'`.
