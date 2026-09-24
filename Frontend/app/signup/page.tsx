'use client'
import { Box } from "@mui/material";
import Signup from "../ui/signup/signup";
import SignUpForm from "../ui/signup/signup-form/signup-form";
import { useRouter } from "next/navigation";
import { useAppSelector } from "../hooks";
import { useEffect } from "react";

export default function SignupPage () {
    // const user = useAppSelector((state) => state.auth.user)
    //   console.log(user)
    //     const router = useRouter();
    //     useEffect(()=>{
    //       if (user) {
    //         router.replace('/')
    //       }
    //     },[user])
    return(
        <Box>
            <SignUpForm/>
        </Box>
    )
}