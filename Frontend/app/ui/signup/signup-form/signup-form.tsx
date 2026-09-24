"use client";
import { useForm } from "react-hook-form";
import { FormData, signUpSchema } from "./form-field/form-field.type";
import FormField from "./form-field/form-field";
import PasswordField from "./form-field/password-field";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./signup-form.module.css";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "@/app/hooks";
import { registerUser } from "@/features/auth-slice/manage-auth/auth.action";
import Link from "next/link";
import { GoogleAuthButton } from "../../auth/auth-buttons";

function SignUpForm() {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: FormData) => {
    console.log(data);
    const { confirmPassword, ...user } = data;
    dispatch(registerUser(user));
  };

  return (
    <Paper className={styles.root}>
      <Typography variant="h3"> Sign Up</Typography>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <FormField
          type="name"
          placeholder="Username"
          name="username"
          register={register}
          error={errors.username}
        />
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

        <PasswordField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
        />

        <Link href="/login">
          <Typography>Login</Typography>
        </Link>

        <button type="submit" className={styles.submit_button}>
          Submit
        </button>
      </form>
      <Divider />
      <GoogleAuthButton />
    </Paper>
  );
}

export default SignUpForm;
