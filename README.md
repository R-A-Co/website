# Research & Analysis — Data Science Club

A light, editorial research site for the Data Science Club's Research & Analysis Committee, built to echo the current Cognition design language: a quiet canvas, serif running text, compact sans headings, a left rail, and a single blue accent.

The site is a multi-page Next.js App Router project with a schema-driven custom admin for editing every collection. Content lives as JSON in [`content/`](./content) so edits are versioned with the code.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4**
- **Geist Sans / Geist Mono** via `geist` for headings and micro-labels
- **Newsreader Variable** via `@fontsource-variable/newsreader` for running text
- **Lucide React** icons
- TypeScript

All fonts are self-hosted; the site makes no font network requests.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck   # TypeScript
npm run build       # production build
npm run start       # serve the production build
```

## Routes

| Route        | Index | Contents                                                        |
| ------------ | ----- | --------------------------------------------------------------- |
| `/`          | 01    | Overview: hero, focus areas, and teasers for 02–06              |
| `/research`  | 02    | Full project list with featured project, metrics, and repo links |
| `/tools`     | 03    | Packages, curated datasets, and analytical scripts              |
| `/papers`    | 04    | Peer-reviewed articles, preprints, and technical notes          |
| `/seminars`  | 05    | Upcoming sessions and the past archive                          |
| `/team`      | 06    | Committee roster and open call                                  |
| `/admin`     | —     | Password-protected content editor                               |

`/sitemap.xml` and `/robots.txt` are generated from `NEXT_PUBLIC_SITE_URL`; `/admin` is excluded from indexing.

## Structure

```
app/
  layout.tsx              Fonts, metadata, JSON-LD, skip link
  (site)/
    layout.tsx            Left rail, header, footer, main landmark
    page.tsx              Overview home
    research/page.tsx     Section 02
    tools/page.tsx        Section 03
    papers/page.tsx       Section 04
    seminars/page.tsx     Section 05
    team/page.tsx         Section 06
  admin/
    layout.tsx            Admin chrome, storage indicator, sign out
    page.tsx              Collection dashboard
    login/page.tsx        Password sign-in
    [collection]/page.tsx Generic collection editor
  globals.css             Light design tokens, link styles, motion
  opengraph-image.tsx     Generated light social card
  sitemap.ts / robots.ts  Crawler metadata
  not-found.tsx           404
content/                  Editable JSON (the CMS data layer)
components/
  site-header.tsx         Sticky desktop rail, mobile focus-trapped dialog
  page-shell.tsx          Numbered page intro + content grid
  section.tsx             Numbered editorial section primitive
  hero.tsx                Section 01, research focus band
  projects.tsx            Featured project + forecast figure + project cards
  tools.tsx               Packages, datasets, scripts
  papers.tsx              Publication log
  seminars.tsx            Upcoming + past sessions
  team.tsx                Committee + open call
  site-footer.tsx         Contact, institutional links, colophon
  admin/                  Collection editor and login form
lib/
  content.ts              Server-side JSON readers and sorting
  content-types.ts        Shared content types
  nav.ts                  Route table with 02–06 indices
  admin/schema.ts         Collections and field definitions
  admin/actions.ts        Login, logout, and save server actions
  admin/auth.ts           HMAC cookie sessions and password checks
  admin/store.ts          Local or GitHub-backed content writes
  admin/normalize.ts      Field coercion and validation
  utils.ts                cn(), container, buttons, date formatting
