import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { ProjectsView } from "@/components/projects";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research questions, reading, and small projects from the Data Science Club Research & Analysis Committee.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  const projects = getProjects();

  return (
    <PageShell
      index="02"
      kicker="Research"
      title="Questions worth exploring carefully."
      description="We are learning how to turn a good question into a clear study. This page will grow as students read, discuss methods, and begin small projects together."
    >
      <ProjectsView projects={projects} />
    </PageShell>
  );
}
