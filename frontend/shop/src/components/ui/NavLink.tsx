import { Link, useLocation } from "react-router-dom";

type NavLinkProps = {
  label: string;
  to: string;
};

const NavLink = ({ label, to }: NavLinkProps) => {
  const location = useLocation();
  const [path, hash = ""] = to.split("#");
  const isActive =
    location.pathname === path &&
    (hash ? location.hash === `#${hash}` : location.hash === "");

  return (
    <Link
      className={`inline-flex items-center gap-2 text-[17px] transition-colors hover:text-[var(--color-accent)] max-[480px]:gap-1.5 max-[480px]:text-sm ${
        isActive ? "text-accent" : "text-muted"
      }`}
      to={to}
    >
      <span>&gt;</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
