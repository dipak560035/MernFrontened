// import { Link } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleWishlist } from "../../store/slices/wishlistSlice";
// import { toast } from "sonner";

// export default function ProductCard({ p }) {
//   const dispatch = useDispatch();
//   const wishlist = useSelector((s) => s.wishlist.items);
//   const inWishlist = wishlist.some((i) => i.id === p.id);

//   const handleWishlist = (e) => {
//     e.preventDefault(); // Prevent navigation
//     e.stopPropagation();
//     dispatch(toggleWishlist({ id: p.id, title: p.title, price: p.price, image: p.image }));
//     toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
//   };

//   return (
//     <Link to={`/product/${p.id}`} className="group block relative">
//       <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100 relative">
//         <img
//           src={p.image}
//           alt={p.title}
//           className="h-full w-full object-cover transition-transform group-hover:scale-105"
//         />
//         <button
//           onClick={handleWishlist}
//           className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-neutral-50"
//         >
//           <Heart
//             className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : "text-neutral-600"}`}
//           />
//         </button>
//       </div>
//       <div className="mt-3 space-y-1">
//         <h4 className="text-base font-medium text-neutral-900">{p.title}</h4>
//         <p className="text-sm font-semibold text-neutral-900">Rs. {p.price?.toLocaleString()}</p>
//       </div>
//     </Link>
//   );
// }


















import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../store/slices/wishlistSlice";
import { addToCart } from "../../store/slices/cartSlice";
import { useAddToCartMutation } from "../../services/api";
import { toast } from "sonner";

export default function ProductCard({ p }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((s) => s.wishlist.items);
  const token = useSelector((s) => s.auth.token);
  const role = useSelector((s) => s.auth.role);
  const inWishlist = wishlist.some((i) => i.id === p.id);
  const outOfStock = typeof p.stock === "number" && p.stock <= 0;
  
  const [addRemote] = useAddToCartMutation();

  const handleWishlist = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    dispatch(toggleWishlist({ id: p.id, title: p.title, price: p.price, image: p.image }));
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (role === "admin") {
      toast.error("Admins cannot purchase products");
      return;
    }
    if (outOfStock) {
      toast.error("Product is out of stock");
      return;
    }

    if (token) {
        try {
            await addRemote({ productId: p.id, qty: 1 }).unwrap();
            toast.success("Added to cart");
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to add to cart");
        }
    } else {
        dispatch(addToCart({ id: p.id, title: p.title, price: p.price, image: p.image, qty: 1 }));
        toast.success("Added to cart");
    }
  };

  return (
    <Link to={`/product/${p.id}`} className="group block relative">
      <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100 relative">
        <img
          src={p.image}
          alt={p.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {/* Actions Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
            onClick={handleAddToCart}
            className={`rounded-full p-3 shadow-md transition-transform hover:scale-110 ${outOfStock ? "bg-neutral-300 text-neutral-500 cursor-not-allowed" : "bg-white hover:bg-black hover:text-white text-neutral-900"}`}
            title="Add to Cart"
            disabled={outOfStock}
            >
            <ShoppingCart className="h-5 w-5" />
            </button>
        </div>

        {outOfStock && (
          <div className="absolute left-2 top-2 rounded bg-red-600 px-2 py-1 text-xs font-medium text-white">
            Out of stock
          </div>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-neutral-50"
        >
          <Heart
            className={`h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : "text-neutral-600"}`}
          />
        </button>
      </div>
      <div className="mt-3 space-y-1">
        <h4 className="text-base font-medium text-neutral-900">{p.title}</h4>
        <p className="text-sm font-semibold text-neutral-900">Rs. {p.price?.toLocaleString()}</p>
      </div>
    </Link>
  );
}