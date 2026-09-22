import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Product } from '@/type/product.type';
import { useAppDispatch } from '@/app/hooks';
import { delete_product } from '@/features/products-slice/list-product/product.action';
import EditProductModal from '../edit-product/edit_product_modal';

type Prop = {
    product : Product
}


export default function MediaCard({product} : Prop) {
  const dispatch = useAppDispatch()
  const handleDelete = () => {
  dispatch(delete_product(product.id))
}

  return (
    <Card sx={{ width: 300 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.Image}
        title={product.product_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.product_name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDelete}>Delete</Button>
        <EditProductModal product={product}/>
      </CardActions>
    </Card>
  );
}