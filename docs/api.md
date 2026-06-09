# GovTrack India API

Base URL: `http://localhost:8000/api`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`
- `PATCH /auth/profile`
- `POST /auth/verify-email`
- `POST /auth/password-reset`

Demo user: `demo@govtrack.in` / `Demo@12345`

## Jobs and Search

- `GET /jobs`
- `GET /jobs/featured`
- `GET /jobs/calendar`
- `GET /jobs/{slug}`
- `POST /jobs/eligibility`
- `POST /jobs/saved`
- `GET /jobs/saved/list`
- `GET /search?q=ssc`
- `GET /search/autocomplete?q=rail`
- `GET /search/popular`

## Candidate Workspace

- `GET /dashboard`
- `GET /notifications`
- `PATCH /notifications/{id}/read`

## Admin

- `GET /admin/analytics`
- `POST /admin/jobs`
- `DELETE /admin/jobs/{id}`

Production should add role-based admin dependencies, object storage for PDFs, email provider hooks, captcha verification, and managed rate-limit storage.
