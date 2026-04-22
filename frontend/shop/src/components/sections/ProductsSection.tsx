import ProductCard from "../cards/ProductCard";
import SectionHeading from "../ui/SectionHeading";
import type { Product } from "../../types/product";
import type { ProductSize } from "../../types/product";

type ProductsSectionProps = {
  products: Product[];
  isDeleteMode: boolean;
  selectedProductIds: string[];
  onCancelDeleteMode: () => void;
  onDeleteSelected: () => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
  onToggleProductSelection: (productId: string) => void;
};

const ProductsSection = ({
  products,
  isDeleteMode,
  selectedProductIds,
  onCancelDeleteMode,
  onDeleteSelected,
  onAddToCart,
  onToggleProductSelection,
}: ProductsSectionProps) => {
  return (
    <section className="bg-black py-[88px] max-[700px]:py-16" id="products">
      <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1440px] gap-14 max-[700px]:w-[calc(100%_-_20px)] max-[700px]:gap-10">
        <SectionHeading eyebrow="// Browse collection" title="Produkty" />

        {isDeleteMode ? (
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="min-h-12 border-2 border-[#ff3b3b] bg-black px-5 font-bold text-[#ff3b3b] transition hover:bg-[#ff3b3b] hover:text-black disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-black disabled:hover:text-[#ff3b3b]"
              type="button"
              disabled={selectedProductIds.length === 0}
              onClick={onDeleteSelected}
            >
              Usuń wybrane produkty ({selectedProductIds.length})
            </button>
            <button
              className="min-h-12 border-2 border-[#7f8aa3] bg-black px-5 font-bold text-[#f3f5f7] transition hover:border-[#00ff2a] hover:text-[#00ff2a]"
              type="button"
              onClick={onCancelDeleteMode}
            >
              Zakończ
            </button>
          </div>
        ) : null}

        <div className="grid grid-cols-4 gap-9 max-[1200px]:grid-cols-2 max-[700px]:gap-4 max-[360px]:grid-cols-1 max-[360px]:gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isDeleteMode={isDeleteMode}
              isSelected={selectedProductIds.includes(product.id)}
              onAddToCart={onAddToCart}
              onToggleSelected={() => onToggleProductSelection(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
