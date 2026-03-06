import { ExternalLink, Github, Play } from "lucide-react";
import { Doc } from "@/convex/_generated/dataModel";

interface ProductLinksProps {
  serviceUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  status: Doc<"products">["status"];
}

export default function ProductLinks({
  serviceUrl,
  githubUrl,
  videoUrl,
  status,
}: ProductLinksProps) {
  const hasAnyLink = serviceUrl || githubUrl || videoUrl;
  const isEnded = status === "ended";

  if (!hasAnyLink && !isEnded) return null;

  return (
    <div className="flex items-center gap-3">
      {isEnded && (
        <span className="text-xs text-destructive">서비스 종료</span>
      )}
      {serviceUrl && (
        <a
          href={serviceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          서비스
        </a>
      )}
      {githubUrl && (
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          GitHub
        </a>
      )}
      {videoUrl && (
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Play className="w-3.5 h-3.5" />
          영상
        </a>
      )}
    </div>
  );
}
