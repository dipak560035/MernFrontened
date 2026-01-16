
// import { useGetProductsQuery, useDeleteProductMutation } from "@/services/api";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";

// export default function AdminDashboard() {
//   const { data: products, isLoading } = useGetProductsQuery();
//   const [deleteProduct] = useDeleteProductMutation();

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id).unwrap();
//       toast.success("Product deleted");
//     } catch (err) {
//       toast.error(err?.data?.message || "Delete failed");
//     }
//   };

//   if (isLoading) return <div className="p-6">Loading products...</div>;

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <Link to="/admin/add">
//           <Button>Add Product</Button>
//         </Link>
//       </div>

//       <div className="space-y-3">
//         {products?.map((p) => (
//           <div key={p._id} className="flex items-center justify-between border rounded p-3">
//             <div>
//               <p className="font-semibold">{p.name}</p>
//               <p className="text-sm text-muted-foreground">Rs.{p.price} • {p.category}</p>
//             </div>
//             <div className="flex gap-2">
//               <Link to={`/admin/edit/${p._id}`}>
//                 <Button variant="outline">Edit</Button>
//               </Link>
//               <Button variant="destructive" onClick={() => handleDelete(p._id)}>
//                 Delete
//               </Button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";
// import { useDeleteProductMutation, useGetProductsQuery } from "@/app/mainApi";

// export default function AdminDashboard() {
//   const { data: products, isLoading } = useGetProductsQuery();
//   const [deleteProduct] = useDeleteProductMutation();

//   const handleDelete = async (id) => {
//     try {
//       await deleteProduct(id).unwrap();
//       toast.success("Product deleted successfully");
//     } catch (err) {
//       toast.error(err?.data?.message || "Failed to delete product");
//     }
//   };

//   if (isLoading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-muted-foreground">
//         Loading products...
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-background p-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
//         <h1 className="text-3xl font-bold mb-3 sm:mb-0">Admin Dashboard</h1>
//         <Link to="/admin/add">
//           <Button>Add Product</Button>
//         </Link>
//       </div>

//       {/* Products Table */}
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border rounded-lg bg-white">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-2">Name</th>
//               <th className="px-4 py-2">Category</th>
//               <th className="px-4 py-2">Price (Rs.)</th>
//               <th className="px-4 py-2 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products?.map((p) => (
//               <tr key={p._id} className="border-b hover:bg-gray-50 transition">
//                 <td className="px-4 py-2">{p.name}</td>
//                 <td className="px-4 py-2">{p.category}</td>
//                 <td className="px-4 py-2">{p.price}</td>
//                 <td className="px-4 py-2 flex justify-end gap-2">
//                   <Link to={`/admin/edit/${p._id}`}>
//                     <Button variant="outline" size="sm">
//                       Edit
//                     </Button>
//                   </Link>
//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDelete(p._id)}
//                   >
//                     Delete
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//             {!products?.length && (
//               <tr>
//                 <td colSpan="4" className="text-center py-4 text-muted-foreground">
//                   No products found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }






















import { useGetProductsQuery, useDeleteProductMutation } from "@/app/mainApi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  // Fetch products
  const { data, isLoading, error } = useGetProductsQuery();
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













// import { useGetProductsQuery, useDeleteProductMutation } from "@/app/mainApi";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import toast from "react-hot-toast";

// export default function AdminDashboard() {
//   const { data: productsData, isLoading, error, refetch } = useGetProductsQuery();
//   const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await deleteProduct(id).unwrap();
//       toast.success("Product deleted successfully");
//       refetch(); // refresh product list
//     } catch (err) {
//       toast.error(err?.data?.message || "Delete failed");
//     }
//   };

//   if (isLoading) return <div className="p-6">Loading products...</div>;
//   if (error) return <div className="p-6 text-red-500">Error loading products</div>;

//   const products = productsData?.products || []; // make sure it's an array

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//         <Link to="/admin/add">
//           <Button>Add Product</Button>
//         </Link>
//       </div>

//       {products.length === 0 ? (
//         <p>No products found</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product._id} className="border rounded shadow p-4 flex flex-col">
//               {/* Image */}
//               {product.image && (
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="h-48 w-full object-cover rounded mb-4"
//                 />
//               )}

//               {/* Product Info */}
//               <div className="flex-1">
//                 <h2 className="font-semibold text-lg">{product.title}</h2>
//                 <p className="text-sm text-muted-foreground">{product.detail}</p>
//                 <p className="mt-2 text-sm">
//                   <span className="font-medium">Category:</span> {product.category}
//                 </p>
//                 <p className="text-sm">
//                   <span className="font-medium">Brand:</span> {product.brand}
//                 </p>
//                 <p className="mt-1 text-sm">
//                   <span className="font-medium">Price:</span> Rs.{product.price}
//                 </p>
//                 <p className="text-sm">
//                   <span className="font-medium">Stock:</span> {product.stock}
//                 </p>
//               </div>

//               {/* Action Buttons */}
//               <div className="mt-4 flex gap-2">
//                 <Link to={`/admin/edit/${product._id}`}>
//                   <Button variant="outline" className="flex-1">Edit</Button>
//                 </Link>
//                 <Button
//                   variant="destructive"
//                   className="flex-1"
//                   onClick={() => handleDelete(product._id)}
//                   disabled={deleting}
//                 >
//                   {deleting ? "Deleting..." : "Delete"}
//                 </Button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
