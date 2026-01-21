
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils"; // tailwind-merge

// // Detect environment
// const isProd = import.meta.env.MODE === "production";
// const API_URL = isProd
//   ? "https://nepalstore.onrender.com" // your Render backend
//   : "http://localhost:5000";          // local backend

// export default function ProductCard({ product }) {
//   const imageUrl = product.image
//     ? `${API_URL}/${product.image}` // always use correct full URL
//     : null;

//   return (
//     <Card
//       className={cn(
//         "group h-full overflow-hidden rounded-xl border bg-white shadow-sm",
//         "transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
//         "focus-within:ring-2 focus-within:ring-primary/50"
//       )}
//     >
//       {/* Image */}
//       <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={product.name || product.title || "Product image"}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://placehold.co/400x300?text=Image+Not+Found";
//               console.log("Image failed to load:", imageUrl);
//             }}
//             loading="lazy"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-gray-400 text-sm font-medium">
//             No image available
//           </div>
//         )}
//       </div>

//       <CardContent className="p-5 flex flex-col gap-4">
//         {/* Title */}
//         <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
//           {product.name || product.title || "Product Name"}
//         </h3>

//         {/* Category */}
//         {product.category && (
//           <span className="text-xs text-gray-500 uppercase tracking-wide">
//             {product.category}
//           </span>
//         )}

//         {/* Price & Button */}
//         <div className="mt-auto flex items-center justify-between">
//           <span className="text-2xl font-bold text-gray-900">
//             Rs. {Number(product.price).toLocaleString()}
//           </span>

//           <Button
//             asChild
//             size="sm"
//             variant="default"
//             className="bg-primary hover:bg-primary/90 text-white"
//           >
//             <Link to={`/product/${product._id}`}>
//               View Details
//             </Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

























































// import { Link } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";

// export default function ProductCard({ product }) {
  
//   const BASE_URL =
//     window.location.hostname === "localhost"
//       ? "http://localhost:5000"
//       : "https://nepalstore.onrender.com";

//   const imgSrc = product.image?.startsWith("http")
//     ? product.image
//     : `${BASE_URL}/${product.image}`;

//   return (
//     <Link to={`/product/${product._id}`}>
//       <Card className="hover:shadow-lg transition cursor-pointer">
//         <img
//           src={imgSrc}
//           alt={product.name || product.title}
//           className="w-full h-48 object-cover rounded-t-md"
//           onError={(e) => {
//             e.target.src = "https://placehold.co/400x300?text=No+Image";
//           }}
//         />
//         <CardContent className="p-3">
//           <h2 className="text-sm font-semibold line-clamp-1">
//             {product.name || product.title}
//           </h2>
//           <p className="text-primary font-bold text-lg mt-1">
//             Rs. {product.price}
//           </p>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }


























// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";

// export default function ProductCard({ product }) {
//   // Detect environment (Vercel / Production)
//   const isProd = window.location.origin.includes("vercel.app");

//   // Backend URL based on environment
//   const BASE_URL = isProd
//     ? "https://nepalstore.onrender.com"
//     : "http://localhost:5000";

//   // Build image URL (only if exists)
//   const imageUrl = product?.image
//     ? `${BASE_URL}/${product.image.replace(/\\/g, "/")}`
//     : null;

//   return (
//     <Card
//       className={cn(
//         "group h-full overflow-hidden rounded-xl border bg-white shadow-sm",
//         "transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
//       )}
//     >
//       <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={product?.name || "Product"}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://placehold.co/400x300?text=No+Image";
//             }}
//             loading="lazy"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center text-gray-400 text-sm font-medium">
//             No image available
//           </div>
//         )}
//       </div>

//       <CardContent className="p-5">
//         <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
//           {product?.name || product?.title || "Product Name"}
//         </h3>

//         <div className="mt-3 flex justify-between items-center">
//           <span className="text-xl font-bold">
//             Rs. {Number(product?.price).toLocaleString()}
//           </span>

//           <Button asChild size="sm">
//             <Link to={`/product/${product._id}`}>View</Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




















// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils"; // tailwind-merge

// export default function ProductCard({ product }) {
//   // product.image is now the full URL from backend
//   // const imageUrl = product.image || "https://placehold.co/400x300?text=No+Image";
//   const BASE_URL = "https://nepalstore.onrender.com";

// const imageUrl = product.image
//   ? `${BASE_URL}/${product.image}`   // e.g. http://localhost:5000/uploads/xxxx-image.png
//   : "https://placehold.co/400x300?text=No+Image";

//   return (
//     <Card
//       className={cn(
//         "group h-full overflow-hidden rounded-xl border bg-white shadow-sm",
//         "transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
//         "focus-within:ring-2 focus-within:ring-primary/50"
//       )}
//     >
//       {/* Image */}
//       <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
//         <img
//           src={imageUrl}
//           alt={product.name || "Product image"}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = "https://placehold.co/400x300?text=Image+Not+Found";
//           }}
//           loading="lazy"
//         />
//       </div>

