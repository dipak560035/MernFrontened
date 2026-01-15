import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "@/services/api";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, isLoading } = useGetProductQuery(id);
  const [updateProduct, { isLoading: saving }] = useUpdateProductMutation();
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (product) reset(product);
  }, [product, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProduct({ id, ...data }).unwrap();
      toast.success("Product updated");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <div className="p-6">Loading product...</div>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
        <Button type="submit" disabled={saving} className="w-full">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}













// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import ProductForm from '../components/ProductForm';
// import { fetchProduct } from '../redux/slices/productSlice';

// export default function EditProduct() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchProduct(id));
//   }, [dispatch, id]);

//   return <ProductForm isEdit={true} />;
// }