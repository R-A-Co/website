# Research & Analysis Committee

The public website for the Research & Analysis Committee of the Data Science Club at the School of Mathematical Sciences, Tribhuvan University.

The committee is starting with an academic paper, a student learning program, practical resources, and a space for students to learn research and data science together.

**Live parent club:** [dscsms.com](https://dscsms.com)  
**Repository:** [R-A-Co/website](https://github.com/R-A-Co/website)

## What is on the website

- **Homepage** — committee overview, current activities, focus areas, and links to every section
- **Learning** — a four-stage roadmap from Python basics to a small research project
- **Research** — current research projects and their progress
- **Resources** — curated links for Python, data analysis, statistics, research, and collaboration
- **Our work** — the academic paper in progress, future student projects, and publications
- **Events** — workshops, talks, and collaborative sessions
- **People & contact** — committee members, contact details, GitHub, and the contact form

Content is stored as versioned JSON in [`content/`](./content). The password-protected CMS at `/admin` edits the content used by the current public pages.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Geist Sans and Geist Mono
- Newsreader Variable
- Lucide React

The site uses a responsive editorial layout with a desktop sidebar, mobile navigation, accessible focus states, reduced-motion support, and no external font requests.

## Run locally

Requirements: Node.js and npm.

```bash
git clone https://github.com/R-A-Co/website.git
cd website
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Useful commands:

```bash
npm run typecheck
npm run build
npm run start
```

## CMS

Open [http://localhost:3000/admin](http://localhost:3000/admin) and sign in with `ADMIN_PASSWORD`.

The current CMS collections are:

| Collection | Used for |
| --- | --- |
| Homepage | Hero, About, and Activities content |
| Site settings | Club identity, contact details, links, focus areas, and stats |
| Committee | People & contact page |
| Learning roadmap | Learning page stages and outcomes |
| Resources | Resource links shown on the Resources page |
| Research projects | Projects shown on the Research page |
| Papers | Publications shown on Our work |
| Seminars | Events shown on the Events page |

Locally, CMS saves write to the JSON files in `content/`. In production on Vercel, configure GitHub storage so saves become commits and trigger a deployment.

## Environment variables

Copy [`.env.example`](./.env.example) to `.env.local` and set:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL, sitemap, robots, and metadata |
| `ADMIN_PASSWORD` | Required in production | CMS sign-in password |
| `ADMIN_SECRET` | Recommended | Secret used to sign admin sessions |
| `GITHUB_TOKEN` | Required for Vercel CMS saves | Fine-grained token with repository Contents read/write access |
| `GITHUB_REPO` | Required for Vercel CMS saves | Repository in `owner/repository` format |
| `GITHUB_BRANCH` | Optional | Branch for CMS commits; defaults to `main` |

Never commit `.env.local` or any password, token, or secret.

## Deploy with Vercel

1. Push this repository to GitHub.
2. Import `R-A-Co/website` into [Vercel](https://vercel.com).
3. Add the environment variables above in **Project Settings → Environment Variables**.
4. Set `GITHUB_REPO` to `R-A-Co/website`.
5. Create a GitHub fine-grained token with **Contents: read and write** access for this repository and set it as `GITHUB_TOKEN`.
6. Deploy the `main` branch.
7. Open `/admin` on the deployed domain and test a CMS edit.

The GitHub repository can remain private while the deployed website is public.

## Project structure

```text
app/
  (site)/             Public pages and layout
  admin/              CMS dashboard, login, and collection editor
  globals.css         Global design and responsive styles
components/           Shared site, page, and CMS components
content/              Editable JSON content
lib/
  content.ts          Server-side content readers
  content-types.ts    Shared TypeScript types
  admin/              CMS schema, authentication, storage, and actions
```

## Accessibility and responsive design

- Semantic landmarks and ordered headings
- Skip link and visible keyboard focus states
- Mobile navigation with focus management
- Responsive layout tested from narrow mobile screens through desktop
- Reduced-motion support for animated elements
- Horizontal overflow protection

## License

See [`LICENSE`](./LICENSE).
