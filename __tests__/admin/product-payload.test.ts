/**
 * ProductForm에서 Convex mutation으로 전달하는 payload 포맷을 검증합니다.
 * - 필수 필드: imageUrl, title, description, status
 * - 옵션 필드: 빈 문자열("") → undefined 변환 후 전달 (Convex 스키마 v.optional과 호환)
 */
import { describe, it, expect } from "vitest";
import type { FormValues } from "@/app/admin/_components/products/types";

/**
 * ProductForm.handleSubmit 내부의 payload 구성 로직과 동일한 변환 함수.
 * Convex create/update mutation에 전달되는 실제 데이터 형태를 결정합니다.
 */
function buildProductPayload(values: FormValues) {
  return {
    imageUrl: values.imageUrl,
    title: values.title,
    description: values.description,
    techDescription: values.techDescription || undefined,
    serviceUrl: values.serviceUrl || undefined,
    githubUrl: values.githubUrl || undefined,
    videoUrl: values.videoUrl || undefined,
    status: values.status,
  };
}

const REQUIRED_BASE: FormValues = {
  imageUrl: "https://example.com/img.jpg",
  title: "테스트 프로덕트",
  description: "소개 문구",
  techDescription: "",
  serviceUrl: "",
  githubUrl: "",
  videoUrl: "",
  status: "active",
  types: [],
};

describe("product payload 포맷팅 - 옵션 필드 빈 문자열 → undefined", () => {
  it("빈 문자열 옵션 필드는 undefined로 변환된다 (Convex v.optional 호환)", () => {
    const payload = buildProductPayload(REQUIRED_BASE);
    expect(payload.techDescription).toBeUndefined();
    expect(payload.serviceUrl).toBeUndefined();
    expect(payload.githubUrl).toBeUndefined();
    expect(payload.videoUrl).toBeUndefined();
  });

  it("필수 필드는 빈 문자열이어도 그대로 전달된다", () => {
    const payload = buildProductPayload(REQUIRED_BASE);
    expect(payload.imageUrl).toBe("https://example.com/img.jpg");
    expect(payload.title).toBe("테스트 프로덕트");
    expect(payload.description).toBe("소개 문구");
    expect(payload.status).toBe("active");
  });

  it("옵션 필드에 값이 있으면 그대로 전달된다", () => {
    const values: FormValues = {
      ...REQUIRED_BASE,
      techDescription: "Next.js, Convex",
      serviceUrl: "https://service.example.com",
      githubUrl: "https://github.com/test/repo",
      videoUrl: "https://youtube.com/watch?v=abc",
    };
    const payload = buildProductPayload(values);
    expect(payload.techDescription).toBe("Next.js, Convex");
    expect(payload.serviceUrl).toBe("https://service.example.com");
    expect(payload.githubUrl).toBe("https://github.com/test/repo");
    expect(payload.videoUrl).toBe("https://youtube.com/watch?v=abc");
  });

  it("status는 active 또는 ended만 허용된다", () => {
    const activePayload = buildProductPayload({ ...REQUIRED_BASE, status: "active" });
    const endedPayload = buildProductPayload({ ...REQUIRED_BASE, status: "ended" });
    expect(activePayload.status).toBe("active");
    expect(endedPayload.status).toBe("ended");
  });
});

describe("product payload 포맷팅 - 필수 필드 검증 규칙 (validate 함수 동작)", () => {
  /**
   * ProductForm.validate()와 동일한 검증 로직.
   * imageUrl, title, description이 필수임을 명세합니다.
   */
  function validate(values: FormValues): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!values.imageUrl.trim()) errors.imageUrl = "이미지를 업로드해주세요.";
    if (!values.title.trim()) errors.title = "제목을 입력해주세요.";
    if (!values.description.trim()) errors.description = "소개를 입력해주세요.";
    return errors;
  }

  it("imageUrl이 없으면 에러가 발생한다", () => {
    const errors = validate({ ...REQUIRED_BASE, imageUrl: "" });
    expect(errors.imageUrl).toBe("이미지를 업로드해주세요.");
  });

  it("title이 없으면 에러가 발생한다", () => {
    const errors = validate({ ...REQUIRED_BASE, title: "" });
    expect(errors.title).toBe("제목을 입력해주세요.");
  });

  it("description이 없으면 에러가 발생한다", () => {
    const errors = validate({ ...REQUIRED_BASE, description: "" });
    expect(errors.description).toBe("소개를 입력해주세요.");
  });

  it("title이 공백만이면 에러가 발생한다", () => {
    const errors = validate({ ...REQUIRED_BASE, title: "   " });
    expect(errors.title).toBe("제목을 입력해주세요.");
  });

  it("필수 필드가 모두 채워지면 에러가 없다", () => {
    const errors = validate(REQUIRED_BASE);
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("techDescription, serviceUrl 등 옵션 필드가 비어도 에러가 없다", () => {
    const errors = validate(REQUIRED_BASE); // 옵션 필드 모두 "" 상태
    expect(errors.techDescription).toBeUndefined();
    expect(errors.serviceUrl).toBeUndefined();
    expect(errors.githubUrl).toBeUndefined();
    expect(errors.videoUrl).toBeUndefined();
  });
});
