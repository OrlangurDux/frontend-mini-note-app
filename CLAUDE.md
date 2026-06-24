# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js/React frontend for "Nimbus" (project name "React MiniNote App"), a notes app with email/password auth, password recovery, a notes list/detail view, and a profile/settings screen. The actual Next.js application source lives in `src/`, but as of now `src/` only contains config files (`.babelrc`, `.eslintrc.json`, `.gitignore`) — there is no `package.json` or `pages/` checked in yet. A previous build (`src/.next/`) shows the app had at least `/` (index/landing) and `/login` pages.

`mini-note-template/` is a **static HTML/JSX design prototype** of the full app — it is the reference implementation to port into `src/`. It runs with zero build step: each `*.html` file loads React, ReactDOM, Babel Standalone, and MUI from CDN (`unpkg.com`) and pulls in `.jsx` files directly via `<script type="text/babel">`. Open any of these HTML files directly in a browser to preview that screen. Do not try to `yarn build` or `npm run` anything inside `mini-note-template/` — it has no tooling.

When asked to implement real app functionality, treat `mini-note-template/src/` as the spec/design source and `src/` as the Next.js destination it should be ported into (converting global `window.X` singletons into real modules/imports, MUI UMD into `@mui/material` package imports, etc.).

## Commands

There is no local Node toolchain set up yet (no root or `src/package.json`). All development happens through Docker:

- `make start` — build+run the dev container (`react-mini-note-app-dev`), runs `yarn install && yarn dev` inside, serves at http://localhost:3040 (maps to container port 3000; debugger on host 9249 -> container 9229)
- `make build [service]` — `docker-compose -f docker-compose.dev.yml build`
- `make up [service]` / `make down [service]` — start/stop a specific compose service
- `make stop` — stop all dev services
- `make restart [service]` — stop then start a service
- `make logs` / `make logs-service` — tail logs (all services / primary `react-mini-note-app-dev`)
- `make ps` — show running services
- `make login [service]` / `make login-service` — shell into a container
- `docker exec -it react-mini-note-app-dev yarn <command>` — run a yarn script (lint, build, etc.) inside the running dev container, once `src/package.json` exists

Production image (`Dockerfile`, `docker-compose.yml`) builds with `yarn install && yarn build` and runs `yarn start`, served on host port 3090.

Before first run, check `id` for `uid`/`gid` and update `.env` (`UID`/`GID`) if they differ from 1000, so file ownership inside the container matches the host user.

## Architecture (from `mini-note-template/`, the design source for `src/`)

The prototype's architecture is intended to map onto the real Next.js app:

- **State stored on `window`, no module bundler in the prototype.** Real Next.js port should convert these into proper modules/hooks/context, but keep the same separation of concerns:
  - `lib/store.js` (`window.AuthStore`) — sessionStorage, flow-scoped values (email/name passed between signup/login/forgot-password screens).
  - `lib/prefs.js` (`window.Prefs`) — localStorage, persistent user prefs (theme mode, language).
  - `lib/notes.js` (`window.NotesStore`) — localStorage-backed fake notes "backend": sample seed data, CRUD (`load/save/get/upsert/remove/duplicate`), plus `wordCount`/`relativeTime` helpers. There is no real API — notes persist only in the browser.
  - `lib/i18n.js` (`window.STR`, `window.useTranslations`) — flat string dictionaries for `en` and `ru`, keyed by short codes (e.g. `nTitle`, `pSave`, `lHeroTitle`). Language preference is read/written through `Prefs`. When adding UI text, add a key to *both* language dicts.
  - `lib/router.js` (`window.Router`) — dual-mode routing: hash-based (`#/login`) when bundled into one file (detected via `<meta name="nimbus-build" content="bundle">`), or plain `*.html` navigation otherwise. `Router.ROUTES` lists the auth-flow screens; `Router.linkTo(file)` returns the right `href`/`onClick`.
  - `lib/theme.js` / `lib/mui.js` — MUI theme builder (`window.buildTheme(mode)`, `window.useThemeMode`) and a shim that exposes the MUI UMD global as `window.MUI`.

- **`AppShell`** (`components/AppShell.jsx`) is the top-level wrapper every screen renders through: installs `ThemeProvider`/`CssBaseline`, renders `AppHeader` + footer, and either a plain content `Box` (`landing`/`inner` modes) or `FloatingLayout` (default app chrome). It exposes `{ t, mode, lang, toggleMode, toggleLang }` to children via a render-prop (`children` is a function).

- **Screen/component split**: `screens/*.jsx` are full pages (`LandingScreen`, `LoginScreen`, `SignupScreen`, `SignupSentScreen`, `ForgotEmailScreen`, `ForgotCodeScreen`, `ForgotNewPassScreen`, `ForgotDoneScreen`, `NotesScreen`, `NoteDetailScreen`, `ProfileScreen`, `SuccessScreen`). Shared widgets live in `components/` (`AppHeader`, `FloatingLayout`, `BrandMark`, `Icon`, `CodeInput`, `ScreenHead`, `StrengthMeter`), with screen-family-specific pieces grouped in `components/landing/`, `components/notes/`, `components/profile/`.

- Each top-level `*.html` (`login.html`, `signup.html`, `notes.html`, `note.html`, `profile.html`, etc.) is a thin shell that script-tags in the lib/component/screen files it needs and renders one `<Page>` wrapped in `AppShell`.

## Stack notes

- Next.js + React, package manager is **Yarn** (not npm).
- Styling: MUI (`@mui/material`) + `styled-components` (configured via `.babelrc` with SSR plugin) — the prototype uses MUI's `sx` prop styling throughout.
- ESLint config (`src/.eslintrc.json`) extends `next/core-web-vitals` with `@next/next/no-img-element` turned off (plain `<img>` tags are allowed).
- Planned/expected packages per README: `next-seo`, `keycloak-js` (auth is likely intended to integrate with Keycloak rather than the localStorage mock in the prototype).
- Demo credentials referenced in the prototype copy: `demo@nimbus.app` / `password`; password-reset demo code `123456`.
