
// import { Card, CardContent } from "@/components/ui/card";
// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   // Construct full image URL from database
//   const imageUrl = product.image 
//     ? `/api${product.image}` 
//     : null;

//   return (
//     <Card className="h-full overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
//       <CardContent className="p-0 flex flex-col h-full">
//         {/* Image Section */}
//         <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
//           {imageUrl ? (
//             <img
//               src={imageUrl}
//               alt={product.title || product.name || "Product"}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
//               }}
//             />
//           ) : (
//             <div className="text-gray-400 text-center">
//               <p className="text-sm">No Image Available</p>
//             </div>
//           )}
//         </div>

//         {/* Content Section */}
//         <div className="p-4 flex-1 flex flex-col justify-between">
//           <div>
//             <h3 className="font-semibold text-lg line-clamp-2">
//               {product.title || product.name}
//             </h3>
//             <p className="text-sm text-muted-foreground mt-1">
//               {product.category}
//             </p>
//           </div>

//           <div className="mt-3 space-y-2">
//             <p className="text-sm text-gray-700 line-clamp-2">
//               {product.detail || product.description}
//             </p>
//             <div className="flex items-center justify-between">
//               <span className="font-bold text-lg">Rs.{product.price}</span>
//               <Link
//                 to={`/products/${product._id}`}
//                 className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
//               >
//                 View
//               </Link>
//             </div>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils"; // assuming you have cn helper (tailwind-merge)

// export default function ProductCard({ product }) {
//   // Fix image URL - most common pattern when backend saves "uploads/..."
//   const imageUrl = product.image
//     ? `/api${product.image.startsWith("/") ? "" : "/"}${product.image}`
//     : null;

//   // or if your backend serves from root:
//   // const imageUrl = product.image ? `http://localhost:5000/${product.image}` : null;
//   // or use env: `${import.meta.env.VITE_API_URL}/${product.image}`

//   return (
//     <Card
//       className={cn(
//         "group h-full overflow-hidden rounded-xl border bg-white",
//         "transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
//         "focus-within:ring-2 focus-within:ring-primary/50"
//       )}
//     >
//       {/* Image container with fixed aspect ratio */}
//       <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
//         {imageUrl ? (
//           <img
//             src={imageUrl}
//             alt={product.name || product.title || "Product image"}
//             className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://placehold.co/400x300?text=Image+Not+Found";
//             }}
//             loading="lazy"
//           />
//         ) : (
//           <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
//             <span className="text-sm font-medium">No image</span>
//           </div>
//         )}

//         {/* Optional: badge (new, sale, etc.) */}
//         {/* {product.isNew && (
//           <span className="absolute left-3 top-3 rounded-full bg-green-600 px-2.5 py-1 text-xs font-medium text-white">
//             New
//           </span>
//         )} */}
//       </div>

//       <CardContent className="flex flex-col gap-3 p-5">
//         {/* Name */}
//         <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-gray-900 group-hover:text-primary transition-colors">
//           {product.name || product.title || "Unnamed Product"}
//         </h3>

//         {/* Category (optional - small) */}
//         {product.category && (
//           <p className="text-xs text-gray-500 capitalize">{product.category}</p>
//         )}

//         {/* Description excerpt - optional, often hidden on cards */}
//         {/* <p className="line-clamp-2 text-sm text-gray-600">
//           {product.description || product.detail || ""}
//         </p> */}

//         {/* Price area */}
//         <div className="mt-auto flex items-end justify-between gap-2">
//           <div className="flex flex-col">
//             <span className="text-2xl font-bold text-gray-900">
//               Rs. {Number(product.price).toLocaleString()}
//             </span>

//             {/* Optional: original price + discount */}
//             {/* {product.originalPrice && (
//               <div className="flex items-center gap-2 text-sm">
//                 <span className="text-gray-500 line-through">
//                   Rs. {Number(product.originalPrice).toLocaleString()}
//                 </span>
//                 <span className="font-medium text-green-600">
//                   {Math.round(
//                     ((product.originalPrice - product.price) / product.originalPrice) * 100
//                   )}%
//                   off
//                 </span>
//               </div>
//             )} */}
//           </div>

//           <Button
//             asChild
//             variant="outline"
//             size="sm"
//             className="border-primary text-primary hover:bg-primary hover:text-white transition-colors"
//           >
//             <Link to={`/products/${product._id}`}>
//               View Details
//             </Link>
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }


















import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils"; // make sure you have this (tailwind-merge)

// Use this for production-ready code
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ProductCard({ product }) {
  // Correct image URL – this is the FIXED part!
  // const imageUrl = product.image
  //   ? `${API_URL}/${product.image}`
  //   : null;

const imageUrl = product.image
  ? `/${product.image}`                     // becomes /uploads/xxx.jpg → proxied to backend
  : null;


  return (
    <Card
      className={cn(
        "group h-full overflow-hidden rounded-xl border bg-white shadow-sm",
        "transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
        "focus-within:ring-2 focus-within:ring-primary/50"
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name || product.title || "Product image"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/400x300?text=Image+Not+Found";
              console.log("Image failed to load:", imageUrl);
            }}
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-400 text-sm font-medium">
            No image available
          </div>
        )}
      </div>

      <CardContent className="p-5 flex flex-col gap-4">
        {/* Title */}
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
          {product.name || product.title || "Product Name"}
        </h3>

        {/* Category */}
        {product.category && (
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        )}

        {/* Price & Button */}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            Rs. {Number(product.price).toLocaleString()}
          </span>

          <Button
            asChild
            size="sm"
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white"
          >
            <Link to={`/product/${product._id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}