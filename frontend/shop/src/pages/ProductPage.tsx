import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductDetails from "../components/product/ProductDetails";
import ProductInfo from "../components/product/ProductInfo";
import { fetchProductById } from "../services/productsApi";
import type { Product } from "../types/product";

type ProductPageProps = {
  products: Product[];
};

const ProductPage = ({ products }: ProductPageProps) => {
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
      <main className="min-h-[70vh] bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),#02040a] bg-[size:42px_42px] px-5 py-20">
        <div className="mx-auto max-w-[900px] border-2 border-[#32435f] bg-black/40 p-10 text-center text-[#00ff2a]">
          // loading product...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-[70vh] bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),#02040a] bg-[size:42px_42px] px-5 py-20">
        <div className="mx-auto max-w-[900px] border-2 border-[#32435f] bg-black/40 p-10 text-center">
          <p className="mb-4 text-[#6d2bbd]">// product.not_found</p>
          <h1 className="mb-8 text-4xl font-bold text-[#f3f5f7]">
            Nie znaleziono produktu
          </h1>
          <Link className="font-bold text-[#00ff2a]" to="/">
            &gt; Wroc do sklepu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),#02040a] bg-[size:42px_42px]">
      <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1440px] gap-16 py-20 max-[700px]:w-[calc(100%_-_20px)] max-[700px]:py-12">
        <ProductInfo product={product} />
        <ProductDetails product={product} />
      </div>
    </main>
  );
};

export default ProductPage;
