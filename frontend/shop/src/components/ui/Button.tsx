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
      ? "border-slate-500/40 bg-transparent text-main"
      : "btn-accent bg-slate-950";

  return (
    <button
      type={type}
      className={`inline-flex min-h-16 items-center justify-center gap-3 border-2 px-6 py-4 text-lg font-bold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white max-sm:min-h-14 max-sm:px-4 max-sm:text-base ${buttonStyle} ${className}`.trim()}
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
