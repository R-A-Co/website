import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowUpRight, Settings2 } from "lucide-react";
import { isAuthenticated } from "@/lib/admin/auth";
import { collections } from "@/lib/admin/schema";
import { countEntries, getStorageMode } from "@/lib/admin/store";
import { microLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

const collectionGroups = [
  {
    title: "Core site",
    description: "Identity, contact details, and the people visitors can meet.",
    slugs: ["home", "site", "members"],
  },
  {
    title: "Our work and events",
    description: "The paper, research work, and events shown on public pages.",
    slugs: ["projects", "papers", "seminars"],
  },
  {
    title: "Tools and resources",
    description: "Open tools, datasets, and scripts available to learners.",
    slugs: ["learning", "resources"],
  },
];

export default async function AdminDashboard() {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const mode = getStorageMode();
  const configured = Boolean(process.env.ADMIN_PASSWORD);
  const visibleCollections = collections.filter(
    (collection) => collection.visibleInDashboard !== false,
  );

  return (
    <div>
      <p className={microLabel}>
        Website CMS · {visibleCollections.length} collections
      </p>
      <h1 className="mt-2 font-sans text-[28px] leading-[1.2] tracking-[-0.02em] text-ink md:text-[36px] md:leading-[1.1]">
        Manage the website.
      </h1>
      <p className="mt-3 max-w-[620px] text-[15px] leading-[1.5] text-ink">
        Update the content that appears across the current public site. Use the
        sections below for the homepage, learning, research, resources, work,
        events, and people.
      </p>

      {!configured ? (
        <p className="mt-5 max-w-[720px] border border-red-700/30 bg-red-700/5 px-3 py-2.5 text-[13px] leading-[1.5] text-red-800">
          <strong className="font-sans font-normal">Set ADMIN_PASSWORD.</strong>{" "}
          Authentication is disabled in production until the variable exists.
        </p>
      ) : null}

      {mode === "local" ? (
        <p className="mt-3 max-w-[720px] border border-border bg-surface px-3 py-2.5 text-[13px] leading-[1.5] text-secondary">
          <strong className="font-sans font-normal text-ink">Local mode.</strong>{" "}
          Saves write to <code className="font-mono text-[12px]">content/</code>{" "}
          on this machine. Add <code className="font-mono text-[12px]">GITHUB_TOKEN</code>{" "}
          and <code className="font-mono text-[12px]">GITHUB_REPO</code> to commit
          changes when deployed.
        </p>
      ) : null}

      <div className="mt-8 space-y-10">
        {collectionGroups.map((group) => (
          <section key={group.title}>
            <div className="mb-3 border-b border-border pb-3">
              <h2 className="font-sans text-[20px] leading-[1.3] text-ink">
                {group.title}
              </h2>
              <p className="mt-1 text-[14px] leading-[1.5] text-secondary">
                {group.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.slugs.map((slug) => {
                const collection = collections.find(
                  (item) => item.slug === slug,
                );
                if (!collection) return null;

                const count = countEntries(collection);
                return (
                  <Link
                    key={collection.slug}
                    href={`/admin/${collection.slug}`}
                    className="group flex min-h-[126px] flex-col justify-between border border-border p-4 transition-colors hover:border-ink/30"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-secondary">
                        {collection.singleton
                          ? "Settings"
                          : `${String(count).padStart(2, "0")} ${
                              count === 1 ? "entry" : "entries"
                            }`}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 text-secondary transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </div>

                    <div className="mt-4">
                      <h3 className="font-sans text-[18px] leading-[1.3] tracking-[-0.01em] text-ink transition-colors group-hover:text-accent">
                        {collection.label}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[13px] leading-[1.5] text-secondary">
                        {collection.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 flex items-start gap-3 border-t border-border pt-5">
        <Settings2 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-secondary" />
        <p className="max-w-[720px] text-[13px] leading-[1.5] text-secondary">
          Site settings controls the homepage identity, focus areas, and
          headline stats. Papers sort by date automatically. Seminars are
          managed here for the events page; projects, tools, datasets, and
          scripts are edited in their own sections.
        </p>
      </div>
    </div>
  );
}
