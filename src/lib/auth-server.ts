import { cookies } from "next/headers";
import { getUserBySession, type UserRecord } from "@/lib/server-store";

export async function getCurrentUser() {
  const token = (await cookies()).get("snt_session")?.value;
  return getUserBySession(token);
}

export async function requireUser(role?: UserRecord["role"]) {
  const user = await getCurrentUser();
  if (!user || (role && user.role !== role)) {
    return null;
  }
  return user;
}
