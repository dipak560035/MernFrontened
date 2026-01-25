import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useForm } from "react-hook-form";
import { useAdminCreateProductMutation } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const form = useForm();
  const [createProduct, { isLoading }] = useAdminCreateProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (v) => {
    try {
      await createProduct({
        name: v.title,
        price: Number(v.price),
        images: v.image ? [v.image] : [],
      }).unwrap();
      form.reset();
      navigate("/admin");
    } catch (e) {
      console.error("Add product failed", e);
    }
  };

  return (
    <Container className="py-12 max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Input placeholder="Title" {...form.register("title")} />
        <Input placeholder="Price" type="number" {...form.register("price")} />
        <Input placeholder="Image URL" {...form.register("image")} />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </Container>
  );
}
