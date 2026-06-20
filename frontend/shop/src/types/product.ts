export const PRODUCT_SIZES = ["XS", "S", "M", "L", "XL"] as const;

export type ProductSize = (typeof PRODUCT_SIZES)[number];

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  category?: string;
  imageUrl?: string;
  visual:
    | "terminal"
    | "shadow"
    | "matrix"
    | "avatar"
    | "beach"
    | "coffee"
    | "debug"
    | "stackoverflow"
    | "uploaded";
};

export type BackendProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imagePath?: string;
};

export type ProductInput = {
  name: string;
  price: number;
  quantity: number;
  imageFile?: File | null;
};

export type CartItem = {
  product: Product;
  size: ProductSize;
  quantity: number;
};
