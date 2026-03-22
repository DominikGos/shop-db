import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <p className="footer__brand">
          <span>&gt;_</span> © 2026 PoliWear
        </p>
        <p className="footer__note">// Made with &lt;3 and code</p>
        <nav className="footer__nav" aria-label="Stopka">
          <a href="#footer">Kontakt</a>
          <a href="#footer">Regulamin</a>
          <a href="#footer">Pomoc</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
