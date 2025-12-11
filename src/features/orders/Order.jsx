// import { useParams } from "react-router";
// import { useGetOrderQuery } from "./OrderApi";
// import { base } from "@/app/mainApi";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";



// export default function Order() {
//     const { id } = useParams();
//   const { data, error, isLoading } = useGetOrderQuery(id);

//   if (isLoading) return <h1>Loading...</h1>
//   if (error) return <h1 className="text-pink-500">{error?.error || error.data?.message}</h1>
// console.log(data);
//   return (
//     <div>

//         {data &&  <div>
//             <h3>OrderId:{data.order._id}</h3>
//             <p className="text-slate-600">CreatedAt: {data.order.createdAt}</p>
//             <hr />
//             <div className="mt-5">
//                 {data.order.products.map((item) => {
//                  return <div key={item._id} className="flex gap-5" >
//                 <div>
//                   <Avatar className="size-20" >
//                     <AvatarImage src={`${base}/${item.product.image}`} alt={item.product.title} />
//                     <AvatarFallback>CN</AvatarFallback>
//                   </Avatar>

//                 </div>
//                <div className="space-y-2">
//                  <p>Product: {item.product.title}</p>
//                 <p>Price:Rs.{item.product.price}</p>
//                 <p>Quantity: {item.quantity}</p>
//                </div>
//                 <hr/>
//             </div>
//             }
//             )}
            
//             </div>
//             </div> }
//              <div className="mt-12">
//           <h3>Total Amount: Rs.{data.order.totalAmount}</h3>
//         </div>

//     </div>
//   )
// }










import { useParams } from "react-router";
import { useGetOrderQuery } from "./OrderApi";
import { base } from "@/app/mainApi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Order() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOrderQuery(id);

  if (isLoading) return <h1>Loading...</h1>;
  if (error)
    return (
      <h1 className="text-pink-500">
        {error?.error || error.data?.message || "Something went wrong"}
      </h1>
    );

  // If no data or order, show message
  if (!data || !data.order) return <h1>No order found</h1>;

  // Filter out products that are null
  const validProducts = data.order.products.filter((item) => item.product);

  return (
    <div>
      <div>
        <h3>OrderId: {data.order._id}</h3>
        <p className="text-slate-600">CreatedAt: {data.order.createdAt}</p>
        <hr />

        <div className="mt-5 space-y-4">
          {validProducts.length === 0 && <p>No products in this order.</p>}

          {validProducts.map((item) => (
            <div key={item._id} className="flex gap-5 items-center">
              <Avatar className="size-20">
                <AvatarImage
                  src={`${base}/${item.product?.image || "default-image.png"}`}
                  alt={item.product?.title || "Product"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p>Product: {item.product?.title || "Unknown"}</p>
                <p>Price: Rs.{item.product?.price || 0}</p>
                <p>Quantity: {item.quantity || 0}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h3>Total Amount: Rs.{data.order.totalAmount || 0}</h3>
      </div>
    </div>
  );
}
