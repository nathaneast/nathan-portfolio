/**
 * Convex 스키마 validators의 허용 값을 검증합니다.
 * 스키마가 변경될 경우 이 테스트가 회귀(regression)를 잡아줍니다.
 */
import { describe, it, expect } from "vitest";
import {
  snsTypeValidator,
  pageIconValidator,
  productStatusValidator,
  productTypeValidator,
} from "@/convex/schema";

function getUnionValues(validator: { members: { value: string }[] }): string[] {
  return validator.members.map((m) => m.value);
}

describe("snsTypeValidator", () => {
  it("허용된 SNS 타입 5개를 정확히 포함한다", () => {
    const values = getUnionValues(snsTypeValidator as never);
    expect(values).toEqual(
      expect.arrayContaining(["threads", "x", "linkedin", "github", "email"])
    );
    expect(values).toHaveLength(5);
  });
});

describe("pageIconValidator", () => {
  it("허용된 페이지 아이콘 타입 7개를 정확히 포함한다", () => {
    const values = getUnionValues(pageIconValidator as never);
    expect(values).toEqual(
      expect.arrayContaining([
        "youtube",
        "blog",
        "website",
        "newsletter",
        "podcast",
        "store",
        "other",
      ])
    );
    expect(values).toHaveLength(7);
  });
});

describe("productStatusValidator", () => {
  it("허용된 상태값 2개(active, ended)만 포함한다", () => {
    const values = getUnionValues(productStatusValidator as never);
    expect(values).toEqual(expect.arrayContaining(["active", "ended"]));
    expect(values).toHaveLength(2);
  });
});

describe("productTypeValidator", () => {
  it("허용된 플랫폼 타입 4개를 정확히 포함한다", () => {
    const values = getUnionValues(productTypeValidator as never);
    expect(values).toEqual(
      expect.arrayContaining(["web", "app", "toss-inapp", "desktop"])
    );
    expect(values).toHaveLength(4);
  });
});
