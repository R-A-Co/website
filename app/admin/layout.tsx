import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, LogOut } from "lucide-react";
import { logoutAction } from "@/lib/admin/actions";
import { isAuthenticated } from "@/lib/admin/auth";
import { getStorageLabel, getStorageMode } from "@/lib/admin/store";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();
  const mode = getStorageMode();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 px-5 md:px-8">
          <Link
            href="/admin"
            className="group inline-flex items-center gap-2 font-sans text-[14px] leading-none text-ink"
          >
            <span
              aria-hidden="true"
              className="grid size-3.5 grid-cols-2 gap-[2px]"
            >
              <span className="bg-ink" />
              <span className="bg-ink" />
              <span className="bg-ink" />
              <span className="bg-ink" />
            </span>
            R&amp;A <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-secondary">Admin</span>
          </Link>

          <div className="flex items-center gap-4">
            <span
              className={cn(
                "hidden items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] sm:flex",
                mode === "github" ? "text-accent" : "text-secondary",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "size-1 rounded-full",
                  mode === "github" ? "bg-accent" : "bg-faint",
                )}
              />
              {getStorageLabel()}
            </span>

            <Link
              href="/"
              className="inline-flex items-center gap-1 font-sans text-[13px] leading-none text-secondary transition-colors hover:text-accent"
            >
              View site
              <ArrowUpRight aria-hidden="true" className="size-3" />
            </Link>

            {authed ? (
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex h-7 items-center gap-1.5 border border-border px-2 font-sans text-[13px] leading-none text-ink transition-colors hover:border-ink"
                >
                  <LogOut aria-hidden="true" className="size-3" />
                  Sign out
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-[1180px] px-5 py-8 md:px-8 md:py-10">
        {children}
      </main>
    </div>
  );
}
