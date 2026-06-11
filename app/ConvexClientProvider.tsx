"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// main 단일 운영: 모든 환경(local/dev/prod)이 운영 Convex 배포 하나만 사용한다.
const CONVEX_URL = "https://famous-hedgehog-522.convex.cloud";

const convex = new ConvexReactClient(CONVEX_URL);

export default function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
