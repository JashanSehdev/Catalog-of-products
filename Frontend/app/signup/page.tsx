"use client";
import { Box } from "@mui/material";
import SignUpForm from "../ui/signup/signup-form/signup-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie } from "cookies-next";

export default function SignupPage() {
  const router = useRouter();

  function check() {
    const cookie = getCookie("access_token");
    if (cookie) router.replace("/");
  }

  useEffect(() => {
    check();
  }, []);

  return (
    <Box>
      <SignUpForm />
    </Box>
  );
}
