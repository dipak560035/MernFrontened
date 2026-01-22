import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";

export default function Contact() {
  return (
    <>
      <section className="bg-neutral-100">
        <Container className="py-12 text-center">
          <h1 className="text-3xl font-semibold">Contact</h1>
          <div className="mt-2 text-sm text-neutral-600">Home › Contact</div>
        </Container>
      </section>
      <Container className="py-12">
        <form className="max-w-xl space-y-4">
          <Input placeholder="Name" />
          <Input placeholder="Email" />
          <textarea className="w-full rounded-md border border-neutral-300 p-3 text-sm" rows={5} placeholder="Message" />
          <Button>Send Message</Button>
        </form>
      </Container>
    </>
  );
}
