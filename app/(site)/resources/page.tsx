import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { getResources } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resources",
  description: "Learning resources for coding, data, and research.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  const resources = getResources();

  return (
    <PageShell
      index="06"
      kicker="Learning resources"
      title="Useful places to keep learning."
      description="We are collecting a small, reliable starting library rather than pretending there is one path that works for everyone."
    >
      <ul className="border-t border-border">
        {resources.map((resource) => (
          <li key={resource.title} className="border-b border-border">
            <a href={resource.href} target="_blank" rel="noreferrer" className="group flex items-start justify-between gap-6 py-5">
              <span>
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-secondary">{resource.category}</span>
                <h2 className="mt-1 font-sans text-[18px] group-hover:text-accent">{resource.title}</h2>
                <p className="mt-1 text-[14px] leading-[1.5] text-secondary">{resource.description}</p>
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-accent" />
            </a>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
