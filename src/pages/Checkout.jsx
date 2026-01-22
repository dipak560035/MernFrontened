import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useSelector } from "react-redux";
import { Toaster, toast } from "sonner";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items);
  const total = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

  const placeOrder = (e) => {
    e.preventDefault();
    toast.success("Order placed");
  };

  return (
    <>
      <section className="bg-neutral-100">
        <Container className="py-12 text-center">
          <h1 className="text-3xl font-semibold">Checkout</h1>
          <div className="mt-2 text-sm text-neutral-600">Home › Checkout</div>
        </Container>
      </section>
      <Container className="py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <form className="space-y-4" onSubmit={placeOrder}>
            <h3 className="text-xl font-semibold">Billing details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input className="col-span-2" placeholder="Company Name (Optional)" />
              <Input className="col-span-2" placeholder="Country / Region" />
              <Input className="col-span-2" placeholder="Street address" />
              <Input placeholder="Town / City" />
              <Input placeholder="Province" />
              <Input placeholder="ZIP code" />
              <Input placeholder="Phone" />
              <Input className="col-span-2" placeholder="Email address" />
              <Input className="col-span-2" placeholder="Additional Information" />
            </div>
            <Button type="submit">Place order</Button>
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
