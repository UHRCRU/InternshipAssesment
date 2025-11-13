import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'Classic Tee',
      description: 'Soft cotton t-shirt in multiple colors.',
      imageUrl: 'https://picsum.photos/seed/tee/400/400',
      price: 19.99,
      category: 'Apparel',
      inStock: true,
      variants: { create: [{ name: 'S' }, { name: 'M' }, { name: 'L' }] }
    },
    {
      name: 'Running Shoes',
      description: 'Lightweight and comfortable running shoes.',
      imageUrl: 'https://picsum.photos/seed/shoes/400/400',
      price: 89.5,
      category: 'Footwear',
      inStock: true,
      variants: { create: [{ name: '8' }, { name: '9' }, { name: '10' }] }
    },
    {
      name: 'Leather Wallet',
      description: 'Minimalist slim wallet.',
      imageUrl: 'https://picsum.photos/seed/wallet/400/400',
      price: 49.0,
      category: 'Accessories',
      inStock: false,
      variants: { create: [{ name: 'Brown' }, { name: 'Black' }] }
    },
    {
      name: 'Yoga Mat',
      description: 'Eco-friendly non-slip mat.',
      imageUrl: 'https://picsum.photos/seed/yoga/400/400',
      price: 29.95,
      category: 'Fitness',
      inStock: true,
      variants: { create: [{ name: 'Green' }, { name: 'Blue' }] }
    }
  ];

  for (const p of products) {
    await prisma.product.create({ data: p });
  }
  console.log('Seeded products:', products.length);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
