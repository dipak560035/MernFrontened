

// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, ArrowLeft, ShoppingCart, Tag } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useGetProductQuery } from "@/app/mainApi";
// import { useSelector } from "react-redux";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { data: product, isLoading, error } = useGetProductQuery(id, {
//     skip: !id,
//   });

//   // ───────── AUTH LOGIC ─────────
//   const reduxUser = useSelector((state) => state.auth.user);
//   const token = localStorage.getItem("token");

//   let currentUser = reduxUser;
//   let isLoggedIn = !!reduxUser || !!token;
//   let isAdmin = false;

//   if (!currentUser && token) {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       currentUser = payload;
//       isLoggedIn = true;
//       isAdmin = payload?.role === "admin";
//     } catch (err) {
//       localStorage.removeItem("token");
//       isLoggedIn = false;
//     }
//   } else if (currentUser) {
//     isAdmin = currentUser?.role === "admin";
//   }

//   const [quantity, setQuantity] = useState(1);
//   const [adding, setAdding] = useState(false);

//   // ───────── LOADING / ERROR STATES ─────────
//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         <div className="animate-pulse space-y-8">Loading product...</div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
//         <h2 className="text-4xl font-bold mb-6 text-gray-800">
//           {error ? "Error loading product" : "Product not found"}
//         </h2>
//         <Button size="lg" onClick={() => navigate("/")}>
//           Back to Shop
//         </Button>
//       </div>
//     );
//   }

//   // ───────── CART LOGIC ─────────
//   const addToCart = () => {
//     setAdding(true);
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const idx = cart.findIndex((item) => item._id === product._id);

//     if (idx !== -1) {
//       cart[idx].quantity = Math.min(cart[idx].quantity + quantity, product.stock);
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`Added ${quantity} × ${product.name} to cart!`);
//     setQuantity(1);
//     setAdding(false);
//   };

//   // ───────── BUTTON HANDLERS ─────────
//   const handleAddToCart = () => {
//     if (!isLoggedIn) {
//       navigate("/login", { state: { from: location.pathname } });
//       return;
//     }
//     if (isAdmin) {
//       toast.error("Admins cannot add to cart");
//       return;
//     }
//     addToCart();
//   };

//   const handleBuyNow = () => {
//     if (!isLoggedIn) {
//       navigate("/login", { state: { from: location.pathname } });
//       return;
//     }
//     if (isAdmin) {
//       toast.error("Admins cannot buy");
//       return;
//     }
//     addToCart();
//     navigate("/cart");
//   };

//   // ───────── UI HELPERS ─────────
//   const canInteract = product.stock > 0 && !isAdmin && isLoggedIn && !adding;
//   const discountedPrice = (product.price * 0.8).toFixed(2); // 20% OFF

//   return (
//     <div className="container mx-auto px-4 py-10 max-w-7xl">
//       <Button
//         variant="ghost"
//         className="mb-8 -ml-2"
//         onClick={() => navigate(-1)}
//       >
//         <ArrowLeft className="mr-2 h-5 w-5" /> Back
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         {/* PRODUCT IMAGE */}
//         <div className="rounded-xl overflow-hidden bg-gray-100 border shadow-lg">
//           <img
//             src={product.image ? `http://localhost:5000/${product.image}` : "https://via.placeholder.com/600"}
//             alt={product.name}
//             className="w-full aspect-square object-cover"
//           />
//         </div>

//         {/* PRODUCT INFO */}
//         <div className="flex flex-col gap-6">
//           {/* CATEGORY + DISCOUNT + STOCK BADGES */}
//           <div className="flex flex-wrap gap-3">
//             {product.category && (
//               <Badge variant="secondary" className="flex gap-1 items-center px-3">
//                 <Tag className="h-3.5 w-3.5" /> {product.category}
//               </Badge>
//             )}
//             <Badge className="bg-green-600 text-white px-3 py-1">20% OFF</Badge>
//             {product.stock === 0 ? (
//               <Badge variant="destructive">Out of Stock</Badge>
//             ) : product.stock <= 5 ? (
//               <Badge variant="outline" className="border-amber-500 text-amber-700">
//                 Only {product.stock} left!
//               </Badge>
//             ) : null}
//           </div>

//           {/* TITLE */}
//           <h1 className="text-3xl font-bold">{product.name}</h1>

//           {/* PRICE */}
//           <div className="flex items-baseline gap-3">
//             <span className="text-4xl font-bold text-primary">Rs. {discountedPrice}</span>
//             <span className="text-xl line-through text-muted-foreground">Rs. {product.price}</span>
//           </div>

//           <Separator />

//           {/* BRAND + CATEGORY + STOCK */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
//             <div className="space-y-1">
//               <p className="font-medium text-gray-700">Brand</p>
//               <p className="text-muted-foreground">{product.brand || "-"}</p>
//             </div>
//             <div className="space-y-1">
//               <p className="font-medium text-gray-700">Category</p>
//               <p className="text-muted-foreground">{product.category || "-"}</p>
//             </div>
//             <div className="space-y-1">
//               <p className="font-medium text-gray-700">Stock</p>
//               <p className="text-muted-foreground">{product.stock}</p>
//             </div>
//           </div>

//           <Separator />

//           {/* DESCRIPTION */}
//           <div>
//             <p className="font-medium text-lg mb-1">Description</p>
//             <p className="text-muted-foreground whitespace-pre-line">
//               {product.description || "No description available."}
//             </p>
//           </div>

//           <Separator />

