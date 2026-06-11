import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";
import ConvexClientProvider from "./ConvexClientProvider";
import { getSiteUrl } from "@/lib/site";
import { appleSplashImages } from "@/lib/apple-splash";
import "./globals.css";

const pretendard = localFont({
  src: "../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const siteUrl = getSiteUrl();
const SITE_TITLE = "Nathan | 프로덕트 엔지니어 · 1인 개발자 · 크리에이터";
const SITE_DESCRIPTION =
  "프론트엔드 개발자, 1인 개발자, 유튜버 Nathan의 포트폴리오. 프로덕트 엔지니어링부터 솔로프리너 창업까지, 직접 만든 서비스와 프로젝트를 소개합니다.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_TITLE,
    template: "%s | Nathan",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Nathan",
    "프론트엔드 개발자",
    "프론트엔드 개발자 리드",
    "앱 개발자",
    "풀스택 개발자",
    "프로덕트 엔지니어",
    "솔로프리너",
    "1인 개발자",
    "1인 개발",
    "1인 기업",
    "스타트업",
    "크리에이터",
    "작가",
    "유튜버",
    "포트폴리오",
    "개발자 포트폴리오",
  ],
  authors: [{ name: "Nathan" }],
  creator: "Nathan",
  appleWebApp: {
    capable: true,
    title: "Nathaneast | 디지털 명함",
    statusBarStyle: "black-translucent",
    startupImage: appleSplashImages,
  },
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

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nathan",
  url: siteUrl,
  jobTitle: "Frontend Developer / Product Engineer / Creator",
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
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
