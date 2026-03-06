"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle, Plus, Trash2 } from "lucide-react";

type SnsType = "threads" | "x" | "linkedin" | "github" | "email";

interface SnsLink {
  type: SnsType;
  url: string;
}

type SaveStatus = "idle" | "saving" | "saved";

const SNS_OPTIONS: { value: SnsType; label: string }[] = [
  { value: "threads", label: "Threads" },
  { value: "x", label: "X (Twitter)" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "github", label: "GitHub" },
  { value: "email", label: "Email" },
];

export default function SnsLinksSection() {
  const profile = useQuery(api.profile.get);
  const upsert = useMutation(api.profile.upsert);

  const [links, setLinks] = useState<SnsLink[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    if (profile) {
      setLinks(profile.snsLinks as SnsLink[]);
    }
  }, [profile]);

  const usedTypes = links.map((l) => l.type);
  const availableTypes = SNS_OPTIONS.filter(
    (opt) => !usedTypes.includes(opt.value)
  );

  const handleAdd = () => {
    if (availableTypes.length === 0) return;
    setLinks((prev) => [
      ...prev,
      { type: availableTypes[0].value, url: "" },
    ]);
  };

  const handleTypeChange = (index: number, newType: SnsType) => {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, type: newType } : link))
    );
  };

  const handleUrlChange = (index: number, url: string) => {
    setLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, url } : link))
    );
  };

  const handleRemove = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await upsert({ snsLinks: links });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch {
      setSaveStatus("idle");
    }
  };

  if (profile === undefined) {
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
        <CardTitle className="text-foreground text-lg">SNS 링크</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          disabled={availableTypes.length === 0}
          className="border-border text-foreground"
        >
          <Plus className="w-4 h-4 mr-1" />
          추가
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {links.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            SNS 링크가 없습니다. 추가 버튼을 눌러 추가하세요.
          </p>
        )}

        {links.map((link, index) => {
          const selectableTypes = SNS_OPTIONS.filter(
            (opt) => !usedTypes.includes(opt.value) || opt.value === link.type
          );

          return (
            <div key={link.type} className="flex gap-2 items-end">
              <div className="space-y-1 w-36 shrink-0">
                <Label className="text-sm text-muted-foreground">플랫폼</Label>
                <select
                  value={link.type}
                  onChange={(e) =>
                    handleTypeChange(index, e.target.value as SnsType)
                  }
                  className="w-full h-9 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  aria-label="SNS 플랫폼 선택"
                >
                  {selectableTypes.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 space-y-1">
                <Label className="text-sm text-muted-foreground">URL</Label>
                <Input
                  value={link.url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder={
                    link.type === "email"
                      ? "example@email.com"
                      : "https://"
                  }
                  className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => handleRemove(index)}
                className="text-muted-foreground hover:text-destructive shrink-0"
                aria-label={`${link.type} 링크 삭제`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        })}

        <div className="flex items-center justify-end gap-3 pt-2">
          {saveStatus === "saved" && (
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4" />
              저장됨
            </span>
          )}
          <Button
            onClick={handleSave}
            disabled={saveStatus === "saving"}
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
      </CardContent>
    </Card>
  );
}
