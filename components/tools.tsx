import { ArrowUpRight } from "lucide-react";
import type { Dataset, Script, Site, Tool } from "@/lib/content-types";
import { actionLink, cn, microLabel } from "@/lib/utils";
import { GithubIcon } from "./github-icon";
import { CopyCommand } from "./copy-command";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="flex h-full min-w-0 flex-col border border-border p-4 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-mono text-[15px] leading-[1.3] tracking-[-0.01em] text-ink">
            {tool.name}
          </h3>
          <span className="font-mono text-[10px] leading-[1.5] tracking-[0.06em] text-secondary">
            {tool.version}
          </span>
        </div>

        <a
          href={tool.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${tool.name} on GitHub`}
          className="text-secondary transition-colors hover:text-accent"
        >
          <GithubIcon className="size-3.5" />
        </a>
      </div>

      <p className="mt-2 text-[15px] leading-[1.5] text-ink">
        {tool.description}
      </p>

      <div className="mt-4 min-w-0">
        <CopyCommand command={tool.command} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.06em] text-secondary">
        {tool.tags.map((tag, index) => (
          <span key={tag} className="flex items-center gap-2">
            {tag}
            {index < tool.tags.length - 1 ? (
              <span aria-hidden="true" className="text-faint">
                ·
              </span>
            ) : null}
          </span>
        ))}
      </div>
    </article>
  );
}

function DatasetRow({ dataset }: { dataset: Dataset }) {
  return (
    <li>
      <a
        href={dataset.href}
        target="_blank"
        rel="noreferrer"
        className="group grid gap-2 border-t border-border py-4 transition-colors md:grid-cols-12 md:items-baseline md:gap-6"
      >
        <div className="md:col-span-6">
          <p className="font-sans text-[15px] leading-[1.3] text-ink transition-colors group-hover:text-accent">
            {dataset.name}
          </p>
          <p className="mt-1 max-w-[440px] text-[13px] leading-[1.5] text-secondary">
            {dataset.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.06em] text-secondary md:col-span-4 md:flex-col md:gap-1">
          <span>
            {dataset.format} · {dataset.size}
          </span>
          <span>
            {dataset.license} · Updated {dataset.updated}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
          <span
            className={cn(
              "font-mono text-[9px] uppercase leading-[1.5] tracking-[0.1em]",
              dataset.access === "Open" ? "text-ink" : "text-secondary",
            )}
          >
            {dataset.access}
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </a>
    </li>
  );
}

export function ToolsView({
  tools,
  datasets,
  scripts,
  site,
}: {
  tools: Tool[];
  datasets: Dataset[];
  scripts: Script[];
  site: Site;
}) {
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        {tools.map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </div>

      <div className="mt-12">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
          <h2 className={microLabel}>Curated datasets</h2>
          <a
            href={`mailto:${site.email}?subject=Dataset%20access%20request`}
            className={cn(actionLink, "text-[13px]")}
          >
            Request access
            <ArrowUpRight aria-hidden="true" className="size-3" />
          </a>
        </div>

        <ul>
          {datasets.map((dataset) => (
            <DatasetRow key={dataset.name} dataset={dataset} />
          ))}
        </ul>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-border pt-4 md:flex-row md:items-baseline md:justify-between">
        <span className={microLabel}>Analytical scripts</span>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {scripts.map((script) => (
            <li key={script.name}>
              <a
                href={script.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 font-mono text-[11px] leading-[1.5] text-ink transition-colors hover:text-accent"
              >
                {script.name}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-2.5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
