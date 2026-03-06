"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
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
      <ProfileImage imageUrl={profile.imageUrl} />
      <div className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Nathaneast</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Nathan + Artist</p>
      </div>
      <ProfileIntro introduction={profile.introduction} />
      <SnsLinks links={profile.snsLinks} />
      {personalPages && personalPages.length > 0 && (
        <PersonalPageList pages={personalPages} />
      )}
    </aside>
  );
}
