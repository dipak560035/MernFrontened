import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import ProductCard from "../components/common/ProductCard";
import { useProductsQuery } from "../services/api";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const initialLimit = Number(searchParams.get("limit")) || 16;
  const initialQ = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "default";
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sort, setSort] = useState(initialSort);
  useEffect(() => {
    setTimeout(() => {
      setQ(initialQ);
    }, 0);
  }, []); 
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);
  const { data, isLoading } = useProductsQuery({
    page,
    limit,
    q: debouncedQ || undefined,
    sort: sort !== "default" ? sort : undefined,
  });
  useEffect(() => {
    const spQ = searchParams.get("q") || "";
    const spPage = Number(searchParams.get("page")) || 1;
    const spLimit = Number(searchParams.get("limit")) || 16;
    const spSort = searchParams.get("sort") || "default";
    setTimeout(() => {
      if (spQ !== q) setQ(spQ);
      if (spPage !== page) setPage(spPage);
      if (spLimit !== limit) setLimit(spLimit);
      if (spSort !== sort) setSort(spSort);
    }, 0);
  }, [searchParams]);
  useEffect(() => {
    const params = {};
    if (debouncedQ) params.q = debouncedQ;
    if (page && page !== 1) params.page = String(page);
    if (limit && limit !== 16) params.limit = String(limit);
    if (sort && sort !== "default") params.sort = sort;
    setSearchParams(params);
  }, [debouncedQ, page, limit, sort, setSearchParams]);

  // Handle data structure from backend
  const rawProducts = Array.isArray(data?.data) ? data.data : [];
  const isServerPagination = typeof data?.total === 'number';
  const searchLower = debouncedQ.toLowerCase();
  const clientFiltered = !isServerPagination && searchLower
    ? rawProducts.filter((p) => {
        const fields = [
          p.name,
          p.category,
          ...(Array.isArray(p.tags) ? p.tags : []),
        ].filter(Boolean).map((x) => String(x).toLowerCase());
        return fields.some((f) => f.includes(searchLower));
      })
    : rawProducts;
  const total = isServerPagination ? data.total : clientFiltered.length;
  
  // If backend doesn't paginate, we do it here
  let displayed = clientFiltered;
  if (sort === "price") {
    displayed = [...displayed].sort((a, b) => Number(a.price) - Number(b.price));
  } else if (sort === "newest") {
    displayed = [...displayed].sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  }
  const products = isServerPagination 
    ? rawProducts 
    : displayed.slice((page - 1) * limit, page * limit);
    
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
            <div className="relative">
              <input
                value={q}
                onChange={(e) => { setPage(1); setQ(e.target.value); }}
                placeholder="Search products…"
                className="h-10 w-64 rounded-md bg-white px-3 text-neutral-700 outline-none placeholder:text-neutral-400"
              />
            </div>
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
            <div className="bg-white px-4 py-2 text-neutral-400 min-w-[140px]">
              <select
                value={sort}
                onChange={(e) => { setPage(1); setSort(e.target.value); }}
                className="bg-transparent outline-none w-full text-neutral-600"
              >
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
                    stock: p.stock ?? 0,
                  }}
                />
              ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`h-12 px-6 rounded-lg text-lg font-medium transition-colors ${
                page === 1 ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" : "bg-[#F9F1E7] hover:bg-[#FBEBB5]"
              }`}
            >
              Prev
            </button>
            <div className="h-12 min-w-12 rounded-lg bg-[#FBEBB5] px-6 flex items-center justify-center text-lg font-medium">
              {page}
            </div>
            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className={`h-12 px-6 rounded-lg text-lg font-medium transition-colors ${
                page >= totalPages ? "bg-neutral-200 text-neutral-500 cursor-not-allowed" : "bg-[#F9F1E7] hover:bg-[#FBEBB5]"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </Container>
    </>
  );
}
