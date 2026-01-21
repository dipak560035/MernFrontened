

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetProductQuery, useUpdateProductMutation } from "@/app/mainApi";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ArrowLeft, Upload } from "lucide-react";
import toast from "react-hot-toast";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      detail: "",
      price: "",
      stock: "",
      category: "",
      brand: "",
    },
  });

  // Fill form when product data is loaded
  useEffect(() => {
    if (!product) return;

    // Map backend → form field names
    setValue("title", product.name || product.title || "");
    setValue("detail", product.description || product.detail || "");
    setValue("price", product.price ?? "");
    setValue("stock", product.stock ?? "");
    setValue("category", product.category || "");
    setValue("brand", product.brand || "");

    // Image preview
    if (product?.image) {
      const imgUrl = product.image.startsWith("http")
        ? product.image
        : `http://localhost:5000/${product.image}`;
      setImagePreview(imgUrl);
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("detail", data.detail);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("brand", data.brand);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await updateProduct({ id, formData }).unwrap();

      toast.success("Product updated successfully!", {
        duration: 4000,
        position: "top-right",
      });

      navigate("/admin");
    } catch (err) {
      console.error("Update error:", err);
      
      // Handle different error types
      let errorMessage = "Failed to update product";
      
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err?.data?.message) {
        errorMessage = err.data.message;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.error?.message) {
        errorMessage = err.error.message;
      }
      
      toast.error(errorMessage, {
        duration: 5000,
        position: "top-right",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-destructive mb-4">
            Product not found
          </h2>
          <Button onClick={() => navigate("/admin")}>Back to Admin Panel</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Button
        variant="ghost"
        className="mb-8 pl-0"
        onClick={() => navigate("/admin")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Button>

      <Card className="border shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Edit Product</CardTitle>
          <CardDescription>Update the product information below</CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title & Price */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g. Wireless Headphones Pro"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (Rs.) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="detail">Description *</Label>
              <Textarea
                id="detail"
                placeholder="Describe features, specifications, materials..."
                className="min-h-[140px]"
                {...register("detail", { required: "Description is required" })}
              />
              {errors.detail && (
                <p className="text-sm text-destructive">{errors.detail.message}</p>
              )}
            </div>

            {/* Stock, Category, Brand */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity *</Label>
                <Input
                  id="stock"
                  type="number"
                  {...register("stock", {
                    required: "Stock is required",
                    min: { value: 0, message: "Stock must be ≥ 0" },
                  })}
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">{errors.stock.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Category *</Label>
                <Select
                  defaultValue={product?.category || ""}
                  onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="clothes">Clothes</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="jewellery">Jewellery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Brand *</Label>
                <Select
                  defaultValue={product?.brand || ""}
                  onValueChange={(val) => setValue("brand", val, { shouldValidate: true })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="addidas">Addidas</SelectItem>
                    <SelectItem value="samsung">Samsung</SelectItem>
                    <SelectItem value="tanishq">Tanishq</SelectItem>
                    <SelectItem value="kfc">Kfc</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Image Section */}
            <div className="space-y-4">
              <Label>Product Image</Label>

              {imagePreview ? (
                <div className="relative w-64 h-64 rounded-xl overflow-hidden border bg-muted/50">
                  <img
                    src={imagePreview}
                    alt="Current product"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="image-upload">Change Image (optional)</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/70 transition-colors">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image")}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Click to upload new image</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, WEBP (max 5MB recommended)
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating} size="lg">
                {isUpdating ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}












































