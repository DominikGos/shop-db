export type Product = {
  id: number;
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
