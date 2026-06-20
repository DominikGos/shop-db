import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductDetails from "../components/product/ProductDetails";
import ProductInfo from "../components/product/ProductInfo";
import { fetchProductById } from "../services/productsApi";
import type { Product } from "../types/product";
import type { ProductSize } from "../types/product";

type ProductPageProps = {
  products: Product[];
  onAddToCart: (product: Product, size: ProductSize) => void;
};

const pageBackgroundClass =
  "bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),#02040a] bg-[size:42px_42px]";

const ProductPage = ({ products, onAddToCart }: ProductPageProps) => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!productId) {
        setIsLoading(false);
        return;
      }

      const fallbackProduct = products.find((item) => item.id === productId);

      try {
        const productFromApi = await fetchProductById(productId);
        setProduct(productFromApi ?? fallbackProduct ?? null);
      } catch (error) {
        console.error(error);
        setProduct(fallbackProduct ?? null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId, products]);

  if (isLoading) {
    return (
      <main className={`${pageBackgroundClass} min-h-[70vh] px-5 py-20`}>
        <div className="text-accent border-panel mx-auto max-w-[900px] border-2 bg-black/40 p-10 text-center">
          // loading product...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className={`${pageBackgroundClass} min-h-[70vh] px-5 py-20`}>
        <div className="border-panel mx-auto max-w-[900px] border-2 bg-black/40 p-10 text-center">
          <p className="text-purple mb-4">// product.not_found</p>
          <h1 className="text-main mb-8 text-4xl font-bold">
            Nie znaleziono produktu
          </h1>
          <Link className="text-accent font-bold" to="/">
            &gt; Wróć do sklepu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={pageBackgroundClass}>
      <div className="mx-auto grid max-w-[1440px] gap-16 px-4 py-20 max-[700px]:px-2.5 max-[700px]:py-12">
        <ProductInfo product={product} onAddToCart={onAddToCart} />
        <ProductDetails product={product} />
      </div>
    </main>
  );
};

export default ProductPage;
