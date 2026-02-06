import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import { useParams } from "react-router-dom";
import { useOrderByIdQuery } from "../services/api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function OrderDetails() {
  const { id } = useParams();
  const { data, isLoading } = useOrderByIdQuery(id);
  const order = data?.data;

  return (
    <>
      <PageHero title="Order Details" />
      <Container className="py-12">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 animate-pulse rounded-lg bg-neutral-100" />
            ))}
          </div>
        ) : !order ? (
          <div className="text-center text-neutral-700">Order not found</div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-lg border p-6 shadow-sm">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <div className="text-sm text-neutral-500">Order ID</div>
                  <div className="font-medium">{order._id}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-neutral-500">Placed</div>
                  <div className="font-medium">{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-neutral-500">Status</div>
                  <span className="inline-block rounded-full bg-neutral-100 px-3 py-1 text-sm font-medium">
                    {order.status || "pending"}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-neutral-500">Total</div>
                  <div className="font-medium">Rs. {Number(order.total || 0).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-3">Items</h3>
                <div className="space-y-3">
                  {(order.items || []).map((it, idx) => (
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
                <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>
                <div className="rounded bg-neutral-50 p-4 text-sm">
                  <div>{order.shippingAddress?.firstName} {order.shippingAddress?.lastName}</div>
                  <div>{order.shippingAddress?.address}</div>
                  <div>{order.shippingAddress?.city}, {order.shippingAddress?.province} {order.shippingAddress?.zip}</div>
                  <div>{order.shippingAddress?.country}</div>
                  <div className="mt-2 text-neutral-500">Phone: {order.shippingAddress?.phone}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
