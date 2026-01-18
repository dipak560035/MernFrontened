
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useAddProductMutation } from "@/app/mainApi";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import { ArrowLeft, Upload } from "lucide-react";
// import toast from "react-hot-toast";

// export default function AddProduct() {
//   const [addProduct, { isLoading }] = useAddProductMutation();
//   const navigate = useNavigate();
//   const [imagePreview, setImagePreview] = useState("");

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

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("detail", data.detail);
//       formData.append("price", data.price);
//       formData.append("stock", data.stock);
//       formData.append("category", data.category);
//       formData.append("brand", data.brand);
//       formData.append("image", data.image[0]);

//       await addProduct(formData).unwrap();
//       toast.success("Product added successfully!");
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to add product");
//     }
//   };

//   const handleImagePreview = (file) => {
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     setImagePreview(url);
//   };

//   return (
//     <div className="container mx-auto py-10 px-4 max-w-4xl">
//       <Button variant="ghost" className="mb-8 pl-0" onClick={() => navigate("/admin")}>
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Products
//       </Button>

//       <Card className="border shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-3xl">Add Product</CardTitle>
//           <CardDescription>Enter new product details below</CardDescription>
//         </CardHeader>

//         <CardContent className="pt-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* Title & Price */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Product Title *</Label>
//                 <Input
//                   id="title"
//                   placeholder="e.g. Wireless Headphones Pro"
//                   {...register("title", { required: "Title is required" })}
//                 />
//                 {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="price">Price (Rs.) *</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   step="0.01"
//                   {...register("price", {
//                     required: "Price is required",
//                     min: { value: 0, message: "Price must be positive" },
//                   })}
//                 />
//                 {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <Label htmlFor="detail">Description *</Label>
//               <Textarea
//                 id="detail"
//                 placeholder="Describe features, specifications, materials..."
//                 className="min-h-[140px]"
//                 {...register("detail", { required: "Description is required" })}
//               />
//               {errors.detail && <p className="text-sm text-destructive">{errors.detail.message}</p>}
//             </div>

//             {/* Stock, Category, Brand */}
//             <div className="grid gap-6 md:grid-cols-3">
//               <div className="space-y-2">
//                 <Label htmlFor="stock">Stock Quantity *</Label>
//                 <Input
//                   id="stock"
//                   type="number"
//                   {...register("stock", {
//                     required: "Stock is required",
//                     min: { value: 0, message: "Stock must be ≥ 0" },
//                   })}
//                 />
//                 {errors.stock && <p className="text-sm text-destructive">{errors.stock.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label>Category *</Label>
//                 <Select
//                   onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="food">Food</SelectItem>
//                     <SelectItem value="clothes">Clothes</SelectItem>
//                     <SelectItem value="tech">Tech</SelectItem>
//                     <SelectItem value="jewellery">Jewellery</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
//               </div>

//               <div className="space-y-2">
//                 <Label>Brand *</Label>
//                 <Select
//                   onValueChange={(val) => setValue("brand", val, { shouldValidate: true })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select brand" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="addidas">Addidas</SelectItem>
//                     <SelectItem value="samsung">Samsung</SelectItem>
//                     <SelectItem value="tanishq">Tanishq</SelectItem>
//                     <SelectItem value="kfc">Kfc</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.brand && <p className="text-sm text-destructive">{errors.brand.message}</p>}
//               </div>
//             </div>

//             {/* Image Section */}
//             <div className="space-y-4">
//               <Label>Product Image *</Label>

//               {imagePreview ? (
//                 <div className="relative w-64 h-64 rounded-xl overflow-hidden border bg-muted/50">
//                   <img src={imagePreview} alt="Preview" className="object-cover w-full h-full" />
//                 </div>
//               ) : (
//                 <div className="w-64 h-64 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
//                   No image selected
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="image-upload">Upload Image</Label>
//                 <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/70 transition-colors">
//                   <Input
//                     id="image-upload"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     {...register("image", { required: "Image is required" })}
//                     onChange={(e) => handleImagePreview(e.target.files[0])}
//                   />
//                   <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-3">
//                     <Upload className="h-10 w-10 text-muted-foreground" />
//                     <div>
//                       <p className="font-medium">Click to upload image</p>
//                       <p className="text-sm text-muted-foreground mt-1">
//                         PNG, JPG, WEBP (max 5MB recommended)
//                       </p>
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Buttons */}
//             <div className="flex justify-end gap-4 pt-8">
//               <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isLoading} size="lg">
//                 {isLoading ? "Adding..." : "Add Product"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }












































