// import { useState } from "react";
// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useAdminCreateProductMutation } from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function AddProduct() {
//   const [createProduct, { isLoading }] = useAdminCreateProductMutation();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     category: "",
//     tags: "",
//     stock: "",
//     colors: "",
//     sizes: "",
//     featured: false,
//   });

//   const [images, setImages] = useState([]);
//   const [previews, setPreviews] = useState([]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleImagesChange = (e) => {
//     const files = Array.from(e.target.files);
//     setImages(files);

//     // Create previews
//     const filePreviews = files.map((file) => URL.createObjectURL(file));
//     setPreviews(filePreviews);
//   };

//   const removeImage = (index) => {
//     const newImages = [...images];
//     const newPreviews = [...previews];
    
//     // Revoke the URL to avoid memory leaks
//     URL.revokeObjectURL(newPreviews[index]);
    
//     newImages.splice(index, 1);
//     newPreviews.splice(index, 1);
    
//     setImages(newImages);
//     setPreviews(newPreviews);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     data.append("name", form.name);
//     data.append("description", form.description);
//     data.append("price", form.price);
//     data.append("category", form.category);
//     data.append("stock", form.stock || 0);
//     data.append("featured", form.featured);

//     // Convert comma list → array
//     if (form.tags) form.tags.split(",").forEach((tag) => data.append("tags", tag.trim()));
//     if (form.colors) form.colors.split(",").forEach((color) => data.append("colors", color.trim()));
//     if (form.sizes) form.sizes.split(",").forEach((size) => data.append("sizes", size.trim()));

//     // Attach images
//     images.forEach((img) => data.append("images", img));

//     try {
//       await createProduct(data).unwrap();
//       navigate("/admin");
//     } catch (err) {
//       console.error("Product create failed:", err);
//     }
//   };

//   return (
//     <Container className="py-12 max-w-2xl">
//       <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <Input placeholder="Product Name" name="name" value={form.name} onChange={handleChange} required />
//         <textarea
//           placeholder="Description"
//           name="description"
//           value={form.description}
//           onChange={handleChange}
//           className="w-full border rounded-md p-2"
//           rows={4}
//         />
//         <Input type="number" placeholder="Price" name="price" value={form.price} onChange={handleChange} required />
//         <Input placeholder="Category" name="category" value={form.category} onChange={handleChange} />
//         <Input placeholder="Stock" type="number" name="stock" value={form.stock} onChange={handleChange} />

//         <Input placeholder="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} />
//         <Input placeholder="Colors (comma separated)" name="colors" value={form.colors} onChange={handleChange} />
//         <Input placeholder="Sizes (comma separated)" name="sizes" value={form.sizes} onChange={handleChange} />

//         <label className="flex items-center gap-2">
//           <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
//           <span>Featured Product</span>
//         </label>

//         <div className="space-y-4">
//           <label className="block">
//             <span className="text-sm font-medium text-neutral-700">Product Images</span>
//             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 border-dashed rounded-md hover:border-primary transition-colors cursor-pointer relative">
//               <div className="space-y-1 text-center">
//                 <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
//                   <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//                 <div className="flex text-sm text-neutral-600">
//                   <span className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark">
//                     Upload files
//                   </span>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 10MB</p>
//               </div>
//               <input 
//                 type="file" 
//                 multiple 
//                 accept="image/*" 
//                 onChange={handleImagesChange} 
//                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//               />
//             </div>
//           </label>

//           {previews.length > 0 && (
//             <div className="grid grid-cols-3 gap-4 mt-4">
//               {previews.map((preview, index) => (
//                 <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-200">
//                   <img src={preview} alt={`Preview ${index}`} className="w-full h-full object-cover" />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <Button type="submit" disabled={isLoading} className="w-full">
//           {isLoading ? "Creating..." : "Create Product"}
//         </Button>
//       </form>
//     </Container>
//   );
// }




















import { useState, useEffect } from "react";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useAdminCreateProductMutation } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [createProduct, { isLoading }] = useAdminCreateProductMutation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    tags: "",
    stock: "",
    colors: "",
    sizes: "",
    featured: false,
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ FIXED: Append images instead of replacing
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    // Limit max 5 images (backend limit)
    if (images.length + files.length > 5) {
      alert("You can upload maximum 5 images");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviews((prev) => [...prev, ...newPreviews]);

    // Reset input so same file can be selected again
    e.target.value = null;
  };

  // Remove single image
  const removeImage = (index) => {
    URL.revokeObjectURL(previews[index]);

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    const data = new FormData();

    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("stock", form.stock || 0);
    data.append("featured", form.featured);

    if (form.tags)
      form.tags.split(",").forEach((tag) =>
        data.append("tags", tag.trim())
      );

    if (form.colors)
      form.colors.split(",").forEach((color) =>
        data.append("colors", color.trim())
      );

    if (form.sizes)
      form.sizes.split(",").forEach((size) =>
        data.append("sizes", size.trim())
      );

    images.forEach((img) => {
      data.append("images", img);
    });

    try {
      await createProduct(data).unwrap();
      navigate("/admin");
    } catch (err) {
      console.error("Product create failed:", err);
      alert("Failed to create product");
    }
  };

  return (
    <Container className="py-12 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          rows={4}
        />

        <Input
          type="number"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <Input
          placeholder="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <Input
          placeholder="Stock"
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
        />

        <Input
          placeholder="Tags (comma separated)"
          name="tags"
          value={form.tags}
          onChange={handleChange}
        />

        <Input
          placeholder="Colors (comma separated)"
          name="colors"
          value={form.colors}
          onChange={handleChange}
        />

        <Input
          placeholder="Sizes (comma separated)"
          name="sizes"
          value={form.sizes}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          <span>Featured Product</span>
        </label>

        {/* Upload Section */}
        <div>
          <label className="block mb-2 font-medium">
            Product Images (Max 5)
          </label>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            className="w-full"
          />

          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden border"
                >
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Container>
  );
}
