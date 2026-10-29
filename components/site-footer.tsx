import { ArrowUp, ArrowUpRight, Mail, MapPin } from "lucide-react";
import type { Site } from "@/lib/content-types";
import {
  buttonPrimary,
  cn,
  containerClass,
  microLabel,
} from "@/lib/utils";
import { GithubIcon } from "./github-icon";
import { Logo } from "./logo";

export function SiteFooter({ site }: { site: Site }) {
  const indexLinks = [
    { label: "Learning", href: "/learning" },
    { label: "Research", href: "/research" },
    { label: "Resources", href: "/resources" },
    { label: "Our work", href: "/work" },
    { label: "People & contact", href: "/people" },
  ];

  const institutionLinks = [
    { label: "Data Science Club", href: "https://dscsms.com" },
  ];

  const connectLinks = [
    { label: "GitHub", href: site.github },
    { label: "LinkedIn", href: site.linkedin },
    { label: "CMS", href: "/cms" },
    { label: "Email the committee", href: `mailto:${site.email}` },
    { label: "Email", href: `mailto:${site.email}` },
  ];

  const columns = [
    { title: "Index", links: indexLinks },
    { title: "Institution", links: institutionLinks },
    { title: "Connect", links: connectLinks },
  ];

  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-border bg-background"
    >
      <div className={cn(containerClass, "pt-14 md:pt-20")}>
        <div className="grid gap-8 border-b border-border pb-12 md:pb-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <p className={microLabel}>Collaborate</p>
            <h2 className="mt-2 max-w-[560px] font-sans text-[24px] leading-[1.2] tracking-[-0.02em] text-ink md:text-[36px] md:leading-[1.1]">
              Have a question worth modeling?
            </h2>
            <p className="mt-3 max-w-[560px] text-[15px] leading-[1.5] text-ink">
              We partner with labs, student organizations, and public-sector
              teams on problems where rigorous analysis can change a decision.
              Tell us what you are trying to understand.
            </p>
            <a href={`mailto:${site.email}`} className={cn(buttonPrimary, "mt-5")}>
              Email the committee
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>

          <div className="flex flex-col gap-4 border-t border-border pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-start justify-between gap-4"
            >
              <span>
                <span className={microLabel}>Email</span>
                <span className="mt-1 block text-[13px] leading-[1.5] text-ink transition-colors group-hover:text-accent">
                  {site.email}
                </span>
              </span>
              <Mail
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-accent"
              />
            </a>

            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start justify-between gap-4"
            >
              <span>
                <span className={microLabel}>GitHub</span>
                <span className="mt-1 block text-[13px] leading-[1.5] text-ink transition-colors group-hover:text-accent">
                  {site.github.replace(/^https?:\/\//, "")}
                </span>
              </span>
              <GithubIcon className="mt-0.5 size-3.5 shrink-0 text-accent" />
            </a>

            <div>
              <span className={cn(microLabel, "flex items-center gap-1.5")}>
                <MapPin aria-hidden="true" className="size-3" />
                Office
              </span>
              <p className="mt-1 text-[13px] leading-[1.5] text-ink">
                {site.location}
              </p>
              <p className="mt-0.5 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
                Thursdays · 17:00
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 py-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4 lg:col-span-3">
            <Logo name={site.name} />
            <p className="mt-4 max-w-[230px] text-[13px] leading-[1.5] text-secondary">
              The research arm of the {site.name}. Applied data science,
              published methods, and open tools — built by students.
            </p>
            <p className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
              <span className="size-1 rounded-full bg-accent" />
              Open for collaborations
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-8 md:col-start-5 md:grid-cols-3 lg:col-span-9 lg:col-start-4"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="sr-only">{column.title}</h3>
                <ul className="flex flex-col gap-1">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label} className="flex">
                        <a
                          href={link.href}
                          {...(external
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                          className="inline-flex min-h-8 max-w-full items-center gap-1 break-words px-0.5 font-mono text-[12px] leading-[1.4] tracking-[-0.01em] text-secondary transition-colors hover:bg-accent hover:text-white"
                        >
                          {link.label}
                          {external ? (
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-2.5 shrink-0"
                            />
                          ) : null}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-border py-7 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {site.name} · {site.committee}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Designed for the record</span>
            <a
              href="/#top"
              className="group inline-flex items-center gap-1.5 text-ink transition-colors hover:text-accent"
            >
              Back to top
              <ArrowUp
                aria-hidden="true"
                className="size-3 transition-transform duration-200 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
