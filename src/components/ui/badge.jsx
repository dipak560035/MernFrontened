import { cn } from "../../lib/cn";

export default function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700",
        className
      )} //
    >
      {children}
    </span>
  );
}
