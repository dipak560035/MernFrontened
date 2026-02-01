

import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import ProductCard from "../components/common/ProductCard";
import { useProductsQuery } from "../services/api";

const BASE_URL = "http://localhost:4001";

export default function Shop() {
  const { data, isLoading } = useProductsQuery({ limit: 16 });

  // ✅ correct backend response handling
  const products = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      <PageHero title="Shop" />

      {/* Toolbar */}
      <Container className="py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-neutral-100 px-4 py-3">
          <div className="text-sm font-medium">Filter</div>

          <div className="text-sm text-neutral-600">
            Showing {products.length} products
          </div>

          <div className="flex items-center gap-3 text-sm">
            <label>Show</label>
            <select className="rounded-md border px-2 py-1">
              <option>16</option>
              <option>24</option>
            </select>

            <label>Sort by</label>
            <select className="rounded-md border px-2 py-1">
              <option value="createdAt">Latest</option>
              <option value="price">Price</option>
            </select>
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
                  className="h-48 animate-pulse rounded-lg bg-neutral-100"
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

        {/* Pagination (UI ready) */}
        <div className="mt-12 flex justify-center gap-3">
          {[1, 2, 3, "Next"].map((p) => (
            <button
              key={p}
              className="rounded-md border border-neutral-300 px-3 py-1 text-sm hover:bg-neutral-100"
            >
              {p}
            </button>
          ))}
        </div>
      </Container>
    </>
  );
}
