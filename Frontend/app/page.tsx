'use client'
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import { fetch_all_products } from "@/features/products-slice/list-product/product.action";
import MediaCard from "./ui/product-card/product-card";
import styles from './home.module.css'

export default function Home () {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  console.log(products)
  useEffect(() => {
    dispatch(fetch_all_products())
  },[])
  return(
    <Box>
      <Box className={styles.product_list}>
        {
          products.map((item) => <MediaCard key={item.id} product={item} />)
        }
      </Box>
        
    </Box>
  )
}