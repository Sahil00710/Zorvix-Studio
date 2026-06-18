# Backend Setup

1. Update `backend/.env`
2. Run:

```bash
cd backend
npm run db:migrate
npm run db:seed-admin
npm run dev
```

3. Verify:

- `GET /health`
- `POST /api/contact`
- `POST /api/admin/login`
- `GET /api/admin/inquiries`
