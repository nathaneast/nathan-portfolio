"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { PageItemRow } from "./PageItemRow";
import { AddPageForm } from "./AddPageForm";
import { type PageIcon } from "./types";

interface PageFormState {
  icon: PageIcon;
  name: string;
  url: string;
  description: string;
  order: number;
}

type AddStatus = "idle" | "saving";

const DEFAULT_FORM: PageFormState = {
  icon: "website",
  name: "",
  url: "",
  description: "",
  order: 0,
};

export default function PersonalPagesSection() {
  const pages = useQuery(api.personalPages.list);
  const create = useMutation(api.personalPages.create);
  const remove = useMutation(api.personalPages.remove);

  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState<PageFormState>(DEFAULT_FORM);
  const [addStatus, setAddStatus] = useState<AddStatus>("idle");

  const handleFormChange = (updates: Partial<PageFormState>) => {
    setNewForm((prev) => ({ ...prev, ...updates }));
  };

  const handleAdd = async () => {
    if (!newForm.name.trim() || !newForm.url.trim()) return;
    setAddStatus("saving");
    try {
      const maxOrder = pages ? Math.max(0, ...pages.map((p) => p.order)) : 0;
      await create({ ...newForm, order: maxOrder + 1 });
      setNewForm(DEFAULT_FORM);
      setIsAdding(false);
    } catch {
      // 실패 시 폼 유지
    } finally {
      setAddStatus("idle");
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setNewForm(DEFAULT_FORM);
  };

  const handleRemove = async (id: Id<"personalPages">) => {
    await remove({ id });
  };

  if (pages === undefined) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="flex items-center justify-center py-10">
          <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-foreground text-lg">개인 페이지 링크</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsAdding(true)}
          disabled={isAdding}
          className="border-border text-foreground"
        >
          <Plus className="w-4 h-4 mr-1" />
          추가
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {isAdding && (
          <AddPageForm
            form={newForm}
            isSaving={addStatus === "saving"}
            onChange={handleFormChange}
            onAdd={handleAdd}
            onCancel={handleCancel}
          />
        )}

        {pages.length === 0 && !isAdding && (
          <p className="text-sm text-muted-foreground text-center py-4">
            개인 페이지가 없습니다. 추가 버튼을 눌러 추가하세요.
          </p>
        )}

        {pages.map((page) => (
          <PageItemRow
            key={page._id}
            page={page}
            onRemove={handleRemove}
          />
        ))}
      </CardContent>
    </Card>
  );
}
