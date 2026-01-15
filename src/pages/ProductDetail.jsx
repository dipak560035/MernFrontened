import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tag, ArrowLeft, Package, ShoppingCart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading, error } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) return <div className="p-6">Loading product...</div>;
  if (error || !product) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
        <Button onClick={() => navigate("/")}>Go Back Home</Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Integrate with your cart slice or backend when ready
    toast.success("Product added to cart!");
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="overflow-hidden rounded bg-muted">
          <img
            src={
              product.image ||
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"
            }
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="text-sm">
              <Tag className="mr-1 h-3 w-3" />
              {product.category}
            </Badge>
            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="destructive">Low Stock</Badge>
            )}
            {product.stock === 0 && <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">Rs.{product.price}</span>
            <span className="text-sm text-muted-foreground line-through">
              Rs.{(product.price * 1.2).toFixed(2)}
            </span>
            <Badge className="bg-green-500">20% OFF</Badge>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded p-4">
              <p className="text-sm text-muted-foreground">Availability</p>
              <div className="flex items-center gap-2 mt-2">
                <Package className="h-4 w-4 text-primary" />
                <span className="font-semibold">
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
            </div>
            <div className="border rounded p-4">
              <p className="text-sm text-muted-foreground">Category</p>
              <Badge variant="outline" className="mt-2">{product.category}</Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" className="flex-1" disabled={product.stock === 0}>
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
