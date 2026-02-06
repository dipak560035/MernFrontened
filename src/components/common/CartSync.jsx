import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCartQuery, useAddToCartMutation } from "../../services/api";
import { setCart } from "../../store/slices/cartSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function CartSync() {
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.token);
  const localItems = useSelector((s) => s.cart.items);
  const [addRemote] = useAddToCartMutation();
  const mergedForToken = useRef(null);
  
  // Only query if we have a token
  const { data, isLoading } = useCartQuery(undefined, {
    skip: !token,
  });

  // Merge guest cart into remote when user logs in
  useEffect(() => {
    if (!token) {
      mergedForToken.current = null;
      return;
    }
    if (mergedForToken.current === token) return;
    if (localItems && localItems.length > 0) {
      (async () => {
        try {
          for (const item of localItems) {
            await addRemote({ productId: item.id, qty: item.qty || 1 }).unwrap();
          }
          mergedForToken.current = token;
        } catch (err) {
          console.warn("Cart merge failed", err);
        }
      })();
    } else {
      mergedForToken.current = token;
    }
  }, [token, localItems, addRemote]);

  useEffect(() => {
    if (token && data && !isLoading) {
      // Transform backend data to frontend structure
      // Backend: { items: [{ product: {...}, qty: 1 }] }
      // Frontend: [{ id, title, price, image, qty }]
      
      const cartItems = (data.items || []).map((item) => {
        const p = item.product || {};
        const image = p.images && p.images.length > 0 
          ? `${BASE_URL}${p.images[0].url}` 
          : "https://placehold.co/400x300?text=No+Image";
          
        return {
          id: p._id,
          title: p.name,
          price: p.price,
          image,
          qty: item.qty,
        };
      });

      // We only update if there are items or if we want to sync empty state
      // To avoid infinite loops or overwrites, we could check for equality, 
      // but Redux checks shallow equality usually.
      // For now, simply dispatching when data changes is safe because 
      // useCartQuery provides stable data reference unless it changes.
      
      dispatch(setCart(cartItems));
    }
  }, [data, isLoading, token, dispatch]);

  return null; // This component renders nothing
}
