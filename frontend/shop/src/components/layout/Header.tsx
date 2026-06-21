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
      <div className="mx-auto grid min-h-24 w-full grid-cols-3 items-center gap-8 px-12 max-lg:flex max-lg:min-h-0 max-lg:flex-col max-lg:items-stretch max-lg:gap-3 max-lg:px-4 max-lg:py-4">
        <div className="ml-8 flex min-w-0 justify-start max-lg:ml-0 max-lg:justify-center">
          <Logo />
        </div>

        <div className="flex min-w-0 justify-center max-lg:w-full">
          <SearchBar products={products} />
        </div>

        <div className="flex min-w-0 justify-end max-lg:w-full max-lg:justify-center">
          <div className="flex min-w-0 items-center gap-5 max-lg:w-full max-lg:flex-col max-lg:gap-3">
            <nav
              className="flex min-w-0 items-center gap-6 max-lg:w-full max-lg:justify-center max-lg:gap-4 max-sm:gap-3 max-sm:text-sm"
              aria-label="Główna nawigacja"
            >
              <NavLink label="Home" to="/" />
              <NavLink label="Produkty" to="/#products" />
            </nav>

            <div className="flex items-center justify-center gap-4 max-sm:gap-3">
              <div className="relative">
                <button
                  className="btn-accent flex min-h-14 items-center gap-2 border-2 bg-black px-5 max-sm:min-h-12 max-sm:px-3 max-sm:text-sm"
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
                      className="menu-item-accent flex min-h-12 items-center gap-3 border-t border-green-400/40 px-4 text-left"
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
                className="text-accent relative flex h-14 w-14 items-center justify-center max-sm:h-12 max-sm:w-12"
                type="button"
                aria-label="Koszyk"
                onClick={onCartClick}
              >
                <svg className="h-8 w-8 max-sm:h-6 max-sm:w-6" viewBox="0 0 24 24" fill="none">
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
                <span className="badge-accent absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs max-sm:h-4 max-sm:w-4">
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
