import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ContactForm } from "@/components/contact-form";
import { TeamView } from "@/components/team";
import { getMembers, getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "People & contact",
  description:
    "Meet the committee and find out how to get involved with the Research & Analysis Committee.",
  alternates: { canonical: "/people" },
};

export default function PeoplePage() {
  const site = getSite();

  return (
    <PageShell
      index="07"
      kicker="People & contact"
      title="The people building the beginning."
      description="Meet the committee, ask a question, or get involved as we shape our learning program and first academic paper."
    >
      <TeamView members={getMembers()} site={site} />

      <div className="mt-14 border-t border-border pt-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">
          Get in touch
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-2 inline-flex text-[18px] text-accent"
        >
          {site.email}
        </a>
        <p className="mt-2 max-w-[520px] text-[16px] leading-[1.6] text-secondary">
          Tell us what you would like to learn, contribute, or explore with the
          committee.
        </p>
        <div className="mt-4 flex flex-wrap gap-4 font-mono text-[11px] uppercase tracking-[0.08em]">
          <a href={site.github} target="_blank" rel="noreferrer" className="text-accent">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="text-accent">
            LinkedIn
          </a>
        </div>
        <ContactForm email={site.email} />
      </div>
    </PageShell>
  );
}
