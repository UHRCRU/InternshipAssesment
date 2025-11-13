export type Variant = { id?: number; name: string };
export type Product = {
  id: number;
  name: string;
  description?: string | null;
  imageUrl: string;
  price: number;
  category: string;
  inStock: boolean;
  variants: Variant[];
};
