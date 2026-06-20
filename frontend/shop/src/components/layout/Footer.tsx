const Footer = () => {
  return (
    <footer className="border-t-2 border-accent bg-black/90" id="footer">
      <div className="mx-auto grid max-w-[1440px] grid-cols-3 items-center gap-4 px-4 pb-11 pt-9 max-[900px]:grid-cols-1 max-[900px]:justify-items-center max-[900px]:text-center">
        <p className="text-muted text-[17px]">
          <span className="text-accent">&gt;_</span> 2026 PoliWear
        </p>
        <p className="text-purple justify-self-center">
          // Made with &lt;3 and code
        </p>
        <nav
          className="flex justify-end gap-8 max-[900px]:flex-wrap max-[900px]:justify-center max-[900px]:gap-x-6 max-[900px]:gap-y-4"
          aria-label="Stopka"
        >
          <a className="footer-link" href="#footer">
            Kontakt
          </a>
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
