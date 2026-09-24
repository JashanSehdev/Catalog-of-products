'use client'
import { Box, Button } from "@mui/material";
import styles from './navbar.module.css'
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/features/auth-slice/manage-auth/auth.action";
import { useAppDispatch } from "@/app/hooks";

const logo = 'https://imgs.search.brave.com/zqyLQBZFkb1HNYjPVbPg2WJHR87KsvdxmdmQ0jyqqC0/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9icmFu/ZGxvZ29zLm5ldC93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNS8w/Ni9DYXJ0ZXJzLWxv/Z28tNTEyeDE3Ni5w/bmc'

export default function Navbar () {
    const dispatch = useAppDispatch();
    return(
        <Box color="primary" className={styles.container}>
            <Box component={'img'} 
                src={logo}
                width={150}
            />

            <Box className={styles.buttons}>
                <Link href={'/'} className={styles.link}>
                    <Button>Home</Button>
                </Link>
                <Link href={'/add-product'} className={styles.link}>
                    <Button>Add a Product</Button>
                </Link>
                
            </Box>
            <Button onClick={() => {dispatch(logoutUser())}}>
                    Logout
                </Button>
        </Box>
    )
}