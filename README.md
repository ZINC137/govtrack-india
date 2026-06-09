# GovTrack India

GovTrack India is a production-oriented full-stack starter for a personalized Indian government jobs and exam tracking platform.Built using Codex for rapid full-stack development and prototyping.

## Stack

- Frontend: Next.js 15, TypeScript, Tailwind CSS, ShadCN-style components
- Backend: FastAPI, SQLAlchemy, JWT auth, rule-based eligibility engine
- Database: PostgreSQL, with SQLite fallback for quick backend starts
- Deployment: Vercel frontend, Railway/Render backend

## Getting Started

```bash
git clone https://github.com/ZINC137/govtrack-india.git
cd govtrack-india
cd frontend
npm install
npm run dev
```

## Run Locally

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:8000`
API docs: `http://localhost:8000/docs`

## Shut Down
```bash
docker compose down
```

Backend-only quick start:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend-only quick start:

```bash
cd frontend
npm install
npm run dev
```

## Included

- Home, jobs, job detail, categories, exam calendar, eligibility checker, dashboard, saved jobs, notifications, profile, onboarding, auth, admin, FAQ, support, privacy, and terms pages
- JWT registration/login, profile update, saved jobs, notification read state
- Job filtering, search, autocomplete, calendar, dashboard summary, and admin analytics APIs
- Rule-based eligibility statuses with score, matched reasons, warnings, and blockers
- Seed data for SSC, Railways, Banking, UPSC Engineering Services, and PSU recruitment
- Dockerfiles, Compose setup, schema documentation, API reference, and deployment guide


## Notes

The app is ready for extension into a real production service. Before launch, connect an email provider, object storage for PDFs, Alembic migrations, RBAC for admin APIs, Redis-backed rate limiting, captcha verification, and official source ingestion workflows.
