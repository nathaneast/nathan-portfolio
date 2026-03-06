import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import ConvexClientProvider from "./ConvexClientProvider";
import EnvironmentBadge from "./_components/EnvironmentBadge";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const siteUrl = getSiteUrl();
const SITE_TITLE = "Nathan | Developer";
const SITE_DESCRIPTION =
  "프론트엔드 개발자 Nathan의 포트폴리오. 사이드 프로젝트와 프로덕트를 소개합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_TITLE,
    template: "%s | Nathan",
  },
  description: SITE_DESCRIPTION,
  keywords: ["developer", "frontend", "portfolio", "Nathan", "Next.js", "React"],
  authors: [{ name: "Nathan" }],
  creator: "Nathan",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    siteName: "Nathan Portfolio",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nathan",
  url: siteUrl,
  jobTitle: "Frontend Developer",
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${pretendard.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Toaster position="top-center" richColors duration={4000} />
        <EnvironmentBadge />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
