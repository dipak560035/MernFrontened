// import Container from "../components/layout/Container";
// import Button from "../components/ui/button";
// import { Link } from "react-router-dom";
// import { useProductsQuery } from "../services/api";
// import ProductCard from "../components/common/ProductCard";

// export default function Home() {
//   const BASE_URL = "http://localhost:4001";

//   const { data, isLoading } = useProductsQuery({ limit: 4 });
//   const products =
//     (Array.isArray(data?.data) && data.data) ||
//     (Array.isArray(data) && data) ||
//     [
     
//     ];

//   return (
//     <>
//     {/* <section className="bg-brand-light">
//   <Container className="py-16">
//     <div className="grid items-center gap-8 md:grid-cols-2">
//       <div>
//         <h1 className="text-4xl font-semibold">Rocket single seater</h1>
//         <Link to="/shop">
//           <Button className="mt-6">
//             Shop Now
//           </Button>
//         </Link>
//       </div>
//       <div className="flex justify-center md:justify-end">
//         <img
//           src="https://ak1.ostkcdn.com/images/products/is/images/direct/cc1e27e9b5d35e3ff5db228168bccefc9788045a/Single-sofa-chair-for-bedroom-living-room-with-wooden-legs.jpg?impolicy=medium"
//           alt="Rocket single seater"
//           className="w-full max-w-[500px] h-auto object-cover rounded-xl shadow-2xl md:max-w-[700px] lg:max-w-[800px]"
//         />
//       </div>
//     </div>
//   </Container>
// </section> */}
 




// <section className="bg-brand-light">
//   <Container className="py-16">
//     <div className="grid items-center gap-8 md:grid-cols-2">
//       <div>
//         <h1 className="text-4xl font-semibold">Rocket single seater</h1>
//         <Link to="/shop">
//           <Button className="mt-6">
//             Shop Now
//           </Button>
//         </Link>
//       </div>
//       <div className="flex justify-center md:justify-end">
//         <img
//           src="https://img.freepik.com/free-vector/beige-soft-leather-armchair-with-wooden-legs_107791-29582.jpg"
//           alt="Rocket single seater"
//           className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl md:max-w-[700px] lg:max-w-[800px]"
//         />
//       </div>
//     </div>
//   </Container>
// </section>




//       <Container className="py-16">
//         <div className="grid gap-6 sm:grid-cols-2">
//           <div className="rounded-lg bg-white p-6 shadow-soft">
//             <img
//               src="https://mohh.com/cdn/shop/files/Jane-Side-Table-1.jpg?v=1749014881"
//               alt="Side table"
//               className="h-48 w-full rounded-lg object-cover"
//             />
//             <h3 className="mt-4 text-lg font-semibold">Side table</h3>
//             <Link to="/shop" className="text-sm font-medium underline">
//               View More
//             </Link>
//           </div>

//           <div className="rounded-lg bg-white p-6 shadow-soft">
//             <img
//               src="https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2lkZSUyMHRhYmxlfGVufDB8fDB8fHww"
//               alt="Side table"
//               className="h-48 w-full rounded-lg object-cover"
//             />
//             <h3 className="mt-4 text-lg font-semibold">Side table</h3>
//             <Link to="/shop" className="text-sm font-medium underline">
//               View More
//             </Link>
//           </div>
//         </div>
//       </Container>

//         <Container>
//   {/* Header */}
//   <div className="py-8 text-center">
//     <h2 className="text-2xl font-semibold">Top Picks For You</h2>
//     <p className="mt-2 text-sm text-neutral-600">
//       Find a bright ideal to suit your taste with our great selection.
//     </p>
//   </div>

//   {/* Grid */}
//   <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
//     {isLoading ? (
//       Array.from({ length: 4 }).map((_, i) => (
//         <div key={i} className="h-72 animate-pulse rounded-lg bg-neutral-100" />
//       ))
//     ) : Array.isArray(products) && products.length > 0 ? (
//       products.map((p) => {
//         const imageUrl =
//           p?.images?.[0]?.url
//             ? `${BASE_URL}${p.images[0].url}`
//             : p?.image
//             ? p.image
//             : "https://placehold.co/400x300?text=No+Image";

