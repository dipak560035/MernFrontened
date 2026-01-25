import { useEffect } from "react";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useForm } from "react-hook-form";
import { useProductByIdQuery, useAdminUpdateProductMutation } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const { data: productResponse, isLoading } = useProductByIdQuery(id);
  const product = productResponse?.data;
  const [updateProduct, { isLoading: updating }] = useAdminUpdateProductMutation();
  const form = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      form.reset({
        title: product.name,
        price: product.price,
        image: product.images?.[0]?.url || "",
      });
    }
  }, [product]);

  const onSubmit = async (v) => {
    try {
      await updateProduct({
        id,
        name: v.title,
        price: Number(v.price),
        images: v.image ? [v.image] : [],
      }).unwrap();
      navigate("/admin");
    } catch (e) {
      console.error("Update failed", e);
    }
  };

  if (isLoading) return <Container className="py-12 text-center">Loading...</Container>;

  return (
    <Container className="py-12 max-w-xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <Input placeholder="Title" {...form.register("title")} />
        <Input placeholder="Price" type="number" {...form.register("price")} />
        <Input placeholder="Image URL" {...form.register("image")} />
        <Button type="submit" disabled={updating}>
          {updating ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </Container>
  );
}
