import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden" id="home">
      <div className="hero-background border-b-2 border-accent relative grid min-h-screen place-items-center px-5 py-16 max-sm:py-12">
        <span
          className="text-accent absolute left-8 top-1/2 -translate-y-1/2 text-8xl leading-none opacity-35 max-lg:hidden"
          aria-hidden="true"
        >
          &lsaquo;
        </span>

        <div className="z-10 grid max-w-full justify-items-center gap-6 text-center max-sm:gap-4">
          <p className="text-accent max-w-full text-xl opacity-70 max-sm:text-base">
            // Starting application...
          </p>
          <h1 className="text-main max-w-full text-8xl leading-none tracking-wider drop-shadow-lg max-md:text-7xl max-sm:text-5xl max-sm:tracking-normal">
            PoliWear
          </h1>
          <p className="text-main max-w-full text-4xl max-md:text-3xl max-sm:text-2xl">
            Ubrania dla programistów
          </p>
          <p className="text-accent text-xl font-bold max-sm:text-base">
            &gt; Wear your code_
          </p>
          <Button onClick={() => navigate("/#products")}>Przejdź do produktów</Button>
          <p className="text-purple mt-8 text-xl max-sm:mt-4 max-sm:text-base">
            // Ready to compile style.css
          </p>
        </div>

        <span
          className="text-accent absolute right-8 top-1/2 -translate-y-1/2 text-8xl leading-none opacity-35 max-lg:hidden"
          aria-hidden="true"
          aria-label="Następny slajd"
        >
          &rsaquo;
        </span>

        <div
          className="absolute bottom-11 right-12 grid h-24 w-24 place-items-center rounded-2xl border-4 border-purple-800/50 max-lg:hidden"
          aria-hidden="true"
        >
          <span className="absolute -top-3 h-4 w-2 bg-purple-800/50" />
          <span className="absolute -right-3 h-2 w-4 bg-purple-800/50" />
          <span className="absolute -bottom-3 h-4 w-2 bg-purple-800/50" />
          <span className="absolute -left-3 h-2 w-4 bg-purple-800/50" />
          <div className="h-8 w-8 rounded-lg border-4 border-purple-800/50" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
