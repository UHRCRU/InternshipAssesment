import type { Product } from './types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = new URL(`${API_BASE}/products`);
  if (category) url.searchParams.set('category', category);
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}
