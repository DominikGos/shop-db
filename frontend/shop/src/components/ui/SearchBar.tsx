import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";

type SearchBarProps = {
  products: Product[];
};

const SearchBar = ({ products }: SearchBarProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const foundProducts = useMemo(() => {
    const searchValue = query.trim().toLowerCase();

    if (searchValue.length < 2) {
      return [];
    }

    return products
      .filter((product) => product.name.toLowerCase().includes(searchValue))
      .slice(0, 5);
  }, [products, query]);

  const showSuggestions = isFocused && foundProducts.length > 0;

  const openProduct = (productId: string) => {
    setQuery("");
    setIsFocused(false);
    navigate(`/products/${productId}`);
  };

  return (
    <div className="relative w-full max-w-xl">
      <label
        className="flex min-h-14 w-full items-center gap-4 border-2 border-slate-500 bg-slate-950 px-4 max-sm:min-h-12 max-sm:gap-3 max-sm:px-3"
        aria-label="Szukaj produktów"
      >
        <span
          className="text-accent h-6 w-6 shrink-0 max-sm:h-5 max-sm:w-5"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
            <path
              d="M16 16L21 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <input
          className="w-full min-w-0 border-0 bg-transparent text-white outline-none placeholder:text-slate-500 max-sm:text-sm max-sm:placeholder:text-xs"
          type="search"
          value={query}
          onBlur={() => {
            window.setTimeout(() => setIsFocused(false), 120);
          }}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Szukaj w kodzie... np. koszulka, bluza"
        />
      </label>

      {showSuggestions ? (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 grid border-2 border-green-400/70 bg-black shadow-xl">
          {foundProducts.map((product) => (
            <button
              className="flex min-h-20 items-center gap-4 border-b border-green-400/20 px-3 py-2 text-left transition last:border-b-0 hover:bg-green-400/10"
              key={product.id}
              type="button"
              onClick={() => openProduct(product.id)}
            >
              <span className="border-panel relative h-14 w-16 overflow-hidden border bg-slate-900">
                {product.imageUrl ? (
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={product.imageUrl}
                    alt=""
                  />
                ) : (
                    <span className="text-accent grid h-full place-items-center text-xs font-bold">
                    PW
                  </span>
                )}
              </span>
              <span className="grid min-w-0 gap-1">
                <span className="text-main truncate font-bold">
                  {product.name}
                </span>
                <span className="text-accent text-sm font-bold">
                  {product.price.toFixed(2)} PLN
                </span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
