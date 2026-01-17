
import { useParams } from 'react-router'

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { base } from '@/app/mainApi';
import { useGetProductQuery } from './productApi';
import AddToCart from '../carts/AddToCart';




export default function ProductDetail() {
    const {id} = useParams();
    const {isLoading,error,data} = useGetProductQuery(id);
    
    console.log('Query result:', {isLoading, error, data});
    
    if (isLoading) return  <DotLottieReact
    src="/loading.lottie"
    loop
    autoplay
  />
    if (error) {
      console.log('Error details:', error);
      return <h3 className='text-pink-500'>Error loading product</h3>
    }
    console.log('Query result:', {isLoading, error, data});

    
    // Handle both response formats: data.product or data directly
    const product = data?.product || data;
    console.log('Product:', product);
    
    if (!product) return <h3 className='text-pink-500'>Product not found</h3>
    
    // Construct image URL properly
    const imageUrl = product.image ? `${base}${product.image}` : null;

  return (
     <div className=" max-w-7xl mx-auto grid grid-cols-2 mt-11 gap-10">
      <div>
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={product.title}
            className="w-full object-cover rounded-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400?text=No+Image';
            }}
          />
        ) : (
          <div className='bg-gray-200 w-full h-64 flex items-center justify-center rounded-lg'>
            <span className='text-gray-400'>No Image</span>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <h1>{product.title}</h1>
        <p className="text-zinc-500">Price:- {product.price}</p>
        <p className="text-zinc-500">Stock:- {product.stock}</p>
        <p className="text-zinc-700">{product.detail}</p>
        <hr />
        
      </div>
      <AddToCart product={data.product} />



    </div>
  )
}
