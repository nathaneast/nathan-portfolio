import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductStatusBadge from "@/app/_components/home/ProductStatusBadge";

describe("ProductStatusBadge", () => {
  it("active 상태에서는 아무것도 렌더링하지 않는다", () => {
    const { container } = render(<ProductStatusBadge status="active" />);
    expect(container.firstChild).toBeNull();
  });

  it("ended 상태에서는 종료 뱃지를 렌더링한다", () => {
    render(<ProductStatusBadge status="ended" />);
    expect(screen.getByText("서비스 종료")).toBeInTheDocument();
  });
});
