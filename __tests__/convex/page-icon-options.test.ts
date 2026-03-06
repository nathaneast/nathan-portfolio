/**
 * PAGE_ICON_OPTIONS (UI 선택지)가 pageIconValidator 스키마 값을 빠짐없이 커버하는지 검증합니다.
 * UI에서 선택 가능한 값이 곧 DB에 저장되는 값이므로, 불일치 시 런타임 에러가 발생할 수 있습니다.
 */
import { describe, it, expect } from "vitest";
import { pageIconValidator } from "@/convex/schema";
import {
  PAGE_ICON_OPTIONS,
  type PageIcon,
} from "@/app/admin/_components/profile/types";

function getUnionValues(validator: { members: { value: string }[] }): string[] {
  return validator.members.map((m) => m.value);
}

describe("PAGE_ICON_OPTIONS ↔ pageIconValidator 일치 검증", () => {
  const schemaValues = getUnionValues(pageIconValidator as never);
  const optionValues = PAGE_ICON_OPTIONS.map((opt) => opt.value);

  it("UI 옵션 개수가 스키마 값 개수와 같다", () => {
    expect(optionValues).toHaveLength(schemaValues.length);
  });

  it("UI 옵션의 모든 value가 스키마에 존재한다 (UI → DB 방향)", () => {
    for (const value of optionValues) {
      expect(schemaValues).toContain(value);
    }
  });

  it("스키마의 모든 값이 UI 옵션에 존재한다 (DB → UI 방향, 누락 없음)", () => {
    for (const value of schemaValues) {
      expect(optionValues).toContain(value);
    }
  });

  it("UI 옵션에 중복된 value가 없다", () => {
    const unique = new Set(optionValues);
    expect(unique.size).toBe(optionValues.length);
  });

  it("각 옵션은 label을 가진다", () => {
    for (const opt of PAGE_ICON_OPTIONS) {
      expect(opt.label).toBeTruthy();
    }
  });

  it("PageIcon 타입의 모든 값이 PAGE_ICON_OPTIONS에 존재한다", () => {
    const pageIconValues: PageIcon[] = [
      "youtube",
      "blog",
      "website",
      "newsletter",
      "podcast",
      "store",
      "other",
    ];
    for (const icon of pageIconValues) {
      expect(optionValues).toContain(icon);
    }
  });
});
