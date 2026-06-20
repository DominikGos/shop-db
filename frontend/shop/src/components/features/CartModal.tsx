import { useMemo, useState } from "react";
import CheckoutForm from "../CheckoutForm";
import type { CartItem, ProductSize } from "../../types/product";
import {
  SHIPPING_COST,
  VAT_RATE,
  getNetFromGross,
  getVatFromGross,
} from "../../utils/vat";

type CartModalProps = {
  items: CartItem[];
  onClose: () => void;
  onCheckout: () => void;
  onRemoveItem: (productId: string, size: ProductSize) => void;
  onUpdateQuantity: (
    productId: string,
    size: ProductSize,
    quantity: number,
  ) => void;
};

const CartModal = ({
  items,
  onClose,
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
}: CartModalProps) => {
  const [view, setView] = useState<"cart" | "checkout">("cart");
  const currentView = items.length === 0 ? "cart" : view;

  const subtotalGross = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [items],
  );
  const subtotalNet = getNetFromGross(subtotalGross);
  const subtotalVat = getVatFromGross(subtotalGross);
  const deliveryGross = items.length > 0 ? SHIPPING_COST : 0;
  const deliveryNet = getNetFromGross(deliveryGross);
  const deliveryVat = getVatFromGross(deliveryGross);
  const totalGross = subtotalGross + deliveryGross;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="panel-accent relative max-h-[90vh] w-[980px] max-w-full overflow-y-auto p-12 max-[700px]:px-5 max-[700px]:pb-6 max-[700px]:pt-9"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="hover-text-accent text-muted absolute right-6 top-5 border-0 bg-transparent text-3xl"
          type="button"
          onClick={onClose}
          aria-label="Zamknij koszyk"
        >
          x
        </button>

        {currentView === "checkout" ? (
          <CheckoutForm
            items={items}
            onBack={() => setView("cart")}
            onSuccess={onCheckout}
          />
        ) : (
          <>
            <p className="text-accent-soft text-3xl">// Twój koszyk</p>
            <h2 className="text-secondary mt-2 text-lg">
              Sprawdź wybrane produkty
            </h2>

            {items.length === 0 ? (
              <p className="text-muted border-panel mt-10 border-2 bg-black/20 p-8 text-center">
                Koszyk jest pusty.
              </p>
            ) : (
              <div className="mt-10 grid gap-6">
                {items.map((item) => (
                  <article
                    className="relative grid grid-cols-[170px_minmax(0,1fr)_220px] gap-8 border-2 border-[rgba(0,255,42,0.5)] bg-white/[0.03] p-5 max-[800px]:grid-cols-1"
                    key={`${item.product.id}-${item.size}`}
                  >
                    <button
                      className="hover-text-accent text-secondary absolute right-5 top-4 text-2xl"
                      type="button"
                      onClick={() => onRemoveItem(item.product.id, item.size)}
                      aria-label={`Usuń ${item.product.name} z koszyka`}
                    >
                      x
                    </button>

                    <div className="relative min-h-36 overflow-hidden bg-[#141b25]">
                      {item.product.imageUrl ? (
                        <img
                          className="absolute inset-0 h-full w-full object-cover"
                          src={item.product.imageUrl}
                          alt={item.product.name}
                        />
                      ) : (
                        <div className="text-accent absolute inset-0 grid place-items-center bg-[linear-gradient(145deg,#1b2230,#0b0f16)] text-sm font-bold">
                          PoliWear
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-center gap-4 pr-8 max-[800px]:pr-0">
                      <h3 className="text-main text-2xl font-bold">
                        {item.product.name}
                      </h3>
                      <div>
                        <p className="text-accent text-xl font-bold">
                          {item.product.price.toFixed(2)} PLN
                        </p>
                        <p className="text-secondary mt-1 text-sm">
                          Cena brutto, w tym VAT {Math.round(VAT_RATE * 100)}%
                        </p>
                      </div>
                      <p className="text-secondary">
                        Ilość: {item.quantity} <span className="px-4">|</span>
                        Rozmiar: {item.size}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center gap-5">
                      <div className="text-accent grid grid-cols-3 border-2 border-[rgba(0,255,42,0.6)] text-center">
                        <button
                          className="quantity-button-accent min-h-12 text-2xl"
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity - 1,
                            )
                          }
                          aria-label="Zmniejsz ilość"
                        >
                          -
                        </button>
                        <span className="grid min-h-12 place-items-center font-bold">
                          {item.quantity}
                        </span>
                        <button
                          className="quantity-button-accent min-h-12 text-2xl"
                          type="button"
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              item.size,
                              item.quantity + 1,
                            )
                          }
                          aria-label="Zwiększ ilość"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-accent text-right text-xl font-bold max-[800px]:text-left">
                        {(item.product.price * item.quantity).toFixed(2)} PLN
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="mt-8 border-t-2 border-[rgba(0,255,42,0.5)] pt-8">
              <h3 className="text-main mb-3 text-xl font-bold">
                Podsumowanie
              </h3>
              <p className="text-secondary mb-6 text-sm">
                Ceny zawierają VAT {Math.round(VAT_RATE * 100)}%.
              </p>
              <div className="text-secondary grid gap-4">
                <p className="flex justify-between gap-4">
                  <span>Suma netto</span>
                  <span>{subtotalNet.toFixed(2)} PLN</span>
                </p>
                <p className="flex justify-between gap-4">
                  <span>VAT 23%</span>
                  <span>{subtotalVat.toFixed(2)} PLN</span>
                </p>
                <p className="flex justify-between gap-4">
                  <span>Dostawa brutto</span>
                  <span>{deliveryGross.toFixed(2)} PLN</span>
                </p>
                <p className="text-muted flex justify-between gap-4 text-sm">
                  <span>Dostawa netto / VAT</span>
                  <span>
                    {deliveryNet.toFixed(2)} PLN / {deliveryVat.toFixed(2)} PLN
                  </span>
                </p>
              </div>

              <div className="text-accent mt-7 flex items-center justify-between gap-4 border-t border-[#7f8aa3]/60 pt-7 text-2xl font-bold max-[520px]:grid">
                <span>Razem brutto</span>
                <span>{totalGross.toFixed(2)} PLN</span>
              </div>

              <button
                className="btn-accent-subtle mt-8 flex min-h-16 w-full items-center justify-center gap-4 border-2 bg-transparent disabled:cursor-not-allowed disabled:opacity-45"
                type="button"
                disabled={items.length === 0}
                onClick={() => setView("checkout")}
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 10V8C7 5.2 9.2 3 12 3C14.8 3 17 5.2 17 8V10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 10H18V20H6V10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
                Zamówienie
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
