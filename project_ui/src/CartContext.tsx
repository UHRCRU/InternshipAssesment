import React, { createContext, useContext, useMemo, useState } from 'react';
import type { Product } from './types';

type CartItem = { productId: number; name: string; price: number; variant?: string; qty: number };
type CartState = { items: CartItem[]; add: (p: Product, variant?: string) => void; clear: () => void };

const Ctx = createContext<CartState | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const add = (p: Product, variant?: string) => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.productId === p.id && i.variant === variant);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { productId: p.id, name: p.name, price: p.price, variant, qty: 1 }];
    });
  };
  const clear = () => setItems([]);
  const value = useMemo(() => ({ items, add, clear }), [items]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
