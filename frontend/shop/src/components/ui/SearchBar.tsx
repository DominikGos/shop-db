const SearchBar = () => {
  return (
    <label
      className="flex min-h-14 w-[520px] max-w-full items-center gap-4 border-2 border-[#576c92] bg-[#07101e] px-4 max-[900px]:w-full max-[480px]:min-h-11 max-[480px]:gap-3 max-[480px]:px-3"
      aria-label="Szukaj produktow"
    >
      <span
        className="h-6 w-6 shrink-0 text-[#00ff2a] max-[480px]:h-5 max-[480px]:w-5"
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
        className="w-full min-w-0 border-0 bg-transparent text-white outline-none placeholder:text-[#7f8aa3] max-[480px]:text-sm max-[480px]:placeholder:text-xs"
        type="search"
        placeholder="Szukaj w kodzie... np. koszulka, bluza"
      />
    </label>
  );
};

export default SearchBar;
