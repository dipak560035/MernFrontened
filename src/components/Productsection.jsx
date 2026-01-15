// import { ShoppingBag } from "lucide-react";
// import ProductCard from "./ProductCard";

// export default function ProductsSection({ title, subtitle, isLoading, products }) {
//   return (
//     <section id="products" className="py-16 px-4">
//       <div className="container mx-auto max-w-7xl">
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>
//             <p className="text-muted-foreground">{subtitle}</p>
//           </div>
//         </div>

//         {isLoading ? (
//           <div className="flex items-center justify-center py-20">
//             <div className="text-center space-y-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//               <p className="text-muted-foreground">Loading products...</p>
//             </div>
//           </div>
//         ) : products.length === 0 ? (
//           <div className="text-center py-20">
//             <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//             <h3 className="text-2xl font-semibold mb-2">No products found</h3>
//             <p className="text-muted-foreground">Check back later for new arrivals!</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//             {products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

















import { ShoppingBag } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductsSection({
  title,
  subtitle,
  isLoading,
  products = [], // default to empty array
}) {
  return (
    <section id="products" className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
          )}
        </div>

        {isLoading ? (
          <div className="py-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold">No products found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id || Math.random()} className="border rounded-lg p-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}





