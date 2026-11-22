import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "onDark";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-[0.12em] transition-colors duration-200";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-accent",
  secondary:
    "border border-ink text-ink hover:bg-ink hover:text-white",
  ghost: "text-ink hover:text-accent",
  onDark:
    "bg-white text-ink hover:bg-canvas",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[11px]",
  md: "h-11 px-6 text-[11px]",
  lg: "h-12 px-7 text-xs",
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
    <button
      {...props}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
