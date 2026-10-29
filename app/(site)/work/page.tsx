import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PapersView } from "@/components/papers";
import { getPapers, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our work",
  description:
    "The academic paper, projects, and future publications of the Research & Analysis Committee.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const site = getSite();

  return (
    <PageShell
      index="05"
      kicker="Our work"
      title="Starting with a question, not a claim."
      description="Our first project is an academic paper. As the work develops, this page will collect the question, reading list, approach, and outcomes alongside future student projects."
    >
      <article className="border border-border bg-surface p-5 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
          Current project · Paper in progress
        </p>
        <h2 className="mt-4 max-w-[620px] font-sans text-[24px] leading-[1.2] tracking-[-0.02em] md:text-[32px]">
          We are building the process in public.
        </h2>
        <p className="mt-4 max-w-[620px] text-[16px] leading-[1.6] text-secondary">
          We are still defining the question, reading the relevant work, and
          learning how to do it carefully. Students are welcome to learn
          alongside us as the project takes shape.
        </p>
      </article>

      <section className="mt-14">
        <div className="mb-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
            Projects
          </p>
          <h2 className="mt-2 font-sans text-[24px] leading-[1.2] tracking-[-0.02em] md:text-[32px]">
            Work we are building next.
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <article className="border border-border p-5">
            <span className="h-px w-8 bg-accent" />
            <h3 className="mt-8 font-sans text-[18px] leading-[1.3]">
              Academic paper
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-secondary">
              Our first project: developing a research question, reading the
              field, and learning how to work carefully from evidence to
              conclusion.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
              In progress
            </p>
          </article>
          <article className="border border-dashed border-border p-5">
            <span className="h-px w-8 bg-faint" />
            <h3 className="mt-8 font-sans text-[18px] leading-[1.3]">
              Student projects
            </h3>
            <p className="mt-2 text-[15px] leading-[1.6] text-secondary">
              Future projects will grow from the learning program and the
              questions students bring to the committee.
            </p>
            <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
              Coming later
            </p>
          </article>
        </div>
      </section>

      <div className="mt-14">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
          Publications and notes
        </p>
        <PapersView papers={getPapers()} site={site} />
      </div>
    </PageShell>
  );
}
