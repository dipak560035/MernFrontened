import Container from "../components/layout/Container";

export default function About() {
  return (
    <>
      <section className="bg-neutral-100">
        <Container className="py-12 text-center">
          <h1 className="text-3xl font-semibold">About</h1>
          <div className="mt-2 text-sm text-neutral-600">Home › About</div>
        </Container>
      </section>
      <Container className="prose prose-neutral py-12">
        <p>
          Meubel House brings you timeless furniture crafted with care. Explore our curated designs that blend
          comfort with clean aesthetics.
        </p>
      </Container>
    </>
  );
}
