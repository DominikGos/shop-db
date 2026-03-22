export type Product = {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  category: string;
  visual:
    | "terminal"
    | "shadow"
    | "matrix"
    | "avatar"
    | "beach"
    | "coffee"
    | "debug"
    | "stackoverflow";
};
