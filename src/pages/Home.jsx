import Container from "../components/layout/Container";
import Button from "../components/ui/button";
import { Link } from "react-router-dom";
import { useProductsQuery } from "../services/api";
import ProductCard from "../components/common/ProductCard";

export default function Home() {
  const BASE_URL = "http://localhost:4001";

  const { data, isLoading } = useProductsQuery({ limit: 4 });
  const products =
    (Array.isArray(data?.data) && data.data) ||
    (Array.isArray(data) && data) ||
    [
      // {
      //   id: 1,
      //   title: "Rocket single seater",
      //   price: 250000,
      //   image:
      //     "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      // },
      // {
      //   id: 2,
      //   title: "Outdoor bar table and stool",
      //   price: 25000,
      //   image:
      //     "https://images.unsplash.com/photo-1582582429416-d684482636c0?q=80&w=1200&auto=format&fit=crop",
      // },
      // {
      //   id: 3,
      //   title: "Granite dining table",
      //   price: 100000,
      //   image:
      //     "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      // },
      // {
      //   id: 4,
      //   title: "Plain console with teak mirror",
      //   price: 25000,
      //   image:
      //     "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop",
      // },
    ];

  return (
    <>
      <section className="bg-brand-light">
        <Container className="py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold">Rocket single seater</h1>
              {/* <Button  className="mt-6" as="a" href="/shop">
                Shop Now
              </Button> */}
     <Link to="/shop">
  <Button className="mt-6">
    Shop Now
  </Button>
</Link>
            </div>
            <div className="flex justify-end">
              <img
                src="https://ak1.ostkcdn.com/images/products/is/images/direct/cc1e27e9b5d35e3ff5db228168bccefc9788045a/Single-sofa-chair-for-bedroom-living-room-with-wooden-legs.jpg?impolicy=medium"
                alt="Hero Chair"
                className="h-64 w-64 rounded-lg object-cover shadow-soft md:h-80 md:w-80"
              />
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-soft">
            <img
              src="https://mohh.com/cdn/shop/files/Jane-Side-Table-1.jpg?v=1749014881"
              alt="Side table"
              className="h-48 w-full rounded-lg object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold">Side table</h3>
            <Link to="/shop" className="text-sm font-medium underline">
              View More
            </Link>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lkZSUyMHRhYmxlfGVufDB8fDB8fHww"
              alt="Side table"
              className="h-48 w-full rounded-lg object-cover"
            />
            <h3 className="mt-4 text-lg font-semibold">Side table</h3>
            <Link to="/shop" className="text-sm font-medium underline">
              View More
            </Link>
          </div>
        </div>
      </Container>

      <Container>
        <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold">Top Picks For You</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Find a bright ideal to suit your taste with our great selection.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-40 animate-pulse rounded-lg bg-neutral-100" />
              ))
            : (Array.isArray(products) ? products : []).map((p) => (
                <ProductCard
                  key={p.id || p._id}
                  p={{
                    id: p.id || p._id,
                    title: p.title || p.name,
                    price: p.price,
                    image:
  p.image ||
  (p.images?.length
    ? `${BASE_URL}${p.images[0].url}`
    : "https://placehold.co/400x300?text=No+Image"),

                    // image:
                    //   p.image ||
                    //   (Array.isArray(p.images) ? (typeof p.images[0] === "string" ? p.images[0] : p.images[0]?.url) : undefined),
                  }}
                />


              ))}
        </div>
      </Container>

      <section className="mt-16 bg-brand-light">
        <Container className="py-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">New Arrivals</p>
              <h3 className="mt-2 text-2xl font-semibold">Asgard sofa</h3>
              {/* <Button className="mt-4" as="a" href="/product/1">
                Order Now
              </Button> */}
              
 

<Link to="/product/6980e1ee5dc791dfec9d5f5a">
  <Button className="mt-6">
    Order Now
  </Button>
</Link>

            </div>
            <img
              src="https://images.unsplash.com/photo-1684165610413-2401399e0e59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNvZmF8ZW58MHx8MHx8fDA%3D"
              alt="Asgaard sofa"
              className="h-56 w-56 rounded-lg object-cover shadow-soft md:h-72 md:w-72"
            />
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <h2 className="mb-6 text-center text-2xl font-semibold">Our Blogs</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg bg-white p-4 shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1524758631624-74f4d37dd068?q=80&w=1200&auto=format&fit=crop"
                alt="Blog"
                className="h-40 w-full rounded-lg object-cover"
              />
              <h4 className="mt-3 text-sm font-semibold">Going all-in with millennial design</h4>
              <div className="mt-2 text-xs text-neutral-600">Read More • 3 min</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline">View All Post</Button>
        </div>
      </Container>

      <Container className="py-12">
        <h2 className="mb-6 text-center text-2xl font-semibold">Our Instagram</h2>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <img
              key={i}
              src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop"
              alt="Insta"
              className="h-36 w-full rounded-lg object-cover"
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline">Follow Us</Button>
        </div>
      </Container>
    </>
  );
}
