import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-strong",
  secondary:
    "border border-line bg-white text-navy hover:border-navy/40 hover:text-accent",
  ghost: "text-navy hover:text-accent",
  onDark:
    "border border-white/25 bg-white/5 text-white hover:border-white/50 hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
  lg: "h-12 px-6 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ActionLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;

type ActionButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function ActionLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href = "#",
  ...props
}: ActionLinkProps) {
  const isExternal = /^https?:\/\//.test(href);
  return (
    <a
      {...props}
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export function ActionButton({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button {...props} className={cn(base, variants[variant], sizes[size], className)}>
      {children}
    </button>
  );
}
