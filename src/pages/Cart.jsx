// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import Button from "../components/ui/button";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, updateQty } from "../store/slices/cartSlice";
// import {
//   useCartQuery,
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
// } from "../services/api";
// import { Link } from "react-router-dom";
// import { Trash2 } from "lucide-react";

// export default function Cart() {
//   const items = useSelector((s) => s.cart.items);
//   const dispatch = useDispatch();
//   // We use local items for display but keep remote in sync
//   const { data: _remoteData } = useCartQuery(undefined, { skip: !items.length });
//   const [updateRemote] = useUpdateCartItemMutation();
//   const [removeRemote] = useRemoveCartItemMutation();

//   const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

//   return (
//     <>
//       <PageHero title="Cart" />
//       <Container className="py-12">
//         {items.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <div className="text-xl font-medium text-neutral-900">Your cart is empty</div>
//             <Link to="/shop" className="mt-4 rounded-md border border-black px-6 py-2 transition-colors hover:bg-black hover:text-white">
//               Browse Products
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-8 lg:grid-cols-3">
//             {/* Cart Items Table */}
//             <div className="lg:col-span-2">
//               <div className="hidden md:grid grid-cols-12 gap-4 bg-[#F9F1E7] p-4 font-medium mb-4">
//                  <div className="col-span-6">Product</div>
//                  <div className="col-span-2">Price</div>
//                  <div className="col-span-2">Quantity</div>
//                  <div className="col-span-2">Subtotal</div>
//               </div>

//               <div className="space-y-6">
//                 {items.map((i) => (
//                   <div key={i.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b pb-4 md:border-none md:pb-0">
//                     <div className="md:col-span-6 flex items-center gap-4">
//                       <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F9F1E7]">
//                         {i.image ? (
//                            <img src={i.image} alt={i.title} className="h-full w-full object-cover" />
//                         ) : (
//                            <div className="h-full w-full flex items-center justify-center text-neutral-400 text-xs">No Image</div>
//                         )}
//                       </div>
//                       <div className="md:hidden font-medium">{i.title}</div>
//                       <div className="hidden md:block text-neutral-500">{i.title}</div>
//                     </div>

//                     <div className="flex justify-between md:block md:col-span-2">
//                         <span className="md:hidden text-neutral-500">Price: </span>
//                         <span className="text-neutral-500">Rs. {i.price.toLocaleString()}</span>
//                     </div>

//                     <div className="flex justify-between md:block md:col-span-2">
//                         <span className="md:hidden text-neutral-500">Quantity: </span>
//                         <div className="flex items-center rounded-md border border-neutral-300 w-fit">
//                             <button 
//                                 className="px-2 py-1 hover:bg-neutral-100"
//                                 onClick={async () => {
//                                     const newQty = Math.max(1, (i.qty || 1) - 1);
//                                     dispatch(updateQty({ id: i.id, qty: newQty }));
//                                     try { await updateRemote({ productId: i.id, qty: newQty }); } catch (err) { console.error(err); }
//                                 }}
//                             >
//                                 -
//                             </button>
//                             <span className="px-2 text-sm">{i.qty || 1}</span>
//                             <button 
//                                 className="px-2 py-1 hover:bg-neutral-100"
//                                 onClick={async () => {
//                                     const newQty = (i.qty || 1) + 1;
//                                     dispatch(updateQty({ id: i.id, qty: newQty }));
//                                     try { await updateRemote({ productId: i.id, qty: newQty }); } catch (err) { console.error(err); }
//                                 }}
//                             >
//                                 +
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex justify-between items-center md:col-span-2">
//                          <span className="md:hidden text-neutral-500">Subtotal: </span>
//                          <span className="font-medium">Rs. {(i.price * (i.qty || 1)).toLocaleString()}</span>
//                          <button 
//                             className="text-[#B88E2F] hover:text-red-600 transition-colors ml-4"
//                             onClick={async () => {
//                                 dispatch(removeFromCart(i.id));
//                                 try { await removeRemote(i.id); } catch (err) { console.error(err); }
//                             }}
//                          >
//                             <Trash2 size={20} fill="currentColor" />
//                          </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Cart Totals */}
//             <div className="h-fit bg-[#F9F1E7] p-8 pt-4">
//               <h2 className="text-xl font-semibold mb-8 text-center">Cart Totals</h2>
              
//               <div className="space-y-4 mb-8">
//                   <div className="flex justify-between items-center">
//                       <span className="font-medium">Subtotal</span>
//                       <span className="text-neutral-500">Rs. {subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                       <span className="font-medium">Total</span>
//                       <span className="text-xl font-medium text-[#B88E2F]">Rs. {subtotal.toLocaleString()}</span>
//                   </div>
//               </div>

//               <Link to="/checkout">
//                 <button className="w-full rounded-md border border-black py-3 text-black transition-colors hover:bg-black hover:text-white">
//                     Check Out
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// }

























// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import Button from "../components/ui/button";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, setCart, updateQty } from "../store/slices/cartSlice";
// import {
//   useCartQuery,
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
// } from "../services/api";
// import { Link } from "react-router-dom";
// import { Trash2 } from "lucide-react";
// import { useEffect } from "react";

