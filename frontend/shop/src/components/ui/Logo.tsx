const Logo = () => {
  return (
    <a
      className="inline-flex items-center gap-2 text-[clamp(22px,2vw,32px)] font-bold tracking-[0.04em] text-[#00ff2a] drop-shadow-[0_0_12px_rgba(0,255,42,0.22)] max-[480px]:text-2xl max-[360px]:text-xl"
      href="#home"
      aria-label="PoliWear"
    >
      <span className="opacity-90">&gt;_</span>
      <span>PoliWear</span>
    </a>
  );
};

export default Logo;
