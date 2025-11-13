import type { Product } from './types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export async function fetchProducts(category?: string): Promise<Product[]> {
  const url = new URL(`${API_BASE}/products`);
  if (category) url.searchParams.set('category', category);
  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Failed to fetch products (${res.status} ${res.statusText}) from ${url.toString()} ${text ? '- ' + text : ''}`);
    }
    return res.json();
  } catch (e: any) {
    const msg = e?.message || String(e);
    // Surface full context to help when hosted UI calls a non-public or HTTP API
    throw new Error(`Failed to fetch products from ${url.toString()}: ${msg}`);
  }
}
