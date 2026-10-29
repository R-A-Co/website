import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CollectionEditor } from "@/components/admin/collection-editor";
import { isAuthenticated } from "@/lib/admin/auth";
import { getCollection } from "@/lib/admin/schema";
import { readCollection } from "@/lib/admin/store";

export const dynamic = "force-dynamic";

export default async function AdminCollectionPage({
  params,
}: {
  params: Promise<{ collection: string }>;
}) {
  if (!(await isAuthenticated())) redirect("/admin/login");

  const { collection: slug } = await params;
  const def = getCollection(slug);
  if (!def) notFound();

  const data = readCollection(def);

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-secondary transition-colors hover:text-accent"
      >
        <ArrowLeft aria-hidden="true" className="size-3" />
        All collections
      </Link>

      <div className="mt-4">
        <CollectionEditor collection={def} initialData={data} />
      </div>
    </div>
  );
}
