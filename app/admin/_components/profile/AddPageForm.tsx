"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { type PageIcon, PAGE_ICON_OPTIONS } from "./types";

interface PageFormState {
  icon: PageIcon;
  name: string;
  url: string;
  description: string;
  order: number;
}

interface AddPageFormProps {
  form: PageFormState;
  isSaving: boolean;
  onChange: (updates: Partial<PageFormState>) => void;
  onAdd: () => void;
  onCancel: () => void;
}

export function AddPageForm({ form, isSaving, onChange, onAdd, onCancel }: AddPageFormProps) {
  return (
    <div className="border border-border rounded-lg bg-background p-4 space-y-3">
      <p className="text-sm font-medium text-foreground">새 페이지 추가</p>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-sm text-muted-foreground">아이콘</Label>
          <select
            value={form.icon}
            onChange={(e) => onChange({ icon: e.target.value as PageIcon })}
            className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="새 페이지 아이콘 선택"
          >
            {PAGE_ICON_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <Label className="text-sm text-muted-foreground">이름 *</Label>
          <Input
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="페이지 이름"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">URL *</Label>
        <Input
          value={form.url}
          onChange={(e) => onChange({ url: e.target.value })}
          placeholder="https://"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-sm text-muted-foreground">설명</Label>
        <Input
          value={form.description}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder="간단한 설명"
          className="bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-muted-foreground"
        >
          취소
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onAdd}
          disabled={isSaving || !form.name.trim() || !form.url.trim()}
          className="min-w-[80px]"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              추가 중
            </>
          ) : (
            "추가"
          )}
        </Button>
      </div>
    </div>
  );
}
