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

const getImageUrl = (imagePath?: string) => {
  if (!imagePath) {
    return undefined;
  }

  return `${API_URL}/${imagePath}`;
};

const mapBackendProduct = (product: BackendProduct, index = 0): Product => {
  return {
    id: product.id,
    name: product.name,
    subtitle: `// ${product.name}`,
    price: product.price,
    quantity: product.quantity,
    imageUrl: getImageUrl(product.imagePath),
    visual: product.imagePath ? "uploaded" : visuals[index % visuals.length],
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
  const { imageFile, ...productData } = product;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Nie udalo sie dodac produktu.");
  }

  const createdProduct = (await response.json()) as BackendProduct;

  if (!imageFile) {
    return mapBackendProduct(createdProduct);
  }

  return uploadProductImage(createdProduct.id, imageFile);
};

export const uploadProductImage = async (id: string, imageFile: File) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const response = await fetch(`${API_URL}/${id}/image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Nie udalo sie dodac zdjecia produktu.");
  }

  const updatedProduct = (await response.json()) as BackendProduct;
  return mapBackendProduct(updatedProduct);
};

export const deleteProduct = async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Nie udalo sie usunac produktu.");
  }

  return (await response.json()) as boolean;
};
