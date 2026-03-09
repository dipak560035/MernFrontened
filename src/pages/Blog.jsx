import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Button from "../components/ui/button";

const posts = [
  {
    id: 1,
    title: "Going all-in with millennial design",
    date: "Aug 2022",
    author: "Admin",
    category: "Design",
    image: "https://images.unsplash.com/photo-1524758631624-74f4d37dd068?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Find a bright, ideal to suit your taste with our great selection of furniture. The pieces blend comfort and clean aesthetics.",
  },
  {
    id: 2,
    title: "Exploring new ways of decorating",
    date: "Aug 2022",
    author: "Admin",
    category: "Craft",
    image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Discover new approaches to interior design that bring warmth and personality to your home.",
  },
  {
    id: 3,
    title: "Handmade pieces that took time to make",
    date: "Aug 2022",
    author: "Admin",
    category: "Wood",
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1400&auto=format&fit=crop",
    excerpt:
      "Appreciate the craftsmanship behind furniture that stands out for its detail and durability.",
  },
];

export default function Blog() {
  return (
    <>
      <PageHero title="Blog" />
      <Container className="py-12">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2 space-y-10">
            {posts.map((p) => (
              <article key={p.id} className="space-y-3">
                <img src={p.image} alt={p.title} className="h-64 w-full rounded-lg object-cover" />
                <div className="flex items-center gap-3 text-xs text-neutral-600">
                  <span>👤 {p.author}</span>
                  <span>🗓 {p.date}</span>
                  <span>🏷 {p.category}</span>
                </div>
                <h2 className="text-xl font-semibold">{p.title}</h2>
                <p className="text-sm text-neutral-700">{p.excerpt}</p>
                <Button variant="outline">Read more</Button>
              </article>
            ))}
            <div className="mt-8 flex gap-2">
              {[1, 2, 3, "Next"].map((n) => (
                <button key={n} className="rounded-md border border-neutral-300 px-3 py-1 text-sm">
                  {n}
                </button>
              ))}
            </div>
          </div>
          <aside className="space-y-6">
            <div>
              <input className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm" placeholder="Search" />
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Categories</h4>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>Crafts</li>
                <li>Design</li>
                <li>Handmade</li>
                <li>Wood</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">Recent Posts</h4>
              <ul className="space-y-3 text-sm text-neutral-700">
                {posts.map((p) => (
                  <li key={p.id} className="flex gap-3">
                    <img src={p.image} className="h-10 w-10 rounded object-cover" />
                    <div>
                      <div>{p.title}</div>
                      <div className="text-xs text-neutral-500">{p.date}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