// export default function Cart() {
//   const dispatch = useDispatch();
//   const items = useSelector((s) => s.cart.items);

//   // Fetch cart from backend
//   const { data: remoteCart, isFetching } = useCartQuery();

//   const [updateRemote] = useUpdateCartItemMutation();
//   const [removeRemote] = useRemoveCartItemMutation();

//   // Populate Redux with backend cart on load
//   useEffect(() => {
//     if (remoteCart?.data) {
//       const backendItems = remoteCart.data.items.map((i) => ({
//         id: i.product._id,
//         title: i.product.name,
//         price: i.product.price,
//         image: i.product.images?.[0]?.url || "",
//         qty: i.qty,
//       }));
//       dispatch(setCart(backendItems));
//     }
//   }, [remoteCart, dispatch]);

//   const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

//   return (
//     <>
//       <PageHero title="Cart" />
//       <Container className="py-12">
//         {isFetching ? (
//           <div className="text-center py-12">Loading...</div>
//         ) : items.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <div className="text-xl font-medium text-neutral-900">Your cart is empty</div>
//             <Link to="/shop" className="mt-4 rounded-md border border-black px-6 py-2 transition-colors hover:bg-black hover:text-white">
//               Browse Products
//             </Link>
//           </div>
//         ) : (
//           <div className="grid gap-8 lg:grid-cols-3">
//             {/* Cart Items Table */}
//             <div className="lg:col-span-2">
//               <div className="hidden md:grid grid-cols-12 gap-4 bg-[#F9F1E7] p-4 font-medium mb-4">
//                  <div className="col-span-6">Product</div>
//                  <div className="col-span-2">Price</div>
//                  <div className="col-span-2">Quantity</div>
//                  <div className="col-span-2">Subtotal</div>
//               </div>

//               <div className="space-y-6">
//                 {items.map((i) => (
//                   <div key={i.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b pb-4 md:border-none md:pb-0">
//                     <div className="md:col-span-6 flex items-center gap-4">
//                       <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F9F1E7]">
//                         {i.image ? (
//                            <img src={i.image} alt={i.title} className="h-full w-full object-cover" />
//                         ) : (
//                            <div className="h-full w-full flex items-center justify-center text-neutral-400 text-xs">No Image</div>
//                         )}
//                       </div>
//                       <div className="md:hidden font-medium">{i.title}</div>
//                       <div className="hidden md:block text-neutral-500">{i.title}</div>
//                     </div>

//                     <div className="flex justify-between md:block md:col-span-2">
//                         <span className="md:hidden text-neutral-500">Price: </span>
//                         <span className="text-neutral-500">Rs. {i.price.toLocaleString()}</span>
//                     </div>

//                     <div className="flex justify-between md:block md:col-span-2">
//                         <span className="md:hidden text-neutral-500">Quantity: </span>
//                         <div className="flex items-center rounded-md border border-neutral-300 w-fit">
//                             <button 
//                                 className="px-2 py-1 hover:bg-neutral-100"
//                                 onClick={async () => {
//                                     const newQty = Math.max(1, (i.qty || 1) - 1);
//                                     dispatch(updateQty({ id: i.id, qty: newQty }));
//                                     try { await updateRemote({ productId: i.id, qty: newQty }); } catch (err) { console.error(err); }
//                                 }}
//                             >
//                                 -
//                             </button>
//                             <span className="px-2 text-sm">{i.qty || 1}</span>
//                             <button 
//                                 className="px-2 py-1 hover:bg-neutral-100"
//                                 onClick={async () => {
//                                     const newQty = (i.qty || 1) + 1;
//                                     dispatch(updateQty({ id: i.id, qty: newQty }));
//                                     try { await updateRemote({ productId: i.id, qty: newQty }); } catch (err) { console.error(err); }
//                                 }}
//                             >
//                                 +
//                             </button>
//                         </div>
//                     </div>

//                     <div className="flex justify-between items-center md:col-span-2">
//                          <span className="md:hidden text-neutral-500">Subtotal: </span>
//                          <span className="font-medium">Rs. {(i.price * (i.qty || 1)).toLocaleString()}</span>
//                          <button 
//                             className="text-[#B88E2F] hover:text-red-600 transition-colors ml-4"
//                             onClick={async () => {
//                                 dispatch(removeFromCart(i.id));
//                                 try { await removeRemote(i.id); } catch (err) { console.error(err); }
//                             }}
//                          >
//                             <Trash2 size={20} fill="currentColor" />
//                          </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Cart Totals */}
//             <div className="h-fit bg-[#F9F1E7] p-8 pt-4">
//               <h2 className="text-xl font-semibold mb-8 text-center">Cart Totals</h2>
              
//               <div className="space-y-4 mb-8">
//                   <div className="flex justify-between items-center">
//                       <span className="font-medium">Subtotal</span>
//                       <span className="text-neutral-500">Rs. {subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                       <span className="font-medium">Total</span>
//                       <span className="text-xl font-medium text-[#B88E2F]">Rs. {subtotal.toLocaleString()}</span>
//                   </div>
//               </div>

