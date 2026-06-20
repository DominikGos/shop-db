type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

const SectionHeading = ({ eyebrow, title }: SectionHeadingProps) => {
  return (
    <div className="grid justify-items-center gap-4 text-center">
      <p className="text-purple text-base max-[480px]:text-sm">{eyebrow}</p>
      <h2 className="text-[clamp(40px,6vw,70px)] leading-none tracking-[0.04em] max-[480px]:text-[42px] max-[480px]:tracking-normal">
        {title}
      </h2>
      <span
        className="h-1.5 w-28 bg-[var(--color-accent)] shadow-[0_0_16px_rgba(0,255,42,0.25)]"
        aria-hidden="true"
      />
    </div>
  );
};

export default SectionHeading;
