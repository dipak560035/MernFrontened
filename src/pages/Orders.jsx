


// import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
// import { useGetOrdersQuery } from "@/app/mainApi";

// export default function Orders() {
//   const { data: orders, isLoading } = useGetOrdersQuery();
//   const navigate = useNavigate();

//   if (isLoading) return <div className="p-6">Loading orders...</div>;

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="container mx-auto p-6 max-w-4xl">
//         <Card>
//           <CardHeader>
//             <CardTitle>No orders yet</CardTitle>
//             <CardDescription>Start shopping to see your orders here!</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button onClick={() => navigate("/")}>Start Shopping</Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h1 className="text-3xl font-bold mb-4">My Orders</h1>
//       <div className="space-y-4">
//         {orders.map((order) => (
//           <Card key={order._id || order.id}>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <CardTitle>Order #{order.orderNumber || order._id}</CardTitle>
//                 <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
//               </div>
//             </CardHeader>
//             <CardContent className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-muted-foreground">
//                   {order.items?.length || 0} items • Total Rs.{order.total}
//                 </p>
//               </div>
//               <Button variant="outline" onClick={() => navigate(`/orders/${order._id || order.id}`)}>
//                 View Details
//               </Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }





























// src/pages/Orders.jsx
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // optional - if you add status
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
                {/* Optional: show status badge */}
                {/* <Badge variant={order.status === "completed" ? "success" : "secondary"}>
                  {order.status || "Pending"}
                </Badge> */}
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


