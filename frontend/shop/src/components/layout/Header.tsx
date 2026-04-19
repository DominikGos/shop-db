import Logo from "../ui/Logo";
import NavLink from "../ui/NavLink";
import SearchBar from "../ui/SearchBar";

type HeaderProps = {
  onAddClick: () => void;
};

const Header = ({ onAddClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-[#00ff2a] bg-black/90 backdrop-blur">
      <div className="mx-auto flex min-h-24 max-w-[1600px] items-center gap-8 px-12 max-[900px]:min-h-0 max-[900px]:w-full max-[900px]:flex-col max-[900px]:items-stretch max-[900px]:gap-3 max-[900px]:px-4 max-[900px]:py-4 max-[420px]:px-3">
        <div className="ml-8 flex min-w-0 flex-1 justify-start max-[900px]:ml-0 max-[900px]:justify-center">
          <Logo />
        </div>

        <div className="flex min-w-0 flex-1 justify-center max-[900px]:w-full">
          <SearchBar />
        </div>

        <div className="flex min-w-0 flex-1 justify-end max-[900px]:w-full max-[900px]:justify-center">
          <div className="flex min-w-0 items-center gap-6 max-[900px]:w-full max-[900px]:flex-col max-[900px]:gap-3">
            <nav
              className="flex min-w-0 items-center gap-6 max-[900px]:w-full max-[900px]:justify-center max-[900px]:gap-4 max-[480px]:gap-3 max-[480px]:text-sm"
              aria-label="Glowna nawigacja"
            >
              <NavLink label="Home" href="#home" active />
              <NavLink label="Produkty" href="#products" />
              <NavLink label="Koszyk" href="#footer" />
            </nav>

            <div className="flex items-center justify-center gap-5 max-[480px]:gap-3">
              <button
                className="flex min-h-14 items-center gap-3 border-2 border-[#00ff2a] bg-black px-6 font-bold text-[#00ff2a] max-[480px]:min-h-11 max-[480px]:px-4 max-[480px]:text-sm"
                type="button"
                onClick={onAddClick}
              >
                <span className="text-2xl leading-none max-[480px]:text-xl">+</span>
                Add
              </button>

              <button
                className="relative flex h-14 w-14 items-center justify-center text-[#00ff2a] max-[480px]:h-11 max-[480px]:w-11"
                type="button"
                aria-label="Koszyk"
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
                <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#00ff2a] text-xs font-bold text-black max-[480px]:h-4 max-[480px]:w-4 max-[480px]:text-[10px]">
                  0
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
