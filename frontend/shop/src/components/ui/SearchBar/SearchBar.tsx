import "./SearchBar.css";

const SearchBar = () => {
  return (
    <label className="search-bar" aria-label="Szukaj produktów">
      <span className="search-bar__icon" aria-hidden="true">
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
        type="search"
        placeholder="Szukaj w kodzie... np. koszulka, bluza"
      />
    </label>
  );
};

export default SearchBar;
