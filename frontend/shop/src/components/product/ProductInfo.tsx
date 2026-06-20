import { useState } from "react";
import Button from "../ui/Button";
import { PRODUCT_SIZES, type Product } from "../../types/product";
import type { ProductSize } from "../../types/product";
import { VAT_RATE } from "../../utils/vat";

type ProductInfoProps = {
  product: Product;
  onAddToCart: (product: Product, size: ProductSize) => void;
};

const getProductPreview = (visual: Product["visual"]) => {
  if (visual === "terminal") {
    return "bg-[linear-gradient(135deg,#fafafa_0%,#f2f2f2_35%,#171717_100%)]";
  }

  if (visual === "shadow") {
    return "bg-[linear-gradient(180deg,#202020_0%,#0e0e0e_100%)]";
  }

  if (visual === "avatar") {
    return "bg-[linear-gradient(180deg,#b7e0f9_0%,#6fa7be_45%,#1b2e1f_100%)]";
  }

  return "bg-[linear-gradient(145deg,#101827_0%,#05070d_100%)]";
};

const ProductInfo = ({ product, onAddToCart }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize>("M");

  return (
    <section className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 max-[900px]:grid-cols-1">
      <div className="border-panel border-2 bg-[#0b111f]">
        <div
          className={`relative min-h-[680px] overflow-hidden max-[900px]:min-h-[420px] max-[520px]:min-h-[320px] ${getProductPreview(
            product.visual,
          )}`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,42,0.05)_1px,transparent_1px),linear-gradient(rgba(0,255,42,0.04)_1px,transparent_1px)] bg-[size:34px_34px]" />
          {product.imageUrl ? (
            <img
              className="absolute inset-0 h-full w-full object-cover"
              src={product.imageUrl}
              alt={product.name}
            />
          ) : (
            <div className="absolute inset-8 grid place-items-center border border-white/10 bg-black/20 text-center">
              <p className="text-accent text-2xl font-bold max-[520px]:text-lg">
                Image placeholder
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-8">
        <div>
          <p className="text-accent mb-5 text-xl font-bold max-[520px]:text-base">
            // product.info
          </p>
          <h1 className="text-main text-[clamp(42px,6vw,76px)] font-bold leading-tight tracking-[0.04em]">
            {product.name}
          </h1>
        </div>

        <div className="text-purple border-panel border-2 bg-black/20 px-6 py-5 max-[520px]:px-4">
          {product.subtitle}
        </div>

        <div className="grid gap-2">
          <p className="text-accent flex items-baseline gap-4">
            <span className="text-5xl max-[520px]:text-4xl">
              {product.price.toFixed(2)}
            </span>
            <span className="text-muted text-xl">PLN</span>
          </p>
          <p className="text-secondary text-sm">
            Cena brutto, w tym VAT {Math.round(VAT_RATE * 100)}%
          </p>
        </div>

        <p className="text-main text-lg">
          <span className="text-accent">&gt;</span> Stan:{" "}
          <span className="text-accent font-bold">{product.quantity} szt.</span>
        </p>

        <div className="grid gap-3">
          <p className="text-main font-bold">
            <span className="text-accent">&gt;</span> Rozmiar:{" "}
            <span className="text-accent">{selectedSize}</span>
          </p>
          <div className="grid grid-cols-5 gap-3">
            {PRODUCT_SIZES.map((size) => (
              <button
                className={`min-h-12 border-2 font-bold transition ${
                  selectedSize === size
                    ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-black"
                    : "border-[#32435f] bg-black/20 text-main hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                }`}
                type="button"
                key={size}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => onAddToCart(product, selectedSize)}
        >
          Dodaj do koszyka
        </Button>
      </div>
    </section>
  );
};

export default ProductInfo;
