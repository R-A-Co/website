"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex min-w-0 items-center justify-between gap-3 border border-border bg-white/40 px-2.5 py-2">
      <code className="min-w-0 truncate font-mono text-[11px] leading-[1.5] text-ink">
        <span aria-hidden="true" className="mr-2 text-secondary">
          $
        </span>
        {command}
      </code>

      <button
        type="button"
        onClick={copy}
        className="flex h-6 w-14 shrink-0 items-center justify-end gap-1.5 font-mono text-[9px] uppercase tracking-[0.06em] text-secondary transition-colors hover:text-accent"
      >
        {copied ? (
          <>
            <Check aria-hidden="true" className="size-3 text-accent" />
            <span className="text-accent">Copied</span>
          </>
        ) : (
          <>
            <Copy aria-hidden="true" className="size-3" />
            <span className="sr-only">Copy command</span>
          </>
        )}
      </button>

      <span aria-live="polite" className="sr-only">
        {copied ? `${command} copied to clipboard` : ""}
      </span>
    </div>
  );
}
