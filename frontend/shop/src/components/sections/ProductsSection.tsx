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
    <section className="bg-black py-24 max-md:py-16" id="products">
      <div className="mx-auto grid max-w-screen-2xl gap-14 px-4 max-md:gap-10 max-md:px-3">
        <SectionHeading eyebrow="// Browse collection" title="Produkty" />

        {isDeleteMode ? (
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="min-h-12 border-2 border-red-500 bg-black px-5 font-bold text-red-500 transition hover:bg-red-500 hover:text-black disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-black disabled:hover:text-red-500"
              type="button"
              disabled={selectedProductIds.length === 0}
              onClick={onDeleteSelected}
            >
              Usuń wybrane produkty ({selectedProductIds.length})
            </button>
            <button
              className="min-h-12 border-2 border-slate-500 bg-black px-5 font-bold text-main transition hover:border-green-400 hover:text-green-400"
              type="button"
              onClick={onCancelDeleteMode}
            >
              Zakończ
            </button>
          </div>
        ) : null}

        <div className="grid grid-cols-4 gap-9 max-xl:grid-cols-2 max-md:gap-4 max-sm:grid-cols-1">
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
