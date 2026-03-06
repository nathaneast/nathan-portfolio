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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle } from "lucide-react";
import ImageUpload from "./ImageUpload";

type SaveStatus = "idle" | "saving" | "saved";

export default function ProfileSection() {
  const profile = useQuery(api.profile.get);
  const upsert = useMutation(api.profile.upsert);

  const [imageUrl, setImageUrl] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");

  useEffect(() => {
    if (profile) {
      setImageUrl(profile.imageUrl);
      setIntroduction(profile.introduction);
    }
  }, [profile]);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await upsert({ imageUrl, introduction });
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
      <CardHeader>
        <CardTitle className="text-foreground text-lg">프로필 정보</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <ImageUpload
          currentImageUrl={imageUrl}
          onUpload={(url) => setImageUrl(url)}
        />

        <div className="space-y-2">
          <Label htmlFor="introduction" className="text-foreground">
            소개글
          </Label>
          <Textarea
            id="introduction"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            placeholder="자기소개를 입력하세요"
            rows={5}
            className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
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
