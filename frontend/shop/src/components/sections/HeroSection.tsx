import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden" id="home">
      <div className="relative grid min-h-[min(82vh,896px)] place-items-center border-y-2 border-accent bg-[radial-gradient(circle_at_50%_42%,rgba(42,67,118,0.42),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(120deg,#010101_0%,#070d18_45%,#0d1630_100%)] bg-[size:auto,42px_42px,42px_42px,auto] px-5 py-16 max-[900px]:min-h-[70vh] max-[600px]:min-h-[544px] max-[600px]:py-12">
        <button
          className="absolute left-8 top-1/2 -translate-y-1/2 border-0 bg-transparent text-[clamp(80px,8vw,112px)] leading-none text-[rgba(0,255,42,0.35)] max-[900px]:hidden"
          type="button"
          aria-label="Poprzedni slajd"
        >
          &lsaquo;
        </button>

        <div className="z-[1] grid max-w-full justify-items-center gap-6 text-center max-[600px]:gap-4">
          <p className="max-w-full text-[clamp(16px,2vw,22px)] text-[rgba(0,255,42,0.65)] max-[480px]:text-base">
            // Starting application...
          </p>
          <h1 className="text-main max-w-full text-[clamp(56px,16vw,112px)] leading-[0.95] tracking-[0.05em] drop-shadow-[0_8px_38px_rgba(255,255,255,0.12)] max-[480px]:tracking-normal">
            PoliWear
          </h1>
          <p className="text-main max-w-full text-[clamp(22px,6vw,38px)]">
            Ubrania dla programistów
          </p>
          <p className="text-accent text-[clamp(16px,2vw,22px)] font-bold max-[480px]:text-base">
            &gt; Wear your code_
          </p>
          <Button onClick={() => navigate("/#products")}>Zobacz produkty</Button>
          <p className="text-purple mt-8 text-[clamp(16px,2vw,22px)] max-[600px]:mt-4 max-[480px]:text-base">
            // Ready to compile style.css
          </p>
        </div>

        <button
          className="absolute right-8 top-1/2 -translate-y-1/2 border-0 bg-transparent text-[clamp(80px,8vw,112px)] leading-none text-[rgba(0,255,42,0.35)] max-[900px]:hidden"
          type="button"
          aria-label="Następny slajd"
        >
          &rsaquo;
        </button>

        <div
          className="decor-purple-border absolute bottom-11 right-12 grid h-[88px] w-[88px] place-items-center rounded-[18px] border-[6px] max-[900px]:hidden"
          aria-hidden="true"
        >
          <span className="decor-purple-bg absolute -top-3.5 h-4 w-2" />
          <span className="decor-purple-bg absolute -right-3.5 h-2 w-4" />
          <span className="decor-purple-bg absolute -bottom-3.5 h-4 w-2" />
          <span className="decor-purple-bg absolute -left-3.5 h-2 w-4" />
          <div className="decor-purple-border h-8 w-8 rounded-lg border-[6px]" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
