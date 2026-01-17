import { base } from '@/app/mainApi'
import { Card, CardHeader, CardDescription, CardTitle, CardFooter, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router'


export default function ProductCard({product}) {
  const nav = useNavigate();

  // Construct full image URL
  const imageUrl = product.image ? `${base}${product.image}` : null;

  return (
    <div
     onClick={() => nav(`/products/${product._id}`)}
    className='hover:scale-[103%]  ease-in delay-100 duration-75 transition cursor-pointer relative max-w-md rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg'>
      <div className='flex h-50 items-center justify-center bg-gray-200'>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.title || 'Product'}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300?text=No+Image';
            }}
          />
        ) : (
          <div className='text-gray-400 text-center'>No Image</div>
        )}
      </div>

      <Card className='border-none'>
        <CardHeader >
          <CardTitle>{product.title}</CardTitle>

        </CardHeader>
        <CardContent>
          <p  className='line-clamp-3'>
            {product.detail}
          </p>
        </CardContent>
        <CardFooter className='justify-between gap-3 max-sm:flex-col max-sm:items-stretch'>
          <div className='flex flex-col'>
            <span className='text-sm font-medium uppercase'>Price</span>
            <span className='text-xl font-semibold'>Rs.{product.price}</span>
          </div>

        </CardFooter>
      </Card>
    </div>
  )
}