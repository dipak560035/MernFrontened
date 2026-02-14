import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";

export default function About() {
  return (
    <>
      <PageHero title="About" />
      <Container className="prose prose-neutral py-12">
        <p>
          At HeavenCraft, we are committed to delivering premium-quality furniture and home solutions that embody craftsmanship, innovation, and timeless design. Our focus is on combining aesthetic excellence with functional durability, ensuring every product enhances both the beauty and comfort of modern living spaces. Guided by a customer-first philosophy, we strive to provide a seamless and trustworthy shopping experience through carefully curated collections, transparent service, and dependable delivery. HeavenCraft stands for quality you can rely on, design you can appreciate, and a standard of excellence that transforms houses into refined, inspiring homes.
        </p>
      </Container>
    </>
  );
}
