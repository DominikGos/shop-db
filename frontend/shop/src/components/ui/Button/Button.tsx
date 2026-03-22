import "./Button.css";
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
  return (
    <button
      type={type}
      className={`ui-button ui-button--${variant} ${className}`.trim()}
      {...props}
    >
      {icon ? <span className="ui-button__icon">{icon}</span> : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
