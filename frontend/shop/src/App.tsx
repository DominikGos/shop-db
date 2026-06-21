import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import AddProductModal from "./components/features/AddProductModal";
import CartModal from "./components/features/CartModal";
import PurchaseSuccessModal from "./components/features/PurchaseSuccessModal";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import { products as initialProducts } from "./data/products";
import {
  createProduct,
  deleteProduct,
  fetchProducts,
} from "./services/productsApi";
import type { Product, ProductInput } from "./types/product";
import type { CartItem, ProductSize } from "./types/product";

const ScrollToRouteTarget = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ShopApp />
    </BrowserRouter>
  );
}

const ShopApp = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts); //jakie sa produkty
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // czy modal dodawania jest otwarty
  const [isCartOpen, setIsCartOpen] = useState(false); // czy koszyk jest otwarty
  const [isPurchaseSuccessOpen, setIsPurchaseSuccessOpen] = useState(false); // czy zakup zakonczony sukcesem jest widoczny na ekranie
  const [isDeleteMode, setIsDeleteMode] = useState(false); // czy działa tryb usuwania
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]); // które produkty są zaznaczone do usunięcia
  const [cartItems, setCartItems] = useState<CartItem[]>([]);// co jest w koszyku

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsFromApi = await fetchProducts();
        setProducts(productsFromApi);
      } catch (error) {
        console.error(error);
      }
    };

    loadProducts();
  }, []);

  const addProduct = async (newProduct: ProductInput) => {
    const createdProduct = await createProduct(newProduct);
    setProducts((currentProducts) => [createdProduct, ...currentProducts]);
  };

  const toggleProductSelection = (productId: string) => {
    setSelectedProductIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  };

  const closeDeleteMode = () => {
    setIsDeleteMode(false);
    setSelectedProductIds([]);
  };

  const removeSelectedProducts = async () => {
    await Promise.all(selectedProductIds.map((id) => deleteProduct(id)));
    setProducts((currentProducts) =>
      currentProducts.filter((product) => !selectedProductIds.includes(product.id)),
    );
    closeDeleteMode();
  };

  const addToCart = (product: Product, size: ProductSize) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id && item.size === size,
      );

      if (!existingItem) {
        return [{ product, size, quantity: 1 }, ...currentItems];
      }

      return currentItems.map((item) =>
        item.product.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (productId: string, size: ProductSize, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((currentItems) =>
        currentItems.filter(
          (item) => !(item.product.id === productId && item.size === size),
        ),
      );
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  const removeCartItem = (productId: string, size: ProductSize) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => !(item.product.id === productId && item.size === size),
      ),
    );
  };

  const finishCheckout = () => {
    setCartItems([]);
    setIsCartOpen(false);
    setIsPurchaseSuccessOpen(true);
    navigate("/");
  };

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <>
      <ScrollToRouteTarget />
      <Header
        onAddClick={() => {
          setIsAddModalOpen(true);
          closeDeleteMode();
        }}
        onDeleteModeClick={() => setIsDeleteMode(true)}
        onCartClick={() => setIsCartOpen(true)}
        cartItemsCount={cartItemsCount}
        products={products}
      />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              products={products}
              isDeleteMode={isDeleteMode}
              selectedProductIds={selectedProductIds}
              onCancelDeleteMode={closeDeleteMode}
              onDeleteSelected={removeSelectedProducts}
              onAddToCart={addToCart}
              onToggleProductSelection={toggleProductSelection}
            />
          }
        />
        <Route
          path="/products/:productId"
          element={<ProductPage products={products} onAddToCart={addToCart} />}
        />
      </Routes>
      <Footer />

      {isAddModalOpen ? (
        <AddProductModal
          onAddProduct={addProduct}
          onClose={() => setIsAddModalOpen(false)}
        />
      ) : null}

      {isCartOpen ? (
        <CartModal
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onCheckout={finishCheckout}
          onRemoveItem={removeCartItem}
          onUpdateQuantity={updateCartQuantity}
        />
      ) : null}

      {isPurchaseSuccessOpen ? (
        <PurchaseSuccessModal onClose={() => setIsPurchaseSuccessOpen(false)} />
      ) : null}
    </>
  );
};

export default App;