```

## Editing content

Every collection is a JSON file in [`content/`](./content):

| File            | Admin section    | Notes                                                  |
| --------------- | ---------------- | ------------------------------------------------------ |
| `site.json`     | Site settings    | Identity, contact, focus areas, headline stats         |
| `projects.json` | Research projects | Set `featured` on the project shown first and on home  |
| `tools.json`    | Tools            | Name, version, description, install command            |
| `datasets.json` | Datasets         | Format, size, license, access                          |
| `scripts.json`  | Scripts          | Name and URL                                           |
| `papers.json`   | Papers           | Sorted newest first by date                            |
| `seminars.json` | Seminars         | `Upcoming` appears first; `Past` moves to the archive  |
| `members.json`  | Committee        | Name, initials, role, focus, contact links             |

You can edit the JSON directly or use the admin at `/admin`. Field definitions live in [`lib/admin/schema.ts`](./lib/admin/schema.ts) — add a field there, add it to the JSON and type, and the form updates automatically.

### Admin

Sign in at `/admin/login`.

- Locally, if `ADMIN_PASSWORD` is unset, the fallback password is `admin`.
- Sessions last eight hours and are stored in an HMAC-signed, http-only cookie.
- Saving writes pretty-printed JSON and revalidates the site.

Storage is chosen at runtime:

- **Local files** (default): writes to `content/` on disk. Good for development and self-hosted servers with persistent storage.
- **GitHub** (when `GITHUB_TOKEN` and `GITHUB_REPO` are set): commits through the GitHub Contents API using the same file, then Vercel rebuilds. This is the recommended production setup.

## Environment variables

| Variable               | Required | Purpose                                                       |
| ---------------------- | -------- | ------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | No       | Canonical URL, sitemap, robots, OG metadata                   |
| `ADMIN_PASSWORD`       | Yes (prod) | Admin sign-in password                                      |
| `ADMIN_SECRET`         | No       | Dedicated cookie-signing secret (defaults to one derived from the password) |
| `GITHUB_TOKEN`         | No       | Fine-grained token with **Contents: read and write**          |
| `GITHUB_REPO`          | No       | Repository for content commits, as `owner/repo`               |
| `GITHUB_BRANCH`        | No       | Branch to commit to (default `main`)                          |

See [`.env.example`](./.env.example).

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel.
2. Set `NEXT_PUBLIC_SITE_URL` and a strong `ADMIN_PASSWORD` in Project Settings → Environment Variables.
3. Create a fine-grained GitHub token scoped to the repo with **Contents: read and write**, then add `GITHUB_TOKEN` and `GITHUB_REPO`.
4. Deploy. Admin saves commit to `content/` and trigger a rebuild; the live site picks up changes after the build.

Without the GitHub variables the admin still works on a persistent Node host, but Vercel's filesystem is ephemeral — use GitHub storage there.

## Design notes

- Light canvas (`#f7f6f5`), near-black ink (`#191919`), 7% hairlines, and a single electric-blue accent (`#2200ff`).
- Running text is serif (Newsreader); headings and labels are sans/mono, mirroring Cognition's type pairing.
- Desktop uses a sticky left rail; below `lg` it becomes a compact top bar with a full-screen, focus-trapped menu.
- Numbered sections (`01`–`06`) share a 12-column editorial grid with a narrow number column. Content is intentionally narrow for readable line lengths.
- No leaderboards, rankings, or gamified tables. Metrics are inline technical metadata on project panels.
- Custom SVG forecast figure and generated OG image — no raster assets.
- Scroll-driven section reveals use `animation-timeline: view()` as progressive enhancement and respect `prefers-reduced-motion`.

## Accessibility

- Semantic landmarks, ordered heading hierarchy, and a skip link to `#main`.
- Mobile navigation is a focus-trapped dialog: Escape closes, body scroll locks, focus returns to the trigger.
- Visible 2px focus outlines on all interactive elements.
- Axe run against WCAG 2.0/2.1/2.2 A and AA: **0 violations**.
- Secondary text clears AA at ~5.8:1 on the light canvas; the accent clears AA at ~7.8:1.
- Layout verified from 320px through 1920px with no horizontal overflow.

## Placeholders

Replace before publishing:

- GitHub organization and repository URLs (`dsc-research`)
- Committee email and individual emails
- Institutional / student-activities / newsletter links in `components/site-footer.tsx`
- Publication references, metrics, dates, and member names in `content/`
- `NEXT_PUBLIC_SITE_URL`
