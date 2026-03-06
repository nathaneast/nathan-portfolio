"use client";

import dynamic from "next/dynamic";

const ProfileSection = dynamic(
  () => import("./ProfileSection"),
  { ssr: false }
);

const ProductSection = dynamic(
  () => import("./ProductSection"),
  { ssr: false }
);

export default function HomeContent() {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
      <ProfileSection />
      <ProductSection />
    </div>
  );
}
