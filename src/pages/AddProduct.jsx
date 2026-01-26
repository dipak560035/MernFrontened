import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImagesChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("price", form.price);
    data.append("category", form.category);
    data.append("stock", form.stock || 0);
    data.append("featured", form.featured);

    // Convert comma list → array
    if (form.tags) form.tags.split(",").forEach((tag) => data.append("tags", tag.trim()));
    if (form.colors) form.colors.split(",").forEach((color) => data.append("colors", color.trim()));
    if (form.sizes) form.sizes.split(",").forEach((size) => data.append("sizes", size.trim()));

    // Attach images
    images.forEach((img) => data.append("images", img));

    try {
      await createProduct(data).unwrap();
      navigate("/admin");
    } catch (err) {
      console.error("Product create failed:", err);
    }
  };

  return (
    <Container className="py-12 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input placeholder="Product Name" name="name" value={form.name} onChange={handleChange} required />
        <textarea
          placeholder="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
          rows={4}
        />
        <Input type="number" placeholder="Price" name="price" value={form.price} onChange={handleChange} required />
        <Input placeholder="Category" name="category" value={form.category} onChange={handleChange} />
        <Input placeholder="Stock" type="number" name="stock" value={form.stock} onChange={handleChange} />

        <Input placeholder="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} />
        <Input placeholder="Colors (comma separated)" name="colors" value={form.colors} onChange={handleChange} />
        <Input placeholder="Sizes (comma separated)" name="sizes" value={form.sizes} onChange={handleChange} />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
          <span>Featured Product</span>
        </label>

        <input type="file" multiple accept="image/*" onChange={handleImagesChange} />

        {images.length > 0 && (
          <div className="text-sm text-neutral-600">
            Selected Images: {images.length} / 6
          </div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </Container>
  );
}


























// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useForm } from "react-hook-form";
// import { useAdminCreateProductMutation } from "../services/api";
// import { useNavigate } from "react-router-dom";

// export default function AddProduct() {
//   const form = useForm();
//   const [createProduct, { isLoading }] = useAdminCreateProductMutation();
//   const navigate = useNavigate();

//   const onSubmit = async (v) => {
//     try {
//       await createProduct({
//         name: v.title,
//         price: Number(v.price),
//         images: v.image ? [v.image] : [],
//       }).unwrap();
//       form.reset();
//       navigate("/admin");
//     } catch (e) {
//       console.error("Add product failed", e);
//     }
//   };

//   return (
//     <Container className="py-12 max-w-xl">
//       <h1 className="text-2xl font-semibold mb-6">Add Product</h1>
//       <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
//         <Input placeholder="Title" {...form.register("title")} />
//         <Input placeholder="Price" type="number" {...form.register("price")} />
//         <Input placeholder="Image URL" {...form.register("image")} />
//         <Button type="submit" disabled={isLoading}>
//           {isLoading ? "Adding..." : "Add Product"}
//         </Button>
//       </form>
//     </Container>
//   );
// }
