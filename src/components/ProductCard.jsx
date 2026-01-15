

import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Card>
      <CardContent className="p-4">
        <img
          src={
            product.image ||
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop"
          }
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <div className="mt-3">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="font-bold">Rs.{product.price}</span>
            {/* <Link
              to={`/products/${product._id}`}  
              className="text-primary hover:underline"
            >
              View
            </Link> */}<Link to={`/products/${product._id}`}>View</Link>

          </div>
        </div>
      </CardContent>
    </Card>
  );
}


