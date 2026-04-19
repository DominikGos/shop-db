import HeroSection from "../components/sections/HeroSection";
import ProductsSection from "../components/sections/ProductsSection";
import type { Product } from "../types/product";

type HomePageProps = {
  products: Product[];
};

const HomePage = ({ products }: HomePageProps) => {
  return (
    <main>
      <HeroSection />
      <ProductsSection products={products} />
    </main>
  );
};

export default HomePage;
