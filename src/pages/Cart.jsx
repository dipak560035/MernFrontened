












































// src/pages/Cart.jsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "@/app/mainApi";

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  // Load cart from localStorage
  const loadCart = () => {
    try {
      const saved = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(Array.isArray(saved) ? saved : []);
    } catch (err) {
      console.error("Failed to parse cart", err);
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCart();
    const handleStorage = () => loadCart();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartItems(newCart);
  };

  const updateQuantity = (id, delta) => {
    const newCart = cartItems.map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, Math.min(99, (item.quantity || 1) + delta)) }
        : item
    );
    saveCart(newCart);
  };

  const removeFromCart = (id) => {
    const newCart = cartItems.filter((item) => item._id !== id);
    saveCart(newCart);
    toast.success("Item removed");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast("Cart is empty");
      return;
    }

    const payload = {
      items: cartItems.map((item) => ({
        product: item._id,
        quantity: item.quantity || 1,
      })),
      total: Math.round(subtotal), // or use Number(subtotal.toFixed(0))
    };

    try {
      const result = await createOrder(payload).unwrap();
      console.log("Order created:", result);

      toast.success("Order placed successfully!", { duration: 4000 });

      // Clear cart
      localStorage.removeItem("cart");
      setCartItems([]);

      // Go to orders page
      navigate("/orders");
    } catch (err) {
      console.error("Order creation failed:", err);
      const msg =
        err?.data?.message ||
        err?.data?.error  ||
        "Failed to place order. Please try again.";
      toast.error(msg, { duration: 5000 });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-6" />
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Looks like you haven't added any products yet.
        </p>
        <Button size="lg" asChild>
          <Link to="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart ({cartItems.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card key={item._id} className="overflow-hidden shadow-sm">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-32 md:w-40 bg-muted shrink-0">
                    <img
                      src={
                        item.image?.startsWith("http")
                          ? item.image
                          : `http://localhost:5000/${item.image || "uploads/placeholder.jpg"}`
                      }
                      alt={item.name || item.title || "Product"}
                      className="w-full h-32 sm:h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg?height=128&width=128";
                      }}
                    />
                  </div>

                  <div className="flex-1 p-5 flex flex-col">
                    <div className="flex-grow">
                      <h3 className="font-semibold text-lg line-clamp-2">
                        {item.name || item.title || "Unnamed Product"}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Rs. {(item.price || 0).toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-none"
                          onClick={() => updateQuantity(item._id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity || 1}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-none"
                          onClick={() => updateQuantity(item._id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-5">
                        <p className="font-semibold">
                          Rs. {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeFromCart(item._id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8 border shadow-sm">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 pt-2">
              <Button
                className="w-full h-12 text-base"
                onClick={handleCheckout}
                disabled={isCreatingOrder || cartItems.length === 0}
              >
                {isCreatingOrder ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}



































// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   const loadCart = () => {
//     const saved = JSON.parse(localStorage.getItem("cart") || "[]");
//     setCartItems(saved);
//   };

//   useEffect(() => {
//     loadCart();
//     window.addEventListener("storage", loadCart);
//     return () => window.removeEventListener("storage", loadCart);
//   }, []);

//   const updateCart = (newCart) => {
//     localStorage.setItem("cart", JSON.stringify(newCart));
//     setCartItems(newCart);
//   };

//   const changeQuantity = (id, delta) => {
//     const newCart = cartItems.map((item) =>
//       item._id === id
//         ? { ...item, quantity: Math.max(1, Math.min(99, item.quantity + delta)) }
//         : item
//     );
//     updateCart(newCart);
//   };

//   const removeItem = (id) => {
//     const newCart = cartItems.filter((item) => item._id !== id);
//     updateCart(newCart);
//     toast.success("Item removed from cart");
//   };

//   const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handlePlaceOrder = () => {
//     if (cartItems.length === 0) return;
//     toast.success("Order placed successfully! (Demo)");
//     localStorage.removeItem("cart");
//     setCartItems([]);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
//         <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
//         <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
//         <p className="text-muted-foreground mb-8">
//           Looks like you haven't added anything yet.
//         </p>
//         <Button asChild size="lg">
//           <Link to="/">Continue Shopping</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartItems.length})</h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-6">
//           {cartItems.map((item) => (
//             <Card key={item._id} className="overflow-hidden">
//               <CardContent className="p-0">
//                 <div className="flex flex-col sm:flex-row">
//                   <div className="sm:w-32 md:w-40 shrink-0">
//                     <img
//                       src={`http://localhost:5000/${item.image}`}
//                       alt={item.name}
//                       className="w-full h-full object-cover aspect-square sm:aspect-auto sm:h-32 md:h-40"
//                     />
//                   </div>

//                   <div className="flex-1 p-5 flex flex-col justify-between">
//                     <div>
//                       <h3 className="font-semibold text-lg">{item.name}</h3>
//                       <p className="text-muted-foreground mt-1">
//                         Rs. {item.price.toLocaleString()}
//                       </p>
//                     </div>

//                     <div className="flex items-center justify-between mt-4">
//                       <div className="flex items-center border rounded-md">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-9 w-9 rounded-none"
//                           onClick={() => changeQuantity(item._id, -1)}
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span className="w-12 text-center font-medium">
//                           {item.quantity}
//                         </span>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-9 w-9 rounded-none"
//                           onClick={() => changeQuantity(item._id, 1)}
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>

//                       <div className="flex items-center gap-4">
//                         <p className="font-semibold whitespace-nowrap">
//                           Rs. {(item.price * item.quantity).toLocaleString()}
//                         </p>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="text-destructive hover:text-destructive hover:bg-destructive/10"
//                           onClick={() => removeItem(item._id)}
//                         >
//                           <Trash2 className="h-5 w-5" />
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="lg:col-span-1">
//           <Card className="sticky top-8">
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between text-sm">
//                 <span>Subtotal ({cartItems.length} items)</span>
//                 <span>Rs. {subtotal.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span>Shipping</span>
//                 <span className="text-green-600">Free</span>
//               </div>
//               <Separator />
//               <div className="flex justify-between text-lg font-bold">
//                 <span>Total</span>
//                 <span>Rs. {subtotal.toLocaleString()}</span>
//               </div>
//             </CardContent>
//             <CardFooter className="flex-col gap-3">
//               <Button className="w-full h-12 text-base" onClick={handlePlaceOrder}>
//                 Proceed to Checkout
//               </Button>
//               <Button variant="outline" className="w-full" asChild>
//                 <Link to="/">Continue Shopping</Link>
//               </Button>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }