import Button from "../ui/Button";
import type { Product } from "../../types/product";

type ProductInfoProps = {
  product: Product;
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

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <section className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 max-[900px]:grid-cols-1">
      <div className="border-2 border-[#32435f] bg-[#0b111f]">
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
              <p className="text-2xl font-bold text-[#00ff2a] max-[520px]:text-lg">
                Image placeholder
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-center gap-8">
        <div>
          <p className="mb-5 text-xl font-bold text-[#00ff2a] max-[520px]:text-base">
            // product.info
          </p>
          <h1 className="text-[clamp(42px,6vw,76px)] font-bold leading-tight tracking-[0.04em] text-[#f3f5f7]">
            {product.name}
          </h1>
        </div>

        <div className="border-2 border-[#32435f] bg-black/20 px-6 py-5 text-[#6d2bbd] max-[520px]:px-4">
          {product.subtitle}
        </div>

        <p className="flex items-baseline gap-4 text-[#00ff2a]">
          <span className="text-5xl max-[520px]:text-4xl">
            {product.price.toFixed(2)}
          </span>
          <span className="text-xl text-[#7f8aa3]">PLN</span>
        </p>

        <p className="text-lg text-[#f3f5f7]">
          <span className="text-[#00ff2a]">&gt;</span> Stan:{" "}
          <span className="font-bold text-[#00ff2a]">{product.quantity} szt.</span>
        </p>

        <Button className="w-full">Dodaj do koszyka</Button>
      </div>
    </section>
  );
};

export default ProductInfo;
