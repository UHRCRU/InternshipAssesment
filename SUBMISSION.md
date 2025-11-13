# Submission Guide

Use this file to share links the reviewer asked for. Replace the placeholders before pushing.

## Repository Link

- Public Repo: https://github.com/USERNAME/REPO_NAME

## Live Demo Links (optional but recommended)

- Frontend (Vercel or Render Static): https://your-ui.example.com
- Backend API (Render Web Service): https://your-api.onrender.com

If you only need a repo link per instructions, you may omit the live links.

## Local Run (quick copy)

- API:
  - cd project_api
  - npm install
  - npx prisma migrate dev --name init
  - npm run seed
  - npm run dev
  - Opens: http://localhost:3001
- UI:
  - cd project_ui
  - npm install
  - npm run dev
  - Opens: http://localhost:5173

## API Endpoints

- GET / → { status: "ok", service: "product-api" }
- GET /products
- GET /products?category=Apparel
- GET /products/:id
- POST /products (bonus)

## Notes

- UI reads API base from VITE_API_URL (defaults to http://localhost:3001 in dev).
- See DEPLOYMENT.md for fast deploy instructions (Render + Vercel) and render.yaml blueprint.