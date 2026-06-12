import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import {
  ADMIN_PASSWORD_STATUS,
  type AdminPasswordVerification,
} from "@/lib/admin-auth";
import { CONVEX_URL } from "@/lib/convex";

type ConvexAdminPasswordVerifier = (
  password: string
) => Promise<AdminPasswordVerification>;

export async function verifyAdminPasswordForLogin(
  password: string,
  verifyWithConvex: ConvexAdminPasswordVerifier = verifyAdminPasswordWithConvex
): Promise<AdminPasswordVerification> {
  const localPassword = process.env.ADMIN_PASSWORD;

  if (process.env.NODE_ENV !== "production") {
    if (!localPassword) {
      return { status: ADMIN_PASSWORD_STATUS.MissingConfig };
    }

    return {
      status:
        password === localPassword
          ? ADMIN_PASSWORD_STATUS.Valid
          : ADMIN_PASSWORD_STATUS.Invalid,
    };
  }

  return await verifyWithConvex(password);
}

async function verifyAdminPasswordWithConvex(
  password: string
): Promise<AdminPasswordVerification> {
  const client = new ConvexHttpClient(CONVEX_URL, { logger: false });

  try {
    return await client.action(api.auth.verifyAdminPassword, { password });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown Convex verification error";
    console.error("Failed to verify admin password with Convex:", message);
    return { status: ADMIN_PASSWORD_STATUS.Unavailable };
  }
}
