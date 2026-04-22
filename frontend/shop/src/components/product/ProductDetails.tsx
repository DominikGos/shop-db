import type { Product } from "../../types/product";

type ProductDetailsProps = {
  product: Product;
};

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <section className="border-t-2 border-[#32435f] pt-10">
      <h2 className="mb-6 text-2xl font-bold text-[#00ff2a]">// details</h2>
      <div className="grid gap-4 text-[#7f8aa3]">
        <p>
          Produkt <span className="text-[#f3f5f7]">{product.name}</span> jest
          aktualnie przygotowany do sprzedazy w sklepie PoliWear.
        </p>
        <div className="grid gap-3 border-l-2 border-[#00ff2a]/40 pl-4">
          <p>
            nazwa: <span className="text-[#f3f5f7]">{product.name}</span>
          </p>
          <p>
            cena:{" "}
            <span className="text-[#f3f5f7]">{product.price.toFixed(2)} PLN</span>
          </p>
          <p>
            ilość: <span className="text-[#f3f5f7]">{product.quantity}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
