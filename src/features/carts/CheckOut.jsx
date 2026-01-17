import { MinusIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { AvatarImage, Avatar, AvatarFallback } from '../../components/ui/avatar'

import { Button } from '../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux';

import { removeCart, setCart } from './cartSlice';
import { base } from '@/app/mainApi';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ShowDialog from '@/components/ui/ShowDialog';
import CheckOutPart from './CheckOutPart';

export default function CheckOut() {
  const { carts } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(setCart({ ...item, qty: item.qty + 1 }));
  }
  const handleRemove = (item) => {
    dispatch(setCart({ ...item, qty: item.qty - 1 }));
  }

  const handleRemoveItem = (item) => {
    dispatch(removeCart(item));
  }

  return (
    <div>
      <h2 className='font-semibold mb-5'>CheckOut Page</h2>
      <div className='grid grid-cols-[1.4fr_1fr]'>
        <div className='w-full'>
          <div className='[&>div]:rounded-sm [&>div]:border'>
            <Table>
              <TableHeader>
                <TableRow className='hover:bg-transparent'>

                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className='w-0'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {carts.map(item => {
                  const imageUrl = item.image ? `${base}${item.image}` : null;
                  return (
                  <TableRow key={item.id} className='has-data-[state=checked]:bg-muted/50'>

                    <TableCell>
                      <div className='flex items-center gap-3'>
                        <Avatar className='rounded-sm'>
                          <AvatarImage 
                            src={imageUrl} 
                            alt={item.title}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                            }}
                          />
                          <AvatarFallback className='text-xs'>{item.title}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>{item.title}</div>
                          <span className='text-muted-foreground mt-0.5 text-xs'>{item.brand}</span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className='flex gap-5 items-center'>
                        <Button
                          onClick={() => handleRemove(item)}
                          disabled={item.qty === 1}
                          variant="outline" size="icon">
                          <MinusIcon />
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          disabled={item.qty === item.stock}
                          onClick={() => handleAdd(item)} variant="outline" size="icon">
                          <PlusIcon />
                        </Button>
                      </div>

                    </TableCell>
                    <TableCell>Rs.{item.price * item.qty}</TableCell>
                    <TableCell className='flex items-center gap-1'>



                                          
                      <ShowDialog
                        func={() => handleRemoveItem(item)}

                        detail={'This action cannot be undone. This will permanently delete youraccount and remove your data from our servers.'}>

                        <Button variant='ghost' size='icon' className='rounded-full' >
                          <Trash2Icon />
                        </Button>



                      </ShowDialog>


                     

                    </TableCell>
                  </TableRow>
                );
                })}
              </TableBody>
            </Table>
          </div>

        </div>

      

        
                <CheckOutPart carts={carts}/>




      </div>
    </div>
  )
}

