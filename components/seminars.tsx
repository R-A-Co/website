import { ArrowUpRight } from "lucide-react";
import type { Seminar } from "@/lib/content-types";
import {
  actionLink,
  cn,
  formatMonthDay,
  microLabel,
} from "@/lib/utils";

function UpcomingSeminar({ seminar }: { seminar: Seminar }) {
  return (
    <li>
      <a
        href={seminar.href}
        className="group grid gap-2 border-t border-border py-5 md:grid-cols-12 md:gap-6"
      >
        <div className="md:col-span-2">
          <time
            dateTime={seminar.date}
            className="font-sans text-[15px] leading-[1.3] text-ink"
          >
            {formatMonthDay(seminar.date)}
          </time>
          <p className="mt-1 font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
            {seminar.date.slice(0, 4)} · {seminar.day} · {seminar.time}
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-accent">
              {seminar.type}
            </span>
            <span aria-hidden="true" className="text-faint">
              ·
            </span>
            <span className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
              Upcoming
            </span>
          </div>

          <h3 className="mt-1 font-sans text-[18px] leading-[1.3] tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
            {seminar.title}
          </h3>
          <p className="mt-1 max-w-[620px] text-[14px] leading-[1.5] text-ink">
            {seminar.description}
          </p>
          <p className="mt-2 text-[13px] leading-[1.5] text-secondary">
            {seminar.speaker}
            <span aria-hidden="true" className="mx-1.5 text-faint">
              ·
            </span>
            {seminar.location}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
          <span className="text-[13px] leading-[1.3] text-accent">RSVP</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </a>
    </li>
  );
}

function PastSeminar({ seminar }: { seminar: Seminar }) {
  return (
    <li>
      <a
        href={seminar.href}
        target="_blank"
        rel="noreferrer"
        className="group grid gap-2 border-t border-border py-3.5 md:grid-cols-12 md:items-baseline md:gap-6"
      >
        <time
          dateTime={seminar.date}
          className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-secondary md:col-span-2"
        >
          {formatMonthDay(seminar.date)} · {seminar.date.slice(0, 4)}
        </time>

        <div className="md:col-span-8">
          <h3 className="font-sans text-[15px] leading-[1.3] text-ink transition-colors group-hover:text-accent">
            {seminar.title}
          </h3>
          <p className="mt-0.5 text-[13px] leading-[1.5] text-secondary">
            {seminar.speaker}
            <span aria-hidden="true" className="mx-1.5 text-faint">
              ·
            </span>
            {seminar.location}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
          <span className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
            Archive
          </span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-3 text-accent transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </div>
      </a>
    </li>
  );
}

export function SeminarsView({
  upcoming,
  past,
  limit,
}: {
  upcoming: Seminar[];
  past: Seminar[];
  limit?: number;
}) {
  const visibleUpcoming =
    typeof limit === "number" ? upcoming.slice(0, limit) : upcoming;

  return (
    <div>
      <div>
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
          <h2 className={microLabel}>Upcoming</h2>
          <span className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
            {String(visibleUpcoming.length).padStart(2, "0")} scheduled · Fall
            2026
          </span>
        </div>

        <ul>
          {visibleUpcoming.map((seminar) => (
            <UpcomingSeminar key={seminar.date} seminar={seminar} />
          ))}
        </ul>
      </div>

      {past.length > 0 ? (
        <div className="mt-12">
          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-3">
            <h2 className={microLabel}>Past sessions</h2>
            <span className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
              {String(past.length).padStart(2, "0")} archived · Recordings
              available
            </span>
          </div>

          <ul>
            {past.map((seminar) => (
              <PastSeminar key={seminar.date} seminar={seminar} />
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 text-[13px] leading-[1.5] text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p>No registration required for on-campus attendance.</p>
        <a
          href="https://github.com/dsc-research/seminars"
          target="_blank"
          rel="noreferrer"
          className={cn(actionLink, "text-[13px]")}
        >
          Subscribe to the calendar
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </a>
      </div>
    </div>
  );
}
