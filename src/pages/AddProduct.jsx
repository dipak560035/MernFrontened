// import { useAddProductMutation } from "@/app/mainApi";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";

// export default function AddProduct() {
//   const [addProduct, { isLoading }] = useAddProductMutation();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

//   const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("detail", data.detail);
//       formData.append("price", data.price);
//       formData.append("stock", data.stock);
//       formData.append("category", data.category);
//       formData.append("brand", data.brand);
//       formData.append("image", data.image[0]); // file upload

//       await addProduct(formData).unwrap();
//       toast.success("Product added successfully!");
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to add product");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-2xl font-bold mb-6">Add Product</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         <div>
//           <Label>Title</Label>
//           <Input {...register("title", { required: "Title is required" })} placeholder="Product title" />
//           {errors.title && <p className="text-red-500">{errors.title.message}</p>}
//         </div>

//         <div>
//           <Label>Detail</Label>
//           <Textarea {...register("detail", { required: "Detail is required" })} placeholder="Product detail" />
//           {errors.detail && <p className="text-red-500">{errors.detail.message}</p>}
//         </div>

//         <div>
//           <Label>Price (Rs.)</Label>
//           <Input type="number"  {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be ≥ 0" } })} placeholder="Product price" />
//           {errors.price && <p className="text-red-500">{errors.price.message}</p>}
//         </div>

//         <div>
//           <Label>Stock Quantity</Label>
//           <Input type="number" {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock must be ≥ 0" } })} placeholder="Stock quantity" />
//           {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
//         </div>

//         {/* Category Dropdown */}
//         <div>
//           <Label>Category</Label>
//           <select {...register("category", { required: "Category is required" })} className="w-full border rounded px-2 py-1">
//             <option value="">Select category</option>
//             <option value="food">Food</option>
//             <option value="clothes">Clothes</option>
//             <option value="tech">Tech</option>
//             <option value="jewellery">Jewellery</option>
//           </select>
//           {errors.category && <p className="text-red-500">{errors.category.message}</p>}
//         </div>

//         {/* Brand Dropdown */}
//         <div>
//           <Label>Brand</Label>
//           <select {...register("brand", { required: "Brand is required" })} className="w-full border rounded px-2 py-1">
//             <option value="">Select brand</option>
//             <option value="addidas">Addidas</option>
//             <option value="samsung">Samsung</option>
//             <option value="tanishq">Tanishq</option>
//             <option value="kfc">Kfc</option>
//           </select>
//           {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
//         </div>

//         <div>
//           <Label>Product Image</Label>
//           <Input type="file" accept="image/*" {...register("image", { required: "Image is required" })} />
//           {errors.image && <p className="text-red-500">{errors.image.message}</p>}
//         </div>

//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? "Adding..." : "Add Product"}
//         </Button>
//       </form>
//     </div>
//   );
// }














import { useAddProductMutation } from "@/app/mainApi";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function AddProduct() {
  const [addProduct, { isLoading }] = useAddProductMutation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 0,
      stock: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("detail", data.detail);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("image", data.image[0]);

      await addProduct(formData).unwrap();
      toast.success("Product added successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Add New Product</h1>

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

        {/* Detail / Description */}
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

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="price">Price (Rs.) *</Label>
            <Input
              id="price"
              type="number"
              min="0"
              step="1"           // or "0.01" if you want decimals
              placeholder="0"
              {...register("price", {
                required: "Price is required",
                min: { value: 0, message: "Price cannot be negative" },
                valueAsNumber: true,
              })}
              onKeyDown={(e) => {
                if (e.key === "-") e.preventDefault(); // block negative sign
              }}
            />
            {errors.price && (
              <p className="text-sm text-red-600">{errors.price.message}</p>
            )}
          </div>

          {/* Stock */}
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
            <option value="kfc">Kfc</option>
          </select>
          {errors.brand && (
            <p className="text-sm text-red-600">{errors.brand.message}</p>
          )}
        </div>

        {/* Image */}
        <div className="space-y-2">
          <Label htmlFor="image">Product Image *</Label>
          <Input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "Product image is required" })}
          />
          {errors.image && (
            <p className="text-sm text-red-600">{errors.image.message}</p>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full md:w-auto px-8"
            disabled={isLoading}
          >
            {isLoading ? "Adding Product..." : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
}