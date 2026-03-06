"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { api } from "@/convex/_generated/api";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { fetchYoutubeThumbnail } from "@/lib/youtube";
import { type PageIcon, PAGE_ICON_OPTIONS } from "./types";

type SaveStatus = "idle" | "saving" | "saved";

interface PageItemRowProps {
  page: Doc<"personalPages">;
  onRemove: (id: Id<"personalPages">) => void;
}

export function PageItemRow({ page, onRemove }: PageItemRowProps) {
  const update = useMutation(api.personalPages.update);

  const [form, setForm] = useState<{ icon: PageIcon; name: string; url: string; description: string }>({
    icon: page.icon,
    name: page.name,
    url: page.url,
    description: page.description,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      let thumbnailUrl = page.thumbnailUrl;
      if (form.icon === "youtube" && form.url && form.url !== page.url) {
        thumbnailUrl = await fetchYoutubeThumbnail(form.url);
      }
      await update({ id: page._id, ...form, thumbnailUrl });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("idle");
      toast.error("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="border border-border rounded-lg bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          type="button"
          className="flex items-center gap-2 text-sm font-medium text-foreground flex-1 text-left"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
          {form.name || "이름 없음"}
        </button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onRemove(page._id)}
          className="text-muted-foreground hover:text-destructive shrink-0"
          aria-label={`${form.name} 삭제`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">아이콘</Label>
              <select
                value={form.icon}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, icon: e.target.value as PageIcon }))
                }
                className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="페이지 아이콘 선택"
              >
                {PAGE_ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <Label className="text-sm text-muted-foreground">이름</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="페이지 이름"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">URL</Label>
            <Input
              value={form.url}
              onChange={(e) => setForm((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="https://"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-sm text-muted-foreground">설명</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="간단한 설명"
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            {saveStatus === "saved" && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4" />
                저장됨
              </span>
            )}
            <Button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              size="sm"
              className="min-w-[80px]"
            >
              {saveStatus === "saving" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  저장 중
                </>
              ) : (
                "저장"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
