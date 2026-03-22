import "./SectionHeading.css";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
};

const SectionHeading = ({ eyebrow, title }: SectionHeadingProps) => {
  return (
    <div className="section-heading">
      <p className="section-heading__eyebrow">{eyebrow}</p>
      <h2 className="section-heading__title">{title}</h2>
      <span className="section-heading__line" aria-hidden="true" />
    </div>
  );
};

export default SectionHeading;
