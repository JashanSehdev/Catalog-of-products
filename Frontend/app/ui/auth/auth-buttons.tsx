'use client'
import Image from "next/image";
import googleLogo from '@/public/google.png'
import styles from './auth-button.module.css'
import { handleGoogleLogin } from "@/actions/auth-actions";
import { useAppDispatch } from "@/app/hooks";
import { setUser } from "@/features/auth-slice/auth.slice";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { email } from "zod";
import { googleLogin } from "@/features/auth-slice/manage-auth/auth.action";

export function GoogleAuthButton() {
  const dispatch= useAppDispatch();
  const router = useRouter()
  const handleLogin = async () => {
    const user_data = await handleGoogleLogin()
    if (!user_data.id || !user_data.email || !user_data.username) return;
    const user = {
      username: user_data.username ?? 'username',
      email :user_data.email ?? 'anything@gmail.com'
    }
    dispatch(googleLogin(user))
    router.replace('/')
  }
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
    )
}


