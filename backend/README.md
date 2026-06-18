# Zorvix Backend

This backend handles:

- public contact form submissions
- admin authentication with secure cookies
- inquiry listing, viewing, status updates, and archiving
- MySQL persistence and audit logging

## Structure

```txt
backend/
  .env.example
  src/
    config/
    db/
    middleware/
    modules/
      auth/
      contact/
      inquiries/
    utils/
    app.js
    server.js
```

## Local setup

1. Update `backend/.env` with your real MySQL and admin values.
2. Run the schema migration:

```bash
npm run db:migrate
```

3. Seed the first admin user:

```bash
npm run db:seed-admin
```

4. Start the backend:

```bash
npm run backend:dev
```

## Frontend integration

The frontend expects the API at:

```txt
https://zorvix-studio.onrender.com
```

You can override that with:

```env
VITE_API_BASE_URL=https://zorvix-studio.onrender.com
```

## Security notes

- Rotate the MySQL password after setup because it has already been shared.
- Change `SESSION_SECRET` before production.
- Change `ADMIN_SEED_PASSWORD` before production.
- Keep `backend/.env` out of version control.
- In production, lock CORS to the real frontend domain only.
- Put the backend behind HTTPS and a reverse proxy.
- Do not expose MySQL publicly to the internet.

## Production infra checklist

- HTTPS enabled
- reverse proxy configured
- firewall allows only required ports
- MySQL bound privately
- backups enabled
- logs monitored
- admin password rotated
- session secret rotated
