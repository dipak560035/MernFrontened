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

  
  <div className="mb-6 text-center">
    <div className="flex items-center justify-center gap-2 text-black-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7.75 2C4.68 2 2 4.68 2 7.75v8.5C2 19.32 4.68 22 7.75 22h8.5C19.32 22 22 19.32 22 16.25v-8.5C22 4.68 19.32 2 16.25 2h-8.5zm0 1.5h8.5c2.2 0 4 1.8 4 4v8.5c0 2.2-1.8 4-4 4h-8.5c-2.2 0-4-1.8-4-4v-8.5c0-2.2 1.8-4 4-4zm9.75 2.75a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
      </svg>
      <span className="font-medium">@heavencraft</span>
    </div>

    <h2 className="mt-3 text-3xl font-semibold">
      Follow Our Journey
    </h2>

    <p className="mt-2 text-gray-500 text-sm">
      Discover our latest drops & behind the scenes
    </p>
  </div>

  
  <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
    {[
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342452485-86ff0a8b9d3e?q=80&w=1200&auto=format&fit=crop",
    ].map((img, i) => (
      <a
        key={i}
        href="https://www.instagram.com/iamdeepaksha/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative overflow-hidden rounded-xl"
      >
        <img
          src={img}
          alt="Instagram Post"
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
          <span className="text-white text-sm font-medium tracking-wide">
            View on Instagram
          </span>
        </div>
      </a>
    ))}
  </div>

  
  <div className="mt-12 text-center">
    <a
      href="https://www.instagram.com/iamdeepaksha/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {/* <Button className="bg-pink-600 px-8 py-3 text-white hover:bg-pink-700 transition">
        Follow Us on Instagram
      </Button> */}
      <Button variant="outline">Follow Us on Instagram</Button>
    </a>
  </div>

</Container>


    </>
  );
}
