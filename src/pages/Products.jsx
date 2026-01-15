
// import { useGetProductsQuery } from "@/app/mainApi";
// import React from "react";
// import { Link } from "react-router-dom";
// import { ShoppingBag } from "lucide-react";

// export default function Products() {
//   const { data, error, isLoading } = useGetProductsQuery();

//   const products = data?.products || [];

//   return (
//     <div className="min-h-screen bg-background py-16 px-6">
//       {/* Header */}
//       <div className="max-w-7xl mx-auto text-center mb-12">
//         <h1 className="text-4xl font-bold mb-3">All Products</h1>
//         <p className="text-muted-foreground">
//           Browse our full catalog of quality items
//         </p>
//       </div>

//       {/* Loading State */}
//       {isLoading && (
//         <div className="flex justify-center py-20">
//           <div className="text-center">
//             <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary mx-auto"></div>
//             <p className="text-muted-foreground mt-4">Loading products...</p>
//           </div>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="text-center text-red-500">Error loading products</div>
//       )}

//       {/* No Products */}
//       {!isLoading && products.length === 0 && (
//         <div className="text-center py-20">
//           <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//           <h3 className="text-2xl font-semibold mb-2">No products found</h3>
//           <p className="text-muted-foreground">
//             Check back later for new arrivals!
//           </p>
//         </div>
//       )}

//       {/* Products Grid */}
//       {products.length > 0 && (
//         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {products.map((product) => (
//             <div
//               key={product._id}
//               className="border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow overflow-hidden"
//             >
//               {/* Image */}
//               <div className="h-48 bg-muted flex items-center justify-center overflow-hidden">
//                 {product.image ? (
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="object-cover w-full h-full"
//                   />
//                 ) : (
//                   <ShoppingBag className="h-10 w-10 text-muted-foreground" />
//                 )}
//               </div>

//               {/* Content */}
//               <div className="p-4 flex flex-col space-y-2">
//                 <h3 className="text-lg font-semibold">{product.name}</h3>
//                 <p className="text-primary font-semibold text-md">
//                   Rs. {product.price}
//                 </p>
//                 <p className="text-sm text-muted-foreground line-clamp-2">
//                   {product.description || "No description available."}
//                 </p>

//                 <Link
//                   to={`/product/${product._id}`}
//                   className="mt-3 inline-block text-center bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }



































import { useGetProductsQuery } from "@/app/mainApi";
import ProductsSection from "@/components/Productsection";
import React from "react";
;

export default function Products() {
  const { data, error, isLoading } = useGetProductsQuery();
  const products = data?.products || [];

  return (
    <div className="min-h-screen bg-background">
      <ProductsSection
        title="All Products"
        subtitle="Explore our complete catalog"
        isLoading={isLoading}
        products={products}
      />
    </div>
  );
}
