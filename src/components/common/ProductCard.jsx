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
            className="rounded-full bg-white p-3 shadow-md transition-transform hover:scale-110 hover:bg-black hover:text-white text-neutral-900"
            title="Add to Cart"
            >
            <ShoppingCart className="h-5 w-5" />
            </button>
        </div>

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
