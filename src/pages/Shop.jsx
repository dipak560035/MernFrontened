// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import ProductCard from "../components/common/ProductCard";
// import { useProductsQuery } from "../services/api";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

// export default function Shop() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const initialPage = Number(searchParams.get("page")) || 1;
//   const initialLimit = Number(searchParams.get("limit")) || 16;
//   const initialQ = searchParams.get("q") || "";
//   const initialSort = searchParams.get("sort") || "default";
//   const [page, setPage] = useState(initialPage);
//   const [limit, setLimit] = useState(initialLimit);
//   const [q, setQ] = useState("");
//   const [debouncedQ, setDebouncedQ] = useState("");
//   const [sort, setSort] = useState(initialSort);
//   useEffect(() => {
//     setTimeout(() => {
//       setQ(initialQ);
//     }, 0);
//   }, []); 
//   useEffect(() => {
//     const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
//     return () => clearTimeout(t);
//   }, [q]);
//   const { data, isLoading } = useProductsQuery({
//     page,
//     limit,
//     q: debouncedQ || undefined,
//     sort: sort !== "default" ? sort : undefined,
//   });
//   useEffect(() => {
//     const spQ = searchParams.get("q") || "";
//     const spPage = Number(searchParams.get("page")) || 1;
//     const spLimit = Number(searchParams.get("limit")) || 16;
//     const spSort = searchParams.get("sort") || "default";
//     setTimeout(() => {
//       if (spQ !== q) setQ(spQ);
//       if (spPage !== page) setPage(spPage);
//       if (spLimit !== limit) setLimit(spLimit);
//       if (spSort !== sort) setSort(spSort);
//     }, 0);
//   }, [searchParams]);
//   useEffect(() => {
//     const params = {};
//     if (debouncedQ) params.q = debouncedQ;
//     if (page && page !== 1) params.page = String(page);
//     if (limit && limit !== 16) params.limit = String(limit);
//     if (sort && sort !== "default") params.sort = sort;
//     setSearchParams(params);
//   }, [debouncedQ, page, limit, sort, setSearchParams]);

//   // Handle data structure from backend
//   const rawProducts = Array.isArray(data?.data) ? data.data : [];
//   const isServerPagination = typeof data?.total === 'number';
//   const searchLower = debouncedQ.toLowerCase();
//   const clientFiltered = !isServerPagination && searchLower
//     ? rawProducts.filter((p) => {
//         const fields = [
//           p.name,
//           p.category,
//           ...(Array.isArray(p.tags) ? p.tags : []),
//         ].filter(Boolean).map((x) => String(x).toLowerCase());
//         return fields.some((f) => f.includes(searchLower));
//       })
//     : rawProducts;
//   const total = isServerPagination ? data.total : clientFiltered.length;
  
//   // If backend doesn't paginate, we do it here
//   let displayed = clientFiltered;
//   if (sort === "price") {
//     displayed = [...displayed].sort((a, b) => Number(a.price) - Number(b.price));
//   } else if (sort === "newest") {
//     displayed = [...displayed].sort(
//       (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
//     );
//   }
//   const products = isServerPagination 
//     ? rawProducts 
//     : displayed.slice((page - 1) * limit, page * limit);
    
//   const totalPages = Math.ceil(total / limit);

//   return (
//     <>
//       <PageHero title="Shop" />

//       {/* Toolbar */}
//       <Container className="py-6">
//         <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#F9F1E7] px-8 py-6">
//           <div className="flex items-center gap-4">
//              {/* Filter Icon placeholder */}
//             <div className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-70">
//                 <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M22.3996 7.5L2.39961 7.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M18.2336 12.5L6.56689 12.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
//                 <path d="M14.8996 17.5L9.89961 17.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 Filter
//             </div>
//             <div className="h-6 w-[2px] bg-neutral-400 mx-2"></div>
//             <div className="text-sm text-neutral-600">
//                 Showing {products.length > 0 ? (page - 1) * limit + 1 : 0}–{Math.min(page * limit, total)} of {total} results
//             </div>
//           </div>

