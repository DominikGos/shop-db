import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  icon,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  const buttonStyle =
    variant === "ghost"
      ? "border-muted-light bg-transparent text-main"
      : "btn-accent bg-[#0a111f]/90";

  return (
    <button
      type={type}
      className={`focus-main inline-flex min-h-[60px] items-center justify-center gap-3 border-2 px-6 py-4 text-[17px] font-bold hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 max-[480px]:min-h-14 max-[480px]:px-4 max-[480px]:text-base ${buttonStyle} ${className}`.trim()}
      {...props}
    >
      {icon ? (
        <span className="inline-flex h-5 w-5 items-center justify-center [&_svg]:h-full [&_svg]:w-full">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
