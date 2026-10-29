import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SeminarsView } from "@/components/seminars";
import { getPastSeminars, getUpcomingSeminars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Seminars",
  description:
    "Technical workshops, guest lectures, and collaborative sessions hosted by the Data Science Club Research & Analysis Committee.",
  alternates: { canonical: "/seminars" },
};

export default function SeminarsPage() {
  return (
    <PageShell
      index="05"
      kicker="Workshops & seminars"
      title="A working log of what we study."
      description="Technical workshops, guest lectures, and collaborative student sessions. Open to all students across the university — no prior research experience required."
    >
      <SeminarsView
        upcoming={getUpcomingSeminars()}
        past={getPastSeminars()}
      />
    </PageShell>
  );
}
