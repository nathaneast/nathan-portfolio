import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyAdminPasswordForLogin } from "@/app/admin/login/auth";
import type { AdminPasswordVerification } from "@/lib/admin-auth";

type ConvexVerifier = (password: string) => Promise<AdminPasswordVerification>;

describe("verifyAdminPasswordForLogin", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("로컬/테스트에서는 ADMIN_PASSWORD 환경변수를 우선 사용한다", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("ADMIN_PASSWORD", "local-password");
    let convexCallCount = 0;
    const verifyWithConvex: ConvexVerifier = async () => {
      convexCallCount += 1;
      return { status: "invalid" };
    };

    const result = await verifyAdminPasswordForLogin(
      "local-password",
      verifyWithConvex
    );

    expect(result).toEqual({ status: "valid" });
    expect(convexCallCount).toBe(0);
  });

  it("production에서는 Next env가 없어도 Convex ADMIN_PASSWORD 검증을 사용한다", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("ADMIN_PASSWORD", "");
    const verifyWithConvex: ConvexVerifier = async (password) => ({
      status: password === "prod-password" ? "valid" : "invalid",
    });

    const result = await verifyAdminPasswordForLogin(
      "prod-password",
      verifyWithConvex
    );

    expect(result).toEqual({ status: "valid" });
  });

  it("Convex ADMIN_PASSWORD가 없으면 설정 오류 상태를 반환한다", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const verifyWithConvex: ConvexVerifier = async () => ({
      status: "missing_config",
    });

    const result = await verifyAdminPasswordForLogin(
      "prod-password",
      verifyWithConvex
    );

    expect(result).toEqual({ status: "missing_config" });
  });
});
