import { Doc } from "@/convex/_generated/dataModel";

type ProductType = NonNullable<Doc<"products">["types"]>[number];

const TYPE_LABEL: Record<ProductType, string> = {
  web: "웹",
  app: "앱",
  "toss-inapp": "토스인앱",
  desktop: "데스크탑",
};

const TYPE_ORDER: ProductType[] = ["web", "app", "toss-inapp", "desktop"];

const TYPE_COLOR: Record<ProductType, string> = {
  web: "bg-purple-500/20 text-purple-400",
  app: "bg-green-500/20 text-green-400",
  "toss-inapp": "bg-blue-500/20 text-blue-400",
  desktop: "bg-orange-500/20 text-orange-400",
};

interface ProductTypeBadgeProps {
  types: Doc<"products">["types"];
}

export default function ProductTypeBadge({ types }: ProductTypeBadgeProps) {
  if (!types || types.length === 0) return null;

  const sorted = TYPE_ORDER.filter((t) => types.includes(t));

  return (
    <div className="flex gap-1 flex-wrap shrink-0">
      {sorted.map((type) => (
        <span
          key={type}
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_COLOR[type]}`}
        >
          {TYPE_LABEL[type]}
        </span>
      ))}
    </div>
  );
}
