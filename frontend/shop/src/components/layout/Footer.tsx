const Footer = () => {
  return (
    <footer className="border-t-2 border-[#00ff2a] bg-black/90" id="footer">
      <div className="mx-auto grid w-[calc(100%_-_32px)] max-w-[1440px] grid-cols-3 items-center gap-4 py-9 pb-11 max-[900px]:grid-cols-1 max-[900px]:justify-items-center max-[900px]:text-center">
        <p className="text-[17px] text-[#7f8aa3]">
          <span className="text-[#00ff2a]">&gt;_</span> 2026 PoliWear
        </p>
        <p className="justify-self-center text-[#6d2bbd]">
          // Made with &lt;3 and code
        </p>
        <nav
          className="flex justify-end gap-8 text-[#7f8aa3] max-[900px]:flex-wrap max-[900px]:justify-center max-[900px]:gap-x-6 max-[900px]:gap-y-4"
          aria-label="Stopka"
        >
          <a className="hover:text-[#f3f5f7]" href="#footer">
            Kontakt
          </a>
          <a className="hover:text-[#f3f5f7]" href="#footer">
            Regulamin
          </a>
          <a className="hover:text-[#f3f5f7]" href="#footer">
            Pomoc
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
