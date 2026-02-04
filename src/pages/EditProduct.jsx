
import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminUpdateProductMutation,
  useProductByIdQuery,
} from "../services/api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useAdminUpdateProductMutation();

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

  useEffect(() => {
    if (data?.success && data.data) {
      const p = data.data;
      // eslint-disable-next-line
      setForm({
        name: p.name || "",
        description: p.description || "",
        price: p.price || "",
        category: p.category || "",
        tags: p.tags?.join(",") || "",
        stock: p.stock || "",
        colors: p.colors?.join(",") || "",
        sizes: p.sizes?.join(",") || "",
        featured: p.featured || false,
      });
    }
  }, [data]);

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

    // If user selected new images, send as FormData (multipart)
    if (images.length > 0) {
      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("price", form.price);
      data.append("category", form.category);
      data.append("stock", form.stock || 0);
      data.append("featured", form.featured);

      if (form.tags) form.tags.split(",").forEach((tag) => data.append("tags", tag.trim()));
      if (form.colors) form.colors.split(",").forEach((color) => data.append("colors", color.trim()));
      if (form.sizes) form.sizes.split(",").forEach((size) => data.append("sizes", size.trim()));

      images.forEach((img) => data.append("images", img));

      try {
        await updateProduct({ id, formData: data }).unwrap();
        navigate("/admin");
      } catch (err) {
        console.error("Update failed:", err.status, err.data || err);
      }

    } else {
      // No new images — send JSON body for a lightweight partial update
      const body = {
        name: form.name,
        description: form.description,
        // cast numeric fields so backend receives numbers
        price: Number(form.price),
        category: form.category,
        stock: Number(form.stock) || 0,
        featured: !!form.featured,
        tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
        colors: form.colors ? form.colors.split(",").map((c) => c.trim()) : [],
        sizes: form.sizes ? form.sizes.split(",").map((s) => s.trim()) : [],
      };

      try {
        await updateProduct({ id, body }).unwrap();
        navigate("/admin");
      } catch (err) {
        console.error("Update failed:", err.status, err.data || err);
      }
    }
  };

  if (isFetching) return <Container className="py-12">Loading...</Container>;

  return (
    <Container className="py-12 max-w-2xl">
      <h1 className="text-2xl font-semibold mb-6">Edit Product</h1>

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

        <div>
          <div className="text-sm mb-1">Upload New Images (optional)</div>
          <input type="file" multiple accept="image/*" onChange={handleImagesChange} />
        </div>

        {images.length > 0 && (
          <div className="text-sm text-neutral-600">
            Selected Images: {images.length}
          </div>
        )}

        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Product"}
        </Button>
      </form>
    </Container>
  );
}
