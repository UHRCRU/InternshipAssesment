# Product API

Express + TypeScript + Prisma (SQLite) Product API for assessment.

## Endpoints

- `GET /products` – list all products
- `GET /products?category=Apparel` – filter by category
- `GET /products/:id` – get product by ID
- `POST /products` – create product (body validation with zod)

## Run

```powershell
cd project_api
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
```

Sample requests:

```powershell
curl http://localhost:3001/products
curl http://localhost:3001/products?category=Apparel
curl http://localhost:3001/products/1
```

POST example:

```json
{
  "name": "Water Bottle",
  "imageUrl": "https://picsum.photos/seed/bottle/400/400",
  "price": 15.25,
  "category": "Fitness",
  "inStock": true,
  "variants": ["Blue", "Red"]
}
```
