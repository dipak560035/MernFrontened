


























// Updated Orders.jsx
// Changes:
// - Uncommented the status Badge for better visibility
// - Minor tweaks for consistency (e.g., added optional chaining where needed)

import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Calendar, IndianRupee } from "lucide-react";
import { useGetOrdersQuery } from "@/app/mainApi";
import { format } from "date-fns";

export default function Orders() {
  const { data: orders = [], isLoading, isError, error } = useGetOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading your orders...</p>
      </div>
    );
  }

  if (isError) {
    console.error("Orders fetch error:", error);
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">
          Failed to load orders
        </h2>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-4xl text-center">
        <Package className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
        <h2 className="text-3xl font-bold mb-3">No orders yet</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          When you place an order, it will appear here.
        </p>
        <Button size="lg" asChild>
          <a href="/">Start Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-5">
        {orders.map((order) => (
          <Card
            key={order._id}
            className="hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/orders/${order._id}`)}
          >
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </CardTitle>
                  <CardDescription className="mt-1 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(order.createdAt), "dd MMM yyyy • hh:mm a")}
                  </CardDescription>
                </div>
                <Badge variant={order.status === "completed" ? "success" : order.status === "cancelled" ? "destructive" : "secondary"}>
                  {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || "Pending"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-muted p-3 rounded-full">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1 ? "item" : "items"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total: <IndianRupee className="inline h-4 w-4" />
                      {order.total?.toLocaleString() || "—"}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Details →
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


















































// New/Updated OrderDetail.jsx
// This component fetches the single order using the new getOrder query.
// It displays full details: order ID, date, status, item list with product name/title, quantity (assumes items have {product, quantity}; defaults quantity to 1 if missing), subtotal per item, and total.
// Cancel button shown only if status allows (not cancelled/completed).
// On cancel, shows confirmation dialog with product details/titles (as per your request: users know details/title, not just ID).
// After cancel, navigates back to /orders and invalidates tags for refetch.

// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { IndianRupee, Calendar, Package } from "lucide-react";
// import { useGetOrderQuery, useCancelOrderMutation } from "@/app/mainApi";
// import { format } from "date-fns";

// export default function OrderDetail() {
//   const { id } = useParams();
//   const { data: order, isLoading, isError, error } = useGetOrderQuery(id);
//   const [cancelOrder, { isLoading: isCanceling }] = useCancelOrderMutation();
//   const navigate = useNavigate();

//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-12 px-4 text-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//         <p className="text-muted-foreground">Loading order details...</p>
//       </div>
//     );
//   }

//   if (isError) {
//     console.error("Order fetch error:", error);
//     return (
//       <div className="container mx-auto py-12 px-4 text-center">
//         <h2 className="text-2xl font-bold text-destructive mb-4">
//           Failed to load order
//         </h2>
//         <Button onClick={() => window.location.reload()}>Retry</Button>
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="container mx-auto py-12 px-4 text-center">
//         <h2 className="text-2xl font-bold text-destructive mb-4">
//           Order not found
//         </h2>
//         <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
//       </div>
//     );
//   }

//   const handleCancel = async () => {
//     const productDetails = order.items
//       .map((item) => `${item.product?.name || 'Unknown Product'} (x${item.quantity || 1})`)
//       .join(", ");
//     if (
//       window.confirm(
//         `Are you sure you want to cancel this order?\n\nDetails:\n- Order #: ${order._id.slice(-8).toUpperCase()}\n- Items: ${productDetails}\n- Total: ₹${order.total?.toLocaleString() || "—"}`
//       )
//     ) {
//       try {
//         await cancelOrder(id).unwrap();
//         navigate("/orders");
//       } catch (err) {
//         console.error("Cancel error:", err);
//         alert("Failed to cancel order. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto py-8 px-4 max-w-4xl">
//       <Button variant="ghost" onClick={() => navigate("/orders")} className="mb-4">
//         ← Back to Orders
//       </Button>
//       <h1 className="text-3xl font-bold mb-6">Order Details</h1>
//       <Card>
//         <CardHeader>
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <div>
//               <CardTitle className="text-2xl">
//                 Order #{order._id.slice(-8).toUpperCase()}
//               </CardTitle>
//               <CardDescription className="mt-1 flex items-center gap-2">
//                 <Calendar className="h-4 w-4" />
//                 {format(new Date(order.createdAt), "dd MMM yyyy • hh:mm a")}
//               </CardDescription>
//             </div>
//             <Badge variant={order.status === "completed" ? "success" : order.status === "cancelled" ? "destructive" : "secondary"}>
//               {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || "Pending"}
//             </Badge>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-6">
//             <div>
//               <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
//                 <Package className="h-5 w-5" />
//                 Items
//               </h3>
//               <div className="space-y-4">
//                 {order.items?.map((item, index) => (
//                   <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0">
//                     <div className="flex items-center gap-4">
//                       {/* Assuming product has image; fallback to placeholder */}
//                       <img
//                         src={item.product?.image || "/placeholder-image.jpg"}
//                         alt={item.product?.name}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                       <div>
//                         <p className="font-medium">{item.product?.name || "Unknown Product"}</p>
//                         <p className="text-sm text-muted-foreground">
//                           Quantity: {item.quantity || 1}
//                         </p>
//                         <p className="text-sm text-muted-foreground">
//                           Price: <IndianRupee className="inline h-4 w-4" />
//                           {item.product?.price?.toLocaleString() || "—"}
//                         </p>
//                       </div>
//                     </div>
//                     <p className="font-medium text-right">
//                       Subtotal: <IndianRupee className="inline h-4 w-4" />
//                       {((item.product?.price || 0) * (item.quantity || 1)).toLocaleString()}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="flex justify-between text-lg font-semibold pt-4 border-t">
//               <span>Total</span>
//               <span>
//                 <IndianRupee className="inline h-5 w-5" />
//                 {order.total?.toLocaleString() || "—"}
//               </span>
//             </div>
//             {order.status !== "cancelled" && order.status !== "completed" && (
//               <Button
//                 variant="destructive"
//                 onClick={handleCancel}
//                 disabled={isCanceling}
//                 className="w-full sm:w-auto"
//               >
//                 {isCanceling ? "Cancelling..." : "Cancel Order"}
//               </Button>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }