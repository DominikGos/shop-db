type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

const SectionHeading = ({ eyebrow, title }: SectionHeadingProps) => {
  return (
    <div className="grid justify-items-center gap-4 text-center">
      <p className="text-purple text-base max-sm:text-sm">{eyebrow}</p>
      <h2 className="text-6xl leading-none tracking-wide max-sm:text-4xl max-sm:tracking-normal">
        {title}
      </h2>
      <span
        className="h-1.5 w-28 bg-green-400 shadow-md"
        aria-hidden="true"
      />
    </div>
  );
};

export default SectionHeading;
