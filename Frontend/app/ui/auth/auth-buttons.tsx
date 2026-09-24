"use client";
import Image from "next/image";
import googleLogo from "@/public/google.png";
import styles from "./auth-button.module.css";
import { handleGoogleLogin } from "@/actions/auth-actions";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/auth-slice/auth.slice";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { email } from "zod";
import { googleLogin } from "@/features/auth-slice/manage-auth/auth.action";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function GoogleAuthButton() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogin = async () => {
    const user_data = await handleGoogleLogin();
    if (!user_data.id || !user_data.email || !user_data.username) return;
    const user = {
      username: user_data.username ?? "username",
      email: user_data.email ?? "anything@gmail.com",
    };
    dispatch(googleLogin(user));
    router.replace("/");
  };
  return (
    <button className={styles.button1} onClick={handleLogin}>
      <Image
        style={{ backgroundColor: "white", borderRadius: "100%" }}
        width={40}
        height={40}
        src={googleLogo}
        alt="google logo"
      />
      Continue with Google
    </button>
  );
}

type Input = {
  role : 'buyer' | 'seller'
}

export function GoogleAuthSignupButton() {
  const [role, setRole] = useState("seller");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogin = async () => {
    const user_data = await handleGoogleLogin();
    if (!user_data.id || !user_data.email || !user_data.username) return;
    const user = {
      username: user_data.username ?? "username",
      email: user_data.email ?? "anything@gmail.com",
      role
    };
    dispatch(googleLogin(user));
    router.replace("/");
  };

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<FormData>()

  
    const onSubmit = async (data: FormData) => {
      console.log(data);
      await handleLogin()
      handleClose()

    };
  
  return (
    <Box>
      <button className={styles.button1} onClick={handleOpen}>
        <Image
          style={{ backgroundColor: "white", borderRadius: "100%" }}
          width={40}
          height={40}
          src={googleLogo}
          alt="google logo"
        />
        Continue with Google
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            What is your Role?
          </Typography>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="Age"
                {...register("role")}
                onChange={handleChange}
              >
                <MenuItem value={"seller"}>seller</MenuItem>
                <MenuItem value={"buyer"}>buyer</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit">Create account</Button>
          </form>
      
        </Box>
      </Modal>
    </Box>
  );
}
