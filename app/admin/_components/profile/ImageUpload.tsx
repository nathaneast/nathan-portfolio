"use client";

import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  currentImageUrl: string;
  onUpload: (imageUrl: string) => void;
}

interface StorageUrlResolverProps {
  storageId: Id<"_storage">;
  onResolved: (url: string) => void;
}

function StorageUrlResolver({ storageId, onResolved }: StorageUrlResolverProps) {
  const url = useQuery(api.files.getUrlByStorageId, { storageId });

  useEffect(() => {
    if (url) {
      onResolved(url);
    }
  }, [url, onResolved]);

  return null;
}

export default function ImageUpload({
  currentImageUrl,
  onUpload,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(currentImageUrl);
  const [pendingStorageId, setPendingStorageId] =
    useState<Id<"_storage"> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const handleResolved = (url: string) => {
    onUpload(url);
    setPendingStorageId(null);
    setIsUploading(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);
    setIsUploading(true);

    try {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("업로드 실패");

      const { storageId } = (await result.json()) as { storageId: string };
      setPendingStorageId(storageId as Id<"_storage">);
    } catch {
      setPreviewUrl(currentImageUrl);
      setIsUploading(false);
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {pendingStorageId && (
        <StorageUrlResolver
          storageId={pendingStorageId}
          onResolved={handleResolved}
        />
      )}

      <div className="relative w-28 h-28 rounded-full overflow-hidden border border-border bg-muted">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="프로필 이미지"
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
            이미지 없음
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
            <Loader2 className="w-6 h-6 animate-spin text-foreground" />
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-label="프로필 이미지 업로드"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        className="border-border text-foreground"
      >
        <Upload className="w-4 h-4 mr-2" />
        {isUploading ? "업로드 중..." : "이미지 변경"}
      </Button>
    </div>
  );
}
