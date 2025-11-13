import React from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};
