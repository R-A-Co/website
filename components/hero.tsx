import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { HomeContent, Site } from "@/lib/content-types";
import {
  buttonPrimary,
  buttonSecondary,
  cn,
  microLabel,
} from "@/lib/utils";

export function Hero({
  site,
  home,
}: {
  site: Site;
  home: HomeContent;
}) {
  return (
    <section
      id="top"
      className="relative scroll-mt-24 overflow-hidden pb-12 pt-6 md:pt-16 lg:pt-32"
    >
      <div className="hero-visual" aria-hidden="true">
        <span className="hero-visual__ring hero-visual__ring--outer" />
        <span className="hero-visual__ring hero-visual__ring--inner" />
        <span className="hero-visual__ring hero-visual__ring--orbit" />
        <span className="hero-visual__frame" />
        <span className="hero-visual__axis hero-visual__axis--horizontal" />
        <span className="hero-visual__axis hero-visual__axis--vertical" />
        <span className="hero-visual__tick hero-visual__tick--top" />
        <span className="hero-visual__tick hero-visual__tick--right" />
        <span className="hero-visual__tick hero-visual__tick--bottom" />
        <span className="hero-visual__tick hero-visual__tick--left" />
        <span className="hero-visual__dot hero-visual__dot--one" />
        <span className="hero-visual__dot hero-visual__dot--two" />
        <span className="hero-visual__label">R&amp;A</span>
      </div>
      <div className="grid grid-cols-12 gap-x-6">
        <p
          aria-hidden="true"
          className="hidden font-serif text-[10px] leading-[1.5] text-secondary md:col-span-1 md:block"
        >
          01
        </p>

        <div className="reveal col-span-12 min-w-0 md:col-start-2 md:col-span-8">
          <p className={cn(microLabel, "mb-3 md:hidden")}>
            01 / Research &amp; Analysis Committee
          </p>

          <h1 className="max-w-[640px] text-pretty font-sans text-[28px] font-normal leading-[1.18] tracking-[-0.02em] text-ink md:text-[40px] md:leading-[1.08]">
            {home.heroTitle}
          </h1>

          <div className="mt-4 flex max-w-[590px] flex-col gap-4 text-[16px] leading-[1.65] text-ink md:mt-5">
            <p>
              {home.heroIntro}{" "}
              <a href="https://dscsms.com" className="link-inline">
                {site.name}
              </a>
            </p>
            <p>{home.heroSecondary}</p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <a href="/learning" className={buttonPrimary}>
              Start learning
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
            <a href="/people" className={buttonSecondary}>
              Get involved
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>

          <dl className="mt-8 flex max-w-[560px] flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 font-mono text-[10px] leading-[1.5]">
            {site.researchStats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 items-baseline gap-1.5">
                <dt className="text-secondary">{stat.label}</dt>
                <dd className="break-words text-ink">{stat.value}</dd>
              </div>
            ))}
          </dl>

        </div>
      </div>

      <div className="mt-12 grid grid-cols-12 gap-x-6 md:mt-16">
        <div className="col-span-12 md:col-start-2 md:col-span-10">
          <div className="mb-2 flex items-center justify-between gap-4">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-secondary">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
              Areas we&apos;re exploring
            </p>
            <p className={cn(microLabel, "hidden sm:block")}>
              {String(site.focusAreas.length).padStart(2, "0")} starting points
            </p>
          </div>

          <ul className="grid border-t border-border md:grid-cols-2 md:gap-x-8">
            {site.focusAreas.map((area) => (
              <li
                key={area}
                className="group flex items-center gap-3 border-b border-border py-4"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70 transition-transform duration-200 group-hover:scale-125"
                />
                <span className="font-sans text-[16px] leading-[1.3] tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-accent">
                  {area}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
