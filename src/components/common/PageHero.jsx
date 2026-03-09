import Container from "../layout/Container";

export default function PageHero({ title, trail = "Home", image }) {
  return (
    <section
      className="relative"
      style={{
        backgroundImage:
          `url(${image || "https://plus.unsplash.com/premium_photo-1684338795288-097525d127f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZnVybml0dXJlfGVufDB8MHwwfHx8MA%3D%3D"})`,
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
