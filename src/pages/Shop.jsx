import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import ProductCard from "../components/common/ProductCard";
import { useProductsQuery } from "../services/api";

export default function Shop() {
  const { data, isLoading } = useProductsQuery({ limit: 16 });
  const products =
    (Array.isArray(data?.items) && data.items) ||
    (Array.isArray(data) && data) ||
    [];
  return (
    <>
      <PageHero title="Shop" />

      <Container className="py-6">
        <div className="flex items-center justify-between rounded-md bg-neutral-100 px-4 py-3">
          <div className="text-sm">Filter</div>
          <div className="text-sm">Showing 1–16 of 32 results</div>
          <div className="flex items-center gap-3 text-sm">
            <label>Show</label>
            <select className="rounded-md border border-neutral-300 px-2 py-1">
              <option>16</option>
              <option>24</option>
            </select>
            <label>Sort by</label>
            <select className="rounded-md border border-neutral-300 px-2 py-1">
              <option>Default</option>
              <option>Price</option>
            </select>
          </div>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {isLoading && !Array.isArray(products)
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-40 animate-pulse rounded-lg bg-neutral-100" />
              ))
            : (Array.isArray(products) ? products : []).map((p) => (
                <ProductCard
                  key={p.id || p._id}
                  p={{
                    id: p.id || p._id,
                    title: p.title || p.name,
                    price: p.price,
                    image: p.image || p.images?.[0],
                  }}
                />
              ))}
        </div>
        <div className="mt-12 flex justify-center gap-3">
          {[1, 2, 3, "Next"].map((p) => (
            <button key={p} className="rounded-md border border-neutral-300 px-3 py-1 text-sm">
              {p}
            </button>
          ))}
        </div>
      </Container>
    </>
  );
}
