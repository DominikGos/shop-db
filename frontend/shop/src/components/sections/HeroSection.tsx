import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden" id="home">
      <div className="hero-background relative grid min-h-[min(82vh,896px)] place-items-center border-y-2 border-accent px-5 py-16 max-[900px]:min-h-[70vh] max-[600px]:min-h-[544px] max-[600px]:py-12">
        <span
          className="text-accent absolute left-8 top-1/2 -translate-y-1/2 text-8xl leading-none opacity-35 max-[900px]:hidden"
          aria-hidden="true"
        >
          &lsaquo;
        </span>

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

        <span
          className="text-accent absolute right-8 top-1/2 -translate-y-1/2 text-8xl leading-none opacity-35 max-[900px]:hidden"
          aria-hidden="true"
          aria-label="Następny slajd"
        >
          &rsaquo;
        </span>

        <div
          className="absolute bottom-11 right-12 grid h-[88px] w-[88px] place-items-center rounded-[18px] border-[6px] border-[#6d2bbd]/45 max-[900px]:hidden"
          aria-hidden="true"
        >
          <span className="absolute -top-3.5 h-4 w-2 bg-[#6d2bbd]/45" />
          <span className="absolute -right-3.5 h-2 w-4 bg-[#6d2bbd]/45" />
          <span className="absolute -bottom-3.5 h-4 w-2 bg-[#6d2bbd]/45" />
          <span className="absolute -left-3.5 h-2 w-4 bg-[#6d2bbd]/45" />
          <div className="h-8 w-8 rounded-lg border-[6px] border-[#6d2bbd]/45" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
