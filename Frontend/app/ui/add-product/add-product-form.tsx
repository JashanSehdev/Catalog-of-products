"use client";
import { Box, Button, FormControlLabel, FormHelperText, Paper, Switch, TextField, Typography } from "@mui/material";
import styles from "./add-product-form.module.css";
import Input from "./inputs/inputs";
import { useForm } from "react-hook-form";
import { FormData, Product_Schema } from "./add-product-type";
import CloudinaryUploader from "../upload-widget/upload-widget";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { post_product } from "@/features/products-slice/list-product/product.action";
import { Post_product } from "@/type/product.type";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const placeholder_image =
  "https://imgs.search.brave.com/xY8ksS3Ai6-aEMTwKRioZFbCjs6R6vY3-36v42As0-E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9wbGFj/ZWhvbGQubmV0L2J1/aWxkaW5nLnN2Zw";

export default function AddProductForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  console.log(user);
  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Product_Schema),
  });

  const onSubmit = async (data: FormData) => {
    if(!user) return
    const product: Post_product = {
      product_name: data.product_name,
      product_category: data.product_category,
      Image: data.Image,
      description: data.description,
      price: data.price,
      publisher : user.id,
      hidden : data.hidden
    };
    dispatch(post_product(product));

    router.replace("/");
  };

  console.log(watch());
  return (
    <Paper className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h3" className={styles.title}>Add Your Product</Typography>
        <Box className={styles.form}>
          <Box className={styles.product_name}>
            <Typography>Product Name</Typography>
            <Input placeholder="Product Name" type="text" name="product_name" register={register} />
            {errors.product_name && (
              <FormHelperText error>{errors.product_name.message}</FormHelperText>
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
              <FormHelperText error>{errors.product_category.message}</FormHelperText>
            )}
          </Box>

          <Box className={styles.price}>
            <Typography>Product Price</Typography>
            <Input placeholder="Product Price" type="number" name="price" register={register} />
            {errors.price && <FormHelperText error>{errors.price.message}</FormHelperText>}
          </Box>

          <Box>
            <FormControlLabel className={styles.switch} {...register('hidden')} control={<Switch defaultChecked />} label="public" />
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
              <FormHelperText error>{errors.description.message}</FormHelperText>
            )}
          </Box>
          <Box className={styles.image}>
            <Box
              component="img"
              src={watch().Image || placeholder_image}
              height={150}
              width={150}
            />
            <input type="text" hidden {...register("Image")} />
            <Box>
              <CloudinaryUploader setValue={setValue} />
            </Box>
            {errors.Image && <FormHelperText error>{errors.Image.message}</FormHelperText>}
          </Box>
        </Box>
        <Box className={styles.buttons}>
          <Button type="submit"variant="contained" className={styles.button}>
            Publish
          </Button>
          <Button
            type="button"
            className={styles.button}
            onClick={() => {
              router.replace("/");
            }}
            variant="contained"
          >
            Decline
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
