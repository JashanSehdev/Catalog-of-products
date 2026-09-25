"use client";
import { Box, Button } from "@mui/material";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/auth-slice/manage-auth/auth.action";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const logo =
  "https://imgs.search.brave.com/zqyLQBZFkb1HNYjPVbPg2WJHR87KsvdxmdmQ0jyqqC0/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9icmFu/ZGxvZ29zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNS8w/Ni9DYXJ0ZXJzLWxv/Z28tNTEyeDE3Ni5w/bmc";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter()
    // function check() {
    //     const cookie = getCookie("access_token");
    //     console.log("Cookie from layout", cookie);
    //     if (!cookie) router.replace('/login')
    //   }

  return (
    <Box className={styles.container}>
      <Box className={styles.sub_container}>
        <Box component={"img"} src={logo} width={150} />

        { user ? <Box className={styles.buttons}>
          <Link href={"/"} className={styles.link}>
            <Button color="primary" variant="contained">
              Home
            </Button>
          </Link>
          {user?.role === "seller" && (
            <Link href={"/add-product"} className={styles.link}>
              <Button variant="contained">Add a Product</Button>
            </Link>
          )}

             <Button
            variant="contained"
            onClick={async() => {
              await dispatch(logoutUser());
              // check();
            }}
          >
            Logout
          </Button>

         
        </Box> : <Box></Box>}
      </Box>
    </Box>
  );
}
