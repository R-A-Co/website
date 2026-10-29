import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";
import { LoginForm } from "@/components/admin/login-form";
import { microLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  const configured =
    Boolean(process.env.ADMIN_PASSWORD) ||
    process.env.NODE_ENV !== "production";

  return (
    <div className="max-w-[520px]">
      <p className={microLabel}>Restricted · Committee editors</p>
      <h1 className="mt-2 font-sans text-[28px] leading-[1.2] tracking-[-0.02em] text-ink md:text-[36px] md:leading-[1.1]">
        Sign in to the admin.
      </h1>
      <p className="mt-3 text-[15px] leading-[1.5] text-ink">
        Use the password configured in{" "}
        <code className="font-mono text-[13px]">ADMIN_PASSWORD</code>. Sessions
        last eight hours and are stored in an http-only cookie.
      </p>

      {!configured ? (
        <p className="mt-4 border border-red-700/30 bg-red-700/5 px-3 py-2.5 text-[13px] leading-[1.5] text-red-800">
          No password is configured. Set{" "}
          <code className="font-mono text-[12px]">ADMIN_PASSWORD</code> before
          deploying.
        </p>
      ) : null}

      <LoginForm />

      {!process.env.ADMIN_PASSWORD && process.env.NODE_ENV !== "production" ? (
        <p className="mt-6 border-t border-border pt-4 font-mono text-[10px] uppercase leading-[1.6] tracking-[0.06em] text-secondary">
          Development fallback password:{" "}
          <span className="text-ink">admin</span> — only when ADMIN_PASSWORD is
          unset.
        </p>
      ) : null}

      <p className="mt-8 text-[13px] leading-[1.5] text-secondary">
        <Link href="/" className="transition-colors hover:text-accent">
          Return to the site
        </Link>
      </p>
    </div>
  );
}
