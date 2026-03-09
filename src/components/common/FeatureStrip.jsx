import Container from "../layout/Container";

export default function FeatureStrip() {
  return (
    <section className="bg-brand-light/40">
      <Container className="grid gap-8 py-10 md:grid-cols-3">
        <div>
          <h4 className="text-lg font-semibold">Free Delivery</h4>
          <p className="text-sm text-neutral-600">For all orders over $50, consectetur adipim scing elit.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">90 Days Return</h4>
          <p className="text-sm text-neutral-600">If goods have problems, consectetur adipim scing elit.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold">Secure Payment</h4>
          <p className="text-sm text-neutral-600">100% secure payment, consectetur adipim scing elit.</p>
        </div>
      </Container>
    </section>
  );
}
