import { Doc } from "@/convex/_generated/dataModel";

const TYPE_LABEL: Record<NonNullable<Doc<"products">["types"]>[number], string> = {
  web: "웹",
  app: "앱",
  "toss-inapp": "토스인앱",
  desktop: "데스크탑",
};

interface ProductTypeBadgeProps {
  types: Doc<"products">["types"];
}

export default function ProductTypeBadge({ types }: ProductTypeBadgeProps) {
  if (!types || types.length === 0) return null;

  return (
    <div className="flex gap-1 flex-wrap shrink-0">
      {types.map((type) => (
        <span
          key={type}
          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium"
        >
          {TYPE_LABEL[type]}
        </span>
      ))}
    </div>
  );
}
