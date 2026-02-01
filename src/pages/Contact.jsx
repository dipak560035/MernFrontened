import PageHero from "../components/common/PageHero";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";

export default function Contact() {
  return (
    <>
      <PageHero title="Contact" />
      <Container className="py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Get In Touch With Us</h2>
            <p className="text-sm text-neutral-700">
              For more information about our products and services, please feel free to drop us an email or call.  
            </p>
            <ul className="space-y-3 text-sm">
              <li>Address: 236 5th SE Avenue, New York, United States</li>
              <li>Phone: Mobile (+84) 546-6789 • Hotline (+84) 456-6789</li>
              <li>Working Time: Mon–Fri 9:00–22:00 • Sat–Sun 9:00–21:00</li>
            </ul>
          </div>
          <form className="space-y-4">
            <Input placeholder="Your name" />
            <Input placeholder="Email address" />
            <Input placeholder="Subject (optional)" />
            <textarea className="w-full rounded-md border border-neutral-300 p-3 text-sm" rows={5} placeholder="Message" />
            <Button>Submit</Button>
          </form>
        </div>
      </Container>
    </>
  );
}
