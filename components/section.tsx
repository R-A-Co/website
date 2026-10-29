import { ArrowUpRight } from "lucide-react";
import { actionLink, cn, microLabel } from "@/lib/utils";

type SectionProps = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description: string;
  action?: { label: string; href: string; external?: boolean };
  children: React.ReactNode;
  width?: "narrow" | "wide";
  className?: string;
};

export function Section({
  id,
  index,
  kicker,
  title,
  description,
  action,
  children,
  width = "narrow",
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-24 py-14 md:py-20", className)}
    >
      <div className="grid grid-cols-12 gap-x-6">
        <div aria-hidden="true" className="hidden md:col-span-1 md:block" />

        <div
          className={cn(
            "col-span-12 md:col-start-2",
            width === "narrow" ? "md:col-span-7" : "md:col-span-10",
          )}
        >
          <div className="reveal">
            <p className={cn(microLabel, "mb-2 md:hidden")}>{kicker}</p>

            <h2
              id={`${id}-title`}
              className="font-sans text-[20px] font-normal leading-[1.3] tracking-[-0.01em] text-ink"
            >
              {title}
            </h2>

            <div className="mt-1 flex flex-col items-start gap-3">
              <p className="max-w-[560px] text-[15px] leading-[1.5] text-ink">
                {description}
              </p>

              {action ? (
                <a
                  href={action.href}
                  {...(action.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className={actionLink}
                >
                  {action.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              ) : null}
            </div>
          </div>

          <div className="mt-8 md:mt-10">{children}</div>
        </div>
      </div>
    </section>
  );
}
