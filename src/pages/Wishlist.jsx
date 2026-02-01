import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Button from "../components/ui/button";

export default function Wishlist() {
  return (
    <>
      <PageHero title="Wishlist" />
      <Container className="py-12 text-center">
        <p className="text-sm text-neutral-600">No items in wishlist yet.</p>
        <Button variant="outline" className="mt-4">Explore Shop</Button>
      </Container>
    </>
  );
}
