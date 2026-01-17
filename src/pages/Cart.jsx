





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Trash, ShoppingCart } from "lucide-react";
// import toast from "react-hot-toast";

// export default function Cart() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   // Fetch cart items from backend
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/cart", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         // Backend returns { status: "success", cart: [...] }
//         setCartItems(data.cart || []);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load cart items.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCart();
//   }, []);

//   const handleQuantityChange = (productId, delta) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.product._id === productId
//           ? {
//               ...item,
//               quantity: Math.min(
//                 Math.max(1, item.quantity + delta),
//                 item.product.stock
//               ),
//             }
//           : item
//       )
//     );
//   };

//   const handleRemove = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item.product._id !== productId));
//     toast.success("Item removed from cart");
//   };

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.product.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) return toast.error("Cart is empty");
//     setPlacingOrder(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           items: cartItems.map((item) => ({
//             product: item.product._id,
//             quantity: item.quantity,
//           })),
//         }),
//       });
//       const data = await res.json();
//       if (data.status === "success") {
//         toast.success("Order placed successfully!");
//         setCartItems([]);
//         navigate("/orders"); // optional: go to order history
//       } else {
//         toast.error(data.message || "Failed to place order");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while placing order");
//     } finally {
//       setPlacingOrder(false);
//     }
//   };

//   if (loading) return <div className="p-6">Loading your cart...</div>;

//   if (cartItems.length === 0)
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
//         <Button onClick={() => navigate("/")}>Go Shopping</Button>
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

//       <div className="space-y-6">
//         {cartItems.map((item) => (
//           <div
//             key={item.product._id}
//             className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4 bg-card"
//           >
//             <img
//               src={
//                 item.product.image
//                   ? `http://localhost:5000/${item.product.image}`
//                   : "https://via.placeholder.com/150"
//               }
//               alt={item.product.name}
//               className="w-28 h-28 object-cover rounded"
//             />
//             <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 w-full">
//               <div>
//                 <h2 className="font-semibold text-lg">{item.product.name}</h2>
//                 <Badge className="mt-1">{item.product.category}</Badge>
//                 <p className="mt-2 font-medium text-primary">
//                   Rs. {item.product.price.toLocaleString()}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleQuantityChange(item.product._id, -1)}
//                   disabled={item.quantity <= 1}
//                 >
//                   -
//                 </Button>
//                 <span className="px-4 py-2 border rounded">{item.quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleQuantityChange(item.product._id, 1)}
//                   disabled={item.quantity >= item.product.stock}
//                 >
//                   +
//                 </Button>
//               </div>

//               <Button
//                 variant="destructive"
//                 size="icon"
//                 onClick={() => handleRemove(item.product._id)}
//               >
//                 <Trash />
//               </Button>
//             </div>
//           </div>
//         ))}

//         <Separator />

//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
//           <p className="text-xl font-semibold">
//             Total: Rs. {totalPrice.toLocaleString()}
//           </p>
//           <Button
//             size="lg"
//             className="flex items-center gap-2"
//             onClick={handlePlaceOrder}
//             disabled={placingOrder}
//           >
//             <ShoppingCart />
//             {placingOrder ? "Placing Order..." : "Place Order"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


















// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Trash, ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Cart() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // Update localStorage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleQuantityChange = (index, delta) => {
//     setCartItems((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   const handleRemove = (index) => {
//     setCartItems((prev) => prev.filter((_, i) => i !== index));
//     toast.success("Item removed from cart");
//   };

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) return toast.error("Cart is empty");
//     setPlacingOrder(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           items: cartItems.map((item) => ({
//             product: item._id,
//             quantity: item.quantity,
//           })),
//         }),
//       });
//       const data = await res.json();
//       if (data.status === "success") {
//         toast.success("Order placed successfully!");
//         setCartItems([]);
//         localStorage.removeItem("cart");
//         navigate("/orders"); // optional: redirect to orders page
//       } else {
//         toast.error(data.message || "Failed to place order");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while placing order");
//     } finally {
//       setPlacingOrder(false);
//     }
//   };

//   if (cartItems.length === 0)
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
//         <Button onClick={() => navigate("/")}>Go Shopping</Button>
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

//       <div className="space-y-6">
//         {cartItems.map((item, index) => (
//           <div
//             key={item._id + index}
//             className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4 bg-card"
//           >
//             <img
//               src={
//                 item.image
//                   ? `http://localhost:5000/${item.image}`
//                   : "https://via.placeholder.com/150"
//               }
//               alt={item.name}
//               className="w-28 h-28 object-cover rounded"
//             />
//             <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 w-full">
//               <div>
//                 <h2 className="font-semibold text-lg">{item.name}</h2>
//                 <Badge className="mt-1">{item.category}</Badge>
//                 <p className="mt-2 font-medium text-primary">
//                   Rs. {item.price.toLocaleString()}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleQuantityChange(index, -1)}
//                   disabled={item.quantity <= 1}
//                 >
//                   -
//                 </Button>
//                 <span className="px-4 py-2 border rounded">{item.quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleQuantityChange(index, 1)}
//                 >
//                   +
//                 </Button>
//               </div>

//               <Button
//                 variant="destructive"
//                 size="icon"
//                 onClick={() => handleRemove(index)}
//               >
//                 <Trash />
//               </Button>
//             </div>
//           </div>
//         ))}

//         <Separator />

