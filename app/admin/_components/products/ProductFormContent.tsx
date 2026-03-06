"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "./ImageUpload";
import { type FormValues, PRODUCT_TYPE_OPTIONS } from "./types";

interface ProductFormContentProps {
  values: FormValues;
  errors: Partial<Record<keyof FormValues, string>>;
  onChange: (field: keyof FormValues, value: string) => void;
}

export function ProductFormContent({
  values,
  errors,
  onChange,
}: ProductFormContentProps) {
  return (
    <>
      <ImageUpload
        currentImageUrl={values.imageUrl || undefined}
        onImageUploaded={(url) => onChange("imageUrl", url)}
      />
      {errors.imageUrl && (
        <p role="alert" className="text-sm text-destructive -mt-3">
          {errors.imageUrl}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="product-title" className="text-foreground">
          제목 <span className="text-destructive">*</span>
        </Label>
        <Input
          id="product-title"
          value={values.title}
          onChange={(e) => onChange("title", e.target.value)}
          placeholder="프로덕트 제목"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? "title-error" : undefined}
        />
        {errors.title && (
          <p id="title-error" role="alert" className="text-sm text-destructive">
            {errors.title}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-description" className="text-foreground">
          소개 <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="product-description"
          value={values.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="프로덕트 소개를 입력하세요"
          rows={3}
          className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
          aria-invalid={Boolean(errors.description)}
          aria-describedby={errors.description ? "description-error" : undefined}
        />
        {errors.description && (
          <p id="description-error" role="alert" className="text-sm text-destructive">
            {errors.description}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-tech" className="text-foreground">
          기술 스택 설명
        </Label>
        <Textarea
          id="product-tech"
          value={values.techDescription}
          onChange={(e) => onChange("techDescription", e.target.value)}
          placeholder="사용한 기술 스택을 입력하세요 (선택)"
          rows={2}
          className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="product-type" className="text-foreground">
            플랫폼 타입
          </Label>
          <select
            id="product-type"
            value={values.type}
            onChange={(e) => onChange("type", e.target.value)}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">선택 안 함</option>
            {PRODUCT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product-status" className="text-foreground">
            서비스 상태
          </Label>
          <select
            id="product-status"
            value={values.status}
            onChange={(e) => onChange("status", e.target.value as "active" | "ended")}
            className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="active">운영 중</option>
            <option value="ended">종료</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-service-url" className="text-foreground">
          서비스 링크
        </Label>
        <Input
          id="product-service-url"
          type="url"
          value={values.serviceUrl}
          onChange={(e) => onChange("serviceUrl", e.target.value)}
          placeholder="https://example.com (선택)"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-github-url" className="text-foreground">
          GitHub 링크
        </Label>
        <Input
          id="product-github-url"
          type="url"
          value={values.githubUrl}
          onChange={(e) => onChange("githubUrl", e.target.value)}
          placeholder="https://github.com/... (선택)"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="product-video-url" className="text-foreground">
          소개 영상 링크
        </Label>
        <Input
          id="product-video-url"
          type="url"
          value={values.videoUrl}
          onChange={(e) => onChange("videoUrl", e.target.value)}
          placeholder="https://youtube.com/... (선택)"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

    </>
  );
}
