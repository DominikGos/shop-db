import type { Product } from "../../types/product";
import { VAT_RATE } from "../../utils/vat";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <section className="border-panel border-t-2 pt-10">
      <h2 className="text-accent mb-6 text-2xl font-bold">// details</h2>
      <div className="text-muted grid gap-4">
        <p>
          Produkt <span className="text-main">{product.name}</span> jest
          aktualnie przygotowany do sprzedaży w sklepie PoliWear.
        </p>
        <div className="grid gap-3 border-l-2 border-[rgba(0,255,42,0.4)] pl-4">
          <p>
            nazwa: <span className="text-main">{product.name}</span>
          </p>
          <p>
            cena:{" "}
            <span className="text-main">{product.price.toFixed(2)} PLN</span>
          </p>
          <p className="text-secondary text-sm">
            Cena brutto, w tym VAT {Math.round(VAT_RATE * 100)}%
          </p>
          <p>
            ilość: <span className="text-main">{product.quantity}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
