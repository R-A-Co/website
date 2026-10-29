import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { getLearningSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Learning",
  description:
    "A beginner-friendly learning path for coding, data analysis, and research skills.",
  alternates: { canonical: "/learning" },
};

export default function LearningPage() {
  const steps = getLearningSteps();
  return (
    <PageShell
      index="03"
      kicker="Learning program"
      title="A guided path for students."
      description="The program is being built for students at different starting points. It will combine online resources, shared practice, and support from peers."
    >
      <section>
        <div className="mb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
            Roadmap
          </p>
          <h2 className="mt-2 max-w-[620px] font-sans text-[24px] leading-[1.2] tracking-[-0.02em] md:text-[32px]">
            From first notebook to first project.
          </h2>
          <p className="mt-3 max-w-[620px] text-[16px] leading-[1.6] text-secondary">
            Move at your own pace. Each stage gives you something concrete to
            practice and a useful outcome to share.
          </p>
        </div>

        <ol className="border-t border-border">
        {steps.map(({ number, title, description, outcome }) => (
          <li
            key={number}
            className="grid gap-4 border-b border-border py-6 md:grid-cols-12 md:gap-6"
          >
            <span className="font-mono text-[10px] text-accent md:col-span-1">
              {number}
            </span>
            <h3 className="font-sans text-[18px] leading-[1.3] md:col-span-4">
              {title}
            </h3>
            <div className="max-w-[480px] md:col-span-6">
              <p className="text-[15px] leading-[1.6] text-secondary">
                {description}
              </p>
              <p className="mt-3 text-[13px] leading-[1.5] text-ink">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
                  Outcome
                </span>{" "}
                {outcome}
              </p>
            </div>
          </li>
        ))}
        </ol>
      </section>

      <section className="mt-14 grid gap-8 border-t border-border pt-5 md:grid-cols-2 md:gap-12">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
            Suggested starting points
          </p>
          <h2 className="mt-2 font-sans text-[24px] leading-[1.2] tracking-[-0.02em]">
            Learn from clear, practical material.
          </h2>
        </div>
        <ul className="space-y-4 text-[15px] leading-[1.6]">
          <li>
            <a
              href="https://www.kaggle.com/learn"
              target="_blank"
              rel="noreferrer"
              className="link-inline"
            >
              Kaggle Learn
            </a>{" "}
            — short lessons for Python, pandas, and data visualization.
          </li>
          <li>
            <a
              href="https://docs.python.org/3/tutorial/"
              target="_blank"
              rel="noreferrer"
              className="link-inline"
            >
              The Python tutorial
            </a>{" "}
            — a dependable reference as you practice.
          </li>
          <li>
            <a
              href="/resources"
              className="link-inline"
            >
              Our resources
            </a>{" "}
            — the small collection we are building for committee members.
          </li>
        </ul>
      </section>

      <section className="mt-14 border border-border bg-surface p-5 md:p-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent">
          How to use this roadmap
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div>
            <h2 className="font-sans text-[18px]">Choose one stage</h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-secondary">
              Start where you are. You do not need to complete everything in
              order.
            </p>
          </div>
          <div>
            <h2 className="font-sans text-[18px]">Practice in public</h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-secondary">
              Bring questions, partial work, and mistakes to group sessions.
            </p>
          </div>
          <div>
            <h2 className="font-sans text-[18px]">Share your progress</h2>
            <p className="mt-2 text-[14px] leading-[1.6] text-secondary">
              A short explanation of what you tried is already a useful
              contribution.
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
