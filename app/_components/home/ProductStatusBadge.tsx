import { Doc } from "@/convex/_generated/dataModel";

interface ProductStatusBadgeProps {
  status: Doc<"products">["status"];
}

export default function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  if (status === "active") return null;

  return (
    <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-destructive font-medium">
      종료
    </span>
  );
}
