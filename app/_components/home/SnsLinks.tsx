import { AtSign, Linkedin, Github, Mail } from "lucide-react";
import type { ReactNode } from "react";
import EmailCopyButton from "./EmailCopyButton";

type SnsType = "threads" | "x" | "linkedin" | "github" | "email";

interface SnsLink {
  type: SnsType;
  url: string;
}

interface SnsLinksProps {
  links: SnsLink[];
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconMap: Record<SnsType, (className: string) => ReactNode> = {
  threads: (className) => <AtSign className={className} />,
  x: (className) => <XIcon className={className} />,
  linkedin: (className) => <Linkedin className={className} />,
  github: (className) => <Github className={className} />,
  email: (className) => <Mail className={className} />,
};

export default function SnsLinks({ links }: SnsLinksProps) {
  if (links.length === 0) return null;

  return (
    <div className="mt-5 flex items-center gap-3">
      {links.map((link) => {
        if (link.type === "email") {
          return <EmailCopyButton key={link.type} email={link.url} />;
        }

        return (
          <a
            key={link.type}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.type}
          >
            {iconMap[link.type]("w-5 h-5 text-muted-foreground hover:text-foreground transition-colors")}
          </a>
        );
      })}
    </div>
  );
}
