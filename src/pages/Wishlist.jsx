import Container from "../components/layout/Container";
import Button from "../components/ui/button";

export default function Wishlist() {
  return (
    <>
      <section className="bg-neutral-100">
        <Container className="py-12 text-center">
          <h1 className="text-3xl font-semibold">Wishlist</h1>
          <div className="mt-2 text-sm text-neutral-600">Home › Wishlist</div>
        </Container>
      </section>
      <Container className="py-12 text-center">
        <p className="text-sm text-neutral-600">No items in wishlist yet.</p>
        <Button variant="outline" className="mt-4">Explore Shop</Button>
      </Container>
    </>
  );
}
