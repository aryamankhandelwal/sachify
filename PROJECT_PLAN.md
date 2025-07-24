# Sachify Build Plan

## Phase 1: Project Setup
- [ ] GitHub repo and push README
- [ ] Initialize Vercel (Next.js)
- [ ] Initialize Render backend
- [ ] Create PostgreSQL DB on Render
- [ ] Link frontend and backend via environment variables

## Phase 2: Backend API (Express + PostgreSQL)
- [ ] Set up Express app with CORS + JSON
- [ ] Connect to DB using Prisma
- [ ] Define schema: notes
- [ ] Implement routes:
  - GET /notes?page=
  - POST /notes
  - PUT /notes/:id
  - GET /notes/:id
  - GET /search?q=

## Phase 3: Frontend UI (Next.js)
- [ ] Layout with static header "Sachify"
- [ ] Homepage: new note form, search bar, note feed
- [ ] Pagination logic + Older/Newer buttons
- [ ] Note view page
- [ ] Edit note page
- [ ] Search results page

## Phase 4: Styling
- [ ] Arial font, black/blue/white theme
- [ ] Desktop layout only
- [ ] Accessible buttons, consistent spacing

## Phase 5: QA and Deploy
- [ ] Manual test all flows (create/edit/view/search)
- [ ] Check multi-device sync via browser
- [ ] Final commit + push to GitHub
- [ ] Vercel and Render deployment 