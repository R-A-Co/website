import { ArrowUpRight } from "lucide-react";
import { buttonPrimary, cn, containerClass, microLabel } from "@/lib/utils";

export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-screen flex-col justify-center py-24"
    >
      <div className={containerClass}>
        <div className="max-w-[560px] lg:pl-[18rem]">
          <p className={microLabel}>404 / Off the record</p>
          <h1 className="mt-2 font-sans text-[24px] leading-[1.2] tracking-[-0.02em] text-ink md:text-[36px] md:leading-[1.1]">
            This page is not in the archive.
          </h1>
          <p className="mt-3 text-[15px] leading-[1.5] text-ink">
            The record ends here. Return to the committee&apos;s research index
            and start again.
          </p>
          <a href="/" className={cn(buttonPrimary, "mt-5")}>
            Back to the index
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </div>
    </main>
  );
}
