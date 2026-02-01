import Container from "../layout/Container";

export default function PageHero({ title, trail = "Home", image }) {
  return (
    <section
      className="relative"
      style={{
        backgroundImage:
          `url(${image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white/70">
        <Container className="py-12 text-center">
          <div className="mx-auto h-10 w-10 rounded-md bg-brand-dark" />
          <h1 className="mt-4 text-3xl font-semibold">{title}</h1>
          <div className="mt-2 text-sm text-neutral-700">{trail} › {title}</div>
        </Container>
      </div>
    </section>
  );
}
