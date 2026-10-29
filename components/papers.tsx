import { ArrowUpRight } from "lucide-react";
import type { Paper, Site } from "@/lib/content-types";
import { actionLink, cn, formatPaperDate } from "@/lib/utils";

const typeStyles: Record<Paper["type"], string> = {
  "Peer-reviewed": "text-accent",
  Preprint: "text-secondary",
  "Technical note": "text-secondary",
};

function TypeLabel({ type }: { type: Paper["type"] }) {
  return (
    <span
      className={cn(
        "font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em]",
        typeStyles[type],
      )}
    >
      {type}
    </span>
  );
}

export function PapersView({
  papers,
  site,
  limit,
}: {
  papers: Paper[];
  site: Site;
  limit?: number;
}) {
  const visible = typeof limit === "number" ? papers.slice(0, limit) : papers;

  return (
    <div>
      <div>
        {visible.map((paper) => (
          <a
            key={paper.reference}
            href={paper.href}
            target="_blank"
            rel="noreferrer"
            className="group grid gap-2 border-t border-border py-4 transition-colors md:grid-cols-12 md:items-baseline md:gap-6"
          >
            <div className="flex items-center justify-between gap-3 md:col-span-2 md:block">
              <time
                dateTime={paper.date}
                className="font-mono text-[11px] leading-[1.5] tracking-[0.02em] text-secondary"
              >
                {formatPaperDate(paper.date)}
              </time>
              <span className="md:hidden">
                <TypeLabel type={paper.type} />
              </span>
            </div>

            <div className="md:col-span-6">
              <h3 className="max-w-[620px] font-sans text-[18px] leading-[1.3] tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                {paper.title}
              </h3>
              <p className="mt-1 break-words font-mono text-[9px] uppercase leading-[1.5] tracking-[0.06em] text-secondary">
                {paper.venue}
                <span aria-hidden="true" className="mx-1.5 text-faint">
                  ·
                </span>
                {paper.reference}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 md:col-span-3 md:block">
              <p className="text-[13px] leading-[1.5] text-secondary">
                {paper.authors}
              </p>
              <span className="mt-1 hidden md:block">
                <TypeLabel type={paper.type} />
              </span>
            </div>

            <div className="hidden md:col-span-1 md:flex md:justify-end">
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </div>
          </a>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-[13px] leading-[1.5] text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>Methods and artifacts are released with every paper where permitted.</p>
        <a
          href={`mailto:${site.email}?subject=Preprint%20request`}
          className={cn(actionLink, "text-[13px]")}
        >
          Request a preprint
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </a>
      </div>
    </div>
  );
}
