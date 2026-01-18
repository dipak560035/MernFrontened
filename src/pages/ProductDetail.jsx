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

  // ───────── CART LOGIC ─────────
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
        image: product.image,
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

  // ───────── UI HELPERS ─────────
  const canInteract = product.stock > 0 && !isAdmin && isLoggedIn && !adding;
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
            src={product.image ? `http://localhost:5000/${product.image}` : "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col gap-6">
          {/* CATEGORY + DISCOUNT + STOCK BADGES */}
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

          {/* TITLE */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* PRICE */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-primary">Rs. {discountedPrice}</span>
            <span className="text-xl line-through text-muted-foreground">Rs. {product.price}</span>
          </div>

          <Separator />

          {/* BRAND + CATEGORY + STOCK */}
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

          {/* DESCRIPTION */}
          <div>
            <p className="font-medium text-lg mb-1">Description</p>
            <p className="text-muted-foreground whitespace-pre-line">
              {product.description || "No description available."}
            </p>
          </div>

          <Separator />

          {/* QUANTITY + BUTTONS */}
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




































// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, ArrowLeft, ShoppingCart, AlertTriangle, PackageCheck, Tag } from "lucide-react";
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

//   // ───────────────────────────────────────
//   // Auth Logic (your working logic kept)
//   // ───────────────────────────────────────
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

//   // ───────────────────────────────────────
//   // Load States
//   // ───────────────────────────────────────
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

//   // ───────────────────────────────────────
//   // Add to Cart Logic
//   // ───────────────────────────────────────
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

//   const handleAddToCart = () => {
//     if (!isLoggedIn) return navigate("/login", { state: { from: location.pathname } });
//     if (isAdmin) return toast.error("Admins cannot add to cart");
//     addToCart();
//   };

//   const handleBuyNow = () => {
//     if (!isLoggedIn) return navigate("/login", { state: { from: location.pathname } });
//     if (isAdmin) return toast.error("Admins cannot buy");
//     addToCart();
//     navigate("/cart");
//   };

//   // ───────────────────────────────────────
//   // UI Helpers
//   // ───────────────────────────────────────
//   const stockStatus = product.stock === 0
//     ? "out-of-stock"
//     : product.stock <= 5
//     ? "low-stock"
//     : "in-stock";

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
//             src={
//               product.image
//                 ? `http://localhost:5000/${product.image}`
//                 : "https://via.placeholder.com/600"
//             }
//             alt={product.name}
//             className="w-full aspect-square object-cover"
//           />
//         </div>

//         {/* INFO SIDE */}
//         <div className="flex flex-col gap-6">
//           {/* CATEGORY + DISCOUNT */}
//           <div className="flex flex-wrap gap-3">
//             {product.category && (
//               <Badge variant="secondary" className="flex gap-1 items-center px-3">
//                 <Tag className="h-3.5 w-3.5" /> {product.category}
//               </Badge>
//             )}

//             {/* 20% Discount Badge */}
//             <Badge className="bg-green-600 text-white px-3 py-1">
//               20% OFF
//             </Badge>

//             {/* Stock State */}
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
//             <span className="text-4xl font-bold text-primary">
//               Rs. {discountedPrice}
//             </span>
//             <span className="text-xl line-through text-muted-foreground">
//               Rs. {product.price}
//             </span>
//           </div>

//           <Separator />

//           {/* BRAND + STOCK + CATEGORY */}
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
//                   disabled={!canInteract || quantity <= 1}
//                 >
//                   <Minus />
//                 </Button>
//                 <span className="w-14 text-center font-semibold text-lg">
//                   {quantity}
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
//                   disabled={!canInteract || quantity >= product.stock}
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
//                 disabled={!canInteract}
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 Add to Cart
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 h-14 text-lg"
//                 onClick={handleBuyNow}
//                 disabled={!canInteract}
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

























// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, ArrowLeft, ShoppingCart, AlertTriangle, PackageCheck } from "lucide-react";
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

//   // ─── Auth check (your original logic) ───
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

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         <div className="animate-pulse space-y-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="aspect-square bg-gray-200 rounded-2xl" />
//             <div className="space-y-6">
//               <div className="h-10 w-3/4 bg-gray-200 rounded" />
//               <div className="h-12 w-1/3 bg-gray-200 rounded" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h2 className="text-4xl font-bold mb-6">
//           {error ? "Error loading product" : "Product not found"}
//         </h2>
//         <Button size="lg" onClick={() => navigate("/")}>
//           Back to Shop
//         </Button>
//       </div>
//     );
//   }

//   // Add to cart logic
//   const addToCart = () => {
//     setAdding(true);
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingIndex = cart.findIndex((item) => item._id === product._id);

//     if (existingIndex !== -1) {
//       cart[existingIndex].quantity += quantity;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: quantity,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`Added ${quantity} × ${product.name} to cart! 🛒`);
//     setQuantity(1);
//     setAdding(false);
//   };

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

//   // Stock status logic
//   const stockStatus = product.stock === 0
//     ? { text: "Out of Stock", color: "destructive", icon: AlertTriangle }
//     : product.stock <= 5
//     ? { text: `Only ${product.stock} left!`, color: "outline", icon: PackageCheck }
//     : { text: "In Stock", color: "secondary", icon: PackageCheck };

//   return (
//     <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
//       {/* Back button */}
//       <Button
//         variant="ghost"
//         className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
//         onClick={() => navigate(-1)}
//       >
//         <ArrowLeft className="mr-2 h-5 w-5" />
//         Back to products
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
//         {/* Left – Hero Image */}
//         <div className="rounded-3xl overflow-hidden bg-gray-50 border shadow-xl">
//           <img
//             src={
//               product.image
//                 ? `http://localhost:5000/${product.image}`
//                 : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop"
//             }
//             alt={product.name}
//             className="w-full aspect-square object-cover transition-transform duration-700 hover:scale-105"
//           />
//         </div>

//         {/* Right – Product Info */}
//         <div className="flex flex-col gap-8">
//           {/* Title */}
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
//             {product.name}
//           </h1>

//           {/* Price + Stock */}
//           <div className="flex flex-wrap items-center gap-6">
//             <span className="text-5xl font-extrabold text-primary">
//               Rs. {product.price.toLocaleString()}
//             </span>

//             <Badge
//               variant={stockStatus.color}
//               className="text-base px-5 py-2 flex items-center gap-2"
//             >
//               <stockStatus.icon className="h-5 w-5" />
//               {stockStatus.text}
//             </Badge>
//           </div>

//           {/* Category & Brand */}
//           <div className="flex flex-wrap gap-4">
//             {product.category && (
//               <Badge variant="outline" className="text-lg px-5 py-2">
//                 {product.category}
//               </Badge>
//             )}
//             {product.brand && (
//               <Badge variant="secondary" className="text-lg px-5 py-2">
//                 {product.brand}
//               </Badge>
//             )}
//           </div>

//           <Separator className="my-8" />

//           {/* Quantity + Actions */}
//           <div className="space-y-8">
//             <div className="flex items-center gap-8">
//               <label className="font-semibold text-xl min-w-[110px]">Quantity</label>
//               <div className="flex items-center border-2 rounded-xl overflow-hidden shadow-sm">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-14 w-14 rounded-none"
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   disabled={quantity <= 1 || adding}
//                 >
//                   <Minus className="h-6 w-6" />
//                 </Button>
//                 <span className="w-20 text-center text-2xl font-bold">
//                   {quantity}
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-14 w-14 rounded-none"
//                   onClick={() => setQuantity(q => q + 1)}
//                   disabled={adding}
//                 >
//                   <Plus className="h-6 w-6" />
//                 </Button>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-6">
//               <Button
//                 size="lg"
//                 className="flex-1 h-16 text-xl font-semibold"
//                 onClick={handleAddToCart}
//                 disabled={adding || product.stock === 0}
//               >
//                 <ShoppingCart className="mr-3 h-7 w-7" />
//                 {adding ? "Adding..." : "Add to Cart"}
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 h-16 text-xl font-semibold"
//                 onClick={handleBuyNow}
//                 disabled={adding || product.stock === 0}
//               >
//                 Buy Now
//               </Button>
//             </div>

//             {/* Admin message */}
//             {isLoggedIn && isAdmin && (
//               <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//                 <p className="text-red-700 font-semibold text-lg">
//                   Admin accounts cannot add to cart or place orders.
//                 </p>
//               </div>
//             )}
//           </div>

//           <Separator className="my-10" />

//           {/* Description */}
//           <div className="prose prose-lg max-w-none">
//             <h2 className="text-2xl font-bold mb-4">Product Details</h2>
//             {product.description ? (
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                 {product.description}
//               </p>
//             ) : (
//               <p className="text-gray-500 italic">
//                 No detailed description available for this product.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


































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

//   // ───────────────────────────────────────
//   // Auth Logic (your working logic kept)
//   // ───────────────────────────────────────
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
//     } catch {
//       localStorage.removeItem("token");
//       isLoggedIn = false;
//     }
//   } else if (currentUser) {
//     isAdmin = currentUser?.role === "admin";
//   }

//   const [quantity, setQuantity] = useState(1);
//   const [adding, setAdding] = useState(false);

//   // ───────────────────────────────────────
//   // Load States
//   // ───────────────────────────────────────
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

//   // ───────────────────────────────────────
//   // Add to Cart Logic
//   // ───────────────────────────────────────
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

//   const handleAddToCart = () => {
//     if (!isLoggedIn) return navigate("/login", { state: { from: location.pathname } });
//     if (isAdmin) return toast.error("Admins cannot add to cart");
//     addToCart();
//   };

//   const handleBuyNow = () => {
//     if (!isLoggedIn) return navigate("/login", { state: { from: location.pathname } });
//     if (isAdmin) return toast.error("Admins cannot buy");
//     addToCart();
//     navigate("/cart");
//   };

//   // ───────────────────────────────────────
//   // UI Helpers
//   // ───────────────────────────────────────
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
//             src={
//               product.image
//                 ? `http://localhost:5000/${product.image}`
//                 : "https://via.placeholder.com/600"
//             }
//             alt={product.name}
//             className="w-full aspect-square object-cover"
//           />
//         </div>

//         {/* INFO SIDE */}
//         <div className="flex flex-col gap-6">
//           {/* CATEGORY + DISCOUNT */}
//           <div className="flex flex-wrap gap-3">
//             {product.category && (
//               <Badge variant="secondary" className="flex gap-1 items-center px-3">
//                 <Tag className="h-3.5 w-3.5" /> {product.category}
//               </Badge>
//             )}

//             {/* 20% Discount Badge */}
//             <Badge className="bg-green-600 text-white px-3 py-1">
//               20% OFF
//             </Badge>

//             {/* Stock State */}
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
//             <span className="text-4xl font-bold text-primary">
//               Rs. {discountedPrice}
//             </span>
//             <span className="text-xl line-through text-muted-foreground">
//               Rs. {product.price}
//             </span>
//           </div>

//           <Separator />

//           {/* BRAND + STOCK + CATEGORY */}
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
//                   disabled={!canInteract || quantity <= 1}
//                 >
//                   <Minus />
//                 </Button>
//                 <span className="w-14 text-center font-semibold text-lg">
//                   {quantity}
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
//                   disabled={!canInteract || quantity >= product.stock}
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
//                 disabled={!canInteract}
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 Add to Cart
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 h-14 text-lg"
//                 onClick={handleBuyNow}
//                 disabled={!canInteract}
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































// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, ArrowLeft, ShoppingCart, AlertTriangle, PackageCheck } from "lucide-react";
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

//   // ─── Auth check (your original logic) ───
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

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         <div className="animate-pulse space-y-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="aspect-square bg-gray-200 rounded-2xl" />
//             <div className="space-y-6">
//               <div className="h-10 w-3/4 bg-gray-200 rounded" />
//               <div className="h-12 w-1/3 bg-gray-200 rounded" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || !product) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h2 className="text-4xl font-bold mb-6">
//           {error ? "Error loading product" : "Product not found"}
//         </h2>
//         <Button size="lg" onClick={() => navigate("/")}>
//           Back to Shop
//         </Button>
//       </div>
//     );
//   }

//   // Add to cart logic
//   const addToCart = () => {
//     setAdding(true);
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingIndex = cart.findIndex((item) => item._id === product._id);

//     if (existingIndex !== -1) {
//       cart[existingIndex].quantity += quantity;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: quantity,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`Added ${quantity} × ${product.name} to cart! 🛒`);
//     setQuantity(1);
//     setAdding(false);
//   };

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

//   // Stock status logic
//   const stockStatus = product.stock === 0
//     ? { text: "Out of Stock", color: "destructive", icon: AlertTriangle }
//     : product.stock <= 5
//     ? { text: `Only ${product.stock} left!`, color: "outline", icon: PackageCheck }
//     : { text: "In Stock", color: "secondary", icon: PackageCheck };

//   return (
//     <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
//       {/* Back button */}
//       <Button
//         variant="ghost"
//         className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
//         onClick={() => navigate(-1)}
//       >
//         <ArrowLeft className="mr-2 h-5 w-5" />
//         Back to products
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
//         {/* Left – Hero Image */}
//         <div className="rounded-3xl overflow-hidden bg-gray-50 border shadow-xl">
//           <img
//             src={
//               product.image
//                 ? `http://localhost:5000/${product.image}`
//                 : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop"
//             }
//             alt={product.name}
//             className="w-full aspect-square object-cover transition-transform duration-700 hover:scale-105"
//           />
//         </div>

//         {/* Right – Product Info */}
//         <div className="flex flex-col gap-8">
//           {/* Title */}
//           <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
//             {product.name}
//           </h1>

//           {/* Price + Stock */}
//           <div className="flex flex-wrap items-center gap-6">
//             <span className="text-5xl font-extrabold text-primary">
//               Rs. {product.price.toLocaleString()}
//             </span>

//             <Badge
//               variant={stockStatus.color}
//               className="text-base px-5 py-2 flex items-center gap-2"
//             >
//               <stockStatus.icon className="h-5 w-5" />
//               {stockStatus.text}
//             </Badge>
//           </div>

//           {/* Category & Brand */}
//           <div className="flex flex-wrap gap-4">
//             {product.category && (
//               <Badge variant="outline" className="text-lg px-5 py-2">
//                 {product.category}
//               </Badge>
//             )}
//             {product.brand && (
//               <Badge variant="secondary" className="text-lg px-5 py-2">
//                 {product.brand}
//               </Badge>
//             )}
//           </div>

//           <Separator className="my-8" />

//           {/* Quantity + Actions */}
//           <div className="space-y-8">
//             <div className="flex items-center gap-8">
//               <label className="font-semibold text-xl min-w-[110px]">Quantity</label>
//               <div className="flex items-center border-2 rounded-xl overflow-hidden shadow-sm">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-14 w-14 rounded-none"
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   disabled={quantity <= 1 || adding}
//                 >
//                   <Minus className="h-6 w-6" />
//                 </Button>
//                 <span className="w-20 text-center text-2xl font-bold">
//                   {quantity}
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-14 w-14 rounded-none"
//                   onClick={() => setQuantity(q => q + 1)}
//                   disabled={adding}
//                 >
//                   <Plus className="h-6 w-6" />
//                 </Button>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row gap-6">
//               <Button
//                 size="lg"
//                 className="flex-1 h-16 text-xl font-semibold"
//                 onClick={handleAddToCart}
//                 disabled={adding || product.stock === 0}
//               >
//                 <ShoppingCart className="mr-3 h-7 w-7" />
//                 {adding ? "Adding..." : "Add to Cart"}
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 h-16 text-xl font-semibold"
//                 onClick={handleBuyNow}
//                 disabled={adding || product.stock === 0}
//               >
//                 Buy Now
//               </Button>
//             </div>

//             {/* Admin message */}
//             {isLoggedIn && isAdmin && (
//               <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
//                 <p className="text-red-700 font-semibold text-lg">
//                   Admin accounts cannot add to cart or place orders.
//                 </p>
//               </div>
//             )}
//           </div>

//           <Separator className="my-10" />

//           {/* Description */}
//           <div className="prose prose-lg max-w-none">
//             <h2 className="text-2xl font-bold mb-4">Product Details</h2>
//             {product.description ? (
//               <p className="text-gray-700 leading-relaxed whitespace-pre-line">
//                 {product.description}
//               </p>
//             ) : (
//               <p className="text-gray-500 italic">
//                 No detailed description available for this product.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











// import { useParams, useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, ArrowLeft, Package, ShoppingCart, Tag } from "lucide-react";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useGetProductQuery } from "@/app/mainApi";
// import { useSelector } from "react-redux";

// export default function ProductDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data: product, isLoading, error } = useGetProductQuery(id, {
//     skip: !id,
//   });

//   // ────────────────────────────────────────────────
//   //  Get auth state + fallback to token decode
//   // ────────────────────────────────────────────────
//   const reduxUser = useSelector((state) => state.auth.user);
//   const token = localStorage.getItem("token");

//   let currentUser = reduxUser;
//   let isLoggedIn = !!reduxUser || !!token;
//   let isAdmin = false;

//   // If redux is null but token exists → decode it
//   if (!currentUser && token) {
//     try {
//       const payload = JSON.parse(atob(token.split(".")[1]));
//       currentUser = payload;
//       isLoggedIn = true;
//       isAdmin = payload?.role === "admin";
//     } catch (err) {
//       console.warn("Invalid token format → logging out");
//       localStorage.removeItem("token");
//       isLoggedIn = false;
//     }
//   }

//   // Final admin check (prefer redux when available)
//   if (currentUser?.role === "admin") {
//     isAdmin = true;
//   }

//   const [quantity, setQuantity] = useState(1);
//   const [adding, setAdding] = useState(false);

//   // ────────────────────────────────────────────────
//   //  Loading / Error / Not found states
//   // ────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl text-center">
//         <div className="animate-pulse space-y-8">Loading product...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl text-center">
//         <h2 className="text-3xl font-bold mb-4 text-destructive">Error</h2>
//         <p className="text-muted-foreground mb-6">
//           {error?.data?.message || "Could not load product"}
//         </p>
//         <Button onClick={() => navigate("/")}>Back to shop</Button>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="container mx-auto p-6 max-w-7xl text-center">
//         <h2 className="text-3xl font-bold mb-4">Product not found</h2>
//         <Button onClick={() => navigate("/")}>Back to shop</Button>
//       </div>
//     );
//   }

//   // ────────────────────────────────────────────────
//   //  Add to cart logic (only called when allowed)
//   // ────────────────────────────────────────────────
//   const addToCart = () => {
//     setAdding(true);

//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");

//     const existingIndex = cart.findIndex((item) => item._id === product._id);

//     if (existingIndex !== -1) {
//       cart[existingIndex].quantity += quantity;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: quantity,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`Added ${quantity} × ${product.name} to cart!`, {
//       duration: 2400,
//     });

//     setQuantity(1);
//     setAdding(false);
//   };

//   // ────────────────────────────────────────────────
//   //  Click handlers with login + role checks
//   // ────────────────────────────────────────────────
//   const handleAddToCart = () => {
//     if (!isLoggedIn) {
//       toast("Please login first", { icon: "🔐" });
//       navigate("/login", { state: { from: location.pathname } });
//       return;
//     }

//     if (isAdmin) {
//       toast.error("Admins cannot add items to cart");
//       return;
//     }

//     addToCart();
//     // stays on page
//   };

//   const handleBuyNow = () => {
//     if (!isLoggedIn) {
//       toast("Please login first", { icon: "🔐" });
//       navigate("/login", { state: { from: location.pathname } });
//       return;
//     }

//     if (isAdmin) {
//       toast.error("Admins cannot purchase items");
//       return;
//     }

//     addToCart();
//     navigate("/cart");
//   };

//   const canInteract = product.stock > 0 && !isAdmin && isLoggedIn && !adding;

//   // ────────────────────────────────────────────────
//   //  Render
//   // ────────────────────────────────────────────────
//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       <Button
//         variant="ghost"
//         className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
//         onClick={() => navigate(-1)}
//       >
//         <ArrowLeft className="mr-2 h-5 w-5" />
//         Back to products
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
//         {/* Left – Image */}
//         <div className="rounded-2xl overflow-hidden bg-muted/40 border shadow-sm">
//           <img
//             src={
//               product.image
//                 ? `http://localhost:5000/${product.image}`
//                 : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop"
//             }
//             alt={product.name}
//             className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-105"
//           />
//         </div>

//         {/* Right – Info */}
//         <div className="flex flex-col gap-6">
//           {/* Badges */}
//           <div className="flex flex-wrap gap-3">
//             <Badge variant="secondary" className="text-sm px-3 py-1 gap-1.5">
//               <Tag className="h-3.5 w-3.5" />
//               {product.category}
//             </Badge>

//             {product.stock === 0 ? (
//               <Badge variant="destructive">Out of Stock</Badge>
//             ) : product.stock <= 5 ? (
//               <Badge variant="outline" className="border-amber-500 text-amber-700 bg-amber-50">
//                 Only {product.stock} left! Hurry!
//               </Badge>
//             ) : null}
//           </div>

//           <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
//             {product.name}
//           </h1>

//           {/* Price */}
//           <div className="flex items-end gap-4 flex-wrap">
//             <span className="text-4xl md:text-5xl font-bold text-primary">
//               Rs. {product.price.toLocaleString()}
//             </span>
//           </div>

//           <Separator />

//           {/* Quick specs */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//             {/* ... availability, category, brand cards ... same as before */}
//           </div>

//           <Separator />

//           {/* Description */}
//           <div className="space-y-3">
//             <h3 className="text-xl font-semibold">Description</h3>
//             {product.description ? (
//               <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
//                 {product.description}
//               </p>
//             ) : (
//               <p className="text-muted-foreground italic">No description available.</p>
//             )}
//           </div>

//           <Separator className="my-8" />

//           {/* ────────────────────────────────
//               CART ACTIONS + PROTECTION
//           ──────────────────────────────── */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-6">
//               <label className="font-medium min-w-[90px]">Quantity:</label>
//               <div className="flex items-center border rounded-md">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-10 w-10 rounded-none"
//                   onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//                   disabled={!canInteract}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="w-14 text-center font-medium text-lg">
//                   {quantity}
//                 </span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-10 w-10 rounded-none"
//                   onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
//                   disabled={!canInteract}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               {quantity >= product.stock && product.stock > 0 && (
//                 <span className="text-sm text-amber-600 font-medium">
//                   Max available
//                 </span>
//               )}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 size="lg"
//                 className="flex-1 h-14 text-base font-medium"
//                 onClick={handleAddToCart}
//                 disabled={!canInteract}
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 {adding ? "Adding..." : "Add to Cart"}
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 h-14 text-base font-medium"
//                 onClick={handleBuyNow}
//                 disabled={!canInteract}
//               >
//                 Buy Now
//               </Button>
//             </div>

//             {/* Status messages */}
//             {!isLoggedIn && (
//               <p className="text-center text-amber-600 font-medium mt-4">
//                 Please login to add items to cart or place an order
//               </p>
//             )}

//             {isLoggedIn && isAdmin && (
//               <p className="text-center text-red-600 font-medium mt-4">
//                 Admin accounts cannot add to cart or make purchases
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



































// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, ArrowLeft, Package, ShoppingCart, Tag } from "lucide-react";
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

//   // Auth check
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

//   if (isLoading) return <div className="container mx-auto p-6 text-center">Loading...</div>;

//   if (error || !product) {
//     return (
//       <div className="container mx-auto p-6 text-center">
//         <h2 className="text-3xl font-bold mb-4">
//           {error ? "Error loading product" : "Product not found"}
//         </h2>
//         <Button onClick={() => navigate("/")}>Back to Shop</Button>
//       </div>
//     );
//   }

//   // Add to cart logic
//   const addToCart = () => {
//     setAdding(true);
//     const cart = JSON.parse(localStorage.getItem("cart") || "[]");
//     const existingIndex = cart.findIndex((item) => item._id === product._id);

//     if (existingIndex !== -1) {
//       cart[existingIndex].quantity += quantity;
//     } else {
//       cart.push({
//         _id: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.image,
//         quantity: quantity,
//       });
//     }

//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success(`Added ${quantity} × ${product.name} to cart!`);
//     setQuantity(1);
//     setAdding(false);
//   };

//   // ─── Click Handlers ───
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

//   // Buttons are always enabled visually, but logic protects them
//   const isActionAllowed = product.stock > 0 && !adding && !isAdmin;

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-7xl">
//       <Button
//         variant="ghost"
//         className="mb-8 -ml-4 text-muted-foreground hover:text-foreground"
//         onClick={() => navigate(-1)}
//       >
//         <ArrowLeft className="mr-2 h-5 w-5" />
//         Back to products
//       </Button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
//         {/* Image */}
//         <div className="rounded-2xl overflow-hidden bg-muted/40 border shadow-sm">
//           <img
//             src={product.image ? `http://localhost:5000/${product.image}` : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop"}
//             alt={product.name}
//             className="w-full aspect-square object-cover transition-transform duration-500 hover:scale-105"
//           />
//         </div>

//         {/* Info */}
//         <div className="flex flex-col gap-6">
//           {/* Badges, name, price, quick info, description – keep your original */}

//           <Separator className="my-8" />

//           {/* Cart Actions */}
//           <div className="space-y-6">
//             <div className="flex items-center gap-6">
//               <label className="font-medium min-w-[90px]">Quantity:</label>
//               <div className="flex items-center border rounded-md">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-10 w-10 rounded-none"
//                   onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                   disabled={quantity <= 1 || product.stock === 0 || adding}
//                 >
//                   <Minus className="h-4 w-4" />
//                 </Button>
//                 <span className="w-14 text-center font-medium text-lg">{quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="h-10 w-10 rounded-none"
//                   onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
//                   disabled={quantity >= product.stock || product.stock === 0 || adding}
//                 >
//                   <Plus className="h-4 w-4" />
//                 </Button>
//               </div>
//               {quantity >= product.stock && product.stock > 0 && (
//                 <span className="text-sm text-amber-600 font-medium">Max available</span>
//               )}
//             </div>

//             <div className="flex flex-col sm:flex-row gap-4">
//               <Button
//                 size="lg"
//                 className="flex-1 h-14 text-base font-medium"
//                 onClick={handleAddToCart}
//                 disabled={adding || product.stock === 0} // only disable for real reasons
//               >
//                 <ShoppingCart className="mr-2 h-5 w-5" />
//                 {adding ? "Adding..." : "Add to Cart"}
//               </Button>

//               <Button
//                 variant="outline"
//                 size="lg"
//                 className="flex-1 h-14 text-base font-medium"
//                 onClick={handleBuyNow}
//                 disabled={adding || product.stock === 0}
//               >
//                 Buy Now
//               </Button>
//             </div>

//             {/* Only show admin message */}
//             {isLoggedIn && isAdmin && (
//               <p className="text-center text-red-600 font-medium mt-4">
//                 Admin accounts cannot add to cart or place orders
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

















