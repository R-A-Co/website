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
    "Tools and references for learning coding, data analysis, and research.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  const site = getSite();

  return (
    <PageShell
      index="03"
      kicker="Tools & references"
      title="A practical place to begin."
      description="We are collecting the software, datasets, and small examples that help students practice research and data work. More will be added as the learning program develops."
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
