import "./NavLink.css";

type NavLinkProps = {
  label: string;
  href: string;
  active?: boolean;
};

const NavLink = ({ label, href, active = false }: NavLinkProps) => {
  return (
    <a
      className={`nav-link ${active ? "nav-link--active" : ""}`.trim()}
      href={href}
    >
      <span className="nav-link__marker">&gt;</span>
      <span>{label}</span>
    </a>
  );
};

export default NavLink;
