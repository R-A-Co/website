import { ArrowUpRight, Mail } from "lucide-react";
import type { Member, Site } from "@/lib/content-types";
import { buttonPrimary, buttonSecondary, microLabel } from "@/lib/utils";
import { GithubIcon } from "./github-icon";

export function MemberCard({ member }: { member: Member }) {
  return (
    <li className="border-b border-r border-border p-4 md:p-5">
      <article className="group flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="font-serif text-[24px] leading-none text-accent"
          >
            {member.initials}
          </span>

          <div className="flex items-center gap-3">
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="text-secondary transition-colors hover:text-accent"
            >
              <GithubIcon className="size-3.5" />
            </a>
            <a
              href={member.email}
              aria-label={`Email ${member.name}`}
              className="text-secondary transition-colors hover:text-accent"
            >
              <Mail aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>

        <h3 className="mt-7 font-sans text-[18px] leading-[1.3] tracking-[-0.01em] text-ink">
          {member.name}
        </h3>
        <p className="mt-1 text-[13px] leading-[1.5] text-secondary">
          {member.role}
        </p>

        <p className="mt-auto border-t border-border pt-3 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.06em] text-secondary">
          {member.focus}
        </p>
      </article>
    </li>
  );
}

export function TeamView({
  members,
  site,
}: {
  members: Member[];
  site: Site;
}) {
  return (
    <div>
      <ul className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </ul>

      <div className="mt-12 border border-ink p-5 md:p-8">
        <div className="grid gap-7 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-8">
            <p className={microLabel}>Open call · Spring 2027</p>

            <h2 className="mt-2 max-w-[560px] font-sans text-[24px] leading-[1.2] tracking-[-0.02em] text-ink">
              Build research that outlives the semester.
            </h2>
            <p className="mt-2 max-w-[560px] text-[15px] leading-[1.5] text-ink">
              We review applications from undergraduates, master&apos;s
              students, and doctoral candidates each semester. Bring a question,
              a dataset, or a method you want to understand properly.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:col-span-4 md:items-end">
            <a
              href={`mailto:${site.email}?subject=Committee%20application%20—%20Spring%202027`}
              className={buttonPrimary}
            >
              Join the committee
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
            <a
              href={`mailto:${site.email}?subject=Intro%20call%20—%20Research%20%26%20Analysis`}
              className={buttonSecondary}
            >
              Talk to a lead
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
            <p className="mt-1 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary md:text-right">
              Applications close Dec 12, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