// // src/pages/admin/AddProduct.jsx
// import { useAddProductMutation } from "@/app/mainApi";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";

// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [addProduct, { isLoading }] = useAddProductMutation();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("detail", data.detail);
//       formData.append("price", data.price);
//       formData.append("stock", data.stock);
//       formData.append("category", data.category);
//       formData.append("brand", data.brand);
//       formData.append("image", data.image[0]); // file

//       await addProduct(formData).unwrap();

//       toast.success("Product added successfully!");
//       reset();
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to add product");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-2xl font-bold mb-6">Add Product</h1>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
//         {/* Title */}
//         <div>
//           <Label>Title</Label>
//           <Input
//             {...register("title", { required: "Title is required" })}
//             placeholder="Product title"
//           />
//           {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
//         </div>

//         {/* Detail */}
//         <div>
//           <Label>Detail</Label>
//           <Textarea
//             {...register("detail", { required: "Detail is required" })}
//             placeholder="Product detail"
//           />
//           {errors.detail && <p className="text-red-500 text-sm">{errors.detail.message}</p>}
//         </div>

//         {/* Price */}
//         <div>
//           <Label>Price (Rs.)</Label>
//           <Input
//             type="number"
//             {...register("price", {
//               required: "Price is required",
//               min: { value: 0, message: "Price must be ≥ 0" }
//             })}
//             placeholder="Product price"
//           />
//           {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
//         </div>

//         {/* Stock */}
//         <div>
//           <Label>Stock Quantity</Label>
//           <Input
//             type="number"
//             {...register("stock", {
//               required: "Stock is required",
//               min: { value: 0, message: "Stock must be ≥ 0" }
//             })}
//             placeholder="Stock quantity"
//           />
//           {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
//         </div>

//         {/* Category */}
//         <div>
//           <Label>Category</Label>
//           <select
//             className="w-full border rounded px-2 py-2"
//             {...register("category", { required: "Category is required" })}
//           >
//             <option value="">Select category</option>
//             <option value="food">Food</option>
//             <option value="clothes">Clothes</option>
//             <option value="tech">Tech</option>
//             <option value="jewellery">Jewellery</option>
//           </select>
//           {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
//         </div>

//         {/* Brand */}
//         <div>
//           <Label>Brand</Label>
//           <select
//             className="w-full border rounded px-2 py-2"
//             {...register("brand", { required: "Brand is required" })}
//           >
//             <option value="">Select brand</option>
//             <option value="addidas">Addidas</option>
//             <option value="samsung">Samsung</option>
//             <option value="tanishq">Tanishq</option>
//             <option value="kfc">Kfc</option>
//           </select>
//           {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
//         </div>

//         {/* Image */}
//         <div>
//           <Label>Product Image</Label>
//           <Input
//             type="file"
//             accept="image/*"
//             {...register("image", { required: "Image is required" })}
//           />
//           {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
//         </div>

//         {/* Submit */}
//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? "Adding..." : "Add Product"}
//         </Button>

//       </form>
//     </div>
//   );
// }

































































// // src/pages/admin/AddProduct.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useAddProductMutation } from "@/app/mainApi";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ArrowLeft, Upload } from "lucide-react";
// import toast from "react-hot-toast";

// export default function AddProduct() {
//   const navigate = useNavigate();
//   const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
//   const [imagePreview, setImagePreview] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       title: "",
//       detail: "",
//       price: "",
//       stock: "",
//       category: "",
//       brand: "",
//       image: null,
//     },
//   });

//   // Watch image field for live preview
//   const imageFile = watch("image");

