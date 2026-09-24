'use client'
import { Box } from "@mui/material";
import LoginForm from "../ui/login-form/login-form";
import { useAppSelector } from "../hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const user = useAppSelector((state) => state.auth.user)
        console.log(user)
          const router = useRouter();
          useEffect(()=>{
            if (user) {
              router.replace('/')
            }
          },[user])
  return <Box>
    <LoginForm/>
  </Box>;
}
