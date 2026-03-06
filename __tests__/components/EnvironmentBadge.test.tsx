import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import EnvironmentBadge from "@/app/_components/EnvironmentBadge";

/**
 * 컴포넌트가 읽는 env 키: NEXT_PUBLIC_APP_ENV
 * 실제 설정 파일:
 *   - .env.local  → NEXT_PUBLIC_APP_ENV=local
 *   - Vercel dev  → NEXT_PUBLIC_APP_ENV=dev (Vercel 환경변수)
 */
const ENV_KEY = "NEXT_PUBLIC_APP_ENV";

describe("EnvironmentBadge", () => {
  afterEach(() => {
    delete process.env[ENV_KEY];
  });

  it("local 환경에서는 LOCAL 뱃지를 표시한다", () => {
    process.env[ENV_KEY] = "local";
    render(<EnvironmentBadge />);
    expect(screen.getByText("LOCAL")).toBeInTheDocument();
  });

  it("dev 환경에서는 DEV 뱃지를 표시한다", () => {
    process.env[ENV_KEY] = "dev";
    render(<EnvironmentBadge />);
    expect(screen.getByText("DEV")).toBeInTheDocument();
  });

  it("production 환경은 설정에 없으므로 뱃지를 표시하지 않는다", () => {
    process.env[ENV_KEY] = "production";
    const { container } = render(<EnvironmentBadge />);
    expect(container.firstChild).toBeNull();
  });

  it("env 변수가 없으면 뱃지를 표시하지 않는다", () => {
    const { container } = render(<EnvironmentBadge />);
    expect(container.firstChild).toBeNull();
  });
});
