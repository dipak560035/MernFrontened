import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import { Link } from "react-router-dom";
import { useOrdersQuery, useCancelOrderMutation } from "../services/api";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Orders() {
  const { data, isLoading } = useOrdersQuery();
  const [cancelOrder, { isLoading: cancelling }] = useCancelOrderMutation();

  const orders = Array.isArray(data?.data) ? data.data : [];

  const handleCancel = async (id, status) => {
    if (["shipped", "delivered", "cancelled"].includes(status)) {
      toast.error(`Cannot cancel ${status} order`);
      return;
    }
    try {
      await cancelOrder(id).unwrap();
      toast.success("Order cancelled");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to cancel order");
    }
  };

  return (
    <>
      <PageHero title="My Orders" />
      <Container className="py-12">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-neutral-100" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-700">You have no orders yet.</p>
            <Link to="/shop" className="mt-4 inline-block rounded-md border border-black px-6 py-2 hover:bg-black hover:text-white">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((o) => (
              <div key={o._id} className="rounded-lg border p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
                  <div className="space-y-1">
                    <div className="text-sm text-neutral-500">Order ID</div>
                    <div className="font-medium">{o._id}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-neutral-500">Placed</div>
                    <div className="font-medium">{o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-neutral-500">Status</div>
                    <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
                      {o.status || "pending"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-neutral-500">Total</div>
                    <div className="font-medium">Rs. {Number(o.total || 0).toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm text-neutral-500 mb-2">Items</div>
                    <div className="space-y-3">
                      {(o.items || []).map((it, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <div className="h-16 w-16 overflow-hidden rounded bg-neutral-100">
                            <img
                              src={it.image ? `${BASE_URL}${it.image}` : "https://placehold.co/200x200?text=No+Image"}
                              alt={it.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{it.name}</div>
                            <div className="text-sm text-neutral-500">Qty: {it.qty} • Rs. {Number(it.price).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500 mb-2">Shipping Address</div>
                    <div className="rounded bg-neutral-50 p-4 text-sm">
                      <div>{o.shippingAddress?.firstName} {o.shippingAddress?.lastName}</div>
                      <div>{o.shippingAddress?.address}</div>
                      <div>{o.shippingAddress?.city}, {o.shippingAddress?.province} {o.shippingAddress?.zip}</div>
                      <div>{o.shippingAddress?.country}</div>
                      <div className="mt-2 text-neutral-500">Phone: {o.shippingAddress?.phone}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link
                    to={`/orders/${o._id}`}
                    className="rounded-md border border-black px-4 py-2 text-sm hover:bg-black hover:text-white"
                  >
                    View Details
                  </Link>
                  <button
                    disabled={cancelling}
                    onClick={() => handleCancel(o._id, o.status)}
                    className="rounded-md border border-red-600 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    Cancel Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
