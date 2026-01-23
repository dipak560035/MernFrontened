import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useForm } from "react-hook-form";

export default function Admin() {
  const form = useForm();
  const onSubmit = (v) => {
    const raw = localStorage.getItem("adminProducts");
    const list = raw ? JSON.parse(raw) : [];
    list.push({ id: Date.now(), ...v });
    localStorage.setItem("adminProducts", JSON.stringify(list));
    form.reset();
  };
  return (
    <>
      <section className="bg-neutral-100">
        <Container className="py-12 text-center">
          <h1 className="text-3xl font-semibold">Admin Panel</h1>
          <div className="mt-2 text-sm text-neutral-600">Add products</div>
        </Container>
        //
      </section>
      <Container className="py-12">
        <form className="max-w-xl space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <Input placeholder="Title" {...form.register("title")} />
          <Input placeholder="Price" type="number" {...form.register("price")} />
          <Input placeholder="Image URL" {...form.register("image")} />
          <Button type="submit">Add Product</Button>
        </form>
      </Container>
    </>
  );
}