//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
//           <p className="text-xl font-semibold">
//             Total: Rs. {totalPrice.toLocaleString()}
//           </p>
//           <Button
//             size="lg"
//             className="flex items-center gap-2"
//             onClick={handlePlaceOrder}
//             disabled={placingOrder}
//           >
//             <ShoppingCart />
//             {placingOrder ? "Placing Order..." : "Place Order"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }




























// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { Trash, ShoppingCart } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function Cart() {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [placingOrder, setPlacingOrder] = useState(false);

//   // Load cart from localStorage on mount
//   useEffect(() => {
//     try {
//       const savedCart = localStorage.getItem("cart");
//       if (savedCart) {
//         setCartItems(JSON.parse(savedCart));
//       }
//     } catch (err) {
//       console.error("Failed to load cart:", err);
//     }
//   }, []);

//   // Sync back to localStorage whenever cart changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const handleQuantityChange = (index, delta) => {
//     setCartItems((prev) =>
//       prev.map((item, i) =>
//         i === index
//           ? { ...item, quantity: Math.max(1, item.quantity + delta) }
//           : item
//       )
//     );
//   };

//   const handleRemove = (index) => {
//     setCartItems((prev) => prev.filter((_, i) => i !== index));
//     toast.success("Item removed from cart");
//   };

//   const totalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const handlePlaceOrder = async () => {
//     if (cartItems.length === 0) return toast.error("Cart is empty");

//     setPlacingOrder(true);

//     try {
//       const token = localStorage.getItem("token");

//       const res = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : "",
//         },
//         body: JSON.stringify({
//           items: cartItems.map((item) => ({
//             product: item._id,
//             quantity: item.quantity,
//           })),
//         }),
//       });

//       const data = await res.json();
//       if (data.status === "success") {
//         toast.success("Order placed successfully!");
//         setCartItems([]);
//         localStorage.removeItem("cart");
//         navigate("/orders");
//       } else {
//         toast.error(data.message || "Failed to place order");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error while placing order");
//     } finally {
//       setPlacingOrder(false);
//     }
//   };

//   // If empty cart UI
//   if (cartItems.length === 0) {
//     return (
//       <div className="p-6 text-center">
//         <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
//         <Button onClick={() => navigate("/")}>Go Shopping</Button>
//       </div>
//     );
//   }

//   // If items in cart UI
//   return (
//     <div className="container mx-auto p-6 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

//       <div className="space-y-6">
//         {cartItems.map((item, index) => (
//           <div
//             key={item._id + index}
//             className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-4 bg-card"
//           >
//             <img
//               src={
//                 item.image
//                   ? `http://localhost:5000/${item.image}`
//                   : "https://via.placeholder.com/150"
//               }
//               alt={item.name}
//               className="w-28 h-28 object-cover rounded"
//             />

//             <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 w-full">
//               <div>
//                 <h2 className="font-semibold text-lg">{item.name}</h2>
//                 <Badge className="mt-1">{item.category}</Badge>
//                 <p className="mt-2 font-medium text-primary">
//                   Rs. {item.price.toLocaleString()}
//                 </p>
//               </div>

//               <div className="flex items-center gap-2">
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleQuantityChange(index, -1)}
//                   disabled={item.quantity <= 1}
//                 >
//                   -
//                 </Button>
//                 <span className="px-4 py-2 border rounded">{item.quantity}</span>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => handleQuantityChange(index, 1)}
//                 >
//                   +
//                 </Button>
//               </div>

//               <Button
//                 variant="destructive"
//                 size="icon"
//                 onClick={() => handleRemove(index)}
//               >
//                 <Trash />
//               </Button>
//             </div>
//           </div>
//         ))}

//         <Separator />

//         <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
//           <p className="text-xl font-semibold">
//             Total: Rs. {totalPrice.toLocaleString()}
//           </p>

//           <Button
//             size="lg"
//             className="flex items-center gap-2"
//             onClick={handlePlaceOrder}
//             disabled={placingOrder}
//           >
//             <ShoppingCart />
//             {placingOrder ? "Placing Order..." : "Place Order"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }




// import { useEffect, useState } from "react";

// export default function Cart() {
//   const [cartItems, setCartItems] = useState([]);

//   useEffect(() => {
//     const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
//     setCartItems(savedCart);
//   }, []);

//   if (cartItems.length === 0) {
//     return <h2>Your cart is empty</h2>;
//   }

//   return (
//     <div>
//       <h2>Your Cart</h2>

//       {cartItems.map((item) => (
//         <div key={item._id} style={{ marginBottom: "20px" }}>
//           <img
//             src={`http://localhost:5000/${item.image}`}
//             width="120"
//             height="120"
//             alt={item.name}
//           />
//           <p>{item.name}</p>
//           <p>Price: ${item.price}</p>
//           <p>Qty: {item.quantity}</p>
//         </div>
//       ))}

//       <hr />
//       <h3>
//         Total: $
//         {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
//       </h3>
//     </div>
//   );
// }









import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <Card className="max-w-lg mx-auto mt-10">
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Card className="max-w-lg mx-auto mt-10">
      <CardHeader>
        <CardTitle>Your Cart</CardTitle>
      </CardHeader>

      <CardContent>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item._id}
              className="flex items-center gap-4 border-b pb-4"
            >
              <img
                src={`http://localhost:5000/${item.image}`}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                ${item.price * item.quantity}
              </p>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Total: ${total}</h3>
        <Button
          onClick={handlePlaceOrder}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Place Order
        </Button>
      </CardFooter>
    </Card>
  );
}