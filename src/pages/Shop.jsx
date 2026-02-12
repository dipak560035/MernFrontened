
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