//           {/* QUANTITY + BUTTONS */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-6">
//               <span className="font-medium text-lg">Quantity</span>
//               <div className="flex items-center border rounded-lg overflow-hidden">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                   disabled={quantity <= 1 || product.stock === 0 || adding}
//                 >
//                   <Minus />
//                 </Button>
//                 <span className="w-14 text-center font-semibold text-lg">{quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
//                   disabled={quantity >= product.stock || product.stock === 0 || adding}
//                 >
//                   <Plus />
//                 </Button>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 size="lg"
//                 className="flex-1 h-14 text-lg"
//                 onClick={handleAddToCart}
//                 disabled={isAdmin || product.stock === 0 || adding}
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 h-14 text-lg"
//                 onClick={handleBuyNow}
//                 disabled={isAdmin || product.stock === 0 || adding}
//               >
//                 Buy Now
//               </Button>
//             </div>

//             {!isLoggedIn && (
//               <p className="text-center text-amber-600 font-medium">
//                 Please login to continue
//               </p>
//             )}

//             {isLoggedIn && isAdmin && (
//               <p className="text-center text-red-600 font-medium">
//                 Admin cannot purchase products
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






























import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ArrowLeft, ShoppingCart, Tag } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useGetProductQuery } from "@/app/mainApi";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: product, isLoading, error } = useGetProductQuery(id, {
    skip: !id,
  });

  // BASE URL USED EVERYWHERE
  const BASE_URL = "https://nepalstore.onrender.com";

  // Build Full Product Image URL
  const productImage = product?.image
    ? `${BASE_URL}/${product.image}`
    : "https://placehold.co/600x600?text=No+Image";

  // ───────── AUTH LOGIC ─────────
  const reduxUser = useSelector((state) => state.auth.user);
  const token = localStorage.getItem("token");

  let currentUser = reduxUser;
  let isLoggedIn = !!reduxUser || !!token;
  let isAdmin = false;

  if (!currentUser && token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      currentUser = payload;
      isLoggedIn = true;
      isAdmin = payload?.role === "admin";
    } catch (err) {
      localStorage.removeItem("token");
      isLoggedIn = false;
    }
  } else if (currentUser) {
    isAdmin = currentUser?.role === "admin";
  }

  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  // ───────── LOADING / ERROR STATES ─────────
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="animate-pulse space-y-8">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          {error ? "Error loading product" : "Product not found"}
        </h2>
        <Button size="lg" onClick={() => navigate("/")}>
          Back to Shop
        </Button>
      </div>
    );
  }

  // ───────── CART LOGIC (Stores FULL Image URL) ─────────
  const addToCart = () => {
    setAdding(true);
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const idx = cart.findIndex((item) => item._id === product._id);

    if (idx !== -1) {
      cart[idx].quantity = Math.min(cart[idx].quantity + quantity, product.stock);
    } else {
      cart.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: productImage, // store full URL
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`Added ${quantity} × ${product.name} to cart!`);
    setQuantity(1);
    setAdding(false);
  };

  // ───────── BUTTON HANDLERS ─────────
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (isAdmin) {
      toast.error("Admins cannot add to cart");
      return;
    }
    addToCart();
  };

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (isAdmin) {
      toast.error("Admins cannot buy");
      return;
    }
    addToCart();
    navigate("/cart");
  };

  const discountedPrice = (product.price * 0.8).toFixed(2); // 20% OFF

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <Button
        variant="ghost"
        className="mb-8 -ml-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* PRODUCT IMAGE */}
        <div className="rounded-xl overflow-hidden bg-gray-100 border shadow-lg">
          <img
            src={productImage}
            alt={product.name}
            className="w-full aspect-square object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600?text=Image+Not+Found";
            }}
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            {product.category && (
              <Badge variant="secondary" className="flex gap-1 items-center px-3">
                <Tag className="h-3.5 w-3.5" /> {product.category}
              </Badge>
            )}

            <Badge className="bg-green-600 text-white px-3 py-1">20% OFF</Badge>

            {product.stock === 0 ? (
              <Badge variant="destructive">Out of Stock</Badge>
            ) : product.stock <= 5 ? (
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                Only {product.stock} left!
              </Badge>
            ) : null}
          </div>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">Rs. {discountedPrice}</span>
            <span className="text-xl line-through text-muted-foreground">Rs. {product.price}</span>
          </div>

          <Separator />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Brand</p>
              <p className="text-muted-foreground">{product.brand || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Category</p>
              <p className="text-muted-foreground">{product.category || "-"}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-gray-700">Stock</p>
              <p className="text-muted-foreground">{product.stock}</p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="font-medium text-lg mb-1">Description</p>
            <p className="text-muted-foreground whitespace-pre-line">
              {product.description || "No description available."}
            </p>
          </div>

          <Separator />

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <span className="font-medium text-lg">Quantity</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || product.stock === 0 || adding}
                >
                  <Minus />
                </Button>
                <span className="w-14 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock || product.stock === 0 || adding}
                >
                  <Plus />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="flex-1 h-14 text-lg"
                onClick={handleAddToCart}
                disabled={isAdmin || product.stock === 0 || adding}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="flex-1 h-14 text-lg"
                onClick={handleBuyNow}
                disabled={isAdmin || product.stock === 0 || adding}
              >
                Buy Now
              </Button>
            </div>

            {!isLoggedIn && (
              <p className="text-center text-amber-600 font-medium">
                Please login to continue
              </p>
            )}

            {isLoggedIn && isAdmin && (
              <p className="text-center text-red-600 font-medium">
                Admin cannot purchase products
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}






