//         return (
//           <ProductCard
//             key={p?._id || p?.id}
//             p={{
//               id: p?._id || p?.id,
//               title: p?.name || p?.title || "Product",
//               price: p?.price ?? 0,
//               image: imageUrl,
//               stock: p?.stock ?? 0,
//             }}
//           />
//         );
//       })
//     ) : (
//       <p className="col-span-full text-center text-neutral-500">
//         No products found
//       </p>
//     )}
//   </div>
// </Container>


//       <section className="mt-16 bg-brand-light">
//         <Container className="py-12">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-neutral-600">New Arrivals</p>
//               <h3 className="mt-2 text-2xl font-semibold">Asgard sofa</h3>
//               {/* <Button className="mt-4" as="a" href="/product/1">
//                 Order Now
//               </Button> */}
              
 

// <Link to="/product/6980e1ee5dc791dfec9d5f5a">
//   <Button className="mt-6">
//     Order Now
//   </Button>
// </Link>

//             </div>
//             <img
//               src="https://images.unsplash.com/photo-1684165610413-2401399e0e59?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNvZmF8ZW58MHx8MHx8fDA%3D"
//               alt="Asgaard sofa"
//               className="h-56 w-56 rounded-lg object-cover shadow-soft md:h-72 md:w-72"
//             />
//           </div>
//         </Container>
//       </section>

//   <Container className="py-16">
//   <h2 className="mb-6 text-center text-2xl font-semibold">
//     Our Blogs
//   </h2>

//   <div className="grid gap-6 md:grid-cols-3">
//     {[
//       {
//         img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
//         title: "Modern Living Room Inspiration",
//       },
//       {
//         img: "https://plus.unsplash.com/premium_photo-1661265944044-bc7248ae54f9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmxvZyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
//         title: "Why Wooden Furniture Never Goes Out of Style",
//       },
//       {
//         img: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJsb2clMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
//         title: "Creating a Cozy Bedroom Setup",
//       },
//     ].map((blog, i) => (
//       <div
//         key={i}
//         className="rounded-lg bg-white p-4 shadow-soft transition duration-300 hover:-translate-y-2 hover:shadow-lg"
//       >
//         <img
//           src={blog.img}
//           alt={blog.title}
//           className="h-40 w-full rounded-lg object-cover transition duration-300 hover:scale-105"
//         />
//         <h4 className="mt-3 text-sm font-semibold">
//           {blog.title}
//         </h4>
//         <div className="mt-2 text-xs text-neutral-600">
//           Read More • 3 min
//         </div>
//       </div>
//     ))}
//   </div>

//   <div className="mt-8 text-center">
//     <Button variant="outline">View All Post</Button>
//   </div>
// </Container>


  
// <Container className="py-12">

  
//   <div className="mb-6 text-center">
//     <div className="flex items-center justify-center gap-2 text-black-600">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         fill="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path d="M7.75 2C4.68 2 2 4.68 2 7.75v8.5C2 19.32 4.68 22 7.75 22h8.5C19.32 22 22 19.32 22 16.25v-8.5C22 4.68 19.32 2 16.25 2h-8.5zm0 1.5h8.5c2.2 0 4 1.8 4 4v8.5c0 2.2-1.8 4-4 4h-8.5c-2.2 0-4-1.8-4-4v-8.5c0-2.2 1.8-4 4-4zm9.75 2.75a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 1.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7z" />
//       </svg>
//       <span className="font-medium">@heavencraft</span>
//     </div>

//     <h2 className="mt-3 text-3xl font-semibold">
//       Follow Our Journey
//     </h2>

//     <p className="mt-2 text-gray-500 text-sm">
//       Discover our latest drops & behind the scenes
//     </p>
//   </div>

  
//   <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
//     {[
//       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",

//       "https://media.istockphoto.com/id/1366533374/photo/japandi-style-living-room-interior-design-and-decoration-green-sofa-in-living-room-3d.webp?a=1&b=1&s=612x612&w=0&k=20&c=hBbmdeJLb9qoHm2Pt-_fk06oi2MnoNTSifdLHFxjQpw=",

