"use client";

import { type ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-premium-accent hover:bg-premium-accent-light text-white border border-premium-accent/50 shadow-lg shadow-premium-accent/20",
  secondary:
    "bg-premium-card border border-premium-border text-premium-accent-light hover:bg-white/5",
  ghost: "text-premium-accent-light hover:bg-white/5 border border-transparent",
  danger: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5
          text-sm font-medium transition-all duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
