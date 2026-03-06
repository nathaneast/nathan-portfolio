import { mutation } from "./_generated/server";

export const run = mutation({
  args: {},
  handler: async (ctx) => {
    // profile
    const existingProfile = await ctx.db.query("profile").first();
    if (!existingProfile) {
      await ctx.db.insert("profile", {
        imageUrl: "https://avatars.githubusercontent.com/u/583231",
        introduction:
          "안녕하세요, 프론트엔드 개발자 Nathan입니다.\n사용자 경험을 중심으로 사이드 프로젝트를 만들고 있습니다.\nNext.js, React, TypeScript를 주로 사용합니다.",
        snsLinks: [
          { type: "github", url: "https://github.com" },
          { type: "x", url: "https://x.com" },
        ],
      });
    }

    // personalPages
    const existingPages = await ctx.db.query("personalPages").collect();
    if (existingPages.length === 0) {
      await ctx.db.insert("personalPages", {
        icon: "blog",
        name: "기술 블로그",
        url: "https://example.com/blog",
        description: "개발 경험과 배움을 기록합니다",
        order: 1,
      });
      await ctx.db.insert("personalPages", {
        icon: "youtube",
        name: "유튜브 채널",
        url: "https://youtube.com",
        description: "개발 관련 영상을 올립니다",
        order: 2,
      });
    }

    // products
    const existingProducts = await ctx.db.query("products").collect();
    if (existingProducts.length === 0) {
      await ctx.db.insert("products", {
        imageUrl: "https://picsum.photos/seed/prod1/800/450",
        title: "포트폴리오 사이트",
        description: "개인 포트폴리오 및 프로덕트 소개 사이트입니다.",
        techDescription: "Next.js, Convex, Tailwind CSS, TypeScript",
        serviceUrl: "https://example.com",
        githubUrl: "https://github.com",
        status: "active",
      });
      await ctx.db.insert("products", {
        imageUrl: "https://picsum.photos/seed/prod2/800/450",
        title: "AI 사이드 프로젝트",
        description:
          "AI를 활용한 실험적인 사이드 프로젝트입니다. 사용자 인터랙션을 분석하여 맞춤형 경험을 제공합니다.",
        techDescription: "React, OpenAI API, Supabase",
        serviceUrl: "https://example.com",
        status: "active",
      });
      await ctx.db.insert("products", {
        imageUrl: "https://picsum.photos/seed/prod3/800/450",
        title: "커뮤니티 플랫폼",
        description:
          "개발자 커뮤니티를 위한 Q&A 및 프로젝트 공유 플랫폼입니다.",
        techDescription: "Next.js, PostgreSQL, Prisma",
        githubUrl: "https://github.com",
        status: "ended",
      });
    }

    return { ok: true };
  },
});
