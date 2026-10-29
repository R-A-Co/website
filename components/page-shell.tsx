import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { actionLink, cn, microLabel } from "@/lib/utils";

export function PageShell({
  index,
  kicker,
  title,
  description,
  action,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  description: string;
  action?: { label: string; href: string; external?: boolean };
  children: ReactNode;
}) {
  return (
    <>
      <header className="pb-10 pt-6 md:pt-16 lg:pt-28">
        <div className="grid grid-cols-12 gap-x-6">
          <div aria-hidden="true" className="hidden md:col-span-1 md:block" />

          <div className="col-span-12 min-w-0 md:col-start-2 md:col-span-9">
            <p className={cn(microLabel, "md:hidden")}>{kicker}</p>
            <p className={cn(microLabel, "hidden md:block")}>{kicker}</p>

            <h1 className="mt-3 max-w-[760px] text-pretty font-sans text-[30px] font-normal leading-[1.15] tracking-[-0.02em] text-ink md:text-[42px] md:leading-[1.05]">
              {title}
            </h1>
            <p className="mt-4 max-w-[640px] text-[16px] leading-[1.65] text-ink">
              {description}
            </p>

            {action ? (
              <a
                href={action.href}
                {...(action.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className={cn(actionLink, "mt-4")}
              >
                {action.label}
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 min-w-0 md:col-start-2 md:col-span-10">
          {children}
        </div>
      </div>
    </>
  );
}
