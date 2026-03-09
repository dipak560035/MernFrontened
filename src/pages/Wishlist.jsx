import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Button from "../components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import { addToCart } from "../store/slices/cartSlice";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useAddToCartMutation } from "../services/api";

export default function Wishlist() {
  const items = useSelector((s) => s.wishlist.items);
  const dispatch = useDispatch();
  const role = useSelector((s) => s.auth.role);
  const [addRemote] = useAddToCartMutation();

  const handleAddToCart = async (item) => {
      if (role === "admin") {
        toast.error("Admins cannot purchase products");
        return;
      }
      dispatch(addToCart({ id: item.id, title: item.title, price: item.price, image: item.image, qty: 1 }));
      try {
        await addRemote({ productId: item.id, qty: 1 });
        toast.success("Added to cart");
      } catch (err) {
        toast.error(err?.data?.message || "Failed to add to cart");
      }
  };

  return (
    <>
      <PageHero title="Wishlist" />
      <Container className="py-12">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="text-xl font-medium text-neutral-900">Your wishlist is empty</div>
            <Link to="/shop" className="mt-4 rounded-md border border-black px-6 py-2 transition-colors hover:bg-black hover:text-white">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
             {items.map((item) => (
                <div key={item.id} className="group relative block overflow-hidden rounded-lg bg-white border border-neutral-200">
                    <Link to={`/product/${item.id}`}>
                        <div className="aspect-square w-full overflow-hidden bg-neutral-100">
                             {item.image ? (
                                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                             ) : (
                                <div className="h-full w-full flex items-center justify-center text-neutral-400">No Image</div>
                             )}
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-medium text-neutral-900 truncate">{item.title}</h3>
                            <p className="mt-1 text-sm font-semibold text-neutral-900">Rs. {item.price.toLocaleString()}</p>
                            <p className="mt-1 text-sm text-green-600">In Stock</p>
                        </div>
                    </Link>
                    
                    <div className="p-4 pt-0 flex gap-2">
                        <button 
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 flex items-center justify-center gap-2 rounded-md bg-black px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
                        >
                            <ShoppingCart size={16} />
                            Add to Cart
                        </button>
                        <button 
                            onClick={() => dispatch(toggleWishlist(item))}
                            className="flex items-center justify-center rounded-md border border-red-200 bg-red-50 px-3 py-2 text-red-600 transition-colors hover:bg-red-100"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
             ))}
          </div>
        )}
      </Container>
    </>
  );
}
