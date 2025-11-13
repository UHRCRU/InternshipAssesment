import { Router } from 'express';
import { prisma } from '../prisma';
import { z } from 'zod';

const router = Router();

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url(),
  price: z.number().positive(),
  category: z.string().min(1),
  inStock: z.boolean().default(true),
  variants: z.array(z.string()).default([])
});

router.get('/', async (req, res) => {
  try {
    const { category } = req.query as { category?: string };
    const products = await prisma.product.findMany({
      where: category ? { category } : undefined,
      include: { variants: true }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
    const product = await prisma.product.findUnique({
      where: { id },
      include: { variants: true }
    });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

router.post('/', async (req, res) => {
  try {
    const parse = productSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ error: parse.error.flatten() });
    const { variants, ...data } = parse.data;
    const product = await prisma.product.create({
      data: {
        ...data,
        variants: { create: variants.map(name => ({ name })) }
      },
      include: { variants: true }
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

export default router;
