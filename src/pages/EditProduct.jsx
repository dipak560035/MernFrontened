import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "@/app/mainApi";
import React from "react";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const { data, isLoading: isFetching } = useGetProductQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fill form when data arrives
  React.useEffect(() => {
    if (data?.product) {
      setValue("title", data.product.title);
      setValue("detail", data.product.detail);
      setValue("price", data.product.price);
      setValue("stock", data.product.stock);
      setValue("category", data.product.category);
      setValue("brand", data.product.brand);
    }
  }, [data, setValue]);

const onSubmit = async (data) => {
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

  try {
    await updateProduct({ id: productId, body: formData }).unwrap();
    toast.success("Product updated successfully!");
    navigate("/admin");
  } catch (err) {
    toast.error(err?.data?.message || "Update failed");
  }
};












  // const onSubmit = async (form) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append("title", form.title);
  //     formData.append("detail", form.detail);
  //     formData.append("price", form.price);
  //     formData.append("stock", form.stock);
  //     formData.append("category", form.category);
  //     formData.append("brand", form.brand);

  //     // image optional when editing
  //     if (form.image?.[0]) {
  //       formData.append("image", form.image[0]);
  //     }

  //     await updateProduct({ id, body: formData }).unwrap();

  //     toast.success("Product updated successfully!");
  //     navigate("/admin");
  //   } catch (err) {
  //     toast.error(err?.data?.message || "Failed to update product");
  //   }
  // };

  if (isFetching) return <p className="p-6">Loading...</p>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
          <Label>Title</Label>
          <Input {...register("title", { required: "Title is required" })} />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div>
          <Label>Detail</Label>
          <Textarea {...register("detail", { required: "Detail is required" })}/>
          {errors.detail && <p className="text-red-500">{errors.detail.message}</p>}
        </div>

        <div>
          <Label>Price (Rs.)</Label>
          <Input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              min: { value: 0, message: "Price must be ≥ 0" },
            })}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <Label>Stock Quantity</Label>
          <Input
            type="number"
            {...register("stock", {
              required: "Stock is required",
              min: { value: 0, message: "Stock must be ≥ 0" },
            })}
          />
          {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
        </div>

        <div>
          <Label>Category</Label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select category</option>
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="tech">Tech</option>
            <option value="jewellery">Jewellery</option>
          </select>
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>

        <div>
          <Label>Brand</Label>
          <select
            {...register("brand", { required: "Brand is required" })}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">Select brand</option>
            <option value="addidas">Addidas</option>
            <option value="samsung">Samsung</option>
            <option value="tanishq">Tanishq</option>
            <option value="kfc">Kfc</option>
          </select>
          {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
        </div>

        <div>
          <Label>Product Image (optional)</Label>
          <Input type="file" accept="image/*" {...register("image")} />
          <p className="text-gray-500 text-sm">
            Leave empty to keep existing image.
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </div>
  );
}























// import { useParams, useNavigate } from "react-router-dom";

// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import { useGetProductQuery, useUpdateProductMutation } from "@/app/mainApi";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data, isLoading } = useGetProductQuery(id);
//   const [updateProduct, { isLoading: saving }] = useUpdateProductMutation();

//   const [title, setTitle] = useState("");
//   const [detail, setDetail] = useState("");
//   const [price, setPrice] = useState(0);
//   const [stock, setStock] = useState(0);
//   const [category, setCategory] = useState("tech");
//   const [brand, setBrand] = useState("apple");
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");

//   useEffect(() => {
//     if (data?.product) {
//       const p = data.product;
//       setTitle(p.title);
//       setDetail(p.detail);
//       setPrice(p.price);
//       setStock(p.stock);
//       setCategory(p.category);
//       setBrand(p.brand);
//       setImagePreview(p.image);
//     }
//   }, [data]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("detail", detail);
//     formData.append("price", price);
//     formData.append("stock", stock);
//     formData.append("category", category);
//     formData.append("brand", brand);

//     if (image) formData.append("image", image);

//     try {
//       await updateProduct({ id, formData }).unwrap();
//       toast.success("Product updated!");
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Update failed");
//     }
//   };

//   if (isLoading) return <h1>Loading...</h1>;

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto p-4">
//       <h1 className="text-xl font-semibold">Edit Product</h1>

//       <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
//       <textarea className="input" value={detail} onChange={(e) => setDetail(e.target.value)} />
//       <input type="number" className="input" value={price} onChange={(e) => setPrice(Math.max(0, e.target.value))} />
//       <input type="number" className="input" value={stock} onChange={(e) => setStock(Math.max(0, e.target.value))} />

