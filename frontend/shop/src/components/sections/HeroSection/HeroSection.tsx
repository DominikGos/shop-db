import Button from "../../ui/Button/Button";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero" id="home">
      <div className="hero__shell">
        <button className="hero__arrow hero__arrow--left" type="button" aria-label="Poprzedni slajd">
          ‹
        </button>
        <div className="hero__content">
          <p className="hero__line hero__line--top">// Starting application...</p>
          <h1 className="hero__title">PoliWear</h1>
          <p className="hero__subtitle">Ubrania dla programistów</p>
          <p className="hero__line hero__line--accent">&gt; Wear your code_</p>
          <Button>Zobacz produkty</Button>
          <p className="hero__line hero__line--bottom">// Ready to compile style.css</p>
        </div>
        <button className="hero__arrow hero__arrow--right" type="button" aria-label="Następny slajd">
          ›
        </button>
        <div className="hero__chip" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <div className="hero__chip-core" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
