"use client";

import { useState } from "react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Loader2, Pencil, Trash2, ExternalLink, Github } from "lucide-react";

interface ProductItemProps {
  product: Doc<"products">;
}

export function ProductItem({ product }: ProductItemProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const removeProduct = useMutation(api.products.remove);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      await removeProduct({ id: product._id });
      setIsDeleteOpen(false);
    } catch {
      // 삭제 실패 시 다이얼로그 유지
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative shrink-0 w-24 h-16 rounded-md overflow-hidden bg-muted border border-border">
              <Image
                src={product.imageUrl}
                alt={`${product.title} 썸네일`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {product.title}
                    </h3>
                    <span
                      className={`shrink-0 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        product.status === "active"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {product.status === "active" ? "운영 중" : "종료"}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  {product.techDescription && (
                    <p className="mt-1 text-xs text-muted-foreground/70 line-clamp-1">
                      {product.techDescription}
                    </p>
                  )}
                  <div className="mt-2 flex items-center gap-3">
                    {product.serviceUrl && (
                      <a
                        href={product.serviceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`${product.title} 서비스 링크`}
                      >
                        <ExternalLink className="h-3 w-3" />
                        서비스
                      </a>
                    )}
                    {product.githubUrl && (
                      <a
                        href={product.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={`${product.title} GitHub 링크`}
                      >
                        <Github className="h-3 w-3" />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsEditOpen(true)}
                    aria-label={`${product.title} 수정`}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDeleteOpen(true)}
                    aria-label={`${product.title} 삭제`}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProductForm
        open={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        product={product}
      />

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="bg-card border-border sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground">프로덕트 삭제</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              <span className="font-medium text-foreground">{product.title}</span>을(를) 삭제하시겠습니까?
              이 작업은 되돌릴 수 없습니다.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              disabled={isDeleting}
              className="border-border text-foreground hover:bg-muted"
            >
              취소
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  삭제 중...
                </>
              ) : (
                "삭제"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
