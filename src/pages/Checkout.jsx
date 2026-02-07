// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useSelector, useDispatch } from "react-redux";
// import { Toaster, toast } from "sonner";
// import { useCreateOrderMutation, useAddToCartMutation } from "../services/api";
// import { clearCart } from "../store/slices/cartSlice";
// import { useClearCartRemoteMutation } from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function Checkout() {
//   const items = useSelector((s) => s.cart.items);
//   const total = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
//   const dispatch = useDispatch();
//   const [createOrder, { isLoading }] = useCreateOrderMutation();
//   const [clearRemote] = useClearCartRemoteMutation();
//   const navigate = useNavigate();
//   const [addRemote] = useAddToCartMutation();

//   const placeOrder = async (e) => {
//     e.preventDefault();
//     const form = new FormData(e.currentTarget);
//     const payload = {
//       shippingAddress: {
//         firstName: form.get("firstName"),
//         lastName: form.get("lastName"),
//         country: form.get("country"),
//         address: form.get("address"),
//         city: form.get("city"),
//         province: form.get("province"),
//         zip: form.get("zip"),
//         phone: form.get("phone"),
//         email: form.get("email"),
//       },
//     };
//     // Basic required field check to avoid server-side validation issues
//     if (!payload.shippingAddress.firstName || !payload.shippingAddress.lastName || !payload.shippingAddress.address || !payload.shippingAddress.city || !payload.shippingAddress.phone) {
//       toast.error("Please fill in required billing details");
//       return;
//     }
//     try {
//       const paymentMethod = form.get("paymentMethod") || "bank";
//       await createOrder({ ...payload, paymentMethod }).unwrap();
//       try {
//         await clearRemote().unwrap();
//       } catch (err) {
//         console.warn("Remote cart clear failed", err);
//       }
//       dispatch(clearCart());
//       toast.success("Order placed");
//       navigate("/orders");
//     } catch (err) {
//       console.error("Order failed", err);
//       toast.error(err?.data?.message || "Could not place order");
//     }
//   };

//   return (
//     <>
//       <PageHero title="Checkout" />
//       <Container className="py-12">
//         <div className="grid gap-12 md:grid-cols-2">
//           <form className="space-y-4" onSubmit={placeOrder}>
//             <h3 className="text-xl font-semibold">Billing details</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <Input name="firstName" placeholder="First Name" />
//               <Input name="lastName" placeholder="Last Name" />
//               <Input className="col-span-2" name="company" placeholder="Company Name (Optional)" />
//               <Input className="col-span-2" name="country" placeholder="Country / Region" />
//               <Input className="col-span-2" name="address" placeholder="Street address" />
//               <Input name="city" placeholder="Town / City" />
//               <Input name="province" placeholder="Province" />
//               <Input name="zip" placeholder="ZIP code" />
//               <Input name="phone" placeholder="Phone" />
//               <Input className="col-span-2" name="email" placeholder="Email address" />
//               <Input className="col-span-2" placeholder="Additional Information" />
//             </div>
//             <Button type="submit" disabled={isLoading}>
//               {isLoading ? "Placing order..." : "Place order"}
//             </Button>
//           </form>
//           <div>
//             <h3 className="text-xl font-semibold">Product</h3>
//             <div className="mt-4 space-y-3">
//               {items.map((i) => (
//                 <div key={i.id} className="flex justify-between text-sm">
//                   <span>
//                     {i.title} × {i.qty || 1}
//                   </span>
//                   <span>Rs. {(i.price * (i.qty || 1)).toLocaleString()}</span>
//                 </div>
//               ))}
//               <div className="mt-4 flex justify-between border-t pt-3 font-medium">
//                 <span>Total</span>
//                 <span>Rs. {total.toLocaleString()}</span>
//               </div>
//               <div className="mt-6 space-y-2 text-sm">
//             <label className="flex items-center gap-2">
//               <input type="radio" name="paymentMethod" value="bank" defaultChecked />
//               Direct Bank Transfer
//             </label>
//             <div className="ml-6 text-neutral-500">
//               We will contact you with bank details to complete payment securely.
//             </div>
//             <label className="flex items-center gap-2 mt-2">
//               <input type="radio" name="paymentMethod" value="cod" />
//               Cash on Delivery
//             </label>
//             <div className="ml-6 text-neutral-500">
//               Pay with cash upon delivery at your shipping address.
//             </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Toaster richColors />
//     </>
//   );
// }












































import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import { useCreateOrderMutation, useClearCartRemoteMutation } from "../services/api";
import { clearCart } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const items = useSelector((s) => s.cart.items || []);
  const total = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  const dispatch = useDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [clearRemote] = useClearCartRemoteMutation();
  const navigate = useNavigate();

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

    // Basic required field validation
    if (
      !payload.shippingAddress.firstName ||
      !payload.shippingAddress.lastName ||
      !payload.shippingAddress.address ||
      !payload.shippingAddress.city ||
      !payload.shippingAddress.phone ||
      !payload.shippingAddress.zip
    ) {
      toast.error("Please fill in all required billing details");
      return;
    }

    try {
      const paymentMethod = form.get("paymentMethod") || "bank";

      // Create order
      await createOrder({ ...payload, paymentMethod }).unwrap();

      // Clear remote cart (server-side)
      try {
        await clearRemote().unwrap();
      } catch (err) {
        console.warn("Remote cart clear failed", err);
      }

      // Clear local cart
      dispatch(clearCart());

      toast.success("Order placed successfully");
      navigate("/orders");
    } catch (err) {
      console.error("Order failed", err);
      toast.error(err?.data?.message || "Could not place order");
    }
  };

  return (
    <>
      <PageHero title="Checkout" />
      <Container className="py-12">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Billing Form */}
          <form className="space-y-6" onSubmit={placeOrder}>
            <h3 className="text-xl font-semibold">Billing Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input name="firstName" placeholder="First Name*" required />
              <Input name="lastName" placeholder="Last Name*" required />
              <Input className="col-span-2" name="company" placeholder="Company Name (Optional)" />
              <Input className="col-span-2" name="country" placeholder="Country / Region*" required />
              <Input className="col-span-2" name="address" placeholder="Street Address*" required />
              <Input name="city" placeholder="Town / City*" required />
              <Input name="province" placeholder="Province / State*" required />
              <Input name="zip" placeholder="ZIP / Postal Code* " required />
              <Input name="phone" placeholder="Phone*" required />
              <Input className="col-span-2" name="email" placeholder="Email Address" />
              <Input className="col-span-2" name="notes" placeholder="Additional Information" />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Placing order..." : "Place Order"}
            </Button>
          </form>

          {/* Order Summary */}
          <div>
            <h3 className="text-xl font-semibold">Your Order</h3>
            <div className="mt-4 space-y-3 border rounded-lg p-4 bg-neutral-50">
              {items.length === 0 && <p className="text-sm text-neutral-500">Cart is empty</p>}
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

              {/* Payment Options */}
              <div className="mt-6 space-y-2 text-sm">
                <label className="flex items-center gap-2">
                  <input type="radio" name="paymentMethod" value="bank" defaultChecked />
                  Direct Bank Transfer
                </label>
                <div className="ml-6 text-neutral-500 text-xs">
                  We will contact you with bank details to complete payment securely.
                </div>
                <label className="flex items-center gap-2 mt-2">
                  <input type="radio" name="paymentMethod" value="cod" />
                  Cash on Delivery
                </label>
                <div className="ml-6 text-neutral-500 text-xs">
                  Pay with cash upon delivery at your shipping address.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Toaster richColors />
    </>
  );
}
