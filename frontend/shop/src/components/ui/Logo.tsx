import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      className="text-accent inline-flex items-center gap-2 text-3xl font-bold tracking-wide drop-shadow-md max-sm:text-2xl"
      to="/"
      aria-label="PoliWear"
    >
      <span className="opacity-90">&gt;_</span>
      <span>PoliWear</span>
    </Link>
  );
};

export default Logo;
