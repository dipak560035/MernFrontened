import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";

export default function About() {
  return (
    <>
      <PageHero title="About" />
      <Container className="prose prose-neutral py-12">
        <p>
          Meubel House brings you timeless furniture crafted with care. Explore our curated designs that blend
          comfort with clean aesthetics.
        </p>
      </Container>
    </>
  );
}
