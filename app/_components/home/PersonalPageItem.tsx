import Image from "next/image";
import {
  Youtube,
  BookOpen,
  Globe,
  Newspaper,
  Podcast,
  Store,
  Link,
} from "lucide-react";
import type { ReactNode } from "react";
import type { PageIcon } from "./types";

interface PersonalPageItemProps {
  icon: PageIcon;
  name: string;
  url: string;
  description: string;
  thumbnailUrl?: string;
}

const iconMap: Record<PageIcon, ReactNode> = {
  youtube: <Youtube className="w-5 h-5 shrink-0 text-muted-foreground" />,
  blog: <BookOpen className="w-5 h-5 shrink-0 text-muted-foreground" />,
  website: <Globe className="w-5 h-5 shrink-0 text-muted-foreground" />,
  newsletter: <Newspaper className="w-5 h-5 shrink-0 text-muted-foreground" />,
  podcast: <Podcast className="w-5 h-5 shrink-0 text-muted-foreground" />,
  store: <Store className="w-5 h-5 shrink-0 text-muted-foreground" />,
  other: <Link className="w-5 h-5 shrink-0 text-muted-foreground" />,
};

export default function PersonalPageItem({
  icon,
  name,
  url,
  description,
  thumbnailUrl,
}: PersonalPageItemProps) {
  const iconNode =
    icon === "youtube" && thumbnailUrl ? (
      <Image
        src={thumbnailUrl}
        alt={`${name} 채널 프로필`}
        width={28}
        height={28}
        className="w-7 h-7 shrink-0 rounded-full object-cover"
      />
    ) : (
      iconMap[icon]
    );

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 hover:bg-accent transition-colors"
    >
      {iconNode}
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
          {description}
        </p>
      </div>
    </a>
  );
}
