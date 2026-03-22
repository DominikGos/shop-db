import { products } from "../../../data/products";
import ProductCard from "../../cards/ProductCard/ProductCard";
import SectionHeading from "../../ui/SectionHeading/SectionHeading";
import "./ProductsSection.css";

const ProductsSection = () => {
  return (
    <section className="products-section" id="products">
      <div className="products-section__inner">
        <SectionHeading eyebrow="// Browse collection" title="Produkty" />
        <div className="products-section__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