//           <div className="flex items-center gap-4 text-sm">
//             <div className="relative">
//               <input
//                 value={q}
//                 onChange={(e) => { setPage(1); setQ(e.target.value); }}
//                 placeholder="Search products…"
//                 className="h-10 w-64 rounded-md bg-white px-3 text-neutral-700 outline-none placeholder:text-neutral-400"
//               />
//             </div>
//             <label className="text-base">Show</label>
//             <div className="bg-white p-2 text-neutral-400">
//                 <select 
//                     value={limit} 
//                     onChange={(e) => setLimit(Number(e.target.value))}
//                     className="bg-transparent outline-none text-neutral-600"
//                 >
//                 <option value={16}>16</option>
//                 <option value={32}>32</option>
//                 <option value={48}>48</option>
//                 </select>
//             </div>

//             <label className="text-base ml-4">Sort by</label>
//             <div className="bg-white px-4 py-2 text-neutral-400 min-w-[140px]">
//               <select
//                 value={sort}
//                 onChange={(e) => { setPage(1); setSort(e.target.value); }}
//                 className="bg-transparent outline-none w-full text-neutral-600"
//               >
//                 <option value="default">Default</option>
//                 <option value="price">Price</option>
//                 <option value="newest">Newest</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </Container>

//       {/* Product Grid */}
//       <Container className="pb-16">
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
//           {isLoading
//             ? Array.from({ length: 8 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-72 animate-pulse rounded-lg bg-neutral-100"
//                 />
//               ))
//             : products.map((p) => (
//                 <ProductCard
//                   key={p._id}
//                   p={{
//                     id: p._id,
//                     title: p.name,
//                     price: p.price,
//                     image: p.images?.length
//                       ? `${BASE_URL}${p.images[0].url}`
//                       : "https://placehold.co/400x300?text=No+Image",
//                     stock: p.stock ?? 0,
//                   }}
//                 />
//               ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-12 flex items-center justify-center gap-4">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               className={`h-12 px-6 rounded-lg text-lg font-medium transition-colors ${
//                 page === 1 ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" : "bg-[#F9F1E7] hover:bg-[#FBEBB5]"
//               }`}
//             >
//               Prev
//             </button>
//             <div className="h-12 min-w-12 rounded-lg bg-[#FBEBB5] px-6 flex items-center justify-center text-lg font-medium">
//               {page}
//             </div>
//             <button
//               disabled={page >= totalPages}
//               onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//               className={`h-12 px-6 rounded-lg text-lg font-medium transition-colors ${
//                 page >= totalPages ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" : "bg-[#F9F1E7] hover:bg-[#FBEBB5]"
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// }















































// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import ProductCard from "../components/common/ProductCard";
// import { useProductsQuery } from "../services/api";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

// export default function Shop() {
//   const [searchParams, setSearchParams] = useSearchParams();

//   const pageFromUrl = Number(searchParams.get("page")) || 1;
//   const limitFromUrl = Number(searchParams.get("limit")) || 16;
//   const qFromUrl = searchParams.get("q") || "";
//   const sortFromUrl = searchParams.get("sort") || "default";

//   const [page, setPage] = useState(pageFromUrl);
//   const [limit, setLimit] = useState(limitFromUrl);
//   const [q, setQ] = useState(qFromUrl);
//   const [debouncedQ, setDebouncedQ] = useState(qFromUrl);
//   const [sort, setSort] = useState(sortFromUrl);

//   // Debounce search
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setDebouncedQ(q.trim());
//       setPage(1);
//     }, 400);
//     return () => clearTimeout(t);
//   }, [q]);

//   // Fetch products (backend paginated)
//   const { data, isLoading } = useProductsQuery({
//     page,
//     limit,
//     q: debouncedQ || undefined,
//     sort: sort !== "default" ? sort : undefined,
//   });

