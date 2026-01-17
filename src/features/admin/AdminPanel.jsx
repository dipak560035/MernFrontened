
import { base } from '@/app/mainApi';
import { Avatar,  AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetProductsQuery } from '@/products/productApi';
import {EditIcon, TrashIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RemoveProduct from './RemoveProduct';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';





export default function AdminPanel() {
  const navigate = useNavigate();

  const { isLoading, error, data } = useGetProductsQuery();

  console.log(data);
  if (isLoading) return  <DotLottieReact
    src="loading.lottie"
    loop
    autoplay
  />
  if (error) return <h1 className="text-pink-950">Error loading products</h1>
  if (!data || !data.products) return <h1 className="text-pink-950">No products found</h1>
  return (
    <div className='p-5'>

      <div className='mb-4'>
        <Button 
        onClick = {()=>navigate('/product-add')}
        className={'bg-gray-700'}>
          Add Product
        </Button>
      </div>


      <div className='w-full'>
        <div className='[&>div]:rounded-sm [&>div]:border'>
          <Table>
            <TableHeader>
              <TableRow className='hover:bg-transparent'>
                <TableHead>Name</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Update</TableHead>
                <TableHead>Remove</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.products.map(item => {
                const imageUrl = item.image ? `${base}${item.image}` : null;
                return (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className='flex items-center gap-3'>
                      <Avatar>
                        <AvatarImage 
                          src={imageUrl} 
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/40?text=No+Image';
                          }}
                        />
                       
                      </Avatar>
                      <div className='font-medium'>{item.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{item._id}</TableCell>
                  <TableCell>{item.createdAt }</TableCell>
                  <TableCell>
                  <Button onClick={() => navigate(`/product-edit/${item._id}`)} >
                    <EditIcon />
                  </Button>
                  </TableCell>
                  <TableCell >
                    <RemoveProduct id={item._id}/>
                   


                  </TableCell>
                  
                </TableRow>
              );
              })}

            </TableBody>
          </Table>
        </div>

      </div>

    </div>
  )
}