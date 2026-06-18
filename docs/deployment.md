# Deployment

## Recommended split

- `frontend/` deploy to Vercel, Netlify, or Cloudflare Pages
- `backend/` deploy to Render, Railway, VPS, or cPanel Node.js
- MySQL host should not be publicly exposed

## Production checklist

- rotate DB password
- rotate admin password
- rotate session secret
- enable HTTPS
- configure firewall
- configure reverse proxy
- lock CORS to the production frontend domain
- enable backups and monitoring
