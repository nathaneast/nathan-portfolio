export type PageIcon =
  | "youtube"
  | "blog"
  | "website"
  | "newsletter"
  | "podcast"
  | "store"
  | "other";

export const PAGE_ICON_OPTIONS: { value: PageIcon; label: string }[] = [
  { value: "youtube", label: "YouTube" },
  { value: "blog", label: "블로그" },
  { value: "website", label: "웹사이트" },
  { value: "newsletter", label: "뉴스레터" },
  { value: "podcast", label: "팟캐스트" },
  { value: "store", label: "스토어" },
  { value: "other", label: "기타" },
];
