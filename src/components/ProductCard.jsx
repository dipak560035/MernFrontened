
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils"; // tailwind-merge

// Detect environment
const isProd = import.meta.env.MODE === "production";
const API_URL = isProd
  ? "https://nepalstore.onrender.com" // your Render backend
  : "http://localhost:5000";          // local backend

export default function ProductCard({ product }) {
  const imageUrl = product.image
    ? `${API_URL}/${product.image}` // always use correct full URL
    : null;

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden rounded-xl border bg-white shadow-sm",
        "transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
        "focus-within:ring-2 focus-within:ring-primary/50"
      )}
    >
      {/* Image */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name || product.title || "Product image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x300?text=Image+Not+Found";
              console.log("Image failed to load:", imageUrl);
            }}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm font-medium">
            No image available
          </div>
        )}
      </div>

      <CardContent className="p-5 flex flex-col gap-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
          {product.name || product.title || "Product Name"}
        </h3>

        {/* Category */}
        {product.category && (
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        )}

        {/* Price & Button */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            Rs. {Number(product.price).toLocaleString()}
          </span>

          <Button
            asChild
            size="sm"
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Link to={`/product/${product._id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
