import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    set: vi.fn(),
  }),
}));

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}));

import { loginAction } from "@/app/admin/login/actions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

describe("loginAction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    delete process.env.ADMIN_PASSWORD;
  });

  it("비밀번호가 비어있으면 에러를 반환한다", async () => {
    const formData = new FormData();
    formData.set("password", "");
    const result = await loginAction({ error: null }, formData);
    expect(result.error).toBe("비밀번호를 입력해주세요.");
  });

  it("비밀번호가 공백만이면 에러를 반환한다", async () => {
    const formData = new FormData();
    formData.set("password", "   ");
    const result = await loginAction({ error: null }, formData);
    expect(result.error).toBe("비밀번호를 입력해주세요.");
  });

  it("ADMIN_PASSWORD 환경변수가 없으면 서버 설정 오류를 반환한다", async () => {
    const formData = new FormData();
    formData.set("password", "somepassword");
    const result = await loginAction({ error: null }, formData);
    expect(result.error).toBe("서버 설정 오류가 발생했습니다.");
  });

  it("비밀번호가 틀리면 에러를 반환한다", async () => {
    process.env.ADMIN_PASSWORD = "correct-password";
    const formData = new FormData();
    formData.set("password", "wrong-password");
    const result = await loginAction({ error: null }, formData);
    expect(result.error).toBe("비밀번호가 올바르지 않습니다.");
  });

  it("비밀번호가 맞으면 세션 쿠키를 설정하고 /admin으로 리다이렉트한다", async () => {
    process.env.ADMIN_PASSWORD = "correct-password";
    const mockSet = vi.fn();
    vi.mocked(cookies).mockResolvedValue({ set: mockSet } as never);

    const formData = new FormData();
    formData.set("password", "correct-password");
    await loginAction({ error: null }, formData);

    expect(mockSet).toHaveBeenCalledWith(
      "admin_session",
      "authenticated",
      expect.objectContaining({
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      })
    );
    expect(redirect).toHaveBeenCalledWith("/admin");
  });
});
