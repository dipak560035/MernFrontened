// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";
// import {
//   useGetProductQuery,
//   useUpdateProductMutation,
// } from "@/app/mainApi";
// import { useEffect } from "react";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading: isFetching } = useGetProductQuery(id);
//   const [updateProduct, { isLoading }] = useUpdateProductMutation();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       detail: "",
//       price: "",
//       stock: "",
//       category: "",
//       brand: "",
//     },
//   });

//   // Fill form when data arrives
//   useEffect(() => {
//     if (data?.product) {
//       setValue("title", data.product.title || "");
//       setValue("detail", data.product.detail || "");
//       setValue("price", data.product.price || "");
//       setValue("stock", data.product.stock || "");
//       setValue("category", data.product.category || "");
//       setValue("brand", data.product.brand || "");
//     }
//   }, [data, setValue]);

//   const onSubmit = async (formData) => {
//     try {
//       const payload = new FormData();
//       payload.append("title", formData.title);
//       payload.append("detail", formData.detail);
//       payload.append("price", formData.price);
//       payload.append("stock", formData.stock);
//       payload.append("category", formData.category);
//       payload.append("brand", formData.brand);

//       // Only append image if a new one is selected
//       if (formData.image?.[0]) {
//         payload.append("image", formData.image[0]);
//       }

//       await updateProduct({ id, formData: payload }).unwrap();
//       toast.success("Product updated successfully!");
//       navigate("/admin");
//     } catch (err) {
//       const errorMessage = err?.data?.message || err?.message || "Failed to update product";
//       toast.error(errorMessage);
//       console.error("Update error:", err);
//     }
//   };

//   if (isFetching) return <p className="p-6 text-center">Loading product...</p>;

//   if (!data?.product) {
//     return <p className="p-6 text-center text-red-500">Product not found</p>;
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

// <div>
//   <Label>Title</Label>
//   <Input
//     defaultValue={data?.product?.title}   // <-- ADD THIS
//     {...register("title", { required: "Title is required" })}
//     placeholder="Product title"
//   />
//   {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
// </div>

// <div>
//   <Label>Detail</Label>
//   <Textarea
//     defaultValue={data?.product?.detail}   // <-- ADD THIS
//     {...register("detail", { required: "Detail is required" })}
//     placeholder="Product detail"
//   />
//   {errors.detail && <p className="text-red-500 text-sm">{errors.detail.message}</p>}
// </div>
//           <div>
//           <Label>Price (Rs.)</Label>
//           <Input
//             type="number"
//             step="0.01"
//             {...register("price", {
//               required: "Price is required",
//               min: { value: 0, message: "Price must be ≥ 0" },
//             })}
//             placeholder="Product price"
//           />
//           {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
//         </div>

//         <div>
//           <Label>Stock Quantity</Label>
//           <Input
//             type="number"
//             {...register("stock", {
//               required: "Stock is required",
//               min: { value: 0, message: "Stock must be ≥ 0" },
//             })}
//             placeholder="Stock quantity"
//           />
//           {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
//         </div>

//         <div>
//           <Label>Category</Label>
//           <select
//             {...register("category", { required: "Category is required" })}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select category</option>
//             <option value="food">Food</option>
//             <option value="clothes">Clothes</option>
//             <option value="tech">Tech</option>
//             <option value="jewellery">Jewellery</option>
//           </select>
//           {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
//         </div>

//         <div>
//           <Label>Brand</Label>
//           <select
//             {...register("brand", { required: "Brand is required" })}
//             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select brand</option>
//             <option value="addidas">Addidas</option>
//             <option value="samsung">Samsung</option>
//             <option value="tanishq">Tanishq</option>
//             <option value="kfc">KFC</option>
//           </select>
//           {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
//         </div>

//         <div>
//           <Label>Product Image (Optional)</Label>
//           <Input
//             type="file"
//             accept="image/*"
//             {...register("image")}
//           />
//           <p className="text-gray-500 text-xs mt-1">
//             Leave empty to keep the existing image.
//           </p>
//         </div>

//         <Button
//           type="submit"
//           className="w-full mt-6"
//           disabled={isLoading || isFetching}
//         >
//           {isLoading ? "Updating..." : "Update Product"}
//         </Button>
//       </form>
//     </div>
//   );
// }
























// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";
// import {
//   useGetProductQuery,
//   useUpdateProductMutation,
// } from "@/app/mainApi";
// import { useEffect } from "react";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const { data, isLoading: isFetching } = useGetProductQuery(id);
//   const [updateProduct, { isLoading: isSubmitting }] = useUpdateProductMutation();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       title: "",
//       detail: "",
//       price: 0,
//       stock: 0,
//       category: "",
//       brand: "",
//       image: undefined, // not pre-filled
//     },
//   });

