type NavLinkProps = {
  label: string;
  href: string;
  active?: boolean;
};

const NavLink = ({ label, href, active = false }: NavLinkProps) => {
  return (
    <a
      className={`inline-flex items-center gap-2 text-[17px] transition-colors hover:text-[#00ff2a] max-[480px]:gap-1.5 max-[480px]:text-sm ${
        active ? "text-[#00ff2a]" : "text-[#7f8aa3]"
      }`}
      href={href}
    >
      <span>&gt;</span>
      <span>{label}</span>
    </a>
  );
};

export default NavLink;
