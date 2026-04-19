import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

const getProductBackground = (visual: Product["visual"]) => {
  if (visual === "terminal") {
    return "bg-[linear-gradient(135deg,#fafafa_0%,#f2f2f2_35%,#171717_100%)]";
  }

  if (visual === "shadow") {
    return "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_35%),linear-gradient(180deg,#202020_0%,#0e0e0e_100%)]";
  }

  if (visual === "matrix") {
    return "bg-[radial-gradient(circle_at_center,rgba(31,48,34,0.55),transparent_22%),linear-gradient(160deg,#20252a_0%,#0e1115_100%)]";
  }

  if (visual === "avatar") {
    return "bg-[radial-gradient(circle_at_top_right,rgba(153,225,255,0.55),transparent_30%),linear-gradient(180deg,#b7e0f9_0%,#6fa7be_40%,#1b2e1f_100%)]";
  }

  if (visual === "beach") {
    return "bg-[linear-gradient(180deg,#8ecbd7_0%,#7ec3d7_34%,#d9c2a1_34%,#d9c2a1_100%)]";
  }

  if (visual === "coffee") {
    return "bg-[linear-gradient(120deg,#3b3242_0%,#171a22_58%,#524843_100%)]";
  }

  if (visual === "debug") {
    return "bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.09),transparent_34%),linear-gradient(180deg,#252525_0%,#111111_100%)]";
  }

  if (visual === "stackoverflow") {
    return "bg-[linear-gradient(180deg,#f8f8f8_0%,#d7d7d7_18%,#1f242e_18%,#161b23_100%)]";
  }

  return "bg-[linear-gradient(145deg,#071327_0%,#05070d_100%)]";
};

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  const openProductPage = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <article
      className="group grid min-h-full cursor-pointer overflow-hidden border-2 border-[#32435f] bg-[#0d1526]/95 shadow-[0_18px_50px_rgba(0,0,0,0.24)] transition duration-200 hover:border-[#00ff2a] hover:shadow-[0_0_28px_rgba(0,255,42,0.28)]"
      role="link"
      tabIndex={0}
      onClick={openProductPage}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          openProductPage();
        }
      }}
    >
      <div
        className={`relative min-h-[304px] overflow-hidden bg-[#0b111f] max-[700px]:min-h-[180px] max-[480px]:min-h-[135px] max-[360px]:min-h-[220px] ${getProductBackground(
          product.visual,
        )}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),linear-gradient(140deg,rgba(255,255,255,0.04),transparent_45%)]" />
        <div className="absolute bottom-5 right-5 h-20 w-20 border border-white/10 opacity-70 max-[700px]:h-12 max-[700px]:w-12" />

        {product.imageUrl ? (
          <img
            className="absolute inset-0 z-[1] h-full w-full object-cover"
            src={product.imageUrl}
            alt=""
          />
        ) : null}

        {product.category ? (
          <span className="absolute left-4 top-4 z-[2] border border-[#00ff2a]/45 bg-black/30 px-3 py-1.5 text-[14px] uppercase tracking-[0.08em] text-[#00ff2a] max-[700px]:left-3 max-[700px]:top-3 max-[700px]:px-2 max-[700px]:py-1 max-[700px]:text-[11px] max-[480px]:text-[10px]">
            {product.category}
          </span>
        ) : null}
      </div>

      <div className="grid gap-5 p-6 max-[700px]:gap-3 max-[700px]:p-4 max-[480px]:gap-2 max-[480px]:p-3 max-[360px]:gap-4 max-[360px]:p-5">
        <p className="text-base text-[#6d2bbd] max-[700px]:text-xs max-[480px]:text-[11px] max-[360px]:text-base">
          {product.subtitle}
        </p>
        <h3 className="text-[clamp(22px,7vw,30px)] leading-[1.35] max-[700px]:text-lg max-[480px]:text-base max-[360px]:text-2xl">
          {product.name}
        </h3>
        <p className="text-[15px] text-[#7f8aa3] max-[700px]:text-xs max-[480px]:text-[11px] max-[360px]:text-sm">
          Stan: {product.quantity} szt.
        </p>
        <p className="inline-flex items-baseline gap-3 text-[#00ff2a] max-[700px]:gap-2">
          <span className="text-3xl font-bold max-[700px]:text-2xl max-[480px]:text-xl max-[360px]:text-3xl">
            {product.price.toFixed(2)}
          </span>
          <small className="text-[17px] text-[#7f8aa3] max-[700px]:text-xs max-[480px]:text-[11px] max-[360px]:text-base">
            PLN
          </small>
        </p>
        <Button
          className="w-full group-hover:bg-[#00ff2a] group-hover:text-black group-hover:shadow-[0_0_24px_rgba(0,255,42,0.28)] max-[700px]:min-h-11 max-[700px]:gap-2 max-[700px]:px-2 max-[700px]:py-2 max-[700px]:text-xs max-[480px]:text-[11px] max-[360px]:min-h-14 max-[360px]:text-base"
          onClick={(event) => event.stopPropagation()}
          icon={
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M3 5H5L7.4 15H17.2L20 8H8.2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="19" r="1.5" fill="currentColor" />
              <circle cx="17" cy="19" r="1.5" fill="currentColor" />
            </svg>
          }
        >
          Dodaj do koszyka
        </Button>
      </div>
    </article>
  );
};

export default ProductCard;
