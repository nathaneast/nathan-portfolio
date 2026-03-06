"use client";

import { useEffect, useState } from "react";
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
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ProductFormContent } from "./ProductFormContent";
import { type FormValues } from "./types";

interface ProductFormProps {
  open: boolean;
  onClose: () => void;
  product?: Doc<"products">;
}

function getInitialValues(product?: Doc<"products">): FormValues {
  return {
    imageUrl: product?.imageUrl ?? "",
    title: product?.title ?? "",
    description: product?.description ?? "",
    techDescription: product?.techDescription ?? "",
    serviceUrl: product?.serviceUrl ?? "",
    githubUrl: product?.githubUrl ?? "",
    videoUrl: product?.videoUrl ?? "",
    status: product?.status ?? "active",
    type: product?.type ?? "",
  };
}

export function ProductForm({ open, onClose, product }: ProductFormProps) {
  const [values, setValues] = useState<FormValues>(() => getInitialValues(product));
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);

  const isEditMode = Boolean(product);

  useEffect(() => {
    if (open) {
      setValues(getInitialValues(product));
      setErrors({});
      setFormKey((prev) => prev + 1);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleClose() {
    setValues(getInitialValues(product));
    setErrors({});
    onClose();
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.imageUrl.trim()) newErrors.imageUrl = "이미지를 업로드해주세요.";
    if (!values.title.trim()) newErrors.title = "제목을 입력해주세요.";
    if (!values.description.trim()) newErrors.description = "소개를 입력해주세요.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        imageUrl: values.imageUrl,
        title: values.title,
        description: values.description,
        techDescription: values.techDescription || undefined,
        serviceUrl: values.serviceUrl || undefined,
        githubUrl: values.githubUrl || undefined,
        videoUrl: values.videoUrl || undefined,
        status: values.status,
        type: values.type || undefined,
      };

      if (isEditMode && product) {
        await updateProduct({ id: product._id, ...payload });
      } else {
        await createProduct(payload);
      }
      handleClose();
    } catch {
      toast.error("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) handleClose(); }}>
      <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {isEditMode ? "프로덕트 수정" : "프로덕트 등록"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <ProductFormContent
            key={formKey}
            values={values}
            errors={errors}
            onChange={handleChange}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-border text-foreground hover:bg-muted"
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  저장 중...
                </>
              ) : isEditMode ? (
                "수정 완료"
              ) : (
                "등록"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
