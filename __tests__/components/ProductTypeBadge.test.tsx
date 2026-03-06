import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductTypeBadge from "@/app/_components/home/ProductTypeBadge";

describe("ProductTypeBadge", () => {
  it("types가 없으면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<ProductTypeBadge types={undefined} />);
    expect(container.firstChild).toBeNull();
  });

  it("빈 배열이면 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<ProductTypeBadge types={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("web → '웹' 표시", () => {
    render(<ProductTypeBadge types={["web"]} />);
    expect(screen.getByText("웹")).toBeInTheDocument();
  });

  it("app → '앱' 표시", () => {
    render(<ProductTypeBadge types={["app"]} />);
    expect(screen.getByText("앱")).toBeInTheDocument();
  });

  it("toss-inapp → '토스인앱' 표시", () => {
    render(<ProductTypeBadge types={["toss-inapp"]} />);
    expect(screen.getByText("토스인앱")).toBeInTheDocument();
  });

  it("desktop → '데스크탑' 표시", () => {
    render(<ProductTypeBadge types={["desktop"]} />);
    expect(screen.getByText("데스크탑")).toBeInTheDocument();
  });

  it("복수 타입 모두 표시", () => {
    render(<ProductTypeBadge types={["web", "app"]} />);
    expect(screen.getByText("웹")).toBeInTheDocument();
    expect(screen.getByText("앱")).toBeInTheDocument();
  });
});
