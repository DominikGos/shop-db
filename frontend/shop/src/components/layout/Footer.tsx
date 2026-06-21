import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const [showAuthors, setShowAuthors] = useState(false);
  const authorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  if (!showAuthors) {
    return;
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      authorsRef.current &&
      !authorsRef.current.contains(event.target as Node)
    ) {
      setShowAuthors(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAuthors]);

  return (
    <footer className="border-t-2 border-accent bg-black/90" id="footer">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-3 items-center gap-4 px-4 pb-11 pt-9 max-lg:grid-cols-1 max-lg:justify-items-center max-lg:text-center">
        <p className="text-muted text-base">
          <span className="text-accent">&gt;_</span> 2026 PoliWear
        </p>
        <p className="text-purple justify-self-center">
          // Made with &lt;3 and code
        </p>
        <nav
          className="flex justify-end gap-8 max-lg:flex-wrap max-lg:justify-center max-lg:gap-x-6 max-lg:gap-y-4"
          aria-label="Stopka"
        >
          <a className="footer-link" href="#footer">
            Kontakt
          </a>
          <div className="relative" ref={authorsRef}>
            <button
              className="footer-link bg-transparent"
              type="button"
              onClick={() => setShowAuthors((isVisible) => !isVisible)}
            >
              O nas
            </button>
            {showAuthors ? (
              <div className="absolute bottom-full left-1/2 mb-3 grid w-52 -translate-x-1/2 gap-1 border border-accent bg-slate-950 p-4 text-left text-sm text-main shadow-xl">
                <p>Autorzy strony:</p>
                <p>Martyna Klimczak</p>
                <p>Dominik Gos</p>
                <p>Bartłomiej Sztandera</p>
              </div>
            ) : null}
          </div>
          <a className="footer-link" href="#footer">
            Regulamin
          </a>
          <a className="footer-link" href="#footer">
            Pomoc
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
