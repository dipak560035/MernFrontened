import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProduct, updateProduct } from '../redux/slices/productSlice';
import { useSelector } from 'react-redux';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProductForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { current: product, isLoading } = useSelector((state) => state.products);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (isEdit && product) {
      setValue('name', product.name);
      setValue('price', product.price);
      setValue('description', product.description);
      setValue('category', product.category);
      setValue('stock', product.stock);
    }
  }, [isEdit, product, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await dispatch(updateProduct({ id, data })).unwrap();
        toast.success('Product updated successfully!');
      } else {
        await dispatch(addProduct(data)).unwrap();
        toast.success('Product added successfully!');
      }
      navigate('/admin');
    } catch (error) {
      toast.error(error.message || 'Failed to save product');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-3xl min-h-screen">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/admin')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <Card className="shadow-xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl">
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </CardTitle>
              <CardDescription>
                {isEdit ? 'Update product information' : 'Fill in the details to add a new product'}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="name">
                  Product Name <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="name" 
                  placeholder="Enter product name"
                  {...register('name', { 
                    required: 'Product name is required',
                    minLength: { value: 3, message: 'Name must be at least 3 characters' }
                  })} 
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">
                  Price ($) <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="price" 
                  type="number" 
                  step="0.01"
                  placeholder="0.00"
                  {...register('price', { 
                    required: 'Price is required',
                    min: { value: 0.01, message: 'Price must be greater than 0' }
                  })} 
                  className={errors.price ? 'border-destructive' : ''}
                />
                {errors.price && (
                  <p className="text-sm text-destructive">{errors.price.message}</p>
                )}
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <Label htmlFor="stock">
                  Stock Quantity <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="stock" 
                  type="number" 
                  placeholder="0"
                  {...register('stock', { 
                    required: 'Stock is required',
                    min: { value: 0, message: 'Stock cannot be negative' }
                  })} 
                  className={errors.stock ? 'border-destructive' : ''}
                />
                {errors.stock && (
                  <p className="text-sm text-destructive">{errors.stock.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Input 
                  id="category" 
                  placeholder="e.g., Electronics, Clothing, Books"
                  {...register('category', { 
                    required: 'Category is required'
                  })} 
                  className={errors.category ? 'border-destructive' : ''}
                />
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea 
                  id="description" 
                  placeholder="Enter product description..."
                  rows={6}
                  {...register('description', { 
                    required: 'Description is required',
                    minLength: { value: 10, message: 'Description must be at least 10 characters' }
                  })} 
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              {/* Image URL (Optional) */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="image">Image URL (Optional)</Label>
                <Input 
                  id="image" 
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...register('image')} 
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to use default placeholder image
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button 
              type="button"
              variant="outline" 
              onClick={() => navigate('/admin')}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isLoading}
              size="lg"
            >
              <Save className="mr-2 h-4 w-4" />
              {isLoading ? 'Saving...' : isEdit ? 'Update Product' : 'Add Product'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}