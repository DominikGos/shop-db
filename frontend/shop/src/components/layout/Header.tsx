import { useState } from "react";
import Logo from "../ui/Logo";
import NavLink from "../ui/NavLink";
import SearchBar from "../ui/SearchBar";
import type { Product } from "../../types/product";

type HeaderProps = {
  onAddClick: () => void;
  onDeleteModeClick: () => void;
  onCartClick: () => void;
  cartItemsCount: number;
  products: Product[];
};

const Header = ({
  onAddClick,
  onDeleteModeClick,
  onCartClick,
  cartItemsCount,
  products,
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAddClick = () => {
    onAddClick();
    setIsMenuOpen(false);
  };

  const handleDeleteModeClick = () => {
    onDeleteModeClick();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 border-b-2 border-accent bg-black/90 backdrop-blur">
      <div className="mx-auto grid min-h-24 w-full grid-cols-3 items-center gap-8 px-12 max-[900px]:flex max-[900px]:min-h-0 max-[900px]:w-full max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-3 max-[900px]:px-4 max-[900px]:py-4 max-[420px]:px-3">
        <div className="ml-8 flex min-w-0 justify-start max-[900px]:ml-0 max-[900px]:justify-center">
          <Logo />
        </div>

        <div className="flex min-w-0 justify-center max-[900px]:w-full">
          <SearchBar products={products} />
        </div>

        <div className="flex min-w-0 justify-end max-[900px]:w-full max-[900px]:justify-center">
          <div className="flex min-w-0 items-center gap-5 max-[900px]:w-full max-[900px]:flex-col max-[900px]:gap-3">
            <nav
              className="flex min-w-0 items-center gap-6 max-[900px]:w-full max-[900px]:justify-center max-[900px]:gap-4 max-[480px]:gap-3 max-[480px]:text-sm"
              aria-label="Główna nawigacja"
            >
              <NavLink label="Home" to="/" />
              <NavLink label="Produkty" to="/#products" />
            </nav>

            <div className="flex items-center justify-center gap-4 max-[480px]:gap-3">
              <div className="relative">
                <button
                  className="btn-accent flex min-h-14 items-center gap-2 border-2 bg-black px-5 max-[480px]:min-h-11 max-[480px]:px-3 max-[480px]:text-sm"
                  type="button"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="menu"
                  onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
                >
                  Edytuj produkty
                  <span className="text-lg leading-none" aria-hidden="true">
                    {isMenuOpen ? "^" : "v"}
                  </span>
                </button>

                {isMenuOpen ? (
                  <div
                    className="menu-panel-accent absolute right-0 top-full z-30 mt-2 grid w-56"
                    role="menu"
                  >
                    <button
                      className="menu-item-accent flex min-h-12 items-center gap-3 px-4 text-left"
                      type="button"
                      role="menuitem"
                      onClick={handleAddClick}
                    >
                      <span className="text-xl leading-none">+</span>
                      Dodaj produkty
                    </button>
                    <button
                      className="menu-item-accent menu-separator flex min-h-12 items-center gap-3 border-t px-4 text-left"
                      type="button"
                      role="menuitem"
                      onClick={handleDeleteModeClick}
                    >
                      <span className="text-xl leading-none">-</span>
                      Usuń produkty
                    </button>
                  </div>
                ) : null}
              </div>

              <button
                className="text-accent relative flex h-14 w-14 items-center justify-center max-[480px]:h-11 max-[480px]:w-11"
                type="button"
                aria-label="Koszyk"
                onClick={onCartClick}
              >
                <svg className="h-8 w-8 max-[480px]:h-6 max-[480px]:w-6" viewBox="0 0 24 24" fill="none">
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
                <span className="badge-accent absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs max-[480px]:h-4 max-[480px]:w-4 max-[480px]:text-[10px]">
                  {cartItemsCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
