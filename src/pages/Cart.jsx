import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Button from "../components/ui/button";
import Quantity from "../components/ui/quantity";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQty } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const items = useSelector((s) => s.cart.items);
  const dispatch = useDispatch();
  const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  return (
    <>
      <PageHero title="Cart" />
      <Container className="py-12">
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-sm text-neutral-600">Your cart is empty.</p>
            <Link to="/shop" className="mt-3 inline-block underline">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid gap-12 md:grid-cols-3">
            <div className="md:col-span-2 space-y-4">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between rounded-md border p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-md bg-neutral-100" />
                    <div>
                      <div className="font-medium">{i.title}</div>
                      <div className="text-sm text-neutral-600">Rs. {i.price.toLocaleString()}</div>
                    </div>
                  </div>
                  <Quantity
                    value={i.qty || 1}
                    onChange={(q) => dispatch(updateQty({ id: i.id, qty: q }))}
                  />
                  <Button variant="outline" onClick={() => dispatch(removeFromCart(i.id))}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={() => dispatch(clearCart())}>
                Clear Cart
              </Button>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <Link to="/checkout">
                <Button className="mt-4 w-full">Checkout</Button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