//       <CardContent className="p-5 flex flex-col gap-4">
//         {/* Title */}
//         <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
//           {product.name || "Product Name"}
//         </h3>

//         {/* Category */}
//         {product.category && (
//           <span className="text-xs text-gray-500 uppercase tracking-wide">
//             {product.category}
//           </span>
//         )}

//         {/* Price & Button */}
//         <div className="mt-auto flex items-center justify-between">
//           <span className="text-2xl font-bold text-gray-900">
//             Rs. {Number(product.price).toLocaleString()}
//           </span>

//           <Button
//             asChild
//             size="sm"
//             variant="default"
//             className="bg-primary hover:bg-primary/90 text-white"
//           >
//             <Link to={`/product/${product._id}`}>View Details</Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }

































// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import { Star } from "lucide-react";

// export default function ProductCard({ product }) {
//   const BASE_URL = "https://nepalstore.onrender.com";

//   const imageUrl = product.image
//     ? `${BASE_URL}/${product.image}`
//     : "https://placehold.co/400x300?text=No+Image";

//   // Fallbacks
//   const brand = product.brand || "Unknown Brand";
//   const rating = product.rating || 4.5; // placeholder
//   const description = product.description || "";

//   // For "Standard / Classic / Premium"
//   const edition = product.edition || "Standard";

//   return (
//     <Card
//       className={cn(
//         "group h-full overflow-hidden rounded-xl border bg-white shadow-sm",
//         "transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
//       )}
//     >
//       {/* Image */}
//       <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-100">
//         <img
//           src={imageUrl}
//           alt={product.name || "Product image"}
//           className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src =
//               "https://placehold.co/400x300?text=Image+Not+Found";
//           }}
//           loading="lazy"
//         />
//       </div>

//       <CardContent className="p-4 flex flex-col gap-3">
//         {/* Brand */}
//         <span className="text-xs font-medium text-blue-600 uppercase">
//           {brand}
//         </span>

//         {/* Title */}
//         <h3 className="line-clamp-2 text-base font-semibold text-gray-900">
//           {product.name || "Product Name"}
//         </h3>

//         {/* Edition */}
//         <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5 w-fit">
//           {edition}
//         </span>

//         {/* Description Preview */}
//         {description && (
//           <p className="text-xs text-gray-600 line-clamp-2">
//             {description}
//           </p>
//         )}

//         {/* Rating */}
//         <div className="flex items-center gap-1 text-xs text-yellow-600">
//           <Star size={14} fill="currentColor" />
//           <span className="font-medium">{rating}</span>
//         </div>

//         {/* Price + View Button */}
//         <div className="mt-auto flex items-center justify-between pt-2">
//           <span className="text-lg font-bold text-gray-900">
//             Rs. {Number(product.price).toLocaleString()}
//           </span>

//           <Button
//             asChild
//             size="sm"
//             variant="default"
//             className="bg-primary hover:bg-primary/90 text-white"
//           >
//             <Link to={`/product/${product._id}`}>View</Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }




























































import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  // Keep your working image logic
  const BASE_URL = "https://nepalstore.onrender.com";
  // If you test locally, you can temporarily change to:
  // const BASE_URL = import.meta.env.DEV ? "http://localhost:5000" : "https://nepalstore.onrender.com";

  const imageUrl = product.image
    ? `${BASE_URL}/${product.image}`
    : "https://placehold.co/500x500?text=No+Image";

  const brand = product.brand || "Unknown Brand";
  const title = product.name || "Product Name";
  const description = product.description || "";
  const price = Number(product.price) || 0;
  const rating = product.rating || 4.5;

  return (
    <Card className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Image – bigger, square, high quality feel */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/500x500?text=Image+Not+Found";
            }}
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Brand */}
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {brand}
        </span>

        {/* Title – more prominent */}
        <Link to={`/product/${product._id}`} className="block">
          <h3 className="font-semibold text-base leading-tight text-gray-900 line-clamp-2 hover:text-blue-700 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Short description – optional, smaller */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          <span className="text-xs text-gray-500">• 120+ sold</span>
        </div>

        {/* Price + Button area */}
        <div className="mt-auto pt-2 flex items-end justify-between gap-3">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              Rs. {price.toLocaleString()}
            </span>
            {/* Optional: show old price if you have discount logic */}
            {/* <span className="text-sm text-gray-500 line-through ml-2">
              Rs. {(price * 1.25).toLocaleString()}
            </span> */}
          </div>

          <Button
            asChild
            variant="default"
            size="sm"
            className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5"
          >
            <Link to={`/product/${product._id}`}>View</Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}