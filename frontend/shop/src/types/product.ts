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
};

export type ProductInput = {
  name: string;
  price: number;
  quantity: number;
};
