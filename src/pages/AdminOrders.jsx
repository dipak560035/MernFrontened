




import { useEffect, useState } from "react";
import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import { useAdminAllOrdersQuery, useAdminUpdateOrderStatusMutation } from "../services/api";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function AdminOrders() {
  const { data, isLoading, refetch } = useAdminAllOrdersQuery();
  const [updateStatus] = useAdminUpdateOrderStatusMutation();
  
  const [orders, setOrders] = useState([]);

  // Populate orders from query
  useEffect(() => {
    if (data?.data) {
      setOrders(data.data);
    }
  }, [data]);

  const handleChange = async (orderId, newStatus) => {
    try {
      const updatedOrder = await updateStatus({ id: orderId, status: newStatus }).unwrap();
      toast.success("Order status updated");

      // Update local orders state
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? updatedOrder : o))
      );
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      <PageHero title="All Orders" />
      <Container className="py-12">
        {isLoading ? (
          <div>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div>No orders found</div>
        ) : (
          <div className="space-y-8">
            {orders.map((o) => (
              <div key={o._id} className="rounded-lg border p-6 shadow-sm">
                <div className="grid gap-4 md:grid-cols-4">
                  <div>Order ID: {o._id}</div>
                  <div>User: {o.user?.name || "Unknown"}</div>
                  <div>Placed: {new Date(o.createdAt).toLocaleString()}</div>
                  <div>Total: Rs. {o.total}</div>
                </div>

                {/* Dropdown for status */}
                <div className="mt-4">
                  <select
                    value={o.status || "pending"} // controlled value
                    onChange={(e) => handleChange(o._id, e.target.value)}
                    className="rounded-md border px-3 py-2 text-sm cursor-pointer"
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
