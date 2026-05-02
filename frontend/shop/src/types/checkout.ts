import type { CartItem } from "./product";

export type CheckoutFormData = {
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  postalCode: string;
  city: string;
  phone: string;
  email: string;
  taxId: string;
  orderNotes: string;
};

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;

export type InvoiceCartItem = Pick<CartItem, "quantity" | "size"> & {
  product: Pick<CartItem["product"], "name" | "price" | "imageUrl">;
};
