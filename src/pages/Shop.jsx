import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import { Link } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";

const MOCK = Array.from({ length: 16 }).map((_, i) => ({
  id: i + 1,
  title: ["Trenton modular sofa", "Granite dining table", "Outdoor bar table and stool", "Plain console with teak mirror"][i % 4],
  price: [25000, 100000, 25000, 25000][i % 4],
  image:
    ["https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1582582429416-d684482636c0?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524758631624-74f4d37dd068?q=80&w=1200&auto=format&fit=crop"][i % 4],
}));

export default function Shop() {
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
          {MOCK.map((p) => (
            <ProductCard key={p.id} p={p} />
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
