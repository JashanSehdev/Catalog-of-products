'use client'

import { useAppDispatch } from "@/app/hooks";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { redirect } from "next/navigation";
import { SetStateAction, Dispatch } from "react";


export const createSession = async (idToken: string) => {
  const res = await fetch("/api/session", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to create session");
  }
};

export const handleGoogleLogin = async () => {

  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    await createSession(idToken);
    const data = {
      id : result.providerId,
      username : result.user.displayName,
      email : result.user.email
    }
    return data
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};

export const handleEmailLogin = async (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError?: Dispatch<SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);

    const result = await signInWithEmailAndPassword(auth, email, password);

    const idToken = await result.user.getIdToken();
    await createSession(idToken);

    redirect("/feed");
  } catch (error: any) {
    console.error(error);

    let message = "Login failed";

    if (error.code === "auth/user-not-found") {
      message = "User not found";
    } else if (error.code === "auth/invalid-credential") {
      message = "wrong password";
    } else if (error.code === "auth/invalid-email") {
      message = "invalid email format";
    }
    console.log(message);
  } finally {
    setLoading(false);
  }
};


