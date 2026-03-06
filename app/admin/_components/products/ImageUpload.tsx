"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, X } from "lucide-react";
import { StoragePreview } from "./StoragePreview";

interface ImageUploadProps {
  currentImageUrl?: string;
  onImageUploaded: (imageUrl: string) => void;
}

export function ImageUpload({ currentImageUrl, onImageUploaded }: ImageUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(currentImageUrl);
  const [pendingStorageId, setPendingStorageId] = useState<Id<"_storage"> | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 업로드할 수 있습니다.");
      return;
    }

    setError(null);
    setIsUploading(true);
    setPreviewUrl(undefined);
    setPendingStorageId(null);

    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("업로드에 실패했습니다.");
      }

      const { storageId } = (await result.json()) as { storageId: string };
      setPendingStorageId(storageId as Id<"_storage">);
    } catch (err) {
      setError(err instanceof Error ? err.message : "업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }

  function handleRemove() {
    setPreviewUrl(undefined);
    setPendingStorageId(null);
    onImageUploaded("");
  }

  const handleStorageResolved = useCallback((url: string) => {
    setPreviewUrl(url);
    setPendingStorageId(null);
    onImageUploaded(url);
  }, [onImageUploaded]);

  const hasImage = Boolean(previewUrl || pendingStorageId);

  return (
    <div className="space-y-2">
      <Label className="text-foreground">이미지</Label>

      {pendingStorageId ? (
        <StoragePreview
          storageId={pendingStorageId}
          onResolved={handleStorageResolved}
          onRemove={handleRemove}
        />
      ) : previewUrl ? (
        <div className="relative w-full aspect-video max-w-xs rounded-lg overflow-hidden border border-border bg-muted">
          <Image
            src={previewUrl}
            alt="프로덕트 이미지 미리보기"
            fill
            sizes="(max-width: 320px) 100vw, 320px"
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-foreground hover:bg-background transition-colors"
            aria-label="이미지 제거"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="flex flex-col items-center justify-center w-full aspect-video max-w-xs rounded-lg border-2 border-dashed border-border bg-muted/30 hover:bg-muted/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          aria-label="이미지 업로드 영역 클릭"
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          ) : (
            <>
              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">클릭하여 이미지 업로드</p>
            </>
          )}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        aria-hidden="true"
      />

      {hasImage && !isUploading && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="border-border text-foreground hover:bg-muted"
        >
          <Upload className="mr-2 h-4 w-4" />
          이미지 교체
        </Button>
      )}

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
