import { Instagram } from "lucide-react";


import Container from "../components/layout/Container";
import Button from "../components/ui/button";

const instaImages = [
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503342452485-86ff0a8b9d3e?q=80&w=1200&auto=format&fit=crop",
];

export default function InstagramSection() {
  return (
    <section className="bg-neutral-50 py-16">
      <Container>
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 text-pink-600">
            <Instagram size={22} />
            <span className="font-medium">@heavencraft</span>
          </div>
          <h2 className="mt-3 text-3xl font-semibold">
            Follow Our Journey
          </h2>
          <p className="mt-2 text-gray-500">
            Discover our latest drops, behind the scenes & customer styles
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {instaImages.map((img, index) => (
            <a
              key={index}
              href="https://instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={img}
                alt="Instagram"
                className="h-44 w-full object-cover transition duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-300 group-hover:opacity-100">
                <Instagram className="text-white" size={28} />
              </div>
            </a>
          ))}
        </div>

        {/* Follow Button */}
        <div className="mt-12 text-center">
          <a
            href="https://instagram.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-pink-600 px-8 py-3 text-white hover:bg-pink-700">
              Follow Us on Instagram
            </Button>
          </a>
        </div>
      </Container>
    </section>
  );
}
