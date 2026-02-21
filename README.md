# Ashwattha Phatak - Personal Website Starter

Minimal one-page personal website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Stack
- Next.js (latest stable)
- TypeScript
- Tailwind CSS

## Local Setup
Use Node `22` (see `.nvmrc`).

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000`.

## Environment
Copy the template before running locally:

```bash
cp .env.example .env.local
```

Current variables:
- `NEXT_TELEMETRY_DISABLED`
- `NEXT_PUBLIC_SITE_URL`

## Docker
### Dev container (hot reload)
```bash
docker compose -f docker-compose.dev.yml up --build
```

### Production-like container
```bash
docker compose up --build
```

## Project Structure
```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  github-activity-section.tsx
  profile-image.tsx
  projects-section.tsx
  site-header.tsx
  skills-section.tsx
  track-context.tsx
content/
  experience.ts
  profile.ts
  projects.ts
  skills.ts
  tracks.ts
  types.ts
public/
  images/
  resume/
    Ashwattha_Phatak_Distributed.pdf
    Ashwattha_Phatak_MLAI.pdf
```

## Profile Photo + GitHub Activity
- Hero photo source lives in `content/profile.ts` as `profile.photo.src`.
- Default path is `/images/linkedin-profile.jpg`; place your LinkedIn headshot at `public/images/linkedin-profile.jpg`.
- If the local image is missing, the site falls back to your GitHub avatar.
- GitHub activity chart is rendered from `ghchart.rshah.org` using `profile.githubUsername`.

## Content Updates
All portfolio content is centralized in `content/`.

- Profile and section nav labels: `content/profile.ts`
- Skill groups: `content/skills.ts`
- Experience entries: `content/experience.ts`
- Project cards + tags + links: `content/projects.ts`
- Track behavior (skills order/highlights + project featured tags): `content/tracks.ts`

### Typical edits
- Add a new project: append to `projects` in `content/projects.ts`
- Update resume download options: change `profile.links.resumes` in `content/profile.ts`
- Tune track filtering: edit `featuredProjectTags` in `content/tracks.ts`

## Deploy to Vercel
1. Push this repository to GitHub.
2. In Vercel, click **Add New... -> Project** and import the repo.
3. Keep defaults (Framework preset should auto-detect Next.js).
4. Deploy.

### Attach custom domain
1. In Vercel project dashboard: **Settings -> Domains**.
2. Add your domain (for example `ashwatthaphatak.com`).
3. Follow Vercel DNS records exactly at your DNS provider.
4. Wait for SSL provisioning, then verify both apex and `www` (if used).

## Optional: GitHub Pages (not recommended for App Router SSR)
GitHub Pages is best for static export. If you want this route:
1. Add `output: "export"` in `next.config.ts`.
2. Remove server-only features.
3. Build static output with `npm run build` and deploy the generated `out/` directory via a GitHub Action.

For this project, Vercel is the cleanest deployment path.
