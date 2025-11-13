import React, { useState } from 'react';
import type { Product } from '../types';
import { useCart } from '../CartContext';

type Props = { product: Product };

export const ProductCard: React.FC<Props> = ({ product }) => {
  const [variant, setVariant] = useState<string | undefined>(product.variants[0]?.name);
  const { add } = useCart();
  const out = !product.inStock;
  return (
    <div className="card">
      <img className="card-img" src={product.imageUrl} alt={product.name} />
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <p className="card-price">${product.price.toFixed(2)}</p>
        {product.variants.length > 0 && (
          <select className="card-select" value={variant} onChange={e => setVariant(e.target.value)}>
            {product.variants.map(v => (
              <option key={v.name} value={v.name}>{v.name}</option>
            ))}
          </select>
        )}
        <button className="card-button" disabled={out} aria-disabled={out} onClick={() => add(product, variant)}>
          {out ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
