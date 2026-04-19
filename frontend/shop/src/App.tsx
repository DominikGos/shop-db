import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AddProductModal from "./components/features/AddProductModal";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { products as initialProducts } from "./data/products";
import type { Product } from "./types/product";

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addProduct = (newProduct: Product) => {
    setProducts((currentProducts) => [newProduct, ...currentProducts]);
  };

  return (
    <BrowserRouter>
      <Header onAddClick={() => setIsAddModalOpen(true)} />
      <Routes>
        <Route path="/" element={<HomePage products={products} />} />
        <Route
          path="/products/:productId"
          element={<ProductPage products={products} />}
        />
      </Routes>
      <Footer />

      {isAddModalOpen ? (
        <AddProductModal
          onAddProduct={addProduct}
          onClose={() => setIsAddModalOpen(false)}
        />
      ) : null}
    </BrowserRouter>
  );
}

export default App;
