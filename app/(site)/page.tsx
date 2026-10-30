import { Hero } from "@/components/hero";
import { ArrowUpRight } from "lucide-react";
import { getHome, getSite } from "@/lib/content";
import { navLinks } from "@/lib/nav";

export default function HomePage() {
  const site = getSite();
  const home = getHome();
  const sectionDescriptions: Record<string, string> = {
    learning: "A guided path for learning coding and data topics.",
    research: "The questions and methods we are beginning to explore.",
    resources: "Useful tools and learning resources for students.",
    work: "Our academic paper, projects, and future publications.",
    events: "Workshops, talks, and opportunities to meet.",
    people: "The people building the committee, and how to reach us.",
  };

  return (
    <>
      <Hero site={site} home={home} />

      <section className="pb-16 md:pb-24">
        <div className="grid grid-cols-12 gap-x-6">
          <div aria-hidden="true" className="hidden md:col-span-1 md:block" />
          <div className="col-span-12 min-w-0 md:col-start-2 md:col-span-10">
            <div className="grid gap-8 border-t border-border pt-5 md:grid-cols-2 md:gap-12">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
                  About the committee
                </p>
                <h2 className="mt-2 max-w-[500px] text-pretty font-sans text-[26px] font-normal leading-[1.2] tracking-[-0.02em] md:text-[34px]">
                  {home.aboutTitle}
                </h2>
              </div>
              <div className="space-y-4 text-[16px] leading-[1.6]">
                <p>
                  The Research &amp; Analysis Committee is part of the{" "}
                  <a href="https://dscsms.com" className="link-inline">
                    {site.name}
                  </a>
                  . {home.aboutIntro}
                </p>
                <p className="text-secondary">
                  {home.aboutSecondary}
                </p>
              </div>
            </div>
            <div className="mt-8 grid gap-4 border-t border-border pt-4 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
                  Right now
                </p>
                <p className="mt-1 text-[15px] leading-[1.5] text-ink">
                  Starting from the basics
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
                  Working on
                </p>
                <p className="mt-1 text-[15px] leading-[1.5] text-ink">
                  Our first academic paper
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
                  Open to
                </p>
                <p className="mt-1 text-[15px] leading-[1.5] text-ink">
                  Students, mentors, and questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="grid grid-cols-12 gap-x-6">
          <div aria-hidden="true" className="hidden md:col-span-1 md:block" />
          <div className="col-span-12 min-w-0 md:col-start-2 md:col-span-10">
            <div className="mb-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
                What we do
              </p>
              <h2 className="mt-2 text-pretty font-sans text-[26px] font-normal leading-[1.2] tracking-[-0.02em] md:text-[34px]">
                {home.activitiesTitle}
              </h2>
              <p className="mt-3 max-w-[620px] text-[16px] leading-[1.6] text-secondary">
                {home.activitiesIntro}
              </p>
            </div>
            <ul className="grid border-l border-t border-border md:grid-cols-3">
              {home.activities.map((activity) => (
                <li key={activity.label} className="border-b border-r border-border">
                  <article className="flex min-h-52 flex-col justify-between p-4 md:p-5">
                    <span aria-hidden="true" className="h-px w-8 bg-accent" />
                    <div>
                      <h3 className="font-sans text-[18px] leading-[1.3] tracking-[-0.01em]">
                        {activity.label}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-secondary">
                        {activity.value}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-24">
        <div className="grid grid-cols-12 gap-x-6">
          <p
            aria-hidden="true"
            className="hidden font-serif text-[10px] leading-[1.5] text-secondary md:col-span-1 md:block"
          />
          <div className="col-span-12 min-w-0 md:col-start-2 md:col-span-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
                  Explore the record
                </p>
                <h2 className="mt-2 text-pretty font-sans text-[26px] font-normal leading-[1.2] tracking-[-0.02em] text-ink md:text-[34px] md:leading-[1.1]">
                  Find your way in.
                </h2>
                <p className="mt-3 max-w-[560px] text-[16px] leading-[1.6] text-secondary">
                  Learn with us, see what we are working on, or find the best
                  way to connect.
                </p>
              </div>
            </div>

            <ul className="grid border-l border-t border-border sm:grid-cols-2">
              {navLinks.map((section) => (
                <li key={section.href} className="border-b border-r border-border">
                  <a
                    href={section.href}
                    className="group flex min-h-32 flex-col justify-between p-4 transition-colors hover:bg-surface md:p-5"
                  >
                    <span className="flex items-start justify-between gap-4">
                      <span
                        aria-hidden="true"
                        className="h-px w-5 bg-accent transition-[width] duration-300 ease-out group-hover:w-10"
                      />
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                    <span>
                      <span className="block font-sans text-[19px] leading-[1.3] tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                        {section.label}
                      </span>
                      <span className="mt-1 block max-w-[280px] text-[14px] leading-[1.55] text-secondary">
                        {sectionDescriptions[section.id]}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap gap-3 border-t border-border pb-16 pt-5 md:pb-24">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
          Follow the committee
        </span>
        <a href={site.github} target="_blank" rel="noreferrer" className="text-[13px] text-accent">
          GitHub <ArrowUpRight aria-hidden="true" className="inline size-3" />
        </a>
        <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-[13px] text-accent">
          LinkedIn <ArrowUpRight aria-hidden="true" className="inline size-3" />
        </a>
      </div>
      <div className="page-transition" aria-hidden="true">
        <span className="page-transition__line" />
        <span className="page-transition__shape page-transition__shape--circle" />
        <span className="page-transition__shape page-transition__shape--square" />
        <span className="page-transition__shape page-transition__shape--triangle" />
      </div>
    </>
  );
}
