import Logo from "../../ui/Logo/Logo";
import NavLink from "../../ui/NavLink/NavLink";
import SearchBar from "../../ui/SearchBar/SearchBar";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header__inner">
        <Logo />
        <SearchBar />
        <nav className="header__nav" aria-label="Główna nawigacja">
          <NavLink label="Home" href="#home" active />
          <NavLink label="Produkty" href="#products" />
          <NavLink label="Koszyk" href="#footer" />
        </nav>
        <button className="header__cart" type="button" aria-label="Koszyk">
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
          <span className="header__cart-count">0</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
