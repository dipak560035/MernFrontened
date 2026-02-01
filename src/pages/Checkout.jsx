import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import { useCreateOrderMutation } from "../services/api";
import { clearCart } from "../store/slices/cartSlice";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const placeOrder = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      shippingAddress: {
        firstName: form.get("firstName"),
        lastName: form.get("lastName"),
        country: form.get("country"),
        address: form.get("address"),
        city: form.get("city"),
        province: form.get("province"),
        zip: form.get("zip"),
        phone: form.get("phone"),
        email: form.get("email"),
      },
    };
    try {
      await createOrder(payload).unwrap();
      dispatch(clearCart());
      toast.success("Order placed");
    } catch (err) {
      console.error("Order failed", err);
      toast.error("Could not place order");
    }
  };

  return (
    <>
      <PageHero title="Checkout" />
      <Container className="py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <form className="space-y-4" onSubmit={placeOrder}>
            <h3 className="text-xl font-semibold">Billing details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input name="firstName" placeholder="First Name" />
              <Input name="lastName" placeholder="Last Name" />
              <Input className="col-span-2" name="company" placeholder="Company Name (Optional)" />
              <Input className="col-span-2" name="country" placeholder="Country / Region" />
              <Input className="col-span-2" name="address" placeholder="Street address" />
              <Input name="city" placeholder="Town / City" />
              <Input name="province" placeholder="Province" />
              <Input name="zip" placeholder="ZIP code" />
              <Input name="phone" placeholder="Phone" />
              <Input className="col-span-2" name="email" placeholder="Email address" />
              <Input className="col-span-2" placeholder="Additional Information" />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Placing order..." : "Place order"}
            </Button>
          </form>
          <div>
            <h3 className="text-xl font-semibold">Product</h3>
            <div className="mt-4 space-y-3">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span>
                    {i.title} × {i.qty || 1}
                  </span>
                  <span>Rs. {(i.price * (i.qty || 1)).toLocaleString()}</span>
                </div>
              ))}
              <div className="mt-4 flex justify-between border-t pt-3 font-medium">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="radio" defaultChecked />
                  Direct Bank Transfer
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" />
                  Cash on Delivery
                </label>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Toaster richColors />
    </>
  );
}
