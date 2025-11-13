# Full-Stack Developer Test – Demo

This repo contains a small full‑stack implementation that meets the assessment requirements:

- Frontend: React + TypeScript (Vite) with a responsive Product Card component
- Backend: Node.js + TypeScript + Express + Prisma (SQLite)

## What’s included

- `project_api/` REST API with endpoints:
  - GET `/products`
  - GET `/products?category=Apparel`
  - GET `/products/:id`
  - POST `/products` (bonus)
- `project_ui/` React UI that:
  - Renders product grid with image, name, price, variant dropdown
  - Button shows “Add to Cart” vs “Out of Stock” dynamically
  - Category filter at the top
  - Bonus: simple local cart counter

## How to run locally (Windows PowerShell)

1) Start the API

```powershell
cd project_api
npm install
$env:DATABASE_URL='file:./dev.db'
npx prisma migrate dev --name init
npm run seed
npm run dev
```

API will be at http://localhost:3001

2) Start the UI (in a new terminal)

```powershell
cd project_ui
npm install
npm run dev
```

UI will be at http://localhost:5173 (expects API at http://localhost:3001). Optionally create `project_ui/.env` with `VITE_API_URL`.

## Sample curl

```powershell
curl http://localhost:3001/products
curl "http://localhost:3001/products?category=Apparel"
curl http://localhost:3001/products/1
```

## Notes on approach

- Layout: simple card grid with CSS (no framework) using CSS grid and aspect-ratio for images.
- Responsiveness: grid auto-fills min card width; header condenses on small viewports.
- Validation: `zod` schema on POST /products.