//               <Link to="/checkout">
//                 <button className="w-full rounded-md border border-black py-3 text-black transition-colors hover:bg-black hover:text-white">
//                     Check Out
//                 </button>
//               </Link>
//             </div>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// }






































import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQty, setCart } from "../store/slices/cartSlice";
import { useCartQuery, useUpdateCartItemMutation, useRemoveCartItemMutation } from "../services/api";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useEffect, useRef } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items);

  // Fetch backend cart
  const { data: remoteCart, isLoading } = useCartQuery();
  const [updateRemote] = useUpdateCartItemMutation();
  const [removeRemote] = useRemoveCartItemMutation();

  const hasSynced = useRef(false); // ensures one-time merge

  useEffect(() => {
    if (!hasSynced.current && remoteCart?.data) {
      hasSynced.current = true;

      // Map backend items
      const backendItems = remoteCart.data.items.map((i) => ({
        id: i.product._id,
        title: i.product.name,
        price: i.product.price,
        image: i.product.images?.[0]?.url ? `${BASE_URL}${i.product.images[0].url}` : "",
        qty: i.qty,
      }));

      // Merge with local items
      const localItems = items.slice(); // copy of current Redux items
      const merged = [...backendItems];

      localItems.forEach((localItem) => {
        const exists = merged.find((i) => i.id === localItem.id);
        if (!exists) merged.push(localItem); // add only if not in backend
      });

      dispatch(setCart(merged));
    }
  }, [remoteCart, dispatch, items]);

  const subtotal = items.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

  return (
    <>
      <PageHero title="Cart" />
      <Container className="py-12">
        {isLoading ? (
          <div className="text-center py-12">Loading...</div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-xl font-medium text-neutral-900">Your cart is empty</div>
            <Link to="/shop" className="mt-4 rounded-md border border-black px-6 py-2 transition-colors hover:bg-black hover:text-white">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {/* Table headers */}
              <div className="hidden md:grid grid-cols-12 gap-4 bg-[#F9F1E7] p-4 font-medium mb-4">
                <div className="col-span-6">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Subtotal</div>
              </div>

              <div className="space-y-6">
                {items.map((i) => (
                  <div key={i.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border-b pb-4 md:border-none md:pb-0">
                    <div className="md:col-span-6 flex items-center gap-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#F9F1E7]">
                        {i.image ? (
                          <img src={i.image} alt={i.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-neutral-400 text-xs">No Image</div>
                        )}
                      </div>
                      <div className="md:hidden font-medium">{i.title}</div>
                      <div className="hidden md:block text-neutral-500">{i.title}</div>
                    </div>

                    <div className="flex justify-between md:block md:col-span-2">
                      <span className="md:hidden text-neutral-500">Price: </span>
                      <span className="text-neutral-500">Rs. {i.price.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between md:block md:col-span-2">
                      <span className="md:hidden text-neutral-500">Quantity: </span>
                      <div className="flex items-center rounded-md border border-neutral-300 w-fit">
                        <button
                          className="px-2 py-1 hover:bg-neutral-100"
                          onClick={async () => {
                            const newQty = Math.max(1, (i.qty || 1) - 1);
                            dispatch(updateQty({ id: i.id, qty: newQty }));
                            try {
                              await updateRemote({ productId: i.id, qty: newQty }).unwrap();
                            } catch (err) {
                              console.error("Update cart failed", err);
                            }
                          }}
                        >
                          -
                        </button>
                        <span className="px-2 text-sm">{i.qty || 1}</span>
                        <button
                          className="px-2 py-1 hover:bg-neutral-100"
                          onClick={async () => {
                            const newQty = (i.qty || 1) + 1;
                            dispatch(updateQty({ id: i.id, qty: newQty }));
                            try {
                              await updateRemote({ productId: i.id, qty: newQty }).unwrap();
                            } catch (err) {
                              console.error("Update cart failed", err);
                            }
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center md:col-span-2">
                      <span className="md:hidden text-neutral-500">Subtotal: </span>
                      <span className="font-medium">Rs. {(i.price * (i.qty || 1)).toLocaleString()}</span>
                      <button
                        className="text-[#B88E2F] hover:text-red-600 transition-colors ml-4"
                        onClick={async () => {
                          dispatch(removeFromCart(i.id));
                          try { await removeRemote(i.id); } catch (err) { console.error(err); }
                        }}
                      >
                        <Trash2 size={20} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cart Totals */}
            <div className="h-fit bg-[#F9F1E7] p-8 pt-4">
              <h2 className="text-xl font-semibold mb-8 text-center">Cart Totals</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-neutral-500">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-medium text-[#B88E2F]">Rs. {subtotal.toLocaleString()}</span>
                </div>
              </div>

              <Link to="/checkout">
                <button className="w-full rounded-md border border-black py-3 text-black transition-colors hover:bg-black hover:text-white">
                  Check Out
                </button>
              </Link>
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
