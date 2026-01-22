import { Link } from "react-router-dom";

export default function ProductCard({ p }) {
  return (
    <div className="group">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="mt-2">
        <h4 className="text-sm font-medium">{p.title}</h4>
        <p className="text-sm text-neutral-600">Rs. {p.price?.toLocaleString()}</p>
      </div>
      <Link
        to={`/product/${p.id}`}
        className="mt-2 inline-block text-sm font-medium text-neutral-700 underline"
      >
        View More
      </Link>
    </div>
  );
}
