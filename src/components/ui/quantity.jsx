import Button from "./button";

export default function Quantity({ value = 1, onChange }) {
  const inc = () => onChange?.(value + 1);
  const dec = () => onChange?.(Math.max(1, value - 1));
  return (
    <div className="inline-flex items-center rounded-md border border-neutral-300">
      <Button variant="ghost" className="px-3" onClick={dec}>-</Button>
      <span className="px-3 text-sm">{value}</span>
      <Button variant="ghost" className="px-3" onClick={inc}>+</Button>
    </div>
  );
}
