import { useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Input from "../components/ui/input";
import Button from "../components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminUpdateProductMutation,
  useProductByIdQuery,
} from "../services/api";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useProductByIdQuery(id);
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

  const [existingImages, setExistingImages] = useState([]); // Array of { url: string }
  const [newImages, setNewImages] = useState([]); // Array of File
  const [newPreviews, setNewPreviews] = useState([]); // Array of string (blob URLs)

  const productData = data?.data;
  
  // Use a dedicated effect for form initialization
  useEffect(() => {
    let isMounted = true;
    if (productData && isMounted) {
      setForm({
        name: productData.name || "",
        description: productData.description || "",
        price: productData.price || "",
        category: productData.category || "",
        tags: Array.isArray(productData.tags) ? productData.tags.join(", ") : "",
        stock: productData.stock || "",
        colors: Array.isArray(productData.colors) ? productData.colors.join(", ") : "",
        sizes: Array.isArray(productData.sizes) ? productData.sizes.join(", ") : "",
        featured: productData.featured || false,
      });
      setExistingImages(productData.images || []);
    }
    return () => { isMounted = false };
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNewImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages((prev) => [...prev, ...files]);

    const previews = files.map((file) => URL.createObjectURL(file));
    setNewPreviews((prev) => [...prev, ...previews]);
  };

  const removeExistingImage = (url) => {
    setExistingImages((prev) => prev.filter((img) => img.url !== url));
  };

  const removeNewImage = (index) => {
    URL.revokeObjectURL(newPreviews[index]);
    setNewImages((prev) => prev.filter((_, i) => i !== index));
    setNewPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Standard fields
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("stock", form.stock || 0);
    formData.append("featured", form.featured);

    // Arrays (tags, colors, sizes)
    if (form.tags) {
      const tagsArray = form.tags.split(",").map((t) => t.trim()).filter(Boolean);
      tagsArray.forEach((t) => formData.append("tags", t));
    }
    if (form.colors) {
      const colorsArray = form.colors.split(",").map((c) => c.trim()).filter(Boolean);
      colorsArray.forEach((c) => formData.append("colors", c));
    }
    if (form.sizes) {
      const sizesArray = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);
      sizesArray.forEach((s) => formData.append("sizes", s));
    }

    // 1. Send the list of image URLs we want to KEEP
    formData.append("existingImages", JSON.stringify(existingImages.map(img => img.url)));

    // 2. Send NEW images
    newImages.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await updateProduct({ id, formData }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.data?.message || "Failed to update product");
    }
  };

  if (isLoading) return <Container className="py-12 text-center">Loading product...</Container>;

  return (
    <Container className="py-12 max-w-2xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Edit Product</h1>
        <Button variant="outline" onClick={() => navigate("/admin")}>Cancel</Button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Input label="Product Name" name="name" placeholder="Product Name" value={form.name} onChange={handleChange} required />
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-md p-2 min-h-[120px]"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input type="number" label="Price" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
            <Input type="number" label="Stock" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
          </div>
          <Input label="Category" name="category" placeholder="Category" value={form.category} onChange={handleChange} />
          <Input label="Tags (comma separated)" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} />
          <Input label="Colors (comma separated)" name="colors" placeholder="Colors (comma separated)" value={form.colors} onChange={handleChange} />
          <Input label="Sizes (comma separated)" name="sizes" placeholder="Sizes (comma separated)" value={form.sizes} onChange={handleChange} />

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4" />
            <span className="text-sm">Featured Product</span>
          </label>
        </div>

        {/* Images Section */}
        <div className="space-y-4">
          <h3 className="font-semibold border-b pb-2">Product Images</h3>
          
          {/* Current Images */}
          {existingImages.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-neutral-500">Current Images</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {existingImages.map((img) => (
                  <div key={img.url} className="relative group aspect-square rounded-lg overflow-hidden border">
                    <img src={`${BASE_URL}${img.url}`} className="w-full h-full object-cover" alt="Product" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(img.url)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Previews */}
          {newPreviews.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-600">New Images to Upload</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {newPreviews.map((preview, index) => (
                  <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-blue-200">
                    <img src={preview} className="w-full h-full object-cover" alt="New upload" />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upload Area */}
          <div className="relative border-2 border-dashed border-neutral-300 rounded-lg p-8 hover:border-primary transition-colors text-center cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleNewImagesChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2">
              <svg className="mx-auto h-12 w-12 text-neutral-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-sm font-medium">Click to upload new images</div>
              <p className="text-xs text-neutral-500">Add more photos to your product</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isUpdating} className="w-full py-6 text-lg">
            {isUpdating ? "Saving Changes..." : "Update Product"}
          </Button>
        </div>
      </form>
    </Container>
  );
}
