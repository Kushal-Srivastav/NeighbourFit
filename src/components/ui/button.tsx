import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function Button({ className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
