export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export const containerClass =
  "mx-auto w-full max-w-[1440px] px-5 md:px-8 lg:px-16";

export const buttonPrimary =
  "inline-flex min-h-10 items-center justify-center gap-2 bg-ink px-3 pb-px text-[15px] leading-[1.3] text-background transition-opacity duration-200 hover:opacity-80";

export const buttonSecondary =
  "inline-flex min-h-10 items-center justify-center gap-2 border border-ink px-3 pb-px text-[15px] leading-[1.3] text-ink transition-colors duration-200 hover:bg-ink hover:text-background";

export const actionLink =
  "inline-flex min-h-8 items-center gap-1.5 text-[15px] leading-[1.4] text-accent transition-opacity duration-200 hover:opacity-60";

export const microLabel =
  "font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-secondary";

const monthDay = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonthDay(iso: string): string {
  return monthDay.format(new Date(`${iso}T00:00:00Z`)).toUpperCase();
}

export function formatFullDate(iso: string): string {
  return fullDate.format(new Date(`${iso}T00:00:00Z`));
}

export function formatPaperDate(iso: string): string {
  return iso.replaceAll("-", ".");
}