//       <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
//         <option value="tech">Tech</option>
//         <option value="fashion">Fashion</option>
//       </select>

//       <select className="input" value={brand} onChange={(e) => setBrand(e.target.value)}>
//         <option value="apple">Apple</option>
//         <option value="samsung">Samsung</option>
//       </select>

//       {imagePreview && <img src={imagePreview} alt="preview" className="w-32 h-32 object-cover rounded" />}

//       <input type="file" onChange={(e) => setImage(e.target.files[0])} />

//       <button disabled={saving} className="btn w-full">
//         {saving ? "Updating..." : "Update Product"}
//       </button>
//     </form>
//   );
// }































// import { useParams, useNavigate } from "react-router-dom";
// import { useGetProductQuery, useUpdateProductMutation } from "@/app/mainApi";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";
// import { useEffect } from "react";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: product, isLoading } = useGetProductQuery(id);
//   const [updateProduct, { isLoading: saving }] = useUpdateProductMutation();
//   const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();

//   useEffect(() => {
//     if (product) {
//       reset({
//         title: product.title,
//         detail: product.detail,
//         price: product.price,
//         stock: product.stock,
//         category: product.category,
//         brand: product.brand,
//       });
//     }
//   }, [product, reset]);

//   const onSubmit = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("title", data.title);
//       formData.append("detail", data.detail);
//       formData.append("price", data.price);
//       formData.append("stock", data.stock);
//       formData.append("category", data.category);
//       formData.append("brand", data.brand);
//       if (data.image && data.image[0]) {
//         formData.append("image", data.image[0]);
//       }

//       await updateProduct({ id, body: formData }).unwrap();
//       toast.success("Product updated successfully!");
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Update failed");
//     }
//   };

//   if (isLoading) return <div className="p-6">Loading product...</div>;

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         <div>
//           <Label>Title</Label>
//           <Input {...register("title", { required: "Title is required" })} />
//           {errors.title && <p className="text-red-500">{errors.title.message}</p>}
//         </div>

//         <div>
//           <Label>Detail</Label>
//           <Textarea {...register("detail", { required: "Detail is required" })} />
//           {errors.detail && <p className="text-red-500">{errors.detail.message}</p>}
//         </div>

//         <div>
//           <Label>Price (Rs.)</Label>
//           <Input type="number" step="0.01" {...register("price", { required: true, min: 0 })} />
//           {errors.price && <p className="text-red-500">{errors.price.message}</p>}
//         </div>

//         <div>
//           <Label>Stock Quantity</Label>
//           <Input type="number" {...register("stock", { required: true, min: 0 })} />
//           {errors.stock && <p className="text-red-500">{errors.stock.message}</p>}
//         </div>

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
//           <Label>Product Image (optional)</Label>
//           <Input type="file" accept="image/*" {...register("image")} />
//         </div>

//         <Button type="submit" className="w-full" disabled={saving}>
//           {saving ? "Saving..." : "Save Changes"}
//         </Button>
//       </form>
//     </div>
//   );
// }














// // src/pages/EditProduct.jsx
// import { useParams, useNavigate } from "react-router-dom";
// import { useGetProductQuery, useUpdateProductMutation } from "@/app/mainApi";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import toast from "react-hot-toast";
// import { useEffect, useState } from "react";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data, isLoading } = useGetProductQuery(id);
//   const [updateProduct, { isLoading: saving }] = useUpdateProductMutation();
//   const { register, handleSubmit, setValue } = useForm();
//   const [imagePreview, setImagePreview] = useState("");

//   // Populate form with existing product data
//   useEffect(() => {
//     if (data?.product) {
//       const p = data.product;
//       setValue("title", p.title || "");
//       setValue("detail", p.detail || "");
//       setValue("price", p.price || 0);
//       setValue("stock", p.stock || 0);
//       setValue("category", p.category || "");
//       setValue("brand", p.brand || "");
//       setImagePreview(p.image || "");
//     }
//   }, [data, setValue]);




// const onSubmit = async (data) => {
//   try {
//     // Use FormData if you want to allow image upload
//     const formData = new FormData();
//     formData.append("title", data.title);
//     formData.append("detail", data.detail);
//     formData.append("price", data.price);
//     formData.append("stock", data.stock);
//     formData.append("category", data.category);
//     formData.append("brand", data.brand);
//     if (data.image && data.image[0]) {
//       formData.append("image", data.image[0]); // optional image update
//     }

