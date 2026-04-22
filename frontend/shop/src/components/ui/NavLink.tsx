import { Link } from "react-router-dom";

type NavLinkProps = {
  label: string;
  to: string;
  active?: boolean;
};

const NavLink = ({ label, to, active = false }: NavLinkProps) => {
  return (
    <Link
      className={`inline-flex items-center gap-2 text-[17px] transition-colors hover:text-[#00ff2a] max-[480px]:gap-1.5 max-[480px]:text-sm ${
        active ? "text-[#00ff2a]" : "text-[#7f8aa3]"
      }`}
      to={to}
    >
      <span>&gt;</span>
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
