import { describe, it, expect, afterEach } from "vitest";
import { getSiteUrl } from "@/lib/site";

describe("getSiteUrl", () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    delete process.env.VERCEL_URL;
  });

  it("NEXT_PUBLIC_SITE_URL이 설정되면 해당 값을 반환한다", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://nathan.me";
    expect(getSiteUrl()).toBe("https://nathan.me");
  });

  it("VERCEL_URL만 설정되면 https://를 붙여 반환한다", () => {
    process.env.VERCEL_URL = "my-app.vercel.app";
    expect(getSiteUrl()).toBe("https://my-app.vercel.app");
  });

  it("환경변수가 없으면 localhost:3000을 반환한다", () => {
    expect(getSiteUrl()).toBe("http://localhost:3000");
  });

  it("NEXT_PUBLIC_SITE_URL이 VERCEL_URL보다 우선한다", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://nathan.me";
    process.env.VERCEL_URL = "fallback.vercel.app";
    expect(getSiteUrl()).toBe("https://nathan.me");
  });
});
