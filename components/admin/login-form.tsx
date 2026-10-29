"use client";

import { useActionState } from "react";
import { ArrowRight } from "lucide-react";
import { loginAction, type LoginState } from "@/lib/admin/actions";

const initialState: LoginState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 max-w-[360px]">
      <label
        htmlFor="password"
        className="mb-1.5 block font-mono text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-secondary"
      >
        Admin password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="w-full border border-border bg-surface px-2.5 py-2 font-sans text-[14px] leading-[1.5] text-ink transition-colors focus:border-accent"
      />

      {state.error ? (
        <p
          role="alert"
          className="mt-3 border border-red-700/30 bg-red-700/5 px-2.5 py-2 text-[13px] leading-[1.5] text-red-800"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 inline-flex h-8 items-center gap-1.5 bg-ink px-2.5 text-[14px] leading-[1.3] text-background transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
        <ArrowRight aria-hidden="true" className="size-3.5" />
      </button>
    </form>
  );
}
