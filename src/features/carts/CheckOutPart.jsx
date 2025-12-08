import { Button } from "@/components/ui/button"
import ShowDialog from "@/components/ui/ShowDialog"
import { useCreateOrderMutation } from "../orders/OrderApi"
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "./cartSlice";


export default function CheckOutPart({carts}) {
    const dispatch = useDispatch();
    const [addOrder,{isLoading}] = useCreateOrderMutation();
     const totalAmount = carts.reduce((total, item) => total + item.price * item.qty, 0);
  const { user } = useSelector((state) => state.userSlice);

    const handleOrder = async () => {

        try {
            await addOrder({
            token: user?.token,
             body: {
             products: carts.map((item) => ({
            product: item.id,
            quantity: item.qty
          })),
          totalAmount
        }
            }).unwrap();
            dispatch(clearCart());
            toast.success('Order created successfully!');
            
        } catch (error) {
            console.log('Order error:', error);
            const errorMsg = error?.data?.message || error?.message || 'Error creating order';
            toast.error(errorMsg);
            
        }
    }
  return (
     <div className='flex items-center flex-col'>
          <h2>Order Summary</h2>

          <div className='space-y-4'>
            {carts.map((item, index) => {
              return <div key={index}>
                <div className='flex justify-between gap-14'> 
                  <span>{item.title}</span>
                  <span> {item.qty} * Rs.{item.price}</span>

                </div>
              </div>
            })}
          </div>

          <div>
            <p>Total Items:{carts.length}</p> 
            <div>
              <p> Total Price : Rs. {carts.reduce((total,item) => 
              total + item.price * item.qty,0
              )}</p>
            </div>
            </div>
            <ShowDialog 
            func={handleOrder}
            detail={'you want to buy products'}>

              <Button disabled={isLoading||!carts.length} className={' mt-9 px-9 bg-green-600'}>Checkout</Button>

            </ShowDialog>
            
        </div>
  )
}