//   // Sync URL
//   useEffect(() => {
//     const params = {};
//     if (page > 1) params.page = page;
//     if (limit !== 16) params.limit = limit;
//     if (debouncedQ) params.q = debouncedQ;
//     if (sort !== "default") params.sort = sort;
//     setSearchParams(params);
//   }, [page, limit, debouncedQ, sort, setSearchParams]);

//   // Backend data
//   const products = Array.isArray(data?.data) ? data.data : [];
//   const total =
//     typeof data?.pagination?.total === "number"
//       ? data.pagination.total
//       : products.length;

//   const totalPages = Math.ceil(total / limit);

//   // Pagination helper
//   function getPaginationPages(current, total) {
//     if (total <= 1) return [];
//     const pages = [];
//     pages.push(1);

//     if (current > 3) pages.push("...");
//     for (
//       let i = Math.max(2, current - 1);
//       i <= Math.min(total - 1, current + 1);
//       i++
//     ) {
//       pages.push(i);
//     }
//     if (current < total - 2) pages.push("...");
//     pages.push(total);

//     return [...new Set(pages)];
//   }

//   return (
//     <>
//       <PageHero title="Shop" />

//       {/* Toolbar */}
//       <Container className="py-6">
//         <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-[#F9F1E7] px-8 py-6">
//           <div className="text-sm text-neutral-600">
//             Showing {products.length ? (page - 1) * limit + 1 : 0}–
//             {Math.min(page * limit, total)} of {total} results
//           </div>

//           <div className="flex gap-4">
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search products…"
//               className="h-10 w-60 rounded-md bg-white px-3 outline-none"
//             />

//             <select
//               value={limit}
//               onChange={(e) => {
//                 setLimit(Number(e.target.value));
//                 setPage(1);
//               }}
//               className="h-10 rounded-md bg-white px-3 outline-none"
//             >
//               <option value={16}>16</option>
//               <option value={32}>32</option>
//               <option value={48}>48</option>
//             </select>

//             <select
//               value={sort}
//               onChange={(e) => {
//                 setSort(e.target.value);
//                 setPage(1);
//               }}
//               className="h-10 rounded-md bg-white px-3 outline-none"
//             >
//               <option value="default">Default</option>
//               <option value="price">Price</option>
//               <option value="newest">Newest</option>
//             </select>
//           </div>
//         </div>
//       </Container>

//       {/* Products */}
//       <Container className="pb-16">
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
//           {isLoading
//             ? Array.from({ length: limit }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-72 animate-pulse rounded-lg bg-neutral-100"
//                 />
//               ))
//             : products.map((p) => (
//                 <ProductCard
//                   key={p._id}
//                   p={{
//                     id: p._id,
//                     title: p.name,
//                     price: p.price,
//                     image: p.images?.length
//                       ? `${BASE_URL}${p.images[0].url}`
//                       : "https://placehold.co/400x300?text=No+Image",
//                     stock: p.stock ?? 0,
//                   }}
//                 />
//               ))}
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-14 flex items-center justify-center gap-2">
//             <button
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//               className="h-10 px-4 rounded-md border bg-white disabled:opacity-40"
//             >
//               Prev
//             </button>

//             {getPaginationPages(page, totalPages).map((p, i) =>
//               p === "..." ? (
//                 <span key={i} className="px-2 text-neutral-400">…</span>
//               ) : (
//                 <button
//                   key={p}
//                   onClick={() => setPage(p)}
//                   className={`h-10 w-10 rounded-md border
//                     ${page === p ? "bg-[#FBEBB5]" : "bg-white hover:bg-[#F9F1E7]"}`}
//                 >
//                   {p}
//                 </button>
//               )
//             )}

