import { useAddProductMutation } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await addProduct(data).unwrap();
      toast.success("Product added");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input {...register("name")} />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Input {...register("category")} />
        </div>
        <div className="space-y-2">
          <Label>Price</Label>
          <Input type="number" step="0.01" {...register("price")} />
        </div>
        <div className="space-y-2">
          <Label>Stock</Label>
          <Input type="number" {...register("stock")} />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input {...register("image")} />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
}




















// import ProductForm from "@/components/ProductForm";

// export default function AddProduct() {
//   return <ProductForm />;
// }