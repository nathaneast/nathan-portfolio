# Auth & Session Rules

## 인증 방식
- 환경변수 `ADMIN_PASSWORD`에 비밀번호 저장
- 서버 사이드(Next.js API Route 또는 Server Action)에서 비교
- 인증 성공 시 session cookie 발급 (브라우저 닫을 때까지 유지)

## 구현 패턴

```typescript
// app/api/auth/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const sessionToken = crypto.randomBytes(32).toString("hex");

  const cookieStore = await cookies();
  cookieStore.set("session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // maxAge 미설정 → session cookie (브라우저 닫으면 만료)
  });

  return NextResponse.json({ success: true });
}
```

## 세션 검증 미들웨어

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session");

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

## 규칙
- 비밀번호는 절대 클라이언트에 노출하지 않음
- session token은 crypto.randomBytes로 생성 (예측 불가)
- cookie는 httpOnly + secure(prod) + sameSite 설정
- 수정 페이지(/admin) 접근 시 middleware에서 세션 검증
