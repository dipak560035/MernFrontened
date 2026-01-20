


// import { useGetProductsQuery } from "@/app/mainApi";
// import ProductsSection from "@/components/Productsection";

// import React from "react";
// import { useSearchParams } from "react-router";
// ;

// export default function Products() {
//   const [searchParams] = useSearchParams();
//   const search = searchParams.get('search') || '';

//   const { data, error, isLoading } = useGetProductsQuery({ 
//     search,
//     limit: 50 
//   });
//   // const { data, error, isLoading } = useGetProductsQuery({ limit: 50 });
//   // const products = data?.products || [];
// const products = Array.isArray(data) ? data : data?.products || [];

//   return (
//     <div className="min-h-screen bg-background">
//       <ProductsSection
//         title="All Products"
//         subtitle="Explore our complete catalog"
//         isLoading={isLoading}
//         products={products}
//       />
//     </div>
//   );
// }








































// import { useGetProductsQuery } from "@/app/mainApi";
// import ProductsSection from "@/components/Productsection";
// import React from "react";
// import { useSearchParams } from "react-router-dom";  // ← ADD THIS

// export default function Products() {
//   const [searchParams] = useSearchParams();  // ← ADD
//   const searchTerm = searchParams.get('search') || '';  // ← Get ?search=...

//   const { data, error, isLoading } = useGetProductsQuery({
//     search: searchTerm,  // ← Pass to backend for filtering
//     limit: 50,           // Fetch up to 50 (or all matches)
//   });

//   const products = Array.isArray(data) ? data : data?.products || [];

//   return (
//     <div className="min-h-screen bg-background">
//       <ProductsSection
//         title={searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}  // ← Dynamic title for real e-commerce feel
//         subtitle={searchTerm ? "Showing related products" : "Explore our complete catalog"}
//         isLoading={isLoading}
//         products={products}
//       />
//     </div>
//   );
// }


















// import { useGetProductsQuery } from "@/app/mainApi";
// import ProductsSection from "@/components/Productsection";
// import React, { useMemo } from "react";  // ← ADD useMemo
// import { useSearchParams } from "react-router-dom";

// export default function Products() {
//   const [searchParams] = useSearchParams();
//   const searchTerm = searchParams.get("search") || "";

//   // Memoize the query arg object so it's stable unless searchTerm actually changes
//   const queryArgs = useMemo(
//     () => ({
//       search: searchTerm,
//       limit: 50,
//     }),
//     [searchTerm]  // ← only recreate when searchTerm changes
//   );

//   // const { data, error, isLoading } = useGetProductsQuery(queryArgs);
// const { data, error, isLoading, refetch } = useGetProductsQuery(queryArgs);

// React.useEffect(() => {
//   refetch();  // Force refetch whenever searchTerm changes
// }, [searchTerm, refetch]);
//   const products = Array.isArray(data) ? data : data?.products || [];

//   return (
//     <div className="min-h-screen bg-background">
//       <ProductsSection
//         title={searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
//         subtitle={
//           searchTerm
//             ? `Showing ${products.length} matching products`
//             : "Explore our complete catalog"
//         }
//         isLoading={isLoading}
//         products={products}
//       />
//     </div>
//   );
// }













































// import { useGetProductsQuery } from "@/app/mainApi";
// import ProductsSection from "@/components/Productsection";
// import React from "react";
// import { useSearchParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";

// export default function Products() {
 
//   const [searchParams, setSearchParams] = useSearchParams();

//   // Read from URL — same as your working example
//   const currentPage = Number(searchParams.get("page")) || 1;
//   const searchTerm = searchParams.get("search") || "";

//   // Query object — exactly like your working Home code
//   const queryParams = {
//     ...(searchTerm && { search: searchTerm }),
//     page: currentPage,
//     // limit: 50,     // ← uncomment if you want to force higher limit (optional)
//   };

//   const { data, error, isLoading } = useGetProductsQuery(queryParams);
//    console.log("Query params sent:", queryParams);
// console.log("Data received:", data);
//   // Optional: scroll to top when page changes (same as your example)
//   React.useEffect(() => {
//     window.scrollTo({
//       top: 0,
//       left: 0,
//       behavior: "smooth",
//     });
//   }, [currentPage]);

//   // Loading state — using ProductsSection for consistency
//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-background">
//         <ProductsSection
//           title={searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
//           subtitle="Loading products..."
//           isLoading={true}
//           products={[]}
//         />
//       </div>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center py-20">
//         <h1 className="text-red-600 text-2xl font-semibold">
//           Error loading products. Please try again later.
//         </h1>
//       </div>
//     );
//   }

//   const products = data?.products || [];
//   const totalPages = data?.totalPages || 1;

//   // No products found
//   if (products.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <ProductsSection
//           title={searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
//           subtitle="No products found"
//           isLoading={false}
//           products={[]}
//         />
//       </div>
//     );
//   }


//   return (
//     <div className="min-h-screen bg-background">
//       <ProductsSection
//         title={searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
//         subtitle={
//           searchTerm
//             ? `Showing ${products.length} matching products`
//             : "Explore our complete catalog"
//         }
//         isLoading={isLoading}
//         products={products}
//       />

//       {/* Pagination controls – same style as your working example */}
//       <div className="flex gap-5 my-10 justify-center">
//         <Button
//           disabled={currentPage === 1}
//           onClick={() =>
//             setSearchParams({
//               ...(searchTerm && { search: searchTerm }),
//               page: currentPage - 1,
//             })
//           }
//         >
//           Prev
//         </Button>

//         <h1>{currentPage}</h1>

//         <Button
//           disabled={currentPage >= totalPages}
//           onClick={() =>
//             setSearchParams({
//               ...(searchTerm && { search: searchTerm }),
//               page: currentPage + 1,
//             })
//           }
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }





































import { useGetProductsQuery } from "@/app/mainApi";
import ProductsSection from "@/components/Productsection";
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("search") || "";

  const { data, isLoading, error } = useGetProductsQuery({
    search: searchTerm,
    page: currentPage,
    limit: 12, // show 50 like homepage
  });

  const products = data?.products ?? [];
  const totalPages = data?.totalPages ?? 1;

  // scroll on page change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ProductsSection
          title={searchTerm ? `Searching "${searchTerm}"...` : "All Products"}
          subtitle="Loading..."
          isLoading={true}
          products={[]}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-20">
        <h1 className="text-red-600 text-2xl">Error loading products</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ProductsSection
        title={searchTerm ? `Search: "${searchTerm}"` : "All Products"}
        subtitle={
          searchTerm
            ? products.length > 0
              ? `Found ${products.length}`
              : "No products found"
            : "Explore all our store products"
        }
        isLoading={false}
        products={products}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-5 my-10 justify-center">
          <Button
            disabled={currentPage === 1}
            onClick={() =>
              setSearchParams({
                ...(searchTerm && { search: searchTerm }),
                page: currentPage - 1,
              })
            }
          >
            Prev
          </Button>

          <h1>{currentPage}</h1>

          <Button
            disabled={currentPage >= totalPages}
            onClick={() =>
              setSearchParams({
                ...(searchTerm && { search: searchTerm }),
                page: currentPage + 1,
              })
            }
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
