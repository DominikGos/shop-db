import HeroSection from "../components/sections/HeroSection";
import ProductsSection from "../components/sections/ProductsSection";
import type { Product } from "../types/product";
import type { ProductSize } from "../types/product";

type HomePageProps = {
  products: Product[];
  isDeleteMode: boolean;
  selectedProductIds: string[];
  onCancelDeleteMode: () => void;
  onDeleteSelected: () => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
  onToggleProductSelection: (productId: string) => void;
};

const HomePage = ({
  products,
  isDeleteMode,
  selectedProductIds,
  onCancelDeleteMode,
  onDeleteSelected,
  onAddToCart,
  onToggleProductSelection,
}: HomePageProps) => {
  return (
    <main>
      <HeroSection />
      <ProductsSection
        products={products}
        isDeleteMode={isDeleteMode}
        selectedProductIds={selectedProductIds}
        onCancelDeleteMode={onCancelDeleteMode}
        onDeleteSelected={onDeleteSelected}
        onAddToCart={onAddToCart}
        onToggleProductSelection={onToggleProductSelection}
      />
    </main>
  );
};

export default HomePage;
