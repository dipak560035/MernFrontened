
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

// import { fetchProducts } from '../redux/slices/productSlice';
// import { Button } from '@/components/ui/button';
// import { ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import ProductsSection from '@/components/Productsection';

// export default function Home() {
//   const dispatch = useDispatch();
//   const { list: products, isLoading } = useSelector((state) => state.products);

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 px-4">
//         <div className="container mx-auto max-w-7xl">
//           <div className="flex flex-col items-center text-center space-y-6">
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               <Sparkles className="h-8 w-8 text-primary" />
//               <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
//                 Welcome to NepalShop
//               </h1>
//             </div>
//             <p className="text-xl text-muted-foreground max-w-2xl">
//               Discover premium products curated just for you. Shop the latest trends and exclusive deals.
//             </p>
           
//             <div className="flex gap-4 mt-4 justify-center">
//   <Button asChild size="lg" className="text-lg px-8">
//     <a href="#products">Shop Now</a>
//   </Button>
//   <Button asChild variant="outline" size="lg" className="text-lg px-8">
//     <Link to="/products">Explore</Link>
//   </Button>
// </div>

//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-12 bg-muted/50">
//         <div className="container mx-auto max-w-7xl px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center text-center space-y-3">
//               <div className="rounded-full bg-primary/10 p-4">
//                 <ShoppingBag className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold">Premium Quality</h3>
//               <p className="text-muted-foreground">Handpicked products from trusted brands worldwide</p>
//             </div>
//             <div className="flex flex-col items-center text-center space-y-3">
//               <div className="rounded-full bg-primary/10 p-4">
//                 <TrendingUp className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold">Best Prices</h3>
//               <p className="text-muted-foreground">Competitive pricing with exclusive deals and discounts</p>
//             </div>
//             <div className="flex flex-col items-center text-center space-y-3">
//               <div className="rounded-full bg-primary/10 p-4">
//                 <Sparkles className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold">Fast Delivery</h3>
//               <p className="text-muted-foreground">Quick and secure shipping to your doorstep</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Section */}

//       <ProductsSection
//   title="Our Products"
//   subtitle="Browse our curated collection of premium products"
//   isLoading={isLoading}
//   products={products}
// />

//    </div>
//   );
// }


























// import { Button } from '@/components/ui/button';
// import { ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
// import { Link, useSearchParams } from 'react-router-dom';
// import ProductsSection from '@/components/Productsection';
// import { useGetProductsQuery } from '@/app/mainApi';

// export default function Home() {
//   const [searchParams] = useSearchParams();
// const search = searchParams.get('search') || '';

// const { data, isLoading } = useGetProductsQuery({ 
//   search,         
//   limit: 50,
  
         
// });
//   // const dispatch = useDispatch();
//   // const { list: products, isLoading } = useSelector((state) => state.products);

//   // useEffect(() => {
//   //   dispatch(fetchProducts());
//   // }, [dispatch]);
 

//   const products = Array.isArray(data) ? data : data?.products || [];
  
//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 px-4">
//         <div className="container mx-auto max-w-7xl">
//           <div className="flex flex-col items-center text-center space-y-6">
//             <div className="flex items-center justify-center space-x-2 mb-4">
//               <Sparkles className="h-8 w-8 text-primary" />
//               <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
//                 Welcome to NepalShop
//               </h1>
//             </div>
//             <p className="text-xl text-muted-foreground max-w-2xl">
//               Discover premium products curated just for you. Shop the latest trends and exclusive deals.
//             </p>
           
//             <div className="flex gap-4 mt-4 justify-center">
//   <Button asChild size="lg" className="text-lg px-8">
//     <a href="#products">Shop Now</a>
//   </Button>
//   <Button asChild variant="outline" size="lg" className="text-lg px-8">
//     <Link to="/products">Explore</Link>
//   </Button>
// </div>

//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-12 bg-muted/50">
//         <div className="container mx-auto max-w-7xl px-4">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center text-center space-y-3">
//               <div className="rounded-full bg-primary/10 p-4">
//                 <ShoppingBag className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold">Premium Quality</h3>
//               <p className="text-muted-foreground">Handpicked products from trusted brands worldwide</p>
//             </div>
//             <div className="flex flex-col items-center text-center space-y-3">
//               <div className="rounded-full bg-primary/10 p-4">
//                 <TrendingUp className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold">Best Prices</h3>
//               <p className="text-muted-foreground">Competitive pricing with exclusive deals and discounts</p>
//             </div>
//             <div className="flex flex-col items-center text-center space-y-3">
//               <div className="rounded-full bg-primary/10 p-4">
//                 <Sparkles className="h-8 w-8 text-primary" />
//               </div>
//               <h3 className="text-xl font-semibold">Fast Delivery</h3>
//               <p className="text-muted-foreground">Quick and secure shipping to your doorstep</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Products Section */}

//       <ProductsSection
//   title="Our Products"
//   subtitle="Browse our curated collection of premium products"
//   isLoading={isLoading}
//   products={products}
// />

//    </div>
//   );
// }






















































import { Button } from '@/components/ui/button';
import { ShoppingBag, Sparkles, TrendingUp } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductsSection from '@/components/Productsection';
import { useGetProductsQuery } from '@/app/mainApi';
import React from 'react';
import { useRef, useEffect } from "react";
export default function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading } = useGetProductsQuery({ 
    search,         
    limit: 12,
    page: currentPage,
  });

  const products = Array.isArray(data) ? data : data?.products || [];
  const totalPages = data?.totalPages || 1;

  // 1️⃣ Create a ref for the products section
  const productsRef = useRef(null);

  // 2️⃣ Scroll to products section on page change
  useEffect(() => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage, search]);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const search = searchParams.get('search') || '';
//   const currentPage = Number(searchParams.get('page')) || 1;

//   const { data, isLoading } = useGetProductsQuery({ 
//     search,         
//     limit: 12,
//     page: currentPage,
//   });
// const products = Array.isArray(data) ? data : data?.products || [];
//   // const products = data?.products || [];
//   const totalPages = data?.totalPages || 1;
//    React.useEffect(() => {
//     window.scrollTo({ top: 800, behavior: "smooth" });
//   }, [currentPage]);

  return (
    <div className="min-h-screen bg-background">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Welcome to NepalShop
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover premium products curated just for you. Shop the latest trends and exclusive deals.
            </p>

            <div className="flex gap-4 mt-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8"><a href="#products">Shop Now</a></Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8"><Link to="/products">Explore</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-4"><ShoppingBag className="h-8 w-8 text-primary" /></div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-muted-foreground">Handpicked products from trusted brands worldwide</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-4"><TrendingUp className="h-8 w-8 text-primary" /></div>
              <h3 className="text-xl font-semibold">Best Prices</h3>
              <p className="text-muted-foreground">Competitive pricing with exclusive deals and discounts</p>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="rounded-full bg-primary/10 p-4"><Sparkles className="h-8 w-8 text-primary" /></div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and secure shipping to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <ProductsSection
        title="Our Products"
        subtitle="Browse our curated collection of premium products"
        isLoading={isLoading}
        products={products}
      />

      {/* PAGINATION (no style changes) */}
      {totalPages > 1 && (
        <div className="flex gap-5 my-10 justify-center">
          <Button
            disabled={currentPage === 1}
            onClick={() =>
              setSearchParams({
                ...(search && { search }),
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
                ...(search && { search }),
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






































