import { useState } from "react";
import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import ProductCard from "../components/common/ProductCard";
import { useProductsQuery } from "../services/api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Shop() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(16);
  const { data, isLoading } = useProductsQuery({ page, limit });

  // Handle data structure from backend
  const rawProducts = Array.isArray(data?.data) ? data.data : [];
  const isServerPagination = typeof data?.total === 'number';
  const total = isServerPagination ? data.total : rawProducts.length;
  
  // If backend doesn't paginate, we do it here
  const products = isServerPagination 
    ? rawProducts 
    : rawProducts.slice((page - 1) * limit, page * limit);
    
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      <PageHero title="Shop" />

      {/* Toolbar */}
      <Container className="py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-[#F9F1E7] px-8 py-6">
          <div className="flex items-center gap-4">
             {/* Filter Icon placeholder */}
            <div className="flex items-center gap-2 text-sm font-medium cursor-pointer hover:opacity-70">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.3996 7.5L2.39961 7.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.2336 12.5L6.56689 12.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.8996 17.5L9.89961 17.5" stroke="black" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Filter
            </div>
            <div className="h-6 w-[2px] bg-neutral-400 mx-2"></div>
            <div className="text-sm text-neutral-600">
                Showing {products.length > 0 ? (page - 1) * limit + 1 : 0}–{Math.min(page * limit, total)} of {total} results
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <label className="text-base">Show</label>
            <div className="bg-white p-2 text-neutral-400">
                <select 
                    value={limit} 
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="bg-transparent outline-none text-neutral-600"
                >
                <option value={16}>16</option>
                <option value={32}>32</option>
                <option value={48}>48</option>
                </select>
            </div>

            <label className="text-base ml-4">Sort by</label>
            <div className="bg-white px-4 py-2 text-neutral-400 min-w-[120px]">
                <select className="bg-transparent outline-none w-full text-neutral-600">
                <option value="default">Default</option>
                <option value="price">Price</option>
                <option value="newest">Newest</option>
                </select>
            </div>
          </div>
        </div>
      </Container>

      {/* Product Grid */}
      <Container className="pb-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
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
                  }}
                />
              ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-4">
          {page > 1 && (
             <button 
                onClick={() => setPage(p => p - 1)}
                className="h-12 px-6 rounded-lg bg-[#F9F1E7] text-lg font-medium hover:bg-[#FBEBB5] transition-colors"
             >
               Prev
             </button>
          )}

          {Array.from({ length: totalPages }).map((_, i) => {
             const pNum = i + 1;
             // Show first, last, current, and surrounding pages
             if (pNum === 1 || pNum === totalPages || (pNum >= page - 1 && pNum <= page + 1)) {
                 return (
                    <button 
                        key={pNum}
                        onClick={() => setPage(pNum)}
                        className={`h-12 w-12 rounded-lg text-lg font-medium transition-colors ${page === pNum ? 'bg-[#FBEBB5]' : 'bg-[#F9F1E7] hover:bg-[#FBEBB5]'}`}
                    >
                        {pNum}
                    </button>
                 );
             } else if (pNum === page - 2 || pNum === page + 2) {
                 return <span key={pNum} className="self-end pb-2">...</span>;
             }
             return null;
          })}

          {page < totalPages && (
          <button 
             onClick={() => setPage(p => p + 1)}
             className="h-12 px-6 rounded-lg bg-[#F9F1E7] text-lg font-medium hover:bg-[#FBEBB5] transition-colors"
          >
            Next
          </button>
          )}
        </div>
        )}
      </Container>
    </>
  );
}