//     // Call update mutation with id and body
//     await updateProduct({ id, body: formData }).unwrap();

//     toast.success("Product updated successfully!");
//     navigate("/admin");
//   } catch (err) {
//     toast.error(err?.data?.message || "Update failed");
//   }
// };






//   // const onSubmit = async (formData) => {
//   //   try {
//   //     const updatedData = new FormData();
//   //     updatedData.append("title", formData.title);
//   //     updatedData.append("detail", formData.detail);
//   //     updatedData.append("price", formData.price);
//   //     updatedData.append("stock", formData.stock);
//   //     updatedData.append("category", formData.category);
//   //     updatedData.append("brand", formData.brand);

//   //     if (formData.image && formData.image.length > 0) {
//   //       updatedData.append("image", formData.image[0]);
//   //     }

//   //     await updateProduct({ id, body: updatedData }).unwrap();
//   //     toast.success("Product updated successfully!");
//   //     navigate("/admin");
//   //   } catch (err) {
//   //     toast.error(err?.data?.message || "Update failed");
//   //   }
//   // };

//   if (isLoading) return <div className="p-6">Loading product...</div>;

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

//         {/* Title */}
//         <div>
//           <Label>Title</Label>
//           <Input {...register("title", { required: true })} placeholder="Product title" />
//         </div>

//         {/* Detail */}
//         <div>
//           <Label>Detail</Label>
//           <Textarea {...register("detail", { required: true })} placeholder="Product detail" />
//         </div>

//         {/* Price */}
//         <div>
//           <Label>Price (Rs.)</Label>
//           <Input
//             type="number"
//             step="0.01"
//             {...register("price", { required: true, min: 0 })}
//             placeholder="Product price"
//           />
//         </div>

//         {/* Stock */}
//         <div>
//           <Label>Stock Quantity</Label>
//           <Input
//             type="number"
//             {...register("stock", { required: true, min: 0 })}
//             placeholder="Stock quantity"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <Label>Category</Label>
//           <select
//             {...register("category", { required: true })}
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">Select category</option>
//             <option value="food">Food</option>
//             <option value="clothes">Clothes</option>
//             <option value="tech">Tech</option>
//             <option value="jewellery">Jewellery</option>
//           </select>
//         </div>

//         {/* Brand */}
//         <div>
//           <Label>Brand</Label>
//           <select
//             {...register("brand", { required: true })}
//             className="w-full border rounded px-2 py-1"
//           >
//             <option value="">Select brand</option>
//             <option value="addidas">Addidas</option>
//             <option value="samsung">Samsung</option>
//             <option value="tanishq">Tanishq</option>
//             <option value="kfc">KFC</option>
//           </select>
//         </div>

//         {/* Image Upload */}
//         <div>
//           <Label>Product Image</Label>
//           <Input
//             type="file"
//             accept="image/*"
//             {...register("image")}
//             onChange={(e) => {
//               if (e.target.files[0]) setImagePreview(URL.createObjectURL(e.target.files[0]));
//             }}
//           />
//           {imagePreview && (
//             <img src={imagePreview} alt="preview" className="mt-2 w-32 h-32 object-cover" />
//           )}
//         </div>

//         {/* Submit */}
//         <Button type="submit" className="w-full" disabled={saving}>
//           {saving ? "Saving..." : "Save Changes"}
//         </Button>
//       </form>
//     </div>
//   );
// }





















// import { useParams, useNavigate } from "react-router-dom";
// import { useGetProductQuery, useUpdateProductMutation } from "@/services/api";
// import { useForm } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import { useEffect } from "react";

// export default function EditProduct() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { data: product, isLoading } = useGetProductQuery(id);
//   const [updateProduct, { isLoading: saving }] = useUpdateProductMutation();
//   const { register, handleSubmit, reset } = useForm();

//   useEffect(() => {
//     if (product) reset(product);
//   }, [product, reset]);

//   const onSubmit = async (data) => {
//     try {
//       await updateProduct({ id, ...data }).unwrap();
//       toast.success("Product updated");
//       navigate("/admin");
//     } catch (err) {
//       toast.error(err?.data?.message || "Update failed");
//     }
//   };

//   if (isLoading) return <div className="p-6">Loading product...</div>;

//   return (
//     <div className="container mx-auto p-6 max-w-lg">
//       <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
//         <Button type="submit" disabled={saving} className="w-full">
//           {saving ? "Saving..." : "Save Changes"}
//         </Button>
//       </form>
//     </div>
//   );
// }













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