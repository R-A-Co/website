import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ToolsView } from "@/components/tools";
import {
  getDatasets,
  getScripts,
  getSite,
  getTools,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Open-source packages, curated datasets, and analytical scripts from the Data Science Club Research & Analysis Committee.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const site = getSite();

  return (
    <PageShell
      index="03"
      kicker="Open source"
      title="Tools and data, in the open."
      description="Small, sharp utilities extracted from our own research. Typed, tested, and maintained by committee members — with the datasets that make the work reproducible."
      action={{
        label: "Browse the GitHub organization",
        href: site.github,
        external: true,
      }}
    >
      <ToolsView
        tools={getTools()}
        datasets={getDatasets()}
        scripts={getScripts()}
        site={site}
      />
    </PageShell>
  );
}
