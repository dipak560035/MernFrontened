
import { useGetProductsQuery, useDeleteProductMutation } from "@/app/mainApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  // Fetch products
  const { data, isLoading, error } = useGetProductsQuery({ limit: 10000, page: 1 });
  const [deleteProduct] = useDeleteProductMutation();

  // Make sure products is an array
  const products = Array.isArray(data) ? data : data?.products || [];

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <div className="p-6">Loading products...</div>;
  if (error) return <div className="p-6 text-red-500">Failed to load products</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/admin/add">
          <Button>Add Product</Button>
        </Link>
      </div>

      <div className="space-y-3">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((p) => (
            <div key={p._id} className="flex items-center justify-between border rounded p-3">
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-sm text-muted-foreground">Rs.{p.price} • {p.category}</p>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/edit/${p._id}`}>
                  <Button variant="outline">Edit</Button>
                </Link>
                <Button variant="destructive" onClick={() => handleDelete(p._id)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


