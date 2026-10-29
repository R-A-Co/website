import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSite } from "@/lib/content";
import { containerClass } from "@/lib/utils";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = getSite();

  return (
    <>
      <div className={containerClass}>
        <div className="site-frame relative grid min-w-0 grid-cols-1 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          <SiteHeader site={site} />

          <main
            id="main"
            tabIndex={-1}
            className="relative z-10 min-w-0 pb-4 pt-20 outline-none sm:pt-20 lg:pt-0"
          >
            {children}
          </main>
        </div>
      </div>
      <SiteFooter site={site} />
    </>
  );
}
