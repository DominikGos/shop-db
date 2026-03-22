import Button from "../../ui/Button/Button";
import "./ProductCard.css";
import type { Product } from "../../../types/product";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product-card">
      <div
        className={`product-card__media product-card__media--${product.visual}`}
        aria-hidden="true"
      >
        <span className="product-card__badge">{product.category}</span>
      </div>
      <div className="product-card__content">
        <p className="product-card__subtitle">{product.subtitle}</p>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__price">
          <span>{product.price.toFixed(2)}</span>
          <small>PLN</small>
        </p>
        <Button
          className="product-card__button"
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
