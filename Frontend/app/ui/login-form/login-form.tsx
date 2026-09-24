'use client'
import { useForm } from "react-hook-form";
import { FormData, signUpSchema } from './form-field/form-field.type';
import FormField from "./form-field/form-field";
import PasswordField from './form-field/password-field';
import { zodResolver } from "@hookform/resolvers/zod";
import styles from './login-form.module.css';
import { Divider, Paper, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginUser } from "@/features/auth-slice/manage-auth/auth.action";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { GoogleAuthButton } from "../auth/auth-buttons";


export default function LoginForm() {
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data)
    dispatch(loginUser(data))
  };

  return (
    <Paper className={styles.root}>
        <Typography variant="h3"> Login In </Typography>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
        />

        <PasswordField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
        />
        

        <Link href="/signup" color="secondary">
          <Typography>register</Typography>
        </Link>

        <button type="submit" className={styles.submit_button}>
          Submit
        </button>
      </form>

      <Divider />
      <GoogleAuthButton/>
    </Paper>
  );
}

