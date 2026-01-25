import { useParams } from "react-router-dom";
import Container from "../components/layout/Container";
import Button from "../components/ui/button";
import Badge from "../components/ui/badge";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { useProductByIdQuery, useAddToCartMutation } from "../services/api";
import { toast } from "sonner";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const role = useSelector((s) => s.auth.role);
  const { data, isLoading } = useProductByIdQuery(id);
  const [addRemote] = useAddToCartMutation();

  const fallback = {
    id,
    title: "Asgaard sofa",
    price: 250000,
    rating: 4.5,
    images: [
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524758631624-74f4d37dd068?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop",
    ],
    colors: ["#000000", "#7C6A5B", "#E1D5C9", "#F5DAB7"],
    sizes: ["S", "M", "L", "XL"],
  };

  const p = data
    ? {
        id: data.id || data._id,
        title: data.title || data.name,
        price: data.price,
        rating: data.rating || 4.5,
        images: data.images?.length ? data.images : fallback.images,
        colors: data.colors?.length ? data.colors : fallback.colors,
        sizes: data.sizes?.length ? data.sizes : fallback.sizes,
      }
    : fallback;

  return (
    <>
      <section className="bg-neutral-100">
        <Container className="py-10">
          <div className="text-sm text-neutral-600">Home › Shop › {p.title}</div>
        </Container>
      </section>
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="grid grid-cols-4 gap-3">
            <div className="col-span-4 aspect-[4/3] overflow-hidden rounded-lg bg-neutral-100">
              {isLoading ? (
                <div className="h-full w-full animate-pulse rounded-lg bg-neutral-100" />
              ) : (
                <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
              )}
            </div>
            {p.images.slice(1).map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
                <img src={img} alt="thumb" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{p.title}</h1>
            <div className="mt-2 text-lg font-medium">Rs. {p.price.toLocaleString()}</div>
            <div className="mt-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(p.rating) ? "text-yellow-500" : "text-neutral-300"}`}
                  fill="currentColor"
                />
              ))}
              <span className="ml-2 text-xs text-neutral-600">1 Customer review</span>
            </div>
            <p className="mt-4 text-sm text-neutral-700">
              The Asgaard sofa is our best choice for studio apartments. Choose the detailing to complement your
              mood. The modular design is clean-lined and modern.
            </p>
            <div className="mt-6 space-y-4">
              <div>
                <div className="text-xs text-neutral-600">Color</div>
                <div className="mt-2 flex gap-2">
                  {p.colors.map((c) => (
                    <button
                      key={c}
                      className="h-7 w-7 rounded-full border border-neutral-300"
                      style={{ backgroundColor: c }}
                      aria-label={`Color ${c}`}
                    />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs text-neutral-600">Size</div>
                <div className="mt-2 flex gap-2">
                  {p.sizes.map((s) => (
                    <Badge key={s} className="cursor-pointer">{s}</Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button
                disabled={role === "admin"}
                onClick={async () => {
                  if (role === "admin") {
                    toast.error("Admins cannot purchase products");
                    return;
                  }
                  dispatch(addToCart({ id: p.id, title: p.title, price: p.price }));
                  try {
                    await addRemote({ productId: p.id, qty: 1 });
                  } catch (e) {
                    console.error("Remote cart add failed", e);
                  }
                }}
              >
                Add To Cart
              </Button>
              <Button variant="outline">Compare</Button>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 rounded-md border border-neutral-200 p-4 text-sm">
              <div>
                <div className="text-neutral-500">SKU</div>
                <div>SS001</div>
              </div>
              <div>
                <div className="text-neutral-500">Category</div>
                <div>Sofas</div>
              </div>
              <div>
                <div className="text-neutral-500">Tags</div>
                <div>Chairs, Home, Shop</div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="py-10">
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="rounded-lg bg-neutral-100 p-4">
              <img
                src="https://images.unsplash.com/photo-1524758631624-74f4d37dd068?q=80&w=1200&auto=format&fit=crop"
                alt="detail"
                className="h-48 w-full rounded-md object-cover"
              />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <h3 className="text-xl font-semibold">Related Products</h3>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i}>
                <div className="aspect-[4/3] rounded-lg bg-neutral-100" />
                <div className="mt-2 text-sm">Rs. 25,000.00</div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-6">
            View More
          </Button>
        </div>
      </Container>
    </>
  );
}
