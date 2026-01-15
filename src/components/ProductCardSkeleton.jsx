export default function ProductCardSkeleton() {
  return (
    <div className="animate-pulse border rounded p-4">
      <div className="h-48 bg-muted rounded" />
      <div className="mt-3 h-4 bg-muted rounded w-3/4" />
      <div className="mt-2 h-3 bg-muted rounded w-1/2" />
      <div className="mt-2 h-4 bg-muted rounded w-1/3" />
    </div>
  );
}