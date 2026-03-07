"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  siteUrl: string;
}

export default function QRCode({ siteUrl }: QRCodeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8">
      <Link
        href="/"
        className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft size={28} />
      </Link>
      <QRCodeSVG
        value={siteUrl}
        size={280}
        bgColor="transparent"
        fgColor="white"
        level="M"
      />
      <p className="text-sm text-muted-foreground">{siteUrl}</p>
    </main>
  );
}
