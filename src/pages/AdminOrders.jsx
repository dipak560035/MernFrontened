import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import { useAdminAllOrdersQuery, useAdminUpdateOrderStatusMutation } from "../services/api";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function AdminOrders() {
  const { data, isLoading } = useAdminAllOrdersQuery();
  const [updateStatus] = useAdminUpdateOrderStatusMutation();
  const orders = Array.isArray(data?.data) ? data.data : [];

  const handleUpdate = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
      toast.success("Order status updated");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update status");
    }
  };

  return (
    <>
      <PageHero title="All Orders" />
      <Container className="py-12">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-neutral-100" />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((o) => (
              <div key={o._id} className="rounded-lg border p-6 shadow-sm">
                <div className="grid gap-4 md:grid-cols-4">
                  <div>
                    <div className="text-sm text-neutral-500">Order ID</div>
                    <div className="font-medium">{o._id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500">User ID</div>
                    <div className="font-medium">{o.user?._id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-neutral-500">Placed</div>
                    <div className="font-medium">{o.createdAt ? new Date(o.createdAt).toLocaleString() : "-"}</div>
                  </div>
                  <div>
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
                          <div className="h-14 w-14 overflow-hidden rounded bg-neutral-100">
                            <img
                              src={it.image ? `${BASE_URL}${it.image}` : "https://placehold.co/200x200?text=No+Image"}
                              alt={it.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{it.name}</div>
                            <div className="text-xs text-neutral-500">Qty: {it.qty} • Rs. {Number(it.price).toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* <div>
                    <div className="text-sm text-neutral-500 mb-2">Shipping Address</div>
                    <div className="rounded bg-neutral-50 p-4 text-sm">
                      <div>{o.shippingAddress?.firstName} {o.shippingAddress?.lastName}</div>
                      <div>{o.shippingAddress?.address}</div>
                      <div>{o.shippingAddress?.city}, {o.shippingAddress?.province} {o.shippingAddress?.zip}</div>
                      <div>{o.shippingAddress?.country}</div>
                      <div className="mt-2 text-neutral-500">Phone: {o.shippingAddress?.phone}</div>
                    </div>
                  </div> */}
                  <div>
  <div className="text-sm text-neutral-500 mb-2">Shipping Address</div>
  <div className="rounded bg-neutral-50 p-4 text-sm space-y-1">
    <div>{o.shippingAddress?.firstName} {o.shippingAddress?.lastName}</div>
    <div>{o.shippingAddress?.line1}</div>
    {o.shippingAddress?.line2 && <div>{o.shippingAddress.line2}</div>}
    <div>{o.shippingAddress?.city}, {o.shippingAddress?.state} {o.shippingAddress?.postalCode}</div>
    <div>{o.shippingAddress?.country}</div>
    <div>Email: {o.shippingAddress?.email}</div>
    <div>Phone: {o.shippingAddress?.phone}</div>
  </div>
</div>

                </div>

                <div className="mt-6 flex items-center gap-3">
                  <select
                    defaultValue={o.status || "pending"}
                    onChange={(e) => handleUpdate(o._id, e.target.value)}
                    className="rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="pending">Pending</option>
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
