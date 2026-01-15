

import { useGetOrdersQuery } from "@/services/api";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { data: orders, isLoading } = useGetOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) return <div className="p-6">Loading orders...</div>;

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>No orders yet</CardTitle>
            <CardDescription>Start shopping to see your orders here!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/")}>Start Shopping</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-4">My Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id || order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Order #{order.orderNumber || order._id}</CardTitle>
                <span className="text-sm">{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {order.items?.length || 0} items • Total Rs.{order.total}
                </p>
              </div>
              <Button variant="outline" onClick={() => navigate(`/orders/${order._id || order.id}`)}>
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}














// import { useSelector } from 'react-redux';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { Separator } from '@/components/ui/separator';
// import { Package, ArrowLeft, Eye, Calendar, Truck } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function Orders() {
//   const { user } = useSelector((state) => state.auth);
//   const navigate = useNavigate();
  
//   // TODO: Replace with actual orders from Redux store or API
//   const orders = [];

//   if (!user) {
//     return (
//       <div className="container mx-auto p-6 max-w-4xl">
//         <Card>
//           <CardHeader>
//             <CardTitle>Please Login</CardTitle>
//             <CardDescription>You need to be logged in to view your orders</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Button onClick={() => navigate('/login')}>Go to Login</Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { variant: 'secondary', label: 'Pending' },
//       processing: { variant: 'default', label: 'Processing' },
//       shipped: { variant: 'default', label: 'Shipped' },
//       delivered: { variant: 'default', label: 'Delivered' },
//       cancelled: { variant: 'destructive', label: 'Cancelled' },
//     };
//     const config = statusConfig[status] || statusConfig.pending;
//     return <Badge variant={config.variant}>{config.label}</Badge>;
//   };

//   return (
//     <div className="container mx-auto p-4 md:p-6 max-w-7xl min-h-screen">
//       <div className="mb-6">
//         <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back
//         </Button>
//         <h1 className="text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
//         <p className="text-muted-foreground">View and track your order history</p>
//       </div>

//       {orders.length === 0 ? (
//         <Card>
//           <CardContent className="flex flex-col items-center justify-center py-20">
//             <Package className="h-16 w-16 text-muted-foreground mb-4" />
//             <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
//             <p className="text-muted-foreground mb-6">Start shopping to see your orders here!</p>
//             <Button onClick={() => navigate('/')}>
//               <Package className="mr-2 h-4 w-4" />
//               Start Shopping
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="space-y-4">
//           {orders.map((order) => (
//             <Card key={order.id}>
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <CardTitle className="mb-2">Order #{order.orderNumber}</CardTitle>
//                     <CardDescription className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4" />
//                       Placed on {new Date(order.createdAt).toLocaleDateString()}
//                     </CardDescription>
//                   </div>
//                   {getStatusBadge(order.status)}
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {/* Order Items */}
//                   <div className="space-y-3">
//                     {order.items.map((item, index) => (
//                       <div key={index}>
//                         <div className="flex gap-4">
//                           <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
//                             <img 
//                               src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'} 
//                               alt={item.name}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>
//                           <div className="flex-1">
//                             <h4 className="font-semibold">{item.name}</h4>
//                             <p className="text-sm text-muted-foreground">
//                               Quantity: {item.quantity} × ${item.price}
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
//                           </div>
//                         </div>
//                         {index < order.items.length - 1 && <Separator className="my-3" />}
//                       </div>
//                     ))}
//                   </div>

//                   <Separator />

//                   {/* Order Summary */}
//                   <div className="flex items-center justify-between">
//                     <div className="space-y-1">
//                       <p className="text-sm text-muted-foreground">Total Amount</p>
//                       <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
//                     </div>
//                     <div className="flex gap-2">
//                       {order.status === 'shipped' && (
//                         <Button variant="outline" size="sm">
//                           <Truck className="mr-2 h-4 w-4" />
//                           Track Order
//                         </Button>
//                       )}
//                       <Button variant="outline" size="sm" onClick={() => navigate(`/order/${order.id}`)}>
//                         <Eye className="mr-2 h-4 w-4" />
//                         View Details
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
