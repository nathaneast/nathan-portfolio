import { describe, it, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import EnvironmentBadge from "@/app/_components/EnvironmentBadge";

/**
 * NEXT_PUBLIC_APP_ENV 규칙:
 * - local: 로컬 개발 (LOCAL 노란 뱃지)
 * - dev: 개발 서버 (DEV 초록 뱃지)
 * - prod: 운영 환경 (뱃지 없음)
 */
const PUBLIC_ENV_KEY = "NEXT_PUBLIC_APP_ENV";

describe("EnvironmentBadge", () => {
  afterEach(() => {
    delete process.env[PUBLIC_ENV_KEY];
  });

  it("NEXT_PUBLIC_APP_ENV=dev면 DEV 뱃지를 표시한다", () => {
    process.env[PUBLIC_ENV_KEY] = "dev";
    render(<EnvironmentBadge />);
    expect(screen.getByText("DEV")).toBeInTheDocument();
  });

  it("NEXT_PUBLIC_APP_ENV에 공백이나 개행이 섞여도 DEV 뱃지를 표시한다", () => {
    process.env[PUBLIC_ENV_KEY] = " dev\n";
    render(<EnvironmentBadge />);
    expect(screen.getByText("DEV")).toBeInTheDocument();
  });

  it("NEXT_PUBLIC_APP_ENV=local이면 LOCAL 뱃지를 표시한다", () => {
    process.env[PUBLIC_ENV_KEY] = "local";
    render(<EnvironmentBadge />);
    expect(screen.getByText("LOCAL")).toBeInTheDocument();
  });

  it("NEXT_PUBLIC_APP_ENV=prod면 뱃지를 표시하지 않는다", () => {
    process.env[PUBLIC_ENV_KEY] = "prod";
    const { container } = render(<EnvironmentBadge />);
    expect(container.firstChild).toBeNull();
  });

  it("env 변수가 없으면 뱃지를 표시하지 않는다", () => {
    const { container } = render(<EnvironmentBadge />);
    expect(container.firstChild).toBeNull();
  });
});
