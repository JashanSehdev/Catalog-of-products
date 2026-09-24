"use client";
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import styles from "./edit-product-form.module.css";
import Input from "../inputs/inputs";
import { useForm } from "react-hook-form";
import { FormData, Product_Schema } from "./edit_product_type";
import CloudinaryUploader from "../../upload-widget/upload-widget";
import { useAppDispatch } from "@/app/hooks";
import { edit_product } from "@/features/products-slice/list-product/product.action";
import { Product } from "@/type/product.type";
import { zodResolver } from "@hookform/resolvers/zod";

const placeholder_image =
  "https://imgs.search.brave.com/xY8ksS3Ai6-aEMTwKRioZFbCjs6R6vY3-36v42As0-E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbGFj/ZWhvbGQubmV0L2J1/aWxkaW5nLnN2Zw";

type Prop = {
  product: Product;
  handleClose: () => void;
};

export default function EditProductForm({ product, handleClose }: Prop) {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Product_Schema),
    defaultValues: product,
  });

  const onSubmit = async (data: FormData) => {
    // Handle Edit
    dispatch(edit_product({ ...data, id: product.id }));
    handleClose();
  };

  console.log(watch());

  return (
    <Paper className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3">Edit your Product</Typography>
        <Box className={styles.form}>
          <Box className={styles.product_name}>
            <Typography>Product Name</Typography>
            <Input
              placeholder="Product Name"
              type="text"
              name="product_name"
              register={register}
            />
            {errors.product_name && (
              <FormHelperText error>
                {errors.product_name.message}
              </FormHelperText>
            )}
          </Box>

          <Box className={styles.product_category}>
            <Typography>Product category</Typography>
            <Input
              placeholder="Product category"
              type="text"
              name="product_category"
              register={register}
            />
            {errors.product_category && (
              <FormHelperText error>
                {errors.product_category.message}
              </FormHelperText>
            )}
          </Box>

          <Box className={styles.price}>
            <Typography>Product Price</Typography>
            <Input
              placeholder="Product Price"
              type="number"
              name="price"
              register={register}
            />
            {errors.price && (
              <FormHelperText error>{errors.price.message}</FormHelperText>
            )}
          </Box>
          <Box className={styles.description}>
            <Typography>Description</Typography>
            <TextField
              multiline
              rows={4}
              fullWidth
              placeholder="Enter Your product description"
              {...register("description")}
            />
            {errors.description && (
              <FormHelperText error>
                {errors.description.message}
              </FormHelperText>
            )}
          </Box>
          <Box className={styles.image}>
            <Box
              component="img"
              src={watch().Image || placeholder_image}
              height={200}
              width={200}
              className={styles.image}
            />
            <input type="text" hidden {...register("Image")} />
            <Box>
              <CloudinaryUploader setValue={setValue} />
            </Box>
          </Box>
        </Box>
        <Box   className={styles.buttons}>
          <Button type="submit" variant="contained" className={styles.button}>
            Submit
          </Button>
          <Button
            type="button"
            variant="contained"
            className={styles.button}
            onClick={handleClose}
          >
            Decline
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
