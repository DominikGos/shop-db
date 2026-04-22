import type { CartItem, ProductSize } from "../../types/product";

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

const deliveryPrice = 19.99;

const CartModal = ({
  items,
  onClose,
  onCheckout,
  onRemoveItem,
  onUpdateQuantity,
}: CartModalProps) => {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );
  const delivery = items.length > 0 ? deliveryPrice : 0;
  const total = subtotal + delivery;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[90vh] w-[980px] max-w-full overflow-y-auto border-2 border-[#00ff2a]/60 bg-[#03080e]/95 p-12 shadow-[0_0_50px_rgba(0,255,42,0.12)] max-[700px]:px-5 max-[700px]:pb-6 max-[700px]:pt-9">
        <button
          className="absolute right-6 top-5 border-0 bg-transparent text-3xl text-[#7f8aa3] hover:text-[#00ff2a]"
          type="button"
          onClick={onClose}
          aria-label="Zamknij koszyk"
        >
          x
        </button>

        <p className="text-3xl text-[#22ff88]">// Twój koszyk</p>
        <h2 className="mt-2 text-lg text-[#b0b7c8]">Sprawdź wybrane produkty</h2>

        {items.length === 0 ? (
          <p className="mt-10 border-2 border-[#32435f] bg-black/20 p-8 text-center text-[#7f8aa3]">
            Koszyk jest pusty.
          </p>
        ) : (
          <div className="mt-10 grid gap-6">
            {items.map((item) => (
              <article
                className="relative grid grid-cols-[170px_minmax(0,1fr)_220px] gap-8 border-2 border-[#00ff2a]/50 bg-white/[0.03] p-5 max-[800px]:grid-cols-1"
                key={`${item.product.id}-${item.size}`}
              >
                <button
                  className="absolute right-5 top-4 text-2xl text-[#b0b7c8] hover:text-[#00ff2a]"
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
                    <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(145deg,#1b2230,#0b0f16)] text-sm font-bold text-[#00ff2a]">
                      PoliWear
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-center gap-4 pr-8 max-[800px]:pr-0">
                  <h3 className="text-2xl font-bold text-[#f3f5f7]">
                    {item.product.name}
                  </h3>
                  <p className="text-xl font-bold text-[#00ff2a]">
                    {item.product.price.toFixed(2)} PLN
                  </p>
                  <p className="text-[#b0b7c8]">
                    Ilość: {item.quantity} <span className="px-4">|</span>
                    Rozmiar: {item.size}
                  </p>
                </div>

                <div className="flex flex-col justify-center gap-5">
                  <div className="grid grid-cols-3 border-2 border-[#00ff2a]/60 text-center text-[#00ff2a]">
                    <button
                      className="min-h-12 text-2xl font-bold hover:bg-[#00ff2a] hover:text-black"
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
                      className="min-h-12 text-2xl font-bold hover:bg-[#00ff2a] hover:text-black"
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
                  <p className="text-right text-xl font-bold text-[#00ff2a] max-[800px]:text-left">
                    {(item.product.price * item.quantity).toFixed(2)} PLN
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 border-t-2 border-[#00ff2a]/50 pt-8">
          <h3 className="mb-6 text-xl font-bold text-[#f3f5f7]">Podsumowanie</h3>
          <div className="grid gap-4 text-[#b0b7c8]">
            <p className="flex justify-between gap-4">
              <span>Suma częściowa</span>
              <span>{subtotal.toFixed(2)} PLN</span>
            </p>
            <p className="flex justify-between gap-4">
              <span>Dostawa</span>
              <span>{delivery.toFixed(2)} PLN</span>
            </p>
          </div>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-[#7f8aa3]/60 pt-7 text-2xl font-bold text-[#00ff2a] max-[520px]:grid">
            <span>Do zapłaty</span>
            <span>{total.toFixed(2)} PLN</span>
          </div>

          <button
            className="mt-8 flex min-h-16 w-full items-center justify-center gap-4 border-2 border-[#00ff2a] bg-transparent font-bold text-[#22ff88] transition hover:bg-[#00ff2a]/10 disabled:cursor-not-allowed disabled:opacity-45"
            type="button"
            disabled={items.length === 0}
            onClick={onCheckout}
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
            Dokonaj płatności
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
