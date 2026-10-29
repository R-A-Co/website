import { cn } from "@/lib/utils";

export function Logo({
  className,
  onClick,
  name = "Data Science Club",
}: {
  className?: string;
  onClick?: () => void;
  name?: string;
}) {
  return (
    <a
      href="/"
      onClick={onClick}
      className={cn(
        "group inline-flex shrink-0 items-center gap-2.5",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="grid size-4 shrink-0 grid-cols-2 gap-[2px] transition-opacity duration-200 group-hover:opacity-60"
      >
        <span className="bg-ink" />
        <span className="bg-ink" />
        <span className="bg-ink" />
        <span className="bg-ink" />
      </span>

      <span className="flex flex-col">
        <span className="font-sans text-[13px] font-normal leading-none tracking-[-0.01em] text-ink">
          {name}
        </span>
        <span className="mt-1.5 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-secondary">
          Research &amp; Analysis
        </span>
      </span>
      <span className="sr-only">Back to the index</span>
    </a>
  );
}
