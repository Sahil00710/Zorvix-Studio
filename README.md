# Zorvix Studio

![Status](https://img.shields.io/badge/Status-Active-2563eb?style=for-the-badge)
![Frontend](https://img.shields.io/badge/Frontend-TanStack_Start-0f172a?style=for-the-badge)
![Backend](https://img.shields.io/badge/Backend-Node_%2B_Express-111827?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-MySQL-1d4ed8?style=for-the-badge)

> A modern studio website and lead-generation platform for Zorvix Studio, built with a premium frontend experience and a custom backend for inquiries and admin workflows.

## Overview

Zorvix Studio is a full-stack web project designed to showcase services, projects, and blog content with a polished visual style. The application combines a fast TanStack Start frontend with a Node.js + Express backend and MySQL support for data-driven features.

## Author

- **Sahil**

## Highlights

- Premium responsive marketing website
- Dedicated pages for services, projects, blog, about, and contact
- Animated UI with GSAP, Framer Motion, and smooth scrolling
- Featured project and blog presentation with custom visuals
- Admin-ready backend structure for inquiries
- MySQL migration and seed scripts
- SEO metadata, sitemap support, and structured data

## Tech Stack

### Frontend

- React 19
- TanStack Start
- TypeScript
- Tailwind CSS v4
- Framer Motion
- GSAP
- Radix UI
- Sonner

### Backend

- Node.js
- Express
- MySQL
- Zod
- Nodemailer
- Helmet
- CORS

## Project Structure

```text
Zorvix Web-Frontend/
|-- frontend/   # TanStack Start app
|-- backend/    # Express + MySQL API
|-- docs/       # setup and deployment notes
`-- README.md
```

## Key Pages

- Home
- About
- Services
- Projects
- Blog
- Contact
- Admin login
- Admin inquiries

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/Sahil00710/Zorvix-Studio.git
cd Zorvix-Studio
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Configure environment files

Create and update:

- `frontend/.env` if needed for frontend configuration
- `backend/.env` for backend, database, mail, and admin settings

## Run The Project

### Frontend

```bash
cd frontend
npm run dev
```

### Backend

```bash
cd backend
npm run dev
```

## Useful Commands

### Frontend

```bash
npm run dev
npm run build
npm run preview
npm run typecheck
npm run lint
```

### Backend

```bash
npm run dev
npm run start
npm run db:migrate
npm run db:seed-admin
```

## Features In This Build

- Responsive project cards with improved text readability
- Project click interactions showing "coming soon" notifications
- Featured blog card using custom artwork
- Modern motion design and polished visual presentation
- Split frontend/backend structure for easier deployment

## Documentation

- [Backend setup](./docs/backend-setup.md)
- [Deployment](./docs/deployment.md)
- [API routes](./docs/api-routes.md)

## Deployment Notes

- Frontend is prepared for Vite/TanStack Start workflows
- Preview flow uses Wrangler for the built frontend
- Backend is separated for flexible VPS or cloud deployment
- Environment files are intentionally excluded from git

## Repository

- GitHub: [Sahil00710/Zorvix-Studio](https://github.com/Sahil00710/Zorvix-Studio)

## License

This project is currently maintained by **Sahil** for Zorvix Studio.
