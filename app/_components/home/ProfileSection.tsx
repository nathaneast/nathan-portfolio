"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { QrCode } from "lucide-react";
import ProfileImage from "./ProfileImage";
import ProfileIntro from "./ProfileIntro";
import SnsLinks from "./SnsLinks";
import PersonalPageList from "./PersonalPageList";

export default function ProfileSection() {
  const profile = useQuery(api.profile.get);
  const personalPages = useQuery(api.personalPages.list);

  if (!profile) return null;

  return (
    <aside className="w-full lg:w-[460px] lg:shrink-0 lg:sticky lg:top-20 lg:self-start">
      <div className="relative inline-block">
        <ProfileImage imageUrl={profile.imageUrl} />
        <Link
          href="/qr"
          className="absolute bottom-1 right-1 p-1.5 rounded-full bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          aria-label="QR 코드 페이지로 이동"
        >
          <QrCode className="w-4 h-4" />
        </Link>
      </div>
      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Nathaneast</h1>
          <span className="text-xs text-muted-foreground">Nathan + Artist</span>
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">AI Builder, AI Workflow Architect</p>
      </div>
      <ProfileIntro introduction={profile.introduction} />
      <SnsLinks links={profile.snsLinks} />
      {personalPages && personalPages.length > 0 && (
        <PersonalPageList pages={personalPages} />
      )}
    </aside>
  );
}
