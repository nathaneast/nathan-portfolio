"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  siteUrl: string;
}

export default function QRCode({ siteUrl }: QRCodeProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background p-8">
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