//   // Populate form when product data is fetched
//   useEffect(() => {
//     if (data?.product) {
//       setValue("title", data.product.title || "");
//       setValue("detail", data.product.detail || "");
//       setValue("price", Number(data.product.price) || 0);
//       setValue("stock", Number(data.product.stock) || 0);
//       setValue("category", data.product.category || "");
//       setValue("brand", data.product.brand || "");
//       // image is not pre-filled — user can upload new one or keep old
//     }
//   }, [data, setValue]);

//   const onSubmit = async (formData) => {
//     try {
//       const payload = new FormData();
//       payload.append("title", formData.title);
//       payload.append("detail", formData.detail);
//       payload.append("price", formData.price);
//       payload.append("stock", formData.stock);
//       payload.append("category", formData.category);
//       payload.append("brand", formData.brand);

//       // Only send image if user selected a new one
//       if (formData.image?.[0]) {
//         payload.append("image", formData.image[0]);
//       }

//       await updateProduct({ id, formData: payload }).unwrap();

//       toast.success("Product updated successfully!");
//       navigate("/admin");
//     } catch (err) {
//       const errorMessage =
//         err?.data?.message || err?.message || "Failed to update product";
//       toast.error(errorMessage);
//       console.error("Update error:", err);
//     }
//   };

//   if (isFetching) {
//     return <p className="p-10 text-center text-gray-500">Loading product data...</p>;
//   }

//   if (!data?.product) {
//     return (
//       <div className="p-10 text-center">
//         <p className="text-xl text-red-600">Product not found</p>
//         <Button variant="outline" className="mt-4" onClick={() => navigate("/admin")}>
//           Back to Admin
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-2xl">
//       <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Product</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         {/* Title */}
//         <div className="space-y-2">
//           <Label htmlFor="title">Product Title *</Label>
//           <Input
//             id="title"
//             placeholder="e.g. Wireless Headphones"
//             {...register("title", { required: "Title is required" })}
//           />
//           {errors.title && (
//             <p className="text-sm text-red-600">{errors.title.message}</p>
//           )}
//         </div>

//         {/* Detail */}
//         <div className="space-y-2">
//           <Label htmlFor="detail">Description *</Label>
//           <Textarea
//             id="detail"
//             placeholder="Detailed product description..."
//             rows={4}
//             {...register("detail", { required: "Description is required" })}
//           />
//           {errors.detail && (
//             <p className="text-sm text-red-600">{errors.detail.message}</p>
//           )}
//         </div>

//         {/* Price + Stock */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <Label htmlFor="price">Price (Rs.) *</Label>
//             <Input
//               id="price"
//               type="number"
//               min="0"
//               step="1"           // change to "0.01" if you want decimals
//               placeholder="0"
//               {...register("price", {
//                 required: "Price is required",
//                 min: { value: 0, message: "Price cannot be negative" },
//                 valueAsNumber: true,
//               })}
//               onKeyDown={(e) => {
//                 if (e.key === "-") e.preventDefault();
//               }}
//             />
//             {errors.price && (
//               <p className="text-sm text-red-600">{errors.price.message}</p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="stock">Stock Quantity *</Label>
//             <Input
//               id="stock"
//               type="number"
//               min="0"
//               step="1"
//               placeholder="0"
//               {...register("stock", {
//                 required: "Stock is required",
//                 min: { value: 0, message: "Stock cannot be negative" },
//                 valueAsNumber: true,
//               })}
//               onKeyDown={(e) => {
//                 if (e.key === "-") e.preventDefault();
//               }}
//             />
//             {errors.stock && (
//               <p className="text-sm text-red-600">{errors.stock.message}</p>
//             )}
//           </div>
//         </div>

//         {/* Category */}
//         <div className="space-y-2">
//           <Label htmlFor="category">Category *</Label>
//           <select
//             id="category"
//             className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//             {...register("category", { required: "Category is required" })}
//           >
//             <option value="">Select category</option>
//             <option value="food">Food</option>
//             <option value="clothes">Clothes</option>
//             <option value="tech">Tech</option>
//             <option value="jewellery">Jewellery</option>
//           </select>
//           {errors.category && (
//             <p className="text-sm text-red-600">{errors.category.message}</p>
//           )}
//         </div>

//         {/* Brand */}
//         <div className="space-y-2">
//           <Label htmlFor="brand">Brand *</Label>
//           <select
//             id="brand"
//             className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//             {...register("brand", { required: "Brand is required" })}
//           >
//             <option value="">Select brand</option>
//             <option value="addidas">Addidas</option>
//             <option value="samsung">Samsung</option>
//             <option value="tanishq">Tanishq</option>
//             <option value="kfc">KFC</option>
//           </select>
//           {errors.brand && (
//             <p className="text-sm text-red-600">{errors.brand.message}</p>
//           )}
//         </div>

