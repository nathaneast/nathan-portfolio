import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ thumbnailUrl: null });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; bot)" },
      next: { revalidate: 0 },
    });
    const html = await res.text();
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    return NextResponse.json({ thumbnailUrl: match?.[1] ?? null });
  } catch {
    return NextResponse.json({ thumbnailUrl: null });
  }
}