//             <button
//               disabled={page === totalPages}
//               onClick={() => setPage(page + 1)}
//               className="h-10 px-4 rounded-md border bg-white disabled:opacity-40"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// }
























// import { useEffect, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import PageHero from "../components/common/PageHero";
// import Container from "../components/layout/Container";
// import ProductCard from "../components/common/ProductCard";
// import { useProductsQuery } from "../services/api";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

// export default function Shop() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const productsRef = useRef(null);

//   // URL state
//   const pageFromUrl = Number(searchParams.get("page")) || 1;
//   const limitFromUrl = Number(searchParams.get("limit")) || 16;
//   const qFromUrl = searchParams.get("q") || "";
//   const sortFromUrl = searchParams.get("sort") || "default";

//   // Local state
//   const [page, setPage] = useState(pageFromUrl);
//   const [limit, setLimit] = useState(limitFromUrl);
//   const [q, setQ] = useState(qFromUrl);
//   const [debouncedQ, setDebouncedQ] = useState(qFromUrl);
//   const [sort, setSort] = useState(sortFromUrl);
//   const [direction, setDirection] = useState(0); // animation direction

//   // Debounce search
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setDebouncedQ(q.trim());
//       setPage(1);
//     }, 400);
//     return () => clearTimeout(t);
//   }, [q]);

//   // Fetch products (backend pagination)
//   const { data, isLoading } = useProductsQuery({
//     page,
//     limit,
//     q: debouncedQ || undefined,
//     sort: sort !== "default" ? sort : undefined,
//   });

//   // Sync URL
//   useEffect(() => {
//     const params = {};
//     if (page > 1) params.page = page;
//     if (limit !== 16) params.limit = limit;
//     if (debouncedQ) params.q = debouncedQ;
//     if (sort !== "default") params.sort = sort;
//     setSearchParams(params);
//   }, [page, limit, debouncedQ, sort, setSearchParams]);

//   // Scroll to products on page change
//   // useEffect(() => {
//   //   productsRef.current?.scrollIntoView({
//   //     behavior: "smooth",
//   //     block: "start",
//   //   });
//   // }, [page]);
// useEffect(() => {
//   if (!isLoading && productsRef.current) {
//     const elementTop = productsRef.current.getBoundingClientRect().top + window.pageYOffset;
//     const offset = 140; // adjust depending on your header + toolbar height
//     window.scrollTo({
//       top: elementTop - offset,
//       behavior: "smooth",
//     });
//   }
// }, [page, isLoading]);




//   // Backend data
//   const products = Array.isArray(data?.data) ? data.data : [];
//   const total =
//     typeof data?.pagination?.total === "number"
//       ? data.pagination.total
//       : products.length;

//   const totalPages = Math.ceil(total / limit);

//   // Pagination helper (1 … 4 5 6 … 10)
//   function getPaginationPages(current, total) {
//     if (total <= 1) return [];
//     const pages = [];

//     pages.push(1);
//     if (current > 3) pages.push("...");

//     for (
//       let i = Math.max(2, current - 1);
//       i <= Math.min(total - 1, current + 1);
//       i++
//     ) {
//       pages.push(i);
//     }

//     if (current < total - 2) pages.push("...");
//     pages.push(total);

//     return [...new Set(pages)];
//   }

