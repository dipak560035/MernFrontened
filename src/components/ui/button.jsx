import { cn } from "../../lib/cn";

export default function Button({ className, variant = "default", children, ...props }) {
  const variants = {
    default: "bg-black text-white hover:bg-neutral-800",
    outline: "border border-neutral-300 hover:bg-neutral-100",
    ghost: "hover:bg-neutral-100",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 disabled:opacity-50",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
