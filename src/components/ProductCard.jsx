import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NavLink } from 'react-router-dom';
import { ShoppingCart, Eye, Package } from 'lucide-react';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative overflow-hidden border-2 transition-all duration-300 hover:border-primary hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img 
          src={product.image || `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop`} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        {product.stock <= 5 && product.stock > 0 && (
          <Badge className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-600">
            Low Stock
          </Badge>
        )}
        {product.stock === 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            Out of Stock
          </Badge>
        )}
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <NavLink to={`/product/${product._id}`}>
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90">
              <Eye className="mr-2 h-4 w-4" />
              Quick View
            </Button>
          </NavLink>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <Badge variant="secondary" className="shrink-0">
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
          {product.description || 'No description available'}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">
              ${product.price}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Package className="h-3 w-3" />
              {product.stock} in stock
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button 
          asChild 
          className="flex-1"
          disabled={product.stock === 0}
        >
          <NavLink to={`/product/${product._id}`}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </NavLink>
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          disabled={product.stock === 0}
          className="shrink-0"
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}