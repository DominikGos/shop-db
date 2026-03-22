import Header from "../../components/layout/Header/Header";
import HeroSection from "../../components/sections/HeroSection/HeroSection";
import ProductsSection from "../../components/sections/ProductsSection/ProductsSection";
import Footer from "../../components/layout/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProductsSection />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;