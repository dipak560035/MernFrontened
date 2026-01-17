
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetProductQuery } from "@/services/api";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Tag, ArrowLeft, Package, ShoppingCart } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: response, isLoading, error } = useGetProductQuery(id);
//   const [quantity, setQuantity] = useState(1);

//   // BACKEND RETURNS: { status: "success", product: {...} }
//   const product = response?.product;

//   if (isLoading) return <div className="p-6">Loading product...</div>;

//   if (error || !product) {
//     return (
//       <div className="p-6">
//         <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
//         <Button onClick={() => navigate("/")}>Go Back Home</Button>
//       </div>
//     );
//   }

//   const handleAddToCart = () => {
//     // Add your cart logic later (e.g. redux, context, localStorage)
//     toast.success(`Added ${quantity} × ${product.name} to cart!`);
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <Button
//         variant="ghost"
//         onClick={() => navigate(-1)}
//         className="mb-6 text-base"
//       >
//         <ArrowLeft className="mr-2 h-5 w-5" />
//         Back
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* Left – Image */}
//         <div className="overflow-hidden rounded-xl bg-muted shadow-sm">
//           <img
//             src={
//               product.image
//                 ? `http://localhost:5000/${product.image}`
//                 : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"
//             }
//             alt={product.name}
//             className="w-full aspect-square object-cover transition-transform hover:scale-105 duration-500"
//           />
//         </div>

//         {/* Right – Info */}
//         <div className="space-y-6">
//           {/* Badges */}
//           <div className="flex flex-wrap items-center gap-3">
//             <Badge variant="secondary" className="text-sm px-3 py-1">
//               <Tag className="mr-1.5 h-3.5 w-3.5" />
//               {product.category}
//             </Badge>

//             {product.stock <= 5 && product.stock > 0 && (
//               <Badge variant="destructive" className="text-sm">
//                 Low Stock – Only {product.stock} left!
//               </Badge>
//             )}

//             {product.stock === 0 && (
//               <Badge variant="destructive" className="text-sm">
//                 Out of Stock
//               </Badge>
//             )}
//           </div>

//           <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>

//           {/* Price */}
//           <div className="flex items-baseline gap-4">
//             <span className="text-5xl font-bold text-primary">
//               Rs. {product.price.toLocaleString()}
//             </span>
//             <span className="text-xl text-muted-foreground line-through">
//               Rs. {(product.price * 1.2).toFixed(0)}
//             </span>
//             <Badge className="bg-green-600 hover:bg-green-600 text-base px-3 py-1">
//               20% OFF
//             </Badge>
//           </div>

//           <Separator className="my-6" />

//           {/* Quick specs */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             <div className="border rounded-lg p-4 bg-card">
//               <p className="text-sm text-muted-foreground">Availability</p>
//               <div className="flex items-center gap-2 mt-1 font-medium">
//                 <Package className="h-4 w-4 text-primary" />
//                 <span>
//                   {product.stock > 0
//                     ? `${product.stock} in stock`
//                     : "Out of stock"}
//                 </span>
//               </div>
//             </div>

//             <div className="border rounded-lg p-4 bg-card">
//               <p className="text-sm text-muted-foreground">Category</p>
//               <div className="mt-1">
//                 <Badge variant="outline">{product.category}</Badge>
//               </div>
//             </div>

//             {product.brand && (
//               <div className="border rounded-lg p-4 bg-card">
//                 <p className="text-sm text-muted-foreground">Brand</p>
//                 <div className="mt-1 font-medium">{product.brand}</div>
//               </div>
//             )}
//           </div>

//           <Separator className="my-6" />

//           {/* PRODUCT DESCRIPTION / DETAIL */}
//           <div className="space-y-3">
//             <h3 className="text-xl font-semibold">Product Details</h3>
//             <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed">
//               {product.description ? (
//                 <p className="whitespace-pre-line">{product.description}</p>
//               ) : (
//                 <p className="text-muted-foreground italic">
//                   No detailed description available for this product.
//                 </p>
//               )}
//             </div>
//           </div>

//           <Separator className="my-8" />

//           {/* Quantity + Actions */}
//           <div className="space-y-6 pt-2">
//             <div className="flex items-center gap-5">
//               <label className="text-base font-medium min-w-[90px]">
//                 Quantity:
//               </label>
//               <div className="flex items-center border rounded-md overflow-hidden">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="rounded-none h-11 w-11"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                   disabled={quantity <= 1 || product.stock === 0}
//                 >
//                   -
//                 </Button>
//                 <span className="px-6 py-2 min-w-[80px] text-center text-lg font-medium">
//                   {quantity}
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="rounded-none h-11 w-11"
//                   onClick={() =>
//                     setQuantity(Math.min(product.stock, quantity + 1))
//                   }
//                   disabled={quantity >= product.stock || product.stock === 0}
//                 >
//                   +
//                 </Button>
//               </div>
//               {product.stock > 0 && quantity >= product.stock && (
//                 <span className="text-sm text-amber-600">
//                   Max available quantity reached
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 size="lg"
//                 className="flex-1 text-base py-6"
//                 onClick={handleAddToCart}
//                 disabled={product.stock === 0}
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 Add to Cart
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 py-6 text-base"
//                 disabled={product.stock === 0}
//               >
//                 Buy Now
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }













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
  const { data: response, isLoading, error } = useGetProductQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // BACKEND RETURNS: { status: "success", product: {...} }
  const product = response?.product;

  if (isLoading) return <div className="p-6">Loading product...</div>;

  if (error || !product) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
        <Button onClick={() => navigate("/")}>Go Back Home</Button>
      </div>
    );
  }




