import React, { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import type { Product } from './types';
import { ProductGrid } from './components/ProductGrid';
import { CartProvider, useCart } from './CartContext';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './styles.css';

const Header: React.FC<{ category?: string; onCategory: (c?: string) => void }> = ({ category, onCategory }) => {
  const { items } = useCart();
  const count = items.reduce((a, b) => a + b.qty, 0);
  const [bump, setBump] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (count > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      return () => clearTimeout(t);
    }
  }, [count]);
  return (
    <header className="header">
      <h1><Link to="/" className="logo">Shop</Link></h1>
      <div className="header-actions">
        <select value={category ?? ''} onChange={e => { onCategory(e.target.value || undefined); navigate('/'); }}>
          <option value="">All</option>
          <option value="Apparel">Apparel</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
          <option value="Fitness">Fitness</option>
        </select>
  <button className={`cart-pill ${count === 0 ? 'empty' : ''} ${bump ? 'bump' : ''}`} onClick={() => navigate('/checkout')} aria-label={`Cart items: ${count}`}>🛒 {count}</button>
      </div>
    </header>
  );
};

const HomePage: React.FC<{ category?: string }> = ({ category }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchProducts(category)
      .then(setProducts)
      .catch(e => setError(String(e)))
      .finally(() => setLoading(false));
  }, [category]);
  if (loading) return <p className="center">Loading…</p>;
  if (error) return <p className="center error">{error}</p>;
  return <main className="container"><ProductGrid products={products} /></main>;
};

const CheckoutPage: React.FC = () => {
  const { items, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  return (
    <main className="container checkout">
      <h2>Checkout</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.length > 0 && (
        <table className="checkout-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Variant</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.productId + (i.variant || '')}>
                <td>{i.name}</td>
                <td>{i.variant || '-'}</td>
                <td>{i.qty}</td>
                <td>${i.price.toFixed(2)}</td>
                <td>${(i.price * i.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="checkout-summary">
        <p>Total: <strong>${total.toFixed(2)}</strong></p>
        <div className="checkout-actions">
          <button className="card-button" disabled={items.length===0}>Place Order (placeholder)</button>
          <button className="secondary-button" onClick={clear} disabled={items.length===0}>Clear Cart</button>
          <Link to="/" className="link-back">Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
};

const App: React.FC = () => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  return (
    <CartProvider>
      <BrowserRouter>
        <Header category={category} onCategory={setCategory} />
        <Routes>
          <Route path="/" element={<HomePage category={category} />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
