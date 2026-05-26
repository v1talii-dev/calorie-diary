# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # start dev server
npm run build        # tsc type-check + vite build
npm run lint         # eslint src/
npm run format       # prettier --write
npm run deploy       # build + publish to GitHub Pages
npm run generate-pwa-assets  # regenerate PWA icons from public/logo.svg
```

No test suite is configured.

## Environment setup

Copy `env.example` to `.env` and fill in Firebase credentials from the Firebase console. All variables are prefixed `VITE_FIREBASE_`.

## Tech stack

| Package | Version |
|---|---|
| React | 18 |
| TypeScript | 5.8 |
| Vite | 6 |
| Redux Toolkit / RTK Query | 2 |
| Firebase SDK | 12 (modular) |
| antd-mobile | 5 |
| react-router-dom | 7 |
| ECharts / echarts-for-react | 6 / 3 |
| dayjs | 1.11 |
| vite-plugin-pwa | 1 |

## Architecture

The project follows **Feature-Sliced Design (FSD)**. Layers, from lowest to highest abstraction:

```
shared/     — reusable primitives (api clients, constants, lib utils, UI kit)
entities/   — business domain models: diary, product, user
features/   — user-facing interactions: diaryList, diaryPopup, diaryStatistic, loginForm, profileActions
widgets/    — page sections composed from features: diaryContent, statisticContent, mainLayout, mainHeader, mainNavigation, mainLoading
pages/      — route-level components: diary, statistic, profile, login, notFound
app/        — providers, store, router bootstrap
```

Import direction is strict: higher layers may import from lower, never the reverse. Each layer exposes a public barrel via `index.ts`.

Path alias `@/` maps to `src/`.

## State management

- **Redux Toolkit** with a single store (`src/app/providers/store/model/store.ts`). Store has two keys: `diary` (diarySlice) and `rtkQueryApi.reducerPath` (all server state).
- **RTK Query** (`rtkQueryApi` in `src/shared/api/rtkQuery.ts`) is the single API instance. All Firebase service modules extend it via `rtkQueryApi.enhanceEndpoints(...).injectEndpoints(...)` — no separate API slices.
- Firebase Firestore is called directly inside RTK Query `queryFn` callbacks, not through the axios base query. The axios instance (`src/shared/api/axios.ts`) exists for future REST endpoints.
- The only Redux slice holding non-server state is `diarySlice` (`src/entities/diary/model/slice/diarySlice.ts`), which stores `dateStart` / `dateEnd` ISO strings for the diary page date filter (both are always the same date — single-day filter).
- Product search uses RTK Query `infiniteQuery` (RTK Query 2 API) with page/size pagination.

**Known limitation:** `auth.currentUser` is read imperatively inside every `queryFn` — switching users does not automatically re-fetch RTK Query data.

## Firebase

`src/shared/api/firebase.ts` exports `auth` and `db` (the Firestore instance). All service files import from there.

| Collection | Purpose |
|---|---|
| `diary` | Calorie diary entries per user; `product` field is a Firestore `DocumentReference` into the `product` collection |
| `product` | Product catalog; energy value is **per 100 g** (`nutrients.energy`) |
| `user_settings` | Per-user settings (`calories_limit`, default `2000` from `src/shared/const/entites.ts`) |

`DiaryEntry` is the raw Firestore shape (Timestamp dates, DocumentReference product). `DiaryRecord` is the deserialized form (ISO string date, resolved `ProductEntry` object) — used throughout the UI.

Auth state is tracked by `FirebaseAuthProvider` (`src/app/providers/firebase/ui/FirebaseProvider.tsx`) via `onAuthStateChanged`. The `useFirebaseAuth()` hook exposes `{ user, loading }` throughout the app.

## Routing

Uses `HashRouter` (required for GitHub Pages — no server-side routing). Routes defined in `src/shared/const/router.ts`, lazily loaded in `RouterProvider`. `RouteWrapper` redirects unauthenticated users to `/login` and authenticated users away from `/login` (restoring `location.state.from` on success).

Pages: `/` (Diary), `/statistic`, `/profile`, `/login`, `*` (NotFound).

## Key data flows

**Adding a diary entry:** `DiaryContent` (widget) → `DiaryPopup` (feature) → `ProductForm` → `ProductField` → `ProductSearch` / `ProductRecent`. On product selection, weight is auto-filled from the recent entry if available. Calories are calculated client-side: `Math.floor(weight * energy / 100)` via `getCalculatedCalories` in `src/shared/lib/catalog.ts`.

**Statistics page:** `DiaryStatistic` (feature) reads `totalCalories` from the same `useGetDiaryEntriesQuery` result already cached by the diary page, plus `useGetUserSettingsEntryQuery` for the limit. The progress circle turns red when consumption exceeds 100%.

## Shared types

`ProductEntry` lives in `src/shared/types/product.ts` (moved from `entities/product` to fix an FSD violation). `src/entities/product/types/index.ts` re-exports it.

`AppSize` (spacing scale: `4 | 8 | 16 | 24 | 32 | 48`) is in `src/shared/types/appUi.ts`.

Helper functions for display formatting are in `src/shared/lib/catalog.ts`: `getCaloriesValue`, `getWeightValue`, `getProductName`, `getCaloriesPerPortion`, `getCalculatedCalories`.

## PWA & Deployment

- PWA via `vite-plugin-pwa`; service worker uses `autoUpdate` strategy; `start_url` is `/calorie-diary/`.
- Vite `base` is `/calorie-diary/` — all asset paths are relative to this.
- `npm run deploy` runs `vite build && gh-pages -d dist`.

## UI

- **antd-mobile** for all components (mobile-first). App shell: `MainLayout` (top/bottom slots) + `MainHeader` + `MainNavigation`.
- **SCSS Modules** for component styles (`style.module.scss`).
- **ECharts** (via `echarts-for-react`) for the statistics chart on `/statistic`.
- **dayjs** with `isSameOrBefore` plugin; `DATE_FORMAT = 'DD.MM.YYYY'` in `src/shared/const/common.ts`. Date range helpers in `src/shared/lib/dayjs.ts`.

## Linting

ESLint enforces:
- `import/order` alphabetical — imports must be sorted.
- `react-hooks/exhaustive-deps` as an error.
- `@typescript-eslint/no-unused-vars` with `argsIgnorePattern: '^_'`.
