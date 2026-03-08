"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Loader2, X } from "lucide-react";

interface StoragePreviewProps {
  storageId: Id<"_storage">;
  onResolved: (url: string) => void;
  onRemove: () => void;
}

export function StoragePreview({ storageId, onResolved, onRemove }: StoragePreviewProps) {
  const url = useQuery(api.files.getUrlByStorageId, { storageId });
  const resolvedRef = useRef(false);

  useEffect(() => {
    if (url && !resolvedRef.current) {
      resolvedRef.current = true;
      onResolved(url);
    }
  }, [url, onResolved]);

  if (!url) {
    return (
      <div className="flex items-center justify-center w-full aspect-video max-w-xs rounded-lg border border-border bg-muted">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video max-w-xs rounded-lg overflow-hidden border border-border bg-muted">
      <Image
        src={url}
        alt="프로덕트 이미지 미리보기"
        fill
        sizes="(max-width: 320px) 100vw, 320px"
        className="object-contain"
      />
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 rounded-full bg-background/80 p-1 text-foreground hover:bg-background transition-colors"
        aria-label="이미지 제거"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
