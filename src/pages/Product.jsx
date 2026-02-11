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
import StarRating from "../components/common/StarRating";
import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";
import ProductGallery from "../components/common/ProductGallery";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const token = useSelector((s) => s.auth.token);
  const role = useSelector((s) => s.auth.role);
  const wishlist = useSelector((s) => s.wishlist.items);
  const [activeTab, setActiveTab] = useState("desc");
  const [qty, setQty] = useState(1);

  const { data } = useProductByIdQuery(id);
  const { data: relatedData } = useProductsQuery({ limit: 4 });
  const [addRemote] = useAddToCartMutation();
  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, [id]);
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
        stock: data.data.stock ?? 0,
        rating: data.data.rating || 0,
        numReviews: data.data.numReviews || 0,
        reviews: Array.isArray(data.data.reviews) ? data.data.reviews : [],
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
    if (p.stock <= 0) {
      toast.error("Product is out of stock");
      return;
    }

    if (token) {
        try {
            await addRemote({ productId: p.id, qty }).unwrap();
            toast.success("Added to cart");
        } catch (err) {
            console.error(err);
            toast.error(err?.data?.message || "Failed to add to cart");
        }
    } else {
        dispatch(addToCart({ id: p.id, title: p.title, price: p.price, image: p.images[0], qty }));
        toast.success("Added to cart");
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
          <ProductGallery key={p.id} images={p.images} />

          {/* Details */}
          <div>
            <h1 className="text-4xl font-medium text-neutral-900">{p.title}</h1>
            <div className="mt-2 text-2xl text-neutral-500 font-medium">
              Rs. {p.price.toLocaleString()}
            </div>
            {typeof p.stock === "number" && p.stock <= 0 && (
              <div className="mt-2 inline-block rounded bg-red-600 px-3 py-1 text-sm font-medium text-white">
                Out of stock
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <StarRating value={p.rating} />
              <div className="h-5 w-[1px] bg-neutral-400"></div>
              <span className="text-sm text-neutral-500">{p.numReviews} Customer Review{p.numReviews === 1 ? "" : "s"}</span>
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
                 <button disabled={p.stock <= 0} onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
                 <span className="w-4 text-center">{qty}</span>
                 <button disabled={p.stock <= 0} onClick={() => setQty(q => q + 1)}>+</button>
              </div>
              
              <button
                onClick={handleAddToCart}
                className={`rounded-md border bg-transparent px-8 py-3 transition-colors ${p.stock <= 0 ? "border-neutral-400 text-neutral-400 cursor-not-allowed" : "border-black text-black hover:bg-black hover:text-white"}`}
                disabled={p.stock <= 0}
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
                    Reviews [{p.numReviews}]
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
               {activeTab === "reviews" && (
                 <>
                   <ReviewList reviews={p.reviews} rating={p.rating} numReviews={p.numReviews} />
                   <ReviewForm productId={p.id} />
                 </>
               )}
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
                       stock: rp.stock ?? 0,
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



















































// import { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// import Container from "../components/layout/Container";
// import { Facebook, Linkedin, Twitter, Heart } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../store/slices/cartSlice";
// import { toggleWishlist } from "../store/slices/wishlistSlice";
// import {
//   useProductByIdQuery,
//   useAddToCartMutation,
//   useProductsQuery,
// } from "../services/api";
// import { toast } from "sonner";
// import ProductCard from "../components/common/ProductCard";
// import StarRating from "../components/common/StarRating";
// import ReviewList from "../components/reviews/ReviewList";
// import ReviewForm from "../components/reviews/ReviewForm";
// import ProductGallery from "../components/common/ProductGallery";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

// export default function Product() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const token = useSelector((s) => s.auth.token);
//   const role = useSelector((s) => s.auth.role);
//   const wishlist = useSelector((s) => s.wishlist.items);

//   const [activeTab, setActiveTab] = useState("desc");
//   const [qty, setQty] = useState(1);

//   const { data, isLoading } = useProductByIdQuery(id);
//   const { data: relatedData } = useProductsQuery({ limit: 4 });
//   const [addRemote] = useAddToCartMutation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [id]);

//   if (isLoading) return null;

//   if (!data?.success || !data?.data) return null;

//   const product = data.data;

//   const images =
//     product.images?.length > 0
//       ? product.images.map((img) =>
//           img.url.startsWith("http")
//             ? img.url
//             : `${BASE_URL}${img.url}`
//         )
//       : [];

//   const p = {
//     id: product._id,
//     title: product.name,
//     price: product.price,
//     stock: product.stock ?? 0,
//     rating: product.rating || 0,
//     numReviews: product.numReviews || 0,
//     reviews: Array.isArray(product.reviews) ? product.reviews : [],
//     images,
//     colors: product.colors?.length ? product.colors : [],
//     sizes: product.sizes?.length ? product.sizes : [],
//   };

//   const inWishlist = wishlist.some((i) => i.id === p.id);

//   const handleAddToCart = async () => {
//     if (role === "admin") {
//       toast.error("Admins cannot purchase products");
//       return;
//     }

//     if (p.stock <= 0) {
//       toast.error("Product is out of stock");
//       return;
//     }

//     if (token) {
//       try {
//         await addRemote({ productId: p.id, qty }).unwrap();
//         toast.success("Added to cart");
//       } catch (err) {
//         toast.error(err?.data?.message || "Failed to add to cart");
//       }
//     } else {
//       dispatch(
//         addToCart({
//           id: p.id,
//           title: p.title,
//           price: p.price,
//           image: p.images[0],
//           qty,
//         })
//       );
//       toast.success("Added to cart");
//     }
//   };

//   return (
//     <>
//       <Container className="py-8">
//         <div className="grid gap-12 md:grid-cols-2">
//           {/* Gallery */}
//           <ProductGallery images={p.images} />

//           {/* Details */}
//           <div>
//             <h1 className="text-4xl font-medium text-neutral-900">
//               {p.title}
//             </h1>

//             <div className="mt-2 text-2xl text-neutral-500 font-medium">
//               Rs. {p.price.toLocaleString()}
//             </div>

//             {p.stock <= 0 && (
//               <div className="mt-2 inline-block rounded bg-red-600 px-3 py-1 text-sm font-medium text-white">
//                 Out of stock
//               </div>
//             )}

//             <div className="mt-4 flex items-center gap-3">
//               <StarRating value={p.rating} />
//               <div className="h-5 w-[1px] bg-neutral-400"></div>
//               <span className="text-sm text-neutral-500">
//                 {p.numReviews} Review{p.numReviews === 1 ? "" : "s"}
//               </span>
//             </div>

//             {/* Quantity + Add to cart */}
//             <div className="mt-8 flex gap-4 pb-8 border-b border-neutral-200">
//               <div className="flex items-center rounded-md border border-neutral-400 px-3 py-3 gap-4">
//                 <button
//                   disabled={p.stock <= 0}
//                   onClick={() => setQty((q) => Math.max(1, q - 1))}
//                 >
//                   -
//                 </button>
//                 <span className="w-4 text-center">{qty}</span>
//                 <button
//                   disabled={p.stock <= 0}
//                   onClick={() => setQty((q) => q + 1)}
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 onClick={handleAddToCart}
//                 className={`rounded-md border bg-transparent px-8 py-3 transition-colors ${
//                   p.stock <= 0
//                     ? "border-neutral-400 text-neutral-400 cursor-not-allowed"
//                     : "border-black text-black hover:bg-black hover:text-white"
//                 }`}
//                 disabled={p.stock <= 0}
//               >
//                 Add To Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// }

