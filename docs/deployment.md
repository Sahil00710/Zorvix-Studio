# Deployment

## Current architecture

- `backend/` is a standard Node + Express API and can be deployed to Render.
- `frontend/` is a TanStack Start app with a Cloudflare Worker-style server entry in `frontend/src/server.ts`.
- The frontend build creates `dist/client` and `dist/server`.
- The build does not create `dist/client/index.html`, so a static Vercel rewrite to `/index.html` will return `404`.

## Backend on Render

- Set the Render start command to `npm start` inside `backend/`.
- Use `https://zorvix-studio.onrender.com/health` to verify the deployment.
- Opening `https://zorvix-studio.onrender.com/` should now return a small JSON status payload.

## Frontend domain and CORS

- `backend/.env` must allow the real frontend origin.
- If you use the Vercel preview or production URL, set:

```env
FRONTEND_URL=https://zorvixstudio.com
FRONTEND_URLS=https://zorvixstudio.vercel.app
```

- If you do not have the custom domain connected yet, set:

```env
FRONTEND_URL=https://zorvixstudio.vercel.app
FRONTEND_URLS=
```

## Frontend hosting note

- The current frontend is prepared for Wrangler/Cloudflare-style SSR.
- Because there is no generated `index.html`, the current `vercel.json` static rewrite approach is not valid for this app.
- To deploy this frontend without refactoring, use a Cloudflare-compatible deployment flow.
- If you want to stay on Vercel, the frontend needs a Vercel-compatible adapter or a conversion to a plain SPA/static build first.

## Production checklist

- rotate DB password
- rotate admin password
- rotate session secret
- enable HTTPS
- configure firewall
- configure reverse proxy
- lock CORS to the production frontend domain
- enable backups and monitoring
