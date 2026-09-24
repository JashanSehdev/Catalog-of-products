'use server'
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase-admin";
import type { DecodedIdToken } from "firebase-admin/auth";
import { redirect } from "next/navigation";

export async function getSession(): Promise<DecodedIdToken | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return null;

  try {
    const decodedToken = await adminAuth.verifyIdToken(session, true);
    return decodedToken;
  } catch {
    return null;
  }
}

export async function verifySession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) redirect("/login");

  let decodedToken;

  try {
    decodedToken = await adminAuth.verifyIdToken(session, true);
  } catch {
    redirect("/login");
  }
}