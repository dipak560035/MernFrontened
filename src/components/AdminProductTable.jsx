import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteProduct } from '../redux/slices/productSlice';

export default function AdminProductTable({ products }) {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm('Delete?')) dispatch(deleteProduct(id));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell className="space-x-2">
              <Button asChild variant="secondary">
                <NavLink to={`/admin/edit/${product._id}`}>Edit</NavLink>
              </Button>
              <Button variant="destructive" onClick={() => handleDelete(product._id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}