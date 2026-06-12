"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_PASSWORD_STATUS } from "@/lib/admin-auth";
import { verifyAdminPasswordForLogin } from "./auth";

export type LoginActionState = {
  error: string | null;
};

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.trim() === "") {
    return { error: "비밀번호를 입력해주세요." };
  }

  const verification = await verifyAdminPasswordForLogin(password);

  switch (verification.status) {
    case ADMIN_PASSWORD_STATUS.Invalid:
      return { error: "비밀번호가 올바르지 않습니다." };
    case ADMIN_PASSWORD_STATUS.MissingConfig:
      return { error: "서버 설정 오류가 발생했습니다." };
    case ADMIN_PASSWORD_STATUS.Unavailable:
      return { error: "로그인 확인 중 오류가 발생했습니다." };
    case ADMIN_PASSWORD_STATUS.Valid:
      break;
    default:
      assertNever(verification);
  }

  const cookieStore = await cookies();
  cookieStore.set("admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    // maxAge 없음 = session cookie (브라우저 닫으면 삭제)
  });

  redirect("/admin");
}

function assertNever(value: never): never {
  throw new Error(
    `Unhandled admin password verification result: ${JSON.stringify(value)}`
  );
}
