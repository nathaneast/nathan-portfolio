"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ProductCard from "@/app/_components/home/ProductCard";

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
      toast.error("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="relative group">
        <ProductCard product={product} />
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsEditOpen(true)}
            aria-label={`${product.title} 수정`}
            className="h-8 w-8 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-foreground hover:bg-muted"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDeleteOpen(true)}
            aria-label={`${product.title} 삭제`}
            className="h-8 w-8 bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
