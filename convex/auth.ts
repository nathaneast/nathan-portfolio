import { action } from "./_generated/server";
import { v } from "convex/values";
import { ADMIN_PASSWORD_STATUS, type AdminPasswordVerification } from "../lib/admin-auth";

export const verifyAdminPassword = action({
  args: {
    password: v.string(),
  },
  handler: async (_ctx, args): Promise<AdminPasswordVerification> => {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable is not set in Convex");
      return { status: ADMIN_PASSWORD_STATUS.MissingConfig };
    }

    if (args.password !== adminPassword) {
      return { status: ADMIN_PASSWORD_STATUS.Invalid };
    }

    return { status: ADMIN_PASSWORD_STATUS.Valid };
  },
});