//       "https://plus.unsplash.com/premium_photo-1661765778256-169bf5e561a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aW50ZXJpb3IlMjBkZXNpZ258ZW58MHx8MHx8fDA%3D",
      
//       "https://images.unsplash.com/photo-1606744888344-493238951221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGludGVyaW9yJTIwZGVzaWdufGVufDB8fDB8fHww",
//     ].map((img, i) => (
//       <a
//         key={i}
//         href="https://www.instagram.com/iamdeepaksha/"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="group relative overflow-hidden rounded-xl"
//       >
//         <img
//           src={img}
//           alt="Instagram Post"
//           className="h-44 w-full object-cover transition duration-500 group-hover:scale-110"
//         />

        
//         <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
//           <span className="text-white text-sm font-medium tracking-wide">
//             View on Instagram
//           </span>
//         </div>
//       </a>
//     ))}
//   </div>

  
//   <div className="mt-12 text-center">
//     <a
//       href="https://www.instagram.com/iamdeepaksha/"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       {/* <Button className="bg-pink-600 px-8 py-3 text-white hover:bg-pink-700 transition">
//         Follow Us on Instagram
//       </Button> */}
//       <Button variant="outline">Follow Us on Instagram</Button>
//     </a>
//   </div>

// </Container>


//     </>
//   );
// }








import Container from "../components/layout/Container";
import Button from "../components/ui/button";
import { Link } from "react-router-dom";
import { useProductsQuery } from "../services/api";
import ProductCard from "../components/common/ProductCard";

export default function Home() {

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

  // SAME style as Shop (important: include page)
  const { data, isLoading } = useProductsQuery({ page: 1, limit: 4 });

  // SAME extraction as Shop
  const products = Array.isArray(data?.data) ? data.data : [];

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-light">
        <Container className="py-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-semibold">Rocket single seater</h1>
              <Link to="/shop">
                <Button className="mt-6">Shop Now</Button>
              </Link>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="https://img.freepik.com/free-vector/beige-soft-leather-armchair-with-wooden-legs_107791-29582.jpg"
                alt="Rocket single seater"
                className="w-full max-w-[500px] h-auto object-contain drop-shadow-2xl md:max-w-[700px] lg:max-w-[800px]"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* SMALL CARDS */}
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
              src="https://images.unsplash.com/photo-1499933374294-4584851497cc?w=600"
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

      {/* PRODUCTS */}
      <Container>
        <div className="py-8 text-center">
          <h2 className="text-2xl font-semibold">Top Picks For You</h2>
          <p className="mt-2 text-sm text-neutral-600">
            Find a bright ideal to suit your taste with our great selection.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">

          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-lg bg-neutral-100"/>
            ))
          ) : products.length > 0 ? (

            products.map((p) => {

              // ✅ BULLETPROOF IMAGE LOGIC (handles ALL backend cases)
              let imageUrl = "https://placehold.co/400x300?text=No+Image";

              if (Array.isArray(p.images) && p.images.length > 0) {

                // case: { url:"/uploads/x.jpg" }
                if (typeof p.images[0] === "object" && p.images[0]?.url) {
                  imageUrl = `${BASE_URL}${p.images[0].url}`;
                }

                // case: ["http://..."]
                else if (typeof p.images[0] === "string") {
                  imageUrl = p.images[0].startsWith("http")
                    ? p.images[0]
                    : `${BASE_URL}${p.images[0]}`;
                }
              }

              // fallback: image field
              else if (p.image) {
                imageUrl = p.image.startsWith("http")
                  ? p.image
                  : `${BASE_URL}${p.image}`;
              }

              return (
                <ProductCard
                  key={p._id}
                  p={{
                    id: p._id,
                    title: p.name,
                    price: p.price,
                    image: imageUrl,
                    stock: p.stock ?? 0,
                  }}
                />
              );
            })

          ) : (
            <p className="col-span-full text-center text-neutral-500">
              No products found
            </p>
          )}

        </div>
      </Container>

      {/* KEEP ALL YOUR OTHER SECTIONS EXACTLY SAME BELOW */}
    </>
  );
}
