

import { useProductsQuery, useAdminDeleteProductMutation } from "../services/api";
import Container from "../components/layout/Container";
import Button from "../components/ui/button";
import { Trash2, Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";

export default function Admin() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);
  const { data: productsResponse, isLoading } = useProductsQuery(debouncedQ ? { q: debouncedQ } : undefined);
  const all = productsResponse?.data || [];
  const searchLower = debouncedQ.toLowerCase();
  const products = searchLower
    ? all.filter((p) => {
        const fields = [
          p.name,
          p.category,
          ...(Array.isArray(p.tags) ? p.tags : []),
        ].filter(Boolean).map((x) => String(x).toLowerCase());
        return fields.some((f) => f.includes(searchLower));
      })
    : all;
  const [deleteProduct] = useAdminDeleteProductMutation();
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id).unwrap();
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  return (
    <>
      <section className="bg-neutral-100">
        <Container className="py-12 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Admin Panel</h1>
            <div className="mt-2 text-sm text-neutral-600">Manage Products</div>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="h-10 w-64 rounded-md bg-white px-3 text-neutral-700 outline-none placeholder:text-neutral-400"
            />
            <Button
              variant="outline"
              onClick={() => navigate("/admin/add")}
              className="mt-4 md:mt-0 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        {isLoading ? (
          <div className="text-center text-neutral-600">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-center text-neutral-600">No products available.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.id || p._id}
                className="border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col"
              >
                <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
                  {p.images?.[0]?.url ? (
                    <img
                      src={`${BASE_URL}${p.images[0].url}`}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-neutral-500">No Image</span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="font-semibold text-lg">{p.name}</h2>
                    <p className="text-sm text-neutral-600 mt-1">Re.{p.price.toFixed(2)}</p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-1"
                      onClick={() => navigate(`/admin/edit/${p.id || p._id}`)}
                    >
                      <Edit className="h-4 w-4" /> Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-1"
                      onClick={() => handleDelete(p.id || p._id)}
                    >
                      <Trash2 className="h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}






































// import { useState } from "react";
// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useForm } from "react-hook-form";
// import { Trash2, Edit, Plus } from "lucide-react";


// import { useNavigate } from "react-router-dom";
// import { useAdminCreateProductMutation, useAdminDeleteProductMutation, useProductsQuery } from "../services/api";

// export default function Admin() {
//   const [createProduct, { isLoading: creating }] = useAdminCreateProductMutation();
//   const [deleteProduct, { isLoading: deleting }] = useAdminDeleteProductMutation();
//   const { data: productsResponse = [], isLoading } = useProductsQuery();
// const products = productsResponse?.data || [];
//   const form = useForm();
//   const navigate = useNavigate();

//   const [showAddForm, setShowAddForm] = useState(false);

//   const onSubmit = async (v) => {
//     try {
//       await createProduct({
//         name: v.title,
//         price: Number(v.price),
//         images: v.image ? [v.image] : [],
//       }).unwrap();
//       form.reset();
//       setShowAddForm(false);
//     } catch (e) {
//       console.error("Create product failed", e);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this product?")) return;
//     try {
//       await deleteProduct(id).unwrap();
//     } catch (e) {
//       console.error("Delete failed", e);
//     }
//   };

//   return (
//     <>
//       <section className="bg-neutral-100">
//         <Container className="py-12 flex flex-col md:flex-row justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-semibold">Admin Panel</h1>
//             <div className="mt-2 text-sm text-neutral-600">Manage Products</div>
//           </div>
//           <Button
//             variant="outline"
//             onClick={() => setShowAddForm((prev) => !prev)}
//             className="mt-4 md:mt-0 flex items-center gap-2"
//           >
//             <Plus className="h-4 w-4" /> Add Product
//           </Button>
//         </Container>
//       </section>

//       {/* ADD PRODUCT FORM */}
//       {showAddForm && (
//         <Container className="py-6">
//           <form
//             className="max-w-xl space-y-4"
//             onSubmit={form.handleSubmit(onSubmit)}
//           >
//             <Input placeholder="Title" {...form.register("title")} />
//             <Input placeholder="Price" type="number" {...form.register("price")} />
//             <Input placeholder="Image URL" {...form.register("image")} />
//             <Button type="submit" disabled={creating}>
//               {creating ? "Adding..." : "Add Product"}
//             </Button>
//           </form>
//         </Container>
//       )}

//       {/* PRODUCT LIST */}
//       <Container className="py-12">
//         {isLoading ? (
//           <div className="text-center text-neutral-600">Loading products...</div>
//         ) : products.length === 0 ? (
//           <div className="text-center text-neutral-600">No products available.</div>
//         ) : (
//           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//             {products.map((p) => (
//               <div
//                 key={p.id || p._id}
//                 className="border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col"
//               >
//                 {/* Product Image */}
//                 <div className="h-48 w-full bg-gray-100 flex items-center justify-center">
//                   {p.images?.[0] ? (
//                     <img
//                       src={p.images[0]}
//                       alt={p.name}
//                       className="h-full w-full object-cover"
//                     />
//                   ) : (
//                     <span className="text-sm text-neutral-500">No Image</span>
//                   )}
//                 </div>

//                 {/* Product Info */}
//                 <div className="p-4 flex-1 flex flex-col justify-between">
//                   <div>
//                     <h2 className="font-semibold text-lg">{p.name}</h2>
//                     <p className="text-sm text-neutral-600 mt-1">${p.price.toFixed(2)}</p>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="mt-4 flex gap-2">
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       className="flex-1 flex items-center justify-center gap-1"
//                       onClick={() => navigate(`/admin/edit/${p.id || p._id}`)}
//                     >
//                       <Edit className="h-4 w-4" /> Edit
//                     </Button>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       className="flex-1 flex items-center justify-center gap-1"
//                       onClick={() => handleDelete(p.id || p._id)}
//                     >
//                       <Trash2 className="h-4 w-4" /> Delete
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </Container>
//     </>
//   );
// }































// import Container from "../components/layout/Container";
// import Input from "../components/ui/input";
// import Button from "../components/ui/button";
// import { useForm } from "react-hook-form";
// import { useAdminCreateProductMutation } from "../services/api";

// export default function Admin() {
//   const form = useForm();
//   const [createProduct, { isLoading }] = useAdminCreateProductMutation();
//   const onSubmit = async (v) => {
//     try {
//       await createProduct({
//         name: v.title,
//         price: Number(v.price),
//         images: v.image ? [v.image] : [],
//       }).unwrap();
//       form.reset();
//     } catch (e) {
//       console.error("Create product failed", e);
//     }
//   };
//   return (
//     <>
//       <section className="bg-neutral-100">
//         <Container className="py-12 text-center">
//           <h1 className="text-3xl font-semibold">Admin Panel</h1>
//           <div className="mt-2 text-sm text-neutral-600">Add products</div>
//         </Container>
        
//       </section>
//       <Container className="py-12">
//         <form className="max-w-xl space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
//           <Input placeholder="Title" {...form.register("title")} />
//           <Input placeholder="Price" type="number" {...form.register("price")} />
//           <Input placeholder="Image URL" {...form.register("image")} />
//           <Button type="submit" disabled={isLoading}>
//             {isLoading ? "Adding..." : "Add Product"}
//           </Button>
//         </form>
//       </Container>
//     </>
//   );
// }
