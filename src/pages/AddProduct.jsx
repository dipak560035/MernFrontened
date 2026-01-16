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

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("detail", data.detail);
      formData.append("price", data.price);
      formData.append("stock", data.stock);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("image", data.image[0]); // file upload

      await addProduct(formData).unwrap();
      toast.success("Product added successfully!");
      navigate("/admin");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <Label>Title</Label>
          <Input {...register("title", { required: "Title is required" })} placeholder="Product title" />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <Label>Detail</Label>
          <Textarea {...register("detail", { required: "Detail is required" })} placeholder="Product detail" />
          {errors.detail && <p className="text-red-500">{errors.detail.message}</p>}
        </div>

        <div>
          <Label>Price (Rs.)</Label>
          <Input type="number" step="0.01" {...register("price", { required: "Price is required", min: { value: 0, message: "Price must be ≥ 0" } })} placeholder="Product price" />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <Label>Stock Quantity</Label>
          <Input type="number" {...register("stock", { required: "Stock is required", min: { value: 0, message: "Stock must be ≥ 0" } })} placeholder="Stock quantity" />
          {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
        </div>

        {/* Category Dropdown */}
        <div>
          <Label>Category</Label>
          <select {...register("category", { required: "Category is required" })} className="w-full border rounded px-2 py-1">
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="tech">Tech</option>
            <option value="jewellery">Jewellery</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>

        {/* Brand Dropdown */}
        <div>
          <Label>Brand</Label>
          <select {...register("brand", { required: "Brand is required" })} className="w-full border rounded px-2 py-1">
            <option value="">Select brand</option>
            <option value="addidas">Addidas</option>
            <option value="samsung">Samsung</option>
            <option value="tanishq">Tanishq</option>
            <option value="kfc">Kfc</option>
          </select>
          {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
        </div>

        <div>
          <Label>Product Image</Label>
          <Input type="file" accept="image/*" {...register("image", { required: "Image is required" })} />
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
}


// import { useAddProductMutation } from "@/app/mainApi";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { SelectGroup } from "@radix-ui/react-select";

// export default function AddProduct() {
//   const [addProduct, { isLoading }] = useAddProductMutation();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
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
//       formData.append("image", data.image[0]); // key: image, value: File

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

//         {/* Title */}
//         <div>
//           <Label>Title</Label>
//           <Input
//             {...register("title", { required: "Title is required" })}
//             placeholder="Product title"
//           />
//           {errors.title && <p className="text-red-500">{errors.title.message}</p>}
//         </div>

//         {/* Detail */}
//         <div>
//           <Label>Detail</Label>
//           <Textarea
//             {...register("detail", { required: "Detail is required" })}
//             placeholder="Product detail"
//           />
//           {errors.detail && <p className="text-red-500">{errors.detail.message}</p>}
//         </div>

//         {/* Price */}
//         <div>
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
//           {errors.price && <p className="text-red-500">{errors.price.message}</p>}
//         </div>

//         {/* Stock */}
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
//           {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
//         </div>

//         {/* Category */}
//         <div>
//           <Select
//   name="category"
//   onValueChange={(value) => setValue('category', value)}
// >
//   <SelectTrigger className="w-full">
//     <SelectValue placeholder="Select a Category" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectGroup>
//       <SelectItem value="food">Food</SelectItem>
//       <SelectItem value="clothes">Clothes</SelectItem>
//       <SelectItem value="tech">Tech</SelectItem>
//       <SelectItem value="jewellery">Jewellery</SelectItem>
//     </SelectGroup>
//   </SelectContent>
// </Select>

//           {/* <Label>Category</Label>
//           <Input
//             {...register("category", { required: "Category is required" })}
//             placeholder="Category (e.g., tech, clothes)"
//           />
//           {errors.category && <p className="text-red-500">{errors.category.message}</p>} */}
//         </div>

//         {/* Brand */}
//         <div>
//           <Select
//   name="brand"
//   onValueChange={(value) => setValue('brand', value)}
// >
//   <SelectTrigger className="w-full">
//     <SelectValue placeholder="Select a Brand" />
//   </SelectTrigger>
//   <SelectContent>
//     <SelectGroup>
//       <SelectItem value="addidas">Addidas</SelectItem>
//       <SelectItem value="samsung">Samsung</SelectItem>
//       <SelectItem value="tanishq">Tanishq</SelectItem>
//       <SelectItem value="kfc">Kfc</SelectItem>
//     </SelectGroup>
//   </SelectContent>
// </Select>

//           {/* <Label>Brand</Label>
//           <Input
//             {...register("brand", { required: "Brand is required" })}
//             placeholder="Brand name"
//           />
//           {errors.brand && <p className="text-red-500">{errors.brand.message}</p>} */}
//         </div>

//         {/* Image Upload */}
//         <div>
//           <Label>Product Image</Label>
//           <Input
//             type="file"
//             accept="image/*"
//             {...register("image", { required: "Image is required" })}
//           />
//           {errors.image && <p className="text-red-500">{errors.image.message}</p>}
//         </div>

//         {/* Submit */}
//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? "Adding..." : "Add Product"}
//         </Button>
//       </form>
//     </div>
//   );
// }


























// import { useNavigate } from "react-router-dom";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useSelector } from "react-redux";
// import toast from "react-hot-toast";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Spinner } from "@/components/ui/spinner";

// import { useAddProductMutation, useGetProductsQuery } from "@/app/mainApi";


// // Validation schema
// const valSchema = Yup.object({
//   name: Yup.string().min(3, "Name too short").required("Required"),
//   detail: Yup.string().min(10, "Detail too short").required("Required"),
//   price: Yup.number().typeError("Price must be a number").required("Required"),
//   stock: Yup.number().typeError("Stock must be a number").required("Required"),
//   category: Yup.string().required("Select a category"),
//   brand: Yup.string().required("Select a brand"),
//   image: Yup.mixed()
//     .required("Image is required")
//     .test(
//       "fileType",
//       "Unsupported file format",
//       (value) =>
//         value && ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type)
//     )
//     .test(
//       "fileSize",
//       "File too large (max 5MB)",
//       (value) => value && value.size <= 5 * 1024 * 1024
//     ),
// });

// export default function AddProduct() {
//   const nav = useNavigate();
//   const { user } = useSelector((state) => state.user); // ✅ get current logged-in user

//   const [addProduct, { isLoading }] = useAddProductMutation();
//   const { refetch } = useGetProductsQuery();

//   return (
//     <div className="container mx-auto p-6 flex justify-center">
//       <Card className="w-full max-w-lg">
//         <CardHeader>
//           <CardTitle>Add New Product</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Formik
//             initialValues={{
//               name: "",
//               detail: "",
//               price: "",
//               stock: "",
//               category: "",
//               brand: "",
//               image: null,
//               imagePreview: "",
//             }}
//             validationSchema={valSchema}
//             onSubmit={async (values) => {
//               try {
//                 const formData = new FormData();
//                 formData.append("name", values.name);
//                 formData.append("detail", values.detail);
//                 formData.append("price", values.price);
//                 formData.append("stock", values.stock);
//                 formData.append("category", values.category);
//                 formData.append("brand", values.brand);
//                 formData.append("image", values.image);

//                 await addProduct(formData).unwrap();
//                 await refetch();

//                 toast.success("Product added successfully");
//                 nav("/admin"); // go back to dashboard
//               } catch (err) {
//                 toast.error(err?.data?.message || "Failed to add product");
//               }
//             }}
//           >
//             {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
//               <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//                 {/* Name */}
//                 <div className="flex flex-col">
//                   <Label htmlFor="name">Product Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={values.name}
//                     onChange={handleChange}
//                     placeholder="Enter product name"
//                   />
//                   {touched.name && errors.name && <p className="text-red-500">{errors.name}</p>}
//                 </div>

//                 {/* Detail */}
//                 <div className="flex flex-col">
//                   <Label htmlFor="detail">Detail</Label>
//                   <Textarea
//                     id="detail"
//                     name="detail"
//                     value={values.detail}
//                     onChange={handleChange}
//                     placeholder="Enter product description"
//                   />
//                   {touched.detail && errors.detail && <p className="text-red-500">{errors.detail}</p>}
//                 </div>

//                 {/* Price */}
//                 <div className="flex flex-col">
//                   <Label htmlFor="price">Price</Label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="number"
//                     value={values.price}
//                     onChange={handleChange}
//                     placeholder="Enter price"
//                   />
//                   {touched.price && errors.price && <p className="text-red-500">{errors.price}</p>}
//                 </div>

//                 {/* Stock */}
//                 <div className="flex flex-col">
//                   <Label htmlFor="stock">Stock</Label>
//                   <Input
//                     id="stock"
//                     name="stock"
//                     type="number"
//                     value={values.stock}
//                     onChange={handleChange}
//                     placeholder="Enter stock quantity"
//                   />
//                   {touched.stock && errors.stock && <p className="text-red-500">{errors.stock}</p>}
//                 </div>

//                 {/* Category */}
//                 <div className="flex flex-col">
//                   <Label>Category</Label>
//                   <Select
//                     value={values.category}
//                     onValueChange={(value) => setFieldValue("category", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="food">Food</SelectItem>
//                         <SelectItem value="clothes">Clothes</SelectItem>
//                         <SelectItem value="tech">Tech</SelectItem>
//                         <SelectItem value="jewellery">Jewellery</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                   {touched.category && errors.category && <p className="text-red-500">{errors.category}</p>}
//                 </div>

//                 {/* Brand */}
//                 <div className="flex flex-col">
//                   <Label>Brand</Label>
//                   <Select
//                     value={values.brand}
//                     onValueChange={(value) => setFieldValue("brand", value)}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select brand" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectGroup>
//                         <SelectItem value="addidas">Addidas</SelectItem>
//                         <SelectItem value="samsung">Samsung</SelectItem>
//                         <SelectItem value="tanishq">Tanishq</SelectItem>
//                         <SelectItem value="kfc">KFC</SelectItem>
//                       </SelectGroup>
//                     </SelectContent>
//                   </Select>
//                   {touched.brand && errors.brand && <p className="text-red-500">{errors.brand}</p>}
//                 </div>

//                 {/* Image Upload */}
//                 <div className="flex flex-col">
//                   <Label htmlFor="image">Upload Image</Label>
//                   <Input
//                     id="image"
//                     name="image"
//                     type="file"
//                     onChange={(e) => {
//                       const file = e.target.files[0];
//                       setFieldValue("image", file);
//                       setFieldValue("imagePreview", URL.createObjectURL(file));
//                     }}
//                   />
//                   {values.imagePreview && (
//                     <img
//                       src={values.imagePreview}
//                       alt="Preview"
//                       className="mt-2 h-32 w-auto object-cover rounded"
//                     />
//                   )}
//                   {touched.image && errors.image && <p className="text-red-500">{errors.image}</p>}
//                 </div>

//                 {/* Submit */}
//                 <Button type="submit" disabled={isLoading} className="mt-4 w-full">
//                   {isLoading ? <Spinner /> : "Add Product"}
//                 </Button>
//               </form>
//             )}
//           </Formik>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }























// import { useAddProductMutation } from "@/services/api";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";

// export default function AddProduct() {
//   const [addProduct, { isLoading }] = useAddProductMutation();
//   const navigate = useNavigate();
//   const { register, handleSubmit } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       await addProduct(data).unwrap();
//       toast.success("Product added");
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to add product");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-2xl font-bold mb-4">Add Product</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="space-y-2">
//           <Label>Name</Label>
//           <Input {...register("name")} />
//         </div>
//         <div className="space-y-2">
//           <Label>Category</Label>
//           <Input {...register("category")} />
//         </div>
//         <div className="space-y-2">
//           <Label>Price</Label>
//           <Input type="number" step="0.01" {...register("price")} />
//         </div>
//         <div className="space-y-2">
//           <Label>Stock</Label>
//           <Input type="number" {...register("stock")} />
//         </div>
//         <div className="space-y-2">
//           <Label>Image URL</Label>
//           <Input {...register("image")} />
//         </div>
//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Adding..." : "Add Product"}
//         </Button>
//       </form>
//     </div>
//   );
// }




















// import ProductForm from "@/components/ProductForm";

// export default function AddProduct() {
//   return <ProductForm />;
// }