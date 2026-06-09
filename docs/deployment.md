# Deployment

## Frontend on Vercel

1. Import `frontend/` as the Vercel project root.
2. Set `NEXT_PUBLIC_API_URL` to the backend URL.
3. Build command: `npm run build`.
4. Output is handled by Next.js.

## Backend on Railway or Render

1. Create a PostgreSQL database.
2. Deploy `backend/` as a Python service.
3. Set environment variables from `backend/.env.example`.
4. Use start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.

## Security Checklist

- Rotate `JWT_SECRET`.
- Use HTTPS and secure cookies when moving token storage to cookies.
- Configure CORS to the production frontend only.
- Add provider-backed email verification and password reset tokens.
- Add captcha verification to registration, login, and contact forms.
- Configure object storage for official notification PDFs.
- Run database migrations through Alembic before production releases.
