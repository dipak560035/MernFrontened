import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/button";
import Badge from "../components/ui/badge";
import Quantity from "../components/ui/quantity";
import { Star, Facebook, Linkedin, Twitter, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { toggleWishlist } from "../store/slices/wishlistSlice";
import { useProductByIdQuery, useAddToCartMutation, useProductsQuery } from "../services/api";
import { toast } from "sonner";
import ProductCard from "../components/common/ProductCard";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const role = useSelector((s) => s.auth.role);
  const wishlist = useSelector((s) => s.wishlist.items);
  const [activeTab, setActiveTab] = useState("desc");
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data, isLoading } = useProductByIdQuery(id);
  const { data: relatedData } = useProductsQuery({ limit: 4 });
  const [addRemote] = useAddToCartMutation();

  const fallback = {
    id,
    title: "Asgaard sofa",
    price: 250000,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200",
    ],
    colors: ["#816DFA", "#000000", "#CDBA7B"],
    sizes: ["L", "XL", "XS"],
  };

  const p = data?.success && data.data
    ? {
        id: data.data._id,
        title: data.data.name,
        price: data.data.price,
        rating: data.data.rating || 4.5,
        images:
          data.data.images?.length > 0
            ? data.data.images.map(
                (img) => `${BASE_URL}${img.url}`
              )
            : fallback.images,
        colors: data.data.colors?.length
          ? data.data.colors
          : fallback.colors,
        sizes: data.data.sizes?.length
          ? data.data.sizes
          : fallback.sizes,
      }
    : fallback;

  const inWishlist = wishlist.some((i) => i.id === p.id);

  const handleAddToCart = async () => {
    if (role === "admin") {
      toast.error("Admins cannot purchase products");
      return;
    }
    dispatch(addToCart({ id: p.id, title: p.title, price: p.price, image: p.images[0], qty }));
    try {
      await addRemote({ productId: p.id, qty });
      toast.success("Added to cart");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-6">
        <Container>
            <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-neutral-500">Home</span>
                <span className="text-black">›</span>
                <span className="text-neutral-500">Shop</span>
                <span className="text-black">›</span>
                <div className="h-6 w-[2px] bg-neutral-400 mx-2"></div>
                <span className="text-black font-medium">{p.title}</span>
            </div>
        </Container>
      </section>

      <Container className="py-8">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Gallery */}
          <div className="flex gap-4">
             {/* Thumbnails */}
             <div className="flex flex-col gap-4">
                {p.images.map((img, i) => (
                    <div 
                        key={i} 
                        className={`h-20 w-20 overflow-hidden rounded-lg bg-[#F9F1E7] cursor-pointer transition-all ${
                            (selectedImage || p.images[0]) === img ? "ring-2 ring-black" : ""
                        }`}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img src={img} alt="thumb" className="h-full w-full object-cover" />
                    </div>
                ))}
             </div>
             {/* Main Image */}
             <div className="flex-1 aspect-square overflow-hidden rounded-lg bg-[#F9F1E7] relative group">
                {isLoading ? (
                    <div className="h-full w-full animate-pulse bg-neutral-200" />
                ) : (
                    <img 
                        src={selectedImage || p.images[0]} 
                        alt={p.title} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                )}
             </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-medium text-neutral-900">{p.title}</h1>
            <div className="mt-2 text-2xl text-neutral-500 font-medium">
              Rs. {p.price.toLocaleString()}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex text-[#FFC700]">
                 {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                 ))}
              </div>
              <div className="h-5 w-[1px] bg-neutral-400"></div>
              <span className="text-sm text-neutral-500">5 Customer Review</span>
            </div>

            <p className="mt-4 text-sm text-neutral-700 leading-relaxed max-w-md">
              Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.
            </p>

            {/* Options */}
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-sm text-neutral-400 mb-2">Size</div>
                <div className="flex gap-3">
                  {p.sizes.map((s) => (
                    <button key={s} className="h-8 w-8 rounded-md bg-[#F9F1E7] text-sm hover:bg-[#FBEBB5] transition-colors">
                        {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm text-neutral-400 mb-2">Color</div>
                <div className="flex gap-3">
                  {p.colors.map((c) => (
                    <button
                      key={c}
                      className="h-8 w-8 rounded-full shadow-sm"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4 pb-8 border-b border-neutral-200">
              <div className="flex items-center rounded-md border border-neutral-400 px-3 py-3 gap-4">
                 <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                 <span className="w-4 text-center">{qty}</span>
                 <button onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className="rounded-md border border-black bg-transparent px-8 py-3 text-black transition-colors hover:bg-black hover:text-white"
              >
                Add To Cart
              </button>
            </div>

            {/* Meta */}
            <div className="mt-8 space-y-3 text-sm text-neutral-400">
                <div className="flex gap-4">
                    <span className="w-20">SKU</span>
                    <span>: SS001</span>
                </div>
                <div className="flex gap-4">
                    <span className="w-20">Category</span>
                    <span>: Sofas</span>
                </div>
                <div className="flex gap-4">
                    <span className="w-20">Tags</span>
                    <span>: Sofa, Chair, Home, Shop</span>
                </div>
                <div className="flex gap-4 items-center">
                    <span className="w-20">Share</span>
                    <div className="flex gap-3 text-black">
                        <Facebook size={18} />
                        <Linkedin size={18} />
                        <Twitter size={18} />
                        <Heart 
                           className={`cursor-pointer ${inWishlist ? "fill-red-500 text-red-500" : ""}`}
                           onClick={() => {
                               dispatch(toggleWishlist({ id: p.id, title: p.title, price: p.price, image: p.images[0] }));
                               toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
                           }}
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Tabs */}
      <div className="border-t border-neutral-200 py-12">
        <Container>
            <div className="flex justify-center gap-8 mb-8 text-lg">
                <button 
                   className={`${activeTab === "desc" ? "text-black font-medium" : "text-neutral-400"}`}
                   onClick={() => setActiveTab("desc")}
                >
                    Description
                </button>
                <button 
                   className={`${activeTab === "info" ? "text-black font-medium" : "text-neutral-400"}`}
                   onClick={() => setActiveTab("info")}
                >
                    Additional Information
                </button>
                <button 
                   className={`${activeTab === "reviews" ? "text-black font-medium" : "text-neutral-400"}`}
                   onClick={() => setActiveTab("reviews")}
                >
                    Reviews [5]
                </button>
            </div>
            
            <div className="max-w-4xl mx-auto text-neutral-500 text-sm space-y-6 text-justify">
               {activeTab === "desc" && (
                   <>
                   <p>Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</p>
                   <p>Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</p>
                   <div className="grid md:grid-cols-2 gap-6 mt-8">
                       <div className="bg-[#F9F1E7] rounded-lg h-64"></div>
                       <div className="bg-[#F9F1E7] rounded-lg h-64"></div>
                   </div>
                   </>
               )}
               {activeTab === "info" && <p>Additional information content...</p>}
               {activeTab === "reviews" && <p>Reviews content...</p>}
            </div>
        </Container>
      </div>

      {/* Related Products */}
      <Container className="py-12 border-t border-neutral-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-medium">Related Products</h3>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {(relatedData?.data || []).slice(0, 4).map((rp) => (
               <ProductCard
                 key={rp._id}
                 p={{
                   id: rp._id,
                   title: rp.name,
                   price: rp.price,
                   image: rp.images?.length
                     ? `${BASE_URL}${rp.images[0].url}`
                     : "https://placehold.co/400x300?text=No+Image",
                 }}
               />
            ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/shop" className="border-b border-black pb-1 font-medium text-sm">View More</Link>
        </div>
      </Container>
    </>
  );
}
