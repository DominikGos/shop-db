import type { BackendProduct, Product, ProductInput } from "../types/product";

const API_URL = "http://localhost:8080/api/products";

const visuals: Product["visual"][] = [
  "terminal",
  "shadow",
  "matrix",
  "avatar",
  "coffee",
  "debug",
  "stackoverflow",
];

const mapBackendProduct = (product: BackendProduct, index = 0): Product => {
  return {
    id: product.id,
    name: product.name,
    subtitle: `// ${product.name}`,
    price: product.price,
    quantity: product.quantity,
    visual: visuals[index % visuals.length],
  };
};

export const fetchProducts = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Nie udalo sie pobrac produktow.");
  }

  const products = (await response.json()) as BackendProduct[];
  return products.map(mapBackendProduct);
};

export const fetchProductById = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Nie udalo sie pobrac produktu.");
  }

  const product = (await response.json()) as BackendProduct | null;

  if (!product) {
    return null;
  }

  return mapBackendProduct(product);
};

export const createProduct = async (product: ProductInput) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Nie udalo sie dodac produktu.");
  }

  const createdProduct = (await response.json()) as BackendProduct;
  return mapBackendProduct(createdProduct);
};
