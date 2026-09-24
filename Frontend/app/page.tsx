"use client";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect, useLayoutEffect } from "react";
import { fetch_all_products } from "@/features/products-slice/list-product/product.action";
import MediaCard from "./ui/product-card/product-card";
import styles from "./home.module.css";
import { useRouter } from "next/navigation";
import * as jwt from 'jsonwebtoken'

export default function Home() {
  const products = useAppSelector((state) => state.product.products);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const decodeJWT = async() => {
    const allCookies = document.cookie.split(';');

    for (const cookie of allCookies) {
      const individual_cookie = cookie.trim()
      if (individual_cookie.startsWith('access_token=')){
        const token = individual_cookie.substring('access_token='.length)
        console.log("token",token)
        const data =  jwt.decode(token);
        console.log("data-json", data)
        localStorage.setItem('user', JSON.stringify(data))

      }
    }

  };


  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/login");
  //   }
  // }, [user]);

  useEffect(() => {
    dispatch(fetch_all_products());
    decodeJWT();
  }, []);

  // put jwt token in localstorage

  return (
    <Box>

      <Typography variant="h2" className={styles.title}>This is new only for you</Typography>
      <Box className={styles.product_list}>
        {products.map((item) => (
          <MediaCard key={item.id} product={item} />
        ))}
      </Box>
    </Box>
  );
}
