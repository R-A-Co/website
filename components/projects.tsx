import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content-types";
import { cn, microLabel } from "@/lib/utils";
import { GithubIcon } from "./github-icon";

function ProjectChart({ metrics }: { metrics: Project["metrics"] }) {
  return (
    <figure className="border border-border p-3 md:p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] uppercase leading-none tracking-[0.1em] text-secondary">
          Fig. 01 — Load forecast
        </span>
        <span className="font-mono text-[9px] uppercase leading-none tracking-[0.1em] text-secondary">
          P50 / 90% CI
        </span>
      </div>

      <svg
        viewBox="0 0 480 200"
        role="img"
        aria-label="Line chart showing observed energy load followed by a 96-hour probabilistic forecast with a 90 percent confidence band."
        className="mt-4 h-auto w-full"
      >
        <defs>
          <linearGradient id="forecast-band" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2200ff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#2200ff" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {[10, 55, 100, 145, 190].map((y) => (
          <line
            key={`h-${y}`}
            x1="30"
            x2="470"
            y1={y}
            y2={y}
            stroke="#000000"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        ))}
        {[30, 140, 250, 360, 470].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            x2={x}
            y1="10"
            y2="190"
            stroke="#000000"
            strokeOpacity="0.07"
            strokeWidth="1"
          />
        ))}

        <line
          x1="250"
          x2="250"
          y1="10"
          y2="190"
          stroke="#2200ff"
          strokeOpacity="0.3"
          strokeDasharray="2 4"
        />

        <path
          d="M250 80 C270 56 290 44 310 48 C330 52 345 36 365 40 C385 44 400 28 420 32 C440 36 455 22 470 24 L470 64 C455 60 440 74 420 70 C400 66 385 82 365 78 C345 74 330 90 310 86 C290 82 270 92 250 80 Z"
          fill="url(#forecast-band)"
        />

        <path
          d="M30 150 C50 140 65 155 85 138 C105 120 120 132 140 110 C160 88 175 104 195 96 C215 88 230 76 250 80"
          fill="none"
          stroke="#191919"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M250 80 C270 74 290 62 310 66 C330 70 345 54 365 58 C385 62 400 46 420 50 C440 54 455 40 470 42"
          fill="none"
          stroke="#2200ff"
          strokeWidth="1.5"
          strokeDasharray="3 4"
          strokeLinecap="round"
        />

        <circle cx="250" cy="80" r="2" fill="#191919" />
        <circle cx="470" cy="42" r="2.5" fill="#2200ff" />
        <circle
          cx="470"
          cy="42"
          r="6"
          fill="none"
          stroke="#2200ff"
          strokeOpacity="0.3"
        />
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.06em] text-secondary">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-px w-4 bg-ink" />
          Observed
        </span>
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="w-4 border-t border-dashed border-accent"
          />
          Forecast
        </span>
        <span className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="h-2 w-4 bg-accent/10 ring-1 ring-inset ring-accent/20"
          />
          90% interval
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-3 divide-x divide-border border-t border-border pt-3">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              "min-w-0 px-2 md:px-3",
              index === 0 && "pl-0",
              index === metrics.length - 1 && "pr-0",
            )}
          >
            <dt className="break-words font-mono text-[9px] uppercase leading-[1.4] tracking-[0.06em] text-secondary md:text-[10px]">
              {metric.label}
            </dt>
            <dd className="mt-1 break-words font-mono text-[11px] leading-[1.4] text-ink md:text-xs">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <span className={microLabel}>
        {project.code} · {project.name}
      </span>
      <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase leading-[1.4] tracking-[0.1em] text-secondary">
        <span className="size-1 rounded-full bg-accent" />
        {project.status}
        <span aria-hidden="true" className="mx-0.5 text-faint">
          /
        </span>
        {project.period}
      </span>
    </div>
  );
}

function ProjectTags({ project }: { project: Project }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.06em] text-secondary">
      {project.tags.map((tag, index) => (
        <li key={tag} className="flex items-center gap-2">
          {tag}
          {index < project.tags.length - 1 ? (
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

function RepoLink({ project }: { project: Project }) {
  return (
    <a
      href={project.repo}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 text-[13px] leading-[1.3] text-accent transition-opacity hover:opacity-60"
    >
      <GithubIcon className="size-3.5" />
      Repository
      <ArrowUpRight
        aria-hidden="true"
        className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </a>
  );
}

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="border border-border">
      <div className="border-b border-border px-3 py-2.5 md:px-4">
        <ProjectMeta project={project} />
      </div>

      <div className="grid gap-8 p-4 md:p-6 xl:grid-cols-12 xl:gap-8">
        <div className="xl:col-span-7">
          <h3 className="max-w-[520px] font-sans text-[20px] leading-[1.3] tracking-[-0.01em] text-ink">
            {project.title}
          </h3>
          <p className="mt-2 max-w-[560px] text-[15px] leading-[1.5] text-ink">
            {project.abstract}
          </p>
          <div className="mt-6 border-t border-border pt-3">
            <ProjectTags project={project} />
          </div>
        </div>

        <div className="xl:col-span-5">
          <ProjectChart metrics={project.metrics} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3">
        <span className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.1em] text-secondary">
          Student pod · Faculty advised
        </span>
        <RepoLink project={project} />
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col border border-border p-4 md:p-5">
      <ProjectMeta project={project} />

      <h3 className="mt-5 font-sans text-[18px] leading-[1.3] tracking-[-0.01em] text-ink">
        {project.title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.5] text-ink">
        {project.abstract}
      </p>

      <dl className="mt-5 grid grid-cols-3 divide-x divide-border border-y border-border py-3">
        {project.metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={cn(
              "min-w-0 px-2.5",
              index === 0 && "pl-0",
              index === project.metrics.length - 1 && "pr-0",
            )}
          >
            <dt className="break-words font-mono text-[9px] uppercase leading-[1.4] tracking-[0.06em] text-secondary">
              {metric.label}
            </dt>
            <dd className="mt-1 break-words font-mono text-[11px] leading-[1.4] text-ink">
              {metric.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-0">
        <ProjectTags project={project} />
        <RepoLink project={project} />
      </div>
    </article>
  );
}

export function ProjectsView({ projects }: { projects: Project[] }) {
  const [featured, ...rest] = projects;

  return (
    <div>
      {featured ? <FeaturedProject project={featured} /> : null}

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {rest.map((project) => (
          <ProjectCard key={project.code} project={project} />
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-[13px] leading-[1.5] text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>Code, tests, and a reproducibility manifest ship with every project.</p>
        <a
          href="https://github.com/dsc-research"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-accent transition-opacity hover:opacity-60"
        >
          GitHub organization
          <ArrowUpRight
            aria-hidden="true"
            className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </div>
  );
}