//   // Framer Motion variants
//   const variants = {
//     enter: (direction) => ({
//       x: direction > 0 ? 80 : -80,
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction) => ({
//       x: direction > 0 ? -80 : 80,
//       opacity: 0,
//     }),
//   };

//   return (
//     <>
//       <PageHero title="Shop" />

//       {/* Toolbar */}
//       <Container className="py-6">
//         <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-[#F9F1E7] px-8 py-6">
//           <div className="text-sm text-neutral-600">
//             Showing {products.length ? (page - 1) * limit + 1 : 0}–
//             {Math.min(page * limit, total)} of {total} results
//           </div>

//           <div className="flex flex-wrap items-center gap-4">
//             <input
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               placeholder="Search products…"
//               className="h-10 w-60 rounded-md bg-white px-3 outline-none"
//             />

//             <select
//               value={limit}
//               onChange={(e) => {
//                 setLimit(Number(e.target.value));
//                 setPage(1);
//               }}
//               className="h-10 rounded-md bg-white px-3 outline-none"
//             >
//               <option value={16}>16</option>
//               <option value={32}>32</option>
//               <option value={48}>48</option>
//             </select>

//             <select
//               value={sort}
//               onChange={(e) => {
//                 setSort(e.target.value);
//                 setPage(1);
//               }}
//               className="h-10 rounded-md bg-white px-3 outline-none"
//             >
//               <option value="default">Default</option>
//               <option value="price">Price</option>
//               <option value="newest">Newest</option>
//             </select>
//           </div>
//         </div>
//       </Container>

//       {/* Products */}
//       <Container className="pb-16" ref={productsRef}>
//         <AnimatePresence custom={direction} mode="wait">
//           <motion.div
//             key={page}
//             custom={direction}
//             variants={variants}
//             initial="enter"
//             animate="center"
//             exit="exit"
//             transition={{ duration: 0.35, ease: "easeOut" }}
//             className="grid gap-8 sm:grid-cols-2 md:grid-cols-4"
//           >
//             {isLoading
//               ? Array.from({ length: limit }).map((_, i) => (
//                   <div
//                     key={i}
//                     className="h-72 animate-pulse rounded-lg bg-neutral-100"
//                   />
//                 ))
//               : products.map((p) => (
//                   <ProductCard
//                     key={p._id}
//                     p={{
//                       id: p._id,
//                       title: p.name,
//                       price: p.price,
//                       image: p.images?.length
//                         ? `${BASE_URL}${p.images[0].url}`
//                         : "https://placehold.co/400x300?text=No+Image",
//                       stock: p.stock ?? 0,
//                     }}
//                   />
//                 ))}
//           </motion.div>
//         </AnimatePresence>

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="mt-14 flex items-center justify-center gap-2">
//             {/* Prev */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={page === 1 || isLoading}
//               onClick={() => {
//                 setDirection(-1);
//                 setPage(page - 1);
//               }}
//               className="h-10 px-4 rounded-md border bg-white disabled:opacity-40"
//             >
//               Prev
//             </motion.button>

//             {/* Numbers */}
//             {getPaginationPages(page, totalPages).map((p, i) =>
//               p === "..." ? (
//                 <span key={i} className="px-2 text-neutral-400">…</span>
//               ) : (
//                 <motion.button
//                   key={p}
//                   whileHover={{ scale: 1.15 }}
//                   whileTap={{ scale: 0.95 }}
//                   disabled={isLoading}
//                   onClick={() => {
//                     setDirection(p > page ? 1 : -1);
//                     setPage(p);
//                   }}
//                   className={`h-10 w-10 rounded-md border text-sm font-medium
//                     ${
//                       page === p
//                         ? "bg-[#FBEBB5] border-[#FBEBB5]"
//                         : "bg-white hover:bg-[#F9F1E7]"
//                     }`}
//                 >
//                   {p}
//                 </motion.button>
//               )
//             )}

//             {/* Next */}
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               disabled={page === totalPages || isLoading}
//               onClick={() => {
//                 setDirection(1);
//                 setPage(page + 1);
//               }}
//               className="h-10 px-4 rounded-md border bg-white disabled:opacity-40"
//             >
//               Next
//             </motion.button>
//           </div>
//         )}
//       </Container>
//     </>
//   );
// }























import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import ProductCard from "../components/common/ProductCard";
import { useProductsQuery } from "../services/api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // URL state
  const pageFromUrl = Number(searchParams.get("page")) || 1;
  const limitFromUrl = Number(searchParams.get("limit")) || 16;
  const qFromUrl = searchParams.get("q") || "";
  const sortFromUrl = searchParams.get("sort") || "default";

  // Local state
  const [page, setPage] = useState(pageFromUrl);
  const [limit, setLimit] = useState(limitFromUrl);
  const [q, setQ] = useState(qFromUrl);
  const [debouncedQ, setDebouncedQ] = useState(qFromUrl);
  const [sort, setSort] = useState(sortFromUrl);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQ(q.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [q]);

  // Fetch products (backend pagination)
  const { data, isLoading } = useProductsQuery({
    page,
    limit,
    q: debouncedQ || undefined,
    sort: sort !== "default" ? sort : undefined,
  });

  // Sync URL
  useEffect(() => {
    const params = {};
    if (page > 1) params.page = page;
    if (limit !== 16) params.limit = limit;
    if (debouncedQ) params.q = debouncedQ;
    if (sort !== "default") params.sort = sort;
    setSearchParams(params);
  }, [page, limit, debouncedQ, sort, setSearchParams]);

  // Scroll to top of page on page/limit/search/sort change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, limit, debouncedQ, sort]);

  // Backend data
  const products = Array.isArray(data?.data) ? data.data : [];
  const total =
    typeof data?.pagination?.total === "number"
      ? data.pagination.total
      : products.length;

  const totalPages = Math.ceil(total / limit);

  // Pagination helper (1 … 4 5 6 … 10)
  function getPaginationPages(current, total) {
    if (total <= 1) return [];
    const pages = [];
    pages.push(1);

    if (current > 3) pages.push("...");
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }

    if (current < total - 2) pages.push("...");
    pages.push(total);

    return [...new Set(pages)];
  }

  return (
    <>
      <PageHero title="Shop" />

      {/* Toolbar */}
      <Container className="py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-md bg-[#F9F1E7] px-8 py-6">
          <div className="text-sm text-neutral-600">
            Showing {products.length ? (page - 1) * limit + 1 : 0}–
            {Math.min(page * limit, total)} of {total} results
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-60 rounded-md bg-white px-3 outline-none"
            />

            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
              }}
              className="h-10 rounded-md bg-white px-3 outline-none"
            >
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={48}>48</option>
            </select>

            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
              className="h-10 rounded-md bg-white px-3 outline-none"
            >
              <option value="default">Default</option>
              <option value="price">Price</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </Container>

      {/* Products */}
      <Container className="pb-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: limit }).map((_, i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-lg bg-neutral-100"
                />
              ))
            : products.map((p) => (
                <ProductCard
                  key={p._id}
                  p={{
                    id: p._id,
                    title: p.name,
                    price: p.price,
                    image: p.images?.length
                      ? `${BASE_URL}${p.images[0].url}`
                      : "https://placehold.co/400x300?text=No+Image",
                    stock: p.stock ?? 0,
                  }}
                />
              ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex items-center justify-center gap-2">
            {/* Prev */}
            <button
              disabled={page === 1 || isLoading}
              onClick={() => setPage(page - 1)}
              className="h-10 px-4 rounded-md border bg-white disabled:opacity-40 hover:scale-105 transition-transform"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {getPaginationPages(page, totalPages).map((p, i) =>
              p === "..." ? (
                <span key={i} className="px-2 text-neutral-400">…</span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  disabled={isLoading}
                  className={`h-10 w-10 rounded-md border transition-transform
                    ${
                      page === p
                        ? "bg-[#FBEBB5] border-[#FBEBB5]"
                        : "bg-white hover:bg-[#F9F1E7] hover:scale-105"
                    }`}
                >
                  {p}
                </button>
              )
            )}

            {/* Next */}
            <button
              disabled={page === totalPages || isLoading}
              onClick={() => setPage(page + 1)}
              className="h-10 px-4 rounded-md border bg-white disabled:opacity-40 hover:scale-105 transition-transform"
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </>
  );
}
