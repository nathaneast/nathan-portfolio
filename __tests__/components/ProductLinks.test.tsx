import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductLinks from "@/app/_components/home/ProductLinks";

describe("ProductLinks", () => {
  it("링크가 없으면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<ProductLinks />);
    expect(container.firstChild).toBeNull();
  });

  it("serviceUrl이 있으면 서비스 링크를 표시한다", () => {
    render(<ProductLinks serviceUrl="https://example.com" />);
    expect(screen.getByText("서비스")).toBeInTheDocument();
  });

  it("githubUrl이 있으면 GitHub 링크를 표시한다", () => {
    render(<ProductLinks githubUrl="https://github.com/test" />);
    expect(screen.getByText("GitHub")).toBeInTheDocument();
  });

  it("videoUrl이 있으면 영상 링크를 표시한다", () => {
    render(<ProductLinks videoUrl="https://youtube.com/watch?v=1" />);
    expect(screen.getByText("영상")).toBeInTheDocument();
  });
});
