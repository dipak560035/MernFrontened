import { cn } from "../../lib/cn";

export default function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-400",
        className
      )}
      {...props}
    />
  );
}
