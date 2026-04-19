import ProductCard from "../cards/ProductCard";
import SectionHeading from "../ui/SectionHeading";
import type { Product } from "../../types/product";

type ProductsSectionProps = {
  products: Product[];
};

const ProductsSection = ({ products }: ProductsSectionProps) => {
  return (
    <section className="bg-black py-[88px] max-[700px]:py-16" id="products">
      <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1440px] gap-14 max-[700px]:w-[calc(100%_-_20px)] max-[700px]:gap-10">
        <SectionHeading eyebrow="// Browse collection" title="Produkty" />
        <div className="grid grid-cols-4 gap-9 max-[1200px]:grid-cols-2 max-[700px]:gap-4 max-[360px]:grid-cols-1 max-[360px]:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
