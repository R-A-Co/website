import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectsView } from "@/components/projects";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Flagship research projects from the Data Science Club Research & Analysis Committee — probabilistic forecasting, causal inference, and health-systems modelling.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  const projects = getProjects();

  return (
    <PageShell
      index="02"
      kicker="Flagship projects"
      title="Selected work, built to ship."
      description="Long-horizon questions, production-grade systems. Each project pairs a faculty advisor with a student research pod and a public, reproducible codebase."
      action={{
        label: "GitHub organization",
        href: "https://github.com/dsc-research",
        external: true,
      }}
    >
      <ProjectsView projects={projects} />
    </PageShell>
  );
}