// const handleAddToCart = () => {
//   // 1. Get existing cart from localStorage
//   const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

//   // 2. Check if this product already exists in cart
//   const existIndex = savedCart.findIndex((p) => p._id === product._id);

//   if (existIndex !== -1) {
//     // If exists, increase quantity
//     savedCart[existIndex].quantity += quantity;
//   } else {
//     // If not, add new product with quantity
//     savedCart.push({
//       _id: product._id,
//       name: product.name,
//       price: product.price,
//       category: product.category,
//       image: product.image,
//       quantity: quantity,
//     });
//   }

//   // 3. Save updated cart back to localStorage
//   localStorage.setItem("cart", JSON.stringify(savedCart));

//   // 4. Show toast
//   toast.success(`Added ${quantity} × ${product.name} to cart!`);
// };







// for (let i = 0; i < localStorage.length; i++) {
//   console.log(localStorage.key(i));
// }
// console.log(localStorage.getItem("cart"));
// console.log(localStorage.getItem("cartItems"));



const handleAddToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item._id === product._id);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
};






  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 text-base"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left – Image */}
        <div className="overflow-hidden rounded-xl bg-muted shadow-sm">
          <img
            src={
              product.image
                ? `http://localhost:5000/${product.image}`
                : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"
            }
            alt={product.name}
            className="w-full aspect-square object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>

        {/* Right – Info */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Tag className="mr-1.5 h-3.5 w-3.5" />
              {product.category}
            </Badge>

            {product.stock <= 5 && product.stock > 0 && (
              <Badge variant="destructive" className="text-sm">
                Low Stock – Only {product.stock} left!
              </Badge>
            )}

            {product.stock === 0 && (
              <Badge variant="destructive" className="text-sm">
                Out of Stock
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-4">
            <span className="text-5xl font-bold text-primary">
              Rs. {product.price.toLocaleString()}
            </span>
            <span className="text-xl text-muted-foreground line-through">
              Rs. {(product.price * 1.2).toFixed(0)}
            </span>
            <Badge className="bg-green-600 hover:bg-green-600 text-base px-3 py-1">
              20% OFF
            </Badge>
          </div>

          <Separator className="my-6" />

          {/* Quick specs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-card">
              <p className="text-sm text-muted-foreground">Availability</p>
              <div className="flex items-center gap-2 mt-1 font-medium">
                <Package className="h-4 w-4 text-primary" />
                <span>
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-card">
              <p className="text-sm text-muted-foreground">Category</p>
              <div className="mt-1">
                <Badge variant="outline">{product.category}</Badge>
              </div>
            </div>

            {product.brand && (
              <div className="border rounded-lg p-4 bg-card">
                <p className="text-sm text-muted-foreground">Brand</p>
                <div className="mt-1 font-medium">{product.brand}</div>
              </div>
            )}
          </div>

          <Separator className="my-6" />

          {/* PRODUCT DESCRIPTION / DETAIL */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold">Product Details</h3>
            <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed">
              {product.description ? (
                <p className="whitespace-pre-line">{product.description}</p>
              ) : (
                <p className="text-muted-foreground italic">
                  No detailed description available for this product.
                </p>
              )}
            </div>
          </div>

          <Separator className="my-8" />

          {/* Quantity + Actions */}
          <div className="space-y-6 pt-2">
            <div className="flex items-center gap-5">
              <label className="text-base font-medium min-w-[90px]">
                Quantity:
              </label>
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-11 w-11"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || product.stock === 0}
                >
                  -
                </Button>
                <span className="px-6 py-2 min-w-[80px] text-center text-lg font-medium">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-none h-11 w-11"
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock || product.stock === 0}
                >
                  +
                </Button>
              </div>
              {product.stock > 0 && quantity >= product.stock && (
                <span className="text-sm text-amber-600">
                  Max available quantity reached
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 text-base py-6"
                onClick={handleAddToCart}
                disabled={product.stock === 0 || adding}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {adding ? "Adding..." : "Add to Cart"}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex-1 py-6 text-base"
                onClick={handleAddToCart} // For now, Buy Now will also add + redirect
                disabled={product.stock === 0 || adding}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





