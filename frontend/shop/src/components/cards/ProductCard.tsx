import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import Button from "../ui/Button";
import { PRODUCT_SIZES, type Product } from "../../types/product";
import type { ProductSize } from "../../types/product";

type ProductCardProps = {
  product: Product;
  isDeleteMode?: boolean;
  isSelected?: boolean;
  onAddToCart: (product: Product, size: ProductSize) => void;
  onToggleSelected?: () => void;
};

const ProductCard = ({
  product,
  isDeleteMode = false,
  isSelected = false,
  onAddToCart,
  onToggleSelected,
}: ProductCardProps) => {
  const navigate = useNavigate();
  const [isSizePickerOpen, setIsSizePickerOpen] = useState(false);

  const handleCardClick = () => {
    if (isDeleteMode) {
      onToggleSelected?.();
      return;
    }

    navigate(`/products/${product.id}`);
  };

  const handleShowSizePicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsSizePickerOpen(true);
  };

  const handleSizeClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    size: ProductSize,
  ) => {
    event.stopPropagation();
    onAddToCart(product, size);
    setIsSizePickerOpen(false);
  };

  return (
    <article
      className={`group relative grid min-h-full cursor-pointer overflow-hidden border-2 bg-slate-950/95 shadow-xl transition duration-200 hover:border-green-400 ${
        isSelected ? "border-accent" : "border-panel"
      }`}
      role={isDeleteMode ? "button" : "link"}
      tabIndex={0}
      aria-pressed={isDeleteMode ? isSelected : undefined}
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || (isDeleteMode && event.key === " ")) {
          event.preventDefault();
          handleCardClick();
        }
      }}
    >
      {isDeleteMode ? (
        <label
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center border-2 border-accent bg-black/90"
          aria-label={`Zaznacz produkt ${product.name}`}
          onClick={(event) => event.stopPropagation()}
        >
          <input
            className="h-4 w-4 accent-green-400"
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelected}
          />
        </label>
      ) : null}

      <div
        className="relative min-h-80 overflow-hidden bg-slate-950 max-md:min-h-44 max-sm:min-h-36"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%),linear-gradient(140deg,rgba(255,255,255,0.04),transparent_45%)]" />
        <div className="absolute bottom-5 right-5 h-20 w-20 border border-white/10 opacity-70 max-md:h-12 max-md:w-12" />

        {product.imageUrl ? (
          <img
            className="absolute inset-0 z-10 h-full w-full object-cover"
            src={product.imageUrl}
            alt=""
          />
        ) : null}

        {product.category ? (
          <span className="text-accent absolute left-4 top-4 z-20 border border-green-400/50 bg-black/30 px-3 py-1.5 text-sm uppercase tracking-wider max-md:left-3 max-md:top-3 max-md:px-2 max-md:py-1 max-md:text-xs">
            {product.category}
          </span>
        ) : null}
      </div>

      <div className="grid gap-5 p-6 max-md:gap-3 max-md:p-4 max-sm:p-3">
        <p className="text-purple text-base max-md:text-xs">
          {product.subtitle}
        </p>
        <h3 className="text-3xl leading-tight max-md:text-lg max-sm:text-base">
          {product.name}
        </h3>
        <p className="text-muted text-sm max-md:text-xs">
          Stan: {product.quantity} szt.
        </p>
        <p className="text-accent inline-flex items-baseline gap-3 max-md:gap-2">
          <span className="text-3xl font-bold max-md:text-2xl max-sm:text-xl">
            {product.price.toFixed(2)}
          </span>
          <small className="text-muted text-base max-md:text-xs">
            PLN
          </small>
        </p>
        {isSizePickerOpen ? (
          <div
            className="grid gap-3"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-main text-sm font-bold max-sm:text-xs">
              Wybierz rozmiar
            </p>
            <div className="grid grid-cols-5 gap-2">
              {PRODUCT_SIZES.map((size) => (
                <button
                  className="min-h-11 border-2 border-panel bg-black/20 text-sm font-bold text-main transition hover:border-green-400 hover:bg-green-400 hover:text-black max-sm:min-h-9 max-sm:text-xs"
                  key={size}
                  type="button"
                  onClick={(event) => handleSizeClick(event, size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <Button
            className="w-full group-hover:bg-green-400 group-hover:text-black max-md:min-h-12 max-md:gap-2 max-md:px-2 max-md:py-2 max-md:text-xs"
            onClick={handleShowSizePicker}
            icon={<ShoppingCart />}
          >
            Dodaj do koszyka
          </Button>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
