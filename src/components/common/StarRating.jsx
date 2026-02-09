import { Star } from "lucide-react";

export default function StarRating({ value = 0, count = 5, size = 18 }) {
  const v = Math.max(0, Math.min(count, Number(value) || 0));
  return (
    <div className="flex items-center">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(v) ? "text-[#FFC700] fill-current" : "text-neutral-300"}
        />
      ))}
    </div>
  );
}
