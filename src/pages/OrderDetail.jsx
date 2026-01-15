import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderQuery } from "@/services/api";
import { Button } from "@/components/ui/button";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: order, isLoading, error } = useGetOrderQuery(id);

  if (isLoading) return <div className="p-6">Loading order...</div>;
  if (error || !order) return <div className="p-6">Order not found</div>;

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-2">Order #{order.orderNumber || order._id}</h1>
      <p className="text-sm text-muted-foreground">
        Placed on {new Date(order.createdAt).toLocaleDateString()}
      </p>

      <div className="mt-6 space-y-3">
        {order.items?.map((item, i) => (
          <div key={i} className="flex items-center justify-between border rounded p-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity} × Rs.{item.price}
              </p>
            </div>
            <p className="font-semibold">Rs.{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-sm text-muted-foreground">Total</p>
        <p className="text-2xl font-bold">Rs.{order.total}</p>
      </div>
    </div>
  );
}