//   // Create preview when user selects new file
//   useState(() => {
//     if (imageFile?.[0]) {
//       const file = imageFile[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setImagePreview(null);
//     }
//   }, [imageFile]);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title.trim());
//       formData.append("detail", data.detail.trim());
//       formData.append("price", data.price);
//       formData.append("stock", data.stock);
//       formData.append("category", data.category);
//       formData.append("brand", data.brand);

//       if (data.image?.[0]) {
//         formData.append("image", data.image[0]);
//       }

//       await addProduct(formData).unwrap();

//       toast.success("Product added successfully!", {
//         duration: 4000,
//         position: "top-right",
//       });

//       reset();
//       setImagePreview(null);
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to add product", {
//         duration: 5000,
//         position: "top-right",
//       });
//       console.error("Add product error:", err);
//     }
//   };

//   return (
//     <div className="container mx-auto py-10 px-4 max-w-4xl">
//       <Button
//         variant="ghost"
//         className="mb-8 pl-0"
//         onClick={() => navigate("/admin")}
//       >
//         <ArrowLeft className="mr-2 h-4 w-4" />
//         Back to Products
//       </Button>

//       <Card className="border shadow-sm">
//         <CardHeader>
//           <CardTitle className="text-3xl">Add New Product</CardTitle>
//           <CardDescription>
//             Fill in the product information below
//           </CardDescription>
//         </CardHeader>

//         <CardContent className="pt-6">
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//             {/* Title & Price */}
//             <div className="grid gap-6 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="title">Product Title *</Label>
//                 <Input
//                   id="title"
//                   placeholder="e.g. Wireless Headphones Pro"
//                   {...register("title", { required: "Title is required" })}
//                 />
//                 {errors.title && (
//                   <p className="text-sm text-destructive">{errors.title.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="price">Price (Rs.) *</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   step="0.01"
//                   {...register("price", {
//                     required: "Price is required",
//                     min: { value: 0, message: "Price must be positive" },
//                   })}
//                 />
//                 {errors.price && (
//                   <p className="text-sm text-destructive">{errors.price.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Description */}
//             <div className="space-y-2">
//               <Label htmlFor="detail">Description *</Label>
//               <Textarea
//                 id="detail"
//                 placeholder="Describe features, specifications, materials..."
//                 className="min-h-[140px]"
//                 {...register("detail", { required: "Description is required" })}
//               />
//               {errors.detail && (
//                 <p className="text-sm text-destructive">{errors.detail.message}</p>
//               )}
//             </div>

//             {/* Stock, Category, Brand */}
//             <div className="grid gap-6 md:grid-cols-3">
//               <div className="space-y-2">
//                 <Label htmlFor="stock">Stock Quantity *</Label>
//                 <Input
//                   id="stock"
//                   type="number"
//                   {...register("stock", {
//                     required: "Stock is required",
//                     min: { value: 0, message: "Stock must be ≥ 0" },
//                   })}
//                 />
//                 {errors.stock && (
//                   <p className="text-sm text-destructive">{errors.stock.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label>Category *</Label>
//                 <Select
//                   onValueChange={(val) => setValue("category", val, { shouldValidate: true })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="food">Food</SelectItem>
//                     <SelectItem value="clothes">Clothes</SelectItem>
//                     <SelectItem value="tech">Tech</SelectItem>
//                     <SelectItem value="jewellery">Jewellery</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.category && (
//                   <p className="text-sm text-destructive">{errors.category.message}</p>
//                 )}
//               </div>

//               <div className="space-y-2">
//                 <Label>Brand *</Label>
//                 <Select
//                   onValueChange={(val) => setValue("brand", val, { shouldValidate: true })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select brand" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="addidas">Addidas</SelectItem>
//                     <SelectItem value="samsung">Samsung</SelectItem>
//                     <SelectItem value="tanishq">Tanishq</SelectItem>
//                     <SelectItem value="kfc">Kfc</SelectItem>
//                   </SelectContent>
//                 </Select>
//                 {errors.brand && (
//                   <p className="text-sm text-destructive">{errors.brand.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Image Section */}
//             <div className="space-y-4">
//               <Label>Product Image *</Label>

