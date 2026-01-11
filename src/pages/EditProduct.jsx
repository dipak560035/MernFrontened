import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { fetchProduct } from '../redux/slices/productSlice';

export default function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  return <ProductForm isEdit={true} />;
}