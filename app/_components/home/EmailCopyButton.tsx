"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

interface EmailCopyButtonProps {
  email: string;
}

export default function EmailCopyButton({ email }: EmailCopyButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const showPopover = hovered || copied;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label="이메일 복사"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Mail className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
      </button>

      {showPopover && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap rounded-md bg-popover border border-border px-3 py-1.5 text-xs text-popover-foreground shadow-md pointer-events-none">
          {copied ? "복사됨 ✓" : email}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-border" />
        </div>
      )}
    </div>
  );
}