//               {imagePreview ? (
//                 <div className="relative w-64 h-64 rounded-xl overflow-hidden border bg-muted/50">
//                   <img
//                     src={imagePreview}
//                     alt="Preview"
//                     className="object-cover w-full h-full"
//                   />
//                 </div>
//               ) : (
//                 <div className="w-64 h-64 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
//                   No image selected
//                 </div>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="image-upload">Upload Image</Label>
//                 <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/70 transition-colors">
//                   <Input
//                     id="image-upload"
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     {...register("image", { required: "Product image is required" })}
//                   />
//                   <label
//                     htmlFor="image-upload"
//                     className="cursor-pointer flex flex-col items-center gap-3"
//                   >
//                     <Upload className="h-10 w-10 text-muted-foreground" />
//                     <div>
//                       <p className="font-medium">Click to upload image</p>
//                       <p className="text-sm text-muted-foreground mt-1">
//                         PNG, JPG, WEBP (max 5MB recommended)
//                       </p>
//                     </div>
//                   </label>
//                 </div>
//                 {errors.image && (
//                   <p className="text-sm text-destructive">{errors.image.message}</p>
//                 )}
//               </div>
//             </div>

//             {/* Submit Buttons */}
//             <div className="flex justify-end gap-4 pt-8">
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => navigate("/admin")}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" disabled={isAdding} size="lg">
//                 {isAdding ? "Adding..." : "Add Product"}
//               </Button>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }















































// src/pages/admin/AddProduct.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAddProductMutation } from "@/app/mainApi";
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

export default function AddProduct() {
  const navigate = useNavigate();
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      detail: "",
      price: "",
      stock: "",
      category: "",
      brand: "",
      image: undefined,
    },
  });

  // Watch the image field for preview
  const imageFile = watch("image");

  // Create local preview URL when a new file is selected
  useEffect(() => {
    if (!imageFile || !imageFile[0]) {
      setImagePreview(null);
      return;
    }

    const file = imageFile[0];

    // Basic check – only allow images
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    // Clean up memory when file changes or component unmounts
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [imageFile]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title.trim());
      formData.append("detail", data.detail.trim());
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("brand", data.brand);

      // Only append image if a file was selected
      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      await addProduct(formData).unwrap();

      toast.success("Product added successfully!", {
        duration: 4000,
        position: "top-right",
      });

      // Reset form + preview
      reset();
      setImagePreview(null);
      navigate("/admin");
    } catch (err) {
      console.error("Add product error:", err);
      toast.error(err?.data?.message || "Failed to add product", {
        duration: 5000,
        position: "top-right",
      });
    }
  };

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
          <CardTitle className="text-3xl">Add New Product</CardTitle>
          <CardDescription>
            Fill in the product information below
          </CardDescription>
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
                    min: { value: 0.01, message: "Price must be positive" },
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
                  min="0"
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
                  onValueChange={(val) =>
                    setValue("category", val, { shouldValidate: true })
                  }
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
                {errors.category && (
                  <p className="text-sm text-destructive">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Brand *</Label>
                <Select
                  onValueChange={(val) =>
                    setValue("brand", val, { shouldValidate: true })
                  }
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
                {errors.brand && (
                  <p className="text-sm text-destructive">{errors.brand.message}</p>
                )}
              </div>
            </div>

            {/* Image Upload + Preview */}
            <div className="space-y-4">
              <Label>Product Image *</Label>

              {imagePreview ? (
                <div className="relative w-64 h-64 rounded-xl overflow-hidden border bg-muted/50">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-64 h-64 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                  No image selected
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="image-upload">Upload Image</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/70 transition-colors">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("image", {
                      required: "Product image is required",
                    })}
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-3"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Click to upload image</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PNG, JPG, WEBP (max 5MB recommended)
                      </p>
                    </div>
                  </label>
                </div>

                {errors.image && (
                  <p className="text-sm text-destructive">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 pt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isAdding} size="lg">
                {isAdding ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}