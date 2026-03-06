import { Doc } from "@/convex/_generated/dataModel";

const TYPE_LABEL: Record<NonNullable<Doc<"products">["type"]>, string> = {
  web: "웹",
  app: "앱",
  "toss-inapp": "토스인앱",
  desktop: "데스크탑",
};

interface ProductTypeBadgeProps {
  type: Doc<"products">["type"];
}

export default function ProductTypeBadge({ type }: ProductTypeBadgeProps) {
  if (!type) return null;

  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium shrink-0">
      {TYPE_LABEL[type]}
    </span>
  );
}
