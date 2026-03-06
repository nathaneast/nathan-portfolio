"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return { error: "서버 설정 오류가 발생했습니다." };
  }

  if (password !== adminPassword) {
    return { error: "비밀번호가 올바르지 않습니다." };
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