//         {/* Image */}
//         <div className="space-y-2">
//           <Label htmlFor="image">Change Product Image (optional)</Label>
//           <Input
//             id="image"
//             type="file"
//             accept="image/*"
//             {...register("image")}
//           />
//           <p className="text-sm text-gray-500">
//             Leave empty to keep the current image.
//           </p>
//         </div>

//         {/* Actions */}
//         <div className="pt-4 flex flex-col sm:flex-row gap-4">
//           <Button
//             type="submit"
//             className="flex-1"
//             disabled={isSubmitting || isFetching}
//           >
//             {isSubmitting ? "Updating..." : "Update Product"}
//           </Button>

//           <Button
//             type="button"
//             variant="outline"
//             className="flex-1 sm:flex-none sm:w-32"
//             onClick={() => navigate("/admin")}
//             disabled={isSubmitting}
//           >
//             Cancel
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }












import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/app/mainApi";
import { useEffect } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useGetProductQuery(id);
  const [updateProduct, { isLoading: isSubmitting }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",         // UI field name
      detail: "",
      price: 0,
      stock: 0,
      category: "",
      brand: "",
      image: undefined,
    },
  });

  // Populate form with actual backend field names
  useEffect(() => {
    if (!data?.product) return;

    const p = data.product;

    setValue("title",       p.name          || "");
    setValue("detail",      p.description   || "");
    setValue("price",       Number(p.price) || 0);
    setValue("stock",       Number(p.stock) || 0);
    setValue("category",    p.category      || "");
    setValue("brand",       p.brand         || "");

    // Optional: for debugging - remove in production
    // console.log("Product data loaded:", p);
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("detail", formData.detail);
      payload.append("price", formData.price);
      payload.append("stock", formData.stock);
      payload.append("category", formData.category);
      payload.append("brand", formData.brand);

      // Only append image if user selected a new one
      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await updateProduct({ id, formData: payload }).unwrap();

      toast.success("Product updated successfully!");
      navigate("/admin");
    } catch (err) {
      const errorMessage =
        err?.data?.message || err?.message || "Failed to update product";
      toast.error(errorMessage);
      console.error("Update error:", err);
    }
  };

  if (isFetching) {
    return <p className="p-10 text-center text-gray-500">Loading product data...</p>;
  }

  if (!data?.product) {
    return (
      <div className="p-10 text-center">
        <p className="text-xl text-red-600">Product not found</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => navigate("/admin")}
        >
          Back to Admin
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Edit Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Product Title *</Label>
          <Input
            id="title"
            placeholder="e.g. Wireless Headphones"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Detail */}
        <div className="space-y-2">
          <Label htmlFor="detail">Description *</Label>
          <Textarea
            id="detail"
            placeholder="Detailed product description..."
            rows={4}
            {...register("detail", { required: "Description is required" })}
          />
          {errors.detail && (
            <p className="text-sm text-red-600">{errors.detail.message}</p>
          )}
        </div>

        {/* Price + Stock */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs.) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="1"           // Change to "0.01" if decimals needed
              placeholder="0"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" },
                valueAsNumber: true,
              })}
              onKeyDown={(e) => {
                if (e.key === "-") e.preventDefault();
              }}
            />
            {errors.price && (
              <p className="text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Stock Quantity *</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              step="1"
              placeholder="0"
              {...register("stock", {
                required: "Stock is required",
                min: { value: 0, message: "Stock cannot be negative" },
                valueAsNumber: true,
              })}
              onKeyDown={(e) => {
                if (e.key === "-") e.preventDefault();
              }}
            />
            {errors.stock && (
              <p className="text-sm text-red-600">{errors.stock.message}</p>
            )}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <select
            id="category"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="tech">Tech</option>
            <option value="jewellery">Jewellery</option>
          </select>
          {errors.category && (
            <p className="text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Brand */}
        <div className="space-y-2">
          <Label htmlFor="brand">Brand *</Label>
          <select
            id="brand"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            {...register("brand", { required: "Brand is required" })}
          >
            <option value="">Select brand</option>
            <option value="addidas">Addidas</option>
            <option value="samsung">Samsung</option>
            <option value="tanishq">Tanishq</option>
            <option value="kfc">KFC</option>
          </select>
          {errors.brand && (
            <p className="text-sm text-red-600">{errors.brand.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="space-y-2">
          <Label htmlFor="image">Change Product Image (optional)</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          <p className="text-sm text-gray-500">
            Leave empty to keep the current image.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 flex flex-col sm:flex-row gap-4">
          <Button
            type="submit"
            className="flex-1"
            disabled={isSubmitting || isFetching}
          >
            {isSubmitting ? "Updating..." : "Update Product"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex-1 sm:flex-none sm:w-32"
            onClick={() => navigate("/admin")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}